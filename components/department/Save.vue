<script lang="ts" setup>
const props = defineProps({
  form: {
    type: Object,
    default: () => ({
      name: ''
    }),
  },
})

const state = reactive({
  name: props.form.name ?? '',
})

const emit = defineEmits(['submit'])

const handlerSubmit = async () => {
  emit('submit', state)
}

</script>

<template>
  <UForm :state="state" class="space-y-4">
    <UFormGroup name="name" label="Nombre">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup name="submit">
      <UButton @click="handlerSubmit" type="submit">Guardar</UButton>
    </UFormGroup>
  </UForm>
</template>