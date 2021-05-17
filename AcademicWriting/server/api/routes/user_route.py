from flask import Blueprint, jsonify, make_response, request
from api.database.user import User, user_schema, users_schema
from api import db
from sqlalchemy.orm import sessionmaker

errors = []

bp = Blueprint('user', __name__, url_prefix='/api')

@bp.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])
def user():
    if request.method == 'POST':
        try:
            new_user = User(username=request.values['username'], email=request.values['email'], password=request.values['password'])
            db.session.add(new_user)
            db.session.commit()
            print('POST')
        except:
            errors.append(
                "Error while creating user."
            )
    elif request.method == 'GET':
        if 'username' in request.values:
            try:
                user = db.session.query(User).filter_by(username=request.values['username']).first()
                return make_response(user.serialize)
            except:
                errors.append(
                    "Error while retrieving user."
                )
        else:
            users = db.session.query(User).all()
            return make_response(jsonify([user.serialize for user in users]))
    elif request.method == 'DELETE':
        if 'username' in request.values:
            try:
                user = db.session.query(User).filter_by(username=request.values['username']).first()
                db.session.delete(user)
                db.session.commit()
            except:
                errors.append(
                    "Error while deleting user."
                )
