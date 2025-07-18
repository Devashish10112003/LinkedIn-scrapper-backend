import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function initVectorStore() 
{

  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    apiKey: process.env.HUGGINGFACEHUB_ACCESS_TOKEN,
  });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url:process.env.QDRANT_URL,
    collectionName: "contentEmbeddings"  
  });

  console.log("Vector store initialized");
  
  return vectorStore;

}