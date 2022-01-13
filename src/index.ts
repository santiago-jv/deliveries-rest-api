import  express, {Application} from "express";
import cors from "cors"
import { config } from "dotenv";
import "./database/connection";
import indexRouter from "./routes/indexRouter";

config()

const app: Application = express();

app.set('PORT', process.env.PORT || 8000)
app.use(cors())
app.use(express.json())


app.use('/api', indexRouter);

app.listen(app.get('PORT'),()=>{
    console.log( `Server running in http://localhost:${app.get('PORT')}`);
})

