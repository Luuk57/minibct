function planRit() {
  const url = document.getElementById('scriptUrl').value;
  const afspraakDatumTijd = document.getElementById('afspraakDatumTijd').value;
  const naam = document.getElementById('naam').value;
  const haalLocatie = document.getElementById('haalLocatie').value;
  const brengLocatie = document.getElementById('brengLocatie').value;
  const telefoonnummer = document.getElementById('telefoonnummer').value;
  const opmerking = document.getElementById('opmerking').value;

  if (!haalLocatie || !brengLocatie || !naam) {
    alert("Vul ten minste de naam, haal- en brenglocatie in.");
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

  document.getElementById('melding').innerText = "Rit inplannen...";

  if (url) {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(() => {
      document.getElementById('melding').innerText = "Rit succesvol toegevoegd aan de planning!";
      // Formulier leegmaken
      document.getElementById('naam').value = '';
      document.getElementById('haalLocatie').value = '';
      document.getElementById('brengLocatie').value = '';
      document.getElementById('telefoonnummer').value = '';
      document.getElementById('opmerking').value = '';
    })
    .catch((err) => {
      console.error(err);
      document.getElementById('melding').innerText = "Fout bij opslaan in de planning.";
    });
  } else {
    document.getElementById('melding').innerText = "Geen Google Web App URL ingevuld!";
  }
}
