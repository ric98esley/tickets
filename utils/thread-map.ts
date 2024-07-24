import type { Thread, ThreadResponse } from "~/types";

export const threadEntityMapper = (data: ThreadResponse): Thread => {
  let createdBy = undefined
  let inResponseTo = undefined

  if (data.expand.createdBy) createdBy = userMapper(data.expand.createdBy)
  if (data.expand.inResponseTo) inResponseTo = threadEntityMapper(data.expand.inResponseTo)

  return {
    id: data.id,
    created: new Date(data.created),
    updated: new Date(data.updated),
    content: data.content,
    inResponseTo: inResponseTo,
    ticket: data.ticket,
    createdBy: createdBy
  }
}
