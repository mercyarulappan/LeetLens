console.log("inputFormatter loaded");

function convertToLeetCodeInput(values, parameters) {
  let lines = [];

  for (const p of parameters) {
    const value = values[p.name];

    lines.push(formatValue(value));
  }

  return lines.join("\n");
}

function formatValue(value) {
  if (Array.isArray(value)) return JSON.stringify(value);

  if (typeof value === "string") return `"${value}"`;

  return String(value);
}

window.convertToLeetCodeInput = convertToLeetCodeInput;
