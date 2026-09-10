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

### Notes

- The JWT token returned can be used for authentication in subsequent requests
- Passwords are hashed using bcrypt with 10 salt rounds before being stored in the database
- All fields are required for successful registration
