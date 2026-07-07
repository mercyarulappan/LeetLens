
function parseJavaSignature(questionData) {
  const javaSnippet = questionData.codeSnippets.find(
    (x) => x.langSlug === "java",
  );

  if (!javaSnippet) return null;

  const code = javaSnippet.code;

  console.log("Java Code:");
  console.log(code);

  const match = code.match(/public\s+([\w<>\[\]]+)\s+(\w+)\s*\((.*?)\)/);

  if (!match) {
    console.log("Java signature not found");
    return null;
  }
  

  const returnType = match[1];
  const functionName = match[2];
  const parameterString = match[3];

  const parameters =
    parameterString.trim() === ""
      ? []
      : parameterString.split(",").map((p) => {
          const parts = p.trim().split(/\s+/);

          return {
            type: parts[0],
            name: parts[1],
          };
        });

  return {
    returnType,
    functionName,
    parameters,
  };
}

window.parseJavaSignature = parseJavaSignature;