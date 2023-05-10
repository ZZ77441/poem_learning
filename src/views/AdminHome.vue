<template>
  <div class="admin-home">
    <el-container class="el-container">
      <el-aside
        width="collapse"
        style="background-color: rgb(238, 241, 246); height: 100vh"
        :collapse-transition="true"
        v-bind:class="{
          'is-collapse': isCollapse,
        }"
      >
        <el-menu
          ref="menu"
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <div class="menu-title">
            <span>后台管理系统</span>
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">诗词管理</span>
          </el-menu-item>
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
          <!-- 搜索框 -->
          <div class="search-block">
            <el-input
              class="search-input"
              placeholder="输入用户id"
              prefix-icon="el-icon-search"
              v-model="userId"
            ></el-input>
            <el-input
              class="search-input"
              placeholder="输入用户名"
              prefix-icon="el-icon-search"
              v-model="username"
            ></el-input>
            <el-input
              class="search-input"
              placeholder="输入用户昵称"
              prefix-icon="el-icon-search"
              v-model="nickname"
            ></el-input>
            <el-input
              class="search-input"
              placeholder="输入用户邮箱"
              prefix-icon="el-icon-search"
              v-model="email"
            ></el-input>
            <el-input
              class="search-input"
              placeholder="输入用户手机号"
              prefix-icon="el-icon-search"
              v-model="phone"
            ></el-input>
            <el-button
              type="primary"
              class="search-btn"
              icon="el-icon-search"
              @click="handleSearch()"
            >
              搜索
            </el-button>
            <el-button
              type="warning"
              class="search-btn"
              icon="el-icon-refresh"
              @click="handleReset()"
            >
              重置
            </el-button>
          </div>
          <!-- 操作框 -->
          <div class="opt-block">
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="handleAddDialog()"
            >
              新增
            </el-button>
            <el-button type="danger" icon="el-icon-remove-outline">
              删除
            </el-button>
            <el-button type="primary" icon="el-icon-upload2"> 导入 </el-button>
            <el-button type="primary" icon="el-icon-download"> 导出 </el-button>
          </div>
          <!-- 表格框 -->
          <el-table
            :data="tableData"
            stripe
            border
            :header-cell-style="{ background: 'rgb(240,240,256)' }"
            :fit="true"
            size="medium"
            ref="table"
          >
            <el-table-column prop="userId" label="ID" width="100">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="nickname" label="用户昵称">
            </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column class="table-opt" align="center">
              <template slot-scope="scope">
                <!-- 如果表格宽度大于300，则展示带文字的按钮，否则展示只带图标的按钮 -->
                <el-button
                  type="success"
                  icon="el-icon-edit"
                  @click="handleEditDialog(scope.row)"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete"> 删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 弹出编辑对话框 -->
          <el-dialog
            title="用户信息"
            :visible.sync="dialogFormVisible"
            width="25%"
          >
            <el-form>
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input
                  v-model="editUser.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                :label-width="formLabelWidth"
                v-show="showPassword"
              >
                <el-input
                  v-model="editUser.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input
                  v-model="editUser.nickname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input
                  v-model="editUser.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input
                  v-model="editUser.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveEditUser()"
                >确 定</el-button
              >
            </div>
          </el-dialog>

          <!-- 分页按钮 -->
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
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
      tableData: [],
      //数据总数
      total: 0,
      //页面大小
      pageSize: 10,
      //页面数量
      pageNum: 1,
      //当前页
      currentPage: 1,
      // 阈值，代表表格宽度小于该值时显示图标按钮
      threshold: 300,
      //这一段数据用来绑定搜索框
      userId: "",
      username: "",
      nickname: "",
      email: "",
      phone: "",
      dialogFormVisible: false,
      //用来绑定新增和编辑框
      editUser: {
        // 初始值
        username: "",
        password: "",
        nickname: "",
        email: "",
        phone: "",
      },
      formLabelWidth: "80px",
      showPassword: true,
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
      this.$nextTick(() => {
        this.$refs.menu.collapse = this.isCollapse;
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //加载表格数据
    loadTable() {
      //向后端发送请求
      this.request
        .get("/admin/getAllUserByPage", {
          params: {
            pageSize: this.pageSize,
            current: this.currentPage,
            userId: this.userId,
            username: this.username,
            nickname: this.nickname,
            email: this.email,
            phone: this.phone,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.records;
          this.total = res.total;
          this.pageNum = res.pages;
          this.pageSize = res.size;
          this.currentPage = res.current;
        });
    },
    // 分页按钮
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadTable();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadTable();
    },
    //搜索按钮
    handleSearch() {
      this.loadTable();
    },
    //重置按钮
    handleReset() {
      this.userId = "";
      this.username = "";
      this.nickname = "";
      this.email = "";
      this.phone = "";
      this.loadTable();
    },
    //新增窗口
    handleAddDialog() {
      this.dialogFormVisible = true;
      this.editUser = {};
    },
    //保存新增用户
    saveEditUser() {
      this.showPassword = true;
      this.request.post("/admin", this.editUser).then((res) => {
        console.log(this.editUser);
        console.log(res);
        if (res) {
          this.$message.success("保存成功！");
        } else {
          this.$message.error("保存失败！");
        }
      });
      this.dialogFormVisible = false;
    },
    //修改用户
    handleEditDialog(row) {
      console.log(row);
      this.editUser = row;
      this.dialogFormVisible = true;
      this.showPassword = false;
    },
  },
  created() {
    this.loadTable();
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

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}

/* 搜索框容器 */
.search-block {
  margin: 10px 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

/* 输入框样式 */
.search-input {
  width: 200px;
  margin-right: 10px;
}

/* 搜索按钮样式 */
.search-btn {
  margin-left: 10px;
  min-width: 80px;
}

.opt-block {
  margin: 10px 0;
}
</style>