const apiKeyInput = document.getElementById("apiKey");

const saveBtn = document.getElementById("saveBtn");

const status = document.getElementById("status");

chrome.storage.local.get(["geminiApiKey"], (result) => {
  if (result.geminiApiKey) {
    apiKeyInput.value = result.geminiApiKey;
  }
});

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      geminiApiKey: apiKeyInput.value,
    },
    () => {
      status.innerText = "Saved Successfully";
    },
  );
});
