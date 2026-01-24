import { useState } from "react";
import { Logo } from "./Logo";
import { useNavigate } from "react-router-dom";
import { SetTheme } from "./SetTheme";
import { UserHeaderDropdown } from "./user/UserHeaderDropdown";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {

    const {data, isLoading} = useAuth();
    const navigate = useNavigate();
    const [dark, setDark] = useState(true);

    return (
        <header
            className={`flex flex-col justify-between bg-(--content) border-b-1 border-(--border) px-4 text-white`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div onClick={() => navigate('/')} className="cursor-pointer" ><Logo dark={dark} /> </div>
                    
                    {/* <h1 onClick={() => navigate('/')} className="cursor-pointer hidden sm:block text-3xl text-(--white)">Valkyrie <span className="font-thin text-xs">v0.0.1</span></h1> */}
                </div>

                {/* 
                <button onClick={() => setExpand(expand => !expand)} className={`hover:bg-(--hover) cursor-pointer p-2 rounded-full`}><ArrowLineDownIcon size={23} className="fill-(--white)" /></button>
                */}

                <div className="flex gap-2 items-center">
                    { !isLoading && <p className='invisible sm:visible flex items-center gap-2 text-xs text-(--white)/50'> <span className='w-2 h-2 rounded-full bg-(--success)'></span> { data?.name } { data?.lastname } // { data?.email } </p> }
                    <SetTheme dark={dark} setDark={setDark} />
                    {/**
                     * <div className="hover:bg-(--hover) cursor-pointer p-2 rounded-full"><BellIcon size={23} className="fill-(--white)" /></div>
                     * <div className="hover:bg-(--hover) cursor-pointer p-2 rounded-full"><GearIcon size={23} className="fill-(--white)" /></div>
                     */}
                    <UserHeaderDropdown />
                </div>
            </div>
        </header>
    )
}

export default Header;