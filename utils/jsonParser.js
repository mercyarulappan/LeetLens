function parseGeminiResponse(text) {
  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "");

  return JSON.parse(text);
}

window.parseGeminiResponse = parseGeminiResponse;
