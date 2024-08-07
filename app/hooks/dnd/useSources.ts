import type { Source } from '~/models/dnd/source';
import * as de from '~/texts/dnd/de.json';
import * as sources from '~/data/dnd/sources.json';
import * as adventures from '~/data/dnd/adventures.json';
import { useEffect, useState } from 'react';

export default function useSources(): Source[] {
  const sourcesTranslations = de.sources;
  const adventuresTranslations = de.adventures;

  const [currentSources, setCurrentSources] = useState<Source[]>([]);

  useEffect(() => {
    const s = [
      ...sources.data.map((a) => {
        return {
          id: a.id,
          code: a.source,
          originalName: a.name,
          name: sourcesTranslations[
            a.source as keyof typeof sourcesTranslations
          ],
          coverUrl: a.coverUrl,
        };
      }),
      ...adventures.data.map((a) => {
        return {
          id: a.id,
          code: a.source,
          originalName: a.name,
          name: adventuresTranslations[
            a.source as keyof typeof adventuresTranslations
          ],
          coverUrl: a.coverUrl,
        };
      }),
    ];

    setCurrentSources(s);
  }, [adventuresTranslations, sourcesTranslations]);

  return currentSources;
}
