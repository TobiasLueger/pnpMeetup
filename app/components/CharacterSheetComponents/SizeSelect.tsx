import useSizes from "~/hooks/dnd/useSizes";
import type { Size } from "~/models/dnd/size";


export default function SizeSelect({ size, onSizeChange }: { size: Size | undefined, onSizeChange: (size: Size | undefined) => void }) {
    const sizes = useSizes();

    return (
        <select className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={size?.code} onChange={(e) => onSizeChange(sizes.find(f => f.code === e.target.value))}>
            {sizes.map(size => {
                return (
                    <option key={'size_' + size.code} value={size.code}>{size.name ?? size.originalName}</option>
                )
            })}
        </select>
    )
}
