import type { Language } from "~/models/dnd/language";
import useSources from "./useSources";
import * as de from "~/texts/dnd/de.json";
import * as languages from "~/data/dnd/languages.json";

export default function useLanguages(): Language[] {
    const languagesTranslations = de.languages;
    const sources = useSources();
  
    return languages.data.map((a) => {
      return {
        code: a.code,
        originalName: a.name,
        name:
          languagesTranslations[a.code as keyof typeof languagesTranslations] ?? a.name,
        source: sources.find((s) => a.source === s.code),
        otherSources: [
          ...sources.filter((s) =>
            a.otherSources?.map((os) => os.source === s.code)
          ),
          ...sources.filter((s) =>
            a.additionalSources?.map((os) => os.source === s.code)
          ),
        ],
      };
    });
  }
