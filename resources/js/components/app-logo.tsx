export default function AppLogo() {
    return (
        <>
            <img src="/logo_white.png" alt="IDXI Directory" className="h-9 w-9 object-contain" />
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-white">IDXI Directory</span>
                <span className="truncate text-xs text-blue-300">Infofish supplier network</span>
            </div>
        </>
    );
}
