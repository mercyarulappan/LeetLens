console.log("popup.js loaded");
const container = document.getElementById("content");
const generateBtn = document.getElementById("generateBtn");

// ----------------------------
// Load Problem Information
// ----------------------------

async function loadProblemData() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "GET_PROBLEM_DATA",
    });

    if (!response || !response.success) {
      container.innerHTML = "Could not fetch problem data.";
      return;
    }

    let html = `
      <h3>${response.title}</h3>

      <div class="card">
        <strong>Description</strong>
        <br><br>
        ${response.description.substring(0, 300)}...
      </div>

    `;

        html += `
    <div class="card">
        <strong>Constraints</strong>

        <pre>
    ${response.constraints.join("\n")}
        </pre>
    </div>
    `;
    html += `<h3>Examples</h3>`;

    response.examples.forEach((example, index) => {
      html += `
        <div class="card">
          <strong>Example ${index + 1}</strong>

          <pre>${example}</pre>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = `
    <pre style="white-space:pre-wrap;color:red;">
${err.message}

${err.stack}
    </pre>
  `;
  }
}

loadProblemData();

// ----------------------------
// Generate AI Testcases
// ----------------------------

generateBtn.addEventListener("click", async () => {
  try {
    generateBtn.remove();

    container.innerHTML = `
      <h3>Generating AI Testcases...</h3>
      <p>Please wait...</p>
    `;



    const aiResponse = await generateAITestcases();

    console.log(aiResponse);

    let html = `
      <h2>AI Generated Testcases</h2>
    `;

    aiResponse.testcases.forEach((testcase, index) => {
      let inputText = "";

      for (const key in testcase.values) {
        inputText += `${key} = ${JSON.stringify(testcase.values[key])}\n`;
      }

      html += `
        <div class="card">

          <h3>${index + 1}. ${testcase.name}</h3>

          <p>
            <strong>Category:</strong> ${testcase.category}
          </p>

          <strong>Input</strong>

          <pre>${inputText}</pre>

          ${
            testcase.expected !== undefined
              ? `
              <strong>Expected Output</strong>

              <pre>${JSON.stringify(testcase.expected, null, 2)}</pre>
            `
              : ""
          }

          <button
            class="copyBtn"
            data-index="${index}">
            Copy
          </button>

        </div>
      `;
    });

    container.innerHTML = html;
    generateBtn.style.display = "block";

    // -------------------------
    // Copy Button
    // -------------------------

    document.querySelectorAll(".copyBtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const testcase = aiResponse.testcases[btn.dataset.index];

        const text = Object.values(testcase.values)
          .map((value) => JSON.stringify(value))
          .join("\n");

        navigator.clipboard.writeText(text);

        btn.innerText = "Copied";

        setTimeout(() => {
          btn.innerText = "Copy";
        }, 1500);
      });
    });
  } catch (err) {
     if (
       err.message &&
       err.message.includes("Could not establish connection")
     ) {
       container.innerHTML = `
      <div class="card">
        <h3>⚠️ Page Reload Required</h3>
        <p>Please reload the LeetCode page and try again.</p>
      </div>
    `;
       return;
     }
    generateBtn.remove();

    container.innerHTML = `
      <pre style="color:red;white-space:pre-wrap;">
${err.message}
      </pre>
    `;
  }
});