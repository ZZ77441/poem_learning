<template>
  <div class="admin-home">
    <el-container class="el-container">
      <!-- 侧边栏 -->
      <el-aside
        width="collapse"
        style="background-color: rgb(238, 241, 246); height: 100vh"
        :collapse-transition="true"
        v-bind:class="{
          'is-collapse': isCollapse,
        }"
      >
        <a-side :isCollapse="isCollapse"></a-side>
      </el-aside>
      <el-container>
        <!-- 顶部导航 -->
        <el-header style="font-size: 12px; display: flex; align-items: center">
          <div style="font-size: 18px; flex: 1">
            <span
              :class="collapaseBtnClass"
              style="cursor: pointer"
              @click="collapse"
            >
            </span>
            <!-- 页签 -->
            <el-breadcrumb
              class="el-breadcrumb"
              separator-class="el-icon-arrow-right"
            >
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-dropdown style="margin-left: auto; cursor: pointer">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <span>王小虎</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      //侧边栏收缩按钮图表
      collapaseBtnClass: "el-icon-s-fold",
      isCollapse: false,
    };
  },
  methods: {
    //侧边栏收缩按钮函数
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.collapaseBtnClass = "el-icon-s-unfold";
      } else {
        this.collapaseBtnClass = "el-icon-s-fold";
      }
      // this.$nextTick(() => {
      //   this.$refs.menu.collapse = this.isCollapse;
      // });
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-breadcrumb {
  display: inline-block;
  margin-left: 20px;
  height: 100%;
}

.el-breadcrumb /deep/ .el-breadcrumb__inner {
  color: #333;
}
</style>