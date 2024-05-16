import fetch from "node-fetch";

async function main() {
  const request = await fetch("https://www.kansallisgalleria.fi/api/search", {
    headers: {
      accept: "*/*",
      "accept-language": "en,fi;q=0.9,en-US;q=0.8,la;q=0.7",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "same-origin",
      "sec-fetch-site": "same-origin",
      cookie:
        "CookieConsent={stamp:%27qdcuRd9nh+JoK4LVDVz/1rM62KBOS5tPRbcRqluI8UCkFM3lgDhBzg==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1707304654777%2Cregion:%27fi%27}; connect.sid=s%3ANgcP73RPlSgKE_cZZ9PIbaKxrtLDY13f.fkojqJ0UiK%2FA3vvAAK1gGl%2Bp8vXOO9OwfDI8xahAR24",
      Referer:
        "https://www.kansallisgalleria.fi/en/search?authors[]=Albert%20Edelfelt&copyrightFree=true",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify({
      authors: ["Albert Edelfelt"],
      category: "",
      classification: "",
      copyrightFree: true,
      hasImage: true,
      keywords: [],
      onDisplay: "",
      searchTerms: [],
      titles: [],
      aliveAfter: null,
      aliveBefore: null,
      createdAfter: null,
      createdBefore: null,
      museums: [],
      collection: "",
      lang: "en",
    }),
    method: "POST",
  });

  const response = await request.json();

  // console.log(JSON.stringify(response));

  // const media = response.data[0].multimedia;
  const media = response.data.filter((data) => data.hasOwnProperty("filename"));
  console.log(media);
}

try {
  main();
} catch (error) {
  console.log(error);
}
