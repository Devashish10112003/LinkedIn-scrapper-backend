import { QdrantVectorStore } from "@langchain/qdrant";
import { initVectorStore } from "./initVectorStore";
import {Document} from "langchain/document";

let vectorStoreInstance:QdrantVectorStore;

export async function getVectorStore() {
    if(!vectorStoreInstance){
        vectorStoreInstance=await initVectorStore();
    }
    return vectorStoreInstance;
}

export async function embedAndStoreContent(content:string,scrapUrl:string,vectorStore:QdrantVectorStore) {
    const doc:Document={
        pageContent:content,
        metadata:{scrapUrl}
    };

    await vectorStore.addDocuments([doc]);
}