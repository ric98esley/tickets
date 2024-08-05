export { TicketResponse, Ticket, TicketCreate, TicketUpdate, TicketResolve, FindTickets, FindTicketsKeys } from './tickets.d.ts'

export { User, UserFind, UserResponse } from './user.d.ts'

export { Status, StatusResponse, StatusCreate, StatusDelete, StatusFind, StatusUpdate } from './status.d.ts'


export { ThreadResponse, Thread, CreateThread} from './thread.d.ts'

export { Route, RouteResponse, RouteFind, RouteCreate, RouteUpdate } from './routes.d.ts'

export { DepartmentResponse, Department, DepartmentCreate, DepartmentUpdate, FindDepartment } from './department.d.ts'
declare global {
  interface DescriptionItem {
    icon: string
    title: string
    data: string
  }
}