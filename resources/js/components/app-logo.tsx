import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/20">
                <AppLogoIcon className="size-5 object-contain text-white" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-white">IDXI Directory</span>
                <span className="truncate text-xs text-blue-300">Infofish supplier network</span>
            </div>
        </>
    );
}
