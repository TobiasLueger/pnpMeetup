import type { Ability } from "~/models/dnd/ability";
import * as de from "~/texts/dnd/de.json";
import * as abilities from "~/data/dnd/abilities.json";

export default function useAbilities(): Ability[] {
    const abilitiesTranslations = de.abilities;

    return abilities.data.map(a => {
        return {
            code: a.code,
            originalName: a.code,
            name: abilitiesTranslations[a.code as keyof typeof abilitiesTranslations]
        }
    });
}
