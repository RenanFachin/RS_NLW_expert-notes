import * as Dialog from '@radix-ui/react-dialog'
import { formatDate } from '../libs/format-date'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}


export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='bg-zinc-800 rounded-md p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-zinc-600 text-left outline-none focus-visible:ring-2 focus-visible:ring-lime-400 flex flex-col'>
        <span className='text-sm font-medium text-zinc-300'>
          {
            formatDate(note.date)
          }
        </span>

        <p className='text-sm leading-6 text-zinc-400'>
          {note.content}
        </p>

        {/* Gradiente */}
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-black/0 pointer-events-none' />
      </Dialog.Trigger>


      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full bg-zinc-700 rounded-md flex flex-col outline-none md:h-[60vh] overflow-hidden'>
          <Dialog.Close className='absolute right-0 top-0 bg-zinc-800 p-1.5 outline-none text-zinc-400 hover:text-zinc-100'>
            <X className='size-5' />
          </Dialog.Close>


          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className='text-sm font-medium text-zinc-300'>
              {
                formatDate(note.date)
              }

            </span>

            <p className='text-sm leading-6 text-zinc-400'>
              {note.content}
            </p>
          </div>


          <button
            className='w-full bg-zinc-800 py-4 text-center text-sm text-zinc-300 outline-none font-medium group'
            type='button'
          >
            Deseja <span className='text-red-400 group-hover:underline group-hover:text-red-500'>apagar essa anotação</span>?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}