const statusMessage = document.querySelector("#status-message");
const detail = document.querySelector("#spot-detail");
const notFound = document.querySelector("#not-found");
const image = document.querySelector("#spot-image");
const name = document.querySelector("#spot-name");
const details = document.querySelector("#spot-details");

const detailFields = [
  ["Description", "description"],
  ["Location", "location"],
  ["Noise Level", "noise_level"],
  ["Best For", "best_for"],
  ["Seating", "seating"],
  ["Hours", "hours"],
  ["Power Outlets", "power_outlets"]
];

function createDetailRow(label, value) {
  const row = document.createElement("tr");
  const heading = document.createElement("th");
  const cell = document.createElement("td");

  heading.scope = "row";
  heading.textContent = label;
  cell.textContent = value;
  row.append(heading, cell);

  return row;
}

function showNotFound() {
  document.title = "Study Spot Not Found | Campus Study Spots";
  statusMessage.hidden = true;
  detail.hidden = true;
  notFound.hidden = false;
}

async function loadStudySpot() {
  const id = window.location.pathname.split("/").filter(Boolean).pop();

  if (!id) {
    showNotFound();
    return;
  }

  try {
    const response = await fetch(`/api/spots/${encodeURIComponent(id)}`);

    if (response.status === 404) {
      showNotFound();
      return;
    }

    if (!response.ok) {
      throw new Error("The study spot could not be loaded.");
    }

    const spot = await response.json();
    const rows = detailFields.map(([label, key]) =>
      createDetailRow(label, spot[key])
    );

    document.title = `${spot.name} | Campus Study Spots`;
    image.src = spot.image;
    image.alt = spot.name;
    name.textContent = spot.name;
    details.replaceChildren(...rows);
    statusMessage.hidden = true;
    detail.hidden = false;
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Unable to load this study spot. Please try again later.";
    statusMessage.classList.add("error-message");
  }
}

loadStudySpot();
