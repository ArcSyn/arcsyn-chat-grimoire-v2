# 🔮 ArcSyn Chat Grimoire

*A browser-based spell-book for electronic music producers.*  
Type an incantation like **“gritty wub bass with LFO modulation”** and ArcSyn returns ready-to-drop sound-design recipes, FX-chains, and macro ideas—powered by Groq’s Llama 3 model and wrapped in a mystical, mobile-first UI.

[**Live demo →**](https://YOUR-LIVE-DOMAIN)  |  ![Render](https://img.shields.io/badge/hosted%20on-Render-3f3f3f?logo=render) ![License](https://img.shields.io/badge/license-MIT-teal)

---

## ✨ Features
|  |  |
|:-|:-|
| **Instant sound-design spells** | Chat endpoint hits Groq’s API and returns concise, poetic recipes. |
| **Magical UI** | Dark theme, animated gold particles, custom icon and cover art. |
| **Mobile-responsive** | Breakpoints for phones (≤480 px) and tablets (≤768 px). |
| **UX niceties** | Loading shimmer, auto-scroll, duplicate-submit guard, reset button. |
| **Production-ready** | Gunicorn server & `requirements.txt` for zero-config deploys on Render. |

<img alt="ArcSyn screenshot" src="static/images/screenshot.png" width="600">

---

## 🗄️ Repo overview
.
├─ main.py # Flask entry-point
├─ requirements.txt # Runtime dependencies
├─ templates/
│ └─ index.html # Jinja2 + vanilla JS front-end
├─ static/
│ ├─ css/style.css
│ ├─ js/main.js
│ ├─ js/particles.js
│ └─ images/ (icon, cover art, screenshot)
└─ README.md

yaml
Copy
Edit

---

## 🚀 Quick start (local)

```bash
git clone https://github.com/ArcSyn/arcsyn-chat-grimoire-v2.git
cd arcsyn-chat-grimoire-v2

# 1️⃣ install deps
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# 2️⃣ set env var
export GROQ_API_KEY="YOUR-REAL-KEY"

# 3️⃣ run dev server
python main.py
# visit http://127.0.0.1:5000
🏗️ Deployment on Render
New → Web Service → give repo URL.

Runtime: Python 3.11+ | Build Command: pip install -r requirements.txt

Start Command: gunicorn --bind 0.0.0.0:$PORT main:app

Add GROQ_API_KEY in Environment ▶ Secret Files or Env Vars.

Press Manual Deploy → done.

⚙️ Environment variables
Key	Description
GROQ_API_KEY	Your Groq API key with access to llama3-70b-8192.

🤝 Contributing
Issues and PRs are welcome! Please open an issue first to discuss big changes.

📄 License
MIT © 2025 ArcSyn
Feel free to remix and conjure your own sonic spells. 🔊
