from flask import Flask, jsonify, render_template, request
import json
from paths import data_path
from os.path import join
from itertools import chain


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def render_pie():
    if request.method == 'POST':
        for _file in list(chain(*request.files.listvalues())):
            # saves ascii file but could read it instead
            _file.save(join(data_path, _file.filename))
    else:
        # Do any GET reqs here if needed
        pass
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)
