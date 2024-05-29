# FitCircle
FitCircle - Community-Based Exercise Assistance App

![db-schema]

[db-schema]: ./FitCircle%20Schema%20Diagram.png

## MVP's Feature List
### 1. Workouts - CRUD
- Logged-in users should be able to create their own Workouts
- Logged-in users should be able to view their own Workouts
- Logged-in users should be able to update their own Workouts
- Logged-in users should be able to delete their own Workouts

### 2. Public Exercises - R
- Logged-in users should be able to view all public Exercises

### 3. Custom Exercises - CRUD
- Logged-in users should be able to create their own Custom Exercises
- Logged-in users should be able to view all Custom Exercises they own
- Logged-in users should be able to update their own Custom Exercises
- Logged-in users should be able to delete their own Custom Exercises

### 4. Exercise Metrics - CRUD
- Logged-in users should be able to create their Exercise Metric for any Public Exercise and all Custom Exercises they own
- Logged-in users should be able to view all Exercise Metrics they own/created
- Logged-in users should be able to update their own Exercise Metrics
- Logged-in users should be able to delete their own Exercise Metrics

### 5. Friends - CRD
- Logged-in users should be able to add new friends with other Users
- Logged-in users should be able to view their own Friends information
- Logged-in users should be able to delete their friends
<!-- - Logged-in users should be able to update their permissions with Friends -->

### Bonus: Google Maps API
- Logged-in users should be able to see nearby gym locations on Google Maps.
- Logged-in users should be able to add a starting point location to search
- Logged-in users should be able to get directions to any location from the starting point

### Bonus: AWS Image Upload
- Logged-in users should be able to create/upload images for their own profile or to their own created exercises
- Logged-in users should be able to view their profile pictures and other's pictures and of their own created exercises
- Logged-in users should be able to update images for their own profile or of their own created exercises
- Logged-in users should be able to delete images for their own profile or of their own created exercises

## User Stories
### Users
### Sign Up
- As an unregistered user, I am able to sign up for the website via a sign-up form
    - On the `/signup` page:
        - I am able to enter my first name, last name, email, phone number, city, state, and password into a clearly labeled form.
            - On successful completion of the sign-up form, I am able to log in to the website and access the site's functionality.
            - On invalid submission of the sign-up form, I receive validation feedback from the website with repopulated information of the form with my valid entries (except my password), allowing me to resubmit the form with valid data.
### Log In
- As a registered user, I am able to log in to the website through a log-in form.
    - On the `/login` page:
        - I am able to enter my email/username and password into a clearly labeled form.
            - On successful completion of the log-in form, I am able to log in to the website and access the site's functionality.
            - On invalid submission of the log-in form, I receive validation feedback from the website with repopulated information of the form with my valid entries (except my password), allowing me to resubmit the form with valid data.
### Demo User
- As an unregistered user on the `/login` page, I am able to click a demo user button to allow me to visit the site and utilize the site's functionality as a demo user without signing up or logging in with my own credentials.
### Log Out
- As a logged in user, I find the log out button in the navigation bar on any page of site.
    - Clicking the log out button will log me out of my account and redirect me to landing page which will ask me to log in.

## Workouts
- As a logged in user, I am able to create a workout routine using public exercises or custom exercises that I created myself.
- As a logged in user, I am able to view all my created workouts that I have made.
- As a logged in user, I am able to edit my own workouts by adding/removing exercises within my workouts.
- As a logged in user, I am able to delete my own workouts.

## Public Exercises
- As a logged in user, I am able to view all public exercises

## Custom Exercises
- As a logged in user, I am able to create a custom exercise
- As a logged in user, I am able to view all my own custom exercises and other custom exercises shared by friends
- As a logged in user, I am able to edit my own custom exercises
- As a logged in user, I am able to delete my own custom exercises

## Exercise Metrics
- As a logged in user, I am able to create a exercise metric for any public exercise or custom exercise that I own.
- As a logged in user, I am able to view my own exercise metrics for any public exercise or custom exercise that I own.
- As a logged in user, I am able to edit my own exercise metric for any public exercise or custom exercise that I own.
- As a logged in user, I am able to delete my own exercise metric for any public exercise or custom exercise that I own.

## Friends
- As a logged in user, I am able to request to add another user as a friend through their email/username.
- As a logged in user, I am able to accept/decline incoming friend requests
- As a logged in user, I am able to view my friends profiles and see when we started becoming friends
- As a logged in user, I am able to remove my friends
