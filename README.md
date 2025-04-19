# Rahul's Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, and Framer Motion. This portfolio showcases my skills, projects, and provides a way for visitors to get in touch.

## 🚀 Features

- **Modern UI/UX**: Clean and professional design with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Interactive Sections**:
  - About Me
  - Projects Showcase
  - Skills Display
  - Contact Form
- **Email Integration**: Contact form connected with EmailJS
- **Downloadable Resume**: Easy access to my professional resume
- **Social Links**: Quick access to my professional profiles

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email Service**: EmailJS
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🔧 Configuration

### Email Setup
1. Sign up for [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail recommended)
3. Create an email template
4. Update the following in `src/App.jsx`:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'your_public_key'
   const EMAILJS_SERVICE_ID = 'your_service_id'
   const EMAILJS_TEMPLATE_ID = 'your_template_id'
   ```

### Resume Setup
1. Place your resume PDF file in the `public` folder
2. Name it `RAHULResume.pdf`

## 🎨 Customization

### Colors
The color scheme can be customized in the Tailwind configuration:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your_color',
        secondary: '#your_color',
        accent: '#your_color',
      }
    }
  }
}
```

### Content
Update the following in `src/App.jsx`:
- Personal information
- Projects
- Skills
- Social media links
- Contact information

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop computers
- Large screens

## 🔍 SEO Optimization

- Semantic HTML structure
- Proper meta tags
- Optimized images
- Mobile-friendly design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Rahul Yadagiri
- GitHub: [@rahuldoty](https://github.com/rahuldoty)
- LinkedIn: [@rahuly](https://linkedin.com/in/rahuly)
- Twitter: [@rahuldoty](https://twitter.com/rahuldoty)
- Email: rahuldoty@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [EmailJS](https://www.emailjs.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
