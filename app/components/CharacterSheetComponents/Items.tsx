import React, { useEffect, useState } from "react";
import TriStateButton from "./TriStateButton";
import { useCharactersContext } from "~/hooks/dnd/useCharactersContext";
import { useEquipmentContext } from "~/hooks/dnd/useEquipmentContext";
import type { Character } from "~/models/dnd/character";
import useFilteredItems from "~/hooks/dnd/useFilteredItems";
import type { Item } from "~/models/dnd/item";
import type { Source } from "~/models/dnd/source";
import { useParams } from "@remix-run/react";
import { X } from "@phosphor-icons/react";

interface ItemProp {
    type: "weapons" | "armors" | "items";
    openState: boolean;
    closeItem: () => void;
    addNewEquipment: (item: Item, quantity: number) => void;
    id: string | undefined
}

export default function Items({
    type, 
    openState,
    closeItem,
    addNewEquipment,
    id,
}: ItemProp) {
    const { characters, setCharacters } = useCharactersContext();
    const { equipment, setEquipment } = useEquipmentContext();

    const [loadedCharacter, setLoadedCharacter] = useState<Character | undefined>(undefined);

    const [openItem, setOpenItem] = useState<string | undefined>(undefined);
    const [itemQuantityAdd, setItemQuantityAdd] = useState<Map<string, number>>(new Map<string, number>());

    const [openStateVar, setOpenStateVar] = useState<boolean | undefined>();

    useEffect(() => {
        if (id && characters) {
            const character = characters[id]
            if (character) {
                setLoadedCharacter(character);
            }
        }
    }, [characters, id, setLoadedCharacter]);

    useEffect(() => {
        if (loadedCharacter === undefined) return;
        setCharacters((characters) => {
            return { ...characters, [loadedCharacter.id]: loadedCharacter };
        });
    }, [loadedCharacter, setCharacters]);

    useEffect(() => {
        setOpenStateVar(openState)
    }, []);
    
    const [filterQuery, setFilterQuery] = useState<string>('');
    const [armorFilter, setArmorFilter] = useState<boolean | undefined>(undefined);
    const [weaponFilter, setWeaponFilter] = useState<boolean | undefined>(undefined);
    const [itemsFilter, setItemsFilter] = useState<boolean | undefined>(undefined);
    const items = useFilteredItems(filterQuery, armorFilter, weaponFilter, itemsFilter);

    const [groupedBySourceItems, setGroupedBySourceItems] = useState<Map<Source, Item[]>>(new Map<Source, Item[]>());

    useEffect(() => {
        if (type === 'weapons') {
            setWeaponFilter(true);
        } else if (type === 'armors') {
            setArmorFilter(true);
        } else if (type === 'items') {
            setItemsFilter(true);
        }
    }, [type])

    useEffect(() => {
        const groupedItems = new Map<Source, Item[]>();
        items.forEach(item => {
            if (item.source) {
                if (!groupedItems.has(item.source)) {
                    groupedItems.set(item.source, []);
                }
                groupedItems.get(item.source)?.push(item);
            }
        });
        setGroupedBySourceItems(groupedItems);
    }, [items]);

    // const addEquipment = (item: Item, quantity: number) => {
    //     if (loadedCharacter === undefined) return;
    //     setEquipment((equipment) => {
    //         const characterEquipment = equipment[loadedCharacter.id] ?? [];
    //         const existingEquipment = characterEquipment.find(e => e.item.code === item.code);
    //         if (existingEquipment) {
    //             existingEquipment.quantity += quantity;
    //         } else {
    //             characterEquipment.push({
    //                 item: item,
    //                 quantity: quantity,
    //                 equipped: false
    //             });
    //         }
    //         return { ...equipment, [loadedCharacter.id]: characterEquipment };
    //     });
    // }

    return (
        <div className={`${openStateVar ? "fixed" : "hidden"} w-[80%] h-[80%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-scroll bg-slate-800 z-10 rounded-3xl px-10 pt-5`}>
            <div className="mt-5 mb-10">
                <div className="flex flex-row w-full justify-between">
                    <div className='text-white text-left'>Ausrüstungsliste</div>
                    <X size={24} weight="bold" className="cursor-pointer" onClick={() => closeItem()} />
                </div>
                <div className='sticky top-3 z-10 bg-gray-800 bg-opacity-25 backdrop-blur backdrop-filter flex items-center space-x-2 my-5'>
                    <input type="text" placeholder='Suche...' className='h-6 text-xs px-2 py-5 text-white bg-gray-600 rounded-xl outline-transparent focus:outline-transparent w-full max-w-full'
                        value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
                    <TriStateButton state={armorFilter} setState={(newState) => setArmorFilter(newState)}>Rüstungen</TriStateButton>
                    <TriStateButton state={weaponFilter} setState={(newState) => setWeaponFilter(newState)}>Waffen</TriStateButton>
                    <TriStateButton state={itemsFilter} setState={(newState) => setItemsFilter(newState)}>Gegenstände</TriStateButton>
                </div>
                <div className='relative'>
                    <table className='text-2xs text-white text-left w-full'>
                        <thead>
                            <tr className='border border-slate-500'>
                                <th className='sticky top-14 z-10 bg-slate-900 p-2 border border-slate-500'>Name</th>
                                <th className='sticky top-14 z-10 bg-slate-900 p-2 border border-slate-500'>Typ</th>
                                <th className='sticky top-14 z-10 bg-slate-900 p-2 border border-slate-500'>Wert</th>
                                <th className='sticky top-14 z-10 bg-slate-900 p-2 border border-slate-500'>Seltenheit</th>
                                {
                                    loadedCharacter && (
                                        <>
                                            <th className='sticky top-14 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Anzahl</th>
                                            <th className='sticky top-14 z-10 bg-white bg-opacity-25 backdrop-blur backdrop-filter border border-slate-500'>Ausgerüstet</th>
                                        </>
                                    )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.from(groupedBySourceItems.entries()).map(([source, items], groupIndex) => {
                                    return (
                                        <React.Fragment key={groupIndex}>
                                            <tr key={`items_source_group_${source.id}_${groupIndex}`} className='border border-slate-500'>
                                                <td className='sticky top-24 z-10 bg-slate-900 border border-slate-500 font-bold text-lg p-2 mt-4' colSpan={loadedCharacter ? 6 : 4}>{source.name ?? source.originalName}</td>
                                            </tr>
                                            {items.map((item, index) => {
                                                return (
                                                    <React.Fragment key={`items_item_${item.code}_${item.name}_${source.code}_${groupIndex}-${index}`}>
                                                        <tr className='border border-slate-500 hover:bg-slate-600 cursor-pointer' onClick={() => setOpenItem((open) => open === item.code ? undefined : item.code)}>
                                                            <td className='border border-slate-500 px-5 py-2'>{item.name ?? item.originalName}</td>
                                                            <td className='border border-slate-500 px-5'>{item.type?.name ?? item.type?.originalName}</td>
                                                            <td className='border border-slate-500 px-5'>{item.value ?? '-'}</td>
                                                            <td className='border border-slate-500 px-5'>{item.rarity?.name ?? item.rarity?.originalName}</td>
                                                            {
                                                                loadedCharacter && equipment && (
                                                                    <>
                                                                        <td className='border border-slate-500 px-5'>
                                                                            {equipment?.[loadedCharacter.id]?.find(e => e.item.code === item.code)?.quantity ?? 0}
                                                                        </td>
                                                                        <td className='border border-slate-500 px-5'>
                                                                            {equipment?.[loadedCharacter.id]?.find(e => e.item.code === item.code)?.equipped ? 'Si' : 'No'}
                                                                        </td>
                                                                    </>
                                                                )
                                                            }
                                                        </tr>
                                                        {
                                                            openItem === item.code && (
                                                                <tr key={`items_item_${item.code}_${item.name}_${source.code}_${groupIndex}-${index}_details`} className='border border-slate-500'>
                                                                    <td className='border border-slate-500 px-2 py-2' colSpan={loadedCharacter ? 6 : 4}>
                                                                        <div className='text-2xs uppercase font-medium text-slate-400'>Beschreibung</div>
                                                                        <div className='text-2xs text-white text-left pt-1'>
                                                                            {
                                                                                item.entries?.map((entry, entryIndex) => {
                                                                                    return (
                                                                                        <div key={`items_item_${item.code}_${source.code}_${groupIndex}_entry_${entryIndex}`}>{entry as string}</div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <div className='w-full flex items-center justify-end'>
                                                                            <input className='text-xs px-2 py-3 text-white rounded-lg bg-gray-800 border border-white max-w-full' placeholder='Anzahl' type='number' value={itemQuantityAdd.has(item.code) ? itemQuantityAdd.get(item.code) : 0} onChange={(e) => {
                                                                                const quantity = parseInt(e.target.value);
                                                                                setItemQuantityAdd((iqa) => {
                                                                                    const newIqa = new Map<string, number>(iqa);
                                                                                    if (!isNaN(quantity)) {
                                                                                        newIqa.set(item.code, quantity);
                                                                                    } else {
                                                                                        newIqa.delete(item.code);
                                                                                    }
                                                                                    return newIqa;
                                                                                });
                                                                            }} />
                                                                            <button 
                                                                                onClick={() => {
                                                                                    addNewEquipment(item, itemQuantityAdd.get(item.code) ?? 0);
                                                                                    console.log(item, itemQuantityAdd.get(item.code) ?? 0);
                                                                                    closeItem();
                                                                                }} 
                                                                                className='ml-2 rounded-lg bg-slate-600 hover:bg-slate-500 px-3 py-2'
                                                                            >
                                                                                Gegenstand hinzufügen
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </React.Fragment>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
