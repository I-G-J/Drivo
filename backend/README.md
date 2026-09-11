# Drivo Backend API Documentation

## Endpoints

### 1. User Registration
**Endpoint:** `POST /users/register`

**Description:** 
Registers a new user in the system. The endpoint validates the input data, hashes the password, creates a new user in the database, and returns an authentication token.

---

### Request Details

**URL:** `http://localhost:4000/users/register`

**Method:** `POST`

**Content-Type:** `application/json`

---

### Required Fields

| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `fullname.firstname` | String | Min 3 characters | First name of the user |
| `fullname.lastname` | String | Min 3 characters | Last name of the user |
| `email` | String | Valid email format | Unique email address |
| `password` | String | Min 8 characters | User password (will be hashed) |

---

### Request Body Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Response Status Codes

| Status Code | Description |
|------------|-------------|
| **201** | Created - User successfully registered. Returns token and user details. |
| **400** | Bad Request - Validation failed. Returns array of validation errors. |

---

### Successful Response (201)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-09-10T10:30:00.000Z",
    "updatedAt": "2026-09-10T10:30:00.000Z"
  }
}
```

---

### Error Response (400)

**All Fields Invalid:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "password must be of 8 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

**Invalid Email Only:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Password Too Short:**
```json
{
  "errors": [
    {
      "msg": "password must be of 8 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

**First Name Too Short:**
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Validation Rules

1. **Email Validation**
   - Must be a valid email format
   - Must be unique in the database
   - Error: `"Invalid Email"`

2. **First Name Validation**
   - Minimum 3 characters required
   - Error: `"First name must be at least 3 characters long"`

3. **Password Validation**
   - Minimum 8 characters required
   - Error: `"password must be of 8 characters long"`
   - Password is automatically hashed using bcrypt before storing

---

### 2. User Login
**Endpoint:** `POST /users/login`

**Description:** 
Authenticates a user with email and password. Validates the credentials against the database and returns an authentication token if successful.

---

### Request Details

**URL:** `http://localhost:4000/users/login`

**Method:** `POST`

**Content-Type:** `application/json`

---

### Required Fields

| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `email` | String | Valid email format | User's registered email |
| `password` | String | Min 8 characters | User's password |

---

### Request Body Example

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Response Status Codes

| Status Code | Description |
|------------|-------------|
| **200** | OK - User successfully authenticated. Returns token and user details. |
| **400** | Bad Request - Validation failed. Returns array of validation errors. |
| **401** | Unauthorized - Invalid email or password. |

---

### Successful Response (200)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-09-10T10:30:00.000Z",
    "updatedAt": "2026-09-10T10:30:00.000Z"
  }
}
```

---

### Error Response (400)

**Invalid Email:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email id",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Password Too Short:**
```json
{
  "errors": [
    {
      "msg": "Invalid  password",
      "param": "password",
      "location": "body"
    }
  ]
}
```

**Both Fields Invalid:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email id",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Invalid  password",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

### Error Response (401)

**Invalid Email or Password:**
```json
{
  "message": "Invalid user or password"
}
```

---

### Validation Rules

1. **Email Validation**
   - Must be a valid email format
   - Error: `"Invalid Email id"`

2. **Password Validation**
   - Minimum 8 characters required
   - Error: `"Invalid  password"`
   - Password is compared against the hashed password stored in the database

---

### Notes

- The JWT token returned can be used for authentication in subsequent requests
- Both email and password are required for login
- Returns a generic "Invalid user or password" message for security (doesn't reveal if email exists or not)
- User must have registered first before attempting to login

---

### Testing Examples

#### Using cURL

**Successful Login:**
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

**Invalid Credentials:**
```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "wrongpassword"
  }'
```

#### Using JavaScript Fetch

```javascript
// Login function
async function loginUser(email, password) {
  try {
    const response = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful!');
      console.log('Token:', data.token);
      console.log('User:', data.user);
      // Store token in localStorage for future requests
      localStorage.setItem('authToken', data.token);
    } else {
      console.error('Login failed:', data.message || data.errors);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
loginUser('john.doe@example.com', 'securepassword123');
```

#### Using Postman

1. **Create a new POST request**
   - URL: `http://localhost:4000/users/login`
   - Method: `POST`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "email": "john.doe@example.com",
     "password": "securepassword123"
   }
   ```

4. **Click Send** to test the endpoint

---

### 3. User Logout
**Endpoint:** `POST /users/logout`

**Description:** 
Logs out a user by clearing the authentication token cookie and adding the token to the blacklist. The blacklisted token will expire after 24 hours.

---

### Request Details

**URL:** `http://localhost:4000/users/logout`

**Method:** `POST`

**Content-Type:** `application/json`

**Authentication:** Required (Bearer Token or Cookie)

---

### Required Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | `Bearer <token>` | JWT token from login (optional if using cookie) |
| `Cookie` | `token=<token>` | JWT token stored in cookie (alternative to header) |

---

### Request Body Example

```json
{}
```

*No request body needed - authentication is provided via headers/cookies*

---

### Response Status Codes

| Status Code | Description |
|------------|-------------|
| **200** | OK - User successfully logged out. |
| **401** | Unauthorized - Missing or invalid token. |

---

### Successful Response (200)

```json
{
  "message": "logged out"
}
```

---

### Error Response (401)

**Missing Token:**
```json
{
  "message": "Unauthorized"
}
```

**Invalid or Expired Token:**
```json
{
  "message": "Unauthorized"
}
```

**Blacklisted Token:**
```json
{
  "message": "Unauthorized"
}
```

---

### Validation Rules

1. **Token Validation**
   - Token must be present in either cookies or Authorization header
   - Token must be valid and not expired
   - Error: `"Unauthorized"`

2. **Blacklist Management**
   - Token is automatically added to blacklist database
   - Blacklisted tokens are automatically deleted after 24 hours
   - Expired tokens cannot be reused

---

### Notes

- The token is cleared from cookies on the client side
- Token is added to the blacklist to prevent reuse
- Blacklist entries automatically expire and are deleted after 24 hours
- After logout, user must login again to get a new token

---

### Testing Examples

#### Using cURL with Bearer Token

```bash
curl -X POST http://localhost:4000/users/logout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Using cURL with Cookie

```bash
curl -X POST http://localhost:4000/users/logout \
  -H "Content-Type: application/json" \
  -H "Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Using JavaScript Fetch

```javascript
// Logout function with Bearer Token
async function logoutUser(token) {
  try {
    const response = await fetch('http://localhost:4000/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Logout successful!');
      console.log(data.message);
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      // Redirect to login page
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
const token = localStorage.getItem('authToken');
logoutUser(token);
```

#### Using Postman

1. **Create a new POST request**
   - URL: `http://localhost:4000/users/logout`
   - Method: `POST`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Add Authorization**
   - Go to `Authorization` tab
   - Type: `Bearer Token`
   - Token: Paste your JWT token from login response

4. **Leave Body Empty** (raw JSON, empty object or no body)

5. **Click Send** to logout

---

### 4. Captain Registration
**Endpoint:** `POST /captains/register`

**Description:** 
Registers a new captain (driver) in the system. The endpoint validates the input data, hashes the password, creates a new captain with vehicle details in the database, and returns an authentication token.

---

### Request Details

**URL:** `http://localhost:4000/captains/register`

**Method:** `POST`

**Content-Type:** `application/json`

---

### Required Fields

| Field | Type | Validation | Description |
|-------|------|-----------|-------------|
| `fullname.firstname` | String | Min 3 characters | First name of the captain |
| `fullname.lastname` | String | Min 3 characters | Last name of the captain |
| `email` | String | Valid email format | Unique email address |
| `password` | String | Min 6 characters | Captain's password (will be hashed) |
| `vehicle.color` | String | Min 3 characters | Vehicle color |
| `vehicle.plate` | String | Min 3 characters | Vehicle registration plate number |
| `vehicle.capacity` | Number | Minimum 1 | Passenger capacity of vehicle |
| `vehicle.vehicleType` | String | Must be: car, motorcycle, auto | Type of vehicle |
| `vehicle.location.lat` | Number | Optional | Latitude coordinate of vehicle location |
| `vehicle.location.lng` | Number | Optional | Longitude coordinate of vehicle location |

---

### Request Body Example

```json
{
  "fullname": {
    "firstname": "Rajesh",
    "lastname": "Kumar"
  },
  "email": "rajesh.kumar@example.com",
  "password": "captain123",
  "vehicle": {
    "color": "White",
    "plate": "MH-01-AB-1234",
    "capacity": 4,
    "vehicleType": "car",
    "location": {
      "lat": 19.0760,
      "lng": 72.8777
    }
  }
}
```

---

### Alternative Vehicle Type Examples

**Motorcycle:**
```json
{
  "fullname": {
    "firstname": "Amit",
    "lastname": "Singh"
  },
  "email": "amit.singh@example.com",
  "password": "captain456",
  "vehicle": {
    "color": "Red",
    "plate": "DL-01-CD-7890",
    "capacity": 2,
    "vehicleType": "motorcycle"
  }
}
```

**Auto Rickshaw:**
```json
{
  "fullname": {
    "firstname": "Priya",
    "lastname": "Sharma"
  },
  "email": "priya.sharma@example.com",
  "password": "captain789",
  "vehicle": {
    "color": "Yellow",
    "plate": "KA-03-EF-3456",
    "capacity": 3,
    "vehicleType": "auto"
  }
}
```

---

### Response Status Codes

| Status Code | Description |
|------------|-------------|
| **201** | Created - Captain successfully registered. Returns token and captain details. |
| **400** | Bad Request - Validation failed or captain already exists. Returns error details. |

---

### Successful Response (201)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "507f1f77bcf86cd799439012",
    "fullname": {
      "firstname": "Rajesh",
      "lastname": "Kumar"
    },
    "email": "rajesh.kumar@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "White",
      "plate": "MH-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": {
        "lat": 19.0760,
        "lng": 72.8777
      }
    },
    "createdAt": "2026-09-11T10:30:00.000Z",
    "updatedAt": "2026-09-11T10:30:00.000Z"
  }
}
```

---

### Error Response (400)

**All Fields Invalid:**
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    },
    {
      "msg": "Color must be at least 3 characters long",
      "param": "vehicle.color",
      "location": "body"
    },
    {
      "msg": "Plate must be at least 3 characters long",
      "param": "vehicle.plate",
      "location": "body"
    },
    {
      "msg": "Capacity must be at least 1",
      "param": "vehicle.capacity",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

**Captain Already Exists:**
```json
{
  "message": "Captain already exist"
}
```

**Invalid Vehicle Type:**
```json
{
  "errors": [
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

---

### Validation Rules

1. **Email Validation**
   - Must be a valid email format
   - Must be unique in the database
   - Duplicate email returns: `"Captain already exist"`
   - Error: `"Invalid Email"`

2. **First Name Validation**
   - Minimum 3 characters required
   - Error: `"First name must be at least 3 characters long"`

3. **Password Validation**
   - Minimum 6 characters required (shorter than user password)
   - Error: `"Password must be at least 6 characters long"`
   - Password is automatically hashed using bcrypt before storing

4. **Vehicle Details Validation**
   - **Color**: Minimum 3 characters
   - **Plate**: Minimum 3 characters
   - **Capacity**: Minimum value of 1
   - **Vehicle Type**: Must be one of: `car`, `motorcycle`, `auto`

---

### Notes

- The JWT token returned can be used for authentication in subsequent requests
- Captain status is set to `inactive` by default and must be activated by admin
- Password is hashed using bcrypt with 10 salt rounds before storing
- JWT token expires after 24 hours
- Token format should include expiresIn of 24h

---

### Testing Examples

#### Using cURL

**Successful Registration (Car):**
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Rajesh",
      "lastname": "Kumar"
    },
    "email": "rajesh.kumar@example.com",
    "password": "captain123",
    "vehicle": {
      "color": "White",
      "plate": "MH-01-AB-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

**Successful Registration (Motorcycle):**
```bash
curl -X POST http://localhost:4000/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Amit",
      "lastname": "Singh"
    },
    "email": "amit.singh@example.com",
    "password": "captain456",
    "vehicle": {
      "color": "Red",
      "plate": "DL-01-CD-7890",
      "capacity": 2,
      "vehicleType": "motorcycle"
    }
  }'
```

#### Using JavaScript Fetch

```javascript
// Captain Registration function
async function registerCaptain(captainData) {
  try {
    const response = await fetch('http://localhost:4000/captains/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(captainData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Captain registration successful!');
      console.log('Token:', data.token);
      console.log('Captain:', data.captain);
      // Store token in localStorage for future requests
      localStorage.setItem('captainToken', data.token);
    } else {
      console.error('Registration failed:', data.message || data.errors);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
const captainData = {
  fullname: {
    firstname: "Rajesh",
    lastname: "Kumar"
  },
  email: "rajesh.kumar@example.com",
  password: "captain123",
  vehicle: {
    color: "White",
    plate: "MH-01-AB-1234",
    capacity: 4,
    vehicleType: "car",
    location: {
      lat: 19.0760,
      lng: 72.8777
    }
  }
};

registerCaptain(captainData);
```

#### Using Postman

1. **Create a new POST request**
   - URL: `http://localhost:4000/captains/register`
   - Method: `POST`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "fullname": {
       "firstname": "Rajesh",
       "lastname": "Kumar"
     },
     "email": "rajesh.kumar@example.com",
     "password": "captain123",
     "vehicle": {
       "color": "White",
       "plate": "MH-01-AB-1234",
       "capacity": 4,
       "vehicleType": "car"
     }
   }
   ```

4. **Click Send** to test the endpoint

---

### API Flow Summary

1. **User Registration** → POST `/users/register` → Get JWT token
2. **User Login** → POST `/users/login` → Get JWT token
3. **Captain Registration** → POST `/captains/register` → Get JWT token
4. **Use Token** → Include in Authorization header or cookies for protected routes
5. **User/Captain Logout** → POST `/users/logout` or `/captains/logout` → Token blacklisted and cleared
