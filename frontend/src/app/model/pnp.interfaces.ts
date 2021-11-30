

export interface User {
    id: string;
    name: string;
    role: Roles;

}

export enum Roles {
    Player = "Spieler:innen",
    Master = "Spielleiter:innen"
}