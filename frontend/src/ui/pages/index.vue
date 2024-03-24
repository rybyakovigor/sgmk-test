<template>
  <NuxtLayout name="main">
    <UsersTable
      :users="users"
      :get-all="userStore.getAll"
      :delete="userStore.delete"
      :update="userStore.update"
      :create="userStore.create"
      :upload-avatar="userStore.uploadAvatar"
      :delete-avatar="userStore.deleteAvatar"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUsersStore();
const { users } = storeToRefs(userStore);
await useAsyncData('users', () => userStore.getAll());
</script>
