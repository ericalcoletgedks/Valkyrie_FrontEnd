import { useDroppable } from "@dnd-kit/core";
import { PlusCircleIcon } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"

export const DropTask = ({ status } : {status : string}) => {

    const navigate = useNavigate();
    const { isOver, setNodeRef } = useDroppable({
        id: status
    });

    const style = {
        opacity: isOver ? 0.4 : undefined
    };

    return (
        <>
            <div ref={setNodeRef} style={style} className="mt-3 border border-dashed hover:border-(--white)/50 h-14 border-(--border) bg-(--bg) transition-all rounded-lg overflow-y-auto">
                <div onClick={() => navigate('?newTask=true')} className="cursor-pointer flex h-full justify-center items-center">
                    <PlusCircleIcon weight="thin" className="fill-(--white)/50" size={40} />
                </div>
            </div>
        </>
    )
}
