Vibefest
Overview
Vibefest is a unique social media platform designed exclusively for festival goers. With its integration of ChatGPT, the app provides personalized recommendations and suggestions to enhance the festival experience for users. Whether they're seeking information about upcoming festivals, connecting with fellow festival goers, or exploring new music genres, Festival Connect offers a seamless and engaging platform for the festival community.

Technologies Used
React Native: A framework for building native mobile applications, allowing for a smooth and intuitive user interface.
MongoDB: A NoSQL database for efficient and scalable data storage and retrieval.
Node.js: A server-side JavaScript runtime for building fast and scalable network applications.
ChatGPT API: A language model API that offers AI-powered chat capabilities, enabling personalized recommendations and interactions.
(maybe songkick api or discovery api)

MVP Goals
- User Registration and Authentication: Users can create accounts, log in, and manage their profiles. (Est. Time: 1 day)
- Festival Listings: Integrate an API (e.g., Songkick or Ticketmaster) to fetch and display upcoming festivals. (Est. Time: 1 day)
- Personalized Recommendations: Utilize the ChatGPT API to provide users with personalized festival recommendations based on their preferences and interests. (Est. Time: 2 days)
- Social Features: Enable users to post, like, comment on, and share content related to festivals.
- Basic CRUD Functionality: Implement create, read, update, and delete operations for user posts.
- User Interface: Design an intuitive and visually appealing interface for seamless navigation and interaction. (Est. Time: 1 day)

Stretch Goals
- Geolocation: Implement geolocation features to help users discover festivals happening near their current location. 
- Social Sharing: Allow users to share their festival experiences, photos, and recommendations with their social networks and check in to festivals they attended. 
- User-generated Content: Enable users to create and share their own festival events, fostering community engagement and collaboration. 
- Advanced User Profiles: Expand user profiles to include additional information such as favorite artists, attended festivals, and reviews.
- Advanced Search: Implement advanced search filters to help users find festivals based on specific criteria such as genre, location, or date. 
- Push Notifications: Send push notifications to users for important updates, new festival announcements, or chat message notifications. 
- Chat Functionality: Enable users to connect and communicate with each other real-time through private messages or group chats. 
- Advanced Recommendation System: Enhance the festival recommendation feature by incorporating user feedback and preferences.

User Stories and User Flow
As a festival enthusiast, I want to create an account and log in to access personalized recommendations and connect with other festival goers.
As a user, I want to explore upcoming festivals, view festival details, and bookmark my favorite events for future reference.
As a user, I want to receive personalized festival recommendations based on my music preferences, location, and previous festival attendance.
As a user, I want to chat and connect with other festival goers, exchange recommendations, and plan meetups during festivals.
As a user, I want to update my profile information, manage my preferences, and customize my festival experience.

Schedule
Day 1: Learning and Set Up
    -Learn the basics of React Native (tutorials, documentation, online resources).
    -Set up your development environment (install necessary tools and dependencies).
    -Create a new React Native project for your app.
    -Familiarize yourself with the project structure and essential concepts.

Day 2: User Authentication and Profile
    -Implement user registration and login functionality.
    -Create user profiles with basic information (name, profile picture).
    -Allow users to edit and update their profile information.

Day 3: Festival Listings and Recommendations
    -Integrate an API (such as Songkick or Ticketmaster) to fetch festival event data.
    -Display a list of upcoming festivals with relevant details (date, location, lineup).
    -Implement a recommendation system using the ChatGPT API to suggest festivals based on user preferences (music genre, location, past interests).

Day 4: Social Features
    -Implement a feed or timeline where users can post and share content related to festivals.
    -Enable users to like, comment on, and share posts from other users.
    -Implement basic CRUD (Create, Read, Update, Delete) functionality for posts.

Day 5: User Interactions
    -Allow users to follow or connect with other festival-goers.
    -Implement a messaging system or chat feature for direct communication between users.
    -Enable users to discover and join groups or communities centered around specific festivals or interests.

Day 6: Cleaning and Testing  
    -Refine the user interface and improve the app's visual appeal.
    -Perform thorough testing and bug fixing.
    -Prepare and finalize MVP.

Potential Roadblocks
- Learning Curve: Adjustment to a new framework, React Native might cause challenges in grasping concepts and best precatices.
- API Integration: Integrating external APIs, such as the ChatGPT API and festival event data API, might be difficult to implement and need sufficient time for testing and debugging, also time for undertsnading API documentation.
- Data Modeling: Designing the data model using MongoDB might require careful consideration. Defining the relationships between entities, ensuring data consistency can be complex and time-consuming. Also, creating the correct relationships between models.
- User Experience Design: Ensuring smooth navigation, responsiveness, and a cohesive design can require additional attention and iteration, must take into account everytime something new is added.
