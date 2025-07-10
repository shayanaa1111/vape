# NIMBUS - Replit Project Documentation

## Overview

NIMBUS is a modern, responsive web application with the tagline "Where Passion Meets the Clouds." It's built as a static website with dynamic theming capabilities and a modern user interface featuring a flame-inspired logo and orange-to-gold gradient branding.

The project is configured to run on Replit using a simple Python HTTP server for local development, making it easy to preview and test changes in real-time.

## System Architecture

### Frontend Architecture
- **Static Website**: Built with vanilla HTML, CSS, and JavaScript
- **Component-Based Structure**: Modular JavaScript classes for different UI components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Dynamic light/dark mode switching with persistent user preferences

### Technology Stack
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS custom properties (variables) for theming
- **Vanilla JavaScript**: ES6+ classes and modern JavaScript features
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography
- **Python HTTP Server**: Simple development server for local testing

## Key Components

### 1. Theme Management System
- **ThemeManager Class**: Handles light/dark mode switching
- **Persistent Storage**: User preferences saved in localStorage
- **CSS Variables**: Dynamic color switching using custom properties
- **Toggle Button**: Floating action button for theme switching

### 2. Sidebar Navigation
- **SidebarManager Class**: Controls mobile-friendly slide-out navigation
- **Responsive Design**: Adapts to different screen sizes
- **Overlay System**: Background overlay for mobile navigation
- **Animated Transitions**: Smooth slide animations

### 3. Branding Elements
- **Custom Logo**: SVG flame design with gradient colors
- **Color Scheme**: Orange (#FF6B35) to gold (#F7931E) gradient palette
- **Typography**: Inter font family for modern, clean appearance

### 4. Page Structure
- **Single Page Application**: Content switching handled via JavaScript
- **Navigation System**: Data-driven page routing
- **Social Integration**: Placeholder social media links

## Data Flow

1. **Initialization**: Theme and sidebar managers initialize on page load
2. **User Interaction**: Click events trigger theme changes or navigation
3. **State Management**: Preferences stored in browser localStorage
4. **UI Updates**: Dynamic class and attribute changes update appearance
5. **Persistence**: Settings maintained across browser sessions

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: Icon library from cdnjs.cloudflare.com
- **Google Fonts**: Inter font family
- **No JavaScript Frameworks**: Pure vanilla JavaScript implementation

### Development Dependencies
- **Python 3.11**: For local HTTP server
- **Node.js 20**: Available but not currently utilized

## Deployment Strategy

### Current Setup
- **Local Development**: Python HTTP server on port 5000
- **Replit Integration**: Configured workflows for easy development
- **Static Hosting Ready**: Can be deployed to any static hosting service

### Recommended Deployment Options
- **Netlify**: Automatic deployment from Git repository
- **Vercel**: Zero-configuration static site hosting
- **GitHub Pages**: Direct deployment from repository
- **Traditional Web Hosting**: Upload files to any web server

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 24, 2025. Initial setup

## Notes for Development

### Code Organization
- Keep JavaScript classes modular and focused on single responsibilities
- Use CSS custom properties for easy theme customization
- Maintain semantic HTML structure for accessibility
- Follow mobile-first responsive design principles

### Future Enhancements
- The architecture supports easy addition of new pages and components
- Database integration can be added using Drizzle ORM if backend functionality is needed
- API endpoints can be implemented for dynamic content
- User authentication system can be integrated when required

### Performance Considerations
- Minimal external dependencies for fast loading
- Efficient CSS using custom properties
- Optimized SVG graphics for logos and icons
- Lazy loading can be implemented for future image content