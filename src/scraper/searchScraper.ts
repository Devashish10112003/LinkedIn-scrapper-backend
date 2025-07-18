import axios from "axios";
import { ENV_VARS } from "../config/envVars";
import { embedAndStoreContent,getVectorStore } from "../utils/vectorStore";

type JobListing = {
  job_position: string;
  job_link: string;
  job_id: string;
  company_name: string;
  company_profile: string;
  job_location: string;
  job_posting_date: string;
  company_logo_url: string;
};

export async function scrapeSearchResults(job:string,place:string) {

    const vectorStore=await getVectorStore();
    

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
            const formatedContent=formatJobListings(data);
            embedAndStoreContent(formatedContent,job +"in "+place,vectorStore);
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

function formatJobListings(jobs: JobListing[]): string {
  return jobs.map((job, index) => `
        Job #${index + 1}
        Position: ${job.job_position}
        Company: ${job.company_name}
        Location: ${job.job_location}
        Posted on: ${job.job_posting_date}

        Job Link: ${job.job_link}
        Company Profile: ${job.company_profile}
        Logo URL: ${job.company_logo_url}
    `).join("\n------------------------------------\n");
}
