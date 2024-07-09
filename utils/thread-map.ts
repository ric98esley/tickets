import type { Thread, ThreadResponse } from "~/types";

export const threadEntityMapper = (data: ThreadResponse): Thread => {
  let createdBy = undefined
  let inResponseTo = undefined

  if (data.expand.created_by) createdBy = userMapper(data.expand.created_by)
  if (data.expand.in_response_to) inResponseTo = threadEntityMapper(data.expand.in_response_to)

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
