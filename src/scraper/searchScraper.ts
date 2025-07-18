import axios from "axios";
import { ENV_VARS } from "../config/envVars";

export async function scrapeSearchResults(job:string,place:string) {

    const api_key=ENV_VARS.SCRAPING_DOG_API_KEY;
    const url='https://api.scrapingdog.com/linkedinjobs/';

    const params = {
        api_key: api_key,
        "field": job,
        "geoid": "",
        "location": place,
        "page": 1,
        "sort_by":"" ,
        "job_type":"" ,
        "exp_level":"" ,
        "work_type": "",
        "filter_by_company":"", 
    };

    try
    {
        const response=await axios.get(url,{params:params})
        if(response.status===200)
        {
            const data=response.data;
            console.log(data);
            //save the data in the vector database
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