import type { Stats } from "~/contexts/dnd/CharactersContext";
import type { Alignment } from "./alignment";
import type { Background } from "./background";
import type { LifeClass } from "./lifeClass";
import type { Race } from "./race";
import type { Size } from "./size";
import type { SubRace } from "./subRace";
import type { Die } from "./die";
import type { Language } from "./language";
import type { Equipment } from "./equipment";


export interface Character {
    id: string;
    name: string;
    class: LifeClass|undefined;
    race: Race|undefined;
    subRace: SubRace|undefined;
    level: number;
    background: Background|undefined;
    size: Size|undefined;
    alignment: Alignment|undefined;
    stats: Stats;
    inspiration: boolean;
    speed: number;
    maxHp: number;
    currentHp: number;
    temporaryHp: number;
    hitDice: Die;
    languages: Language[];
    savingThrowsAgainstDeath: {
        success: number;
        fail: number;
    },
    equipment: Equipment[];
}
