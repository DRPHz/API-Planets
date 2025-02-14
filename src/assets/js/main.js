import { fetchData } from "./api.js";
import "../css/style.css";

const PLANET_NAMES = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];
const API_ROOT = "https://api.api-ninjas.com/v1/";
const planets = [];
const overviewSection = document.getElementById("overview");
const detailsSection = document.getElementById("details");
const menuItems = document.getElementById("menuItems");
const pageTitle = document.getElementById("pageTitle");

//De init functie zorgt ervoor dat alles op de juiste manier wordt uitgevoerd.
async function init() {
  await loadPlanets();
  buildMenu();
  document
    .getElementById("menuToggle")
    .addEventListener("click", () =>
      document.getElementById("HamburgerMenu").classList.toggle("hidden")
    );
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);
  showOverview();
}

//Om de planeten op te halen kunnen we niet gebruik maken van https://api.api-ninjas.com/v1/. Zoals beschreven op de documentatie van de API moeten wij een parameter meegeven in de URL. In dit geval nemen we de naam van het planeet. Om alle planeten op te halen maken we gebruik van arrays.
async function loadPlanets() {
  try {
    const responses = await Promise.all(
      PLANET_NAMES.map((name) => fetchData(`${API_ROOT}planets?name=${name}`))
    );
    planets.push(...responses.map((res) => res.data[0]));
  } catch (error) {
    console.error("Error loading planets:", error);
  }
}

//functie die alle planeten toevoegt in de hamburger menu. aangezien de planeet namen in dit geval hardcoded zijn, had dit ook eventueel hardcoded kunnen zijn in index.html. Toch is deze functie handing mocht er meer planeten bij komen of in plaats van hardcoded namen, halen we ze van de API.
function buildMenu() {
  menuItems.innerHTML = "";
  planets.forEach((planet) => {
    const link = document.createElement("a");
    link.href = `#${planet.name.toLowerCase()}`;
    link.className =
      "block sm:inline-block py-2 px-4 hover:bg-gray-700 rounded";
    link.textContent = planet.name;
    menuItems.appendChild(link);
  });
}

//Simpele routing functie, die de hash van de URL gebruikt om de juiste "pagina" te tonen.
function handleRoute() {
  const planetName = window.location.hash.substring(1);
  const planet = planets.find((p) => p.name.toLowerCase() === planetName);
  planet ? showPlanetDetails(planet) : showOverview();
}

//Functie om de overview van de planeten te tonen en de details "pagina" van de planeten te verbergen. oftewel de "homepagina".
function showOverview() {
  overviewSection.innerHTML = "";
  detailsSection.classList.add("hidden");
  overviewSection.classList.remove("hidden");
  pageTitle.textContent = "Overview Planets";
  planets.forEach((planet) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105";
    card.innerHTML = `
      <img src="./assets/img/${planet.name.toLowerCase()}.jpeg" alt="${
      planet.name
    }" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-semibold text-center mt-4">${planet.name}</h3>
      </div>
    `;
    card.addEventListener(
      "click",
      () => (window.location.hash = planet.name.toLowerCase())
    );
    overviewSection.appendChild(card);
  });
}

//Functie om de details van de geselecteerde planeet te tonen op basis van de hash en de overview te verbergen.
function showPlanetDetails(planet) {
  overviewSection.classList.add("hidden");
  detailsSection.classList.remove("hidden");
  pageTitle.textContent = planet.name;
  document.getElementById(
    "planetImage"
  ).src = `./assets/img/${planet.name.toLowerCase()}.jpeg`;
  document.getElementById("planetImage").alt = planet.name;
  document.getElementById("planetName").textContent = planet.name;
  document.getElementById("planetDetails").innerHTML = `
    <p><span class="font-semibold">Mass:</span> ${planet.mass} Jupiters</p>
    <p><span class="font-semibold">Radius:</span> ${planet.radius} Jupiters</p>
    <p><span class="font-semibold">Orbital Period:</span> ${planet.period} days</p>
    <p><span class="font-semibold">Temperature:</span> ${planet.temperature} K</p>
    <p><span class="font-semibold">Distance:</span> ${planet.distance_light_year} light years</p>
    <p><span class="font-semibold">Semi-Major Axis:</span> ${planet.semi_major_axis} AU</p>
  `;
}

init();
