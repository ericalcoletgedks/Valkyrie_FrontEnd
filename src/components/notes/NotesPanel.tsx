import { NoteForm } from "./NoteForm"
import type { Note } from "@/types/index"
import { NoteDetail } from "./NoteDetail"

type PanelProps = {
    notes: Note[]
}

export const NotesPanel = ({ notes }: PanelProps) => {
    return (
        <>
            {/* <div className="    mt-3 flex items-center justify-between">
                <p>Task notes</p> <ArrowsClockwiseIcon />
            </div> */}

            {notes.length ? (
                <>
                    { notes.map((note) => <NoteDetail key={note._id} note={note} />) }
                </>
            ) : (
                <p className="mt-5 text-center text-sm text-(--white)/50">No notes yet</p>
            )}

            <NoteForm />
        </>
    )
}
