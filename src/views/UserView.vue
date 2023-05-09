<template>
  <div class="user-view">
    <el-container class="el-container">
      <top-nav></top-nav>
      <router-view />
      <!-- <el-footer style="background-color: yellowgreen"></el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "UserVIew",
};
</script>

<style scoped>
.el-container {
  background-color: rgb(225, 224, 199);
  height: auto;
  min-height: 100vh;
}
</style>