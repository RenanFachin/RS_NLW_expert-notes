import * as Dialog from '@radix-ui/react-dialog'

import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboard, setShouldShowOnboard] = useState<boolean>(true)
  const [content, setContent] = useState<string>('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboard(false)
  }

  function handleCloseEditor() {
    setShouldShowOnboard(true)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    // Armazenando o que está sendo digitado em uma variável
    setContent(event.target.value)


    // Quanto vazio o textarea, após já ter algo, fechar o modal
    if (event.target.value === '') {
      setShouldShowOnboard(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      toast.error('Não é possível cadastrar uma nota sem conteúdo.')
      return
    }

    onNoteCreated(content) // chamando a função que atualiza o state dentro da página app

    setContent('')
    setShouldShowOnboard(true)

    toast.success('Nota criada com sucesso!')

  }

  function handleStartRecording() {
    // Verificando se a APi do SpeechRecognition está disponível
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert("Infelizmente seu navegador não suporta a API de gravação")
      return
    }

    setIsRecording(true)
    setShouldShowOnboard(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      // preenchendo o textArea com o texto vindo do áudio
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')


      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition.stop()
    }

  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='bg-zinc-700 rounded-md p-5 gap-3 flex flex-col text-left focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-lime-600 outline-none'>
        <span className='text-sm font-medium text-zinc-200'>
          Adicionar nota
        </span>

        <p className='text-sm leading-6 text-zinc-400'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full bg-zinc-700 rounded-md flex flex-col outline-none h-[60vh] overflow-hidden'>
          <Dialog.Close onClick={handleCloseEditor} className='absolute right-0 top-0 bg-zinc-800 p-1.5 outline-none text-zinc-400 hover:text-zinc-100'>
            <X className='size-5' />
          </Dialog.Close>

          <form className='flex-1 flex flex-col'>

            <div className='flex flex-1 flex-col gap-3 p-5'>
              {
                shouldShowOnboard ? (
                  <>
                    <span className='text-sm font-medium text-zinc-300'>
                      Adicionar nota
                    </span>
                    <p className='text-sm leading-6 text-zinc-400'>
                      Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                    </p>
                  </>

                ) : (
                  <>
                    <button onClick={handleCloseEditor} className='text-sm font-medium text-red-400 text-left hover:text-red-500 '>
                      Cancelar nota
                    </button>

                    <textarea
                      autoFocus
                      className='text-sm leading-6 text-zinc-400 bg-zinc-900/20 rounded-md p-4 resize-none flex-1 outline-none'
                      onChange={handleContentChanged}
                      value={content}
                    />
                  </>
                )
              }
            </div>

            {
              isRecording ? (
                <button
                  className='w-full bg-slate-900 py-4 text-center text-sm text-zinc-300 outline-none font-medium hover:text-zinc-100 flex items-center justify-center gap-3'
                  type='button'
                  onClick={handleStopRecording}
                >
                  <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                  Gravando! (clique para interromper)
                </button>
              )
                :
                (
                  <button
                    className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
                    type='button'
                    onClick={handleSaveNote}
                  >
                    Salvar nota
                  </button>
                )
            }


          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}