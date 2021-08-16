from flask import Blueprint, jsonify, make_response, request
from api.database.paper import Paper, papers_schema, paper_schema


bp = Blueprint('paper', __name__, url_prefix='/api')


@bp.route('/paper', methods=['GET'])
def get_paper():
    """
    example: GET: host/api/paper?id=1
    """

    id = request.args.get('id', default=None, type=int)
    all = request.args.get('all', default=False, type=bool)

    if all:
        all_paper = Paper.get_all()
        result = papers_schema.dump(all_paper)

        return jsonify(result.data), 200

    if not all:

        paper = Paper.query.get(id)
        if not paper:
            return jsonify({'success': False}), 400, {'ContentType': 'application/json'}

        return paper_schema.jsonify(paper), 200


@bp.route('/paper', methods=['POST'])
def add_paper():
    """
    example: POST: host/api/paper
    """

    if not request.is_json:
        return jsonify({'success': False}), 400, {'ContentType': 'application/json'}

    paper, errors = paper_schema.load(request.get_json())
    if errors:
        return make_response(jsonify(errors)), 400

    paper.save()

    return make_response(jsonify(status='success')), 200


@bp.route('/paper', methods=['PUT'])
def user_update():
    """
    example: PUT: host/api/paper?id=1
    """

    id = request.args.get('id', default=None, type=int)

    paper = Paper.query.get(id)

    if not paper:
        return jsonify({'success': False}), 400, {'ContentType': 'application/json'}

    data = request.get_json()
    data.pop('id', None)

    errors = paper_schema.validate(data, partial=True)

    if errors:
        return make_response(jsonify(errors)), 400

    paper.update(**data)

    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}


@bp.route('/paper', methods=['DELETE'])
def user_delete():
    """
    example: DELETE: host/api/paper?id=1
    """

    id = request.args.get('id', default=None, type=int)

    paper = Paper.query.get(id)

    if not paper:
        return jsonify({'success': False}), 400, {'ContentType': 'application/json'}

    paper.delete()

    return jsonify({'success': True}), 200, {'ContentType': 'application/json'}
