import express from "express";
import { handleScrape } from "../controller/scrap.controller";

const router=express.Router();

router.post('/',handleScrape);

export default router;