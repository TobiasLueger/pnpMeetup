import * as de from "~/texts/dnd/de.json";
import * as skills from "~/data/dnd/skills.json";
import type { Skill } from "~/models/dnd/skill";

export default function useSkills(): Skill[] {
    const skillsTranslations = de.skills;

    return skills.data.map(a => {
        return {
            code: a.code,
            abilityCode: a.ability_code,
            originalName: a.name,
            name: skillsTranslations[a.code as keyof typeof skillsTranslations]
        }
    });
}
