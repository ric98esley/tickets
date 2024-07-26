<script setup lang="ts">
import type { User } from '~/types';


const users = reactive<{rows: User[], total: number}>({
  rows: [],
  total: 0
})

const getUser = async () => {
  const { rows, total} = await useFindUser({})
  users.rows = rows
  console.log(rows)
  users.total = total
}

onMounted(async () =>  {
  await getUser()
})

</script>

<template>
  <UContainer>
    <UserTable :data="users.rows" />
  </UContainer>
</template>