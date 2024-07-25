import type { ItemRarity } from '~/models/dnd/itemRarity';
import * as de from '~/texts/dnd/de.json';
import * as itemRarities from '~/data/dnd/item-rarities.json';
import { useEffect, useState } from 'react';

export default function useItemRarities(): ItemRarity[] {
    const itemRaritiesTranslations = de.itemRarities;

    const [currentItemRarities, setCurrentItemRarities] = useState<ItemRarity[]>([]);

    useEffect(() => {
        const rarities = itemRarities.data.map((itemRarity) => {
            return {
                code: itemRarity.code,
                name: itemRaritiesTranslations[itemRarity.code as keyof typeof itemRaritiesTranslations],
                originalName: itemRarity.name,
                value: itemRarity.value ?? undefined
            }
        });
        setCurrentItemRarities(rarities);
    }, [itemRaritiesTranslations]);

    return currentItemRarities;
}
