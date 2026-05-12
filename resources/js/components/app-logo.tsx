import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[var(--idxi-deep-ocean)] to-[var(--idxi-current)] shadow-sm">
                <AppLogoIcon className="size-5 object-contain text-white" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-[var(--idxi-abyss)]">IDXI Directory</span>
                <span className="truncate text-xs text-[var(--idxi-tide)]">Infofish supplier network</span>
            </div>
        </>
    );
}
