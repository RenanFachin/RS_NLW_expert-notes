export function NoteCard() {
  return (
    <div className='bg-zinc-800 rounded-md p-5 space-y-3 overflow-hidden relative'>
      <span className='text-sm font-medium text-zinc-300'>
        há 2 dias
      </span>

      <p className='text-sm leading-6 text-zinc-400'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate autem architecto enim praesentium, saepe recusandae quisquam est porro commodi dolores omnis expedita ex quibusdam iusto soluta delectus repellendus? Odit, facere.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate autem architecto enim praesentium, saepe recusandae quisquam est porro commodi dolores omnis expedita ex quibusdam iusto soluta delectus repellendus? Odit, facere.
      </p>

      {/* Gradiente */}
      <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-black/0 pointer-events-none' />
    </div>
  )
}