from flask import Blueprint, jsonify, make_response, request
from api.database.paper import Paper, PaperSchema
from api import db
from sqlalchemy.orm import sessionmaker

errors = []

bp = Blueprint('paper', __name__, url_prefix='/api')

@bp.route('/paper', methods=['POST', 'GET', 'PUT', 'DELETE'])
def paper():
    if request.method == 'POST':
        try:
            new_paper = Paper(author_id=request.values['author_id'], title=request.values['title'], content=request.values['content'])
            db.session.add(new_paper)
            db.session.commit()
        except:
            errors.append(
                "Error while creating paper."
            )
    elif request.method == 'GET':
        if 'title' in request.values:
            try:
                paper = db.session.query(Paper).filter_by(title=request.values['title']).first()
                paper_schema = PaperSchema()
                paper_json = paper_schema.dumps(paper)
                return make_response(jsonify(paper_json))
            except:
                errors.append(
                    "Error while retrieving paper."
                )
        else:
            papers = db.session.query(Paper).all()
            paper_schema = PapersSchema()
            paper_json = [paper_schema.dumps(paper) for paper in papers]
            return make_response(jsonify(paper_json))
    elif request.method == 'DELETE':
        if 'title' in request.values:
            try:
                paper = db.session.query(Paper).filter_by(title=request.values['title']).first()
                db.session.delete(paper)
                db.session.commit()
            except:
                errors.append(
                    "Error while deleting paper."
                )
        elif request.method == 'PUT':
            try:
                paper = db.session.query(Paper).filter_by(title=request.values['title']).first()
                paper.author_id = request.values['author_id']
                paper.title = request.values['title']
                paper.content = request.values['content']
                db.session.commit()
                paper_schema = PaperSchema()
                paper_json = paper_schema.dumps(paper)
                return make_response(jsonify(paper_json))
            except:
                errors.append(
                    "Error while updating paper."
                )