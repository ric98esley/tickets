<script setup lang="ts">
import { DepartmentModal } from '#components';
import type { Department } from '~/types';

const modal = useModal()
const router = useRouter()

const filters = reactive({
  id: '',
  name: '',
  limit: 10,
  page: 1,
})

const departments = reactive<{ rows: Department[], total: number }>({
  rows: [],
  total: 0,
})

const getDepartments = async () => {
  const data = await useFindDepartments(filters)
  departments.rows = data.rows
  departments.total = data.total

}

watch(filters, async (data) => {
  const query = { ...data }

  router.push({
    path: '/departamentos',
    query
  })
  getDepartments()
})


onMounted(() => {
  getDepartments()
})
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold">Departamentos</h1>
          <UButton @click="modal.open(DepartmentModal, {
            onSubmit: () => {
              getDepartments()
            }
          })">Crear</UButton>
        </div>
      </template>
      <DepartmentTable :data="departments.rows" :filters="filters" :total="departments.total"
        @refresh="getDepartments" />
    </UCard>
  </UContainer>
</template>