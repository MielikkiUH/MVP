from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def render_pie():
    if request.method == 'POST':
        print "POST", request, request.data, "No data", dir(request), request.form
        print [request.files]
        print [request.data]
    else:
        print request.method, request, request.data, "No data"
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)
