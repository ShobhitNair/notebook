import React from 'react'
import AddNote from './AddNote'
import AllNotes from './AllNotes'

const Home = () => {
  return (
    <div className='container'>
        <AddNote/>
        <AllNotes/>
    </div>
  )
}

export default Home