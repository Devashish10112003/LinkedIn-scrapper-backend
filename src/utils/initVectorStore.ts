import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { QdrantVectorStore } from "@langchain/qdrant";
import { ENV_VARS } from "../config/envVars";

export async function initVectorStore() 
{
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: ENV_VARS.HUGGINGFACEHUB_ACCESS_TOKEN,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url:ENV_VARS.QDRANT_URL,
    collectionName: "linkedin_content"  
  });

    console.log("Vector store initialized");
    
    return vectorStore;

}