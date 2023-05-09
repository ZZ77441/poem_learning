<template>
  <div class="admin-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AdminView",
};
</script>

<style scoped>
.admin-view {
  /* background-color: rgb(225, 224, 199); */
  height: auto;
  min-height: 100vh;
  width: 100%;
}
</style>