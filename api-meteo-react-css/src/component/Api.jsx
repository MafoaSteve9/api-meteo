import React, { useState } from 'react';

function Api() {
  const [ville, setVille] = useState('Paris');
  const [meteo, setMeteo] = useState(null);

  const handleChangeVille = () => {
    const newVille = prompt('Quelle ville souhaitez-vous voir?');
    if (newVille) {
      setVille(newVille);
      recevoirTemperature(newVille);
    }
  };

  const recevoirTemperature = async (ville) => {
    const apiKey = 'eef24773ceb165fa580be08f57077e83';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Un problème est survenu');
      }
      const data = await response.json();
      const temperature = data.main.temp;
      setMeteo(temperature);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='main'>  
        <h1>Météo</h1>
        <div className="bloc1">
          <span id="ville">{ville}</span>
        </div>
        <div className="bloc2">
          <span id="meteo">{meteo !== null ? `${meteo}°C` : 'Chargement en cours...'}</span>
        </div>
        <div id="changer" className="style" onClick={handleChangeVille}>
          CHANGER DE VILLE
        </div>
    </div>
  );
}

export default Api;
