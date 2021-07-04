from api.database.user import UserSchema
from flask import Blueprint, jsonify, make_response, request
from api.database.user import User, user_schema, users_schema
from api import db

errors = []

bp = Blueprint('user', __name__, url_prefix='/api')

@bp.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])
def user():
    if request.method == 'POST':
        try:
            new_user = User(username=request.values['username'], email=request.values['email'], password=request.values['password'])
            print(vars(new_user))
            db.session.add(new_user)
            db.session.commit()
            return make_response(jsonify({'success':True}), 200, {'ContentType':'application/json'})
        except Exception as e:
            errors.append(
                "Error while creating user:" + str(e)
            )
            return make_response(jsonify({'success':False}), 400, {'ContentType':'application/json'})
    elif request.method == 'GET':
        if 'username' in request.values:
            try:
                user = db.session.query(User).filter_by(username=request.values['username']).first()
                user_schema = UserSchema()
                user_json = user_schema.dumps(user)
                return make_response(jsonify(user_json))
            except Exception as e:
                errors.append(
                    "Error while retrieving user:" + str(e)
                )
                return make_response(jsonify({'success':False}), 400, {'ContentType':'application/json'})
        else:
            users = db.session.query(User).all()
            user_schema = UserSchema()
            user_json = [user_schema.dumps(user) for user in users]
            return make_response(jsonify(user_json))
    elif request.method == 'DELETE':
        if 'username' in request.values:
            try:
                user = db.session.query(User).filter_by(username=request.values['username']).first()
                db.session.delete(user)
                db.session.commit()
                return make_response(jsonify({'success':True}), 200, {'ContentType':'application/json'})
            except Exception as e:
                errors.append(
                    "Error while deleting user:" + str(e)
                )
                return make_response(jsonify({'success':False}), 400, {'ContentType':'application/json'})
    elif request.method == 'PUT':
        try:
            user = db.session.query(User).filter_by(username=request.values['username']).first()
            user.name = request.values['username']
            user.email = request.values['email']
            user.password = request.values['password']
            db.session.commit()
            user_schema = UserSchema()
            user_json = user_schema.dumps(user)
            return make_response(jsonify({'success':True}), 200, {'ContentType':'application/json'})
        except Exception as e:
            errors.append(
                "Error while updating user:" + str(e)
            )
            return make_response(jsonify({'success':False}), 400, {'ContentType':'application/json'})
