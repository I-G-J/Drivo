# Drivo Frontend

The Drivo frontend is a React and Vite ride-booking interface. It currently contains the user and captain entry flows plus a prototype ride-booking journey implemented with React state, GSAP animations, Tailwind CSS, and Remix Icon.

## Requirements

- Node.js and npm
- The dependencies installed from `frontend/package.json`

## Getting Started

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite will print the local URL, normally `http://localhost:5173`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run lint` | Run ESLint across the frontend. |

## Application Routes

Routes are defined in `src/App.jsx`.

| Path | Screen | Access |
| --- | --- | --- |
| `/` | Start screen | Public |
| `/login` | User login | Public |
| `/signup` | User signup | Public |
| `/captain-login` | Captain login | Public |
| `/captain-signup` | Captain signup | Public |
| `/home` | User ride-booking screen | User protected |
| `/user/logout` | User logout | User protected |
| `/captain-home` | Captain home screen | Captain protected |

The user and captain protected routes use `userProtectorWrapper.jsx` and `CaptainProtectorWrapper.jsx`. Authentication state is held in the context modules under `src/context/` and uses the backend token flow where implemented.

## Current Ride Flow

The main user journey is implemented in `src/pages/Home.jsx`:
1. The user opens the pickup or destination field.
2. `LocationSearchPanel` displays sample locations.
3. Selecting a location closes the search panel and opens `VehicalPanel`.
4. Selecting a vehicle opens `ConfirmRide`.
5. Confirming the ride opens `LookingForDriver`.
6. `WaitForDriver` is the next assigned-driver panel prepared in `Home`; its final transition is not connected yet.

The panels are rendered as bottom sheets. GSAP animates each panel between its visible position and `translateY(100%)`. The parent `Home` component owns the panel visibility state and passes setter functions to child components.

## Frontend Structure

```text
src/
├── App.jsx                 # Application routes
├── main.jsx                # React entry point
├── index.css               # Global styles and Tailwind entry
├── Components/
│   ├── LocationSearchPanel.jsx
│   ├── VehicalPanel.jsx
│   ├── ConfirmRide.jsx
│   ├── LookingForDriver.jsx
│   └── WaitForDriver.jsx
├── context/
│   ├── UserContext.jsx
│   └── CaptainContext.jsx
└── pages/
	├── Home.jsx
	├── Start.jsx
	├── UserLogin.jsx
	├── UserSignup.jsx
	├── UserLogout.jsx
	├── userProtectorWrapper.jsx
	├── CaptainLogin.jsx
	├── CaptainSignup.jsx
	├── CaptainHome.jsx
	└── CaptainProtectorWrapper.jsx
```

Vehicle artwork and the Drivo logo are stored in `src/assets/`. Remix Icon is loaded for interface icons, and GSAP with `@gsap/react` controls panel transitions.

## Current Prototype Scope

The ride-booking UI is currently presentation-focused:

- Locations are sample entries defined in `LocationSearchPanel`.
- Vehicle names, prices, driver details, and addresses are hard-coded sample data.
- The map background is currently a remote placeholder image.
- The ride panels are connected through local React state, but the complete booking and driver-assignment requests are not yet connected to backend APIs.
- The React Compiler is not enabled.

When replacing the prototype data, keep panel state in `Home` and pass domain data into the panels through props. This preserves the existing animation and navigation flow while allowing API results to replace the hard-coded values.

## Validation

Before committing frontend changes, run:

```bash
npm run build
npm run lint
```

The build should pass independently of the backend. The full lint command may still report existing issues in unrelated screens while those files are being completed.
