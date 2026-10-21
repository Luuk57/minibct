let statusHuidig = "UIT DIENST";
let isRitActief = false;
let startTijdObject = null;
let timerInterval = null;
let secondenTeller = 0;

// BCT Status aanpassen
function setBctStatus(status, kleur) {
  statusHuidig = status;
  const box = document.getElementById('statusBox');
  document.getElementById('statusTekst').innerText = status;
  box.style.backgroundColor = kleur;
}

// GPS ophalen via de browser
function haalGpsOp() {
  if (!navigator.geolocation) {
    alert("Geolocatie wordt niet ondersteund door je browser.");
    return;
  }
  document.getElementById('melding').innerText = "GPS-locatie zoeken...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById('vanLocatie').value = `GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
      document.getElementById('melding').innerText = "GPS-locatie gevonden!";
    },
    () => {
      document.getElementById('melding').innerText = "GPS ophalen mislukt.";
    }
  );
}

// Rit Starten / Stoppen
function toggleRit() {
  const van = document.getElementById('vanLocatie').value;
  const naar = document.getElementById('naarLocatie').value;
  const url = document.getElementById('scriptUrl').value;

  if (!van || !naar) {
    alert("Vul a.u.b. zowel het vertrekadres als het aankomstadres in.");
    return;
  }

  const knop = document.getElementById('btnStartStop');

  if (!isRitActief) {
    // START RIT
    isRitActief = true;
    startTijdObject = new Date();
    secondenTeller = 0;
    
    setBctStatus("IN RIT", "#27ae60");
    knop.innerText = "⏹ Beëindig & Sla Rit op";
    knop.className = "btn btn-rood";

    timerInterval = setInterval(() => {
      secondenTeller++;
      const uren = String(Math.floor(secondenTeller / 3600)).padStart(2, '0');
      const min = String(Math.floor((secondenTeller % 3600) / 60)).padStart(2, '0');
      const sec = String(secondenTeller % 60).padStart(2, '0');
      document.getElementById('timerTekst').innerText = `${uren}:${min}:${sec}`;
    }, 1000);

    document.getElementById('melding').innerText = "Rit gestart.";
  } else {
    // STOP RIT
    isRitActief = false;
    clearInterval(timerInterval);

    const eindTijdObject = new Date();
    
    // Formatteer duur naar hh:mm:ss
    const duurUren = String(Math.floor(secondenTeller / 3600)).padStart(2, '0');
    const duurMin = String(Math.floor((secondenTeller % 3600) / 60)).padStart(2, '0');
    const duurSec = String(secondenTeller % 60).padStart(2, '0');
    const geformatteerdeDuur = `${duurUren}:${duurMin}:${duurSec}`;

    const payload = {
      afspraakDatumTijd: startTijdObject.toLocaleString('nl-NL'),
      startTijd: startTijdObject.toLocaleTimeString('nl-NL'),
      eindTijd: eindTijdObject.toLocaleTimeString('nl-NL'),
      duur: geformatteerdeDuur,
      van: van,
      naar: naar,
      status: "Voltooid"
    };

    document.getElementById('melding').innerText = "Rit opslaan in Google Sheets...";

    if (url) {
      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        document.getElementById('melding').innerText = "Rit succesvol opgeslagen!";
      })
      .catch(() => {
        document.getElementById('melding').innerText = "Fout bij opslaan in Sheets.";
      });
    } else {
      document.getElementById('melding').innerText = "Geen Google Web App URL ingevuld!";
    }

    setBctStatus("BESCHIKBAAR", "#27ae60");
    knop.innerText = "▶ Start Rit";
    knop.className = "btn btn-groen";
  }
}
