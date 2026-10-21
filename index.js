<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini-BCT Taxi</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #121212; color: #fff; margin: 0; padding: 20px; }
    .card { background-color: #1e1e1e; padding: 15px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
    .status-box { padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 15px; font-weight: bold; background-color: #e74c3c; }
    .status-box h2 { margin: 0; font-size: 24px; }
    .knop-rij { display: flex; gap: 8px; margin-bottom: 15px; }
    .btn { flex: 1; padding: 12px; border: none; border-radius: 6px; color: #fff; font-weight: bold; cursor: pointer; text-align: center; }
    .btn-groen { background-color: #27ae60; }
    .btn-oranje { background-color: #f39c12; }
    .btn-rood { background-color: #e74c3c; }
    .btn-blauw { background-color: #2980b9; }
    input { width: 100%; padding: 10px; margin-top: 5px; margin-bottom: 12px; border-radius: 6px; border: 1px solid #444; background: #2c2c2c; color: #fff; box-sizing: border-box; }
    label { font-size: 13px; color: #aaa; }
    #melding { text-align: center; color: #f1c40f; margin-top: 10px; font-style: italic; }
  </style>
</head>
<body>

  <h2>🚕 Mini-BCT Taxicomputer</h2>

  <!-- Status scherm -->
  <div id="statusBox" class="status-box">
    <div style="font-size: 12px; letter-spacing: 1px;">BCT STATUS</div>
    <h2 id="statusTekst">UIT DIENST</h2>
    <div id="timerTekst" style="font-size: 16px; margin-top: 5px;">00:00:00</div>
  </div>

  <!-- Status knoppen -->
  <div class="knop-rij">
    <button class="btn btn-groen" onclick="setBctStatus('BESCHIKBAAR', '#27ae60')">Beschikbaar</button>
    <button class="btn btn-oranje" onclick="setBctStatus('PAUZE', '#f39c12')">Pauze</button>
    <button class="btn btn-rood" onclick="setBctStatus('UIT DIENST', '#e74c3c')">Uit Dienst</button>
  </div>

  <!-- Configuratiescherm -->
  <div class="card">
    <label for="scriptUrl">Google Web App URL:</label>
    <input type="text" id="scriptUrl" placeholder="Plak hier je Apps Script Web App URL...">
  </div>

  <!-- Rit Planner -->
  <div class="card">
    <label for="vanLocatie">Van (Ophaallocatie):</label>
    <div style="display: flex; gap: 8px;">
      <input type="text" id="vanLocatie" placeholder="Vertrekadres..." style="flex: 1;">
      <button class="btn btn-blauw" onclick="haalGpsOp()" style="flex: 0 0 70px; height: 38px; margin-top: 5px;">GPS</button>
    </div>

    <label for="naarLocatie">Naar (Bestemming):</label>
    <input type="text" id="naarLocatie" placeholder="Bestemming...">

    <button id="btnStartStop" class="btn btn-groen" style="width: 100%; font-size: 16px;" onclick="toggleRit()">▶ Start Rit</button>
    <div id="melding"></div>
  </div>

  <script src="script.js"></script>
</body>
</html>
