### Hexlet tests and linter status:
[![Actions Status](https://github.com/ajsen/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ajsen/frontend-project-12/actions)

\* repository as a zip file.

### Installation and launch:

1. Clone the repository:

```bash
git clone git@github.com:ajsen/frontend-project-12.git
```
**Alternatively, you can download the repository as a zip file:**

Click on the green "Code" button on the repository page and select "Download ZIP"

2. Change directory to the project folder:

```bash
cd frontend-project-12
```

3. Install dependencies:

```bash
make install
```

or

```bash
npm ci
```

4. Run application and server locally:

```bash
make start
```

or

```bash
npm run start
```

5. Open `http://localhost:3000` in your browser

### Requirements:

- Node.js v18 or above

### Description:

This project is a chat application that allows users to communicate in real time. The application is built using React, Redux, and Socket.io. The application is deployed on [Render](https://render.com/) and can be accessed at https://chat-u1du.onrender.com.

![The site](/assets/images/screely-app.png)

#### Key features:

- **Authentication:** registration and login
- **Channel management:** create, delete, rename chat channels
- **Error handling:** Feedback messages when an error occurs
- **Form validation:** validation of user input
- **Responsive design:**
  - Works on both desktop and mobile devices
  - Toast notifications for channel management
- **Profanity Filter:** Censors swear words for chat messages and channel names

#### Technologies used:

- [React](https://react.dev/) for frontend
- [Redux](https://redux.js.org/) for state management
- [Socket.io](https://socket.io/) for real-time communication
- [Bootstrap](https://react-bootstrap.github.io/) for UI
- [Axios](https://axios-http.com/) for http requests
- [React-router](https://reactrouter.com) for routing
- [React-toastify](https://github.com/fkhadra/react-toastify) for toast notifications
- [React-profanity-filter](https://github.com/jojoee/leo-profanity) for profanity filtering
- [Yup](https://github.com/jquense/yup) for form validation
- [i18next](https://react.i18next.com/) for internationalization
- [Formik](https://formik.org/) for form management