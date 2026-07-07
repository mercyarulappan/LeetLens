console.log("gemini loaded");

async function generateWithGemini(apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  );

  console.log("HTTP Status:", response.status);

  const json = await response.json();

  console.log("Gemini Response:");
  console.log(json);

  if (!response.ok) {
    throw new Error(JSON.stringify(json, null, 2));
  }

  if (response.status === 503) {
    throw new Error(
      "Gemini is currently busy. Please try again in a few seconds.",
    );
  }

  if (!json.candidates) {
    throw new Error(
      "No candidates returned.\n\n" + JSON.stringify(json, null, 2),
    );
  }

  return json.candidates[0].content.parts[0].text;
}

window.generateWithGemini = generateWithGemini;
