import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose, { get } from "mongoose";    
import { authMiddleware } from "./middleware";
import * as jwt from "jsonwebtoken";
import {userModel, contentModel, LinkModel} from "./DB";
const { GoogleGenerativeAI } = require('@google/generative-ai');
import { random } from "./utils";  
import cors from "cors";
const  app  = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://brainly-fe-one.vercel.app',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
import { CheerioAPI } from "cheerio";
import * as cheerio from 'cheerio';
import Axios from "axios";

console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY,{
    apiVersion : 'v1'
});


 app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;

    await userModel.create({username, password, name , email});
    const user = await userModel.findOne({username, password});
    const userId = user?._id.toString();
    const token = jwt.sign({ userId }, "JEnfke");
    res.json({
        message: "User created successfully",
        token

    });
});

app.post("/api/v1/signin", async (req, res) : Promise<any> => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({ username, password });

    if (! user) {
         return res.status(401).json({
            message: "Invalid username or password"
        });
    }
    const userId = user._id.toString();
    console.log(userId);
    const token = jwt.sign({ userId }, "JEnfke");
    res.json({
        message: "User signed in successfully",
        token
    });
});

app.post("/api/v1/content", authMiddleware, async (req, res) : Promise<any> =>  {
    const { type, link, title, tags } = req.body;

    if (!type || !link || !title) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        //@ts-ignore
        const userId: any = req.user.userId;
        const content = await contentModel.create({ type, link, title, tags, userId });
        res.json({
            message: "Content created successfully",
            content,
        });
        console.log("Content created:", content);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        console.error("Error creating content:", error);
    }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const contents = (await contentModel.find({ userId }).populate("userId", "username"));
        const user = await userModel.findOne({ _id: userId });

        res.json({
            message: "Contents fetched successfully",
            contents,
            username: user?.username
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

app.post("/api/v1/delete", authMiddleware, async (req, res) : Promise<any> => {
    const contentId = req.body.contentId;
    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    try {
        //@ts-ignore
        

        const userId = req.user.userId;
        console.log("Deleting content:", contentId, "for user:", userId);
        const content = await contentModel.findOne({ _id: contentId, userId });
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        await contentModel.deleteOne({ _id: contentId, userId });
        res.json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

 app.post("/api/v1/brain/share", authMiddleware, async (req, res) : Promise<any> => {
    const share = req.body.share;
    // @ts-ignore
    const existing = await LinkModel.findOne({userId: req.user.userId});
    if(existing && share){
        return res.json({
            message: "Share link already exists",
            hash: existing.hash
        })
    }
    if(share){
        
        const hashed = random(10);
        //@ts-ignore
        await LinkModel.create({hash: hashed,  userId: req.user.userId});
        return res.json({
            message: "Share link updated successfully",
            link  : hashed
        });
    }
    else{
        //@ts-ignore
        await LinkModel.deleteOne({userId: req.user.userId});
        return res.json({
            message: "Share link deleted successfully"
        });
    }


 })
 app.get("/api/v1/brain/:shareLink", async (req, res): Promise<any> => {
    try {
      const hash = req.params.shareLink;
      const link = await LinkModel.findOne({ hash });
  
      if (!link) {
        return res.status(411).json({
          message: "Link not found",
        });
      }
  
      const [content, user] = await Promise.all([
        contentModel.find({ userId: link.userId }),
        userModel.findOne({ _id: link.userId }),
      ]);
  
      return res.json({
        message: "Content fetched successfully",
        username: user?.username,
        content,
      });
    }
     catch (error) {
      console.error("Error fetching brain content:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  app.post("/api/v1/brain/summarize", authMiddleware, async (req, res): Promise<any> => {
    const { contentId } = req.body;
    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }
  
    try {
      // @ts-ignore
      const userId = req.user.userId;
  
      console.log("Request received to summarize content:", contentId);
      console.log("Using userId:", userId);
  
      const content = await contentModel.findOne({ _id: contentId, userId });
      console.log("Fetched content:", content);
  
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
  
      const prompt = `
  Summarize the following content in bullet points with key details like if it's a Song or any other type of video. Read its subtitles and provide info like the creator, genre, title, and all the important details and
  provide in a format that is organized as the response will be rendered on the site so please consider the format and give it in a nice way:
  `;
  
      if (content.type === "youtube") {
        const contents = [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                fileData: {
                  mime_type: "video/youtube",
                  file_uri: content.link,
                },
              },
            ],
          },
        ];
  
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent({ contents });
        const summary = await result.response.text();
  
        return res.json({
          message: "Content summarized successfully",
          summary,
        });
      } else if(content.type === "link") {
        async function fetchPageContent(url: string): Promise<string> {
          try {
            const response = await Axios.get<string>(url, {
              timeout: 8000,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.google.com/'
              },
            });
            const html: string = response.data as string;
            const $: CheerioAPI = cheerio.load(html);
  
            let mainContent: string = "";
            const articleBody = $('article, main, .post-content, .entry-content, #content, #main-content').first();
  
            if (articleBody.length > 0) {
              articleBody.find('script, style, nav, footer, header, aside, .sidebar, .ad, .ads, form, img').remove();
              mainContent = articleBody.text();
            } else {
              $('script, style, nav, footer, header, aside, .sidebar, .ad, .ads, form, img').remove();
              mainContent = $('body').text();
            }
  
            let preprocessedText: string = mainContent
              .replace(/[\s\t\n]+/g, ' ')
              .replace(/\s\s+/g, ' ')
              .trim()
              .replace(/(\n\s*){2,}/g, '\n\n');
  
            const MAX_LLM_INPUT_LENGTH = 10000;
            if (preprocessedText.length > MAX_LLM_INPUT_LENGTH) {
              preprocessedText = preprocessedText.substring(0, MAX_LLM_INPUT_LENGTH) + '... [Content truncated]';
            }
  
            return preprocessedText;
          } catch (error) {
            console.error("Error fetching page content:", error);
            return "Error fetching content";
          }
        }
        //@ts-ignore
        console.log("Fetching page content for link:", content.link);
        if (!content.link) {
            return res.status(400).json({ message: "Content link is required" });
        }
        const pageContent = await fetchPageContent(content.link);
  
        if (pageContent === "Error fetching content") {
          return res.status(500).json({ message: "Error fetching content from the link" });
        }
  
        const contents = [
          {
            role: "user",
            parts: [{ text: prompt + pageContent }],
          },
        ];
  
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent({ contents });
        const summary = await result.response.text();
  
        return res.json({
          message: "Content summarized successfully",
          summary,
        });
      }
      else if(content.type === "twitter"){
        return res.json({summary : "We are really sorry but Twitter Summaries are not avilable as of now",
          message: ""
        });
      }

      else {
        if(content.link === undefined || content.link === null || content.link === ""){
          return res.status(400).json({ message: "Content link is required" });
        }
        
      }
    } catch (error) {
      console.error("Error summarizing content:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  });
  
  
 app.listen(3001); 
