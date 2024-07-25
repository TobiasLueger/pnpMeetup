import * as de from "~/texts/dnd/de.json";
import * as backgrounds from "~/data/dnd/backgrounds.json";

export default function useBackgrounds() {
    const backgroundsTranslations = de.backgrounds;

    return backgrounds.data.map((background) => {
        return {
            code: background.code,
            name: backgroundsTranslations[background.code as keyof typeof backgroundsTranslations],
            originalName: background.name,
        }
    });
}
