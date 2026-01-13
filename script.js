let map;
let drawnItems;
let currentLang = 'no'; // Default language

// NB: 'translations' og 'placeholders' lastes nå fra translations.js

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupEventListeners();
});

function initMap() {
    map = L.map('map').setView([65.0, 13.0], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        draw: {
            polygon: false, marker: true, circle: false, circlemarker: false, rectangle: false, polyline: true
        },
        edit: { featureGroup: drawnItems }
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
        drawnItems.addLayer(e.layer);
    });
}

function setupEventListeners() {
    document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
    
    // 1. Toggle "Annet" felt for EC (utstyr)
    const ecOtherCheck = document.getElementById('ecOtherCheck');
    const ecOtherContainer = document.getElementById('ecOtherContainer');
    ecOtherCheck.addEventListener('change', function() {
        if(this.checked) ecOtherContainer.classList.remove('hidden');
        else ecOtherContainer.classList.add('hidden');
    });

    // 2. Toggle "Annet" felt for Fartøytype (NY)
    const droneTypeSelect = document.getElementById('droneType');
    const typeOtherContainer = document.getElementById('typeOtherContainer');
    const typeOtherInput = document.getElementById('typeOtherText');

    droneTypeSelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            typeOtherContainer.classList.remove('hidden');
            typeOtherInput.required = true;
        } else {
            typeOtherContainer.classList.add('hidden');
            typeOtherInput.required = false;
            typeOtherInput.value = ""; // Tøm feltet når det skjules
        }
    });

    // LOGIKK FOR TILLATELSER
    const chkState = document.getElementById('isStateAircraft');
    const oatInput = document.getElementById('oatNumber');
    const cboInput = document.getElementById('cboNumber');
    const chkIntWatersInput = document.getElementById('isIntWaters');

    // 3. Statsluftfart / Militær
    chkState.addEventListener('change', function() {
        if (this.checked) {
            oatInput.disabled = true;
            cboInput.disabled = true;
            chkIntWatersInput.disabled = true;
            
            oatInput.value = "";
            cboInput.value = "";
            chkIntWatersInput.checked = false;
        } else {
            oatInput.disabled = false;
            cboInput.disabled = false;
            chkIntWatersInput.disabled = false;
        }
    });

    // 4. Internasjonalt farvann
    chkIntWatersInput.addEventListener('change', function() {
        if (this.checked) {
            cboInput.disabled = true;
            cboInput.value = ""; 
            cboInput.placeholder = "Ikke påkrevd (Int. farvann)";
        } else {
            cboInput.disabled = false;
            cboInput.placeholder = placeholders[currentLang].cboNumber;
        }
    });
}

function toggleLanguage() {
    currentLang = currentLang === 'no' ? 'en' : 'no';
    
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'no' ? 'Switch to English' : 'Bytt til Norsk';

    // Update Logo Link
    const logoLink = document.getElementById('logoLink');
    if(currentLang === 'no') {
        logoLink.href = "https://www.luftfartstilsynet.no/droner/";
    } else {
        logoLink.href = "https://www.luftfartstilsynet.no/en/drones/";
    }

    // Update Translations based on data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Update Footer Link Text
    const footerP = document.getElementById('footerDisclaimerText');
    footerP.innerHTML = translations[currentLang].footerBaseText + ' <a href="https://registrering.sensor.nsm.cloudgis.no/?initialLang=en" target="_blank">NSM</a>.';

    // Update Placeholders
    document.getElementById('manufacturer').placeholder = placeholders[currentLang].manufacturer;
    document.getElementById('model').placeholder = placeholders[currentLang].model;
    document.getElementById('color').placeholder = placeholders[currentLang].color;
    document.getElementById('borderPoint').placeholder = placeholders[currentLang].borderPoint;
    
    if (!document.getElementById('oatNumber').disabled) {
        document.getElementById('oatNumber').placeholder = placeholders[currentLang].oatNumber;
    }
    if (!document.getElementById('cboNumber').disabled && !document.getElementById('isIntWaters').checked) {
        document.getElementById('cboNumber').placeholder = placeholders[currentLang].cboNumber;
    }
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        if (file.name.toLowerCase().endsWith('.kml')) {
             const kmlLayer = omnivore.kml.parse(text);
             kmlLayer.eachLayer(l => drawnItems.addLayer(l));
             if(kmlLayer.getBounds().isValid()) map.fitBounds(kmlLayer.getBounds());
        } else if (file.name.toLowerCase().endsWith('.gpx')) {
            const gpxLayer = omnivore.gpx.parse(text);
            gpxLayer.eachLayer(l => drawnItems.addLayer(l));
             if(gpxLayer.getBounds().isValid()) map.fitBounds(gpxLayer.getBounds());
        } else {
            alert("Filformatet støttes ikke direkte (kun KML/GPX).");
        }
    };
    reader.readAsText(file);
}

function clearMap() { drawnItems.clearLayers(); }

function exportJSON() {
    const formData = new FormData(document.getElementById('flightForm'));
    const data = Object.fromEntries(formData.entries());
    const ecCheckboxes = document.querySelectorAll('input[name="ec"]:checked');
    data.electronicConspicuity = Array.from(ecCheckboxes).map(cb => cb.value);
    
    if (drawnItems) {
        data.routeGeoJSON = drawnItems.toGeoJSON();
    }
    
    data.generatedAt = new Date().toISOString();
    
    // Explicitly add checkboxes that might be unchecked
    data.isStateAircraft = document.getElementById('isStateAircraft').checked;
    data.isFromIntWaters = document.getElementById('isIntWaters').checked;

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `drone_flight_plan_${data.operatorName || 'draft'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function printForm() { window.print(); }