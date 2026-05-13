export default function AppLogo() {
    return (
        <>
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white/8 ring-1 ring-white/15">
                <img src="/logo_white.png" alt="IDXI Directory" className="h-7 w-7 object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-white">IDXI Directory</span>
                <span className="truncate text-xs text-blue-300">Infofish supplier network</span>
            </div>
        </>
    );
}
