import fs from "node:fs/promises";
import axios from "axios";

const API_KEY = "d095d7fa1ee4d57aabfb4e047f69dd83";

async function main() {
  const filename = "dataset.json";
  const allObjects = await downloadFullDataset();

  await fs.writeFile(filename, prettyPrintJson(allObjects));
  console.log(
    `Downloaded full dataset containing ${allObjects.length} objects to file: ${filename}`
  );
}

// async function main() {
// const results = await search({
//   // searchTerms: ["Albert Edelfelt"],
//   authors: ["Albert Edelfelt"],
//   hasImage: true,
// });

// const images = results.map((result) => {
//   return result.multimedia.length > 0
//     ? { imageUrl: result.multimedia[0].jpg["500"] }
//     : {};
// });

// console.log(images);
// console.log(`${results.length} results`);
// }

async function search(params) {
  const response = await httpClient.post("/v1/search", params);
  return response.data;
}

async function downloadFullDataset() {
  const response = await httpClient.get("/v1/objects");
  return response.data;
}

const httpClient = axios.create({
  baseURL: "https://www.kansallisgalleria.fi/api",
  headers: { "x-api-key": API_KEY },
});

function prettyPrintJson(value) {
  return JSON.stringify(value, null, 2);
}

main().catch((err) => {
  if (err.response) {
    console.error(err.response.status, err.response.data);
  } else {
    console.error(err);
  }
  process.exit(1);
});
