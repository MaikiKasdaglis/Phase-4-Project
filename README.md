Backend README
Introduction
This backend is built using Flask and SQLAlchemy to manage user profiles, dog profiles, photo sessions, sets, and images. Each profile or item has its own dedicated table and relationships between them are managed using SQLAlchemy ORM.

Database Models
User Model: Represents a user with attributes such as username, email, password (hashed), role, image, and bio. The user can either be a photographer or a dog owner.
Dog Model: Represents a dog with attributes like name, breed, age, and the ID of its owner.
Set Model: Represents a photo set, which includes multiple images.
Image Model: Represents an individual image with an associated URL.
PhotoSession Model: Represents a photo session which has a link to the dog being photographed, the set where the photos will be stored, and the photographer.
APIs/Endpoints (not provided in the initial code)
API endpoints would be created to interact with the aforementioned models. These would typically include GET, POST, PUT, and DELETE requests.
Seeding Script
A seeding script is provided to populate the database with fake data using the Faker library. This script creates random dogs, sets, images, photo sessions, and users.

Frontend README
Introduction
This frontend is built using React and uses React Router for navigation. The application provides a platform where users can view photo sets, manage their profiles, and much more.

Components & Pages
Home: The default page after logging in.
Login: Where users log in.
Signup: Where new users sign up.
PhotoSet: Displays a set of photos.
Logout: Where users can log out.
CreateDog: Allows users to create a new dog profile.
PhotographerCard: Displays a profile card for a photographer.
Photographers: Shows a list of photographers.
EditProfile: Allows users to edit their profile.
CreatePhotoSession: Enables users to schedule a photo session.
User Session
Upon initializing the App, a call is made to check if a user session exists. If a session is active, the user data is updated in the store.

Styling
Bootstrap is used for styling the components, ensuring a responsive and user-friendly interface.

Routes
React Router is used to handle routing. Each route corresponds to a specific component or page, ensuring seamless navigation through the application.

Conclusion
This frontend application is designed to be intuitive and user-friendly, providing users with an interactive platform to manage their photos and profiles.

You can expand on these READMEs based on the detailed features and specifics of your application. The provided READMEs give a general overview based on the code snippets you've shared.

README - Frontend
Overview
This application provides a platform for users to interact with pet photography services. Users can be photographers or pet owners, and each has a distinct set of features available to them.

Key Features:
User Authentication: Users can log in, sign up, edit their profiles, or delete their profiles.
Navigation: A top navbar that changes dynamically based on whether the user is logged in or not. It also shows different options depending on the user's role (pet owner or photographer).
Photo Sessions: Users can view photo sessions associated with their profile.
Manage Dogs: Pet owners can create dog profiles.
Components:
App Component:

Initializes the router with several routes such as home, login, signup, photo set, create dog, and more.
Checks session on mount to determine if a user is logged in.
RootLayout Component:

Provides the main navigation bar at the top.
Contains routes and conditionally renders content based on the route and user status.
Uses modals for profile deletion confirmation.
Home Component:

Displays a list of photo sessions relevant to the logged-in user. The content will change based on the user's role (pet_owner or other).
The background has a set style that's possibly a pet image.
Dependencies:
Bootstrap: For styling and UI components.
React Router: To manage routing for the application.
Setting Up:
Clone the repository.
Ensure you have Node.js and npm installed.
Navigate to the project directory and run npm install to install all dependencies.
Start the development server using npm start.
Visit http://localhost:3000 in your browser.
Navigation:
Home: The main page where photo sessions relevant to the logged-in user are displayed.
Login/Signup: Allows users to log in or sign up.
Edit Profile: Users can update their profile information.
Create Dog: Allows pet owners to create profiles for their dogs.
Photo Set: Displays a specific set of photos.
Logout: Allows users to log out.
Photographers: Displays a list of photographers.
Create Photo Session: Option available for photographers to create a new photo session.
Further Development:
Feedback System: Implement a system where pet owners can leave feedback for photographers.
Search Functionality: Allow users to search for specific photographers or photo sessions.
Enhanced User Profiles: Add more details to user profiles like profile pictures, bios, etc.
Contributing:
If you wish to contribute, kindly fork the repository, make your changes, and create a pull request. Ensure that your changes do not introduce any bugs.

This README gives a brief overview of the frontend application based on the code snippets provided. You can always expand upon this as more features are developed or if there are specific setup steps and configurations that need to be mentioned.
