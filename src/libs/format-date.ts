import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDate(dateToFormat: Date) {
  return formatDistanceToNow(dateToFormat, {
    locale: ptBR,
    addSuffix: true
  })
}