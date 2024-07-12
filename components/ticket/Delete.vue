<script setup lang="ts">

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits({
  'success': (value: boolean) => true
})

const deleteModal = ref(false)

const handlerDelete = async () => {
  await useDeleteTicket(props.id)
  deleteModal.value = true
}

</script>

<template>
  <UModal v-model="deleteModal">
    <UCard>
      <template #header>
        ¿Seguro quieres eliminar el ticket?
      </template>
      <div>
        <div class="flex justify-end space-x-2">
          <UButton color="gray" @click="deleteModal = false">Cancelar</UButton>
          <UButton color="red" @click="handlerDelete">Eliminar</UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>