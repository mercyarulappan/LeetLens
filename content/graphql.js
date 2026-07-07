async function fetchQuestionData() {
  const slug = location.pathname.split("/")[2];

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "questionData",
      variables: {
        titleSlug: slug,
      },
      query: `
        query questionData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            title
            titleSlug
            content
            codeSnippets {
              lang
              langSlug
              code
            }
          }
        }
      `,
    }),
  });

  const json = await response.json();

  return json.data.question;
}

window.fetchQuestionData = fetchQuestionData;
