import axios from "axios";
import { ENV_VARS } from "../config/envVars";

export async function scrapePage(scrapUrl: string) {

    const api_key=ENV_VARS.SCRAPING_DOG_API_KEY;
    const url='https://api.scrapingdog.com/linkedin';

    const content=extractLinkedInId(scrapUrl);

    const params={
        api_key: api_key,
        type: content.type,
        linkId: content.id,
        premium: 'false',
    }

    try
    {
        const response=await axios.get(url,{params:params})
        if(response.status===200)
        {
            const data=response.data;
            console.log(data);
        }
        else
        {
            console.log("error fetching data from scrappingdog");
        }
    }
    catch(error)
    {
        console.log("Errr in scrapePofile function ",error);   
    }
    

}
