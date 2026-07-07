export function parseConstraint(constraint) {
  const pattern = /^(-?\d+)\s*<=\s*([\w.\[\]]+)\s*<=\s*(10\^\d+|-?\d+)$/;

  const match = constraint.match(pattern);

  if (!match) return null;

  let min = Number(match[1]);

  let variable = match[2];

  let maxText = match[3];

  let max;

  if (maxText.startsWith("10^")) {
    const power = Number(maxText.split("^")[1]);

    max = Math.pow(10, power);
  } else {
    max = Number(maxText);
  }

  return {
    variable,
    min,
    max,
  };
}
export function generateBoundaryCases(parsed) {
  return [parsed.min, parsed.min + 1, parsed.max - 1, parsed.max];
}

const parsed = parseConstraint("2 <= nums.length <= 10^4");

console.log(generateBoundaryCases(parsed));