
import { useAlignments } from "~/hooks/dnd/useAlignments";
import type { Alignment } from "~/models/dnd/alignment";

export default function AlignmentSelect({ alignment, onAlignmentChange }: { alignment?: Alignment, onAlignmentChange: (alignment: Alignment | undefined) => void }) {
    const alignments = useAlignments();

    return (
        <select className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={alignment?.code} onChange={(e) => onAlignmentChange(alignments.find(f => f.code === e.target.value))}>
            {alignments.map(alignment => {
                return (
                    <option key={'alignment_' + alignment.code} value={alignment.code}>{alignment.name ?? alignment.originalName}</option>
                )
            })}
        </select>
    )
}
