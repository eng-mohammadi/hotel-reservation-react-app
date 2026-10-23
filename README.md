# 🏨 Hotel Reservation React App

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764ABC?logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-API_Client-5A29E4?logo=axios&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-SCSS-CC6699?logo=sass&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON_Server-Fake_API-000000?logo=json&logoColor=white)

A complete, dynamic hotel reservation application built with React. The app provides a realistic booking experience for hotel rooms and food services, with data managed through a JSON Server REST API.

This project was built as a portfolio piece to demonstrate practical frontend development, modern React architecture, API integration, global state management, form handling, and responsive Persian UI design.

## ✨ Features

- 🛏️ Browse and search available hotel rooms
- 🍽️ Browse food services and add items to a persistent cart
- 📄 View detailed information for rooms and food items
- 📝 Create and edit room reservations
- 🔎 Track room and food reservations
- 🔐 Register and log in through the application flow
- 💳 Manage accounting information and reservation costs
- ✅ Validate forms with Formik
- 🔄 Fetch and mutate API data with Redux Toolkit Query
- 💾 Persist selected Redux state with Redux Persist
- 📱 Responsive Persian interface with custom fonts and SCSS

## 🧰 Tech Stack

| Category | Technologies |
| --- | --- |
| UI | React 19, JSX, React Router |
| State management | Redux Toolkit, React Redux, Redux Persist |
| Server state | RTK Query, Axios |
| Forms | Formik |
| Styling | SCSS, custom Persian fonts |
| Development API | JSON Server |
| Tooling | Create React App, npm |

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/eng-mohammadi/hotel-reservation-react-app.git
cd hotel-reservation-react-app
npm install
```

### Start the API

Open a terminal in the project root and run:

```bash
npx json-server --watch src/API/db.json --port 3032
```

The API must be available at `http://localhost:3032` because the application uses this port for rooms, foods, accounts, and reservations.

### Start the application

Open a second terminal in the same folder:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the React development server |
| `npm run build` | Creates an optimized production build |
| `npm test` | Runs the test suite |

## 🗂️ Project Structure

```text
src/
├── API/                 # JSON Server database
├── components/          # Pages and reusable UI components
├── redux/
│   ├── services/        # RTK Query API services
│   ├── rooms/           # Room state and selectors
│   ├── foods/           # Food state and selectors
│   └── store.js         # Redux store configuration
├── styles/              # Global SCSS and font styles
├── utils/               # Validation and local-storage helpers
├── App.js               # Application routes
└── index.js             # Application entry point
```

## 🔌 API Resources

The local JSON Server database includes these resources:

- `rooms`: hotel room data and availability
- `foods`: food and restaurant items
- `accounting`: user registration and login data
- `roomReservation`: room reservation records
- `foodReservation`: food order records

## 🧠 What This Project Demonstrates

- Component-based UI architecture
- Nested routes and dynamic route parameters
- Separation of UI state and server state
- CRUD operations through RTK Query
- Redux selectors and persisted client state
- Form validation and controlled user flows
- Reusable components and SCSS organization

## 📌 Portfolio Note

This project is part of my React learning path and represents the final, full-scale application of the course. It combines the concepts I practiced across smaller exercises into one complete, dynamic product.

## 👤 Author

**Reza Mohammadi**

- GitHub: [@eng-mohammadi](https://github.com/eng-mohammadi)
- Email: eng.mohammadi.404@gmail.com
