
<p align="center">
  <img src="logo.svg" alt="Cinezy Logo" width="300">
</p>

# 🎬 Cinezy - Your Ultimate Streaming Platform

Cinezy is a modern, high-performance streaming platform that lets you watch movies, TV shows, and anime for free. Built with React 19, Vite, and styled with Tailwind CSS, it offers a smooth and responsive user experience across all devices.

## ✨ Features

- 🎥 **Multi-source Streaming** - Watch content from 8+ different streaming providers
- 🔍 **Advanced Search** - Find any movie or TV show instantly
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 🎬 **Comprehensive Details** - View cast, trailers, and related content
- ⚡ **Lightning Fast** - Optimized performance with React 19 and Vite
- 🌈 **Beautiful UI** - Modern interface with Tailwind CSS
- 🎞️ **Rich Media Experience** - High-quality video players and trailers
- 🎭 **Browse by Category** - Explore content by genre, popularity, and more
- 📊 **Trending Content** - Stay updated with what's popular

## 🚀 Streaming Sources

Cinezy integrates with multiple streaming providers to ensure you always find a working source:

- VidSrc (Primary)
- Server 1 (vidsrc.to)
- Server 2 (2embed.org)
- GodDrive
- VidSrc.xyz
- VidLink
- 2Embed Stream
- MultiEmbed

<<<<<<< HEAD

=======
>>>>>>> 71d6421 (Initial commit)
## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router v7
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **API**: TMDb API
- **Build Tool**: Vite
- **UI Components**: Custom-built components
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Video Player**: Custom iframe implementation

## 📋 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- TMDb API key (get it from [TMDB](https://www.themoviedb.org/settings/api))

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/its-anya/Cinezy.git
   cd Cinezy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with the following:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://tmdbapi.yourapikey.com/3
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📱 User Guide

### Browsing Content
- The home page displays trending, popular, and top-rated content
- Filter content by movies, TV shows, or anime using the navigation
- Scroll through categories to discover new content

### Searching
- Use the search icon in the header to find specific content
- Results are shown in real-time as you type
- Click on any result to view detailed information

### Watching Content
- Open any movie or TV show details page
- Click the "Watch Now" button to start streaming
- If a stream doesn't work, simply select a different provider
- For TV shows, select the season and episode before watching

### User Experience
- The interface automatically adapts to your device
- Dark theme for comfortable viewing
- Fast navigation between pages

## 🧰 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # UI components
│   └── details/     # Detail page components
├── context/         # React context for state management
├── hooks/           # Custom React hooks
├── pages/           # Main page components
├── services/        # API services and streaming providers
└── utils/           # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Deployment

Cinezy can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Set the build command to `npm run build` and publish directory to `dist`
- **GitHub Pages**: Build locally and push the `dist` folder

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeatureName`)
3. Make your changes and test them thoroughly
4. Commit your changes with a descriptive message (`git commit -m 'Add feature: Description'`) 
5. Push to your branch (`git push origin feature/YourFeatureName`)
6. Open a Pull Request with detailed description of changes
7. Wait for review and address any feedback

Please ensure your code follows the project's style guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie and TV show data
- [Vite](https://vitejs.dev/) for the amazing build tool
- [React](https://reactjs.org/) for the UI library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- All the streaming providers that make this service possible

---

Developed with ❤️ by [Anya](https://github.com/its-anya)

