import express from "express";
import studySpots from "./data/spots.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

function pageTemplate(title, content) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body>
    <main class="container">
      ${content}
    </main>
  </body>
</html>`;
}

function spotCard(spot) {
  return `<article class="spot-card">
    <img src="${spot.image}" alt="${spot.name}">
    <div class="spot-card-body">
      <h2>${spot.name}</h2>
      <p>${spot.description}</p>
      <p><strong>Location:</strong> ${spot.location}</p>
      <p><strong>Noise Level:</strong> ${spot.noiseLevel}</p>
      <a href="/spots/${spot.id}" role="button">View Details</a>
    </div>
  </article>`;
}

function detailRows(spot) {
  return Object.entries(spot)
    .filter(([key]) => key !== "id" && key !== "image")
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
      return `<tr>
        <th scope="row">${label}</th>
        <td>${value}</td>
      </tr>`;
    })
    .join("");
}

app.get("/", (req, res) => {
  const cards = studySpots.map(spotCard).join("");

  res.send(
    pageTemplate(
      "Campus Study Spots",
      `<header class="page-header">
        <p class="eyebrow">Student listicle guide</p>
        <h1>Campus Study Spots</h1>
        <p>Five useful places to read, review notes, write papers, and meet with classmates.</p>
      </header>
      <section class="spot-grid" aria-label="Study spots">
        ${cards}
      </section>`
    )
  );
});

app.get("/spots/:id", (req, res) => {
  const spot = studySpots.find((item) => item.id === req.params.id);

  if (!spot) {
    res.status(404).send(
      pageTemplate(
        "Study Spot Not Found",
        `<section class="not-found">
          <h1>Study Spot Not Found</h1>
          <p>The study spot you requested does not exist.</p>
          <a href="/" role="button">Back to Home</a>
        </section>`
      )
    );
    return;
  }

  res.send(
    pageTemplate(
      `${spot.name} | Campus Study Spots`,
      `<nav>
        <ul>
          <li><a href="/">Campus Study Spots</a></li>
        </ul>
      </nav>
      <article class="detail-page">
        <img src="${spot.image}" alt="${spot.name}">
        <h1>${spot.name}</h1>
        <table>
          <tbody>
            ${detailRows(spot)}
          </tbody>
        </table>
        <a href="/" role="button" class="secondary">Back to all spots</a>
      </article>`
    )
  );
});

app.use((req, res) => {
  res.status(404).send(
    pageTemplate(
      "Page Not Found",
      `<section class="not-found">
        <h1>404: Page Not Found</h1>
        <p>There is no study spot or page at this address.</p>
        <a href="/" role="button">Back to Home</a>
      </section>`
    )
  );
});

app.listen(PORT, () => {
  console.log(`Campus Study Spots is running at http://localhost:${PORT}`);
});
