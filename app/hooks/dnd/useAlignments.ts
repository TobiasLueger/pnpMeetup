import type { Alignment } from "~/models/dnd/alignment";
import * as de from "~/texts/dnd/de.json";
import * as alignments from "~/data/dnd/alignments.json";

export function useAlignments(): Alignment[] {
    const alignmentsTranslations = de.alignments;

    return alignments.data.map((alignment) => {
        return {
            code: alignment.code,
            name: alignmentsTranslations[alignment.code as keyof typeof alignmentsTranslations],
            originalName: alignment.name,
        }
    });
}
