# Find Your New Favourite Book

A full-stack web app for discovering, managing, and discussing your favourite books.
Built with React, Node.js/Express, and PostgreSQL.  

For backend I'm using my https://github.com/ksenia-adel/Praktika3.Adel.

---

## Features

- **Authentication** with role-based access (User/Admin)
- **Search** books by title, author, or genre
- **Comment** on books (users can delete their own comments)
- **Admins** can add, edit, or delete books and users
- **Activity logs** for admin/user actions

---

## Roles Overview

| Role  | Permissions                                      |
|-------|--------------------------------------------------|
| User  | View books, comment, delete their comments       |
| Admin | Manage books, users, comments, and view logs     |

---

## Screenshots
 
**Login Page**  

<img src="https://github.com/user-attachments/assets/2ddeabe3-d7fe-4ea4-a829-e6d6e6eac4b4" width="600"/>

**Main Page with Books**  
for admin

<img src="https://github.com/user-attachments/assets/bdd9a7a5-1e24-444c-b29d-659ecfc5e7f7" width="600"/>

for user

<img src="https://github.com/user-attachments/assets/038190dc-d44d-4444-808b-2df393363eac" width="600"/>

**Book Details & Comments**  
<img src="https://github.com/user-attachments/assets/3b7b8262-771d-48db-a502-72c5c91d44a0" width="600"/>

**Admin – Add New Book**  
<img src="https://github.com/user-attachments/assets/6dcc7390-f5b9-46ce-bd69-5d924aaefcab" width="600"/>

**Admin – Edit Book**  
<img src="https://github.com/user-attachments/assets/7ae44b19-b95c-49c4-84ab-fd3ea0f3e95c" width="600"/>

**Admin – Activity Logs**  
<img src="https://github.com/user-attachments/assets/5d9c8f18-6950-429f-895b-14197494aeee" width="600"/>



## Tech Stack

- **Frontend**: React, React Router, Axios, Context API
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)

---

## Getting Started

### Backend Setup

```js
git clone https://github.com/ksenia-adel/Adel.Praktika5
```
File -> Open Folder -> Adel.Praktika5

in backend folder create .env file

```js
DB_HOST=dev.vk.edu.ee
DB_PORT=5432
DB_DATABASE=yourDatabase
DB_USER=yourUser
DB_PASSWORD=yourPassword
DB_DIALECT=postgres
DB_SCHEMA=books
SECRET_ACCESS_TOKEN=secret
```

```js
cd backend
npm install
```
Create schema "books" in your Postgre Database.
```sql
CREATE SCHEMA books;
```
Then migrate the tables and import books into your Database.
```js
npx sequelize-cli db:migrate
node scripts/importBooks.js
```
#### Adding Users to Your Database

**You can add these users to your Database where:**

- login: admin1 / password: admin1

- login: user1 / password: user1
```sql
INSERT INTO books.users (id, username, email, password, role) VALUES
(1, 'admin1', 'admin1@example.com', '$2b$10$1KDMfoLTSZyLR89Iozc5Hei2RLkfW3G5fxIIyjzaZ5BZH3QH1M51S', 'Admin'),
(2, 'user1', 'user1@example.com', '$2b$10$Hkv7FEEHIy3/F1diplVPLuX325rK.KaT2xYMx020Ib0ckFmkUvhVC', 'User');
```

**OR**

- To manually add users to your PostgreSQL database, insert them into the users table.
- Since passwords are stored in hashed form, you’ll need to generate the hashed password first.

Use the pass.js script in the backend to create a secure hashed password:

```js
node pass.js
```
The script will ask you to enter a password and return a hashed version that looks something like this:

```js
$2b$10$gUax3zVxN7DqgK4XY2yW4uAciUL3fXqk4...
```
You can then insert a new user into the users table with SQL like this:
```sql 
INSERT INTO books.users (username, email, password, role)
VALUES ('newadmin', 'admin@example.com', 'hashed_password_here', 'Admin');
```

Then migrate, import Books and start backend server.js
```js
node server.js
```

Open new terminal and start React App
```js
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000

## API Endpoints 

### Auth
POST /api/auth/signin

### Books
GET /api/books 

POST /api/books (Admin)

PUT /api/books/:id (Admin)

DELETE /api/books/:id (Admin)

### Comments
POST /api/comments/:bookId

GET /api/comments/:bookId

DELETE /api/comments/:commentId

### Activity Logs
GET /api/logs (Admin only)
