import { GoogleGenerativeAI } from "@google/generative-ai";
import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY || "");

router.post(
  "/chat",
  asyncHandler(async function getEventData(req: any, res: any) {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // ✅ Use the correct model
    const result = await model.generateContent(message);
    const response = await result.response.text();
    res.json({ reply: response });
  })
);
