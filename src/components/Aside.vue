<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <el-menu
      ref="menu"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <div>
        <router-link to="/admin/home/charts" class="menu-title">
          <img class="menu-logo" src="../assets/logo.png" alt="图片丢失" />
          <span v-show="!isCollapse">后台管理系统</span>
        </router-link>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="/admin/home/user">用户信息管理</el-menu-item>
          <el-menu-item index="/admin/home/user_comment"
            >用户注释管理</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span slot="title">诗词管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="/admin/home/poem">诗词信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "a-side",
  props: {
    isCollapse: Boolean,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleToHome() {
      this.$router.push("/admin/home/charts");
    },
  },
};
</script>

<style scoped>
.menu-title {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: steelblue;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
.menu-logo {
  width: 50px;
  height: 50px;
}
</style>