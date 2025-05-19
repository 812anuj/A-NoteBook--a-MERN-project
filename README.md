
# 📘 A-NoteBook - Your Secure Note Manager

**A-NoteBook** is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to securely **create, read, update, and delete personal notes**. Authentication is handled via JWT tokens, ensuring your notes remain private and accessible only to you.


A NoteBook allows users to:

📝 Create, read, update, and delete personal notes
🔐 Access notes securely after login/signup
⚙️ Perform real-time operations with instant UI updates using React Hooks and Context API
📲 Use the app on any device with a clean, responsive design
🧠 Learn the core of full-stack web development through REST APIs and protected routes


💡 Features
1. User Authentication with JWT & hashed passwords (bcrypt)
2. Secure Notes CRUD operations
3. Protected Routes: Users can’t access home page or manage notes without logging in
4. React Context API used for global state management
5. Alert system for instant feedback (e.g., success, error)
6. Form Validation on login and signup
7. Responsive UI using Bootstrap 5
8. Token-based Authorization for all note APIs


🛠️ Technologies Used
1. Frontend
   React.js  
   React Router DOM 
   Bootstrap 5
   Context API

2. Backend
   Node.js
   Express.js
   MongoDB (via Mongoose)
   JWT for auth
   Bcrypt.js for password hashing
   dotenv for environment config
