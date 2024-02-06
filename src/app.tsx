import logoNLW from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

const note = {
  date: new Date(),
  content: 'Hello World'
}

export function App() {
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
        <NewNoteCard />

        <NoteCard note={note} />
        <NoteCard note={{
          date: new Date(),
          content: 'Note card'
        }} />
      </div>
    </div>
  )
}

