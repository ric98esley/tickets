<script setup lang="ts">
const userStore = useUserStore()
const { $pb } = useNuxtApp()
const router = useRouter()


const colorMode = useColorMode()

const username = ref(userStore.user?.name)
const userAvatar = ref(userStore.user?.avatar)

const isOpen = ref(false)

const logout = async () => {
  $pb.authStore.clear()
  userStore.logout()
  await router.push('/login')
}

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const links = reactive([{
  label: username.value ?? 'Usuario',
  avatar: {
    src: userAvatar.value ?? 'https://i.pravatar.cc/150?img=68',
  },
  badge: 100,
  click: () => isOpen.value = false
}, {
  label: 'Nuevos',
  icon: 'i-heroicons-ticket-solid',
  to: '/',
  click: () => isOpen.value = false
}, {
  label: 'Status',
  icon: 'i-heroicons-queue-list-16-solid',
  to: `/status`,
  click: () => isOpen.value = false
},{
  label: 'Tickets',
  icon: 'i-heroicons-ticket-solid',
  to: '/tickets',
  click: () => isOpen.value = false
},
{
  label: 'rutas',
  icon: 'i-heroicons-truck-solid',
  to: '/rutas',
  click: () => isOpen.value = false
},
{
  label: 'Usuarios',
  icon: 'i-heroicons-users-solid',
  to: '/usuarios',
  click: () => isOpen.value = false
}
])

const items = [
  [{
    label: 'Perfil',
    avatar: {
      src: userAvatar.value ?? 'https://i.pravatar.cc/150?img=68',
    }
  }], [{
    label: 'Mis tickets',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => {
      navigateTo(`/mine/tickets`)
    }
  }], [{
    label: 'Salir',
    icon: 'i-heroicons-arrow-left-start-on-rectangle-16-solid',
    click: logout,
  }]
]

</script>

<template>
  <header class="flex-col min-h-12">
    <div class="flex justify-between border-b border-gray-200 dark:border-gray-800 min-h-12">
      <UButton icon="i-heroicons-bars-3-16-solid" class="md:hidden pl-4" size="sm" color="primary" square variant="link"
        @click="isOpen = true" />
      <UHorizontalNavigation :links="links" class="hidden md:flex" />
      <div class="flex content-center pr-4">
        <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" variant="ghost"
          aria-label="Theme" @click="isDark = !isDark" />
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton size="md" square variant="ghost" trailing-icon="i-heroicons-cog-6-tooth" />
        </UDropdown>
      </div>
    </div>
    <USlideover v-model="isOpen" side="left">
      <UCard class="flex flex-col flex-1"
        :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between overflow-y-auto">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Menu
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>
        <UVerticalNavigation :links="links" class="w-full md:hidden" :ui="{
          label: 'truncate relative text-gray-900 dark:text-white flex-initial w-32 text-left'
        }" />
      </UCard>
    </USlideover>
  </header>
</template>
