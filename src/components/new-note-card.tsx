export function NewNoteCard() {
  return (
    <div className='bg-zinc-700 rounded-md p-5 space-y-3'>
      <span className='text-sm font-medium text-zinc-200'>
        Adicionar nota
      </span>

      <p className='text-sm leading-6 text-zinc-400'>
        Grave uma nota em áudio que será convertida para texto automaticamente.
      </p>
    </div>
  )
}