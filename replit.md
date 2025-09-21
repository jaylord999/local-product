# Local Product Finder

## Overview

The Local Product Finder is a full-stack web application designed to help users discover local products and stores in Bohol, Philippines through interactive map and list views. The application enables users to search for products by category, filter by price range, and view store locations with detailed product information. Built with a modern React frontend and Express backend, it provides a seamless experience for location-based product discovery similar to Airbnb's local discovery interface and Google Maps' business listings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Styling**: Tailwind CSS with a custom design system based on shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Map Integration**: Leaflet.js with OpenStreetMap for interactive map functionality
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for end-to-end type safety
- **API Design**: RESTful API with organized route handlers
- **Development**: Hot module replacement with Vite integration for seamless development

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Design**: Two main entities - stores and products with proper relationships
- **Connection**: Neon serverless driver for scalable database connections

### Component Architecture
- **Design System**: shadcn/ui component library with custom Bohol-inspired theming
- **View Management**: Toggle between Map and List views with persistent user preferences
- **Interactive Features**: Synchronized store selection between map pins and list items
- **Search & Filtering**: Real-time filtering by category, search terms, and price ranges
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Key Features Implementation
- **Geolocation**: Browser geolocation API for distance calculations and user positioning
- **Map Interactivity**: Custom store markers with popups showing store details and product previews
- **Real-time Search**: Debounced search with category and price range filtering
- **Image Handling**: External image URLs for store logos and product thumbnails
- **Theme Support**: Light/dark mode toggle with system preference detection

### Performance Optimizations
- **Query Caching**: TanStack Query for intelligent data caching and background updates
- **Image Optimization**: Responsive images with proper sizing and loading strategies
- **Bundle Optimization**: Vite's tree-shaking and code splitting for optimal load times
- **Database Queries**: Efficient filtering and aggregation at the database level

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **Drizzle ORM**: Type-safe database operations with migration support
- **Leaflet.js**: Open-source mapping library for interactive map functionality
- **OpenStreetMap**: Free map tiles and geographical data

### UI and Styling
- **Radix UI**: Headless component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Consistent icon library for UI elements
- **Google Fonts**: Inter font family for clean, modern typography

### Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **Vite**: Fast build tool with hot module replacement
- **ESBuild**: Fast JavaScript bundler for production builds
- **React Hook Form**: Efficient form handling with validation

### Image and Media
- **Unsplash**: External image URLs for store logos and product thumbnails
- **Image Optimization**: Responsive image sizing with proper aspect ratios

### Deployment and Runtime
- **Replit**: Development and hosting platform integration
- **Express.js**: Web application framework for API endpoints
- **Session Management**: Connect-pg-simple for PostgreSQL session storage