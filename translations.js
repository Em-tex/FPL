const translations = {
    no: {
        pageTitle: "Melding om grensekryssende droneflyging",
        mainHeader: "Melding om grensekryssende droneflyging",
        introBlock: "Skjema for informasjon til Luftfartstilsynet, Toll, Forsvaret og Avinor ved grensekrysning.\nMerk: Dette skjemaet er primært for spesifikk kategori og statsluftfart, og er ikke et krav for flyging i åpen kategori.",
        
        // Seksjon 1
        sect1Header: "1. Operatør og Tillatelser",
        lblOperatorName: "Operatørnavn (Selskap/Privat):",
        lblOperatorEmail: "Operatør E-post:",
        lblOperatorPhone: "Operatør Telefon:",
        lblPilotName: "Navn på Pilot:",
        lblPilotPhone: "Pilot Telefon (tilgjengelig under flyging):",
        
        subHeaderAuth: "Tillatelser / Autorisasjoner",
        chkStateAircraft: "Militær / Statsluftfart (Unntatt fra EASA-regler)",
        lblOat: "Kreves for operatører uten norsk OAT-nummer:",
        helpOat: "Fylles ut hvis du ikke har et norsk tildelt nummer (f.eks. utenlandske operatører).",
        lblCbo: "CBO/CRB-nummer (Bekreftelse fra besøksland):",
        helpCbo: "Kreves for utenlandske operatører (også fra int. farvann).",
        chkIntWaters: "Passering fra internasjonalt farvann",
        
        // Seksjon 2
        sect2Header: "2. Fartøy (Drone)",
        lblManufacturer: "Produsent:",
        lblModel: "Modell:",
        lblMtom: "MTOM (kg):", 
        lblPowerplant: "Drivlinje / Powerplant:", // NY
        lblDroneType: "Fartøytype:",
        
        // Dropdown valg
        optFixedWing: "Fixed Wing (Fly)",
        optHelicopter: "Helikopter (Single rotor)",
        optAirship: "Luftskip",
        optBalloon: "Ballong",
        optOther: "Annet",
        // Powerplant valg
        optElectric: "Elektrisk (Batteri)",
        optPiston: "Stempelmotor / Hybrid",
        optTurbine: "Turbin / Jet",
        optNone: "Ingen (Glidefly/Ballong)",

        lblTypeOtherDesc: "Beskriv fartøytype:",
        lblColor: "Farge / Kjennetegn:",
        lblEc: "Elektronisk Synlighet (Velg alle som gjelder):",
        lblOther: "Annet",
        lblEcDesc: "Beskriv annet utstyr:",

        // Seksjon 3
        sect3Header: "3. Flyging og Rute",
        lblDepPlace: "Avgangssted:",
        lblDepTime: "Avgangstid (UTC/Lokal):",
        lblArrPlace: "Landingssted:",
        lblArrTime: "Landingstid (Estimert):",
        lblBorderPoint: "Sted for grensepassering (Navn/Koordinat):",
        
        // NYE FELT FPL
        lblAltitude: "Planlagt høyde (Maks):",
        lblSpeed: "Cruising Speed (kts/kmh):",
        lblEndurance: "Endurance (Estimert flytid):",
        lblRadio: "Vil opprette radiokontakt med ATC (TWR/Farris)",
        
        lblRouteMap: "Ruteoversikt",
        txtMapHelp: "Tegn rute i kartet eller last opp KML/GPX-fil.",
        btnMapClear: "Slett kartdata",
        
        btnJson: "Last ned Data (JSON)",
        btnPdf: "Last ned / Skriv ut (PDF)",
        
        infoBoxHeader: "Innsending og Viktig Info",
        infoSendTo: "Når skjemaet er utfylt og PDF/JSON er lastet ned, sendes filene til:",
        disclaimerTitle: "Merk:",
        footerBaseText: "Dette skjemaet er en orientering. Operatøren er ansvarlig for tillatelser. Bruk av sensorer (kamera m.m.) må for utenlandske operatører rapporteres til "
    },
    en: {
        pageTitle: "Notification of Border-Crossing Drone Operation",
        mainHeader: "Notification of Border-Crossing Drone Operation",
        introBlock: "Form for information to the CAA Norway, Customs, the Armed Forces, and Avinor regarding border crossing.\nNote: This form is primarily for the specific category and state aviation, and is not a requirement for operations in the open category.",
        
        // Section 1
        sect1Header: "1. Operator and Permissions",
        lblOperatorName: "Operator Name (Company/Private):",
        lblOperatorEmail: "Operator Email:",
        lblOperatorPhone: "Operator Phone:",
        lblPilotName: "Pilot Name:",
        lblPilotPhone: "Pilot Phone (available during flight):",
        
        subHeaderAuth: "Permissions / Authorisations",
        chkStateAircraft: "Military / State Aircraft (Exempt from EASA rules)",
        lblOat: "Required for operators without a Norwegian OAT number:",
        helpOat: "Fill this out if you do not have a Norwegian assigned number (e.g. foreign operators).",
        lblCbo: "CBO/CRB Number (Confirmation from visiting state):",
        helpCbo: "Required for foreign operators (also from int. waters).",
        chkIntWaters: "Crossing from International Waters",

        // Section 2
        sect2Header: "2. Aircraft (UAS)",
        lblManufacturer: "Manufacturer:",
        lblModel: "Model:",
        lblMtom: "MTOM (kg):",
        lblPowerplant: "Powerplant / Propulsion:", // NEW
        lblDroneType: "Type of Aircraft:",
        
        optFixedWing: "Fixed Wing",
        optHelicopter: "Helicopter (Single rotor)",
        optAirship: "Airship",
        optBalloon: "Balloon",
        optOther: "Other",

        optElectric: "Electric (Battery)",
        optPiston: "Piston / Hybrid",
        optTurbine: "Turbine / Jet",
        optNone: "None (Glider/Balloon)",

        lblTypeOtherDesc: "Describe aircraft type:",
        lblColor: "Color / Markings:",
        lblEc: "Electronic Conspicuity (Select all that apply):",
        lblOther: "Other",
        lblEcDesc: "Describe other equipment:",

        // Section 3
        sect3Header: "3. Flight and Route",
        lblDepPlace: "Departure Place:",
        lblDepTime: "Departure Time (UTC/Local):",
        lblArrPlace: "Landing Place:",
        lblArrTime: "Landing Time (Estimated):",
        lblBorderPoint: "Border Crossing Point (Name/Coord):",
        
        lblAltitude: "Planned Altitude (Max):",
        lblSpeed: "Cruising Speed (kts/kmh):",
        lblEndurance: "Endurance (Est. flight time):",
        lblRadio: "Will maintain radio contact with ATC",

        lblRouteMap: "Route Overview",
        txtMapHelp: "Draw route on map or upload KML/GPX file.",
        btnMapClear: "Clear Map Data",
        
        btnJson: "Download Data (JSON)",
        btnPdf: "Download / Print (PDF)",
        
        infoBoxHeader: "Submission and Important Info",
        infoSendTo: "Once filled out and downloaded, send the files to:",
        disclaimerTitle: "Note:",
        footerBaseText: "This form is for information purposes only. The operator is responsible for permissions. Use of sensors (camera etc.) must for foreign operators be reported to "
    }
};

const placeholders = {
    no: {
        manufacturer: "F.eks. DJI, Wingtra...",
        model: "F.eks. Matrice 300...",
        color: "F.eks. Oransje, Grå...",
        borderPoint: "F.eks. Grensevarde 123 eller E6 Svinesund",
        oatNumber: "F.eks. UAS-NO-...",
        cboNumber: "F.eks. SWE-CBO-12345/001",
        speed: "F.eks. 15 m/s eller 30 kts",
        endurance: "F.eks. 45 min",
        altitude: "Verdi (f.eks. 120)"
    },
    en: {
        manufacturer: "E.g. DJI, Wingtra...",
        model: "E.g. Matrice 300...",
        color: "E.g. Orange, Grey...",
        borderPoint: "E.g. Border marker 123 or E6 Svinesund",
        oatNumber: "E.g. UAS-NO-...",
        cboNumber: "E.g. SWE-CBO-12345/001",
        speed: "E.g. 15 m/s or 30 kts",
        endurance: "E.g. 45 min",
        altitude: "Value (e.g. 400)"
    }
};