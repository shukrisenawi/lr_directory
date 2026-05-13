import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src="/assets/idxi-fish-logo.png" alt="IDXI fish mark" />;
}
