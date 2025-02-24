// Gemini API Key and URL
const API_KEY = "AIzaSyC5ezoxpgXE2cxGgDALiSD71b8-5ndLExU";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Functionality (getElementbyID then addEventeListener (Click))
//startbutton proceed to main page
document.getElementById("startBtn").addEventListener("click", function () {
  document.getElementById("landing").style.display = "none";
  document.getElementById("main").style.display = "block";
});

//home(navbar) going back to landing page
document.getElementById("homeBtn").addEventListener("click", function () {
  document.getElementById("main").style.display = "none";
  document.getElementById("contact").style.display = "none";
  document.getElementById("landing").style.display = "block";
});

//contact us(navbar) input name and email
document.getElementById("contactBtn").addEventListener("click", function () {
  document.getElementById("landing").style.display = "none";
  document.getElementById("main").style.display = "none";
  document.getElementById("contact").style.display = "block";
});

// Summarization Function using Gemini API
//summarizebutton triggers the AI
document
  .getElementById("summarizeBtn")
  .addEventListener("click", async function () {
    const inputText = document.getElementById("inputText").value;
    const outputElement = document.getElementById("outputText");

    if (!inputText) {
      alert("Please enter text to summarize.");
      return;
    }

    // loading indicator - process the input text
    outputElement.innerText = "Summarizing...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Summarize this: ${inputText}` }] }],
        }),
      });

      const data = await response.json();

      // Check if response has valid data
      if (data && data.candidates && data.candidates.length > 0) {
        const summary = data.candidates[0].content.parts[0].text;
        outputElement.innerText = summary;

        // Copy summary to clipboard
        navigator.clipboard
          .writeText(summary)
          .then(() => {
            alert("Summary copied to clipboard!");
          })
          .catch((err) => {
            console.error("Error copying text:", err);
          });
      } else {
        outputElement.innerText =
          "No summary generated. Check if your API key is valid.";
        console.error("API Response:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      outputElement.innerText = `Error: ${error.message}`;
    }
  });

// Copy Summary to Clipboard
document.getElementById("copyBtn").addEventListener("click", function () {
  const outputText = document.getElementById("outputText").innerText;
  if (
    outputText &&
    outputText !== "Summarizing..." &&
    !outputText.startsWith("Error:") &&
    outputText !== "No summary generated. Check if your API key is valid."
  ) {
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        alert("Summary copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text:", err);
      });
  } else {
    alert("Summary copied to clipboard!");
  }
});

// Reset Input & Output Fields when clicking try again button
document.getElementById("tryAgainBtn").addEventListener("click", function () {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").innerText = "";
});

// Email and Name Submission Handling
document
  //submitbutton (function that check if name and email add is valid)
  .getElementById("submitEmailBtn")
  .addEventListener("click", function () {
    const email = document.getElementById("emailInput").value;
    const name = document.getElementById("completeName").value;

    if (email && email.includes("@") && name.trim() !== "") {
      document.getElementById("emailMessage").textContent =
        //if valid
        "Thank you for signing up!";
      document.getElementById("emailMessage").style.display = "block";
      document.getElementById("emailInput").value = "";
      document.getElementById("completeName").value = "";
    } else {
      //if not valid
      alert("Please enter a valid email address and your name.");
    }
  });
