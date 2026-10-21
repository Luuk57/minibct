let globaleKlantenMap = {};

// 1. Configuratie en Dropdowns laden vanuit Google Sheet (GET)
function laadConfiguratie() {
  const url = document.getElementById('scriptUrl').value;
  if (!url) {
    alert("Vul eerst je Web App URL in.");
    return;
  }

  document.getElementById('melding').innerText = "Configuratie ophalen uit Google Sheet...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById('melding').innerText = "Fout: " + data.error;
        return;
      }

      globaleKlantenMap = data.klanten || {};

      // Vul Klanten Dropdown
      const naamSelect = document.getElementById('naamSelect');
      naamSelect.innerHTML = '<option value="">-- Kies een klant of typ nieuw --</option>';
      Object.keys(globaleKlantenMap).forEach(naam => {
        const opt = document.createElement('option');
        opt.value = naam;
        opt.textContent = naam;
        naamSelect.appendChild(opt);
      });

      // Vul Haal Locaties Dropdown
      const haalSelect = document.getElementById('haalSelect');
      haalSelect.innerHTML = '<option value="">-- Kies ophaallocatie --</option>';
      (data.haalLocaties || []).forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc;
        opt.textContent = loc;
        haalSelect.appendChild(opt);
      });

      // Vul Breng Locaties Dropdown
      const brengSelect = document.getElementById('brengSelect');
      brengSelect.innerHTML = '<option value="">-- Kies brenglocatie --</option>';
      (data.brengLocaties || []).forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc;
        opt.textContent = loc;
        brengSelect.appendChild(opt);
      });

      document.getElementById('melding').innerText = "Configuratie succesvol geladen!";
    })
    .catch(err => {
      console.error(err);
      document.getElementById('melding').innerText = "Fout bij ophalen configuratie.";
    });
}

// 2. Wanneer een naam uit de dropdown wordt gekozen:
function opNaamSelectieVeranderd() {
  const gekozenNaam = document.getElementById('naamSelect').value;
  document.getElementById('naamInput').value = gekozenNaam;
  
  // Vul automatisch het gekoppelde telefoonnummer in
  if (gekozenNaam && globaleKlantenMap[gekozenNaam] !== undefined) {
    document.getElementById('telefoonnummer').value = globaleKlantenMap[gekozenNaam];
  }
}

// 3. Rit Opslaan (POST)
function planRit() {
  const url = document.getElementById('scriptUrl').value;
  const afspraakDatumTijd = document.getElementById('afspraakDatumTijd').value;
  const naam = document.getElementById('naamInput').value || document.getElementById('naamSelect').value;
  const haalLocatie = document.getElementById('haalInput').value || document.getElementById('haalSelect').value;
  const brengLocatie = document.getElementById('brengInput').value || document.getElementById('brengSelect').value;
  const telefoonnummer = document.getElementById('telefoonnummer').value;
  const opmerking = document.getElementById('opmerking').value;

  if (!naam || !haalLocatie || !brengLocatie) {
    alert("Vul ten minste een Naam, Haal- en Brenglocatie in.");
    return;
  }

  const payload = {
    afspraakDatumTijd: afspraakDatumTijd ? afspraakDatumTijd.replace('T', ' ') : new Date().toLocaleString('nl-NL'),
    naam: naam,
    haalLocatie: haalLocatie,
    brengLocatie: brengLocatie,
    telefoonnummer: telefoonnummer,
    opmerking: opmerking
  };

  document.getElementById('melding').innerText = "Rit inplannen & ID genereren...";

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    document.getElementById('melding').innerText = "Rit opgeslagen! Herladen van config...";
    // Maak velden leeg
    document.getElementById('naamInput').value = '';
    document.getElementById('haalInput').value = '';
    document.getElementById('brengInput').value = '';
    document.getElementById('telefoonnummer').value = '';
    document.getElementById('opmerking').value = '';
    // Herlaad config om nieuwe namen/nummers direct te zien
    setTimeout(laadConfiguratie, 1500);
  })
  .catch(err => {
    console.error(err);
    document.getElementById('melding').innerText = "Fout bij opslaan rit.";
  });
}

// 4. Config items toevoegen/verwijderen
function beheerConfig(operatie) {
  const url = document.getElementById('scriptUrl').value;
  const type = document.getElementById('configType').value;
  const waarde = document.getElementById('configWaarde').value;

  if (!waarde) {
    alert("Vul een waarde in om toe te voegen of te verwijderen.");
    return;
  }

  const payload = {
    actie: "updateConfig",
    type: type,
    waarde: waarde,
    operatie: operatie
  };

  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => {
    alert(`Item succesvol ${operatie === 'add' ? 'toegevoegd' : 'verwijderd'}!`);
    document.getElementById('configWaarde').value = '';
    setTimeout(laadConfiguratie, 1000);
  });
}
