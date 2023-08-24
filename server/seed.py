#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Dog, Set, Image, PhotoSession, User
import random 

fake = Faker()


# Seed code goes here!

#create user: username, emaiil, password
def create_users():
    pass
#create dogs: name, breed, age, description

breeds = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", 
          "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Boxer", "Dachshund", "Siberian Husky", 
          "Great Dane", "Chihuahua", "Pomeranian"]

def create_dogs ():
    dogs = []
    for _ in range(20): 
        d = Dog(
            dog_name = fake.first_name(),
            dog_breed = random.choice(breeds),
            dog_age=fake.random_int(min=1, max=15),
            dog_description=fake.sentence(),
            dog_owner_id = fake.random_int(min=1, max=15)
        )
        dogs.append(d)
    return dogs 
    

#create photos: title, description
def create_set():
    sets = []
    for _ in range(10):
        s = Set(
            set_title = fake.first_name(),
            set_description = fake.sentence()
        )
        sets.append(s)
    return sets




def create_images():
    fake = Faker()
    images = []
    for _ in range(50):
        start_date = datetime.now() - timedelta(days=30)
        end_date = datetime.now()
        i = Image(
            image_url='https://placehold.co/400x400',
            # image_date=fake.date_between(start_date=start_date, end_date=end_date),
            set_id=fake.random_int(min=1, max=10)
        )
        images.append(i)
    return images

#create photosession: dog_id, photo_id
def create_photo_session():
    photo_sessions = []
    for _ in range(10):
        ps = PhotoSession(
            dog_id = fake.random_int(min=1, max=20),
            set_id = fake.random_int(min=1, max=10),
            photographer_id = fake.random_int(min=1, max=15)
        )
        photo_sessions.append(ps)
    return photo_sessions

def create_users():
    users = []
    role = ['photographer', 'pet_owner']
    for _ in range(15):
        u = User(
            username = fake.name(),
            email = fake.email(),
            password_hash = "123", 
            user_role = random.choice(role),
        )
        users.append(u)
    return users

if __name__ == '__main__':
    with app.app_context():
        print('clearing db ...')
        User.query.delete()
        Dog.query.delete()
        Set.query.delete()
        PhotoSession.query.delete()

        print('seeding dogs')
        dogs = create_dogs()
        db.session.add_all(dogs)
        db.session.commit()


        print('seeding sets')
        sets = create_set()
        db.session.add_all(sets)
        db.session.commit()

        print('seeding images')
        images = create_images()
        db.session.add_all(images)
        db.session.commit()

        print('seeding photo_sessions')
        photo_sessions = create_photo_session()
        db.session.add_all(photo_sessions)
        db.session.commit()

        print('seeding users')
        users = create_users()
        db.session.add_all(users)
        db.session.commit()



