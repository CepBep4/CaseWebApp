from flask import Flask, render_template, jsonify, request, abort
from urls import urls, urls_admin
from dbcontrol import base_get, base_get_all, base_edit
from admin import admin_menu
import json

app = Flask(__name__)

@app.route('/api')
def api():
    return jsonify(urls)

@app.route('/admin/api')
def api_admin():
    return admin_menu.format('<br>'.join([f'<a href="{urls_admin[x]}">{x}</a>' for x in list(urls)]))

@app.route('/api/<req>', methods=['GET','POST'])
def api_get(req):
    if request.method == "POST":
        if not list(request.args.lists()):
            return abort(500, 'Укажите строку, в которой хотите поменять данные')
        else:
            key, val = list(request.args.lists())[0]
            response = base_edit(req, key, val[0], request.json)
            
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