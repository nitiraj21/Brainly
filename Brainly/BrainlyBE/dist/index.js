"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const middleware_1 = require("./middleware");
const jwt = __importStar(require("jsonwebtoken"));
const DB_1 = require("./DB");
const { GoogleGenerativeAI } = require('@google/generative-ai');
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const cheerio = __importStar(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
    apiVersion: 'v1'
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    yield DB_1.userModel.create({ username, password, name, email });
    const user = yield DB_1.userModel.findOne({ username, password });
    const userId = user === null || user === void 0 ? void 0 : user._id.toString();
    const token = jwt.sign({ userId }, "JEnfke");
    res.json({
        message: "User created successfully",
        token
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield DB_1.userModel.findOne({ username, password });
    if (!user) {
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
}));
app.post("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title, tags } = req.body;
    if (!type || !link || !title) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const content = yield DB_1.contentModel.create({ type, link, title, tags, userId });
        res.json({
            message: "Content created successfully",
            content,
        });
        console.log("Content created:", content);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
        console.error("Error creating content:", error);
    }
}));
app.get("/api/v1/content", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.user.userId;
        const contents = (yield DB_1.contentModel.find({ userId }).populate("userId", "username"));
        const user = yield DB_1.userModel.findOne({ _id: userId });
        res.json({
            message: "Contents fetched successfully",
            contents,
            username: user === null || user === void 0 ? void 0 : user.username
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}));
app.post("/api/v1/delete", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    try {
        //@ts-ignore
        const userId = req.user.userId;
        console.log("Deleting content:", contentId, "for user:", userId);
        const content = yield DB_1.contentModel.findOne({ _id: contentId, userId });
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        yield DB_1.contentModel.deleteOne({ _id: contentId, userId });
        res.json({
            message: "Content deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}));
app.post("/api/v1/brain/share", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    // @ts-ignore
    const existing = yield DB_1.LinkModel.findOne({ userId: req.user.userId });
    if (existing && share) {
        return res.json({
            message: "Share link already exists",
            hash: existing.hash
        });
    }
    if (share) {
        const hashed = (0, utils_1.random)(10);
        //@ts-ignore
        yield DB_1.LinkModel.create({ hash: hashed, userId: req.user.userId });
        return res.json({
            message: "Share link updated successfully",
            link: hashed
        });
    }
    else {
        //@ts-ignore
        yield DB_1.LinkModel.deleteOne({ userId: req.user.userId });
        return res.json({
            message: "Share link deleted successfully"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const link = yield DB_1.LinkModel.findOne({ hash });
        if (!link) {
            return res.status(411).json({
                message: "Link not found",
            });
        }
        const [content, user] = yield Promise.all([
            DB_1.contentModel.find({ userId: link.userId }),
            DB_1.userModel.findOne({ _id: link.userId }),
        ]);
        return res.json({
            message: "Content fetched successfully",
            username: user === null || user === void 0 ? void 0 : user.username,
            content,
        });
    }
    catch (error) {
        console.error("Error fetching brain content:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post("/api/v1/brain/summarize", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    if (!contentId) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    try {
        // @ts-ignore
        const userId = req.user.userId;
        console.log("Request received to summarize content:", contentId);
        console.log("Using userId:", userId);
        const content = yield DB_1.contentModel.findOne({ _id: contentId, userId });
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
            const result = yield model.generateContent({ contents });
            const summary = yield result.response.text();
            return res.json({
                message: "Content summarized successfully",
                summary,
            });
        }
        else if (content.type === "link") {
            function fetchPageContent(url) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const response = yield axios_1.default.get(url, {
                            timeout: 8000,
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                                'Accept-Language': 'en-US,en;q=0.5',
                                'Referer': 'https://www.google.com/'
                            },
                        });
                        const html = response.data;
                        const $ = cheerio.load(html);
                        let mainContent = "";
                        const articleBody = $('article, main, .post-content, .entry-content, #content, #main-content').first();
                        if (articleBody.length > 0) {
                            articleBody.find('script, style, nav, footer, header, aside, .sidebar, .ad, .ads, form, img').remove();
                            mainContent = articleBody.text();
                        }
                        else {
                            $('script, style, nav, footer, header, aside, .sidebar, .ad, .ads, form, img').remove();
                            mainContent = $('body').text();
                        }
                        let preprocessedText = mainContent
                            .replace(/[\s\t\n]+/g, ' ')
                            .replace(/\s\s+/g, ' ')
                            .trim()
                            .replace(/(\n\s*){2,}/g, '\n\n');
                        const MAX_LLM_INPUT_LENGTH = 10000;
                        if (preprocessedText.length > MAX_LLM_INPUT_LENGTH) {
                            preprocessedText = preprocessedText.substring(0, MAX_LLM_INPUT_LENGTH) + '... [Content truncated]';
                        }
                        return preprocessedText;
                    }
                    catch (error) {
                        console.error("Error fetching page content:", error);
                        return "Error fetching content";
                    }
                });
            }
            //@ts-ignore
            console.log("Fetching page content for link:", content.link);
            if (!content.link) {
                return res.status(400).json({ message: "Content link is required" });
            }
            const pageContent = yield fetchPageContent(content.link);
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
            const result = yield model.generateContent({ contents });
            const summary = yield result.response.text();
            return res.json({
                message: "Content summarized successfully",
                summary,
            });
        }
        else if (content.type === "twitter") {
            return res.json({ summary: "We are really sorry but Twitter Summaries are not avilable as of now",
                message: ""
            });
        }
        else {
            if (content.link === undefined || content.link === null || content.link === "") {
                return res.status(400).json({ message: "Content link is required" });
            }
        }
    }
    catch (error) {
        console.error("Error summarizing content:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}));
app.listen(3001);
