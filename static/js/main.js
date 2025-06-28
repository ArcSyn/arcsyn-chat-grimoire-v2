
// Chat functionality
document.addEventListener("DOMContentLoaded", () => {
  const promptBox = document.getElementById("prompt");
  const castBtn = document.getElementById("castSpell");
  const resetBtn = document.getElementById("resetSpell");
  const outputDiv = document.getElementById("response");
  const loadingDiv = document.getElementById("loading");
  const copyBtn = document.getElementById("copyBtn");

  // Auto-scroll response into view
  function scrollToResponse() {
    outputDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Reset functionality
  resetBtn.addEventListener("click", () => {
    promptBox.value = "";
    outputDiv.innerText = "";
    copyBtn.style.display = "none";
    promptBox.focus();
  });

  // Copy button functionality
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputDiv.innerText)
      .then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
          copyBtn.textContent = "📋 Copy";
        }, 2000);
      })
      .catch(err => console.error("Copy failed", err));
  });

  castBtn.addEventListener("click", async () => {
    const prompt = promptBox.value.trim();
    if (!prompt) {
      outputDiv.innerText = "🧙 You must utter a spell first.";
      scrollToResponse();
      return;
    }

    // Disable button and show loading
    castBtn.disabled = true;
    castBtn.innerText = "Casting...";
    outputDiv.innerText = "";
    loadingDiv.style.display = "block";

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      loadingDiv.style.display = "none";
      outputDiv.innerText = data.response || "✨ Your spell returned silence.";
      
      // show copy button if we have a spell
      if (data.response) copyBtn.style.display = "inline-block";
      
      scrollToResponse();
    } catch (err) {
      loadingDiv.style.display = "none";
      outputDiv.innerText = "🧨 Your spell backfired. Check the console.";
      console.error("❌ Error:", err);
      scrollToResponse();
    } finally {
      // Re-enable button
      castBtn.disabled = false;
      castBtn.innerText = "Cast Spell";
    }
  });

  promptBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      castBtn.click();
    }
  });
});
