import { MoonIcon } from '@phosphor-icons/react';
import React, { useEffect } from 'react'

type setThemeProps = {
    dark: boolean
    setDark: React.Dispatch<React.SetStateAction<boolean>>
};

export const SetTheme = ({ dark, setDark } : setThemeProps) => {

    useEffect(() => {
        if (dark) {
            setThemeDark();
        } else {
            setThemeWhite();
        }
    }, [dark]);

    const setThemeDark = () => {
        const root = document.documentElement;

        root.style.setProperty('--bg', '#000000');
        root.style.setProperty('--content', '#0A0A0A');
        root.style.setProperty('--border', '#2D2D2D');
        root.style.setProperty('--white', 'hsl(0 0% 95%)');
        root.style.setProperty('--black', '#000000');
        root.style.setProperty('--hover', '#1F1F1F');
    }

    const setThemeWhite = () => {
        const root = document.documentElement;

        root.style.setProperty('--bg', 'hsl(0 0% 100%)');
        root.style.setProperty('--content', 'hsl(0 0% 95%)');
        root.style.setProperty('--border', '#D0D0D0');
        root.style.setProperty('--white', '#000000');
        root.style.setProperty('--black', 'hsl(0 0% 95%)');
        root.style.setProperty('--hover', '#E0E0E0');
    }

    return (
        <div onClick={() => setDark(dark => !dark)} className="hover:bg-(--hover) cursor-pointer p-2 rounded-full"><MoonIcon size={23} className="fill-(--white)" weight={dark ? 'fill' : 'regular'} /></div>
    )
}
