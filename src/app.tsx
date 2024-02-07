import { useState } from 'react'
import logoNLW from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'


interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>([])

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }


    setNotes([newNote, ...notes])
  }


  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6'>

      <img src={logoNLW} alt='nlw expert' />

      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-zinc-500'
        />
      </form>

      <div className='h-px bg-zinc-700' />


      <div className='grid grid-cols-3 auto-rows-notes gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {
          notes.map(note => {
            return (
              <NoteCard key={note.id} note={note} />
            )
          })
        }
      </div>
    </div>
  )
}

