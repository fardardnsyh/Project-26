import { useState, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE, DELETE_NOTE } from '../../utils/mutations';
import { QUERY_SINGLE_APP } from '../../utils/queries'

import './assets/style.css';

import Button from '../Button';
import TextArea from '../TextArea';

type Note = {
    _id: string,
    noteText: string
}

interface NoteProp {
    appId: string | undefined,
    notes: Note[]
}


const Notes = ({ notes, appId }: NoteProp) => {
    const [noteText, setNoteText] = useState('');
    const [isDisabledClass, setIsDisabledClass] = useState('disabled');
    const [addNote] = useMutation(ADD_NOTE, {
        update(cache, { data: { addNote } }) {
            try {
                cache.updateQuery({
                    query: QUERY_SINGLE_APP, 
                    variables: {
                        id: appId
                    }
                }, ({ app }) => ({
                    app: {
                        ...app,
                        notes: app.notes
                    }
                }))
            } catch (e) {
                console.error(e);
            }
        }
    });

    const [deleteNote] = useMutation(DELETE_NOTE, {
        update(cache, { data: { deleteNote } }) {
            try {
                cache.updateQuery({
                    query: QUERY_SINGLE_APP,
                    variables: {
                        id: appId
                    }
                }, ({ app }) => ({
                    app: {
                        ...app,
                        notes: app.notes
                    }
                }))
            } catch (e) {
                console.error(e)
            }
        }
    })

    const submitNote = async () => {
        await addNote({ variables: { noteText, appId } });
        setNoteText('');
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        if(!value.length) setIsDisabledClass('disabled');
        if(value.length) setIsDisabledClass('');
        setNoteText(value);
    };

    const handleDeleteNote = async (noteId: string) => {
        await deleteNote({
            variables: {
                noteId,
                appId
            }
        })
    }

    return (
        <>
            <h3 className="text-2xl mb-2">Notes</h3>
            <div>
                {(notes && notes.length > 0) ? (notes.map((note: Note, i: number) => (
                    <ul key={i} className="px-5">
                        <li className="list-disc mb-3 flex justify-between">
                            <p>{note.noteText}</p>
                            <span className="close-note-btn" onClick={() => handleDeleteNote(note._id)}>x</span>
                        </li>
                    </ul>
                ))) : (<p className='text-md font-bold my-3'>no notes yet :(</p>)}
            </div>
            <div className="flex flex-col">
                <TextArea
                    placeholder='take notes...'
                    onChange={handleChange}
                    value={noteText}
                    labelText=''
                ></TextArea>
                <Button
                text="Add Note."
                classes={`blue ml-auto mt-4 ${isDisabledClass}`}
                onClick={submitNote}
                type='button'
                ></Button>
            </div>
        </>
    );
}

export default Notes;