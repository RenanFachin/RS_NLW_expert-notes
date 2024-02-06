interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}


export function NoteCard({ note }: NoteCardProps) {
  return (
    <button className='bg-zinc-800 rounded-md p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-zinc-600 text-left outline-none focus-visible:ring-2 focus-visible:ring-lime-400 flex flex-col'>
      <span className='text-sm font-medium text-zinc-300'>
        {note.date.toISOString()}
      </span>

      <p className='text-sm leading-6 text-zinc-400'>
        {note.content}
      </p>

      {/* Gradiente */}
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-black/0 pointer-events-none' />
    </button>
  )
}