<template>
  <div class="poem-manage">
    <!-- 搜索框 -->
    <div class="search-block">
      <el-input
        class="search-input"
        placeholder="输入诗词id"
        prefix-icon="el-icon-search"
        v-model="poemId"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词名"
        prefix-icon="el-icon-search"
        v-model="poemTitle"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词作者"
        prefix-icon="el-icon-search"
        v-model="poemAuthor"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词朝代"
        prefix-icon="el-icon-search"
        v-model="poemDynasty"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词相关内容"
        prefix-icon="el-icon-search"
        v-model="poemContent"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词注释"
        prefix-icon="el-icon-search"
        v-model="poemComment"
      ></el-input>
      <el-input
        class="search-input"
        placeholder="输入诗词类别"
        prefix-icon="el-icon-search"
        v-model="category"
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
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        icon="el-icon-info"
        icon-color="red"
        title="确定删除这些数据吗？"
        @confirm="handleDeleteBatch()"
        style="margin: 10px"
      >
        <el-button type="danger" icon="el-icon-remove-outline" slot="reference">
          批量删除
        </el-button>
      </el-popconfirm>
      <!-- <el-button type="primary" icon="el-icon-upload2"> 导入 </el-button>
      <el-button type="primary" icon="el-icon-download"> 导出 </el-button> -->
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="poemId" label="ID" width="100" sortable>
      </el-table-column>
      <el-table-column prop="poemTitle" label="诗词标题" width="200" sortable>
      </el-table-column>
      <el-table-column prop="poemAuthor" label="诗人" width="120" sortable>
      </el-table-column>
      <el-table-column prop="poemDynasty" label="朝代" width="100" sortable>
      </el-table-column>
      <el-table-column prop="poemContent" label="内容" sortable>
      </el-table-column>
      <el-table-column prop="poemComment" label="注释"> </el-table-column>
      <el-table-column prop="category" label="分类"> </el-table-column>
      <el-table-column class="table-opt" align="center">
        <template slot-scope="scope">
          <!-- 如果表格宽度大于300，则展示带文字的按钮，否则展示只带图标的按钮 -->
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="handleEditDialog(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @confirm="handleDelete(scope.row)"
            style="margin-left: 10px"
          >
            <el-button type="danger" icon="el-icon-delete" slot="reference">
              删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出编辑对话框 -->
    <el-dialog title="诗词信息" :visible.sync="dialogFormVisible" width="40%">
      <el-form>
        <el-form-item label="诗词标题" :label-width="formLabelWidth">
          <el-input v-model="editPoem.poemTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="诗人" :label-width="formLabelWidth">
          <el-input v-model="editPoem.poemAuthor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="朝代" :label-width="formLabelWidth">
          <el-input
            v-model="editPoem.poemDynasty"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            v-model="editPoem.poemContent"
            autocomplete="off"
            type="textarea"
            :rows="8"
          ></el-input>
        </el-form-item>
        <el-form-item label="注释" :label-width="formLabelWidth">
          <el-input
            v-model="editPoem.poemComment"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input v-model="editPoem.category" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditUser()">取 消</el-button>
        <el-button type="primary" @click="saveEditPoem()">确 定</el-button>
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
  </div>
</template>

<script>
export default {
  name: "PoemManage",
  data() {
    return {
      pageName: "诗词管理",
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
      poemId: "",
      poemTitle: "",
      poemAuthor: "",
      poemDynasty: "",
      poemContent: "",
      poemComment: "",
      category: "",
      dialogFormVisible: false,
      //用来绑定新增和编辑框
      editPoem: {
        // 初始值
        poemId: "",
        poemTitle: "",
        poemAuthor: "",
        poemDynasty: "",
        poemContent: "",
        poemComment: "",
        category: "",
      },

      formLabelWidth: "80px",
      //多选信息存储
      multipleSelection: [],
    };
  },
  methods: {
    //加载表格数据
    loadTable() {
      //   向后端发送请求
      this.request
        .get("/poem/getAllPoemByPage", {
          params: {
            pageSize: this.pageSize,
            current: this.currentPage,
            poemId: this.poemId,
            poemTitle: this.poemTitle,
            poemAuthor: this.poemAuthor,
            poemDynasty: this.poemDynasty,
            poemContent: this.poemContent,
            poemComment: this.poemComment,
            category: this.category,
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
      this.poemId = "";
      this.poemTitle = "";
      this.poemAuthor = "";
      this.poemComment = "";
      this.poemDynasty = "";
      this.poemContent = "";
      this.category = "";
      this.loadTable();
    },
    //新增窗口
    handleAddDialog() {
      this.dialogFormVisible = true;
      this.editPoem = {};
    },
    //保存新增
    saveEditPoem() {
      this.$nextTick(() => {
        console.log(this.editPoem);
        this.dialogFormVisible = false;
      });
    },
    // 取消修改
    cancelEditUser() {
      this.dialogFormVisible = false;
    },
    //修改用户
    handleEditDialog(row) {
      console.log(row);
      this.editPoem = row;
      this.dialogFormVisible = true;
    },
    //删除诗词
    handleDelete(row) {
      this.request.delete("/poem/" + row.poemId).then((res) => {
        if (res) {
          this.$message.success("删除成功!");
        } else {
          this.$message.error("删除失败!");
        }
        this.loadTable();
      });
    },
    //多选表单
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //多选删除
    handleDeleteBatch() {
      let ids = this.multipleSelection.map((v) => v.poemId);
      if (ids == false) {
        this.$message.error("未选中数据!");
        return;
      }
      console.log(ids);
      this.request.delete("/poem/deleteBatch", { data: ids }).then((res) => {
        console.log(res);
        if (res) {
          this.$message.success("删除成功!");
        } else {
          this.$message.error("删除失败!");
        }
        this.loadTable();
      });
    },
  },
  created() {
    this.loadTable();
  },
};
</script>

<style scoped>
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