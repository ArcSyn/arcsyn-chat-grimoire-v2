
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import os, requests
import os
from dotenv import load_dotenv

# Only load the local .env file when we're NOT on Render
if not os.getenv("RENDER"):
    load_dotenv()           # for local development only

api_key = os.getenv("GROQ_API_KEY")
print("Loaded GROQ_API_KEY:", api_key[:8] + "…" if api_key else None)
load_dotenv()                       # ⬅️ picks up GROQ_API_KEY, etc.

app = Flask(__name__)
CORS(app)

print("Loaded GROQ_API_KEY:", os.getenv("GROQ_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data   = request.get_json(force=True)
        prompt = data.get("prompt", "").strip()
        if not prompt:
            return jsonify({"response": "No spell detected. Try again."}), 400

        headers = {
            "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "llama3-70b-8192",
            "messages": [
                {"role": "system",
                 "content": ("You are ArcSyn, a magical AI that helps produce "
                             "music macros, presets, and FX chains. "
                             "Be concise, poetic, and useful.")},
                {"role": "user", "content": prompt}
            ]
        }

        res = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )
        res.raise_for_status()

        message = res.json()["choices"][0]["message"]["content"]
        return jsonify({"response": message})

    except Exception as e:
        # log the exception and return 500
        print("Error in /chat:", e)
        return jsonify({"response": "💥 The arcane circuit fizzled."}), 500


# ---------- local dev only ----------
if __name__ == "__main__":
    # Render (and most PaaS) sets $PORT.  Default to 5000 for local runs.
    port = int(os.environ.get("PORT", 5000))
    # host 0.0.0.0 so Docker/Render can reach it if you test in containers
    app.run(host="0.0.0.0", port=port, debug=False)
