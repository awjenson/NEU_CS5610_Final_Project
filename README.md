# Little Lemon Restaurant Web Application

## Project Overview
Little Lemon is a modern, responsive web application built for a fictitious restaurant located in Chicago, IL. The application provides customers with a seamless experience to explore restaurant information, view the menu, create user accounts, and edit table reservations. Built with a focus on accessibility, responsiveness, and user experience, the application serves as a comprehensive digital platform for restaurant operations.

This web app was built as my final project for Northeastern University's CS5610 course, demonstrating proficiency in full-stack web development, modern React practices, and RESTful API design.

## Technology Stack
- **Frontend**: React.js, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT-based authentication with refresh tokens
- **Testing**: Jest, React Testing Library
- **Styling**: Custom CSS with responsive design principles

## Project Structure

### Client-side (`/client`)
The client directory contains the React application with the following key components:

#### Components (`/components`)
- **App.jsx**: Main application component with routing setup
- **AppLayout.jsx**: Layout wrapper component for consistent page structure
- **HomePage.jsx**: Home page with hero, highlights, testimonials, and about section
- **Nav.jsx**: Responsive navigation bar with mobile menu support
- **Footer.jsx**: Site footer with navigation and social links
- **Hero.jsx**: Hero section with dynamic content and call-to-action to make a reservation
- **Highlights.jsx**: Featured menu items with responsive grid layout
- **Testimonials.jsx**: Customer reviews with responsive card layout
- **About.jsx**: Restaurant information with image gallery
- **AboutPage.jsx**: About page component with map and hours
- **Hours.jsx**: Operating hours display with responsive layout
- **RestaurantMap.jsx**: Interactive Google Maps map with responsive container
- **ReservationsPage.jsx**: Main reservations interface
- **ReservationsForm.jsx**: Form for creating/updating reservations
- **ReservationsList.jsx**: Display of existing reservations
- **Login.jsx**: Login form component
- **LoginPage.jsx**: Login page wrapper with form
- **Register.jsx**: Registration form component
- **RegisterPage.jsx**: Registration page wrapper with form
- **Menu.jsx**: Menu component with item display
- **MenuPage.jsx**: Menu page wrapper with filtering by menu category
- **OrderOnline.jsx**: Online ordering interface
- **OrderOnlinePage.jsx**: Online ordering page wrapper
- **Profile.jsx**: User profile form component
- **ProfilePage.jsx**: Profile page wrapper with form
- **NotFound.jsx**: 404 error page component

#### Styles (`/style`)
- **index.css**: Comprehensive styling system with:
  - Responsive design breakpoints
  - CSS Grid and Flexbox utilities
  - Custom typography system
  - Accessibility-focused components
  - Consistent spacing and layout patterns

#### Tests (`/tests`)
- Component tests using Jest and React Testing Library
- Accessibility testing
- Form validation testing
- User interaction testing

### API (`/api`)
The API directory contains the backend implementation with:
- RESTful endpoints for reservations and menu items
- Authentication middleware
- Database models and migrations
- Error handling and validation

#### API Endpoints

##### Test Check Endpoint
- `GET /ping`
  - Simple health check endpoint
  - No authentication required
  - Returns: "pong" string
  - Used to verify API server is running

##### Authentication Endpoints
- `POST /register`
  - Creates a new user account
  - Required fields: username, password, name
  - Returns: User object with id, username, and name
  - Sets HTTP-only cookie with JWT token

- `POST /login`
  - Authenticates existing users
  - Required fields: username, password
  - Returns: User object with id, username, and name
  - Sets HTTP-only cookie with JWT token

- `POST /logout`
  - Logs out the current user
  - Clears the authentication cookie
  - Returns: Success message

- `GET /me`
  - Retrieves current user information
  - Requires authentication
  - Returns: User object with id, username, and name

##### Menu Endpoints
- `GET /menu-items`
  - Retrieves all menu items
  - Does not require authentication
  - Returns: Array of menu item objects

##### Reservation Endpoints
- `GET /reservations`
  - Retrieves all reservations for the authenticated user
  - Requires authentication
  - Returns: Array of reservation objects

- `POST /reservations`
  - Creates a new reservation
  - Requires authentication
  - Required fields: date, time, guests, occasion
  - Returns: Created reservation object

- `PUT /reservations/:id`
  - Updates an existing reservation
  - Requires authentication
  - Required fields: date, time, guests, occasion
  - Returns: Updated reservation object

- `DELETE /reservations/:id`
  - Cancels an existing reservation
  - Requires authentication
  - Returns: Success message


##### Error Responses
All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

Error responses include a message field with details about the error.

### CRUD Operations

#### User Management
- **Create**: `POST /register` - Register new users
- **Read**: 
  - `GET /me` - Get current user information
  - `POST /login` - Authenticate existing users
- **Update**: Not implemented (future enhancement)
- **Delete**: Not implemented (future enhancement)
- **Session Management**:
  - `POST /logout` - End user session and clear authentication cookie

#### Reservation Management
- **Create**: `POST /reservations` - Create new reservations
- **Read**: `GET /reservations` - View all user reservations
- **Update**: `PUT /reservations/:id` - Modify existing reservations
- **Delete**: `DELETE /reservations/:id` - Cancel reservations

#### Menu Items
- **Create**: Not implemented (admin feature)
- **Read**: `GET /menu-items` - View all menu items
- **Update**: Not implemented (admin feature)
- **Delete**: Not implemented (admin feature)

Each CRUD operation includes:
- Input validation
- Authentication checks where required
- Error handling
- Appropriate HTTP status codes
- Consistent response formats

### External API Integration

#### Google Maps API
The application integrates with the Google Maps API through the `RestaurantMap` component to provide an interactive map showing the restaurant's location in Chicago, IL. The integration includes:

- Embedded Google Maps iframe
- Responsive container that adapts to different screen sizes
- Custom styling to match the application's design
- Accessibility considerations for screen readers

## Design Decisions

### Responsive Design
The application implements a mobile-first approach with carefully chosen breakpoints:
- Mobile: <768px
- Tablet: ≥768px
- Desktop: ≥1024px
- Large Desktop: ≥1440px

This decision ensures optimal viewing and interaction across all device sizes while maintaining consistent user experience.

### Accessibility
The application prioritizes accessibility through:
- Semantic HTML structure
- ARIA attributes for dynamic content
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Accessibility Reports (`/accessibility_reports`) contains 3 Lighthouse Reports (i.e., PDFs for the About, Home, and Login pages)

### Component Architecture
Components are designed with:
- Single Responsibility Principle
- Reusable patterns
- Consistent prop interfaces
- Clear state management
- Error boundaries

### State Management
The application uses React's built-in state management with:
- Context API for global state
- Custom hooks for reusable logic
- Local state for component-specific data

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Environment Variables
Create `.env` files in both client and api directories:

#### Client `.env`
```
REACT_APP_API_URL=http://localhost:8000
```

#### API `.env`
```
DATABASE_URL=mysql://root:123456@localhost:3306/security
JWT_SECRET=very_long_secret
JWT_REFRESH_SECRET=very_long_secret_for_refresh
```

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install API dependencies
   cd ../api
   npm install
   ```

3. Start the development servers:
   ```bash
   # Start the API server
   cd api
   npm start

   # Start the client server
   cd client
   npm start
   ```

## Testing
Run the test suite:
```bash
cd client
npm test
```

## Future Enhancements
- Online ordering system integration
- Real-time reservation updates
- User profile customization
- Menu item customization options
- Integration with third-party delivery services


