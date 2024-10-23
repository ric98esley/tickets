<script lang="ts" setup>
import type { GroupCreate } from '~/types/groups';

const props = defineProps({
  form: {
    type: Object as PropType<GroupCreate>,
    default: () => ({
      name: '',
      code: '',
      manager: '',
      phone: '',
    }),
  },
})

const emit = defineEmits(['submit'])


const form = ref<GroupCreate>({
  name: props.form.name || '',
  code: props.form.code || '',
  manager: props.form.manager || '',
  phone: props.form.phone || '',
})

const submit = async () => {
  emit('submit', form.value)
}

</script>

<template>
  <UForm :state="form" @submit="submit" class="space-y-4">
    <UFormGroup label="Nombre" name="name">
      <UInput v-model="form.name" label="Nombre" />
    </UFormGroup>
    <UFormGroup label="Código" name="code">
      <UInput v-model="form.code" label="Código" />
    </UFormGroup>
    <UFormGroup label="Encargado" name="manager">
      <UserSelect v-model="form.manager" label="Encargado" />
    </UFormGroup>
    <UFormGroup label="Teléfono" name="phone">
      <UInput v-model="form.phone" label="Teléfono" />
    </UFormGroup>
    <UButton type="submit">
      Guardar
    </UButton>
  </UForm>
</template>