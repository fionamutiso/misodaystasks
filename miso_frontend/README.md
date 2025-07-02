# Miso Days Frontend

A beautiful Nuxt 3 to-do list application with a cherry blossom theme, featuring authentication and task management.

## Features

- 🌸 Cherry blossom themed design
- 📱 Responsive layout
- 🔐 Authentication system (Login/Register)
- ✅ Full-featured to-do list management
- 📊 Task statistics and progress tracking
- 💾 Local storage for data persistence
- ⚡ Fast and modern UI with Tailwind CSS
- 🎨 Beautiful animations and transitions
- 🔄 Ready for Laravel backend integration

## Pages

- **Home** (`/`) - Landing page with "Get Started" button
- **Login** (`/auth/login`) - User authentication
- **Register** (`/auth/register`) - User registration
- **Dashboard** (`/dashboard`) - To-do list management

## Tech Stack

- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **UI**: Vue 3 Composition API

## Project Structure

```
miso_frontend/
├── components/          # Reusable Vue components
│   └── LoadingSpinner.vue
├── composables/         # Nuxt composables
│   ├── useApi.ts       # API communication
│   └── useAuth.ts      # Authentication management
├── layouts/            # Layout components
│   └── default.vue
├── middleware/         # Route middleware
│   └── auth.ts
├── pages/              # Application pages
│   ├── index.vue       # Home page
│   ├── dashboard.vue   # To-do list dashboard
│   └── auth/           # Authentication pages
│       ├── login.vue   # Login page
│       └── register.vue # Register page
├── assets/             # Static assets
├── error.vue           # Error page
└── nuxt.config.ts      # Nuxt configuration
```

## To-Do List Features

The application includes a complete to-do list system:

- ✅ Add new tasks with beautiful forms
- 🔄 Mark tasks as complete/incomplete
- 🗑️ Delete tasks with confirmation
- 📊 Real-time statistics (total, completed, pending)
- 💾 Local storage persistence
- 📅 Task creation timestamps
- 🎨 Cherry blossom themed UI

## Backend Integration

The frontend is prepared for Laravel backend integration with:

- API composable (`useApi`) for HTTP requests
- Sanctum authentication support
- CSRF token handling
- Environment-based API configuration
- Authentication state management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Customization

The cherry blossom theme can be customized by modifying:

- Color palette in Tailwind classes
- Petal animations in page styles
- Gradient backgrounds
- Component styling




