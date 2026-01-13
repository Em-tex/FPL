let map;
let drawnItems;
let currentLang = 'no'; // Default language

// OVERSETTELSER
const translations = {
    no: {
        pageTitle: "Melding om grensekryssende droneflyging",
        mainHeader: "Melding om grensekryssende droneflyging",
        subtitle: "Skjema for informasjon til Luftfartstilsynet, Toll, Forsvaret og Avinor ved grensekrysning (Cross-Border Operations)",
        
        sect1Header: "1. Operatør og Pilot",
        lblOperatorName: "Operatørnavn (Selskap/Privat):",
        lblOperatorContact: "Kontaktinfo Operatør (E-post/Tlf):",
        lblPilotName: "Navn på Pilot:",
        lblPilotPhone: "Pilot Telefon (tilgjengelig under flyging):",
        lblPilotEmail: "Pilot E-post:",
        
        subHeaderAuth: "Tillatelser (hvis relevant)",
        lblOat: "OAT-nummer (Operational Authorisation):",
        lblCbo: "CBO-nummer (Cross-border Operation):",
        
        sect2Header: "2. Fartøy (Drone)",
        lblManufacturer: "Produsent:",
        lblModel: "Modell:",
        lblDroneType: "Fartøytype:",
        optHelicopter: "Helikopter (Single rotor)",
        optOther: "Annet",
        lblColor: "Farge / Kjennetegn:",
        lblEc: "Elektronisk Synlighet (Velg alle som gjelder):",
        lblOther: "Annet",
        lblEcDesc: "Beskriv annet utstyr:",

        sect3Header: "3. Flyging og Rute",
        lblDepPlace: "Avgangssted:",
        lblDepTime: "Avgangstid (UTC/Lokal):",
        lblArrPlace: "Landingssted:",
        lblArrTime: "Landingstid (Estimert):",
        lblBorderPoint: "Sted for grensepassering (Navn/Koordinat):",
        
        lblRouteMap: "Ruteoversikt",
        txtMapHelp: "Tegn rute i kartet eller last opp KML/GPX-fil.",
        btnMapClear: "Slett kartdata",
        
        btnJson: "Last ned Data (JSON)",
        btnPdf: "Last ned / Skriv ut (PDF)",
        
        infoBoxHeader: "Innsending og Viktig Info",
        infoSendTo: "Når skjemaet er utfylt og PDF/JSON er lastet ned, sendes filene til:",
        disclaimerTitle: "Merk:",
        disclaimerText: "Dette skjemaet er en orientering. Krav til tillatelse i spesifikk kategori og cross border tillatelse for utenlandske operatører er også et krav. Dette skjemaet erstatter ikke eventuelle krav til tillatelser fra NSM for sensorbruk eller spesifikke tollprosedyrer."
    },
    en: {
        pageTitle: "Notification of Cross-Border Drone Operation",
        mainHeader: "Notification of Cross-Border Drone Operation",
        subtitle: "Form for information to CAA, Customs, Defence and Avinor regarding Cross-Border Operations",
        
        sect1Header: "1. Operator and Pilot",
        lblOperatorName: "Operator Name (Company/Private):",
        lblOperatorContact: "Contact Info Operator (Email/Phone):",
        lblPilotName: "Pilot Name:",
        lblPilotPhone: "Pilot Phone (available during flight):",
        lblPilotEmail: "Pilot Email:",
        
        subHeaderAuth: "Authorisations (if applicable)",
        lblOat: "OAT Number (Operational Authorisation):",
        lblCbo: "CBO Number (Cross-border Operation):",

        sect2Header: "2. Aircraft (UAS)",
        lblManufacturer: "Manufacturer:",
        lblModel: "Model:",
        lblDroneType: "Type of Aircraft:",
        optHelicopter: "Helicopter (Single rotor)",
        optOther: "Other",
        lblColor: "Color / Markings:",
        lblEc: "Electronic Conspicuity (Select all that apply):",
        lblOther: "Other",
        lblEcDesc: "Describe other equipment:",

        sect3Header: "3. Flight and Route",
        lblDepPlace: "Departure Place:",
        lblDepTime: "Departure Time (UTC/Local):",
        lblArrPlace: "Landing Place:",
        lblArrTime: "Landing Time (Estimated):",
        lblBorderPoint: "Border Crossing Point (Name/Coord):",
        
        lblRouteMap: "Route Overview",
        txtMapHelp: "Draw route on map or upload KML/GPX file.",
        btnMapClear: "Clear Map Data",
        
        btnJson: "Download Data (JSON)",
        btnPdf: "Download / Print (PDF)",
        
        infoBoxHeader: "Submission and Important Info",
        infoSendTo: "Once filled out and downloaded, send the files to:",
        disclaimerTitle: "Note:",
        disclaimerText: "This form is for information purposes only. Requirement for authorization in the specific category and cross-border authorization for foreign operators is also a requirement. This form does not replace any requirements for permits from NSM for sensor use or specific customs procedures."
    }
};

// PLASS HOLDERE (Placeholders)
const placeholders = {
    no: {
        manufacturer: "F.eks. DJI, Wingtra...",
        model: "F.eks. Matrice 300...",
        color: "F.eks. Oransje, Grå...",
        borderPoint: "F.eks. Grensevarde 123 eller E6 Svinesund",
        oatNumber: "F.eks. NOR-OAT-12345/001",
        cboNumber: "F.eks. SWE-CBO-12345/001"
    },
    en: {
        manufacturer: "E.g. DJI, Wingtra...",
        model: "E.g. Matrice 300...",
        color: "E.g. Orange, Grey...",
        borderPoint: "E.g. Border marker 123 or E6 Svinesund",
        oatNumber: "E.g. NOR-OAT-12345/001",
        cboNumber: "E.g. SWE-CBO-12345/001"
    }
}

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
    
    // Toggle "Annet" field
    const ecOtherCheck = document.getElementById('ecOtherCheck');
    const ecOtherContainer = document.getElementById('ecOtherContainer');
    ecOtherCheck.addEventListener('change', function() {
        if(this.checked) ecOtherContainer.classList.remove('hidden');
        else ecOtherContainer.classList.add('hidden');
    });
}

// SPÅK BYTTE FUNKSJON
function toggleLanguage() {
    currentLang = currentLang === 'no' ? 'en' : 'no';
    
    // Oppdater knapp tekst
    const btn = document.getElementById('langToggle');
    btn.textContent = currentLang === 'no' ? 'Switch to English' : 'Bytt til Norsk';

    // Oppdater tekst innhold
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Oppdater placeholders
    document.getElementById('manufacturer').placeholder = placeholders[currentLang].manufacturer;
    document.getElementById('model').placeholder = placeholders[currentLang].model;
    document.getElementById('color').placeholder = placeholders[currentLang].color;
    document.getElementById('borderPoint').placeholder = placeholders[currentLang].borderPoint;
    document.getElementById('oatNumber').placeholder = placeholders[currentLang].oatNumber;
    document.getElementById('cboNumber').placeholder = placeholders[currentLang].cboNumber;
}

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        // Basic detection logic (same as before)
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
    data.routeGeoJSON = drawnItems.toGeoJSON();
    data.generatedAt = new Date().toISOString();
    
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