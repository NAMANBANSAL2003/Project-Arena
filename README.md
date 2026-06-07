# Car Racing Project Arena

A modern React frontend dashboard showcasing a car racing project management system with multiple project modules.

## Features

- **Modern UI Design** - Sleek dark theme with gradient colors
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Interactive Components** - Hover animations and smooth transitions
- **Sidebar Navigation** - Quick access with icon-based menu
- **Project Cards** - Beautiful project management cards with distinct colors
- **Mobile Optimized** - Adapts perfectly to different screen sizes

## Project Structure

```
src/
├── index.js          # React entry point
├── index.css         # Global styles
├── App.js            # Main component
└── App.css           # App styles
public/
└── index.html        # HTML template
package.json          # Project dependencies
```

## Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload when you make changes.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## Installation

1. Navigate to the project directory:
```bash
cd "d:\Fullstack\Project Arena"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and go to `http://localhost:3000`

## Project Cards

- **Website** - Main website project management
- **AI Dashboard** - Artificial intelligence dashboard module
- **Task Manager** - Task and project tracking system
- **E-Commerce** - E-commerce platform management

Each card is clickable and leads to the respective project.

## Customization

### Modifying Colors
Edit the gradient colors in `src/App.css` in the `.website-card`, `.ai-dashboard-card`, `.task-manager-card`, and `.ecommerce-card` classes.

### Adding New Projects
Edit the `projects` state array in `src/App.js` to add more project cards.

### Changing Sidebar Icons
Modify the `sidebarIcons` array in `src/App.js` to use different emoji or icon characters.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **React 18** - UI framework
- **CSS 3** - Styling and animations
- **Node.js** - Runtime environment

## License

This project is open source and available under the MIT License.
