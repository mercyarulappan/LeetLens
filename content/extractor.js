function getConstraintText(li) {
  let html = li.innerHTML;

  html = html.replace(/10<sup>(\d+)<\/sup>/g, (_, power) => `10^${power}`);

  const temp = document.createElement("div");
  temp.innerHTML = html;

  return temp.textContent.trim();
}

function getProblemData() {
  const titleElement = document.querySelector(".text-title-large a");

  const title = titleElement
    ? titleElement.innerText.replace(/^\d+\.\s*/, "")
    : "Unknown";

  const constraintsHeader = [...document.querySelectorAll("strong")].find(
    (el) => el.innerText.trim() === "Constraints:",
  );

  let constraints = [];

  if (constraintsHeader) {
    const ul = constraintsHeader.parentElement.nextElementSibling;

    constraints = [...ul.querySelectorAll("li")].map(getConstraintText);
  }

  return {
    title,
    constraints,
  };
}

function getExamples() {
  const examples = [];

  const paragraphs = [...document.querySelectorAll("p")];

  paragraphs.forEach((p) => {
    const text = p.innerText.trim();

    if (text.startsWith("Example")) {
      let current = p.nextElementSibling;

      let exampleText = "";

      while (current && current.tagName !== "P") {
        exampleText += current.innerText + "\n";

        current = current.nextElementSibling;
      }

      examples.push(exampleText.trim());
    }
  });

  return examples;
}

function getDescription() {
  const constraintsHeader = [...document.querySelectorAll("strong")].find(
    (el) => el.innerText.trim() === "Constraints:",
  );

  if (!constraintsHeader) return "";

  const descriptionContainer = constraintsHeader.closest("div").parentElement;

  const paragraphs = [...descriptionContainer.querySelectorAll("p")];

  const text = paragraphs.map((p) => p.innerText.trim()).join("\n\n");

  return text;
}
