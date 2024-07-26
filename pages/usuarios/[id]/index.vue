<script setup lang="ts">
import type { User } from '~/types';


const users = reactive<{rows: User[], total: number}>({
  rows: [],
  total: 0
})

</script>

<template>
  <UContainer>
    <UserTable :data="users.rows" />
  </UContainer>
</template>