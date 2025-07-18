import express from "express";

import { ENV_VARS } from "./config/envVars";
import scrapRoutes from "./routes/scrap.route";

const app=express();
app.use(express.json())
const PORT=ENV_VARS.PORT

app.use('/api/v1/scrap',scrapRoutes);

app.listen(5000,()=>{
    console.log("server started running on http://localhost:"+PORT);
})