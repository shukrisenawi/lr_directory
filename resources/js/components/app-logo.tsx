import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md border border-sidebar-border">
                <AppLogoIcon className="size-6 object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">IDXI Directory</span>
                <span className="text-muted-foreground truncate text-xs">Infofish supplier network</span>
            </div>
        </>
    );
}
