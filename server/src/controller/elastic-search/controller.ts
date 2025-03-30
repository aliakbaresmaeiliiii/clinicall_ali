import axios from "axios";
import { asyncHandler } from "../../helper/async-handler";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { searchDoctors } from "../../scripts/syncDoctors";

router.get(
  "/doctors/search",
  asyncHandler(async (req: any, res: any) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const resultSearch = await searchDoctors(query);

    if (resultSearch?.hits?.hits?.length > 0) {
      const buildResponse = BuildResponse.get(resultSearch);
      return res.status(buildResponse.code).json(buildResponse);
    } else {
      console.log("🔍 No results in Elasticsearch, calling Gemini Chat...");
      
      // ✅ درخواست به `/chat` ارسال شود
      try {
        const chatResponse = await axios.post("http://localhost:8080/chat", { message: query });
        return res.json(chatResponse.data);
      } catch (error) {
        console.error("❌ Error calling Gemini Chat API:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  })
);
