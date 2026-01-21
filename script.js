let map;
let drawnItems;
let currentLang = 'no';
const STORAGE_KEY = 'drone_flight_form_data';

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupEventListeners();
    updateAuthUI();
    loadFormData(); 
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


// --- UI LOGIKK & LAGRING ---
function setupEventListeners() {
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
    
    // Auto-save
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', saveFormData);
        input.addEventListener('input', saveFormData);
    });

    // EC logikk
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
            // Hide Remote ID field too
            document.getElementById('ridOpNumContainer').classList.add('hidden');
            document.getElementById('ridOpNum').required = false;
        } else {
            ecCheckboxes.forEach(cb => cb.disabled = false);
            ecOtherCheck.disabled = false;
            // Check current status of Remote ID
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

    // Remote ID logic
    ecRemoteId.addEventListener('change', function() {
        const cont = document.getElementById('ridOpNumContainer');
        const input = document.getElementById('ridOpNum');
        if(this.checked) {
            cont.classList.remove('hidden');
            input.required = true;
        } else {
            cont.classList.add('hidden');
            input.required = false;
            input.value = ""; // Clear if unchecked
        }
    });

    // Character counter for Operator Number
    document.getElementById('ridOpNum').addEventListener('input', function() {
        // Enforce alphanumeric
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

    // Endurance logic
    const enduranceInput = document.getElementById('endurance');
    const enduranceNA = document.getElementById('enduranceNA');
    
    enduranceNA.addEventListener('change', function() {
        if(this.checked) {
            enduranceInput.disabled = true;
            enduranceInput.required = false;
            enduranceInput.value = "";
            enduranceInput.placeholder = "N/A";
            enduranceInput.classList.remove('error');
        } else {
            enduranceInput.disabled = false;
            enduranceInput.required = true;
            enduranceInput.placeholder = "hh:mm";
        }
    });

    // ATC logic
    const comCheck = document.getElementById('comCheck');
    const comOptions = document.getElementById('comOptions');
    comCheck.addEventListener('change', function() {
        if(this.checked) comOptions.classList.remove('hidden');
        else {
            comOptions.classList.add('hidden');
            document.querySelectorAll('input[name="comMethods"]').forEach(cb => cb.checked = false);
        }
    });

    // Auth triggers
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

    if (category === 'Civil') {
        civilCont.classList.remove('hidden');
        stateCont.classList.add('hidden');
        oatInput.required = true;
        diploInput.required = false;

        if (permitType === 'nor_oat') {
            oatPrefix.textContent = "NOR-OAT-";
            oatPrefix.style.display = "flex";
        } else {
            oatPrefix.style.display = "none";
            oatInput.placeholder = "XXX-OAT-YYY";
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

        if (stateNat === 'Foreign') {
            diploContainer.classList.remove('hidden');
            diploInput.required = true;
        } else {
            diploContainer.classList.add('hidden');
            diploInput.required = false;
        }
    }
}

// --- LAGRING TIL LOCALSTORAGE ---
function saveFormData() {
    const form = document.getElementById('flightForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    data.ec = Array.from(document.querySelectorAll('input[name="ec"]:checked')).map(cb => cb.value);
    data.comMethods = Array.from(document.querySelectorAll('input[name="comMethods"]:checked')).map(cb => cb.value);
    data.isIntWaters = document.getElementById('isIntWaters').checked;
    data.comCheck = document.getElementById('comCheck').checked;
    data.enduranceNA = document.getElementById('enduranceNA').checked;
    
    if (drawnItems && drawnItems.getLayers().length > 0) {
        data.mapGeoJSON = drawnItems.toGeoJSON();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFormData() {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return;
    
    try {
        const data = JSON.parse(json);
        
        for (const [key, value] of Object.entries(data)) {
            const el = document.getElementById(key);
            if (el && (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA')) {
                 if(el.type !== 'checkbox' && el.type !== 'file') el.value = value;
            }
        }
        
        if (data.ec) data.ec.forEach(val => {
            const cb = document.querySelector(`input[name="ec"][value="${val}"]`);
            if(cb) cb.checked = true;
        });
        if (data.comMethods) data.comMethods.forEach(val => {
            const cb = document.querySelector(`input[name="comMethods"][value="${val}"]`);
            if(cb) cb.checked = true;
        });
        if(data.isIntWaters !== undefined) document.getElementById('isIntWaters').checked = data.isIntWaters;
        if(data.comCheck !== undefined) document.getElementById('comCheck').checked = data.comCheck;
        if(data.enduranceNA !== undefined) document.getElementById('enduranceNA').checked = data.enduranceNA;

        // Trigger updates
        updateAuthUI();
        document.getElementById('comCheck').dispatchEvent(new Event('change'));
        document.getElementById('enduranceNA').dispatchEvent(new Event('change'));
        if(data.ec && data.ec.includes('None')) document.getElementById('ecNone').dispatchEvent(new Event('change'));
        if(data.ec && data.ec.includes('Annet')) document.getElementById('ecOtherCheck').dispatchEvent(new Event('change'));
        // Trigger Remote ID logic specifically
        if(data.ec && data.ec.includes('Remote ID')) {
             document.getElementById('ecRemoteId').dispatchEvent(new Event('change'));
             if(data.ridOpNum) {
                 document.getElementById('ridOpNum').value = data.ridOpNum;
                 document.getElementById('ridOpNum').dispatchEvent(new Event('input')); // update counter
             }
        }

        document.getElementById('droneType').dispatchEvent(new Event('change'));

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

    } catch (e) {
        console.error("Feil ved lasting av data", e);
    }
}

function clearForm() {
    if(confirm("Er du sikker på at du vil tømme skjemaet?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
}

// --- VALIDERING OG ACTION ---
function validateAndAction(action) {
    const form = document.getElementById('flightForm');
    const inputs = form.querySelectorAll('input[required]:not([disabled]), select[required]:not([disabled])');
    let isValid = true;
    
    inputs.forEach(input => {
        // OAT Validering
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
        // Endurance Validering (hh:mm)
        else if (input.id === 'endurance') {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if(!timeRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
                alert("Endurance må være på formatet hh:mm (f.eks. 01:30) eller sjekk N/A.");
            } else {
                input.classList.remove('error');
            }
        }
        // Operatørnummer Validering (16 chars)
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

    if (!isValid) {
        // Alert vises også spesifikt for feltene over
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
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'no' ? 'Switch to English' : 'Bytt til Norsk';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    const p = placeholders[currentLang];
    if(p) {
        for(const [id, val] of Object.entries(p)) {
            const el = document.getElementById(id);
            if(el) el.placeholder = val;
        }
    }
    updateAuthUI(); 
}