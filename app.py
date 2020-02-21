from flask import Flask, render_template, request
import requests

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/<path:req>", methods=['POST', 'GET'])
def api_req(req):
    base_path = 'https://intranet.hbtn.io/'
    #base_path = 'https://jsonplaceholder.typicode.com/'
    if request.method == 'GET':
        params = request.args
        res = requests.get(base_path + req, params=request.args)
        return (res.text, res.status_code)
    if request.method == 'POST':
        data = request.form.to_dict()
        res = requests.post(base_path + req, data=data)
        return (res.text, res.status_code)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
