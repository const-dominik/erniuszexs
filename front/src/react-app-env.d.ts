/// <reference types="react-scripts" />
export const worlds = ["aether", "classic", "fobos", "gefion", "hutena", "jaruna", "katahha", "lelwani", "tarhuna", "telawel", "zemyna", "zorza", "pandora", "syberia", "thantos", "unia", "experimental"] as const;

export type World = typeof worlds[number];
type All = "all";
export type PossibleDisplays = World | All;

export type PlayerData = {
    login: string | null;
    time: number | null;
    hero: {
        id: number | null;
        nick: string | null;
        lvl: number | null;
        exp: number | null;
        hp: number | null;
        maxhp: number | null;
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
        respawn: number | null; // in seconds, how much left
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
        timee: number | null; // freaking erniuszek naming. its in ms 
        time: number | null;
    };
}

export type DisplayData = {
    login: string;
    time: Date;
    hero: {
        id: number;
        nick: string;
        lvl: number;
        exp: number;
        lastexp: number;
        nextexp: number;
        hp: number;
        maxHp: number;
        ttl: number;
        map: string;
        gold: number;
        worldname: World;
        time: Date;
    };
    bag: {
        potions: number;
        teleports: number;
        freeSpace: number;
        time: Date;
    };
    dead: {
        respawn: number;
        map: string;
        mob: string;
        time: Date;
    };
    error: {
        message: string;
        time: Date;
    };
    expTime: {
        state: 0 | 1;
        timee: Date;
        time: Date;
    };
}

type OmitTime<T> = Omit<{
    [P in keyof T]: T[P] extends { time: Date } ? OmitTime<T[P]> : T[P];
}, "time">;

export type PlayerDataWithoutTime = OmitTime<PlayerData>;