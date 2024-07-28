import { useEffect, useState } from "react";

import { PlusCircle, Trash, MinusCircle } from "@phosphor-icons/react";
import React from "react";
import { getBonusFromValue, getCharacterArmorClass, getCharacterFullAbilityScore } from "~/helpers/dnd/utils";
import EquipmentRecommendation from "./EquipmentRecommendation";
import type { Equipment } from "~/models/dnd/equipment";
import type { Character } from "~/models/dnd/character";
import { useCharactersContext } from "~/hooks/dnd/useCharactersContext";

export enum EquipmentCategory {
    WEAPON = "WEAPON",
    ARMOR = "ARMOR",
    ITEM = "ITEM"
}

export default function EquipmentBox({ character, equipment, onEquipmentAdd, onEquipmentDelete, onEquipmentToggle, category }: { character: Character | undefined, equipment: Record<string, Equipment[]> | undefined, onEquipmentAdd: (characterCode: string, itemCode: string, quantity: number) => void, onEquipmentDelete: (characterCode: string, itemCode: string) => void, onEquipmentToggle?: (equipment: Equipment) => void, category?: EquipmentCategory }) {

    const [characterEquipment, setCharacterEquipment] = useState<Equipment[] | undefined>(undefined);
    const [selectedEquipment,  setSelectedEquipment] = useState<string | undefined>(undefined);

    // const { characters, setCharacters } = useCharactersContext();

    useEffect(() => {
        if (character && equipment) {
            setCharacterEquipment(equipment[character.id]);
        }
    }, [character, equipment]);

    return (
        <div className='max-h-40 overflow-auto'>
            <table className='text-2xs w-full border'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='border p-1'>Gegenstand</th>
                        <th className='border p-1'>Anzahl</th>
                        {category !== EquipmentCategory.ITEM && <th className='border p-1'>Ausgerüstet</th>}
                    </tr>
                </thead>
                <tbody>
                    {character?.equipment && character?.equipment?.length > 0 && character?.equipment?.filter(f => {
                        if (!category) return true;
                        switch (category) {
                            case EquipmentCategory.WEAPON:
                                return f.item.weapon === true;
                            case EquipmentCategory.ARMOR:
                                return f.item.armor === true || f.item.shield === true;
                            case EquipmentCategory.ITEM:
                            default:
                                return !(f.item.weapon === true || f.item.armor === true || f.item.shield === true);
                        }
                    }).map((item) => {
                        return (
                            <React.Fragment key={`equipment_${category}_${item.item.code}`}>
                                <tr onClick={() => setSelectedEquipment((selected) => selected === item.item.code ? undefined : item.item.code)} className='cursor-pointer hover:bg-slate-600'>
                                    <td className='border p-1'><Trash onClick={() => {
                                        if (!character) return;
                                        onEquipmentDelete(character.id, item.item.code);
                                    }} className={"h-3 w-3 hover:text-slate-300 cursor-pointer"} /></td>
                                    <td className='border p-1 flex items-center justify-between'>
                                        <div>{item.item.name ?? item.item.originalName}</div>
                                        { category === EquipmentCategory.ARMOR && <EquipmentRecommendation dex={character ? getCharacterFullAbilityScore(character, 'dex') : 10} currentEquipment={character?.equipment} selectedEquipment={item} /> }
                                    </td>
                                    <td className='border'>
                                        <div className='flex items-center space-x-1'>
                                            <div className='flex-grow p-1'>{item.quantity}</div>
                                            <div className='aspect-square cursor-pointer bg-slate-500 hover:bg-slate-600 rounded p-1'>
                                                <MinusCircle className={"h-3 w-3 cursor-pointer"} onClick={() => {
                                                    console.log("onEquipmentAdd: ", character)
                                                    if (!character) return;
                                                    onEquipmentAdd(character.id, item.item.code, -1)
                                                }} />
                                            </div>
                                            <div className='aspect-square h-full cursor-pointer bg-slate-500 hover:bg-slate-600 rounded p-1'>
                                                <PlusCircle onClick={() => {
                                                    if (!character) return;
                                                    onEquipmentAdd(character.id, item.item.code, 1)
                                                }} className={"h-3 w-3 cursor-pointer"} />
                                            </div>
                                        </div>
                                    </td>
                                    {category !== EquipmentCategory.ITEM &&
                                        <td className='border p-1'>
                                            <input type="checkbox" className='z-20' checked={item.equipped} onClick={(e) => {
                                                e.stopPropagation(); e.preventDefault();
                                            }} onChange={() => onEquipmentToggle?.(item)} />
                                        </td>
                                    }
                                </tr>
                                {
                                    selectedEquipment && selectedEquipment === item.item.code &&
                                    <tr className='bg-slate-800'>
                                        <td className='border p-1' colSpan={5}>
                                            {
                                                (item.item.shield || item.item.armor) && (
                                                    <div>
                                                        <div className='flex-grow p-1 uppercase text-2xs font-medium text-slate-400'>{item.item.armor ? (item.item.type?.name ?? 'Armatura') : "Scudo"}</div>
                                                        <div className='text-sm p-1'>
                                                            Rüstungsklasse: <span>
                                                                {
                                                                    (item.item.armor && !item.item.shield
                                                                        ? item.item.type?.code === 'LA'
                                                                            ? (getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.value)
                                                                            : item.item.type?.code === 'MA'
                                                                                ? (getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.value > 2
                                                                                    ? 2
                                                                                    : getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.value)
                                                                                : 0
                                                                        : (item.item.shield ?
                                                                            getCharacterArmorClass(character, character?.equipment, false)
                                                                            : 0)) + (item.item.ac ?? 0)
                                                                }</span>
                                                            <div className='text-slate-300 text-2xs'>Formel: {item.item.armor && !item.item.shield
                                                                ? `${item.item.ac}${item.item.type?.code === 'LA'
                                                                    ? ' + DEX [' + getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.sign + getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.absoluteValue + ']'
                                                                    : item.item.type?.code === 'MA'
                                                                        ? ' + DEX (max 2) [' + getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.sign + (getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.absoluteValue > 2
                                                                            ? 2
                                                                            : getBonusFromValue({ base: character ? getCharacterFullAbilityScore(character, 'dex') : 10 })?.absoluteValue) + ']'
                                                                        : ''}`
                                                                : (item.item.shield ?
                                                                    `CA [${getCharacterArmorClass(character, character?.equipment, false)}] + ${item.item.ac}` : `+ ${item.item.ac ?? 0}`)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </td>
                                    </tr>
                                }
                            </React.Fragment>);
                    })}
                    {
                        (!character?.equipment || character?.equipment?.length === 0) && <tr>
                            <td className='border p-1 mx-4 text-center text-slate-300' colSpan={4}>Keine Gegenstände in der Ausrüstung</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
