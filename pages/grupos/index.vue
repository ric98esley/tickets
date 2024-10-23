<script lang="ts" setup>
import { GroupModal } from '#components';
import type { Group, GroupCreate } from '~/types/groups';

const modal = useModal()
const route = useRoute()
const router = useRouter()

const modals = reactive({
  create: false
})

const groups = reactive<{
  rows: Group[]
  total: number
}>({
  rows: [],
  total: 0
})

const filters = reactive({
  query: route.query.query ? String(route.query.query) : '',
  limit: route.query.limit ? Number(route.query.limit) : 10,
  page: route.query.page ? Number(route.query.page) : 1,
})

const getGroups = async () => {
  try {
    const data = await useFindGroup(filters)
    groups.rows = data.rows
    groups.total = data.total
  } catch (error) {
    console.error(error)
  }
}

const createGroups = async (data: GroupCreate) => {
  try {
    await useCreateGroup(data)
    getGroups()
  } catch (error) {
    console.error(error)
  }
}

watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/grupos',
    query,
  })
})

const createModal = () => {
  modal.open(GroupModal, {
    onSubmit: async (data) => {
      createGroups(data)
      await getGroups()
    },
  })
}

onMounted(() => {
  getGroups()
})
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex">
          <h1 class="text-2xl font-bold">Grupos</h1>
          <UButton @click="createModal" class="ml-auto">Crear</UButton>
        </div>
      </template>
      <UInput v-model="filters.query" placeholder="Buscar por nombre o código" @change="getGroups" />
      <GroupTable :data="groups.rows" :filters="filters" :total="groups.total" @refresh="getGroups"></GroupTable>
    </UCard>
  </UContainer>
</template>