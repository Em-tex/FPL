# Melding om grensekryssende droneflyging (CBO Flight Plan)

![Status](https://img.shields.io/badge/Status-Beta-blue)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Et enkelt, nettbasert verktøy for å generere standardiserte meldinger om grensekryssende droneflyging (Cross-Border Operations).

Dette verktøyet lar operatører fylle ut informasjon om flygingen, tegne eller importere rute i kart, og eksportere informasjonen som både en **utskriftsvennlig PDF** og en **maskinlesbar JSON-fil**.

## 🎯 Formål

Formålet med løsningen er å forenkle informasjonsflyten mellom droneoperatører og relevante myndigheter (Luftfartstilsynet, Toll, Forsvaret og Avinor) ved flyging over landegrenser.

Løsningen fyller gapet mellom kravene i SERA (Standardised European Rules of the Air) om flight plan, og behovet for en proporsjonal tilnærming for ubemannet luftfart.

## ✨ Funksjonalitet

* **Flerspråklig:** Støtte for både Norsk 🇳🇴 og Engelsk 🇬🇧 (byttes via knapp).
* **Ingen server nødvendig:** Kjører 100% i nettleseren (Client-side). Ingen data lagres sentralt.
* **Interaktivt Kart:** * Basert på Leaflet (OpenStreetMap).
    * Tegn rute manuelt.
    * Støtte for import av **KML** og **GPX** filer.
* **Eksport:**
    * **PDF:** Genererer en ryddig rapport via nettleserens utskriftsdialog (CSS `@media print`).
    * **JSON:** Eksporterer alle data + GeoJSON av ruten for import i andre systemer.
* **Relevante datafelt:** Tilpasset droneoperasjoner (OAT-nummer, CBO-nummer, Elektronisk synlighet/Remote ID).

## 🚀 Komme i gang

Du kan kjøre dette verktøyet direkte fra din lokale maskin eller hoste det på en enkel webserver (f.eks. GitHub Pages).

### Kjøre lokalt
1.  Klon dette repoet:
    ```bash
    git clone [https://github.com/ditt-brukernavn/drone-cbo-form.git](https://github.com/ditt-brukernavn/drone-cbo-form.git)
    ```
2.  Naviger til mappen:
    ```bash
    cd drone-cbo-form
    ```
3.  Legg inn logo og favicon:
    * Lagre din logo som `logo.png`.
    * Lagre favicon som `favicon.png`.
4.  Åpne `index.html` i din nettleser.

### Avhengigheter
Verktøyet bruker følgende biblioteker via CDN (krever internettilgang):
* [Leaflet.js](https://leafletjs.com/) (Kartvisning)
* [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) (Tegneverktøy)
* [Leaflet Omnivore](https://github.com/mapbox/leaflet-omnivore) (KML/GPX parsing)

## 📂 Filstruktur

```text
.
├── index.html      # Hovedfilen (HTML struktur)
├── style.css       # Design og print-layout
├── script.js       # Logikk for kart, språk og eksport
├── logo.png        # (Må legges til) Organisasjonslogo
├── favicon.png     # (Må legges til) Ikon
└── README.md       # Denne filen