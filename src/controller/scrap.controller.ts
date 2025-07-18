import { Request,Response } from "express";
import { detectScrapeType } from "../utils/detectScrapType";
import { scrapePage } from "../scraper/pageScrapper";
import { scrapeSearchResults } from "../scraper/searchScraper";

export async function handleScrape(req:Request, res:Response) {
  const { url,job,place } = req.body;

  const type = detectScrapeType(url);
  try {
    let data;
    switch (type) {
      case "profile":
        data = await scrapePage(url);
        break;
      case "company":
        data = await scrapePage(url);
        break;
      case "search":
        data = await scrapeSearchResults(job,place);
        break;
      default:
        res.status(400).json({ sucess:false,message:"Can't find the appropriate handler", error: "Unsupported LinkedIn URL." });
        return;
    }

    res.json({ type, data });
  } 
  catch (error) 
  {
    res.status(500).json({ success:false, message:"Error in handleScrape function", error:error});
  }
}
