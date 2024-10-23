<script setup lang="ts">
const modal = useModal()
const props = defineProps({
  title: {
    type: String,
    default: 'Confirmación'
  },
  message: {
    type: String,
    default: '¿Estás seguro de realizar esta acción?'
  },
})
const emit = defineEmits(['close', 'submit'])

const handleSubmit = () => {
  emit('submit')
  modal.close()
}

const handleCancel = () => {
  emit('close')
  modal.close()
}
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="text-lg font-semibold flex justify-between">
          <h2>{{ props.title }}</h2>
          <UButton @click="handleCancel" icon="i-heroicons-x-mark-16-solid" variant="link" />
        </div>
      </template>
      <p>{{ props.message }}</p>
      <template #footer>
        <div class="space-x-4 flex justify-end">
          <UButton color="red" @click="handleSubmit">Aceptar</UButton>
          <UButton @click="handleCancel">Cancelar</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>