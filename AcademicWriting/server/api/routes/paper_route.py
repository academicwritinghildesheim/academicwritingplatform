from flask import Blueprint, jsonify, make_response, request
from api.database.paper import Paper, paper_schema, papers_schema
from api import db
from sqlalchemy.orm import sessionmaker



bp = Blueprint('paper_route', __name__, url_prefix='/api')

@bp.route('/paper_route', methods=['POST', 'GET', 'PUT', 'DELETE'])
def paper():
    if request.method == 'POST':
        print('POST')
    elif request.method == 'GET':
        # TODO User Instanz richtig filtern und als JSON zurückgeben
        print('GET')
    elif request.method == 'PUT':
        print('PUT')
    else: #DELETE
        print('DELETE')
    return make_response(jsonify(message='Paper')), 200
