<template>
  <div class="user-person">
    <!-- 个人收藏 -->
    <div class="collect-wrap">
      <!-- <poem-card></poem-card> -->
      <div
        class="collect-content"
        v-for="(item, index) in starPoem"
        :key="index"
      >
        <poem-card
          :poem="item.poem"
          :keyword="null"
          :AllStar="true"
        ></poem-card>
        <p class="person-comment" v-if="item.content != null">
          个人注释：{{ item.content }}
        </p>
      </div>
    </div>
    <div class="user-opt">
      <span @click="setUserInfo">个人信息</span>
      <span @click="userLogout">退出登录</span>
    </div>
    <!-- 修改个人信息弹窗 -->
    <el-dialog
      :visible.sync="personDialogVisible"
      width="700px"
      center
      v-dialogDrag
      :modal="false"
      title="个人信息"
    >
      <el-form ref="userForm" :model="user" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser" class="btn"
            >保存</el-button
          >
          <el-button @click="cancelForm" class="btn">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UserPerson",
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
        email: "",
        phone: "",
      },
      personDialogVisible: false,
      poem: {
        poemTitle: "",
        poemAuthor: "",
        poemDynasty: "",
        poemContent: "",
        poemComment: "",
      },
      content: [],
      starPoem: {},
    };
  },
  methods: {
    cancelForm() {
      this.personDialogVisible = false;
    },
    updateUser() {
      this.personDialogVisible = false;
      this.request.post("/user/resetPassword", this.user).then((res) => {
        console.log(res);
      });
    },
    getUserStar() {
      let user = JSON.parse(localStorage.getItem("user"));
      let id = user.userId;
      this.request.get("/user/getUserStar?id=" + id).then((res) => {
        console.log(res);
        if (res.code === "200") {
          let starData = res.data;
          this.starPoem = starData;
        }
      });
    },
    setUserInfo() {
      this.personDialogVisible = true;
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    userLogout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
  created() {
    this.getUserStar();
  },
};
</script>

<style scoped>
.user-person {
  height: auto;
  /* display: grid; */
  /* align-items: center; */
  /* place-items: center; */
  width: 100%;
}

.user-person {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.collect-wrap {
  margin-bottom: 20px;
  margin-top: 80px;
}

.user-opt {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: rgba(93, 97, 70, 0.6);
  padding: 10px;
  border-radius: 4px;
}

.person-comment {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
  margin: 10px;
}

.user-opt span {
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
}

.btn {
  background-color: rgb(93, 97, 70);
  background-image: linear-gradient(90deg, rgb(93, 97, 70) 100%, #008997 0%);
  border-radius: 20px;
  border: 1px solid rgb(225, 224, 199);
  color: #e9e9e9;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
</style>