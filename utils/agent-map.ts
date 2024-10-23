import type { Agent, AgentResponse } from "~/types/agents";

export const agentMapper = (res: AgentResponse): Agent => {
  const group = res.expand?.group ? groupMapper(res.expand.group) : undefined;

  const zone = res.expand?.zone ? zoneMapper(res.expand.zone) : undefined;

  return {
    id: res.id,
    name: res.name,
    code: res.code,
    phone: res.phone,
    inChargeOf: res.inChargeOf,
    group: group,
    zone: zone,
    facade: res.facade,
    created: res.created,
    updated: res.updated,
  }
}