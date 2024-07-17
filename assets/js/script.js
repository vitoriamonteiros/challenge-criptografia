function updateOutput(text) {
  const outputField = document.getElementById("resulting-message");
  const noOutputDiv = document.getElementById("no-output");
  const outputDiv = document.getElementById("output-message");

  if (text) {
      noOutputDiv.style.display = "none";
      outputDiv.style.display = "flex";
      outputField.innerHTML = text;
  } else {
      noOutputDiv.style.display = "flex";
      outputDiv.style.display = "none";
      outputField.innerHTML = "";
  }
}

function displayError(text) {
  const noOutputDiv = document.getElementById("no-output");
  const outputDiv = document.getElementById("output-message");

  noOutputDiv.style.display = "flex";
  outputDiv.style.display = "none";

  const noOutputTitle = document.getElementById("title-no-output");
  const noOutputText = document.getElementById("text-no-output");

  noOutputTitle.innerHTML = "Erro durante ação";
  noOutputText.innerHTML = text;
}

function checkText(text) {
  if (/[A-Z]/.test(text)) {
      return "No seu texto não pode ter caracteres maiúsculos";
  } else if (/[áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/.test(text)) {
      return "No seu texto não pode ter caracteres com acentuação";
  }
  return null;
}

function encrypt() {
  const inputMessage = document.getElementById("input-message").value;

  const error = checkText(inputMessage);
  if (error) {
      displayError(error);
      return;
  }

  const replacements = {
      "e": "enter",
      "i": "imes",
      "a": "ai",
      "o": "ober",
      "u": "ufat"
  };

  let encryptedMessage = "";

  for (const char of inputMessage) {
      encryptedMessage += replacements[char] || char;
  }

  updateOutput(encryptedMessage);
}

function decrypt() {
  const inputMessage = document.getElementById("input-message").value;

  const error = checkText(inputMessage);
  if (error) {
      displayError(error);
      return;
  }

  const decryptionPatterns = [
      { pattern: "ai", char: "a" },
      { pattern: "enter", char: "e" },
      { pattern: "imes", char: "i" },
      { pattern: "ober", char: "o" },
      { pattern: "ufat", char: "u" }
  ];

  let decryptedMessage = "";
  let i = 0;

  while (i < inputMessage.length) {
      let found = false;

      for (const { pattern, char } of decryptionPatterns) {
          if (inputMessage.startsWith(pattern, i)) {
              decryptedMessage += char;
              i += pattern.length;
              found = true;
              break;
          }
      }

      if (!found) {
          decryptedMessage += inputMessage[i];
          i++;
      }
  }
  updateOutput(decryptedMessage);
}

function copy() {
  const outputField = document.getElementById("resulting-message");
  navigator.clipboard.writeText(outputField.innerHTML);
}
