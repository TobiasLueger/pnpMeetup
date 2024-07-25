import type { LifeClass } from '~/models/dnd/lifeClass';
import * as de from '~/texts/dnd/de.json';
import * as classes from '~/data/dnd/classes.json';
import useSources from './useSources';

export default function useClasses(): LifeClass[] {
  const classesTranslations = de.classes;
  const sources = useSources();

  return classes.data.map((a) => {
    return {
      code: a.code,
      originalName: a.name,
      name:
        classesTranslations[a.code as keyof typeof classesTranslations] ?? a.name,
      source: sources.find((s) => a.source === s.code),
      reasons: a.reasons,
    };
  });
}
