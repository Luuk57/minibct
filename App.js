const slaRitOpInSheet = async (ritGegevens) => {
  const url = "JOUW_GOOGLE_WEB_APP_URL_HIER";

  // De velden sluiten nu1-op-1 aan op je Google Sheet kopteksten
  const payload = {
    afspraakDatumTijd: ritGegevens.afspraakDatumTijd,
    startTijd: ritGegevens.startTijd,
    eindTijd: ritGegevens.eindTijd,
    duur: ritGegevens.duur,
    van: ritGegevens.van,
    naar: ritGegevens.naar,
    status: ritGegevens.status
  };

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log("Gegevens succesvol verzonden naar Google Sheet!");
  } catch (error) {
    console.error("Fout bij verzenden naar Google Sheet:", error);
  }
};
