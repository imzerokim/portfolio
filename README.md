# Portfolio Website

A professional portfolio website for Nayeong Kim, designed based on a Figma layout.

## Project Structure

```
portfolio-web/
│
├── index.html              # Main HTML page
├── about.html              # About page
│
├── css/
│   ├── styles.css          # Main stylesheet
│   └── about.css           # About page specific styles
│
├── js/
│   └── main.js             # JavaScript functionality
│
├── components/             # Reusable HTML components
│   ├── header.html         # Site header component
│   └── footer.html         # Site footer component
│
├── assets/
│   ├── images/             # Image assets
│   │   ├── dear.jpg
│   │   ├── woogin.jpg
│   │   ├── memorydive.jpg
│   │   ├── mockup.jpg
│   │   ├── ipo.jpg
│   │   ├── watch.jpg
│   │   ├── if-badge.png
│   │   ├── namuh-badge.png
│   │   ├── linkedin.png
│   │   ├── instagram.png
│   │   └── profile-photo.jpg
│   │
│   └── fonts/              # Font assets
│       ├── SuisseIntl-Bold.ttf
│       └── fonnts.com-Suisse_Intl_Regular.ttf
│
└── README.md               # Project documentation
```

## Features

- Responsive design that works on desktop and mobile devices
- Reusable header and footer components
- Modern CSS with variables for consistent styling
- Custom Suisse Intl font integration
- Clean project structure for easy maintenance
- Vanilla JavaScript without dependencies

## GitHub Connection

To connect this project to your GitHub repository:

1. Initialize a Git repository in your local project folder:
   ```bash
   git init
   ```

2. Add all files to the repository:
   ```bash
   git add .
   ```

3. Commit the files:
   ```bash
   git commit -m "Initial portfolio website commit"
   ```

4. Connect to your GitHub repository:
   ```bash
   git remote add origin https://github.com/imzerokim/portfolio.git
   ```

5. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Fonts

This project uses Suisse Intl fonts that are included in the `assets/fonts` directory. The fonts are already set up in the CSS with proper `@font-face` declarations, and no additional steps are needed to use them.

## Customization

### Adding New Projects

To add a new project to the portfolio grid:

1. Add the project image to `assets/images/`
2. Copy and paste a project card in `index.html` and update:
   - Image source
   - Project client name
   - Project title
   - Any badges or special styling

### Updating Header/Footer

The header and footer are stored as separate components for reuse:

- Edit `components/header.html` to update navigation links
- Edit `components/footer.html` to update contact information and social links

## Browser Support

This portfolio website is designed to work in all modern browsers. 