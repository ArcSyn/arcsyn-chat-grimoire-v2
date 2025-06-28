# 🔮 ArcSyn Chat Grimoire

**ArcSyn Chat Grimoire** is a mystical AI-powered web app designed for music producers, sound designers, and sonic alchemists. It uses Groq's blazing-fast large language models to generate music production tips, sound design chains, and preset ideas with a magical, poetic twist.

---

## ✨ Features

- 🧙 Cast prompts like spells (e.g. "gritty reese bass", "celestial arps", "lo-fi FX chain")
- ⚗️ Returns magical sound design advice and plugin chains
- 🎨 Fully responsive UI with animated particles and dark mystic theme
- 🔄 Reset button to clear inputs
- 📜 Auto-scroll to results
- 🚫 Button disables while casting to prevent double submissions

---

## 🚀 Live Demo

[https://arcsyn.studio](https://arcsyn.studio)

---

## 🎯 How to Use

1. **Describe your sound**: Type any sound-design request or production question (e.g., "gritty saturated snare", "neurofunk reese in D#", "reverb macro for ambient pads")
2. **Cast your spell**: Press **Cast Spell** or hit **Enter**
3. **Copy the recipe**: Take the AI-generated settings and drop them into your synth/DAW
4. **Iterate**: Tweak your prompt for variations and new ideas

### Example Prompts
- "dark wub bass with LFO"
- "celestial ambient pad chain"
- "aggressive distorted 808"
- "lo-fi vinyl processing chain"

---

## 🛠️ Tech Stack

- Python 3 + Flask
- Groq LLaMA 3 (via Groq API)
- HTML, CSS, JS
- Deployed on Render
- Hosted with [arcsyn.studio](https://arcsyn.studio)

---

## 📦 Local Development

```bash
git clone https://github.com/yourusername/arcsyn-chat-grimoire.git
cd arcsyn-chat-grimoire
pip install -r requirements.txt
export GROQ_API_KEY=your_key_here
python main.py
