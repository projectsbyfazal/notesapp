import React, { useState } from 'react';
import './style.css';
import NoteItem from './NoteItem';

function getLocalNotes(){
    const data = JSON.parse(localStorage.getItem('localNotes'));

    if(data.length>0)
        return data;
    else
        return [];
}

const Notes = () => {

    const [noteData, setNoteData] = useState(getLocalNotes());
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [noteId, setNoteId] = useState(-1);

    // add new note
    const addNewNote = () => {
        if(title.length>0 && note.length>0){
            const date = new Date();
            let month = date.getMonth();

            switch(month){
                case 0: month = "Jan"; break;
                case 1: month = "Feb"; break;
                case 2: month = "Mar"; break;
                case 3: month = "April"; break;
                case 4: month = "May"; break;
                case 5: month = "June"; break;
                case 6: month = "July"; break;
                case 7: month = "Aug"; break;
                case 8: month = "Sep"; break;
                case 9: month = "Oct"; break;
                case 10: month = "Nov"; break;
                case 11: month = "Dec"; break;

                default: month = "No month selected";
            }

            const dataobj = [
                {
                    id: new Date().getTime(), 
                    title: title,
                    desc: note,
                    date: `${month} ${date.getDate()}, ${date.getFullYear()}`
                },
                ...noteData
            ];

            localStorage.setItem('localNotes', JSON.stringify(dataobj));
            setNoteData(dataobj);
            setTitle('');
            setNote('');
        }
    }

    // Delete particular note
    const deleteNote = (id) => {
        if(window.confirm('do you really want to delete this note?')){
            const newNoteData = noteData.filter((data) => data.id !== id );
            localStorage.setItem('localNotes', JSON.stringify(newNoteData));
            setNoteData(newNoteData);
        }
    }

    // open updating note with data
    const updateNote = (id) => {
        const updatingData = noteData.filter((data) => data.id === id );
        setTitle(updatingData[0].title);
        setNote(updatingData[0].desc);
        setNoteId(id);
    }

    // save updated changes
    const saveChanges = (id) => {
        const newNoteData = noteData.map((data) => {
            if(data.id === id){
                data.title = title;
                data.desc = note;
            }
            return data;
        });

        localStorage.setItem('localNotes', JSON.stringify(newNoteData));
        setNoteData(newNoteData);
        setTitle('');
        setNote('');
    }

    // Read note data
    const readFull = (id) => {
        const showingData = noteData.filter((data) => data.id === id );
        setTitle(showingData[0].title);
        setNote(showingData[0].desc);
    }
  return (
    <div>
        <div className="container mt-4">
            <div className="row justify-content-md-start justify-content-center flex-wrap">
                <div className="col-md-3 shadow col-11 mb-3 text-center bg-light p-4 rounded d-flex justify-content-center align-items-center notecard" data-bs-toggle="modal" data-bs-target="#addModal">
                    <div>
                        <i className="bi bi-plus-circle-dotted"></i>
                        <h4>Add new note</h4>
                    </div>
                </div>

                {/* Modal to add new note */}
                <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="title" className='fw-bold'>Add Heading</label>
                                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} id='title' placeholder='add title..' className='form-control mb-3 field shadow' required/>
                            </div>
                            <div>
                                <label htmlFor="desc" className='fw-bold'>Add Note</label>
                                <textarea className='form-control field shadow' value={note} onChange={(e)=> setNote(e.target.value)} id='desc' placeholder='type your note here..' rows="5" required></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button className="btn button" disabled={title.length>0 && note.length>0 ? false : true} onClick={addNewNote} data-bs-dismiss="modal">Save Note</button>
                        </div>
                    </div>
                </div>
                </div>


                {/* Modal to update note */}
                <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        {/* <form onSubmit={(e) => e.preventDefault }> */}
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="title" className='fw-bold'>Update Heading</label>
                                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} id='title' placeholder='add title..' className='form-control mb-3 field shadow' required/>
                                </div>
                                <div>
                                    <label htmlFor="desc" className='fw-bold'>Update Note</label>
                                    <textarea className='form-control field shadow' value={note} onChange={(e)=> setNote(e.target.value)} id='desc' placeholder='type your note here..' rows="5" required></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button className="btn button" data-bs-dismiss="modal" onClick={() => saveChanges(noteId)}>Save Changes</button>
                            </div>
                    </div>
                </div>
                </div>

                
                {/* Modal to show full note details */}
                <div className="modal fade" id="detailModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLabel">{title}</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => { setTitle(''); setNote(''); } } aria-label="Close"></button>
                    </div>
                       <p className='p-3 fs-5'>{note}</p>
                    </div>
                </div>
                </div>


                {
                    noteData.map((data) => {
                        return (
                            <NoteItem data={data} deleteNote={deleteNote} updateNote={updateNote} readFull={readFull} key={data.id} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Notes;
