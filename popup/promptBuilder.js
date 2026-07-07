console.log("promptBuilder loaded");

function buildPrompt(problemData) {
  return `
You are an expert competitive programmer.

Analyze the following LeetCode problem and generate high-quality test cases.

TITLE:
${problemData.title}

DESCRIPTION:
${problemData.description}

FUNCTION:

${problemData.functionSignature.returnType}
${problemData.functionSignature.functionName}
(
${problemData.parameters.map((p) => `${p.type} ${p.name}`).join(",\n")}
)

CONSTRAINTS:

${problemData.constraints.join("\n")}

EXAMPLES:

${problemData.examples.join("\n\n")}

IMPORTANT RULES:

1. Every testcase MUST satisfy ALL constraints.
2. Never generate invalid inputs.
3. Respect array sizes, matrix dimensions, tree structure and graph constraints.
4. Generate diverse testcases:
   - Minimum boundary
   - Maximum boundary
   - Edge cases
   - Duplicate values (if allowed)
   - Sorted inputs
   - Reverse sorted inputs
   - Random valid inputs
5. Use the exact parameter names from the function signature.
6. Include the expected output whenever it can be determined.

Generate EXACTLY 5 testcases.

Return ONLY valid JSON.

{
  "testcases":[
    {
      "name":"...",
      "category":"...",
      "values":{
      },
      "expected": ...
    }
  ]
}

Do not return markdown.
Do not explain anything.
Return only JSON.
`;
}

window.buildPrompt = buildPrompt;
