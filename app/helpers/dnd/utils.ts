import type { Character } from "~/models/dnd/character";
import type { Equipment } from "~/models/dnd/equipment";


export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getBonusFromValue({
  base,
  proficiency,
  extraProficiency,
  other,
}: {
  base: number;
  proficiency?: { active: boolean; value: number };
  extraProficiency?: { active: boolean; value: number };
  other?: number;
}): { value: number; absoluteValue: number; sign: '+' | '-' } {
  const value =
    Math.floor((base - 10) / 2) +
    (proficiency?.active ? extraProficiency?.active ? proficiency.value + extraProficiency.value: proficiency.value : 0) +
    (other ?? 0);

  return {
    value,
    absoluteValue: Math.abs(value),
    sign: value >= 0 ? '+' : '-',
  };
}

export function getCharacterArmorClass(
  character?: Character,
  characterEquipment?: Equipment[],
  shieldIncluded: boolean = true
): number {
  if (character === undefined || characterEquipment === undefined) return 0;
  const armor = characterEquipment?.find?.(
    (f) => f.item.armor && !f.item.shield && f.equipped
  );
  const shield = shieldIncluded
    ? characterEquipment?.find((f) => f.item.shield && f.equipped)
    : undefined;

  let dex = character.stats.abilities?.['DEX']?.value ?? 10;
  
  if (character?.race?.abilities?.['dex']) {
    dex += character?.race?.abilities?.['dex'] ?? 0;
  }

  if (character?.subRace?.abilities?.['dex']) {
    dex += character?.subRace?.abilities?.['dex'] ?? 0;
  }

  return calculateArmorClass({ dex, armor, shield });
}

export function getArmorClassFromDexAndEquipment({ dex, equipment}: { dex: number, equipment: Equipment[] }): number {
  const armor = equipment?.find?.(
    (f) => f.item.armor && !f.item.shield && f.equipped
  );
  const shield = equipment?.find((f) => f.item.shield && f.equipped);

  return calculateArmorClass({ dex, armor, shield });
}

export function calculateArmorClass({ dex, armor, shield }: { dex: number; armor?: Equipment; shield?: Equipment }): number {
  const dexBonus = getBonusFromValue({ base: dex }).value;

  if (armor === undefined) {
    return dexBonus + 10 + (shield?.item.ac ?? 0);
  }

  let armorValue = 0;
  if (armor?.item?.type?.code === 'LA') {
    armorValue = (armor?.item?.ac ?? 0) + dexBonus;
  } else if (armor?.item?.type?.code === 'MA') {
    armorValue = (armor?.item?.ac ?? 0) + (dexBonus > 2 ? 2 : dexBonus);
  } else if (armor?.item?.type?.code === 'HA') {
    armorValue = armor?.item?.ac ?? 0;
  }

  return armorValue + (shield?.item?.ac ?? 0);
}

export function getCharacterBaseAbilityScore(character: Character, abilityCode: string) {
  return character.stats?.abilities?.[abilityCode.toLowerCase()]?.value ?? character.stats?.abilities?.[abilityCode.toUpperCase()]?.value ?? 0;
}

export function getCharacterFullAbilityScore(character: Character, abilityCode: string) {
  let abilityScore = character.stats?.abilities?.[abilityCode.toLowerCase()]?.value ?? character.stats?.abilities?.[abilityCode.toUpperCase()]?.value ?? 0;
  abilityScore += character.race?.abilities?.[abilityCode.toLowerCase()] ?? character.race?.abilities?.[abilityCode.toUpperCase()] ?? 0;
  abilityScore += character.subRace?.abilities?.[abilityCode.toLowerCase()] ?? character.subRace?.abilities?.[abilityCode.toUpperCase()] ?? 0;
  return abilityScore;
}

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
