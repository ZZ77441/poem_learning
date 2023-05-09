<template>
  <div class="admin-login">
    <!-- Sign In -->
    <div class="container__form container--signin">
      <el-form
        ref="loginForm"
        action="#"
        class="form"
        id="form"
        :rules="rules"
        :model="admin"
      >
        <h2 class="form__title">古诗文学习平台后台管理系统</h2>
        <el-form-item prop="username" class="el-item-input">
          <el-input
            type="text"
            placeholder="用户名"
            class="input"
            v-model="admin.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="el-item-input">
          <el-input
            type="password"
            placeholder="密码"
            class="input"
            v-model="admin.password"
            show-password
          />
        </el-form-item>
        <el-button class="btn" @click="adminLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdmimLogin",
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: "只能包含英文和数字",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9_-]+$/,
            message: "只能包含英文、数字和符号（_-）",
            trigger: "blur",
          },
        ],
      },
      admin: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    adminLogin() {
      this.$nextTick(() => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 执行登录逻辑
            //向后端发送请求
            this.request.post("/admin/login", this.admin).then((res) => {
              if (res.code === "200") {
                console.log(res);
                //将用户信息存储到浏览器中
                localStorage.setItem("admin", JSON.stringify(res.data));
                this.$message.success("登录成功");
                this.$router.push("/admin/home");
              } else {
                this.$message.error(res.msg);
              }
            });
          } else {
            this.$message.error("输入正确的用户名和密码！");
            // console.log(valid);
            return false;
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
  width: 100%;
}

.container__form {
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 360px;
  width: 500px;
}

.form__title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
}

.el-item-input {
  margin-bottom: 32px;
}

/* .input {
  width: 300px;
  border-radius: 4px;
  border: none;
  background-color: #f8f8f8;
  padding: 12px;
  box-shadow: 0px 1px 2px #00000029;
  color: #333;
  font-size: 16px;
} */

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

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
  background: rgb(93, 97, 70);
  border-color: #4e342e;
  color: #e9e9e9;
}

.btn:focus {
  outline: none;
  background: rgb(93, 97, 70);
  border-color: #4e342e;
  color: #e9e9e9;
}

.btn:hover {
  color: #e9e9e9;
  border-color: #4e342e;
}

.btn:checked {
  color: #e9e9e9;
  background: rgb(93, 97, 70);
  border-color: #4e342e;
}

.el-form-item__error {
  color: #f56c6c;
  font-size: 14px;
}
</style>