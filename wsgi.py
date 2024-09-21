from flask import Flask, render_template, jsonify, request, abort
from urls import urls, urls_admin
from dbcontrol import base_get, base_get_all, base_edit , base_add
from admin import admin_menu
import json

app = Flask(__name__)

@app.route('/api')
def api():
    return jsonify(urls)

@app.route('/admin/api')
def api_admin():
    return render_template('home.html')

@app.route('/api/<req>', methods=['GET','POST'])
def api_get(req):
    if request.method == "POST":
        if not list(request.args.lists()):
            response = base_add(req,json.loads(request.data))
            
            if not isinstance(response, bool):
                return jsonify([{'success': True}, 200])
            else:
                return abort(500, response[1])
        else:
            key, val = list(request.args.lists())[0]
            response = base_edit(req, key, val[0], json.loads(request.data))            
            
            if isinstance(response, bool):
                return jsonify([{'success': True}, 200])
            else:
                abort(500, response[1])
    else:
        if list(request.args.lists()):
            key, val = list(request.args.lists())[0]
            data = base_get(req, key, val[0])
            
            if not isinstance(data, tuple):
                return jsonify(data)
            else:
                return abort(500, data[1])
        else:
            return jsonify(base_get_all(req))
     

app.run(debug=True)
