<template>
  <!-- 顶部导航 -->
  <el-header class="el-header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgb(93,97,70)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3 class="head-title">
        <router-link to="/">古诗文网</router-link>
      </h3>
      <router-link to="/">
        <el-menu-item index="1" route="">推荐</el-menu-item>
      </router-link>
      <router-link to="/category">
        <el-menu-item index="2">分类</el-menu-item>
      </router-link>
      <!-- 
      <el-menu-item index="3">名句</el-menu-item>
      <el-menu-item index="4">作者</el-menu-item>
      <el-menu-item index="5">古籍</el-menu-item> -->
      <router-link to="/person">
        <el-menu-item index="6">我的</el-menu-item>
      </router-link>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-header {
  width: 100%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  position: fixed;
  top: 0;
}
.head-title {
  display: inline-block;
  margin-right: 20px;
}
.head-title a {
  text-decoration: none;
  outline: none;
  color: rgb(240, 239, 226);
}
.el-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>>
