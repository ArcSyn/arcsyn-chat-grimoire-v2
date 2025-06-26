from flask import Flask, request, jsonify, render_template
import os
import requests
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Debugging: confirm API key is loaded
print("Loaded GROQ_API_KEY:", os.getenv("GROQ_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        print("==> Incoming prompt:", prompt)

        if not prompt:
            return jsonify({'response': 'No spell detected. Try again.'}), 400

        headers = {
            'Authorization': f'Bearer {os.getenv("GROQ_API_KEY")}',
            'Content-Type': 'application/json'
        }

        payload = {
            'model': 'llama3-70b-8192',
            'messages': [
                {'role': 'system', 'content': 'You are ArcSyn, a magical AI that helps produce music macros, presets, and FX chains. Be concise, poetic, and useful.'},
                {'role': 'user', 'content': prompt}
            ]
        }

        print("==> Headers:", headers)
        print("==> Payload:", payload)

        res = requests.post(
            'https://api.groq.com/openai/v1/chat/completions',
            headers=headers,
            json=payload
        )

        print("==> Groq status code:", res.status_code)
        print("==> Groq raw response:", res.text)

        res.raise_for_status()
        groq_response = res.json()
        message = groq_response['choices'][0]['message']['content']
        return jsonify({'response': message})

    except Exception as e:
        print(f"Error in /chat: {e}")
        return jsonify({'response': f'🔥 Spell casting failed: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True)