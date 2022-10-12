import { Db, MongoClient, Collection } from "mongodb";
import { PlayerData, World } from "./types";

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

export default AccountManager;