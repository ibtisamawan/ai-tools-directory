const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Tool = require('../models/Tool');
const Category = require('../models/Category');

const categories = [
  { name: 'Chatbots', icon: '💬', description: 'AI-powered conversational agents and chatbots' },
  { name: 'Writing', icon: '✍️', description: 'AI tools for content writing and copywriting' },
  { name: 'Image Generation', icon: '🎨', description: 'Create stunning images with AI' },
  { name: 'Video', icon: '🎬', description: 'AI-powered video creation and editing tools' },
  { name: 'Coding', icon: '💻', description: 'AI assistants for software development' },
  { name: 'Audio', icon: '🎵', description: 'AI tools for audio, music, and voice' },
  { name: 'Productivity', icon: '⚡', description: 'Boost your productivity with AI' },
  { name: 'Marketing', icon: '📈', description: 'AI-powered marketing and SEO tools' },
  { name: 'Education', icon: '📚', description: 'AI tools for learning and education' },
  { name: 'Design', icon: '🎯', description: 'AI-powered design and creative tools' }
];

const tools = [
  {
    name: 'ChatGPT', shortDescription: 'Advanced AI chatbot by OpenAI for conversations, writing, coding, and analysis.',
    fullDescription: 'ChatGPT is an advanced AI language model developed by OpenAI. It can engage in natural conversations, help with writing tasks, answer questions, assist with coding, analyze data, and much more. Built on the GPT-4 architecture, ChatGPT understands context and can generate human-like responses across a wide range of topics. It supports plugins, image generation via DALL-E, web browsing, and code interpretation. Whether you need help drafting emails, brainstorming ideas, learning new concepts, or debugging code, ChatGPT is a versatile AI assistant that adapts to your needs.',
    website: 'https://chat.openai.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Chatbots', pricing: 'Freemium', pricingDetails: 'Free tier available. Plus plan at $20/month for GPT-4 access.',
    features: ['Natural language conversations', 'Code generation and debugging', 'Content writing and editing', 'Data analysis', 'Image generation with DALL-E', 'Web browsing capability', 'Custom GPTs'],
    tags: ['chatbot', 'ai', 'writing', 'coding', 'openai'], rating: 4.8, totalReviews: 1250, featured: true, approved: true, views: 5000
  },
  {
    name: 'Claude', shortDescription: 'Anthropic\'s AI assistant focused on safety, helpfulness, and honesty.',
    fullDescription: 'Claude is an AI assistant created by Anthropic, designed to be helpful, harmless, and honest. It excels at thoughtful analysis, creative writing, coding, math, and nuanced conversations. Claude can process long documents up to 200K tokens, making it ideal for analyzing research papers, legal documents, and codebases. With its strong reasoning capabilities and commitment to accuracy, Claude provides well-considered responses while being transparent about its limitations.',
    website: 'https://claude.ai', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
    category: 'Chatbots', pricing: 'Freemium', pricingDetails: 'Free tier available. Pro plan at $20/month.',
    features: ['200K context window', 'Document analysis', 'Code generation', 'Creative writing', 'Mathematical reasoning', 'Vision capabilities', 'API access'],
    tags: ['chatbot', 'ai', 'anthropic', 'analysis', 'writing'], rating: 4.7, totalReviews: 890, featured: true, approved: true, views: 4200
  },
  {
    name: 'Midjourney', shortDescription: 'Create stunning, artistic AI-generated images from text descriptions.',
    fullDescription: 'Midjourney is an AI image generation tool that creates stunning, artistic visuals from text prompts. Known for its exceptional artistic quality and unique aesthetic style, Midjourney has become the go-to tool for artists, designers, and creative professionals. It operates through Discord and offers various parameters to control style, aspect ratio, and quality. With each version update, Midjourney continues to push the boundaries of AI-generated art.',
    website: 'https://midjourney.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    category: 'Image Generation', pricing: 'Paid', pricingDetails: 'Plans start at $10/month for Basic.',
    features: ['Text-to-image generation', 'Artistic style control', 'High-resolution output', 'Variation and upscaling', 'Style parameters', 'Community gallery'],
    tags: ['image', 'art', 'design', 'generation'], rating: 4.9, totalReviews: 2100, featured: true, approved: true, views: 6000
  },
  {
    name: 'DALL-E', shortDescription: 'OpenAI\'s AI system for creating realistic images and art from text descriptions.',
    fullDescription: 'DALL-E is OpenAI\'s AI image generation system that creates realistic images and art from natural language descriptions. DALL-E 3 offers unprecedented accuracy in following prompts, generating images that closely match detailed text descriptions. Integrated into ChatGPT Plus and available via API, it supports editing existing images, generating variations, and creating images in various styles from photorealistic to artistic.',
    website: 'https://openai.com/dall-e-3', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Image Generation', pricing: 'Freemium', pricingDetails: 'Included with ChatGPT Plus ($20/month). API pricing per image.',
    features: ['Text-to-image generation', 'Image editing', 'Style variations', 'High resolution', 'ChatGPT integration', 'API access'],
    tags: ['image', 'generation', 'openai', 'art'], rating: 4.5, totalReviews: 780, featured: false, approved: true, views: 3500
  },
  {
    name: 'GitHub Copilot', shortDescription: 'AI-powered code completion and suggestion tool for developers.',
    fullDescription: 'GitHub Copilot is an AI pair programmer that helps you write code faster. Powered by OpenAI Codex, it suggests whole lines or blocks of code as you type, adapting to your coding style and project context. It supports dozens of programming languages and works within popular IDEs like VS Code, JetBrains, and Neovim. Copilot can generate functions, write tests, explain code, and even help with documentation.',
    website: 'https://github.com/features/copilot', logo: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    category: 'Coding', pricing: 'Paid', pricingDetails: 'Individual: $10/month. Business: $19/user/month.',
    features: ['Code autocompletion', 'Multi-language support', 'IDE integration', 'Code explanation', 'Test generation', 'Chat interface'],
    tags: ['coding', 'developer', 'github', 'ide'], rating: 4.6, totalReviews: 1500, featured: true, approved: true, views: 4800
  },
  {
    name: 'Gemini', shortDescription: 'Google\'s most capable AI model for text, code, images, and multimodal tasks.',
    fullDescription: 'Gemini is Google\'s most capable AI model, designed to be multimodal from the ground up. It can understand and generate text, code, images, audio, and video. Available through Google AI Studio and Vertex AI, Gemini offers different sizes (Ultra, Pro, Nano) for various use cases. It excels at reasoning, coding, creative tasks, and multimodal understanding, making it a versatile AI platform for developers and enterprises.',
    website: 'https://gemini.google.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    category: 'Chatbots', pricing: 'Freemium', pricingDetails: 'Free access available. Advanced plan at $19.99/month.',
    features: ['Multimodal understanding', 'Code generation', 'Image analysis', 'Long context window', 'Google integration', 'API access'],
    tags: ['chatbot', 'google', 'multimodal', 'ai'], rating: 4.5, totalReviews: 650, featured: true, approved: true, views: 3800
  },
  {
    name: 'Jasper', shortDescription: 'AI marketing platform for creating on-brand content at scale.',
    fullDescription: 'Jasper is an AI content creation platform designed for marketing teams. It helps create blog posts, social media content, email campaigns, ad copy, and more while maintaining brand voice consistency. With templates for over 50 content types, Jasper accelerates content production while ensuring quality and brand alignment. It integrates with popular marketing tools and offers collaboration features for teams.',
    website: 'https://jasper.ai', logo: 'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b8635abc30df1_Jasper%20Logo.svg',
    category: 'Writing', pricing: 'Paid', pricingDetails: 'Creator: $49/month. Pro: $69/month. Business: Custom.',
    features: ['Brand voice', 'Content templates', 'Team collaboration', 'SEO optimization', 'Multi-language', 'Campaign workflows'],
    tags: ['writing', 'marketing', 'content', 'copywriting'], rating: 4.3, totalReviews: 420, featured: false, approved: true, views: 2100
  },
  {
    name: 'Copy.ai', shortDescription: 'AI-powered copywriting tool for marketing content and sales copy.',
    fullDescription: 'Copy.ai is an AI copywriting tool that helps businesses create high-converting marketing content. From blog posts and social media captions to email sequences and product descriptions, Copy.ai generates professional copy in seconds. It offers workflow automation for go-to-market teams, integrates with popular tools, and supports multiple languages. The platform is designed to help sales and marketing teams scale their content production efficiently.',
    website: 'https://copy.ai', logo: 'https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/628288c5cd3e844e3d0a36e4_logo.svg',
    category: 'Writing', pricing: 'Freemium', pricingDetails: 'Free plan with 2,000 words/month. Pro: $49/month.',
    features: ['Marketing copy generation', 'Blog writing', 'Email sequences', 'Social media content', 'Multi-language support', 'Workflow automation'],
    tags: ['writing', 'copywriting', 'marketing'], rating: 4.2, totalReviews: 380, featured: false, approved: true, views: 1800
  },
  {
    name: 'Runway ML', shortDescription: 'AI-powered creative suite for video editing, generation, and visual effects.',
    fullDescription: 'Runway ML is an applied AI research company that provides a creative suite for video generation and editing. Their Gen-2 model enables text-to-video and image-to-video generation, while their suite of AI tools helps with video editing, background removal, motion tracking, and visual effects. Runway is used by filmmakers, content creators, and creative professionals to streamline their video production workflows.',
    website: 'https://runwayml.com', logo: 'https://assets-global.website-files.com/611a19b9853b7414a0f6b3f6/611a19b9853b741f8e0f6b71_logo.svg',
    category: 'Video', pricing: 'Freemium', pricingDetails: 'Free tier with limited credits. Standard: $12/month. Pro: $28/month.',
    features: ['Text-to-video generation', 'Video editing', 'Background removal', 'Motion tracking', 'Image generation', 'Visual effects'],
    tags: ['video', 'editing', 'generation', 'creative'], rating: 4.4, totalReviews: 560, featured: false, approved: true, views: 2800
  },
  {
    name: 'ElevenLabs', shortDescription: 'AI voice synthesis and cloning platform with ultra-realistic speech generation.',
    fullDescription: 'ElevenLabs is a leading AI voice technology company that offers text-to-speech, voice cloning, and audio generation. Their technology produces remarkably natural-sounding speech in multiple languages and voices. Used by content creators, game developers, and businesses, ElevenLabs enables high-quality voiceovers, audiobook narration, and real-time voice conversion with unprecedented realism and emotional range.',
    website: 'https://elevenlabs.io', logo: 'https://assets-global.website-files.com/643d3e2be19e1e4e09df9515/643d3e2be19e1e4e09df9533_logo.svg',
    category: 'Audio', pricing: 'Freemium', pricingDetails: 'Free tier with 10,000 chars/month. Starter: $5/month.',
    features: ['Text-to-speech', 'Voice cloning', 'Multi-language support', 'Real-time conversion', 'API access', 'Audio editing'],
    tags: ['audio', 'voice', 'speech', 'tts'], rating: 4.6, totalReviews: 720, featured: true, approved: true, views: 3200
  },
  {
    name: 'Synthesia', shortDescription: 'Create professional AI videos with digital avatars in minutes.',
    fullDescription: 'Synthesia is an AI video generation platform that allows users to create professional videos with AI avatars. With over 150 diverse AI avatars and support for 120+ languages, Synthesia eliminates the need for cameras, actors, and studios. It is used by enterprises for training videos, marketing content, and internal communications. The platform offers customizable templates, brand kits, and collaboration features.',
    website: 'https://synthesia.io', logo: 'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/61dc0796f359b6145bc06ec8_synthesia-logo.svg',
    category: 'Video', pricing: 'Paid', pricingDetails: 'Starter: $22/month. Creator: $67/month. Enterprise: Custom.',
    features: ['AI video avatars', '120+ languages', 'Custom avatars', 'Template library', 'Brand kits', 'Team collaboration'],
    tags: ['video', 'avatar', 'presentation'], rating: 4.3, totalReviews: 340, featured: false, approved: true, views: 1900
  },
  {
    name: 'Notion AI', shortDescription: 'AI assistant integrated into Notion for writing, summarizing, and organizing.',
    fullDescription: 'Notion AI is an AI assistant built directly into the Notion workspace. It helps users write, summarize, brainstorm, edit, and translate content within their existing Notion workflow. From drafting blog posts to summarizing meeting notes, generating action items, and organizing databases, Notion AI enhances productivity without leaving the workspace you already use. It understands the context of your pages and databases for more relevant suggestions.',
    website: 'https://notion.so/product/ai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    category: 'Productivity', pricing: 'Paid', pricingDetails: '$10/member/month add-on to any Notion plan.',
    features: ['Content writing', 'Summarization', 'Translation', 'Brainstorming', 'Action items', 'Database autofill'],
    tags: ['productivity', 'writing', 'workspace', 'notes'], rating: 4.4, totalReviews: 480, featured: false, approved: true, views: 2400
  },
  {
    name: 'Grammarly', shortDescription: 'AI-powered writing assistant for grammar, clarity, and tone optimization.',
    fullDescription: 'Grammarly is an AI-powered writing assistant that helps improve grammar, spelling, punctuation, clarity, engagement, and delivery. It works across platforms including browsers, desktop apps, and mobile keyboards. Grammarly\'s AI analyzes your writing context to provide relevant suggestions, detect tone, and ensure your message is clear and professional. The premium version offers advanced features like full-sentence rewrites, vocabulary enhancement, and plagiarism detection.',
    website: 'https://grammarly.com', logo: 'https://static.grammarly.com/assets/files/cb6ce17d281d15f2c819f5e8c054fe43/grammarly_logo.svg',
    category: 'Writing', pricing: 'Freemium', pricingDetails: 'Free basic plan. Premium: $12/month. Business: $15/member/month.',
    features: ['Grammar checking', 'Tone detection', 'Clarity suggestions', 'Plagiarism detection', 'Browser extension', 'Multi-platform support'],
    tags: ['writing', 'grammar', 'editing', 'proofreading'], rating: 4.5, totalReviews: 2800, featured: false, approved: true, views: 5500
  },
  {
    name: 'Canva AI', shortDescription: 'AI-powered design tools integrated into Canva for effortless visual creation.',
    fullDescription: 'Canva AI brings artificial intelligence capabilities directly into the popular design platform. Features include Magic Design for auto-generating designs, Magic Write for AI-powered text generation, Magic Eraser for removing objects from photos, Text to Image for generating custom visuals, and Magic Edit for AI-powered photo editing. These tools make professional design accessible to everyone, regardless of design experience.',
    website: 'https://canva.com/ai', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
    category: 'Design', pricing: 'Freemium', pricingDetails: 'Free plan available. Pro: $12.99/month. Teams: $14.99/month/person.',
    features: ['Magic Design', 'Magic Write', 'Magic Eraser', 'Text to Image', 'Background Remover', 'Magic Edit'],
    tags: ['design', 'image', 'graphic', 'templates'], rating: 4.6, totalReviews: 1900, featured: false, approved: true, views: 4100
  },
  {
    name: 'Perplexity', shortDescription: 'AI-powered search engine that provides cited, conversational answers.',
    fullDescription: 'Perplexity AI is an AI-powered search engine that provides direct, conversational answers with cited sources. Unlike traditional search engines, Perplexity synthesizes information from multiple sources and presents clear, comprehensive answers with inline citations. It supports follow-up questions, maintaining context throughout a conversation. Pro features include access to advanced models, file analysis, and image generation.',
    website: 'https://perplexity.ai', logo: 'https://assets.website-files.com/6516d05e4a1b6210c0eee5a1/6516d05e4a1b6210c0eee5db_icon.svg',
    category: 'Chatbots', pricing: 'Freemium', pricingDetails: 'Free tier available. Pro: $20/month for unlimited Pro searches.',
    features: ['AI search', 'Source citations', 'Follow-up questions', 'File analysis', 'Collections', 'API access'],
    tags: ['search', 'research', 'chatbot', 'citations'], rating: 4.7, totalReviews: 580, featured: false, approved: true, views: 3100
  },
  {
    name: 'Stable Diffusion', shortDescription: 'Open-source AI image generation model for creating detailed images from text.',
    fullDescription: 'Stable Diffusion is an open-source AI image generation model developed by Stability AI. It enables users to create detailed images from text descriptions and can be run locally on consumer hardware. The model supports various techniques including text-to-image, image-to-image, inpainting, and outpainting. Its open-source nature has led to a vibrant community of developers creating custom models, extensions, and applications.',
    website: 'https://stability.ai', logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/gfxougxjxfqwnswyqgal',
    category: 'Image Generation', pricing: 'Free', pricingDetails: 'Open-source and free. Cloud API pricing varies by provider.',
    features: ['Text-to-image', 'Image-to-image', 'Inpainting', 'Open source', 'Local deployment', 'Community models'],
    tags: ['image', 'generation', 'open-source', 'art'], rating: 4.5, totalReviews: 1200, featured: false, approved: true, views: 3800
  },
  {
    name: 'Sora', shortDescription: 'OpenAI\'s text-to-video model creating realistic and imaginative video scenes.',
    fullDescription: 'Sora is OpenAI\'s groundbreaking text-to-video generation model capable of creating realistic and imaginative video scenes from text descriptions. It can generate videos up to a minute long while maintaining visual quality and adherence to the prompt. Sora understands complex scenes, character interactions, and physical dynamics, representing a significant leap forward in AI video generation technology.',
    website: 'https://openai.com/sora', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Video', pricing: 'Paid', pricingDetails: 'Included with ChatGPT Plus and Pro plans.',
    features: ['Text-to-video generation', 'Up to 1-minute videos', 'High visual quality', 'Scene understanding', 'Multiple styles', 'Character consistency'],
    tags: ['video', 'generation', 'openai'], rating: 4.6, totalReviews: 320, featured: false, approved: true, views: 4500
  },
  {
    name: 'HeyGen', shortDescription: 'AI video generation platform for creating professional spokesperson videos.',
    fullDescription: 'HeyGen is an AI video generation platform that creates professional spokesperson videos. With customizable AI avatars, text-to-speech in 40+ languages, and video templates, HeyGen enables businesses to produce training videos, marketing content, and personalized video messages at scale. It offers features like video translation, avatar creation from photos, and real-time avatar interaction.',
    website: 'https://heygen.com', logo: 'https://assets-global.website-files.com/6480aeaa19a1ae81abc7cfe8/6480aeaa19a1ae81abc7d037_heygen-logo.svg',
    category: 'Video', pricing: 'Freemium', pricingDetails: 'Free tier with 1 credit. Creator: $24/month. Business: $72/month.',
    features: ['AI avatars', '40+ languages', 'Video templates', 'Avatar creation', 'Video translation', 'API integration'],
    tags: ['video', 'avatar', 'marketing'], rating: 4.3, totalReviews: 290, featured: false, approved: true, views: 1600
  },
  {
    name: 'Descript', shortDescription: 'AI-powered audio and video editing platform with text-based editing.',
    fullDescription: 'Descript is a revolutionary audio and video editing platform that enables text-based editing. By transcribing your media, Descript lets you edit audio and video as easily as editing a document. Features include AI-powered transcription, screen recording, filler word removal, studio-quality sound enhancement, and AI voices. It is used by podcasters, video creators, and businesses for content production.',
    website: 'https://descript.com', logo: 'https://assets-global.website-files.com/5fb14170590e4b5143b77750/5fb14170590e4b9693b77766_logo.svg',
    category: 'Audio', pricing: 'Freemium', pricingDetails: 'Free tier available. Pro: $24/month. Business: $40/month.',
    features: ['Text-based editing', 'AI transcription', 'Screen recording', 'Filler word removal', 'AI voices', 'Multi-track editing'],
    tags: ['audio', 'video', 'editing', 'podcast'], rating: 4.5, totalReviews: 610, featured: false, approved: true, views: 2600
  },
  {
    name: 'Adobe Firefly', shortDescription: 'Adobe\'s generative AI models for creative content generation and editing.',
    fullDescription: 'Adobe Firefly is a family of creative generative AI models integrated across Adobe\'s product suite. It enables text-to-image generation, generative fill, text effects, and color generation. Designed with a focus on commercial safety, Firefly is trained on Adobe Stock images, openly licensed content, and public domain content. It is integrated into Photoshop, Illustrator, and other Adobe Creative Cloud apps.',
    website: 'https://firefly.adobe.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
    category: 'Image Generation', pricing: 'Freemium', pricingDetails: 'Free tier with 25 credits/month. Premium with Creative Cloud subscription.',
    features: ['Text-to-image', 'Generative fill', 'Text effects', 'Color generation', 'Adobe integration', 'Commercially safe'],
    tags: ['image', 'design', 'adobe', 'creative'], rating: 4.4, totalReviews: 450, featured: false, approved: true, views: 2200
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Tool.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    await Category.insertMany(categories);
    console.log(`Inserted ${categories.length} categories`);

    // Insert tools
    for (const toolData of tools) {
      const tool = new Tool(toolData);
      await tool.save();
    }
    console.log(`Inserted ${tools.length} tools`);

    // Update category tool counts
    for (const cat of categories) {
      const count = await Tool.countDocuments({ category: cat.name, approved: true });
      await Category.findOneAndUpdate({ name: cat.name }, { toolCount: count });
    }
    console.log('Updated category tool counts');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
