let map;
let drawnItems;
let currentLang = 'no';
const STORAGE_KEY = 'drone_flight_form_data';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sjekk URL for språkvalg
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('lang') === 'en') {
        currentLang = 'en';
    }

    initMap();
    setupEventListeners();
    applyTranslations(currentLang);
    updateAuthUI();
    
    const savedJson = localStorage.getItem(STORAGE_KEY);
    if(savedJson) {
        try {
            populateForm(JSON.parse(savedJson));
        } catch(e) { console.error("Could not load saved data", e); }
    }
});

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
            polyline: true 
        },
        edit: { featureGroup: drawnItems }
    });
    map.addControl(drawControl);

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
        addStartEndMarkers(layer, greenIcon, redIcon);
        document.getElementById('mapError').classList.add('hidden');
        saveFormData(); 
    });

    map.on('draw:deleted', saveFormData);
    map.on('draw:edited', saveFormData);
}

function addStartEndMarkers(layer, startIcon, endIcon) {
    if (layer instanceof L.Polyline) {
        const latlngs = layer.getLatLngs();
        if (latlngs.length > 0) {
            const flatPoints = latlngs.flat(Infinity);
            if(flatPoints.length > 0) {
                L.marker(flatPoints[0], {icon: startIcon, interactive: false}).addTo(drawnItems);
                L.marker(flatPoints[flatPoints.length-1], {icon: endIcon, interactive: false}).addTo(drawnItems);
            }
        }
    }
}

function clearMap() { 
    drawnItems.clearLayers(); 
    saveFormData();
}

function setupEventListeners() {
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', saveFormData);
        input.addEventListener('input', saveFormData);
    });

    const ecNone = document.getElementById('ecNone');
    const ecOtherCheck = document.getElementById('ecOtherCheck');
    const ecRemoteId = document.getElementById('ecRemoteId');
    const ecCheckboxes = document.querySelectorAll('input[name="ec"]:not(#ecNone)');
    
    ecNone.addEventListener('change', function() {
        if(this.checked) {
            ecCheckboxes.forEach(cb => { cb.checked = false; cb.disabled = true; });
            ecOtherCheck.checked = false; 
            ecOtherCheck.disabled = true;
            document.getElementById('ecOtherContainer').classList.add('hidden');
            document.getElementById('ridOpNumContainer').classList.add('hidden');
            document.getElementById('ridOpNum').required = false;
        } else {
            ecCheckboxes.forEach(cb => cb.disabled = false);
            ecOtherCheck.disabled = false;
            if(ecRemoteId.checked) {
                document.getElementById('ridOpNumContainer').classList.remove('hidden');
                document.getElementById('ridOpNum').required = true;
            }
        }
        saveFormData();
    });

    ecOtherCheck.addEventListener('change', function() {
        const cont = document.getElementById('ecOtherContainer');
        if(this.checked) cont.classList.remove('hidden');
        else cont.classList.add('hidden');
    });

    ecRemoteId.addEventListener('change', function() {
        const cont = document.getElementById('ridOpNumContainer');
        const input = document.getElementById('ridOpNum');
        if(this.checked) {
            cont.classList.remove('hidden');
            input.required = true;
        } else {
            cont.classList.add('hidden');
            input.required = false;
            input.value = ""; 
        }
    });

    document.getElementById('ridOpNum').addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        const count = this.value.length;
        document.getElementById('ridCounter').textContent = `${count}/16`;
        if(count === 16) {
            this.style.borderColor = "green";
            this.classList.remove('error');
        } else {
            this.style.borderColor = "";
        }
    });

    document.getElementById('droneType').addEventListener('change', function() {
        const cont = document.getElementById('typeOtherContainer');
        if (this.value === 'Other') cont.classList.remove('hidden');
        else cont.classList.add('hidden');
    });

    const enduranceHours = document.getElementById('enduranceHours');
    const enduranceMinutes = document.getElementById('enduranceMinutes');
    const enduranceNA = document.getElementById('enduranceNA');
    
    enduranceNA.addEventListener('change', function() {
        if(this.checked) {
            enduranceHours.disabled = true;
            enduranceMinutes.disabled = true;
            enduranceHours.required = false;
            enduranceMinutes.required = false;
            enduranceHours.value = "";
            enduranceMinutes.value = "";
            enduranceHours.classList.remove('error');
            enduranceMinutes.classList.remove('error');
        } else {
            enduranceHours.disabled = false;
            enduranceMinutes.disabled = false;
            enduranceHours.required = true;
            enduranceMinutes.required = true;
        }
    });

    const comCheck = document.getElementById('comCheck');
    const comOptions = document.getElementById('comOptions');
    comCheck.addEventListener('change', function() {
        if(this.checked) comOptions.classList.remove('hidden');
        else {
            comOptions.classList.add('hidden');
            document.querySelectorAll('input[name="comMethods"]').forEach(cb => cb.checked = false);
        }
    });

    ['flightCategory', 'permitType', 'stateNat', 'isIntWaters'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.addEventListener('change', updateAuthUI);
    });
}

function updateAuthUI() {
    const category = document.getElementById('flightCategory').value; 
    const civilCont = document.getElementById('civilAuthContainer');
    const stateCont = document.getElementById('stateAuthContainer');
    
    const permitType = document.getElementById('permitType').value; 
    const oatInput = document.getElementById('oatNumber');
    const oatPrefix = document.getElementById('oatPrefix');
    const cboInput = document.getElementById('cboNumber');
    const isIntWaters = document.getElementById('isIntWaters').checked;
    
    const stateNat = document.getElementById('stateNat').value; 
    const diploContainer = document.getElementById('diploRefContainer');
    const diploInput = document.getElementById('diploRef');
    const stateNatOtherCont = document.getElementById('stateNatOtherContainer');
    const stateNatOtherInput = document.getElementById('stateNatOther');

    if (category === 'Civil') {
        civilCont.classList.remove('hidden');
        stateCont.classList.add('hidden');
        oatInput.required = true;
        diploInput.required = false;
        stateNatOtherInput.required = false;

        if (permitType === 'nor_oat') {
            oatPrefix.textContent = "";
            oatPrefix.style.display = "flex";
        } else {
            oatPrefix.style.display = "none";
            oatInput.placeholder = "NNN-OAT-...";
        }

        if (permitType === 'nor_oat' && isIntWaters) {
            cboInput.disabled = true;
            cboInput.required = false;
            cboInput.value = "";
            cboInput.placeholder = placeholders[currentLang].cboNotReq;
        } 
        else if (permitType === 'easa_oat') {
            cboInput.disabled = false;
            cboInput.placeholder = "NOR-CBO-";
        }
        else {
            cboInput.disabled = false;
            cboInput.placeholder = placeholders[currentLang].cboNumber;
        }

    } else {
        civilCont.classList.add('hidden');
        stateCont.classList.remove('hidden');
        oatInput.required = false;
        cboInput.required = false;

        if (stateNat === 'Other') {
            stateNatOtherCont.classList.remove('hidden');
            stateNatOtherInput.required = true;
            diploContainer.classList.remove('hidden');
            diploInput.required = true;
        } else if (stateNat === 'Foreign') {
            stateNatOtherCont.classList.remove('hidden'); 
            diploContainer.classList.remove('hidden');
            diploInput.required = true;
        } else {
            stateNatOtherCont.classList.add('hidden');
            stateNatOtherInput.required = false;
            diploContainer.classList.add('hidden');
            diploInput.required = false;
        }
    }
}

function saveFormData() {
    const form = document.getElementById('flightForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    data.ec = Array.from(document.querySelectorAll('input[name="ec"]:checked')).map(cb => cb.value);
    data.comMethods = Array.from(document.querySelectorAll('input[name="comMethods"]:checked')).map(cb => cb.value);
    data.isIntWaters = document.getElementById('isIntWaters').checked;
    data.comCheck = document.getElementById('comCheck').checked;
    data.enduranceNA = document.getElementById('enduranceNA').checked;
    
    // Lagre endurance feltene manuelt hvis de ikke fanges opp av form (de bør fanges opp av FormData, men for sikkerhets skyld)
    data.enduranceHours = document.getElementById('enduranceHours').value;
    data.enduranceMinutes = document.getElementById('enduranceMinutes').value;

    if (drawnItems && drawnItems.getLayers().length > 0) {
        data.mapGeoJSON = drawnItems.toGeoJSON();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function handleJsonUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            populateForm(data);
            alert("Skjema lastet inn!");
        } catch (error) {
            console.error(error);
            alert("Feil ved lesing av JSON-fil.");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function populateForm(data) {
    for (const [key, value] of Object.entries(data)) {
        const el = document.getElementById(key);
        if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
                if(el.type !== 'checkbox' && el.type !== 'file') el.value = value;
        }
    }
    
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    if (data.ec) data.ec.forEach(val => {
        const cb = document.querySelector(`input[name="ec"][value="${val}"]`);
        if(cb) cb.checked = true;
    });
    if (data.comMethods) data.comMethods.forEach(val => {
        const cb = document.querySelector(`input[name="comMethods"][value="${val}"]`);
        if(cb) cb.checked = true;
    });
    
    if(data.isIntWaters) document.getElementById('isIntWaters').checked = true;
    if(data.comCheck) document.getElementById('comCheck').checked = true;
    if(data.enduranceNA) document.getElementById('enduranceNA').checked = true;

    updateAuthUI();
    document.getElementById('comCheck').dispatchEvent(new Event('change'));
    // Trigger update for N/A checkbox før vi setter verdier
    document.getElementById('enduranceNA').dispatchEvent(new Event('change'));

    if (data.enduranceHours) document.getElementById('enduranceHours').value = data.enduranceHours;
    if (data.enduranceMinutes) document.getElementById('enduranceMinutes').value = data.enduranceMinutes;
    
    if(data.ec && data.ec.includes('None')) document.getElementById('ecNone').dispatchEvent(new Event('change'));
    if(data.ec && data.ec.includes('Annet')) document.getElementById('ecOtherCheck').dispatchEvent(new Event('change'));
    
    if(data.ec && data.ec.includes('Remote ID')) {
            document.getElementById('ecRemoteId').dispatchEvent(new Event('change'));
            if(data.ridOpNum) {
                document.getElementById('ridOpNum').value = data.ridOpNum;
                document.getElementById('ridOpNum').dispatchEvent(new Event('input')); 
            }
    }

    document.getElementById('droneType').dispatchEvent(new Event('change'));

    drawnItems.clearLayers();
    if (data.mapGeoJSON) {
        const layer = L.geoJSON(data.mapGeoJSON);
        layer.eachLayer(l => {
            drawnItems.addLayer(l);
        });
        if(layer.getLayers().length > 0 && layer.getBounds().isValid()) {
            map.fitBounds(layer.getBounds());
        }
        document.getElementById('mapError').classList.add('hidden');
    }
    
    saveFormData();
}


function clearForm() {
    if(confirm("Er du sikker på at du vil tømme skjemaet?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

function validateAndAction(action) {
    const form = document.getElementById('flightForm');
    const inputs = form.querySelectorAll('input[required]:not([disabled]), select[required]:not([disabled])');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.id === 'oatNumber') {
            const group = input.closest('.input-prefix-group');
            if (!input.value.trim()) {
                if(group) group.classList.add('error');
                input.classList.add('error');
                isValid = false;
            } else {
                if(group) group.classList.remove('error');
                input.classList.remove('error');
            }
        } 
        else if (input.id === 'enduranceHours' || input.id === 'enduranceMinutes') {
            // Sjekkes bare hvis de er required (dvs ikke N/A)
            if (input.required && input.value === '') {
                input.classList.add('error');
                isValid = false;
            } else if (input.id === 'enduranceMinutes' && (parseInt(input.value) < 0 || parseInt(input.value) > 59)) {
                input.classList.add('error');
                isValid = false;
                alert("Minutter må være mellom 0 og 59.");
            } else {
                input.classList.remove('error');
            }
        }
        else if (input.id === 'ridOpNum') {
            const ridRegex = /^[a-zA-Z0-9]{16}$/;
            if(!ridRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
                alert("Operatørnummer MÅ bestå av nøyaktig 16 alfanumeriske tegn.");
            } else {
                input.classList.remove('error');
            }
        }
        else {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        }
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const g = this.closest('.input-prefix-group');
            if(g) g.classList.remove('error');
        }, {once:true});
    });

    if (drawnItems.getLayers().length === 0) {
        document.getElementById('mapError').classList.remove('hidden');
        isValid = false;
    }

    if (!isValid) return;

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
             addImportedLayer(layer);
        } else if (file.name.toLowerCase().endsWith('.gpx')) {
            const layer = omnivore.gpx.parse(text);
            addImportedLayer(layer);
        } else if (file.name.toLowerCase().endsWith('.json') || file.name.toLowerCase().endsWith('.geojson')) {
            const layer = L.geoJSON(JSON.parse(text));
            addImportedLayer(layer);
        } else {
            alert("Ukjent format.");
        }
    };
    reader.readAsText(file);
}

function addImportedLayer(layer) {
    layer.eachLayer(l => drawnItems.addLayer(l));
    if(layer.getLayers().length > 0 && layer.getBounds().isValid()) {
        map.fitBounds(layer.getBounds());
    }
    saveFormData();
}

function exportJSON() {
    const formData = new FormData(document.getElementById('flightForm'));
    const data = Object.fromEntries(formData.entries());
    
    const prefixDiv = document.getElementById('oatPrefix');
    if (prefixDiv && prefixDiv.style.display !== 'none' && data.oatNumber) {
        data.oatNumberFull = prefixDiv.textContent + data.oatNumber;
    } else {
        data.oatNumberFull = data.oatNumber;
    }

    // Endurance logic: Kombiner til streng hvis ikke N/A
    if (!document.getElementById('enduranceNA').checked) {
        const hh = document.getElementById('enduranceHours').value.padStart(2, '0');
        const mm = document.getElementById('enduranceMinutes').value.padStart(2, '0');
        data.endurance = `${hh}:${mm}`;
    } else {
        data.endurance = "N/A";
    }
    // Fjern rådata feltene fra JSON output hvis du vil ha det rent
    delete data.enduranceHours;
    delete data.enduranceMinutes;

    data.electronicConspicuity = Array.from(document.querySelectorAll('input[name="ec"]:checked')).map(cb => cb.value);
    data.comMethods = Array.from(document.querySelectorAll('input[name="comMethods"]:checked')).map(cb => cb.value);
    data.enduranceNA = document.getElementById('enduranceNA').checked;

    if (drawnItems) {
        data.routeGeoJSON = drawnItems.toGeoJSON();
    }
    
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
    currentLang = currentLang === 'no' ? 'en' : 'no';
    
    // Oppdater URL med nytt språkvalg
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('lang', currentLang);
    window.history.pushState({}, '', newUrl);

    applyTranslations(currentLang);
}

function applyTranslations(lang) {
    const btn = document.getElementById('langToggle');
    // Vis flagget for språket man bytter TIL
    btn.textContent = lang === 'no' ? '🇬🇧 Switch to English' : '🇳🇴 Bytt til Norsk';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    const p = placeholders[lang];
    if(p) {
        for(const [id, val] of Object.entries(p)) {
            const el = document.getElementById(id);
            if(el) el.placeholder = val;
        }
    }
    
    updateAuthUI(); 
}