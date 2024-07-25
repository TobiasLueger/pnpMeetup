import type { ItemType } from '~/models/dnd/item';
import * as itemTypes from '~/data/dnd/item-types.json';
import * as de from '~/texts/dnd/de.json';
import { useEffect, useMemo, useState } from 'react';

export default function useItemTypes(): ItemType[] {
  const itemTypesTranslations = de.itemTypes;

  const [currentItemTypes, setCurrentItemTypes] = useState<ItemType[]>([]);

  const hardcodedItemTypes = useMemo(() => [
    {
      abbreviation: 'S',
      name: 'Shield',
    },
    {
      abbreviation: 'LA',
      name: 'Light Armor',
    },
    {
      abbreviation: 'MA',
      name: 'Medium Armor',
    },
    {
      abbreviation: 'HA',
      name: 'Heavy Armor',
    },
  ], []);

  useEffect(() => {
    const types = [...itemTypes.data, ...hardcodedItemTypes].map((itemType) => {
      return {
        code: itemType.abbreviation ?? '',
        name: itemTypesTranslations[
          itemType.abbreviation as keyof typeof itemTypesTranslations
        ],
        originalName: itemType.name ?? '',
      };
    });
    setCurrentItemTypes(types);
  }, [hardcodedItemTypes, itemTypesTranslations]);

  return currentItemTypes;
}
