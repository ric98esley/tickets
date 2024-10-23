import type { Agent, AgentFind, AgentResponse } from "~/types/agents";

interface FoundAgents {
  rows: Agent[];
  total:  number;
}

const expand = 'group,zone';

export const useFindAgents = async (data: AgentFind): Promise<FoundAgents> => {
  try {
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<AgentResponse>('agents').getList(data.page ?? 1, data.limit ?? 10, {
      sort: '-created',
      expand
      });


    return {
      rows: res.items.map((item) => agentMapper(item)),
      total: res.totalItems
    }
  } catch (error) {
    return {
      rows: [],
      total: 0
    }
  }
}