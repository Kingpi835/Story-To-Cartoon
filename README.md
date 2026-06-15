# 🎬 Story to Cartoon

A fun web application that converts your stories into animated cartoon scenes! Share your creative stories and watch them come to life with AI-generated cartoon illustrations.

## Features

✨ **Easy to Use** - Simply paste your story and click convert
🎨 **AI-Generated Cartoons** - Beautiful cartoon illustrations powered by AI
📱 **Responsive Design** - Works on desktop, tablet, and mobile
🔗 **Shareable** - Share the app link with family and friends
🚀 **Fast Processing** - Get your cartoon in seconds

## How It Works

1. Write or paste your story
2. Click "Convert to Cartoon"
3. The app breaks your story into scenes
4. AI generates cartoon images for each scene
5. View your cartoon story as a comic strip!

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Kingpi835/story-to-cartoon.git
cd story-to-cartoon
```

2. **Install backend dependencies:**
```bash
npm install
```

3. **Install frontend dependencies:**
```bash
cd client
npm install
cd ..
```

4. **Create a `.env` file** (optional, for better image quality):
```bash
cp .env.example .env
```

5. **Get a free Hugging Face API key** (optional):
   - Sign up at https://huggingface.co
   - Go to Settings > Access Tokens
   - Create a new token with "read" permissions
   - Add it to your `.env` file:
   ```
   HUGGING_FACE_API_KEY=your_token_here
   ```

### Running Locally

**Development mode (runs backend and frontend separately):**

Terminal 1 - Backend:
```bash
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

Open http://localhost:3000 in your browser

**Production mode:**
```bash
cd client
npm run build
cd ..
npm start
```

Then open http://localhost:5000

## Deployment

### Option 1: Deploy to Render (Free, Recommended)

1. Push your code to GitHub
2. Go to https://render.com
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Set Build Command: `npm install && cd client && npm run build && cd ..`
6. Set Start Command: `npm start`
7. Add environment variables (if using Hugging Face API)
8. Click "Create Web Service"

Your app will be live at `https://your-app-name.onrender.com`

### Option 2: Deploy to Vercel

1. Push to GitHub
2. Go to https://vercel.com
3. Click "New Project" and import your repository
4. Vercel will auto-detect the setup
5. Deploy!

### Option 3: Deploy to Heroku (Paid)

```bash
heroku create your-app-name
heroku config:set HUGGING_FACE_API_KEY=your_token
git push heroku main
```

## Sharing with Family & Friends

Once deployed:
1. Copy your app's URL
2. Send it to family and friends
3. They can use it without installing anything!
4. No login required - just open the link and start creating

## API Endpoints

### POST /api/convert
Converts a story to cartoon scenes

**Request:**
```json
{
  "story": "Your story text here..."
}
```

**Response:**
```json
{
  "success": true,
  "scenes": ["Scene 1 text", "Scene 2 text", ...],
  "images": ["image_url_1", "image_url_2", ...],
  "totalFrames": 6
}
```

## Troubleshooting

**Images not generating?**
- The app works without an API key using placeholder images
- For real cartoon images, get a free Hugging Face API key
- Check that your `.env` file has the correct key

**Port already in use?**
```bash
# On macOS/Linux
lsof -i :5000
kill -9 <PID>

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Slow image generation?**
- This is normal on first requests (cold start)
- Subsequent requests will be faster
- Consider upgrading to paid tier if frequently used

## Technology Stack

- **Frontend:** React, Axios, CSS3
- **Backend:** Node.js, Express, Cors
- **Image Generation:** Hugging Face Inference API (Stable Diffusion)
- **Deployment:** Render, Vercel, or Railway

## License

MIT

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Open an issue on GitHub
3. Contact the developer

---

Made with ❤️ for storytellers everywhere
