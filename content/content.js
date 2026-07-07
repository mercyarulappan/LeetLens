console.log("TestGen content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received:", request.action);

  if (request.action === "GET_PROBLEM_DATA") {
    (async () => {
      try {
        const data = await refreshProblemData();

        sendResponse({
          success: true,
          ...data,
        });
      } catch (err) {
        console.error(err);

        sendResponse({
          success: false,
          error: err.message,
        });
      }
    })();

    return true; // VERY IMPORTANT
  }

  if (request.action === "ADD_TESTCASE") {
    const success = addTestcase();

    sendResponse({
      success,
    });

    return true;
  }
});

let currentUrl = location.href;

const observer = new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;

    console.log("Problem changed:");

    waitForProblemAndRefresh();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function waitForProblemAndRefresh() {
  const interval = setInterval(() => {
    const title = document.querySelector(".text-title-large a");

    if (title) {
      clearInterval(interval);

      console.log("Problem loaded:", title.innerText);

      (async () => {
        await refreshProblemData();
      })();
    }
  }, 300);
}

// fetchQuestionData().then((data) => {
//   console.log("GraphQL Result:");
//   console.log(data);
// });
