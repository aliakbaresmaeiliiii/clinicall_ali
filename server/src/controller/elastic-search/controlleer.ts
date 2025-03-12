import { Client } from "@elastic/elasticsearch";
import { asyncHandler } from "../../helper/async-handler";
import { router } from "../../routes/public";

const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

router.get(
  "/doctors/search",
  asyncHandler(async (req: any, res: any) => {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        message: "Query is required",
      });
    }
    try {
      const { hits } = await esClient.search({
        index: "doctors",
        body: {
          query: {
            match: {
              name: query,
            },
          },
        },
      });
      res.json(hits.hits.map((hit: any) => hit._source));
      return hits;
    } catch (error) {
      console.error("Elasticsearch search error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  })
);
