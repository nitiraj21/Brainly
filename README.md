# 🧠 Brainly – AI-Powered Knowledge Manager

Brainly is a full-stack web application designed to help users **save, organize, summarize, and share web knowledge** effortlessly. From YouTube videos to articles and news — Brainly acts as your personal second brain powered by AI.

---

## 🔗 Live Demo

🌐 [Visit Brainly](https://brainly-fe-one.vercel.app)

---

## 🚀 Features

- ✅ **Save and manage content**: Add and categorize useful web content (YouTube, articles, tweets, etc.)
- 🧠 **AI-Powered Summarization**: Auto-summarizes YouTube videos and web pages using **Gemini API**
- 🔗 **Public Link Sharing**: Share any saved item with friends using a unique public link
- 🧽 **Clean UI & UX**: Built with Tailwind CSS for a minimal and responsive experience
- 🔍 **Web scraping with Cheerio** for standard websites
- 🛡️ **Authentication** and user-based storage

---

## 🛠️ Tech Stack

**Frontend**  
- React  
- TypeScript  
- Tailwind CSS

**Backend**  
- Node.js  
- Express.js  
- Gemini API (for summarization)  
- Cheerio (for scraping web content)  
- MongoDB + Mongoose

---

## 🧑‍💻 How It Works

1. User logs in and saves a link (YouTube, article, tweet, etc.)
2. Backend processes the link:
   - YouTube → Gemini summarizes transcript
   - Website → Cheerio scrapes content → Gemini summarizes
   - Tweets → Save your Favourate tweets
3. Users can view, search, or **share** any saved item via public link

---

## 📸 Screenshots



---

## 🧪 Local Setup

```bash
# Clone the repo
git clone https://github.com/nitiraj21/Brainly.git
cd Brainly

# Install frontend
cd BrainlyFE
npm install
npm run dev

# Install backend
cd ../BrainlyBE
npm install
npm run dev
