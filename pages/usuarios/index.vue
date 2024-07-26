<script setup lang="ts">
import type { User, UserFind } from '~/types';

const route = useRoute()
const router = useRouter()

const filters = reactive<UserFind>({
  limit: route.query.limit ? Number(route.query.limit) : 10,
  page: route.query.page ? Number(route.query.page) : 1,
  username: route.query.username as string || undefined,
  name: route.query.name as string || undefined,
  email: route.query.email as string || undefined,
  role:  route.query.role as string || undefined,
})


const users = reactive<{rows: User[], total: number}>({
  rows: [],
  total: 0
})

const getUser = async () => {
  const { rows, total} = await useFindUser(filters)
  users.rows = rows
  users.total = total
}


watch(filters, async (data) => {
  const query = { ...data }
  router.push({
    path: '/usuarios',
    query //always isClosed will be a string ignore the type
  })
  await getUser()
})

onMounted(async () =>  {
  await getUser()
})

</script>

<template>
  <UContainer>
    <UserTable :data="users.rows" v-model:filters="filters" :total="users.total"/>
  </UContainer>
</template>