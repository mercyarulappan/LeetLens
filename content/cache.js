let cachedProblemData = null;

async function refreshProblemData() {
  const problemData = getProblemData();

  const questionData = await fetchQuestionData();

  const signature = parseJavaSignature(questionData);

  const parameters = signature ? signature.parameters : [];

  cachedProblemData = {
    slug: questionData.titleSlug,

    title: problemData.title,

    description: getDescription(),

    constraints: problemData.constraints,

    examples: getExamples(),

    functionSignature: signature,

    parameters,
  };

  console.log("Cache Updated");
  console.log(cachedProblemData);

  return cachedProblemData;
}

function getCachedProblemData() {
  return cachedProblemData;
}

window.refreshProblemData = refreshProblemData;
window.getCachedProblemData = getCachedProblemData;
