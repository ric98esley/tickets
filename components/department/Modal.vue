<script lang="ts" setup>
import type { DepartmentCreate } from '~/types';


const modal = useModal()


const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      name: ''
    }),
  },
  department: {
    type: String,
  }
})

const emit = defineEmits(['submit'])

const state = reactive({
  name: props.form.name ?? '',
})

const handlerSubmit = async (data: DepartmentCreate) => {
  if(props.department){
    await useUpdateDepartment(props.department, data)
  }else{
    await useCreateDepartment(data)
  }
  emit('submit', state)
  modal.close()
}



</script>
<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h3>Departamento</h3>
          <UButton @click="modal.close()" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <DepartmentSave :form="state" @submit="handlerSubmit"/>
    </UCard>
  </UModal>
</template>