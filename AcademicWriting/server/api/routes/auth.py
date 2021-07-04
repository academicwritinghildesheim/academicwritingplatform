from flask import Blueprint, jsonify, make_response, request, session
from api.database.user import User, user_schema, users_schema
from api import db, bcrypt

bp = Blueprint('auth', __name__, url_prefix='/api')

@bp.route('/login', methods=['POST'])
def login():
    json_data = request.json
    user = User.query.filter_by(username=request.values['username']).first()
    if user and bcrypt.check_password_hash(
            user.password, request.values['password'].encode('utf-8')):
        session['logged_in'] = True
        status = True
    else:
        status = False
    return jsonify({'result': status})

@bp.route('/logout')
def logout():
    session.pop('logged_in', None)
    return jsonify({'result': 'success'})