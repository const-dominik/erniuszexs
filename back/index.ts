import express, { Router } from "express";
import cors from "cors";
import { WithId, Db, MongoClient, Collection } from 'mongodb';
import { PlayerData, World, worlds } from "./types";
import dotenv from 'dotenv';

class AccountManager {
    private client: MongoClient;
    private collection!: Collection<PlayerData>;
    private db!: Db;

    constructor(url: string) {
        this.client = new MongoClient(url);
    }
    
    public async open() {
        await this.client.connect();
        this.db = this.client.db("margon");
        this.collection = this.db.collection("accounts");
        return true;
    }

    public async close() {
        await this.client.close();
        return true;
    }

    async getAccounts(worldname: World | "all") {
        const data = worldname === "all" ? {} : { "hero.worldname": worldname };
        const accounts = await this.collection.find(data).toArray();
        return accounts;
    }
}

dotenv.config();
const app = express();
const router = Router();
const PORT = process.env.PORT || 5000;

const URI = process.env.URI;
if (!URI) throw new Error("no URI!");
const Manager = new AccountManager(URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await Manager.open();
    console.log("MongoDB is connected");
});

app.get('/', (req, res) => {
    res.send('hello world')
})

const checkWorldname = (worldname: string): worldname is World => {
    return worldname === "all" || worlds.includes(worldname as World);
}

router.route('/getAccounts/:worldname').get(async (req, res) => {
    if (!checkWorldname(req.params.worldname)) {
        res.status(400).send("Invalid worldname");
    } else {
        const accounts: WithId<PlayerData>[] = await Manager.getAccounts(req.params.worldname);
        res.send(JSON.stringify(accounts));
    }
});