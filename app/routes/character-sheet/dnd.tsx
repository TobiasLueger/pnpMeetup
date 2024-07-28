import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import AbilityBigBox from "~/components/CharacterSheetComponents/AbilityBigBox";
import AlignmentSelect from "~/components/CharacterSheetComponents/AlignmentSelect";
import BackgroundSelect from "~/components/CharacterSheetComponents/BackgroundSelect";
import ClassSelect from "~/components/CharacterSheetComponents/ClassSelect";
import EquipmentBox, { EquipmentCategory } from "~/components/CharacterSheetComponents/EquipmentBox";
import Items from "~/components/CharacterSheetComponents/Items";
import RaceSelect from "~/components/CharacterSheetComponents/RaceSelect";
import SizeSelect from "~/components/CharacterSheetComponents/SizeSelect";
import SubRaceSelect from "~/components/CharacterSheetComponents/SubRaceSelect";
import { CharactersProvider, type Stats } from "~/contexts/dnd/CharactersContext";
import { EquipmentProvider } from "~/contexts/dnd/EquipmentContext";
import { getBonusFromValue, getCharacterArmorClass, getCharacterFullAbilityScore } from "~/helpers/dnd/utils";
import useAbilities from "~/hooks/dnd/useAbilities";
import { createNewCharacter } from "~/hooks/dnd/useCharacter";
import { useCharactersContext } from "~/hooks/dnd/useCharactersContext";
import { useEquipmentContext } from "~/hooks/dnd/useEquipmentContext";
import useSkills from "~/hooks/dnd/useSkills";
import type { Alignment } from "~/models/dnd/alignment";
import type { Background } from "~/models/dnd/background";
import type { Character } from "~/models/dnd/character";
import type { Equipment } from "~/models/dnd/equipment";
import type { Item } from "~/models/dnd/item";
import type { LifeClass } from "~/models/dnd/lifeClass";
import type { Race } from "~/models/dnd/race";
import type { Size } from "~/models/dnd/size";
import type { SubRace } from "~/models/dnd/subRace";

export default function DnD() {
    const { id } = useParams();

    
    // const id = "khhad5rasdra5d6";

    

    const [loadedCharacter, setLoadedCharacter] = useState<Character | undefined>(undefined);

    const abilities = useAbilities();
    const skills = useSkills();

    const { characters, setCharacters } = useCharactersContext();
    const { equipment, setEquipment } = useEquipmentContext();

    useEffect(() => {
        if (id === undefined && loadedCharacter === undefined) {
            const newCharacter = createNewCharacter(abilities, skills);
            setLoadedCharacter(newCharacter);
        } else if (id !== undefined && loadedCharacter === undefined) {
            setLoadedCharacter(characters[id]);
        }
    }, [id, characters, setCharacters, abilities, skills, loadedCharacter])

    useEffect(() => {
        if (loadedCharacter === undefined) return;
        setCharacters((characters) => {
            return { ...characters, [loadedCharacter.id]: loadedCharacter };
        });
        console.log("Characters: ->", loadedCharacter)
        // localStorage.setItem(loadedCharacter.id,  JSON.stringify(loadedCharacter));
        // localStorage.setItem("characters",  JSON.stringify({ ...characters, [loadedCharacter.id]: loadedCharacter }));
    }, [loadedCharacter, setCharacters]);

    const changeAbilityValue = (abilityCode: string, newValue: number) => {
        if (loadedCharacter === undefined) return;
        const newStats: Stats = {
            ...loadedCharacter.stats,
            abilities: {
                ...loadedCharacter.stats.abilities,
                [abilityCode]: {
                    ...loadedCharacter.stats.abilities[abilityCode],
                    value: newValue
                }
            }
        }
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
    };

    const setCharacterName = (newName: string) => {
        if (loadedCharacter === undefined) return;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), name: newName }));
    }

    const setCharacterLevel = (value: number) => {
        if (loadedCharacter === undefined) return;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), level: value }));
    }

    const setCharacterRace = (race: Race | undefined) => {
        if (loadedCharacter === undefined || race === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), race }))
    }

    const setCharacterClass = (lifeClass: LifeClass | undefined) => {
        if (loadedCharacter === undefined || lifeClass === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), class: lifeClass }))
    }

    const setCharacterAlignment = (alignment: Alignment | undefined) => {
        if (loadedCharacter === undefined || alignment === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), alignment }))
    }

    const setCharacterSize = (size: Size | undefined) => {
        if (loadedCharacter === undefined || size === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), size }))
    }

    const setCharacterBackground = (background: Background | undefined) => {
        if (loadedCharacter === undefined || background === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), background }))
    }

    const setCharacterSubRace = (subRace: SubRace | undefined) => {
        if (loadedCharacter === undefined || subRace === undefined) return;
        setLoadedCharacter((c) => ({ ... (c ?? loadedCharacter), subRace }))
    }

    const toggleAbilityProficiency = (abilityCode: string) => {
        return () => {
            if (loadedCharacter === undefined) return;
            const newStats: Stats = {
                ...loadedCharacter.stats,
                abilities: {
                    ...loadedCharacter.stats.abilities,
                    [abilityCode]: {
                        ...loadedCharacter.stats.abilities[abilityCode],
                        proficiency: !loadedCharacter.stats.abilities[abilityCode].proficiency
                    }
                }
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
        }
    }

    const setCharacterEquipment = (item: Item, quantity: number) => {
        if (loadedCharacter === undefined) return;
        const newEquipment = loadedCharacter.equipment;
        newEquipment.push({item: item, quantity: quantity, equipped: false});
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), equipment: newEquipment }));
    }

    const addEquipment = (characterId: string, itemCode: string, quantity: number) => {
        if (loadedCharacter === undefined) return;
        const currentEquipment = loadedCharacter.equipment;
        const existingItem = currentEquipment.find(f => f.item.code === itemCode);
        if (existingItem !== undefined) {
            existingItem.quantity = (existingItem?.quantity ?? 0) + quantity;
        }
        const newEquipment = existingItem !== undefined ? [...currentEquipment.filter(f => f.item.code !== itemCode), { ...existingItem }] : [...currentEquipment];
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), equipment: newEquipment }));
    }

    const deleteEquipment = (characterId: string, itemCode: string) => {
        if (loadedCharacter === undefined) return;
        const currentEquipment = loadedCharacter.equipment;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), equipment: 
            currentEquipment.filter(f => f.item.code !== itemCode)
        }));
    }

    const toggleEquipment = (equipment: Equipment) => {
        if (loadedCharacter === undefined) return;
        const currentEquipment = loadedCharacter.equipment;
        let characterEquipment = currentEquipment ?? [];
            if (equipment.item.weapon) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: item.item.code === equipment.item.code ? !item.equipped : item.equipped
                        }
                    }
                    return item;
                });
            } else if (equipment.item.armor && !equipment.item.shield) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: !item.equipped
                        }
                    } else if (item.item.armor) {
                        return {
                            ...item,
                            equipped: false
                        }
                    }
                    return item;
                });
            } else if (equipment.item.shield) {
                if (!characterEquipment) return currentEquipment;
                characterEquipment = characterEquipment.map((item) => {
                    if (item.item.code === equipment.item.code) {
                        return {
                            ...item,
                            equipped: !item.equipped
                        }
                    } else if (item.item.shield) {
                        return {
                            ...item,
                            equipped: false
                        }
                    }
                    return item;
                });
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), equipment: 
                characterEquipment
            }));
    }

    const toggleSkillProficiency = (skillCode: string) => {
        return () => {
            if (loadedCharacter === undefined) return;
            const newStats: Stats = {
                ...loadedCharacter.stats,
                skills: {
                    ...loadedCharacter.stats.skills,
                    [skillCode]: {
                        ...loadedCharacter.stats.skills[skillCode],
                        proficiency: !loadedCharacter.stats.skills[skillCode].proficiency
                    }
                }
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
        }
    }

    const toggleSkillExtraProficiency = (skillCode: string) => {
        return () => {
            if (loadedCharacter === undefined) return;
            const newStats: Stats = {
                ...loadedCharacter.stats,
                skills: {
                    ...loadedCharacter.stats.skills,
                    [skillCode]: {
                        ...loadedCharacter.stats.skills[skillCode],
                        extraProficiency: !loadedCharacter.stats.skills[skillCode].extraProficiency
                    }
                }
            }
            setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), stats: newStats }));
        }
    }

    const setSavingThrowsAgainstDeath = (value: number, type: 'success' | 'fail') => {
        if (loadedCharacter === undefined) return;
        const savingThrowsAgainstDeath = loadedCharacter.savingThrowsAgainstDeath ?? { success: 0, fail: 0 };
        savingThrowsAgainstDeath[type] = value;
        setLoadedCharacter((c) => ({ ...(c ?? loadedCharacter), savingThrowsAgainstDeath }));
    }

    const [itemType, setItemType] = useState<"weapons" | "armors" | "items">("weapons");
    const [itemOpenState, setItemOpenState] = useState<boolean>(false);

    const closeItem = () => {
        setItemOpenState(false);
    }

  return (
    <CharactersProvider>
        <EquipmentProvider>
            <div>
            <h1>DND Character Sheet</h1>
            </div>
            <ul>
                {Object.values(characters).map((character) => {
                    return <li key={'party_character_id_'+character.id} className="flex py-2 justify-between text-left">
                        <div>
                            <div className='text-xs font-medium'>{character.name} - Lv. {character.level}</div>
                            <div className='text-3xs text-gray-400'>{character.race?.name} {character.subRace?.name} {character.class?.name}, taglia <span className='lowercase'>{character.size?.name}</span>, {character.alignment?.name}</div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            {/* <EditIcon onClick={() => openCharacterModal(character)} className="h-4 w-4 cursor-pointer text-white hover:text-blue-400"/>
                            <DeleteIcon onClick={() => deleteCharacter(character.id)} className="h-4 w-4 cursor-pointer text-white hover:text-red-400"/> */}
                        </div>
                    </li>
                })}
            </ul>
            <div className='text-left text-white py-4'>
            <div className='px-4 font-thin text-lg'>Charakterbogen</div>
            <div className='flex items-center text-white px-4 mt-4'>
                <div className='w-[30%]'>
                    <div className='border rounded-l'>
                    <input 
                        className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                        type='text' 
                        value={loadedCharacter?.name ?? ''} 
                        onChange={(event) => setCharacterName(event.target.value)}
                    />
                    </div>
                    <div className='text-2xs uppercase px-2'>CHARAKTER NAME</div>
                </div>
                <div className='w-[70%] border rounded grid grid-cols-[4fr_4fr_5fr] grid-rows-2 gap-x-1 gap-y-2 py-2 px-2'>
                    <div>
                        <ClassSelect 
                        characterClass={loadedCharacter?.class} 
                        onClassChange={(lifeClass: LifeClass | undefined) => setCharacterClass(lifeClass)}
                        />
                        <div className='text-2xs uppercase px-2'>Klasse</div>
                    </div>
                    <div>
                        <input 
                        className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                        type='text' 
                        value={loadedCharacter?.level ?? '1'} 
                        onChange={(event) => setCharacterLevel(parseInt(event.target.value))}
                        />
                        <div className='text-2xs uppercase px-2'>Stufe</div>
                    </div>
                    <div>
                        <BackgroundSelect 
                        background={loadedCharacter?.background} 
                        onBackgroundChange={(background: Background | undefined) => setCharacterBackground(background)} 
                        />
                        <div className='text-2xs uppercase px-2'>Hintergrund</div>
                    </div>
                    <div>
                        <RaceSelect 
                        race={loadedCharacter?.race} 
                        onRaceChange={(race: Race | undefined) => setCharacterRace(race)}
                        />
                        <div className='text-2xs uppercase px-2'>Rasse</div>
                    </div>
                    <div>
                        <SizeSelect 
                        size={loadedCharacter?.size} 
                        onSizeChange={(size: Size | undefined) => setCharacterSize(size)}
                        />
                        <div className='text-2xs uppercase px-2'>Größe</div>
                    </div>
                    <div>
                        <AlignmentSelect 
                        alignment={loadedCharacter?.alignment} 
                        onAlignmentChange={(alignment: Alignment | undefined) => setCharacterAlignment(alignment)} 
                        />
                        <div className='text-2xs uppercase px-2'>Gesinnung</div>
                    </div>
                    <div>
                        <SubRaceSelect 
                        race={loadedCharacter?.race} 
                        subRace={loadedCharacter?.subRace} 
                        onSubRaceChange={(race: SubRace | undefined) => setCharacterSubRace(race)}
                        />
                        <div className='text-2xs uppercase px-2'>Unterrassen</div>
                    </div>
                </div>
            </div>

            <div className='flex gap-x-2 mx-2 mt-8'>
                <div className='w-1/3'>
                    <div className='flex gap-x-2'>
                        <div className='w-1/4 bg-slate-700 px-1 py-1 flex flex-col gap-y-2'>
                            {
                                abilities.map((ability) => {
                                    return (
                                        <div key={'big_' + ability.code}>
                                            <AbilityBigBox ability={ability} character={loadedCharacter} onValueChange={(newValue) => changeAbilityValue(ability.code, newValue)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='w-3/4'>
                            <div className='relative h-12'>
                                <div className='border rounded-full h-6 aspect-square flex items-center justify-center absolute left-0 top-[calc(50%-14px)]'>{Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1}</div>
                                <div className='border rounded text-2xs absolute w-[calc(100%-2rem)] top-[calc(50%-14px)] right-0 ml-8 px-2 py-1'>Übungsbonus</div>
                            </div>
                            <div className='border rounded px-1 py-1'>
                                {abilities.map((ability) => {
                                    const modifierValue = getBonusFromValue({
                                        base: loadedCharacter?.stats?.abilities?.[ability.code]?.value ?? 10,
                                        proficiency: {
                                            active: loadedCharacter?.stats?.abilities?.[ability.code]?.proficiency ?? false,
                                            value: Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1
                                        }
                                    });

                                    return (
                                        <div key={'ability_' + ability.code} className='flex items-center space-x-1 py-0.5'>
                                            <div onClick={toggleAbilityProficiency(ability.code)} className='rounded-full border h-5 aspect-square cursor-pointer overflow-hidden'>
                                                {loadedCharacter?.stats?.abilities?.[ability.code]?.proficiency && <div className='bg-white h-5 w-5 rounded-full'></div>}
                                            </div>
                                            <div key={ability.code} className='text-3xs'>{modifierValue.sign} {modifierValue.absoluteValue} {ability.name}</div>
                                        </div>
                                    );
                                })}
                                <div className='uppercase text-center text-2xs'>Rettungswürfe</div>
                            </div>
                            <div className='border rounded px-1 py-1'>
                                {skills.sort((a, b) => {
                                    if (a.name > b.name) {
                                        return 1;
                                    } else if (a.name < b.name) {
                                        return -1;
                                    } else {
                                        return 0;
                                    }
                                }).map((skill) => {
                                    const modifierValue = getBonusFromValue({
                                        base: loadedCharacter?.stats?.abilities?.[skill.abilityCode]?.value ?? 10,
                                        proficiency: {
                                            active: loadedCharacter?.stats?.skills?.[skill.code]?.proficiency ?? false,
                                            value: Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1
                                        },
                                        extraProficiency: {
                                            active: loadedCharacter?.stats?.skills?.[skill.code]?.extraProficiency ?? false,
                                            value: Math.ceil((loadedCharacter?.level ?? 1) / 4) + 1
                                        }
                                    });
                                    return (
                                        <div key={'skill_' + skill.code} className='flex items-center py-0.5'>
                                            <div onClick={toggleSkillExtraProficiency(skill.code)} className='rounded-full border h-3 aspect-square cursor-pointer overflow-hidden absolute ml-4 mb-2'>
                                                {loadedCharacter?.stats?.skills?.[skill.code]?.extraProficiency && <div className='bg-white h-3 w-3 rounded-full'></div>}
                                            </div>
                                            <div onClick={toggleSkillProficiency(skill.code)} className='rounded-full border h-5 aspect-square cursor-pointer overflow-hidden mr-4 bg-black'>
                                                {loadedCharacter?.stats?.skills?.[skill.code]?.proficiency && <div className='bg-white h-5 w-5 rounded-full'></div>}
                                            </div>
                                            <div key={skill.code} className='text-3xs'>{modifierValue.sign} {modifierValue.absoluteValue} {skill.name} ({abilities.find(f => f.code === skill.abilityCode)?.name?.substring(0, 3)})</div>
                                        </div>
                                    );
                                })}
                                <div className='uppercase text-center text-2xs'>Fertigkeiten</div>
                            </div>
                        </div>
                    </div>

                    <div>PASSIVE WEISHEIT (Wahrnehmung) [10 + Wahrnehmung]</div>
                </div>
                <div className="w-2/3 flex flex-wrap gap-y-2">
                    <div className="w-full flex gap-x-2">
                        <div className='w-1/2'>
                            <div className='rounded-md bg-slate-700 flex flex-col gap-y-2 px-2 py-2'>
                                <div className='flex text-center'>
                                    <div className='w-1/3 rounded border flex flex-col justify-between gap-y-2'>
                                        <div></div>
                                        <div>{getCharacterArmorClass(loadedCharacter, loadedCharacter?.equipment)}</div>
                                        <div className='text-3xs uppercase'>Rüstungsklasse</div>
                                    </div>
                                    <div className='w-1/3 rounded border flex flex-col justify-between'>
                                        <div></div>
                                        <div>{getBonusFromValue({ base: loadedCharacter ? getCharacterFullAbilityScore(loadedCharacter, 'DEX') : 10 })?.sign} {getBonusFromValue({ base: loadedCharacter ? getCharacterFullAbilityScore(loadedCharacter, 'DEX') : 10 })?.absoluteValue}</div>
                                        <div className='text-3xs uppercase'>Initiative</div>
                                    </div>
                                    <div className='w-1/3 rounded border flex flex-col justify-between gap-y-2'>
                                        <div className='h-2'></div>
                                        <input className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type='text' />
                                        <div className='text-3xs uppercase'>Geschwindigkeit</div>
                                    </div>
                                </div>
                                <div className='rounded-t-md border px-2 py-2 space-y-2'>
                                    <div className='flex space-x-2 items-center'>
                                        <div className='text-3xs whitespace-nowrap'>Maximale Trefferpunkte: </div>
                                        <input className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    </div>
                                    <input className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    <div className='text-3xs uppercase text-center'>Aktuelle Trefferpunkte</div>
                                </div>
                                <div className='rounded-b-md border px-2 py-2 space-y-2'>
                                    <input className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                                    <div className='text-3xs uppercase text-center'>Temporäre Trefferpunkte</div>
                                </div>
                                <div className='flex'>
                                    <div className='w-1/2 rounded-md border px-2 py-2 space-y-2'>
                                        <div className='flex space-x-2 items-center'>
                                            <div className='text-3xs whitespace-nowrap'>Gesamt</div>
                                            <input className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' /></div>
                                        <div className='text-3xs uppercase text-center'>Trefferwürfel</div>
                                    </div>
                                    <div className='w-1/2 rounded-md border px-2 py-2 space-y-2'>
                                        <div className='text-3xs flex items-center space-x-1'>
                                            <div onClick={() => setSavingThrowsAgainstDeath(0, 'success')} className='select-none cursor-pointer'>ERFOLGE</div>
                                            <div className='flex items-center gap-x-2 relative'>
                                                <div className='w-full h-[1px] absolute top-[calc(50%-0.1px)] left-0 bg-slate-50 z-0'></div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(1, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 1 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(2, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 2 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(3, 'success')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.success ?? 0) >= 3 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-3xs flex items-center space-x-1'>
                                            <div onClick={() => setSavingThrowsAgainstDeath(0, 'fail')} className='select-none cursor-pointer'>FEHLSCHLÄGE</div>
                                            <div className='flex items-center gap-x-2 relative'>
                                                <div className='w-full h-[1px] absolute top-[calc(50%-0.1px)] left-0 bg-slate-50 z-0'></div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(1, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 1 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(2, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 2 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                                <div onClick={() => setSavingThrowsAgainstDeath(3, 'fail')} className='rounded-full border h-2 aspect-square bg-slate-600 overflow-hidden cursor-pointer z-10'>
                                                    {(loadedCharacter?.savingThrowsAgainstDeath?.fail ?? 0) >= 3 && <div className='bg-white h-2 w-2 rounded-full'></div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-3xs uppercase text-center'>RETTUNGSWÜRFE GEGEN TOD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div>

                                <div className='uppercase text-center text-2xs'>Persöhnlichkeitsmerkmale</div>
                                <div className='uppercase text-center text-2xs'>Ideale</div>
                                <div className='uppercase text-center text-2xs'>Bindungen</div>
                                <div className='uppercase text-center text-2xs'>Makel</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='rounded-md border flex flex-col'>
                            <div className="flex items-center justify-end text-sm px-1 py-0.5"><div>Gesamtlast: {loadedCharacter?.equipment?.map(m => m.item.weight ?? 0).reduce((prev, curr) => prev + curr, 0)}/{(loadedCharacter?.stats.abilities['STR']?.value ?? 0) * 15} lb.</div></div>
                            <div>Waffen</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.WEAPON} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} onEquipmentToggle={toggleEquipment} />
                                <div onClick={() => {
                                    setItemType("weapons");
                                    setItemOpenState(true);
                                }} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Waffenliste öffnen</div>
                                </div>
                                
                            </div>

                            <div>Rüstung</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.ARMOR} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} onEquipmentToggle={toggleEquipment} />
                                <div onClick={() => {
                                    setItemType("armors");
                                    setItemOpenState(true);
                                }} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Rüstungsliste öffnen</div>
                                </div>
                            </div>


                            <div>Gegenstände</div>
                            <div className='flex-grow'>
                                <EquipmentBox category={EquipmentCategory.ITEM} character={loadedCharacter} equipment={equipment} onEquipmentAdd={addEquipment} onEquipmentDelete={deleteEquipment} />
                                <div onClick={() => {
                                    setItemType("items");
                                    setItemOpenState(true);
                                }} className='flex items-center justify-end'>
                                    <div className='mt-2 rounded px-1 py-0.5 text-2xs cursor-pointer bg-slate-600 hover:bg-slate-700 w-max mx-2'>Gegenstandsliste öffnen</div>
                                </div>
                            </div>
                            <div className='uppercase text-2xs text-center mt-2'>Ausrüstung</div>
                        </div>
                    </div>
                    {itemOpenState &&
                        <Items type={itemType} openState={itemOpenState} closeItem={closeItem} addNewEquipment={setCharacterEquipment} id={id} />
                    }
                </div>
            </div>
            </div>
        </EquipmentProvider>
    </CharactersProvider>


);
}
