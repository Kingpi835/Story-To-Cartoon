const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('client/build'));

// Function to extract key scenes from story
function extractScenes(story) {
  const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const scenes = [];
  
  // Group sentences into scenes (roughly 2-3 sentences per scene)
  for (let i = 0; i < sentences.length; i += 2) {
    const sceneText = sentences.slice(i, i + 2).join('. ').trim();
    if (sceneText.length > 0) {
      scenes.push(sceneText);
    }
  }
  
  // Limit to 6 scenes for performance
  return scenes.slice(0, 6);
}

// Function to generate prompts for cartoon images
function generateImagePrompts(scenes) {
  return scenes.map((scene, index) => {
    // Create a cartoon-style prompt
    return `cartoon illustration style, colorful, fun, ${scene}. style: animated movie scene`;
  });
}

// Function to generate image using Hugging Face API
async function generateImage(prompt) {
  try {
    const API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
    const HF_TOKEN = process.env.HUGGING_FACE_API_KEY || "hf_placeholder";
    
    // For demo purposes, return a placeholder if no API key
    if (HF_TOKEN === "hf_placeholder") {
      // Return a placeholder image URL (cartoon-style placeholder)
      return `https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt.substring(0, 30))}`;
    }

    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        responseType: 'arraybuffer',
        timeout: 30000
      }
    );

    const base64 = Buffer.from(response.data).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Image generation error:', error.message);
    // Return placeholder on error
    return `https://via.placeholder.com/512x512?text=Image+Error`;
  }
}

// API endpoint to convert story to cartoon
app.post('/api/convert', async (req, res) => {
  try {
    const { story } = req.body;

    if (!story || story.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a story' });
    }

    // Extract scenes from story
    const scenes = extractScenes(story);
    
    if (scenes.length === 0) {
      return res.status(400).json({ error: 'Story too short. Please provide more content.' });
    }

    // Generate image prompts
    const prompts = generateImagePrompts(scenes);

    // Generate images (in parallel for faster processing)
    console.log(`Generating ${prompts.length} cartoon frames...`);
    const images = await Promise.all(
      prompts.map(prompt => generateImage(prompt))
    );

    res.json({
      success: true,
      scenes: scenes,
      images: images,
      totalFrames: images.length
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to convert story. Please try again.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
