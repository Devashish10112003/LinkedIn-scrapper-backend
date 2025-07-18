import axios from "axios";
import { ENV_VARS } from "../config/envVars";
import { embedAndStoreContent, getVectorStore } from "../utils/vectorStore";
import { extractLinkedInId } from "../utils/idExtractor";

export async function scrapePage(scrapUrl: string) {
    const vectorStore=await getVectorStore();
    const api_key=ENV_VARS.SCRAPING_DOG_API_KEY;
    const url='https://api.scrapingdog.com/linkedin';
    const content=await extractLinkedInId(scrapUrl);
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
            let formatedContent:string;
            if(content.type==="profile")
            {
                formatedContent=await formatProfile(data);
            }
            else
            {
                formatedContent=await formatCompany(data);
            }
            
            embedAndStoreContent(formatedContent,scrapUrl,vectorStore)
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

async function formatProfile(profile: any): Promise<string> {
    return `
        Name: ${profile.fullName}
        Headline: ${profile.headline}
        Location: ${profile.location}
        About: ${profile.about || "N/A"}

        Experience:
        ${profile.experience?.map((exp: any) =>
            `- ${exp.position} at ${exp.company_name} (${exp.duration})`
        ).join("\n") || "N/A"}

        Education:
        ${profile.education?.map((edu: any) =>
            `- ${edu.college_name} (${edu.college_duration})`
        ).join("\n") || "N/A"}

        Activities:
        ${profile.activities?.map((a: any) => `- ${a.title}`).join("\n") || "N/A"}
    `.trim();
}

async function formatCompany(company: any): Promise<string> {
    return `
        Company Name: ${company.company_name}
        Tagline: ${company.tagline || "N/A"}
        Industry: ${company.industry || "N/A"}
        Location: ${company.location || "N/A"}
        Company Size: ${company.company_size || "N/A"}
        Website: ${company.website || "N/A"}
        Type: ${company.type || "N/A"}
        Headquarters: ${company.headquarters || "N/A"}
        Founded: ${company.founded || "N/A"}
        Followers: ${company.follower_count || "N/A"}
        About: ${company.about || "N/A"}

        Employees:
        ${company.employees?.map((emp: any) =>
        `- ${emp.employee_name}${emp.employee_position ? ` | ${emp.employee_position}` : ""} (${emp.employee_profile_url})`
        ).join("\n") || "N/A"}

        Similar Companies:
        ${company.similar_companies?.map((sim: any) =>
        `- ${sim.name} | ${sim.summary} | ${sim.location}`
        ).join("\n") || "N/A"}

        Location(s):
        ${company.locations?.map((loc: any) =>
        `- ${loc.office_address_line_1}`
        ).join("\n") || "N/A"}
    `.trim();
}
