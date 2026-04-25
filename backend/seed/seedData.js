const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://ibtisam097:Mibtisam097@ac-daqqfwy-shard-00-00.s2vetmr.mongodb.net:27017,ac-daqqfwy-shard-00-01.s2vetmr.mongodb.net:27017,ac-daqqfwy-shard-00-02.s2vetmr.mongodb.net:27017/ai-tools-directory?ssl=true&replicaSet=atlas-t6ylnm-shard-0&authSource=admin&retryWrites=true&w=majority';

// Tool Schema
const toolSchema = new mongoose.Schema({
  name: String,
  slug: String,
  website: String,
  category: String,
  pricing: String,
  rating: Number,
  totalReviews: Number,
  featured: Boolean,
  approved: Boolean,
  shortDescription: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

// Category Schema  
const categorySchema = new mongoose.Schema({
  name: String,
  icon: String,
  description: String,
  toolCount: Number
});

const Tool = mongoose.model('Tool', toolSchema);
const Category = mongoose.model('Category', categorySchema);

const categories = [
  { name: "Chatbots", icon: "🤖", description: "AI chatbots and assistants", toolCount: 8 },
  { name: "Image Generation", icon: "🎨", description: "AI image generation tools", toolCount: 4 },
  { name: "Writing", icon: "✍️", description: "AI writing tools", toolCount: 4 },
  { name: "Video", icon: "🎬", description: "AI video tools", toolCount: 3 },
  { name: "Audio", icon: "🎵", description: "AI audio tools", toolCount: 2 },
  { name: "Coding", icon: "💻", description: "AI coding tools", toolCount: 11 },
  { name: "Productivity", icon: "⚡", description: "AI productivity tools", toolCount: 1 },
  { name: "Design", icon: "🖌️", description: "AI design tools", toolCount: 1 },
  { name: "Education", icon: "🎓", description: "AI education tools", toolCount: 10 },
  { name: "Marketing", icon: "📈", description: "AI marketing tools", toolCount: 10 },
  { name: "Healthcare", icon: "🏥", description: "AI healthcare tools", toolCount: 8 },
  { name: "Finance", icon: "💰", description: "AI finance tools", toolCount: 8 },
  { name: "Customer Service", icon: "🎧", description: "AI customer service tools", toolCount: 6 },
  { name: "Music", icon: "🎶", description: "AI music tools", toolCount: 6 },
  { name: "Data Analytics", icon: "📊", description: "AI data tools", toolCount: 6 },
  { name: "HR & Recruiting", icon: "👥", description: "AI HR tools", toolCount: 5 },
  { name: "E-commerce", icon: "🛒", description: "AI ecommerce tools", toolCount: 5 },
  { name: "Social Media", icon: "📱", description: "AI social media tools", toolCount: 5 },
  { name: "Legal", icon: "⚖️", description: "AI legal tools", toolCount: 4 },
  { name: "Real Estate", icon: "🏠", description: "AI real estate tools", toolCount: 4 },
  { name: "Cybersecurity", icon: "🔒", description: "AI security tools", toolCount: 4 },
  { name: "Travel", icon: "✈️", description: "AI travel tools", toolCount: 4 },
  { name: "3D & Animation", icon: "🎮", description: "AI 3D tools", toolCount: 3 },
  { name: "Food & Nutrition", icon: "🍎", description: "AI nutrition tools", toolCount: 2 },
  { name: "Sports & Fitness", icon: "💪", description: "AI fitness tools", toolCount: 2 }
];

const tools = [
  // CHATBOTS
  { name: "ChatGPT", slug: "chatgpt", website: "chat.openai.com", category: "Chatbots", pricing: "Freemium", rating: 4.9, totalReviews: 2000, featured: true, approved: true, shortDescription: "Most popular AI chatbot by OpenAI for writing coding and analysis.", tags: ["chatbot", "writing", "coding", "AI"] },
  { name: "Claude", slug: "claude", website: "claude.ai", category: "Chatbots", pricing: "Freemium", rating: 4.8, totalReviews: 1500, featured: true, approved: true, shortDescription: "Anthropic AI assistant focused on safety helpfulness and honesty.", tags: ["chatbot", "writing", "AI", "safe"] },
  { name: "Gemini", slug: "gemini", website: "gemini.google.com", category: "Chatbots", pricing: "Freemium", rating: 4.6, totalReviews: 1200, featured: true, approved: true, shortDescription: "Google most capable AI for text code images and multimodal tasks.", tags: ["chatbot", "google", "multimodal"] },
  { name: "Perplexity", slug: "perplexity", website: "perplexity.ai", category: "Chatbots", pricing: "Freemium", rating: 4.7, totalReviews: 980, featured: true, approved: true, shortDescription: "AI search engine that provides cited conversational answers.", tags: ["search", "chatbot", "research"] },
  { name: "Microsoft Copilot", slug: "microsoft-copilot", website: "copilot.microsoft.com", category: "Chatbots", pricing: "Freemium", rating: 4.5, totalReviews: 890, featured: false, approved: true, shortDescription: "Microsoft AI assistant powered by GPT-4 for everyday tasks.", tags: ["chatbot", "microsoft", "productivity"] },
  { name: "Meta AI", slug: "meta-ai", website: "meta.ai", category: "Chatbots", pricing: "Free", rating: 4.4, totalReviews: 760, featured: false, approved: true, shortDescription: "Meta free AI assistant across WhatsApp Instagram Facebook.", tags: ["chatbot", "meta", "free"] },
  { name: "Grok AI", slug: "grok-ai", website: "grok.x.ai", category: "Chatbots", pricing: "Freemium", rating: 4.4, totalReviews: 650, featured: false, approved: true, shortDescription: "xAI chatbot with real-time X Twitter data access.", tags: ["chatbot", "xai", "twitter"] },
  { name: "Character AI", slug: "character-ai", website: "character.ai", category: "Chatbots", pricing: "Freemium", rating: 4.5, totalReviews: 1100, featured: false, approved: true, shortDescription: "AI platform for creating and chatting with custom AI characters.", tags: ["chatbot", "characters", "roleplay"] },

  // IMAGE GENERATION
  { name: "Midjourney", slug: "midjourney", website: "midjourney.com", category: "Image Generation", pricing: "Paid", rating: 4.8, totalReviews: 1800, featured: true, approved: true, shortDescription: "Create stunning artistic AI images from text descriptions.", tags: ["image", "art", "generation"] },
  { name: "DALL-E 3", slug: "dall-e-3", website: "openai.com", category: "Image Generation", pricing: "Freemium", rating: 4.7, totalReviews: 1400, featured: true, approved: true, shortDescription: "OpenAI advanced image generation with precise text understanding.", tags: ["image", "openai", "generation"] },
  { name: "Stable Diffusion", slug: "stable-diffusion", website: "stability.ai", category: "Image Generation", pricing: "Free", rating: 4.4, totalReviews: 900, featured: false, approved: true, shortDescription: "Open source AI image generation with full creative control.", tags: ["image", "open-source", "free"] },
  { name: "Adobe Firefly", slug: "adobe-firefly", website: "firefly.adobe.com", category: "Image Generation", pricing: "Freemium", rating: 4.5, totalReviews: 780, featured: false, approved: true, shortDescription: "Adobe AI creative suite for image generation and visual effects.", tags: ["image", "adobe", "creative"] },

  // WRITING
  { name: "Jasper AI", slug: "jasper-ai", website: "jasper.ai", category: "Writing", pricing: "Paid", rating: 4.5, totalReviews: 870, featured: false, approved: true, shortDescription: "AI writing assistant for marketing copy blogs and content.", tags: ["writing", "marketing", "content"] },
  { name: "Copy.ai", slug: "copy-ai", website: "copy.ai", category: "Writing", pricing: "Freemium", rating: 4.4, totalReviews: 720, featured: false, approved: true, shortDescription: "AI copywriting tool for marketing content and business writing.", tags: ["writing", "copywriting", "marketing"] },
  { name: "Grammarly", slug: "grammarly", website: "grammarly.com", category: "Writing", pricing: "Freemium", rating: 4.6, totalReviews: 1600, featured: true, approved: true, shortDescription: "AI writing assistant for grammar spelling and style improvements.", tags: ["writing", "grammar", "editing"] },
  { name: "Writesonic", slug: "writesonic", website: "writesonic.com", category: "Writing", pricing: "Freemium", rating: 4.3, totalReviews: 640, featured: false, approved: true, shortDescription: "AI writer creating SEO blogs ads and marketing content fast.", tags: ["writing", "SEO", "blog"] },

  // VIDEO
  { name: "Runway ML", slug: "runway-ml", website: "runwayml.com", category: "Video", pricing: "Freemium", rating: 4.6, totalReviews: 850, featured: true, approved: true, shortDescription: "AI video generation and editing platform for creators.", tags: ["video", "generation", "editing"] },
  { name: "Synthesia", slug: "synthesia", website: "synthesia.io", category: "Video", pricing: "Paid", rating: 4.5, totalReviews: 720, featured: false, approved: true, shortDescription: "Create professional AI videos with digital avatars in minutes.", tags: ["video", "avatars", "training"] },
  { name: "HeyGen", slug: "heygen", website: "heygen.com", category: "Video", pricing: "Freemium", rating: 4.5, totalReviews: 680, featured: false, approved: true, shortDescription: "AI video generation platform for spokesperson videos.", tags: ["video", "spokesperson", "avatar"] },

  // AUDIO
  { name: "ElevenLabs", slug: "elevenlabs", website: "elevenlabs.io", category: "Audio", pricing: "Freemium", rating: 4.7, totalReviews: 920, featured: true, approved: true, shortDescription: "AI voice synthesis and cloning with ultra-realistic speech.", tags: ["audio", "voice", "text-to-speech"] },
  { name: "Descript", slug: "descript", website: "descript.com", category: "Audio", pricing: "Freemium", rating: 4.4, totalReviews: 610, featured: false, approved: true, shortDescription: "AI audio and video editing with text-based editing platform.", tags: ["audio", "video", "editing"] },

  // CODING
  { name: "GitHub Copilot", slug: "github-copilot", website: "github.com", category: "Coding", pricing: "Paid", rating: 4.7, totalReviews: 1500, featured: true, approved: true, shortDescription: "AI code completion and suggestion tool for developers.", tags: ["coding", "github", "autocomplete"] },
  { name: "Cursor AI", slug: "cursor-ai", website: "cursor.sh", category: "Coding", pricing: "Freemium", rating: 4.8, totalReviews: 980, featured: true, approved: true, shortDescription: "AI code editor built on VS Code with natural language commands.", tags: ["coding", "editor", "AI"] },
  { name: "Tabnine", slug: "tabnine", website: "tabnine.com", category: "Coding", pricing: "Freemium", rating: 4.6, totalReviews: 820, featured: false, approved: true, shortDescription: "AI code completion that learns your coding style.", tags: ["coding", "autocomplete", "IDE"] },
  { name: "Replit AI", slug: "replit-ai", website: "replit.com", category: "Coding", pricing: "Freemium", rating: 4.5, totalReviews: 760, featured: false, approved: true, shortDescription: "AI online coding platform to build and deploy apps in browser.", tags: ["coding", "online", "deployment"] },
  { name: "Snyk AI", slug: "snyk-ai", website: "snyk.io", category: "Coding", pricing: "Freemium", rating: 4.5, totalReviews: 690, featured: false, approved: true, shortDescription: "AI security platform finding and fixing code vulnerabilities.", tags: ["security", "coding", "vulnerabilities"] },
  { name: "CodeWhisperer", slug: "codewhisperer", website: "aws.amazon.com", category: "Coding", pricing: "Freemium", rating: 4.5, totalReviews: 650, featured: false, approved: true, shortDescription: "Amazon AI coding assistant with security scanning built-in.", tags: ["coding", "amazon", "AWS"] },
  { name: "Pieces for Developers", slug: "pieces-for-developers", website: "pieces.app", category: "Coding", pricing: "Freemium", rating: 4.4, totalReviews: 430, featured: false, approved: true, shortDescription: "AI developer tool saving code snippets with smart suggestions.", tags: ["coding", "snippets", "productivity"] },
  { name: "Mintlify", slug: "mintlify", website: "mintlify.com", category: "Coding", pricing: "Freemium", rating: 4.3, totalReviews: 380, featured: false, approved: true, shortDescription: "AI documentation writer auto-generating code docs.", tags: ["documentation", "coding", "writing"] },
  { name: "Sourcegraph Cody", slug: "sourcegraph-cody", website: "sourcegraph.com", category: "Coding", pricing: "Freemium", rating: 4.4, totalReviews: 410, featured: false, approved: true, shortDescription: "AI coding assistant understanding your entire codebase.", tags: ["coding", "search", "codebase"] },
  { name: "Fig AI", slug: "fig-ai", website: "fig.io", category: "Coding", pricing: "Freemium", rating: 4.3, totalReviews: 360, featured: false, approved: true, shortDescription: "AI terminal autocomplete suggesting commands as you type.", tags: ["terminal", "coding", "CLI"] },
  { name: "Vercel AI SDK", slug: "vercel-ai-sdk", website: "vercel.com", category: "Coding", pricing: "Free", rating: 4.6, totalReviews: 520, featured: false, approved: true, shortDescription: "Open source AI toolkit for building AI-powered web apps.", tags: ["coding", "SDK", "web"] },

  // PRODUCTIVITY
  { name: "Notion AI", slug: "notion-ai", website: "notion.so", category: "Productivity", pricing: "Freemium", rating: 4.5, totalReviews: 1100, featured: true, approved: true, shortDescription: "AI workspace for notes docs wikis and project management.", tags: ["productivity", "notes", "docs"] },

  // DESIGN
  { name: "Canva AI", slug: "canva-ai", website: "canva.com", category: "Design", pricing: "Freemium", rating: 4.7, totalReviews: 1700, featured: true, approved: true, shortDescription: "AI graphic design platform for creating stunning visuals easily.", tags: ["design", "graphics", "templates"] },

  // EDUCATION
  { name: "Khanmigo", slug: "khanmigo", website: "khanacademy.org", category: "Education", pricing: "Free", rating: 4.7, totalReviews: 780, featured: false, approved: true, shortDescription: "AI tutor by Khan Academy for math science and coding.", tags: ["education", "tutoring", "math"] },
  { name: "Duolingo Max", slug: "duolingo-max", website: "duolingo.com", category: "Education", pricing: "Freemium", rating: 4.8, totalReviews: 1900, featured: true, approved: true, shortDescription: "AI language learning with GPT-4 roleplay for 40+ languages.", tags: ["language", "learning", "education"] },
  { name: "Socratic by Google", slug: "socratic-google", website: "socratic.org", category: "Education", pricing: "Free", rating: 4.6, totalReviews: 860, featured: false, approved: true, shortDescription: "Google AI homework helper with camera scanner and explanations.", tags: ["homework", "education", "google"] },
  { name: "Quizlet AI", slug: "quizlet-ai", website: "quizlet.com", category: "Education", pricing: "Freemium", rating: 4.5, totalReviews: 1200, featured: false, approved: true, shortDescription: "AI study platform with auto flashcards and practice tests.", tags: ["study", "flashcards", "education"] },
  { name: "Photomath", slug: "photomath", website: "photomath.com", category: "Education", pricing: "Freemium", rating: 4.7, totalReviews: 1400, featured: false, approved: true, shortDescription: "AI math solver scanning problems giving step-by-step solutions.", tags: ["math", "calculator", "education"] },
  { name: "Consensus AI", slug: "consensus-ai", website: "consensus.app", category: "Education", pricing: "Freemium", rating: 4.5, totalReviews: 480, featured: false, approved: true, shortDescription: "AI search engine for scientific research papers and evidence.", tags: ["research", "academic", "science"] },
  { name: "Elicit AI", slug: "elicit-ai", website: "elicit.org", category: "Education", pricing: "Freemium", rating: 4.4, totalReviews: 420, featured: false, approved: true, shortDescription: "AI research assistant finding and summarizing academic papers.", tags: ["research", "papers", "academic"] },
  { name: "Speechify", slug: "speechify", website: "speechify.com", category: "Education", pricing: "Freemium", rating: 4.5, totalReviews: 890, featured: false, approved: true, shortDescription: "AI text-to-speech converting PDFs and text into natural audio.", tags: ["text-to-speech", "reading", "education"] },
  { name: "Coursera AI", slug: "coursera-ai", website: "coursera.org", category: "Education", pricing: "Freemium", rating: 4.6, totalReviews: 1300, featured: false, approved: true, shortDescription: "AI learning platform with university courses and personalized paths.", tags: ["courses", "university", "education"] },
  { name: "Gradescope", slug: "gradescope", website: "gradescope.com", category: "Education", pricing: "Freemium", rating: 4.4, totalReviews: 340, featured: false, approved: true, shortDescription: "AI grading platform automating assignments and student feedback.", tags: ["grading", "teachers", "education"] },

  // MARKETING
  { name: "Semrush AI", slug: "semrush-ai", website: "semrush.com", category: "Marketing", pricing: "Paid", rating: 4.7, totalReviews: 1100, featured: true, approved: true, shortDescription: "All-in-one AI marketing platform for SEO content and analysis.", tags: ["SEO", "marketing", "keywords"] },
  { name: "HubSpot AI", slug: "hubspot-ai", website: "hubspot.com", category: "Marketing", pricing: "Freemium", rating: 4.6, totalReviews: 980, featured: false, approved: true, shortDescription: "AI CRM platform automating email campaigns and lead generation.", tags: ["CRM", "email", "marketing"] },
  { name: "Surfer SEO", slug: "surfer-seo", website: "surferseo.com", category: "Marketing", pricing: "Paid", rating: 4.5, totalReviews: 760, featured: false, approved: true, shortDescription: "AI content optimizer for writing articles that rank on Google.", tags: ["SEO", "content", "marketing"] },
  { name: "AdCreative AI", slug: "adcreative-ai", website: "adcreative.ai", category: "Marketing", pricing: "Paid", rating: 4.4, totalReviews: 580, featured: false, approved: true, shortDescription: "AI ad creative generator for Facebook Google Instagram ads.", tags: ["ads", "marketing", "design"] },
  { name: "Mailchimp AI", slug: "mailchimp-ai", website: "mailchimp.com", category: "Marketing", pricing: "Freemium", rating: 4.5, totalReviews: 1200, featured: false, approved: true, shortDescription: "AI email marketing platform for campaigns automation analytics.", tags: ["email", "marketing", "automation"] },
  { name: "Ahrefs AI", slug: "ahrefs-ai", website: "ahrefs.com", category: "Marketing", pricing: "Paid", rating: 4.7, totalReviews: 940, featured: false, approved: true, shortDescription: "Powerful AI SEO toolset for backlinks keywords competitor research.", tags: ["SEO", "backlinks", "marketing"] },
  { name: "Predis AI", slug: "predis-ai", website: "predis.ai", category: "Marketing", pricing: "Freemium", rating: 4.3, totalReviews: 460, featured: false, approved: true, shortDescription: "AI social media creator for posts reels and carousels.", tags: ["social media", "content", "marketing"] },
  { name: "Hootsuite AI", slug: "hootsuite-ai", website: "hootsuite.com", category: "Marketing", pricing: "Paid", rating: 4.4, totalReviews: 870, featured: false, approved: true, shortDescription: "AI social media management for scheduling posts and analytics.", tags: ["social media", "marketing", "scheduling"] },
  { name: "MarketMuse", slug: "marketmuse", website: "marketmuse.com", category: "Marketing", pricing: "Paid", rating: 4.4, totalReviews: 390, featured: false, approved: true, shortDescription: "AI content strategy platform planning optimizing content.", tags: ["content", "SEO", "marketing"] },
  { name: "Phrasee", slug: "phrasee", website: "phrasee.co", category: "Marketing", pricing: "Paid", rating: 4.3, totalReviews: 310, featured: false, approved: true, shortDescription: "AI copywriting for email subject lines and marketing ad copy.", tags: ["copywriting", "email", "marketing"] },

  // HEALTHCARE
  { name: "Ada Health", slug: "ada-health", website: "ada.com", category: "Healthcare", pricing: "Free", rating: 4.6, totalReviews: 920, featured: false, approved: true, shortDescription: "AI symptom checker helping users understand health and find care.", tags: ["health", "symptoms", "medical"] },
  { name: "Nabla Copilot", slug: "nabla-copilot", website: "nabla.com", category: "Healthcare", pricing: "Paid", rating: 4.7, totalReviews: 430, featured: false, approved: true, shortDescription: "AI medical assistant generating clinical notes from consultations.", tags: ["medical", "doctors", "notes"] },
  { name: "Babylon Health", slug: "babylon-health", website: "babylonhealth.com", category: "Healthcare", pricing: "Freemium", rating: 4.4, totalReviews: 680, featured: false, approved: true, shortDescription: "AI health platform for virtual consultations and monitoring.", tags: ["health", "telemedicine", "wellness"] },
  { name: "Infermedica", slug: "infermedica", website: "infermedica.com", category: "Healthcare", pricing: "Freemium", rating: 4.5, totalReviews: 360, featured: false, approved: true, shortDescription: "AI symptom checker API for smart triage and diagnosis.", tags: ["symptoms", "diagnosis", "medical"] },
  { name: "Glass Health", slug: "glass-health", website: "glass.health", category: "Healthcare", pricing: "Freemium", rating: 4.4, totalReviews: 290, featured: false, approved: true, shortDescription: "AI clinical decision support generating differential diagnoses.", tags: ["diagnosis", "doctors", "clinical"] },
  { name: "Tempus AI", slug: "tempus-ai", website: "tempus.com", category: "Healthcare", pricing: "Paid", rating: 4.6, totalReviews: 380, featured: false, approved: true, shortDescription: "AI precision medicine analyzing genomic data for cancer treatment.", tags: ["cancer", "genomics", "medical"] },
  { name: "Corti AI", slug: "corti-ai", website: "corti.ai", category: "Healthcare", pricing: "Paid", rating: 4.5, totalReviews: 240, featured: false, approved: true, shortDescription: "AI emergency response tool identifying life-threatening conditions.", tags: ["emergency", "medical", "healthcare"] },
  { name: "Wellsaid Labs", slug: "wellsaid-labs", website: "wellsaidlabs.com", category: "Healthcare", pricing: "Paid", rating: 4.4, totalReviews: 310, featured: false, approved: true, shortDescription: "AI voice platform for healthcare training and patient education.", tags: ["voice", "healthcare", "training"] },

  // FINANCE
  { name: "Finchat AI", slug: "finchat-ai", website: "finchat.io", category: "Finance", pricing: "Freemium", rating: 4.5, totalReviews: 420, featured: false, approved: true, shortDescription: "AI financial research tool for stock and company analysis.", tags: ["stocks", "research", "finance"] },
  { name: "Alpaca AI", slug: "alpaca-ai", website: "alpaca.markets", category: "Finance", pricing: "Freemium", rating: 4.5, totalReviews: 390, featured: false, approved: true, shortDescription: "AI trading platform with commission-free algorithmic trading.", tags: ["trading", "stocks", "finance"] },
  { name: "Plaid AI", slug: "plaid-ai", website: "plaid.com", category: "Finance", pricing: "Freemium", rating: 4.6, totalReviews: 560, featured: false, approved: true, shortDescription: "AI financial data platform connecting apps to bank accounts.", tags: ["banking", "finance", "API"] },
  { name: "Magnifi AI", slug: "magnifi-ai", website: "magnifi.com", category: "Finance", pricing: "Freemium", rating: 4.4, totalReviews: 340, featured: false, approved: true, shortDescription: "AI investment assistant for finding and comparing investments.", tags: ["investment", "finance", "funds"] },
  { name: "Kavout AI", slug: "kavout-ai", website: "kavout.com", category: "Finance", pricing: "Paid", rating: 4.4, totalReviews: 280, featured: false, approved: true, shortDescription: "AI investment platform predicting stock market movements.", tags: ["stocks", "investment", "finance"] },
  { name: "Composer AI", slug: "composer-ai", website: "composer.trade", category: "Finance", pricing: "Freemium", rating: 4.3, totalReviews: 250, featured: false, approved: true, shortDescription: "AI investment automation for building trading strategies easily.", tags: ["trading", "automation", "finance"] },
  { name: "Booke AI", slug: "booke-ai", website: "booke.ai", category: "Finance", pricing: "Paid", rating: 4.3, totalReviews: 220, featured: false, approved: true, shortDescription: "AI bookkeeping automation categorizing transactions automatically.", tags: ["bookkeeping", "accounting", "finance"] },
  { name: "Zest AI", slug: "zest-ai", website: "zest.ai", category: "Finance", pricing: "Paid", rating: 4.4, totalReviews: 260, featured: false, approved: true, shortDescription: "AI credit underwriting for better lending decisions.", tags: ["credit", "lending", "finance"] },

  // CUSTOMER SERVICE
  { name: "Intercom AI", slug: "intercom-ai", website: "intercom.com", category: "Customer Service", pricing: "Paid", rating: 4.6, totalReviews: 890, featured: false, approved: true, shortDescription: "AI customer service platform resolving issues automatically 24/7.", tags: ["chatbot", "support", "customer service"] },
  { name: "Zendesk AI", slug: "zendesk-ai", website: "zendesk.com", category: "Customer Service", pricing: "Paid", rating: 4.6, totalReviews: 1100, featured: false, approved: true, shortDescription: "AI customer support automating ticket routing and responses.", tags: ["support", "tickets", "customer service"] },
  { name: "Tidio AI", slug: "tidio-ai", website: "tidio.com", category: "Customer Service", pricing: "Freemium", rating: 4.5, totalReviews: 720, featured: false, approved: true, shortDescription: "AI live chat and chatbot for ecommerce sales automation.", tags: ["chatbot", "ecommerce", "live chat"] },
  { name: "Freshdesk AI", slug: "freshdesk-ai", website: "freshdesk.com", category: "Customer Service", pricing: "Freemium", rating: 4.5, totalReviews: 840, featured: false, approved: true, shortDescription: "AI customer support with automated ticketing and self-service.", tags: ["support", "helpdesk", "tickets"] },
  { name: "Drift AI", slug: "drift-ai", website: "drift.com", category: "Customer Service", pricing: "Paid", rating: 4.4, totalReviews: 620, featured: false, approved: true, shortDescription: "AI conversational marketing platform converting visitors to leads.", tags: ["marketing", "leads", "chatbot"] },
  { name: "Gorgias AI", slug: "gorgias-ai", website: "gorgias.com", category: "Customer Service", pricing: "Paid", rating: 4.5, totalReviews: 540, featured: false, approved: true, shortDescription: "AI helpdesk built for ecommerce automating customer service.", tags: ["ecommerce", "support", "automation"] },

  // MUSIC
  { name: "Suno AI", slug: "suno-ai", website: "suno.ai", category: "Music", pricing: "Freemium", rating: 4.7, totalReviews: 860, featured: true, approved: true, shortDescription: "AI music generator creating complete songs with vocals from text.", tags: ["music", "generation", "songs"] },
  { name: "Udio AI", slug: "udio-ai", website: "udio.com", category: "Music", pricing: "Freemium", rating: 4.6, totalReviews: 640, featured: false, approved: true, shortDescription: "AI music creation platform generating professional tracks.", tags: ["music", "generation", "audio"] },
  { name: "Soundraw AI", slug: "soundraw-ai", website: "soundraw.io", category: "Music", pricing: "Freemium", rating: 4.4, totalReviews: 480, featured: false, approved: true, shortDescription: "AI royalty-free music generator for videos and social media.", tags: ["music", "royalty-free", "content"] },
  { name: "Aiva AI", slug: "aiva-ai", website: "aiva.ai", category: "Music", pricing: "Freemium", rating: 4.4, totalReviews: 420, featured: false, approved: true, shortDescription: "AI music composer creating soundtracks for games films and ads.", tags: ["music", "soundtrack", "composition"] },
  { name: "Beatoven AI", slug: "beatoven-ai", website: "beatoven.ai", category: "Music", pricing: "Freemium", rating: 4.3, totalReviews: 360, featured: false, approved: true, shortDescription: "AI mood-based music creator for content royalty-free.", tags: ["music", "composition", "royalty-free"] },
  { name: "Boomy AI", slug: "boomy-ai", website: "boomy.com", category: "Music", pricing: "Freemium", rating: 4.2, totalReviews: 580, featured: false, approved: true, shortDescription: "AI music platform for creating and releasing original songs.", tags: ["music", "creation", "distribution"] },

  // DATA ANALYTICS
  { name: "Julius AI", slug: "julius-ai", website: "julius.ai", category: "Data Analytics", pricing: "Freemium", rating: 4.6, totalReviews: 480, featured: false, approved: true, shortDescription: "AI data analyst for chatting with data and getting insights.", tags: ["data", "analytics", "charts"] },
  { name: "Obviously AI", slug: "obviously-ai", website: "obviously.ai", category: "Data Analytics", pricing: "Paid", rating: 4.4, totalReviews: 320, featured: false, approved: true, shortDescription: "No-code AI prediction platform building ML models from data.", tags: ["machine learning", "predictions", "data"] },
  { name: "Akkio AI", slug: "akkio-ai", website: "akkio.com", category: "Data Analytics", pricing: "Paid", rating: 4.4, totalReviews: 290, featured: false, approved: true, shortDescription: "AI predictive analytics platform for agencies and businesses.", tags: ["analytics", "predictions", "data"] },
  { name: "Polymer AI", slug: "polymer-ai", website: "polymersearch.com", category: "Data Analytics", pricing: "Freemium", rating: 4.3, totalReviews: 260, featured: false, approved: true, shortDescription: "AI tool transforming spreadsheets into visual dashboards.", tags: ["data", "spreadsheets", "dashboards"] },
  { name: "Rows AI", slug: "rows-ai", website: "rows.com", category: "Data Analytics", pricing: "Freemium", rating: 4.4, totalReviews: 310, featured: false, approved: true, shortDescription: "AI spreadsheet tool analyzing data and generating reports.", tags: ["spreadsheets", "data", "analytics"] },
  { name: "MonkeyLearn AI", slug: "monkeylearn-ai", website: "monkeylearn.com", category: "Data Analytics", pricing: "Freemium", rating: 4.3, totalReviews: 280, featured: false, approved: true, shortDescription: "AI text analysis platform for sentiment and data extraction.", tags: ["text analysis", "data", "NLP"] },

  // HR & RECRUITING
  { name: "Paradox AI", slug: "paradox-ai", website: "paradox.ai", category: "HR & Recruiting", pricing: "Paid", rating: 4.6, totalReviews: 380, featured: false, approved: true, shortDescription: "AI recruiting assistant automating screening scheduling onboarding.", tags: ["recruiting", "HR", "screening"] },
  { name: "Fetcher AI", slug: "fetcher-ai", website: "fetcher.ai", category: "HR & Recruiting", pricing: "Paid", rating: 4.4, totalReviews: 290, featured: false, approved: true, shortDescription: "AI talent sourcing tool finding qualified candidates automatically.", tags: ["recruiting", "sourcing", "HR"] },
  { name: "HireVue AI", slug: "hirevue-ai", website: "hirevue.com", category: "HR & Recruiting", pricing: "Paid", rating: 4.3, totalReviews: 450, featured: false, approved: true, shortDescription: "AI video interviewing platform identifying top talent faster.", tags: ["interviews", "recruiting", "HR"] },
  { name: "Eightfold AI", slug: "eightfold-ai", website: "eightfold.ai", category: "HR & Recruiting", pricing: "Paid", rating: 4.5, totalReviews: 340, featured: false, approved: true, shortDescription: "AI talent intelligence platform matching candidates using deep learning.", tags: ["talent", "recruiting", "HR"] },
  { name: "Leena AI", slug: "leena-ai", website: "leena.ai", category: "HR & Recruiting", pricing: "Paid", rating: 4.4, totalReviews: 280, featured: false, approved: true, shortDescription: "AI HR chatbot answering employee questions automating tasks.", tags: ["HR", "chatbot", "employees"] },

  // E-COMMERCE
  { name: "Shopify Magic", slug: "shopify-magic", website: "shopify.com", category: "E-commerce", pricing: "Freemium", rating: 4.7, totalReviews: 1200, featured: false, approved: true, shortDescription: "AI tools built into Shopify for product descriptions and optimization.", tags: ["ecommerce", "shopify", "products"] },
  { name: "Octane AI", slug: "octane-ai", website: "octaneai.com", category: "E-commerce", pricing: "Paid", rating: 4.4, totalReviews: 360, featured: false, approved: true, shortDescription: "AI quiz platform for Shopify increasing conversions.", tags: ["ecommerce", "quizzes", "personalization"] },
  { name: "Nosto AI", slug: "nosto-ai", website: "nosto.com", category: "E-commerce", pricing: "Paid", rating: 4.4, totalReviews: 310, featured: false, approved: true, shortDescription: "AI ecommerce personalization delivering personalized shopping.", tags: ["ecommerce", "personalization", "recommendations"] },
  { name: "Rebuy AI", slug: "rebuy-ai", website: "rebuyengine.com", category: "E-commerce", pricing: "Paid", rating: 4.4, totalReviews: 290, featured: false, approved: true, shortDescription: "AI personalization engine for Shopify powering upsells.", tags: ["shopify", "upsell", "ecommerce"] },
  { name: "Vue.ai", slug: "vue-ai", website: "vue.ai", category: "E-commerce", pricing: "Paid", rating: 4.5, totalReviews: 280, featured: false, approved: true, shortDescription: "AI retail automation personalizing shopping and catalog.", tags: ["ecommerce", "retail", "personalization"] },

  // SOCIAL MEDIA
  { name: "Buffer AI", slug: "buffer-ai", website: "buffer.com", category: "Social Media", pricing: "Freemium", rating: 4.5, totalReviews: 920, featured: false, approved: true, shortDescription: "AI social media tool scheduling posts with smart analytics.", tags: ["social media", "scheduling", "marketing"] },
  { name: "Later AI", slug: "later-ai", website: "later.com", category: "Social Media", pricing: "Freemium", rating: 4.4, totalReviews: 780, featured: false, approved: true, shortDescription: "AI visual planner for Instagram TikTok with smart suggestions.", tags: ["instagram", "social media", "scheduling"] },
  { name: "Flick AI", slug: "flick-ai", website: "flick.social", category: "Social Media", pricing: "Freemium", rating: 4.3, totalReviews: 420, featured: false, approved: true, shortDescription: "AI assistant generating captions hashtags and content ideas.", tags: ["social media", "captions", "hashtags"] },
  { name: "Lately AI", slug: "lately-ai", website: "lately.ai", category: "Social Media", pricing: "Paid", rating: 4.3, totalReviews: 350, featured: false, approved: true, shortDescription: "AI content generator repurposing long content into social posts.", tags: ["social media", "content", "repurposing"] },
  { name: "Ocoya AI", slug: "ocoya-ai", website: "ocoya.com", category: "Social Media", pricing: "Freemium", rating: 4.3, totalReviews: 310, featured: false, approved: true, shortDescription: "AI social media tool creating and scheduling posts with design.", tags: ["social media", "design", "scheduling"] },

  // LEGAL
  { name: "Harvey AI", slug: "harvey-ai", website: "harvey.ai", category: "Legal", pricing: "Paid", rating: 4.7, totalReviews: 480, featured: false, approved: true, shortDescription: "AI legal assistant drafting contracts and researching case law.", tags: ["legal", "contracts", "law"] },
  { name: "Casetext AI", slug: "casetext-ai", website: "casetext.com", category: "Legal", pricing: "Paid", rating: 4.6, totalReviews: 390, featured: false, approved: true, shortDescription: "AI legal research platform finding relevant case law faster.", tags: ["legal", "research", "law"] },
  { name: "Luminance AI", slug: "luminance-ai", website: "luminance.com", category: "Legal", pricing: "Paid", rating: 4.5, totalReviews: 310, featured: false, approved: true, shortDescription: "AI document review platform for legal teams due diligence.", tags: ["legal", "documents", "contracts"] },
  { name: "DoNotPay AI", slug: "donotpay-ai", website: "donotpay.com", category: "Legal", pricing: "Freemium", rating: 4.3, totalReviews: 560, featured: false, approved: true, shortDescription: "AI robot fighting corporations and solving legal issues.", tags: ["legal", "consumer rights", "disputes"] },

  // REAL ESTATE
  { name: "Skyline AI", slug: "skyline-ai", website: "skyline.ai", category: "Real Estate", pricing: "Paid", rating: 4.4, totalReviews: 280, featured: false, approved: true, shortDescription: "AI real estate investment analyzing properties and markets.", tags: ["real estate", "investment", "property"] },
  { name: "Rex AI", slug: "rex-ai", website: "rexsoftware.com", category: "Real Estate", pricing: "Paid", rating: 4.3, totalReviews: 240, featured: false, approved: true, shortDescription: "AI real estate CRM automating agent workflows and listings.", tags: ["real estate", "CRM", "agents"] },
  { name: "Restb AI", slug: "restb-ai", website: "restb.ai", category: "Real Estate", pricing: "Paid", rating: 4.4, totalReviews: 190, featured: false, approved: true, shortDescription: "AI computer vision tagging and describing property photos.", tags: ["real estate", "photos", "computer vision"] },
  { name: "Likely AI", slug: "likely-ai", website: "likely.ai", category: "Real Estate", pricing: "Paid", rating: 4.3, totalReviews: 210, featured: false, approved: true, shortDescription: "AI predicting homeowners most likely to sell property.", tags: ["real estate", "leads", "prediction"] },

  // CYBERSECURITY
  { name: "Darktrace AI", slug: "darktrace-ai", website: "darktrace.com", category: "Cybersecurity", pricing: "Paid", rating: 4.7, totalReviews: 620, featured: false, approved: true, shortDescription: "AI cybersecurity detecting and responding to threats in real time.", tags: ["cybersecurity", "threats", "security"] },
  { name: "CrowdStrike AI", slug: "crowdstrike-ai", website: "crowdstrike.com", category: "Cybersecurity", pricing: "Paid", rating: 4.7, totalReviews: 780, featured: false, approved: true, shortDescription: "AI endpoint security protecting against malware and ransomware.", tags: ["cybersecurity", "endpoint", "malware"] },
  { name: "Vectra AI", slug: "vectra-ai", website: "vectra.ai", category: "Cybersecurity", pricing: "Paid", rating: 4.5, totalReviews: 340, featured: false, approved: true, shortDescription: "AI network detection stopping cyber attackers in networks.", tags: ["cybersecurity", "network", "detection"] },
  { name: "SentinelOne AI", slug: "sentinelone-ai", website: "sentinelone.com", category: "Cybersecurity", pricing: "Paid", rating: 4.6, totalReviews: 560, featured: false, approved: true, shortDescription: "AI autonomous security platform preventing all cyber threats.", tags: ["cybersecurity", "autonomous", "protection"] },

  // TRAVEL
  { name: "Roam Around AI", slug: "roam-around-ai", website: "roamaround.io", category: "Travel", pricing: "Free", rating: 4.4, totalReviews: 480, featured: false, approved: true, shortDescription: "AI travel planner creating personalized day-by-day itineraries.", tags: ["travel", "itinerary", "planning"] },
  { name: "Layla AI", slug: "layla-ai", website: "uselayla.com", category: "Travel", pricing: "Free", rating: 4.3, totalReviews: 360, featured: false, approved: true, shortDescription: "AI travel assistant planning trips finding hotels and flights.", tags: ["travel", "hotels", "flights"] },
  { name: "Vacay Chatbot", slug: "vacay-chatbot", website: "vacay.io", category: "Travel", pricing: "Free", rating: 4.2, totalReviews: 290, featured: false, approved: true, shortDescription: "AI chatbot providing personalized travel recommendations.", tags: ["travel", "vacation", "chatbot"] },
  { name: "GuideGeek AI", slug: "guidegeek-ai", website: "guidegeek.com", category: "Travel", pricing: "Free", rating: 4.3, totalReviews: 320, featured: false, approved: true, shortDescription: "AI travel guide on WhatsApp providing instant local tips.", tags: ["travel", "guide", "WhatsApp"] },

  // 3D & ANIMATION
  { name: "Spline AI", slug: "spline-ai", website: "spline.design", category: "3D & Animation", pricing: "Freemium", rating: 4.6, totalReviews: 540, featured: false, approved: true, shortDescription: "AI 3D design tool for creating interactive web experiences.", tags: ["3D", "design", "animation", "web"] },
  { name: "Luma AI", slug: "luma-ai", website: "lumalabs.ai", category: "3D & Animation", pricing: "Freemium", rating: 4.5, totalReviews: 460, featured: false, approved: true, shortDescription: "AI creating stunning 3D models from photos and videos.", tags: ["3D", "models", "animation", "photos"] },
  { name: "Cascadeur AI", slug: "cascadeur-ai", website: "cascadeur.com", category: "3D & Animation", pricing: "Freemium", rating: 4.4, totalReviews: 320, featured: false, approved: true, shortDescription: "AI animation software for realistic character animations.", tags: ["animation", "3D", "characters", "motion"] },

  // FOOD & NUTRITION
  { name: "Nutrino AI", slug: "nutrino-ai", website: "nutrino.co", category: "Food & Nutrition", pricing: "Freemium", rating: 4.3, totalReviews: 380, featured: false, approved: true, shortDescription: "AI nutrition platform with personalized meal plans and insights.", tags: ["nutrition", "food", "health", "meal planning"] },
  { name: "Lifesum AI", slug: "lifesum-ai", website: "lifesum.com", category: "Food & Nutrition", pricing: "Freemium", rating: 4.4, totalReviews: 720, featured: false, approved: true, shortDescription: "AI diet and nutrition app tracking food and providing plans.", tags: ["diet", "nutrition", "food", "health"] },

  // SPORTS & FITNESS
  { name: "Whoop AI", slug: "whoop-ai", website: "whoop.com", category: "Sports & Fitness", pricing: "Paid", rating: 4.6, totalReviews: 890, featured: false, approved: true, shortDescription: "AI fitness tracker monitoring recovery strain and sleep.", tags: ["fitness", "sports", "recovery", "health"] },
  { name: "Freeletics AI", slug: "freeletics-ai", website: "freeletics.com", category: "Sports & Fitness", pricing: "Freemium", rating: 4.4, totalReviews: 640, featured: false, approved: true, shortDescription: "AI personal trainer creating personalized adaptive workouts.", tags: ["fitness", "workout", "training", "health"] }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing data...');
    await Tool.deleteMany({});
    await Category.deleteMany({});

    console.log('Seeding categories...');
    await Category.insertMany(categories);
    console.log('Categories seeded:', categories.length);

    console.log('Seeding tools...');
    await Tool.insertMany(tools);
    console.log('Tools seeded:', tools.length);

    console.log('');
    console.log('=== SEEDING COMPLETE ===');
    console.log('Total Tools:', await Tool.countDocuments());
    console.log('Total Categories:', await Category.countDocuments());
    console.log('========================');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
