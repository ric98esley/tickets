<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { ZoneCreate } from '~/types/zones';


const props = defineProps({
  form: {
    type: Object as PropType<ZoneCreate>,
    default: () => ({ name: '' })
  }
})

const emit = defineEmits({
  submit: (data: ZoneCreate) => true,
  'update:form': (value: ZoneCreate) => true
})

const state = reactive<{
  form: ZoneCreate
  loading: boolean
  error: any
}>({
  form: props.form,
  loading: false,
  error: null,
})

const validate = (state: ZoneCreate): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({ path: 'name', message: 'El nombre de la zona es requerido' })
  }
  return errors
}

const submit = (event: FormSubmitEvent<ZoneCreate>) => {
  emit('submit', event.data)
}

</script>

<template>
  <UForm :state="state.form" :validate="validate" class="space-y-4" @submit="submit">
    <UFormGroup label="Nombre" name="name">
      <UInput v-model="state.form.name" />
    </UFormGroup>
    <UButton type="submit">Guardar</UButton>
  </UForm>
</template>