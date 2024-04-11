import { useState } from "react"
import NoteContext from "./NoteContext"


const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const [notes, setNotes] = useState([])
  

    const getNotes = async()=>{
      try{
        const response = await fetch(`${host}/api/notes/allnotes`,
          {
            method: 'GET',
            headers:{
              'Content-Type' : 'application/json',
              'auth-token': localStorage.getItem('token')
            },
          })
            const json = await response.json()
            setNotes(json)

      }catch(error){
        console.error("Error fetching notes:", error)
      }
          
    }


      //Add Note
      const addNote = async(title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`,
        {
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        })
          const json = await response.json()
          console.log(json);
          setNotes(notes.concat(json))
      }

      const deleteNote = async(id)=>{
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')

          },
        })
          const json = await response.json();

        const newNote = notes.filter((note)=>note._id !== id);
        setNotes(newNote)
      }

      const editNote = async(id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`,
        {
          method: 'PUT',
          headers:{
            'Content-Type' : 'application/json',
            'auth-token': localStorage.getItem('token')

          },
          body: JSON.stringify({title,description,tag})
        })
          const json = await response.json()

          let newNotes = JSON.parse(JSON.stringify(notes))
          console.log(newNotes);

        for(let index=0; index < notes.length ; index++){
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes)
      }
    return(
        <NoteContext.Provider value={{notes , addNote, deleteNote ,getNotes, editNote}} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;