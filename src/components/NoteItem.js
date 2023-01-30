import React from 'react'

const NoteItem = (props) => {
  return (
    <div className="col-md-3 col-11 mb-3 shadow bg-light p-4 rounded notecard d-flex align-content-between flex-wrap">

        <div className='w-100 showNote' title='click to show full note' onClick={() =>props.readFull(props.data.id)} data-bs-toggle="modal" data-bs-target="#detailModal">
          <h3>{props.data.title}</h3>
          <p style={{wordBreak: 'break-word'}}>{props.data.desc.length>100 ? props.data.desc.slice(0, 100) + "..." : props.data.desc}</p>
          
        </div>

        <div className='w-100'>
          <hr />
          <div className='d-flex justify-content-between align-items-center'>
            <div>{props.data.date}</div>
            <div>
              <i className="bi bi-trash-fill fs-4 ms-2" onClick={() => props.deleteNote(props.data.id)} title='Delete Note'></i>
              <i className="bi bi-pencil-square fs-4 ms-2" title='Update Note' onClick={() => props.updateNote(props.data.id)} data-bs-toggle="modal" data-bs-target="#updateModal"></i>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NoteItem
