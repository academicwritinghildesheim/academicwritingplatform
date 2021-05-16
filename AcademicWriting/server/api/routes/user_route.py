from flask import Blueprint, jsonify, make_response, request
from api.database.user import User, user_schema, users_schema
from api import db
from sqlalchemy.orm import sessionmaker



bp = Blueprint('user_route', __name__, url_prefix='/api')

@bp.route('/user_route', methods=['POST', 'GET', 'PUT', 'DELETE'])
def user():
    if request.method == 'POST':
        print('POST')
    elif request.method == 'GET':
        #username = request.args['username']
        #for instance in db.session.query(User).filter(User.username==username):
            #print(instance.username, instance.email)
            # TODO User Instanz richtig filtern und als JSON zurückgeben
        print('GET')
            #return make_response(jsonify())
    elif request.method == 'PUT':
        print('PUT')
    else: #DELETE
        print('DELETE')
    return make_response(jsonify(message='User')), 200
