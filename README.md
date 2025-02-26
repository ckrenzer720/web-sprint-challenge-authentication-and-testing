# 🔑 **Authentication and Testing Sprint Challenge**

## 📌 **Project Overview**

The **Dad Joke Authentication App** is a backend application that implements secure user authentication and protected routes using Node.js and Express. It allows users to register, log in, and retrieve dad jokes, ensuring only authenticated users can access the jokes.

### **Key Features:**
- **User Authentication**: Secure registration and login using `bcryptjs` for password hashing and `jsonwebtoken` for authentication.
- **Protected Routes**: Users must be authenticated to retrieve dad jokes.
- **Database Integration**: Manages user credentials using a SQL database with migrations.
- **Automated Testing**: Ensures system reliability with Jest-based unit and integration tests.

---

## 📂 **Project Structure**

```
api/
│── auth/
│   ├── auth-router.js   # Handles registration and login
│   ├── auth-middleware.js  # Middleware for authentication
│── jokes/
│   ├── jokes-router.js  # Protected route to access jokes
│── middleware/
│   ├── restricted.js    # Middleware to restrict access to authenticated users
│── server.js           # Application entry point
│── server.test.js      # API test suite
migrations/
│── 20230101010101_users_table.js # Users table migration
```  

---

## 🛠 **Tools Required**

- **Node.js** >= 16.x
- **NPM** >= 8.x *(Update with `npm i -g npm`)*
- **Unix-like Shell** *(Gitbash/bash/zsh preferred)*

---

## ⚙️ **Project Setup**

### 1️⃣ Clone the Repository
```sh
git clone <repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Database
```sh
npm run migrate
```

### 4️⃣ Run Tests
```sh
npm test
```

### 5️⃣ Start the Application
```sh
npm run server
```

---

## 🔗 **API Endpoints**

### 🛠 **Authentication**
| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Creates a new user       |
| POST   | `/api/auth/login`    | Logs in a user, returns a token |

### 🎭 **Dad Jokes (Protected Route)**
| Method | Endpoint     | Description               |
|--------|-------------|---------------------------|
| GET    | `/api/jokes` | Returns dad jokes (Auth Required) |

---



> **This project highlights essential authentication and testing skills, making it an excellent addition to a backend developer's portfolio. 🚀**

