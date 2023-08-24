#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Dog, Set, Image, PhotoSession, User
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Best MothaFuckin Phase 4 Project Server</h1>'


class Dogs(Resource):
    def get(self):
        dogs = [d.to_dict() for d in Dog.query.all()]
        return make_response(dogs, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_dog = Dog(
                dog_age =request_obj["dog_age"],
                dog_name =request_obj["dog_name"],
                dog_breed =request_obj["dog_breed"],
                dog_description =request_obj["dog_description"]
            )
            db.session.add(new_dog)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_dog.to_dict(),200)
            
api.add_resource(Dogs, '/dogs')

class DogsById(Resource):
    def get(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted fo sho!'}
            return response_dict, 200
api.add_resource(DogsById, '/dogs/<int:id>')

class Sets(Resource):
    def get(self):
        sets = [s.to_dict() for s in Set.query.all()]
        return make_response(sets, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_set = Set(
                 set_title =request_obj["set_title"],
                 set_description =request_obj["set_description"],
                
            )
            db.session.add(new_set)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_set.to_dict(),200)
    
api.add_resource(Sets, '/sets')

class SetsById(Resource):
    def get(self, id):
        response_obj = Set.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Set not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Set.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Set not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = Set.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Set not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted fo sho!'}
            return response_dict, 200
api.add_resource(SetsById, '/sets/<int:id>')


class Images(Resource):
    def get(self):
        images = [i.to_dict() for i in Image.query.all()]
        return make_response(images, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_image = Image(
                 image_url =request_obj["image_url"],
                #  image_date =request_obj["image_date"],
                 set_id =request_obj["set_id"],
                 
                
            )
            db.session.add(new_image)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_image.to_dict(),200)
    
api.add_resource(Images, '/images')

class ImagesById(Resource):
    def get(self, id):
        response_obj = Image.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Image not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = Image.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Image not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = Image.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Image not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted fo sho!'}
            return response_dict, 200
api.add_resource(ImagesById, '/images/<int:id>')

class PhotoSessions(Resource):
    def get(self):
        photo_sessions = [s.to_dict(rules = ('dog_field', 'set_field',)) for s in PhotoSession.query.all()]
        return make_response(photo_sessions, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_session = PhotoSession(
                dog_id =request_obj["dog_id"],
                set_id =request_obj["set_id"],
                photographer_id =request_obj["photographer_id"]
            )
            db.session.add(new_session)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_session.to_dict(),200)
api.add_resource(PhotoSessions, '/photo_sessions')

class PhotoSessionsById(Resource):
    def get(self, id):
        response_obj = PhotoSession.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Photo Session not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = PhotoSession.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Photo Session not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = PhotoSession.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "PhotoSession not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted fo sho!'}
            return response_dict, 200
api.add_resource(PhotoSessionsById, '/photo_sessions/<int:id>')

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 200)
    def post(self):
        request_obj = request.get_json()
        try:
            new_user = User(
                username =request_obj["username"],
                email =request_obj["email"],
                _password_hash =request_obj["_password_hash"],
            )
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_user.to_dict(),200)
api.add_resource(Users, '/users')

class UsersById(Resource):
    def get(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            return make_response(response_obj.to_dict(), 200)
    def patch(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            request_object = request.get_json()
            try:
                for attr in request_object:
                    setattr(response_obj, attr, request_object[attr])
                    db.session.add(response_obj)
                    db.session.commit()
            except Exception as e:
                message = {'errors': [e.__str__()]}
                return make_response(message, 422)
            return make_response(response_obj.to_dict(), 200)
    def delete(self, id):
        response_obj = User.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "User not found"
            }
            return make_response(response_dict, 404)
        else:
            db.session.delete(response_obj)
            db.session.commit()
            response_dict = {'message': 'deleted fo sho!'}
            return response_dict, 200
api.add_resource(UsersById, '/users/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

