function renderTestcases(testcases) {
  const container = document.getElementById("content");

  container.innerHTML = "";

  testcases.forEach((testcase) => {
    const card = document.createElement("div");

    card.className = "card testcase";

    card.innerHTML = `
            <h4>${testcase.name}</h4>
            <small>${testcase.category}</small>
        `;

    card.onclick = () => {
      console.log(testcase);
    };

    container.appendChild(card);
  });
}

window.renderTestcases = renderTestcases;
