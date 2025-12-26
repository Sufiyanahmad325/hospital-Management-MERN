import { configDotenv } from "dotenv";
import app from "./app.js";
import connectionWithDB from "./src/DB/DBConnection.js";
import { seedAdmin } from "./src/seed/seedAdmin.js";

configDotenv({path: './.env'});


const PORT = process.env.PORT || 8000;

connectionWithDB().then(async()=>{

await seedAdmin(); // it is used to create a default admin if not exists

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
        });
})