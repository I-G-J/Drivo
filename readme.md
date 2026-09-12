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
- Error display with user-friendly messages
- Loading state during API call
- Button disabled state while submitting
- Auto-navigation to home on successful login
- Token stored in localStorage
- Context integration for global user state
- Try-catch error handling

#### Implementation Details:
```javascript
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const userContextValue = useContext(UserDataContext);
const [user, setUser] = Array.isArray(userContextValue)
  ? userContextValue
  : [null, () => {}];

const submitHandler = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const userData = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Login failed. Please try again.";
    setError(errorMessage);
    console.error("Login failed:", err);
  } finally {
    setLoading(false);
    setEmail("");
    setPassword("");
  }
};
```

---

### 3. **CaptainSignup Form** (`/src/pages/CaptainSignup.jsx`)
Register a new captain (driver) account with personal and vehicle details.

#### Form Fields:
| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| First Name | Text | Yes | Minimum 3 characters |
| Last Name | Text | Yes | - |
| Email | Email | Yes | Valid email format |
| Password | Password | Yes | Minimum 6 characters |
| Vehicle Type | Select | Yes | car, motorcycle, auto |
| Vehicle Color | Text | Yes | Minimum 3 characters |
| Vehicle Plate | Text | Yes | Minimum 3 characters |
| Capacity | Number | Yes | Minimum 1 |
| Latitude | Number | No | - |
| Longitude | Number | No | - |

#### Data Structure:
```javascript
{
  fullname: {
    firstname: "Jane",
    lastname: "Smith"
  },
  email: "jane@example.com",
  password: "captainpass123",
  vehicle: {
    color: "Red",
    plate: "ABC123",
    capacity: 4,
    vehicleType: "car",
    location: {
      lat: 28.7041,
      lng: 77.1025
    }
  }
}
```

#### Key Features:
- Personal information fields
- Vehicle information fields
- Error display with user-friendly messages
- Loading state during API call
- Button disabled state while submitting
- Auto-navigation to captain home on successful signup
- Token stored in localStorage
- Context integration for global captain state

#### Implementation Details:
```javascript
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [vehicleColor, setVehicleColor] = useState("");
const [vehiclePlate, setVehiclePlate] = useState("");
const [vehicleCapacity, setVehicleCapacity] = useState("");
const [vehicleType, setVehicleType] = useState("car");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const submitHandler = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  
  try {
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
        location: {
          lat: vehicleLat ? parseFloat(vehicleLat) : undefined,
          lng: vehicleLng ? parseFloat(vehicleLng) : undefined,
        }
      }
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status === 201) {
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/captain-home");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};
```

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
- Error display with user-friendly messages
- Loading state during API call
- Button disabled state while submitting
- Auto-navigation to captain home on successful login
- Token stored in localStorage
- Context integration for global captain state

#### Implementation Details:
```javascript
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

const { setCaptain, setIsLoading, setError: setContextError } = 
  useContext(CaptainDataContext)

const submitHandler = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)
  setIsLoading(true)

  const captainData = {
    email: email,
    password: password
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    )

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
  } catch (err) {
    const errorMessage = 
      err.response?.data?.message || 'Login failed. Please try again.'
    setError(errorMessage)
    setContextError(errorMessage)
    console.error('Login failed:', err)
  } finally {
    setLoading(false)
    setIsLoading(false)
    setEmail('')
    setPassword('')
  }
}
```

---

### 5. **UserLogout Component** (`/src/pages/UserLogout.jsx`)
Handles user logout by clearing token and redirecting to login.

#### Key Features:
- Calls logout API endpoint with authorization header
- Removes token from localStorage
- Auto-redirects to login page
- Shows "Logging out..." message during request
- Error handling - removes token even if logout fails

#### Implementation Details:
```javascript
import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        
        if (response.status === 200) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      } catch (error) {
        console.error('Logout failed:', error)
        // Remove token anyway on error
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    handleLogout()
  }, [token, navigate])

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Logging out...</h1>
    </div>
  )
}

export default UserLogout
```

---

### 6. **CaptainProtectorWrapper Component** (`/src/pages/CaptainProtectorWrapper.jsx`)
Route protection wrapper that ensures only authenticated captains can access protected routes.

#### Key Features:
- Checks for valid token in localStorage
- Fetches captain profile from backend
- Sets captain data in context
- Redirects to login if not authenticated
- Shows loading state while checking authentication
- Handles 401 unauthorized errors
- Proper authorization header formatting

#### Implementation Details:
```javascript
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectorWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      setIsChecking(false)
      return
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsChecking(false)
        }
      } catch (error) {
        console.error('Profile fetch error:', error)
        navigate('/captain-login')
        setIsChecking(false)
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        Checking authentication...
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectorWrapper
```

#### Usage in App.jsx:
```javascript
<Routes>
  {/* Protected Routes */}
  <Route path="/captain-home" element={
    <CaptainProtectorWrapper>
      <CaptainHome />
    </CaptainProtectorWrapper>
  } />
  
  {/* Public Routes */}
  <Route path="/captain-login" element={<CaptainLogin />} />
  <Route path="/captain-signup" element={<CaptainSignup />} />
</Routes>
```

---

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

#### Usage in Components:
```javascript
const [user, setUser] = useContext(UserDataContext)
```

---

### **CaptainDataContext** (`/src/context/CaptainContext.jsx`)

Global context for managing captain (driver) data across the application.

#### Structure:
```javascript
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};
```

#### Usage in Components:
```javascript
const { captain, setCaptain, isLoading, setError } = useContext(CaptainDataContext)
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

## API Integration Examples (Implemented with Axios)

### User Signup API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  const userData = {
    fullname: {
      firstname: firstName,
      lastname: lastName
    },
    email: email,
    password: password
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      userData
    )

    if (response.status === 201) {
      setUser(response.data.user)
      localStorage.setItem("token", response.data.token)
      navigate("/home")
    }
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed")
  } finally {
    setLoading(false)
  }
}
```

### User Login API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  const userData = {
    email: email,
    password: password
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    )

    if (response.status === 200) {
      setUser(response.data.user)
      localStorage.setItem("token", response.data.token)
      navigate("/home")
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed")
  } finally {
    setLoading(false)
  }
}
```

### Captain Signup API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  setError("")
  setLoading(true)

  const captainData = {
    fullname: {
      firstname: firstName,
      lastname: lastName
    },
    email: email,
    password: password,
    vehicle: {
      color: vehicleColor,
      plate: vehiclePlate,
      capacity: parseInt(vehicleCapacity),
      vehicleType: vehicleType,
      location: {
        lat: vehicleLat ? parseFloat(vehicleLat) : undefined,
        lng: vehicleLng ? parseFloat(vehicleLng) : undefined
      }
    }
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    )

    if (response.status === 201) {
      setCaptain(response.data.captain)
      localStorage.setItem("token", response.data.token)
      navigate("/captain-home")
    }
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed")
  } finally {
    setLoading(false)
  }
}
```

### Captain Login API Call:
```javascript
const submitHandler = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  const captainData = {
    email: email,
    password: password
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/login`,
      captainData
    )

    if (response.status === 200) {
      setCaptain(response.data.captain)
      localStorage.setItem('token', response.data.token)
      navigate('/captain-home')
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed')
  } finally {
    setLoading(false)
  }
}
```

### Protected Route API Call with Token:
```javascript
const fetchCaptainProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/captains/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.status === 200) {
      setCaptain(response.data.captain)
    }
  } catch (error) {
    console.error('Profile fetch error:', error)
    navigate('/captain-login')
  }
}
```

### Logout API Call:
```javascript
const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    
    if (response.status === 200) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  } catch (error) {
    console.error('Logout failed:', error)
    // Remove token anyway
    localStorage.removeItem('token')
    navigate('/login')
  }
}
```

---

**Last Updated**: September 12, 2026
