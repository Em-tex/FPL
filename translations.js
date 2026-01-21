const translations = {
    no: {
        pageTitle: "Melding om grensekryssende droneflyging",
        mainHeader: "Melding om grensekryssende droneflyging",
        txtOpenCatNote: "<strong>Merk:</strong> Flyging i <em>åpen kategori</em> krever ikke innsending av dette skjemaet.",
        
        // Seksjon 1
        sect1Header: "1. Operatør og Tillatelser",
        lblOperatorName: "Operatørnavn:",
        lblOperatorEmail: "Operatør E-post:",
        lblOperatorPhone: "Operatør Telefon:",
        
        lblPilotName: "Fartøysjef (Pilot in Command):",
        lblPilotPhone: "Fartøysjefens telefon:",
        
        subHeaderAuth: "Kategori og Autorisasjoner",
        lblFlightCategory: "Luftfartskategori:",
        optCivil: "Sivil Luftfart (EASA)",
        optState: "Militær / Statsluftfart (Non-EASA)",
        
        lblPermitType: "Operasjonstillatelse:",
        optNorOat: "Norsk operasjonstillatelse (NOR-OAT)",
        optEasaOat: "Operasjonstillatelse fra annet EASA land",
        
        lblOat: "OAT-nummer:",
        lblCbo: "Cross border tillatelse (CBO):",
        helpCbo: "Kreves for utenlandske operatører, eller norske operatører utenfor int. farvann.",
        chkIntWaters: "Passering til/fra internasjonalt farvann",
        
        lblStateNat: "Operatørens nasjonalitet:",
        optNatNo: "Norge",
        optNatForeign: "Annet land",
        lblDiplo: "Referanse for diplomatisk klarering:",
        txtDiploNote: "Diplomatisk klarering kreves for utenlandsk statsluftfart.",

        // Seksjon 2
        sect2Header: "2. Fartøy (Drone)",
        lblManufacturer: "Produsent:",
        lblModel: "Modell:",
        lblMtom: "MTOM (kg):", 
        lblPowerplant: "Drivlinje:",
        lblDroneType: "Fartøytype:",
        
        optFixedWing: "Fixed Wing (Fly)",
        optHelicopter: "Helikopter",
        optMultirotor: "Multirotor",
        optHybrid: "Hybrid (VTOL)",
        optOther: "Annet",
        
        optElectric: "Elektrisk (Batteri)",
        optPiston: "Stempelmotor / Hybrid",
        optTurbine: "Turbin / Jet",
        optNone: "Ingen (Glidefly/Ballong)",

        lblColor: "Farge / Kjennetegn:",
        lblEc: "Elektronisk Synlighet:",
        lblEcNone: "Ingen",
        lblEcOther: "Annet",
        
        lblRidOpNum: "UAS Operatørnummer (fra Remote ID):",
        helpRidOpNum: "Må bestå av nøyaktig 16 tegn (a-z, 0-9). Ingen bindestreker eller spesialtegn.",

        // Seksjon 3
        sect3Header: "3. Flyging og Rute",
        lblDepPlace: "Avgangssted:",
        lblDepTime: "Avgangstid (UTC/Lokal):",
        lblArrPlace: "Landingssted:",
        lblArrTime: "Landingstid (Estimert):",
        
        lblAltitude: "Planlagt Høyde:",
        lblSpeed: "Cruising Speed:",
        lblEndurance: "Endurance (hh:mm):",
        lblNA: "N/A (Ikke relevant)",
        tooltipEndurance: "Hvor lenge dronen kan fly før den går tom for energi. Bruk hh:mm format.",
        
        lblRadio: "Vil ha kommunikasjon med ATC",
        lblComPhone: "Telefon",
        lblComRadio: "Radio (VHF)",
        
        lblRouteMap: "Ruteoversikt",
        txtMapHelp: "Tegn rute. Grønn markør = Start, Rød markør = Slutt.",
        tooltipMap: "Støtter: KML, GPX, GeoJSON.<br>Verktøy: Google Earth, geojson.io.",
        btnMapClear: "Slett kartdata",
        msgMapError: "Kartdata mangler! Vennligst tegn en rute.",
        
        btnJson: "Last ned Data (JSON)",
        btnPdf: "Last ned / Skriv ut (PDF)",
        btnReset: "Tøm skjema",
        
        // Footer & Innsending
        infoBoxHeader: "Innsending",
        infoSendTo: "Sendes til:",
        emailCaa: "<strong>Luftfartstilsynet:</strong> postmottak@caa.no",
        
        // Oppdaterte e-post linjer
        emailToll: "<strong>Toll:</strong> [E-postadresse]",
        emailForsvar: "<strong>Forsvaret (NAOC/NJHQ):</strong> [E-postadresse]",
        emailAvinor: "<strong>Avinor (lokal TWR/ATCC):</strong> [E-postadresse]",
        
        lblCopyEmails: "Kopieringsvennlig linje:",
        disclaimerTitle: "Merk:",
        // Oppdatert footer med NSM link
        footerBaseText: "Operatøren er ansvarlig for alle tillatelser. Utenlandske UAS-operatører må melde fra til NSM om all sensorbruk. Se <a href='https://nsm.no/fysisk/luftbarne-sensorsystemer/' target='_blank'>NSM</a>."
    },
    en: {
        pageTitle: "Notification of Border-Crossing Drone Operation to Norway",
        mainHeader: "Notification of Border-Crossing Drone Operation to Norway",
        txtOpenCatNote: "<strong>Note:</strong> Flights in the <em>Open Category</em> do not require submission of this form.",
        
        sect1Header: "1. Operator and Permissions",
        lblOperatorName: "Operator Name:",
        lblOperatorEmail: "Operator Email:",
        lblOperatorPhone: "Operator Phone:",
        
        lblPilotName: "Pilot in Command Name:",
        lblPilotPhone: "Pilot in Command Phone:",
        
        subHeaderAuth: "Category and Authorisations",
        lblFlightCategory: "Flight Category:",
        optCivil: "Civil Aviation (EASA)",
        optState: "Military / State Aviation (Non-EASA)",
        
        lblPermitType: "Operation Permit:",
        optNorOat: "Norwegian Operation Permit (NOR-OAT)",
        optEasaOat: "Permit from other EASA member state",
        
        lblOat: "OAT Number:",
        lblCbo: "Cross Border Permit (CBO):",
        helpCbo: "Required for foreign operators, or Norwegian operators outside int. waters.",
        chkIntWaters: "Crossing to/from International Waters",
        
        lblStateNat: "Operator Nationality:",
        optNatNo: "Norway",
        optNatForeign: "Foreign Country",
        lblDiplo: "Diplomatic Clearance Reference:",
        txtDiploNote: "Diplomatic clearance is required for foreign state aviation.",

        sect2Header: "2. Aircraft (UAS)",
        lblManufacturer: "Manufacturer:",
        lblModel: "Model:",
        lblMtom: "MTOM (kg):",
        lblPowerplant: "Powerplant:",
        lblDroneType: "Aircraft Type:",
        
        optFixedWing: "Fixed Wing",
        optHelicopter: "Helicopter",
        optMultirotor: "Multirotor",
        optHybrid: "Hybrid (VTOL)",
        optOther: "Other",

        optElectric: "Electric (Battery)",
        optPiston: "Piston / Hybrid",
        optTurbine: "Turbine / Jet",
        optNone: "None (Glider/Balloon)",

        lblColor: "Color / Markings:",
        lblEc: "Electronic Conspicuity:",
        lblEcNone: "None",
        lblEcOther: "Other",

        lblRidOpNum: "UAS Operator Number (from Remote ID):",
        helpRidOpNum: "Must consist of exactly 16 characters (a-z, 0-9). No hyphens.",

        sect3Header: "3. Flight and Route",
        lblDepPlace: "Departure Place:",
        lblDepTime: "Departure Time (UTC/Local):",
        lblArrPlace: "Landing Place:",
        lblArrTime: "Landing Time (Estimated):",
        
        lblAltitude: "Planned Altitude:",
        lblSpeed: "Cruising Speed:",
        lblEndurance: "Endurance (hh:mm):",
        lblNA: "N/A (Not applicable)",
        tooltipEndurance: "Flight time before energy depletion. Use hh:mm format.",

        lblRadio: "Will have communication with ATC",
        lblComPhone: "Phone",
        lblComRadio: "Radio (VHF)",

        lblRouteMap: "Route Overview",
        txtMapHelp: "Draw route. Green marker = Start, Red marker = End.",
        tooltipMap: "Supports: KML, GPX, GeoJSON.<br>Tools: Google Earth, geojson.io.",
        btnMapClear: "Clear Map Data",
        msgMapError: "Map data missing! Please draw a route.",
        
        btnJson: "Download Data (JSON)",
        btnPdf: "Download / Print (PDF)",
        btnReset: "Clear Form",
        
        infoBoxHeader: "Submission",
        infoSendTo: "Send to:",
        emailCaa: "<strong>CAA Norway:</strong> postmottak@caa.no",
        
        // Updated email lines
        emailToll: "<strong>Customs:</strong> [Email Address]",
        emailForsvar: "<strong>Armed Forces (NAOC/NJHQ):</strong> [Email Address]",
        emailAvinor: "<strong>Avinor (local TWR/ATCC):</strong> [Email Address]",
        
        lblCopyEmails: "Copy-paste string:",
        disclaimerTitle: "Note:",
        // Updated footer with NSM link
        footerBaseText: "The operator is responsible for permissions. Foreign UAS operators must report all sensor usage to NSM. See <a href='https://nsm.no/areas-of-expertise/physical-security/airborne-sensor-systems/' target='_blank'>NSM</a>."
    }
};

const placeholders = {
    no: {
        manufacturer: "F.eks. DJI",
        model: "F.eks. Matrice 300",
        color: "F.eks. Oransje",
        oatNumber: "F.eks. UAS-NO-...",
        cboNumber: "F.eks. SWE-CBO-123...",
        cboNotReq: "Ikke påkrevd",
        diploRef: "Ref.nr...",
        typeOtherText: "Beskriv...",
        ecOtherText: "Beskriv utstyr..."
    },
    en: {
        manufacturer: "E.g. DJI",
        model: "E.g. Matrice 300",
        color: "E.g. Orange",
        oatNumber: "E.g. UAS-NO-...",
        cboNumber: "E.g. SWE-CBO-123...",
        cboNotReq: "Not required",
        diploRef: "Ref.no...",
        typeOtherText: "Describe...",
        ecOtherText: "Describe equipment..."
    }
};