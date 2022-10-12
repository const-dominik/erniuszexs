export const worlds = ["aether", "classic", "fobos", "gefion", "hutena", "jaruna", "katahha", "lelwani", "tarhuna", "telawel", "zemyna", "zorza", "pandora", "syberia", "thantos", "unia", "experimental"] as const;

export type World = typeof worlds[number];

export type PlayerData = {
    login: string | null;
    time: number | null;
    hero: {
        id: number | null;
        nick: string | null;
        lvl: number | null;
        exp: number | null;
        hp: number | null;
        maxHp: number | null;
        ttl: number | null;
        map: string | null;
        gold: number | null;
        worldname: World | null;
        time: number | null;
    };
    bag: {
        potions: number | null;
        teleports: number | null;
        freeSpace: number | null;
        time: number | null;
    };
    dead: {
        respawn: number | null;
        map: string | null;
        mob: string | null;
        time: number | null;
    };
    error: {
        message: string | null;
        time: number | null;
    };
    expTime: {
        state: 0 | 1 | null;
        timee: number | null;
        time: number | null;
    };
}
