import useBackgrounds from "~/hooks/dnd/useBackgrounds";
import type { Background } from "~/models/dnd/background";

export default function BackgroundSelect({ background, onBackgroundChange }: { background: Background | undefined, onBackgroundChange: (size: Background | undefined) => void }) {
    const backgrounds = useBackgrounds();

    return (
        <select className='bg-slate-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={background?.code} onChange={(e) => onBackgroundChange(backgrounds.find(f => f.code === e.target.value))}>
            {backgrounds.map(background => {
                return (
                    <option key={'size_' + background.code} value={background.code}>{background.name ?? background.originalName}</option>
                )
            })}
        </select>
    )
}
