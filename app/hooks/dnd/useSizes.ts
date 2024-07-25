import * as de from '~/texts/dnd/de.json';
import * as sizes from '~/data/dnd/sizes.json';

export default function useSizes() {
    const sizesTranslations = de.sizes;

    return sizes.data.map((size) => {
        return {
            code: size.code,
            name: sizesTranslations[size.code as keyof typeof sizesTranslations],
            originalName: size.name,
            value: size.value,
        }
    });
}
