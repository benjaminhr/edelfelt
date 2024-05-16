import fs from "node:fs";
import dataset from "./dataset.json" with { type: "json" };
import axios from "axios";
import url from "node:url"

const edelfelt = dataset.filter(data => {
  const author = data.people.find(people => people.firstName === "Albert" && people.familyName === "Edelfelt")

  if (author) {
    return data
  }
})

const images = edelfelt.filter(result => result.multimedia.length > 0).map((result) => {
  return { imageUrl: result.multimedia[0].jpg["500"] }
});

console.log(`${images.length} images.`);

async function downloadFile(fileUrl) {
  const parsedUrl = new URL(fileUrl);
  const pathname = parsedUrl.pathname;
  const filename = pathname.split('/').pop(); 

  const writer = fs.createWriteStream("./images/" + filename);

  try {
      const response = await axios({
          method: 'get',
          url: fileUrl,
          responseType: 'stream'
      });

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
      });
  } catch (error) {
      console.error("Failed to download file:", error);
  }
}


for (const image of images) { 
  downloadFile(image.imageUrl)
  .then(() => console.log('Download completed.'))
  .catch(error => console.error('Download failed:', error));
}
