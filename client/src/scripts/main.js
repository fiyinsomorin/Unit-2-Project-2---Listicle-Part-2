const grid = document.querySelector("#spot-grid");
const statusMessage = document.querySelector("#status-message");

function createParagraph(label, value) {
  const paragraph = document.createElement("p");
  const strong = document.createElement("strong");

  strong.textContent = `${label}: `;
  paragraph.append(strong, value);

  return paragraph;
}

function createSpotCard(spot) {
  const card = document.createElement("article");
  const image = document.createElement("img");
  const body = document.createElement("div");
  const heading = document.createElement("h2");
  const description = document.createElement("p");
  const link = document.createElement("a");

  card.className = "spot-card";
  image.src = spot.image;
  image.alt = spot.name;
  body.className = "spot-card-body";
  heading.textContent = spot.name;
  description.textContent = spot.description;
  link.href = `/spots/${encodeURIComponent(spot.id)}`;
  link.role = "button";
  link.textContent = "View Details";

  body.append(
    heading,
    description,
    createParagraph("Location", spot.location),
    createParagraph("Noise Level", spot.noise_level),
    link
  );
  card.append(image, body);

  return card;
}

async function loadStudySpots() {
  try {
    const response = await fetch("/api/spots");

    if (!response.ok) {
      throw new Error("The study spots could not be loaded.");
    }

    const spots = await response.json();
    const cards = spots.map(createSpotCard);

    grid.replaceChildren(...cards);
    statusMessage.hidden = true;
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Unable to load study spots. Please try again later.";
    statusMessage.classList.add("error-message");
  }
}

loadStudySpots();
