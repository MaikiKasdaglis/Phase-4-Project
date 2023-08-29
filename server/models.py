# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property



from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable = False, unique = True)
    user_role = db.Column(db.String, nullable = False)
    user_image = db.Column(db.String)
    user_bio = db.Column(db.String)
    #validate this
    
    email = db.Column(db.String)
    @validates('email')
    def validate_email(self, key, value):
        if '@' in value:
            return value
        raise ValueError('Must be a valid email.')
    _password_hash = db.Column(db.String, nullable=False)

    # =================RELATIONSHIPS=======================================
    owned_dog_field = relationship('Dog', back_populates='dog_owner_field')
    photo_session_field = relationship('PhotoSession', back_populates='photographer_field')

     # =================SERIALIZER RULES=======================================
    serialize_rules = ('-set_field', '-owned_dog_field','-photo_session_field', '-dog_field', '-image_field',)
 
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    
class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs_table'
    id = db.Column(db.Integer, primary_key=True)
    dog_name = db.Column(db.String)
    dog_breed = db.Column(db.String)
    dog_age = db.Column(db.Integer)

     # =================RELATIONSHIPS=======================================
    dog_owner_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    dog_owner_field = relationship('User', back_populates='owned_dog_field')

    photo_session_field = relationship('PhotoSession', back_populates='dog_field', cascade = 'all, delete')

     # =================SERIALIZER RULES=======================================
    serialize_rules = ('-set_field','-dog_owner_field','-photo_session_field', '-image_field', '-photographer_field' )

class Set(db.Model, SerializerMixin):
    __tablename__ = 'set_table'
    id = db.Column(db.Integer, primary_key=True)
    set_title = db.Column(db.String)
    set_description = db.Column(db.String)
    
     # =================RELATIONSHIPS=======================================
    photo_session_field = relationship('PhotoSession', back_populates='set_field', cascade = 'all, delete')
    image_field = relationship('Image', back_populates='set_field')

     # =================SERIALIZER RULES=======================================
    serialize_rules = ('-dog_owner_field', '-owned_dog_field','-photo_session_field', '-dog_field', '-photographer_field' )
   
class Image(db.Model, SerializerMixin):
    __tablename__ = 'images_table'
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String) 
    image_liked_by_users = db.Column(db.String)
    

    # image_date = db.Column(db.Date)

     # =================RELATIONSHIPS=======================================
    set_id = db.Column(db.Integer, db.ForeignKey('set_table.id'))
    set_field = relationship('Set', back_populates='image_field')

     # =================SERIALIZER RULES=======================================
    serialize_rules = ('-set_field','-dog_owner_field', '-owned_dog_field','-photo_session_field', '-dog_field', '-photographer_field')

    
class PhotoSession(db.Model, SerializerMixin):
    __tablename__ = 'photo_sessions_table'
    id = db.Column(db.Integer, primary_key=True)

    #SHOULD HAVE PRICE
    session_price = db.Column(db.Integer) 
    session_description= db.Column(db.String) 
    session_request= db.Column(db.String)
    session_date  = db.Column(db.String) 

     # =================RELATIONSHIPS=======================================
    dog_id = db.Column(db.Integer, db.ForeignKey('dogs_table.id'))
    dog_field = relationship('Dog', back_populates='photo_session_field')

    set_id = db.Column(db.Integer, db.ForeignKey('set_table.id'))
    set_field = relationship('Set', back_populates='photo_session_field')

    photographer_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    photographer_field = relationship('User', back_populates="photo_session_field")

    #WE NEED TO ADD PHOTOGRAPHER_ID AND PHOTOGRAPHER_FIELD

     # =================SERIALIZER RULES=======================================
    serialize_rules = ('-dog_field', '-set_field', '-dog_owner_field', '-owned_dog_field', '-image_field', '-photographer_field')







