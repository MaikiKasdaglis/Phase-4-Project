#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
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
            )
            db.session.add(new_dog)
            db.session.commit()
        except Exception as e:
            message = {'errors': [e.__str__()]}
            return make_response(message, 422)
        return make_response(new_dog.to_dict(),200)
            
api.add_resource(Dogs, '/dogs')

#========RIGHT NOW DOGSBYID GET HAS USER CONDITIONS ===========
class DogsById(Resource):
    def get(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        print (response_obj.dog_owner_id)
        print(session.get('user_id'))
        
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            if session.get('user_id') == response_obj.dog_owner_id:
                return make_response(response_obj.to_dict(), 200)
            return make_response({'message': 'not valid user'}, 404)
    def patch(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            if session.get('user_id') == response_obj.dog_owner_id:
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
            return make_response({'message': 'not valid user'}, 404)
             
    def delete(self, id):
        response_obj = Dog.query.filter_by(id=id).first()
        if response_obj == None:
            response_dict = {
                "error": "Dog not found"
            }
            return make_response(response_dict, 404)
        else:
            if session.get('user_id') == response_obj.dog_owner_id:
                db.session.delete(response_obj)
                db.session.commit()
                response_dict = {'message': 'deleted fo sho!'}
                return response_dict, 200
            return make_response({'message': 'not valid user'}, 404)
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
                 image_liked_by_users =request_obj["image_liked_by_users"]
                 
                
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
                photographer_id =request_obj["photographer_id"],
                session_description =request_obj["session_description"],
                session_date= request_obj["session_date"],
                session_request= request_obj["session_request"]
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
                # _password_hash =request_obj["_password_hash"],
                user_role = request_obj["user_role"],
                user_image = request_obj["user_image"],
                user_bio =request_obj["user_bio"],
            )
            new_user.password_hash = request_obj["_password_hash"]
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            #this session shit is new. eveything else works fo sho
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

# make login
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401
    
api.add_resource(Login, '/login')
    
# check session 
class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')

# logout
class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message':'204: No Content'}
api.add_resource(Logout, '/logout')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

