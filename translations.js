const translations = {
    no: {
        pageTitle: "Melding om grensekryssende droneflyging",
        mainHeader: "Melding om grensekryssende droneflyging til Norge",
        txtOpenCatNote: "<strong>Merk:</strong> Flyging i <em>åpen kategori</em> krever ikke innsending av dette skjemaet.",
        
        // Seksjon 1
        sect1Header: "<i class='fa-solid fa-address-card'></i> 1. Operatør og Tillatelser",
        lblOperatorName: "<i class='fa-solid fa-user-tie'></i> Operatørnavn:",
        lblOperatorEmail: "<i class='fa-solid fa-envelope'></i> Operatør E-post:",
        lblOperatorPhone: "<i class='fa-solid fa-phone'></i> Operatør Telefon:",
        
        lblPilotName: "<i class='fa-solid fa-id-badge'></i> Fartøysjef (Pilot in Command):",
        lblPilotPhone: "<i class='fa-solid fa-mobile-screen'></i> Fartøysjefens telefon:",
        
        subHeaderAuth: "<i class='fa-solid fa-file-contract'></i> Kategori og Autorisasjoner",
        lblFlightCategory: "<i class='fa-solid fa-layer-group'></i> Luftfartskategori:",
        optCivil: "Sivil Luftfart (EASA)",
        optState: "Militær / Statsluftfart (Non-EASA)",
        
        lblPermitType: "<i class='fa-solid fa-stamp'></i> Operasjonstillatelse:",
        optNorOat: "Norsk operasjonstillatelse (NOR-OAT)",
        optEasaOat: "Operasjonstillatelse fra annet EASA land",
        
        lblOat: "<i class='fa-solid fa-hashtag'></i> OAT-nummer:",
        lblCbo: "<i class='fa-solid fa-globe'></i> Cross border tillatelse (CBO):",
        helpCbo: "Kreves for utenlandske operatører, eller norske operatører utenfor int. farvann.",
        chkIntWaters: "Passering til/fra internasjonalt farvann",
        
        lblStateNat: "<i class='fa-solid fa-flag'></i> Operatørens nasjonalitet:",
        optNatNo: "Norge",
        optNatOther: "Annet / Other", 
        lblStateNatOther: "Spesifiser nasjonalitet:",

        lblDiplo: "<i class='fa-solid fa-scroll'></i> Referanse for diplomatisk klarering:",
        txtDiploNote: "Diplomatisk klarering kreves for utenlandsk statsluftfart.",

        // Seksjon 2
        sect2Header: "<i class='fa-solid fa-plane'></i> 2. Fartøy (Drone)",
        lblManufacturer: "<i class='fa-solid fa-industry'></i> Produsent:",
        lblModel: "<i class='fa-solid fa-tag'></i> Modell:",
        lblMtom: "<i class='fa-solid fa-weight-hanging'></i> MTOM (kg):", 
        lblPowerplant: "<i class='fa-solid fa-cogs'></i> Drivlinje:",
        lblDroneType: "<i class='fa-solid fa-dragon'></i> Fartøytype:",
        
        optFixedWing: "Fixed Wing (Fly)",
        optHelicopter: "Helikopter",
        optMultirotor: "Multirotor",
        optHybrid: "Hybrid (VTOL)",
        optOther: "Annet",
        
        optElectric: "Elektrisk (Batteri)",
        optPiston: "Stempelmotor / Hybrid",
        optTurbine: "Turbin / Jet",
        optNone: "Ingen (Glidefly/Ballong)",

        lblColor: "<i class='fa-solid fa-palette'></i> Farge / Kjennetegn:",
        lblEc: "<i class='fa-solid fa-wifi'></i> Elektronisk Synlighet:",
        lblEcNone: "Ingen",
        lblEcOther: "Annet",
        
        lblRidOpNum: "<i class='fa-solid fa-fingerprint'></i> UAS Operatørnummer (fra Remote ID):",
        helpRidOpNum: "Må bestå av nøyaktig 16 tegn (a-z, 0-9). Ingen bindestreker eller spesialtegn.",

        // Seksjon 3
        sect3Header: "<i class='fa-solid fa-map-location-dot'></i> 3. Flyging og Rute",
        lblDepPlace: "<i class='fa-solid fa-plane-departure'></i> Avgangssted:",
        lblDepTime: "<i class='fa-regular fa-clock'></i> Avgangstid (UTC/Lokal):",
        lblArrPlace: "<i class='fa-solid fa-plane-arrival'></i> Landingssted:",
        lblArrTime: "<i class='fa-regular fa-clock'></i> Landingstid (Estimert):",
        
        lblAltitude: "<i class='fa-solid fa-arrow-up-from-ground-water'></i> Planlagt Høyde:",
        lblSpeed: "<i class='fa-solid fa-gauge-high'></i> Cruising Speed:",
        lblEndurance: "<i class='fa-solid fa-hourglass-half'></i> Endurance (hh:mm):",
        lblNA: "N/A (Ikke relevant)",
        tooltipEndurance: "Hvor lenge dronen kan fly før den går tom for energi. Bruk hh:mm format.",
        
        lblRadio: "<i class='fa-solid fa-headset'></i> Vil ha kommunikasjon med ATC",
        lblComPhone: "Telefon",
        lblComRadio: "Radio (VHF)",
        
        lblRouteMap: "<i class='fa-solid fa-map'></i> Ruteoversikt",
        txtMapInstruction: "Tegn rute eller last opp fil",
        lblMapLegend: "Grønn markør = Avgang, Rød markør = Landing.", 
        tooltipMap: "Støtter: KML, GPX, GeoJSON.<br>Verktøy: Google Earth, geojson.io.",
        btnMapClear: "Slett kartdata",
        msgMapError: "Kartdata mangler! Vennligst tegn en rute.",
        
        btnJson: "Last ned Data (JSON)",
        btnPdf: "Last ned / Skriv ut (PDF)",
        btnReset: "Tøm skjema",
        btnImport: "Last opp lagret skjema (JSON)",
        
        infoBoxHeader: "<i class='fa-solid fa-paper-plane'></i> Innsending",
        infoSendTo: "Sendes til:",
        emailCaa: "<strong>Luftfartstilsynet:</strong> postmottak@caa.no",
        
        emailToll: "<strong>Toll:</strong> [E-postadresse]",
        emailForsvar: "<strong>Forsvaret (NAOC/NJHQ):</strong> [E-postadresse]",
        emailAvinor: "<strong>Avinor (lokal TWR/ATCC):</strong> [E-postadresse]",
        
        lblCopyEmails: "Kopieringsvennlig linje:",
        disclaimerTitle: "Merk:",
        footerBaseText: "Operatøren er ansvarlig for alle tillatelser. Utenlandske UAS-operatører må melde fra til NSM om all sensorbruk. Se <a href='https://nsm.no/fysisk/luftbarne-sensorsystemer/' target='_blank'>NSM</a>."
    },
    en: {
        pageTitle: "Notification of Border-Crossing Drone Operation to Norway",
        mainHeader: "Notification of Border-Crossing Drone Operation to Norway",
        txtOpenCatNote: "<strong>Note:</strong> Flights in the <em>Open Category</em> do not require submission of this form.",
        
        sect1Header: "<i class='fa-solid fa-address-card'></i> 1. Operator and Permissions",
        lblOperatorName: "<i class='fa-solid fa-user-tie'></i> Operator Name:",
        lblOperatorEmail: "<i class='fa-solid fa-envelope'></i> Operator Email:",
        lblOperatorPhone: "<i class='fa-solid fa-phone'></i> Operator Phone:",
        
        lblPilotName: "<i class='fa-solid fa-id-badge'></i> Pilot in Command Name:",
        lblPilotPhone: "<i class='fa-solid fa-mobile-screen'></i> Pilot in Command Phone:",
        
        subHeaderAuth: "<i class='fa-solid fa-file-contract'></i> Category and Authorisations",
        lblFlightCategory: "<i class='fa-solid fa-layer-group'></i> Flight Category:",
        optCivil: "Civil Aviation (EASA)",
        optState: "Military / State Aviation (Non-EASA)",
        
        lblPermitType: "<i class='fa-solid fa-stamp'></i> Operation Permit:",
        optNorOat: "Norwegian Operation Permit (NOR-OAT)",
        optEasaOat: "Permit from other EASA member state",
        
        lblOat: "<i class='fa-solid fa-hashtag'></i> OAT Number:",
        lblCbo: "<i class='fa-solid fa-globe'></i> Cross Border Permit (CBO):",
        helpCbo: "Required for foreign operators, or Norwegian operators outside int. waters.",
        chkIntWaters: "Crossing to/from International Waters",
        
        lblStateNat: "<i class='fa-solid fa-flag'></i> Operator Nationality:",
        optNatNo: "Norway",
        optNatOther: "Other",
        lblStateNatOther: "Specify Nationality:",

        lblDiplo: "<i class='fa-solid fa-scroll'></i> Diplomatic Clearance Reference:",
        txtDiploNote: "Diplomatic clearance is required for foreign state aviation.",

        sect2Header: "<i class='fa-solid fa-plane'></i> 2. Aircraft (UAS)",
        lblManufacturer: "<i class='fa-solid fa-industry'></i> Manufacturer:",
        lblModel: "<i class='fa-solid fa-tag'></i> Model:",
        lblMtom: "<i class='fa-solid fa-weight-hanging'></i> MTOM (kg):",
        lblPowerplant: "<i class='fa-solid fa-cogs'></i> Powerplant:",
        lblDroneType: "<i class='fa-solid fa-dragon'></i> Aircraft Type:",
        
        optFixedWing: "Fixed Wing",
        optHelicopter: "Helicopter",
        optMultirotor: "Multirotor",
        optHybrid: "Hybrid (VTOL)",
        optOther: "Other",

        optElectric: "Electric (Battery)",
        optPiston: "Piston / Hybrid",
        optTurbine: "Turbine / Jet",
        optNone: "None (Glider/Balloon)",

        lblColor: "<i class='fa-solid fa-palette'></i> Color / Markings:",
        lblEc: "<i class='fa-solid fa-wifi'></i> Electronic Conspicuity:",
        lblEcNone: "None",
        lblEcOther: "Other",

        lblRidOpNum: "<i class='fa-solid fa-fingerprint'></i> UAS Operator Number (from Remote ID):",
        helpRidOpNum: "Must consist of exactly 16 characters (a-z, 0-9). No hyphens.",

        sect3Header: "<i class='fa-solid fa-map-location-dot'></i> 3. Flight and Route",
        lblDepPlace: "<i class='fa-solid fa-plane-departure'></i> Departure Place:",
        lblDepTime: "<i class='fa-regular fa-clock'></i> Departure Time (UTC/Local):",
        lblArrPlace: "<i class='fa-solid fa-plane-arrival'></i> Landing Place:",
        lblArrTime: "<i class='fa-regular fa-clock'></i> Landing Time (Estimated):",
        
        lblAltitude: "<i class='fa-solid fa-arrow-up-from-ground-water'></i> Planned Altitude:",
        lblSpeed: "<i class='fa-solid fa-gauge-high'></i> Cruising Speed:",
        lblEndurance: "<i class='fa-solid fa-hourglass-half'></i> Endurance (hh:mm):",
        lblNA: "N/A (Not applicable)",
        tooltipEndurance: "Flight time before energy depletion. Use hh:mm format.",

        lblRadio: "<i class='fa-solid fa-headset'></i> Will have communication with ATC",
        lblComPhone: "Phone",
        lblComRadio: "Radio (VHF)",

        lblRouteMap: "<i class='fa-solid fa-map'></i> Route Overview",
        txtMapInstruction: "Draw route or upload file",
        lblMapLegend: "Green marker = Departure, Red marker = Landing.",
        tooltipMap: "Supports: KML, GPX, GeoJSON.<br>Tools: Google Earth, geojson.io.",
        btnMapClear: "Clear Map Data",
        msgMapError: "Map data missing! Please draw a route.",
        
        btnJson: "Download Data (JSON)",
        btnPdf: "Download / Print (PDF)",
        btnReset: "Clear Form",
        btnImport: "Upload Saved Form (JSON)",
        
        infoBoxHeader: "<i class='fa-solid fa-paper-plane'></i> Submission",
        infoSendTo: "Send to:",
        emailCaa: "<strong>CAA Norway:</strong> postmottak@caa.no",
        
        emailToll: "<strong>Customs:</strong> [Email Address]",
        emailForsvar: "<strong>Armed Forces (NAOC/NJHQ):</strong> [Email Address]",
        emailAvinor: "<strong>Avinor (local TWR/ATCC):</strong> [Email Address]",
        
        lblCopyEmails: "Copy-paste string:",
        disclaimerTitle: "Note:",
        footerBaseText: "The operator is responsible for permissions. Foreign UAS operators must report all sensor usage to NSM. See <a href='https://nsm.no/areas-of-expertise/physical-security/airborne-sensor-systems/' target='_blank'>NSM</a>."
    }
};

const placeholders = {
    no: {
        manufacturer: "F.eks. DJI",
        model: "F.eks. Matrice 300",
        color: "F.eks. Oransje",
        oatNumber: "1234...", // Oppdatert
        cboNumber: "F.eks. SWE-CBO-123...",
        cboNotReq: "Ikke påkrevd",
        diploRef: "", 
        typeOtherText: "Beskriv...",
        ecOtherText: "Beskriv utstyr..."
    },
    en: {
        manufacturer: "E.g. DJI",
        model: "E.g. Matrice 300",
        color: "E.g. Orange",
        oatNumber: "1234...", // Oppdatert
        cboNumber: "E.g. SWE-CBO-123...",
        cboNotReq: "Not required",
        diploRef: "", 
        typeOtherText: "Describe...",
        ecOtherText: "Describe equipment..."
    }
};