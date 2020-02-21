from flask import Flask, render_template, request
import requests

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/<path:req>", methods=['POST', 'GET'])
def api_req(req):
    return "Yes"
    base_path = 'https://intranet.hbtn.io/'
    return requests.get('intranet.hbtn.io/' + req).text

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
