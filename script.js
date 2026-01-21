let map;
let drawnItems;
let currentLang = 'no';

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupEventListeners();
    // Kjør UI oppdatering en gang ved start for å sette riktig state
    updateAuthUI();
});

// --- KART OG MARKØRER ---
function initMap() {
    map = L.map('map').setView([65.0, 13.0], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        draw: {
            polygon: false, marker: false, circle: false, 
            circlemarker: false, rectangle: false, 
            polyline: true // Vi tillater kun ruter (linjer)
        },
        edit: { featureGroup: drawnItems }
    });
    map.addControl(drawControl);

    // Definer fargede ikoner for start/slutt
    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });

    map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        drawnItems.addLayer(layer);

        // Hvis det er en linje, legg til start (grønn) og slutt (rød) markør
        if (e.layerType === 'polyline') {
            const latlngs = layer.getLatLngs();
            if (latlngs.length > 0) {
                // Start
                L.marker(latlngs[0], {icon: greenIcon, interactive: false}).addTo(drawnItems);
                // Slutt (siste punkt, håndterer også nested arrays hvis multi-segment)
                const lastPoint = latlngs.flat(Infinity).slice(-1)[0]; 
                L.marker(lastPoint, {icon: redIcon, interactive: false}).addTo(drawnItems);
            }
        }
        // Fjern feilmelding hvis kartet får data
        document.getElementById('mapError').classList.add('hidden');
    });
    
    // Fjern feilmarkering ved sletting
    map.on('draw:deleted', function () {
         if (drawnItems.getLayers().length === 0) {
             // Eventuell logikk hvis tomt
         }
    });
}

function clearMap() { drawnItems.clearLayers(); }


// --- UI LOGIKK ---
function setupEventListeners() {
    // Filopplasting
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
    
    // 1. EC "Ingen" og "Annet"
    const ecNone = document.getElementById('ecNone');
    const ecOtherCheck = document.getElementById('ecOtherCheck');
    const ecCheckboxes = document.querySelectorAll('input[name="ec"]:not(#ecNone)');
    
    ecNone.addEventListener('change', function() {
        if(this.checked) {
            // Hvis "Ingen" velges, fjern alle andre kryss
            ecCheckboxes.forEach(cb => { cb.checked = false; cb.disabled = true; });
            ecOtherCheck.checked = false; 
            ecOtherCheck.disabled = true;
            document.getElementById('ecOtherContainer').classList.add('hidden');
        } else {
            ecCheckboxes.forEach(cb => cb.disabled = false);
            ecOtherCheck.disabled = false;
        }
    });

    ecOtherCheck.addEventListener('change', function() {
        const cont = document.getElementById('ecOtherContainer');
        if(this.checked) cont.classList.remove('hidden');
        else cont.classList.add('hidden');
    });

    // 2. Fartøytype "Annet"
    document.getElementById('droneType').addEventListener('change', function() {
        const cont = document.getElementById('typeOtherContainer');
        if (this.value === 'Other') cont.classList.remove('hidden');
        else cont.classList.add('hidden');
    });

    // 3. Kommunikasjon (ATC)
    const comCheck = document.getElementById('comCheck');
    const comOptions = document.getElementById('comOptions');
    comCheck.addEventListener('change', function() {
        if(this.checked) comOptions.classList.remove('hidden');
        else {
            comOptions.classList.add('hidden');
            // Uncheck sub-options
            document.querySelectorAll('input[name="comMethods"]').forEach(cb => cb.checked = false);
        }
    });

    // 4. AUTORISASJON LOGIKK TRIGGERS
    const authTriggers = ['flightCategory', 'permitType', 'stateNat', 'isIntWaters'];
    authTriggers.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.addEventListener('change', updateAuthUI);
    });
}

function updateAuthUI() {
    const category = document.getElementById('flightCategory').value; // Civil, State
    const civilCont = document.getElementById('civilAuthContainer');
    const stateCont = document.getElementById('stateAuthContainer');
    
    // Inputs
    const permitType = document.getElementById('permitType').value; // nor_oat, easa_oat
    const oatInput = document.getElementById('oatNumber');
    const cboInput = document.getElementById('cboNumber');
    const isIntWaters = document.getElementById('isIntWaters').checked;
    
    const stateNat = document.getElementById('stateNat').value; // NO, Foreign
    const diploContainer = document.getElementById('diploRefContainer');
    const diploInput = document.getElementById('diploRef');

    if (category === 'Civil') {
        // Vis sivil boks, skjul stat
        civilCont.classList.remove('hidden');
        stateCont.classList.add('hidden');

        // Required updates
        oatInput.required = true;
        diploInput.required = false;

        // OAT Prefill Logic
        if (permitType === 'nor_oat') {
            if(!oatInput.value.startsWith('NOR-OAT-')) oatInput.value = "NOR-OAT-";
        } else {
            // EASA OAT
            if(!oatInput.value.includes('-OAT-')) oatInput.value = "-OAT-";
        }

        // CBO Logic
        // Scenario 1: Norsk OAT + Passerer int farvann -> CBO ikke nødvendig (gråes ut)
        if (permitType === 'nor_oat' && isIntWaters) {
            cboInput.disabled = true;
            cboInput.placeholder = "Ikke påkrevd (Norsk operatør via int. farvann)";
            cboInput.required = false;
            cboInput.value = "";
        } 
        // Scenario 2: Utenlandsk OAT -> CBO alltid påkrevd (prefill NOR-CBO)
        else if (permitType === 'easa_oat') {
            cboInput.disabled = false;
            cboInput.required = true;
            if(!cboInput.value.startsWith('NOR-CBO-')) cboInput.value = "NOR-CBO-";
            cboInput.placeholder = "";
        }
        // Scenario 3: Norsk OAT men IKKE int farvann (f.eks krysse grense direkte land) -> CBO kan være påkrevd
        else {
            cboInput.disabled = false;
            cboInput.placeholder = "F.eks. SWE-CBO-123";
            // Her antar vi at de trenger CBO fra nabolandet
        }

    } else {
        // STATE / MILITÆR
        civilCont.classList.add('hidden');
        stateCont.classList.remove('hidden');

        oatInput.required = false;
        cboInput.required = false;

        if (stateNat === 'Foreign') {
            diploContainer.classList.remove('hidden');
            diploInput.required = true;
        } else {
            diploContainer.classList.add('hidden');
            diploInput.required = false;
        }
    }
}

// --- VALIDERING OG ACTION ---
function validateAndAction(action) {
    const form = document.getElementById('flightForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    // 1. Sjekk felt
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
            // Legg til listener for å fjerne error når man skriver
            input.addEventListener('input', () => input.classList.remove('error'), {once:true});
        } else {
            input.classList.remove('error');
        }
    });

    // 2. Sjekk kart
    if (drawnItems.getLayers().length === 0) {
        document.getElementById('mapError').classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) {
        alert("Skjemaet mangler påkrevd informasjon. Se røde felt.");
        return;
    }

    if (action === 'json') exportJSON();
    else if (action === 'print') window.print();
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        if (file.name.toLowerCase().endsWith('.kml')) {
             const layer = omnivore.kml.parse(text);
             addLayerWithMarkers(layer);
        } else if (file.name.toLowerCase().endsWith('.gpx')) {
            const layer = omnivore.gpx.parse(text);
            addLayerWithMarkers(layer);
        } else {
            alert("Filformatet støttes ikke direkte (kun KML/GPX).");
        }
    };
    reader.readAsText(file);
}

// Hjelpefunksjon for å legge til import og tegne markører
function addLayerWithMarkers(layer) {
    layer.eachLayer(l => {
        drawnItems.addLayer(l);
        // Simulere create event for å få markører
        if (l instanceof L.Polyline) {
             map.fire(L.Draw.Event.CREATED, { layer: l, layerType: 'polyline' });
        }
    });
    if(layer.getBounds().isValid()) map.fitBounds(layer.getBounds());
}

function exportJSON() {
    const formData = new FormData(document.getElementById('flightForm'));
    const data = Object.fromEntries(formData.entries());
    
    // Håndter arrays (checkboxes)
    data.electronicConspicuity = Array.from(document.querySelectorAll('input[name="ec"]:checked')).map(cb => cb.value);
    data.comMethods = Array.from(document.querySelectorAll('input[name="comMethods"]:checked')).map(cb => cb.value);
    
    if (drawnItems) {
        data.routeGeoJSON = drawnItems.toGeoJSON();
    }
    
    // Rens opp JSON basert på visning
    if (data.flightCategory === 'State') {
        delete data.oatNumber;
        delete data.cboNumber;
        delete data.permitType;
    } else {
        delete data.diploRef;
        delete data.stateNat;
    }

    // Slå sammen fart/høyde med enhet
    if(data.speedVal && data.speedUnit) data.cruisingSpeed = `${data.speedVal} ${data.speedUnit}`;
    if(data.altitudeVal && data.altitudeRef) data.altitude = `${data.altitudeVal} ${data.altitudeRef}`;

    data.generatedAt = new Date().toISOString();
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flight_plan_${data.operatorName || 'draft'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function toggleLanguage() {
    // Enkelt bytte for demo. I full prod bør oversettelsesfilen også oppdateres med nye nøkler.
    currentLang = currentLang === 'no' ? 'en' : 'no';
    alert("Språkbytte er forenklet i denne versjonen. Implementer full oversettelse i translations.js for de nye feltene.");
}