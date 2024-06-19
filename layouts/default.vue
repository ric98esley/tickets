<template>
  <div class="flex flex-col">
    <Header />
      <UContainer as="main" class="overflow-y-auto p-4 w-screen">
        <slot />
      </UContainer>
  </div >
</template>