import { useEffect, useState } from "react";
import { groupBy } from "~/helpers/dnd/utils";
import useSources from "~/hooks/dnd/useSources";
import useSubRaces from "~/hooks/dnd/useSubRaces";
import type { Race } from "~/models/dnd/race";
import type { SubRace } from "~/models/dnd/subRace";

export default function SubRaceSelect({ race, subRace, onSubRaceChange }: { race?: Race, subRace?: SubRace, onSubRaceChange?: (race: SubRace | undefined) => void }) {
    const sources = useSources();
    const subRaces = useSubRaces();

    const [selectableSubRaces, setSelectableSubRaces] = useState<SubRace[]>([]);

    useEffect(() => {
        setSelectableSubRaces(subRaces.filter(f => race ? f.race?.code === race.code : true));
    }, [race, setSelectableSubRaces, subRaces]);

    return (
        <select key={Math.floor(Math.random() * 10000)} className='text-xs px-2 text-white rounded bg-gray-800 outline-transparent focus:outline-transparent w-full max-w-full' value={subRace?.code} onChange={(e) => onSubRaceChange?.(subRaces.find(r => r.code === e.target.value))}>
            {Object.entries(groupBy(selectableSubRaces, (r: Race) => r.source?.code ?? 'undefined')).sort(([source,]) => {
                if (source === 'PHB' || source === 'DMG') return -1;
                if (source === undefined || source === 'undefined' || source === '') return 1;
                return 0;
            }).map(([source, subRaces]) => {
                return (
                    <optgroup key={'subrace_' + source} label={sources.find(f => f.code === source)?.name ?? sources.find(f => f.code === source)?.originalName ?? 'Other'}>
                        {subRaces.map((subRace) => {
                            return(
                                <>
                                {subRace.code && <option key={'subrace_' + subRace.code + '_' + subRace.source?.id} value={subRace.code}>{subRace.name}</option>}
                                </>
                            )
                        })}
                    </optgroup>
                )
            })}
        </select>
    )
}
