import { groupBy } from "~/helpers/dnd/utils";
import useClasses from "~/hooks/dnd/useClasses";
import useSources from "~/hooks/dnd/useSources";
import type { LifeClass } from "~/models/dnd/lifeClass";


export default function ClassSelect({ characterClass, onClassChange }: { characterClass?: LifeClass, onClassChange: (newClass: LifeClass|undefined) => void }) {
    const sources = useSources();
    const classes = useClasses();
    
    return (
        <select className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={characterClass?.code} onChange={(e) => onClassChange(classes.find(r => r.code === e.target.value))}>
            {Object.entries(groupBy(classes, (r: LifeClass) => r.source?.code ?? 'undefined')).sort(([source,]) => {
                if (source === 'PHB' || source === 'DMG') return -1;
                if (source === undefined || source === 'undefined' || source === '') return 1;
                return 0;
            }).map(([source, classes]) => {
                return (
                    <optgroup key={'classgroup_' + source} label={sources.find(f => f.code === source)?.name ?? sources.find(f => f.code === source)?.originalName ?? 'Other'}>
                        {classes.map(lifeClass => {
                            return (
                                <option key={'class_' + lifeClass.code + '_' + lifeClass.source?.id} value={lifeClass.code}>{lifeClass.name}</option>
                            );
                        })}
                    </optgroup>
                )
            })}
        </select>
    )
}
