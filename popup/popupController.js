console.log("Popup Controller Loaded");

/**
 * Get Gemini API Key
 */
async function getApiKey() {
  const result = await chrome.storage.local.get(["geminiApiKey"]);

  return result.geminiApiKey;
}

/**
 * Get current LeetCode problem data
 */
async function getProblemData() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

 

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "GET_PROBLEM_DATA",
    });

   

    if (!response || !response.success) {
      throw new Error("Unable to fetch problem data.");
    }

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Generate AI Testcases
 */
async function generateAITestcases() {
 
  const apiKey = await getApiKey();

  const problem = await getProblemData();

  const prompt = buildPrompt(problem);
  const cache = await chrome.storage.local.get(["aiTestcases", "problemSlug"]);

  if (cache.problemSlug === problem.slug && cache.aiTestcases) {

    return cache.aiTestcases;
  }


  const aiText = await generateWithGemini(apiKey, prompt);


  const cleanText = aiText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const aiData = JSON.parse(cleanText);
  await 
  chrome.storage.local.set({
    aiTestcases: aiData,
    problemSlug: problem.slug,
  });

  console.log(problem);
  console.log(problem.slug);


  return aiData;
}
window.generateAITestcases = generateAITestcases;
