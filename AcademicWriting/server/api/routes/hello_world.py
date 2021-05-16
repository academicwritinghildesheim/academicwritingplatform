from flask import Blueprint, jsonify, make_response
from api.database.user import User, user_schema, users_schema


bp = Blueprint('hello_world', __name__, url_prefix='/api')


@bp.route('/hello_world')
def hello_world():

    # user = user_schema.load({'username': 'test', 'email': 'test@test.de', 'password': ''})

    # user.save()

    # user = User.query.filter_by(username='test').first()

    # user = user_schema.dump(user)

    # print(user)

    return make_response(jsonify(message='Hello World')), 200
