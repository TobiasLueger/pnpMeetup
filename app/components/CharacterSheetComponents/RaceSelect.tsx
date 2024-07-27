import { groupBy } from "~/helpers/dnd/utils";
import useRaces from "~/hooks/dnd/useRaces";
import useSources from "~/hooks/dnd/useSources";
import type { Race } from "~/models/dnd/race";


export default function RaceSelect({ race, onRaceChange }: { race?: Race, onRaceChange?: (race: Race | undefined) => void }) {
    const sources = useSources();
    const races = useRaces();
    return (
        <select className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={race?.code} onChange={(e) => onRaceChange?.(races.find(r => r.code === e.target.value))}>
            {Object.entries(groupBy(races, (r: Race) => r.source?.code ?? 'undefined')).sort(([source,]) => {
                if (source === 'PHB' || source === 'DMG') return -1;
                if (source === undefined || source === 'undefined' || source === '') return 1;
                return 0;
            }).map(([source, races], index) => {
                return (
                    <optgroup key={`racegroup_${source}_${index}`} label={sources.find(f => f.code === source)?.name ?? sources.find(f => f.code === source)?.originalName ?? 'Other'}>
                        {races.map((race, index) => {
                            return (
                                <option key={`race_${race.code}_${race.source?.id}_${index}`} value={race.code}>{race.name}</option>
                            );
                        })}
                    </optgroup>
                )
            })}
        </select>
    )
}
