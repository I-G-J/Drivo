# Drivo - Ride Sharing Application

## Documentation

---

## Table of Contents
1. [Forms Documentation](#forms-documentation)
2. [Context Documentation](#context-documentation)
3. [Usage Examples](#usage-examples)
4. [Data Flow](#data-flow)

---

## Forms Documentation

### 1. **UserSignup Form** (`/src/pages/UserSignup.jsx`)
Register a new user account with personal details.

#### Form Fields:
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| First Name | Text | Yes | - |
| Last Name | Text | Yes | - |
| Email | Email | Yes | Valid email format |
| Password | Password | Yes | - |

#### Data Structure:
```javascript
{
  username: {
    firstName: "John",
    lastName: "Doe"
  },
  email: "john@example.com",
  password: "password123"
}
```

#### Key Features:
- Form validation (all fields required)
- Input clearing after submission
- Console logging of submitted data
- Link to login page for existing users

#### Example Usage:
```javascript
// Form is submitted when user clicks Continue button
const submitHandler = (e) => {
  e.preventDefault()
  const newUserData = {
    username: {
      firstName: firstName,
      lastName: lastName
    },
    email: email,
    password: password
  }
  setUserData(newUserData)
  console.log(newUserData) // Check browser console for data
}
```

---

### 2. **UserLogin Form** (`/src/pages/UserLogin.jsx`)
User login with email and password.

#### Form Fields:
| Field | Type | Required |
|-------|------|----------|
| Email | Email | Yes |
| Password | Password | Yes |

#### Data Structure:
```javascript
{
  email: "john@example.com",
  password: "password123"
}
```

#### Key Features:
- Simple two-field login
- Link to signup page for new users
- Option to switch to Captain login

#### Example Usage:
```javascript
const submitHandler = (e) => {
  e.preventDefault()
  setUserData({
    email: email,
    password: password
  })
  setEmail('')
  setPassword('')
  // Send to backend API
}
```

---

### 3. **CaptainSignup Form** (`/src/pages/CaptainSignup.jsx`)
Register a new captain (driver) account.

#### Form Fields:
| Field | Type | Required |
|-------|------|----------|
| First Name | Text | Yes |
| Last Name | Text | Yes |
| Email | Email | Yes |
| Password | Password | Yes |

#### Data Structure:
```javascript
{
  fullName: {
    firstName: "Jane",
    lastName: "Smith"
  },
  email: "jane@example.com",
  password: "captainpass123"
}
```

#### Key Features:
- Similar to UserSignup but for captains
- Link to captain login page

---

### 4. **CaptainLogin Form** (`/src/pages/CaptainLogin.jsx`)
Captain login with email and password.

#### Data Structure:
```javascript
{
  email: "jane@example.com",
  password: "captainpass123"
}
```

#### Key Features:
- Dedicated captain login page
- Option to switch to User login
- Link to captain signup for new captains

---

## Context Documentation

### **UserDataContext** (`/src/context/UserContext.jsx`)

Global context for managing user data across the application.

#### Initial State:
```javascript
const [user, setUser] = useState({
  email: '',
  fullName: {
    firstname: '',
    lastname: ''
  }
})
```

#### Provider Setup:
```jsx
<UserContext.Provider value={[user, setUser]}>
  {children}
</UserContext.Provider>
```

---

## Usage Examples

### Example 1: Using UserContext in a Component

```jsx
import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const MyComponent = () => {
  const [user, setUser] = useContext(UserDataContext)

  // Update user data
  const updateUser = () => {
    setUser({
      email: 'newemail@example.com',
      fullName: {
        firstname: 'John',
        lastname: 'Doe'
      }
    })
  }

  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Name: {user.fullName.firstname} {user.fullName.lastname}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  )
}

export default MyComponent
```

### Example 2: Storing Signup Data in Context

```jsx
import React, { useState, useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [user, setUser] = useContext(UserDataContext)

  const submitHandler = (e) => {
    e.preventDefault()
    
    // Store in global context
    setUser({
      email: email,
      fullName: {
        firstname: firstName,
        lastname: lastName
      }
    })

    // Clear inputs
    setEmail('')
    setFirstName('')
    setLastName('')
  }

  return (
    // Form JSX here
  )
}

export default UserSignup
```

### Example 3: Accessing User Data Across Pages

```jsx
import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const Dashboard = () => {
  const [user] = useContext(UserDataContext)

  return (
    <div>
      <h1>Welcome, {user.fullName.firstname}!</h1>
      <p>Your email: {user.email}</p>
    </div>
  )
}

export default Dashboard
```

---

## Data Flow

```
┌─────────────────────┐
│   UserSignup Form   │
│  (Collects user     │
│   details)          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  submitHandler()    │
│  (Processes form)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  UserDataContext    │
│  (Stores data       │
│   globally)         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Any Component      │
│  (Accesses data     │
│   via useContext)   │
└─────────────────────┘
```

---

## Quick Start

### 1. Setup Context in App.jsx
```jsx
import UserContext from './context/UserContext'
import UserSignup from './pages/UserSignup'

function App() {
  return (
    <UserContext>
      <UserSignup />
      {/* Other routes */}
    </UserContext>
  )
}

export default App
```

### 2. Use in Components
```jsx
import { useContext } from 'react'
import { UserDataContext } from './context/UserContext'

// Access user data
const [user, setUser] = useContext(UserDataContext)
```

---

## Notes

- **Console Logging**: Check browser DevTools (F12 → Console) to see form submission data
- **Form Validation**: All form fields have `required` attribute
- **State Management**: Forms use local state, context for global state
- **Next Steps**: Connect forms to backend API for actual authentication

---

## API Integration Examples (Ready for Backend)

### User Signup API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  const userData = {
    username: { firstName, lastName },
    email,
    password
  }
  
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const result = await response.json()
    console.log(result)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Captain Login API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  const captainData = { email, password }
  
  try {
    const response = await fetch('/api/captains/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(captainData)
    })
    const result = await response.json()
    // Update context with response
    setUser(result.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

**Last Updated**: September 12, 2024
