from flask import Flask, jsonify, render_template, request
import json
from paths import data_path
from os.path import join
from itertools import chain
import models # this imports the namespace of the models for easy integration


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def render_site():
    if request.method == 'POST':
        # incoming data
        for _file in list(chain(*request.files.listvalues())):
            # saves ascii file but could read it instead
            _file.save(join(data_path, _file.filename))

        #  Model inference goes HERE:
    else:
        # Do any GET reqs here if needed, shouldnt be needed
        pass
    return render_template("index.html")



if __name__ == "__main__":
    app.run(debug=True)
