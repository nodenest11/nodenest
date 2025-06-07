# NodeNest - Modern Web Development Solutions

A modern, responsive website for web development services, built with Next.js and TailwindCSS.

## Features

- Responsive design for all devices
- Dark and light mode support
- Modern UI with animations and transitions
- SEO optimized
- Fast performance
- Error handling and boundary protection
- Firebase integration for dynamic content

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account (for dynamic content)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nodenest.git
cd nodenest
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Firebase configuration.

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build:prod
npm run start:prod
```

## Project Structure

- `/src/app` - Next.js app pages and layouts
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and Firebase integration
- `/public` - Static assets

## Error Handling

The project includes comprehensive error handling:
- Client-side error boundaries
- Custom 404 page
- Server error page
- Loading states

## Performance Optimization

- Optimized images
- Code splitting
- Efficient bundling
- Proper caching strategies

## License

This project is licensed under the MIT License - see the LICENSE file for details.
