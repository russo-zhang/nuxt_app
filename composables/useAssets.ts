// composables/useAssets.ts
export function useAssets() {
    const images = computed<Record<string, { default: string }>>(() =>
        import.meta.glob("~/assets/**/*.(png|jpeg|svg)", { eager: true })
    );

    const useAssetsImage = (src: string): string | undefined => {
        console.log("images.value:", images.value);
        for (const path in images.value) {
            const image = images.value[path].default;
            console.log("image:", image);
            console.log("assets/${src}:", `assets/${src}`);
            if (path.endsWith(`assets/${src}`)) return image;
        }
        return undefined;
    };

    return {
        useAssetsImage,
    };
}
