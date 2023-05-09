<template>
  <div class="admin-home">
    <el-container class="el-container">
      <el-aside
        :width="asideWidth + 'px'"
        style="background-color: rgb(238, 241, 246); height: 100vh"
        :collapse-transition="true"
        v-bind:class="{ 'is-collapse': isCollapse }"
      >
        <el-menu :collapse="isCollapse" unique-opened>
          <div class="menu-title">
            <b>后台管理系统</b>
          </div>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>
              <span> 导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span> 导航二</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span> 导航三</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 12px; display: flex">
          <div style="font-size: 18px; flex: 1">
            <span
              :class="collapaseBtnClass"
              style="cursor: pointer"
              @click="collapse"
            >
            </span>
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

        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      collapaseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      asideWidth: 200,
    };
  },
  methods: {
    //侧边栏收缩按钮函数
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.asideWidth = 60;
        this.collapaseBtnClass = "el-icon-s-unfold";
      } else {
        this.asideWidth = 200;
        this.collapaseBtnClass = "el-icon-s-fold";
      }
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

.menu-title {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: steelblue;
  font-size: 20px;
}
</style>