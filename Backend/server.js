const https = require('https');
require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
     
     // --- RENDER ANTI-SLEEP PING ---
     
     const backendUrl = 'https://trippoai.onrender.com'; 
     
     setInterval(() => {
       https.get(backendUrl, (resp) => {
         console.log(`Pinged server to keep it awake. Status: ${resp.statusCode}`);
       }).on("error", (err) => {
         console.log("Ping failed: " + err.message);
       });
     }, 14 * 60 * 1000); 
   });