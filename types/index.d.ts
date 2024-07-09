export { TicketResponse, Ticket } from './tickets.d.ts'

export { User } from './user.d.ts'

export { Status, StatusResponse, StatusCreate, StatusDelete, StatusFind, StatusUpdate } from './status.d.ts'


export { ThreadResponse, Thread, CreateThread} from './thread.d.ts'
declare global {
  interface DescriptionItem {
    icon: string
    title: string
    data: string
  }
}