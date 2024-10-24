import type { Agent, AgentCreate, AgentFind, AgentResponse } from "~/types/agents";

interface FoundAgents {
  rows: Agent[];
  total: number;
}

const expand = 'group,zone';

const makeFilter = (data: AgentFind): string => {
  let filters = '';

  if (data.name) filters = constructQuery(filters, `name~"${data.name}"`);
  if (data.code) filters = constructQuery(filters, `code~"${data.code}"`);

  if (data.query) filters = constructQuery(filters, `name~"${data.query}" || code~"${data.query}"`);

  if (data.phone) filters = constructQuery(filters, `phone="${data.phone}"`);
  if (data.inChargeOf) filters = constructQuery(filters, `inChargeOf="${data.inChargeOf}"`);
  if (data.address) filters = constructQuery(filters, `address~"${data.address}"`);
  if (data.group) filters = constructQuery(filters, `group.name~"${data.group}" `);
  if (data.zone) filters = constructQuery(filters, `zone.name~"${data.zone}"`);

  return filters;
}


export const useFindAgents = async (data: AgentFind): Promise<FoundAgents> => {
  try {

    const filter = makeFilter(data);

    const { $pb } = useNuxtApp();
    const res = await $pb.collection<AgentResponse>('agents').getList(data.page ?? 1, data.limit ?? 10, {
      sort: '-created',
      expand,
      filter
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

export const useFindAgentById = async (id: string): Promise<Agent | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<AgentResponse>('agents').getOne(id, {
      expand
    });

    return agentMapper(res);
  } catch (error) {
    return undefined;
  }
}

export const useCreateAgent = async (data: AgentCreate): Promise<Agent | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<AgentResponse>('agents').create(data, {
      expand
    }
    );

    return agentMapper(res);
  } catch (error) {
    const toast = useToast();

    toast.add({
      title: 'Error al crear la agencia',
      description: 'Por favor, intenta nuevamente',
    })
    return undefined;
  }
}

export const useUpdateAgent = async (id: string, data: AgentCreate): Promise<Agent | undefined> => {
  try {
    const { $pb } = useNuxtApp();
    const res = await $pb.collection<AgentResponse>('agents').update(id, data, {
      expand
    });

    return agentMapper(res);
  } catch (error) {
    const toast = useToast();

    toast.add({
      title: 'Error al actualizar la agencia',
      description: 'Por favor, intenta nuevamente',
    })
    return undefined;
  }
}

export const useDeleteAgent = async (id: string): Promise<boolean> => {
  try {
    const { $pb } = useNuxtApp();
    await $pb.collection<AgentResponse>('agents').delete(id);

    return true;
  } catch (error) {
    const toast = useToast();

    toast.add({
      title: 'Error al eliminar la agencia',
      description: 'Por favor, intenta nuevamente',
    })
    return false;
  }
}