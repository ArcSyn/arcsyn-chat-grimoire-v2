// static/js/main.js
window.addEventListener("DOMContentLoaded", () => {
  const promptInput = document.getElementById("prompt");
  const castButton = document.getElementById("castSpell");
  const outputDiv = document.getElementById("response");
  const loadingDiv = document.getElementById("loading");

  castButton.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();

    if (!prompt) {
      outputDiv.innerText = "🗯️ You must utter a spell first.";
      return;
    }

    outputDiv.innerText = "";
    loadingDiv.style.display = "block";

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      loadingDiv.style.display = "none";

      outputDiv.innerText = data.response || "🧨 No magic returned.";
    } catch (err) {
      loadingDiv.style.display = "none";
      outputDiv.innerText = "🔥 Spell backfired. Check the console.";
      console.error("❌ Error:", err);
    }
  });

  promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      castButton.click();
    }
  });
});