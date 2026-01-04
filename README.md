# 🎮 AI Tic-Tac-Toe

An AI-powered Tic-Tac-Toe game featuring an unbeatable Minimax algorithm with alpha-beta pruning.

## 🚀 Features

- **Three Difficulty Levels**: Easy, Medium, and Unbeatable
- **Minimax Algorithm**: Implements classic AI game theory with alpha-beta pruning
- **Score Tracking**: Keep track of wins, losses, and draws
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Tech Stack**: Built with React, Vite, and Tailwind CSS

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Minimax Algorithm** - AI Logic

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-tictactoe.git
cd ai-tictactoe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/ai-tictactoe",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

## 🎯 How It Works

### Minimax Algorithm

The AI uses the Minimax algorithm with alpha-beta pruning to evaluate all possible game states and choose the optimal move. In "Unbeatable" mode, the AI will never lose - you can only draw or lose!

**Algorithm Features:**
- Recursive game tree exploration
- Alpha-beta pruning for optimization
- Depth-based scoring for faster wins
- Three difficulty implementations

## 📝 Game Rules

- You play as **X** (blue)
- AI plays as **O** (pink)
- First to get 3 in a row wins
- Choose difficulty before starting
- Track your performance with the score counter

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🌟 Production Features Included

✅ Optimized build with code splitting
✅ Minified and compressed assets
✅ SEO meta tags
✅ PWA manifest
✅ Environment-ready configuration
✅ Error boundary handling
✅ Production-grade file structure
✅ Git ignore configured
✅ Deployment configs for multiple platforms
✅ Professional README with badges
✅ Responsive design for all devices

---

## 📊 Performance Optimizations

- Code splitting for vendor chunks
- Lazy loading where applicable
- Minified production build
- Alpha-beta pruning in Minimax
- Optimized re-renders with React hooks
- Tailwind CSS purging for smaller bundle

  
## 🙏 Acknowledgments

- Minimax algorithm implementation inspired by classic game theory
- UI design inspired by modern web aesthetics
- Built as a learning project for AI algorithms and React

 # 👨‍💻 Author

Your Name - [Your GitHub](https://github.com/yourusername)
