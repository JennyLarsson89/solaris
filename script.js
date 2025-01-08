/* Main script */
import { elements } from "./elements.js";
import { getKey, getPlanets } from "./api.js";

// Handle click event for a planet
const handlePlanetClick = async (planetName) => {
    try {
        const key = await getKey("/keys");
        const data = await getPlanets("/bodies", key);
        const selectedPlanet = data.bodies.find(body => body.name === planetName);

        if (selectedPlanet) {
            displayPlanetInfo(selectedPlanet);
        } else {
            console.error('Planet not found');
        }
    } catch (error) {
        console.error(error);
    }
}

// Display planet info on the info page
const displayPlanetInfo = (planetData) => {
    elements.infoPage.style.display = 'block';
    elements.background.style.display = 'block';
    elements.earth1.style.display = 'block';
    elements.startPage.style.display = 'none'; 

    // Update UI elements with planet data
    elements.name.textContent = planetData.name.toUpperCase();
    elements.latinName.textContent = planetData.latinName.toUpperCase();
    elements.artInfo.textContent = planetData.desc;
    elements.circumference.textContent = `${planetData.circumference.toLocaleString()} Km`;
    elements.fromSun.textContent = `${planetData.distance.toLocaleString()} Km`;
    elements.maxTemp.textContent = `${planetData.temp.day}°C`;
    elements.minTemp.textContent = `${planetData.temp.night}°C`;

    // Display moons or a message if none exist
    elements.moons.textContent = planetData.moons.length === 0 
        ? `Denna planet har inga månar.` 
        : planetData.moons.join(", ");
}

// Return to the start page view
const returnToStartPage = () => {
    elements.infoPage.style.display = 'none';
    elements.background.style.display = 'none';
    elements.earth1.style.display = 'none';
    elements.earth2.style.display = 'none';
    elements.earth3.style.display = 'none';
    elements.startPage.style.display = 'grid';
}

// Add event listeners for each planet
const addPlanetEventListeners = () => {
    elements.mercury.addEventListener('click', () => handlePlanetClick('Merkurius'));
    elements.venus.addEventListener('click', () => handlePlanetClick('Venus'));
    elements.earth.addEventListener('click', () => handlePlanetClick('Jorden'));
    elements.mars.addEventListener('click', () => handlePlanetClick('Mars'));
    elements.jupiter.addEventListener('click', () => handlePlanetClick('Jupiter'));
    elements.saturn.addEventListener('click', () => handlePlanetClick('Saturnus'));
    elements.uranus.addEventListener('click', () => handlePlanetClick('Uranus'));
    elements.neptune.addEventListener('click', () => handlePlanetClick('Neptunus'));
    elements.sun.addEventListener('click', () => handlePlanetClick('Solen'));

    // Add event listeners for returning to start page
    elements.earth1.addEventListener('click', returnToStartPage);
    elements.earth2.addEventListener('click', returnToStartPage);
    elements.earth3.addEventListener('click', returnToStartPage);
}

// Initialize event listeners
addPlanetEventListeners();