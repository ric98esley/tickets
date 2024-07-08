<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
const router = useRouter()

const { $pb } = useNuxtApp()

const toast = useToast()

definePageMeta({
  layout: 'auth'
})

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
})

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<any>) {
  try {
    await $pb.collection('users').authWithPassword(
      event.data.email,
      event.data.password,
    );
    router.push('/')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Correo o contraseña incorrectos',
      color: 'red'
    })
    console.error(error)
  }
}
</script>

<template>
  <UCard class="w-72 h-72">
    <template #header>
      <h2 class="text-lg font-light">Bienvenido</h2>
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Correo" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Contraseña" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UButton type="submit" class="w-full">
        Entrar
      </UButton>
    </UForm>
  </UCard>
</template>