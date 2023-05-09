<template>
  <!-- 最外层的大盒子 -->
  <div class="login">
    <div class="container right-panel-active">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <!-- 注册表 -->
        <el-form
          ref="registerForm"
          action="#"
          class="form"
          id="form1"
          :rules="rules"
          :model="user"
        >
          <h2 class="form__title">注册账号</h2>
          <!-- 用户名 -->
          <el-form-item prop="username" class="el-item-input">
            <el-input
              type="text"
              placeholder="用户名"
              class="input"
              v-model="user.username"
            />
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email" class="el-item-input">
            <el-input
              type="email"
              placeholder="邮箱"
              class="input"
              v-model="user.email"
            />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" class="el-item-input">
            <el-input
              type="password"
              placeholder="密码"
              class="input"
              v-model="user.password"
            />
          </el-form-item>
          <el-button class="btn" @click="userRegister">注册</el-button>
        </el-form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <el-form
          ref="loginForm"
          action="#"
          class="form"
          id="form2"
          :rules="rules"
          :model="user"
        >
          <h2 class="form__title">欢迎登录</h2>
          <el-form-item prop="username" class="el-item-input">
            <el-input
              type="text"
              placeholder="用户名"
              class="input"
              v-model="user.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="el-item-input">
            <el-input
              type="password"
              placeholder="密码"
              class="input"
              v-model="user.password"
              show-password
            />
          </el-form-item>
          <a href="#" class="link">忘记密码?</a>
          <el-button class="btn" @click="userLogin">登录</el-button>
        </el-form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <el-button class="btn" id="signIn">已有账号，直接登录</el-button>
          </div>
          <div class="overlay__panel overlay--right">
            <el-button class="btn" id="signUp">没有账号，点击注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
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
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      user: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    userLogin() {
      this.$nextTick(() => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 执行登录逻辑
            //向后端发送请求
            this.request.post("/user/login", this.user).then((res) => {
              if (res.code === "200") {
                console.log(res);
                //将用户信息存储到浏览器中
                localStorage.setItem("user", JSON.stringify(res.data));
                this.$message.success("登录成功");
                this.$router.push("/");
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
    userRegister() {
      this.$nextTick(() => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 执行登录逻辑
            //向后端发送请求
            this.request.post("/user/register", this.user).then((res) => {
              if (res.code === "200") {
                console.log(res);
                //将用户信息存储到浏览器中
                localStorage.setItem("user", JSON.stringify(res.data));
                this.$message.success("注册成功");
                this.$router.push("/");
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
  mounted() {
    //绑定鼠标点击，通过控制css"right-panel-active"控制动画
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const fistForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");

    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    fistForm.addEventListener("submit", (e) => e.preventDefault());
    secondForm.addEventListener("submit", (e) => e.preventDefault());
  },
};
</script>

<style scoped>
/* css变量vue中无法使用 */
:root {
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;
  --button-radius: 0.7rem;
  --max-width: 758px;
  --max-height: 420px;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.login {
  /* display: grid;
  background-color: #e9e9e9;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  place-items: center;
  align-items: center; */
  align-items: center;
  background-color: rgb(225, 224, 199);
  /* background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg"); */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 680px;
  width: 800px;
  place-items: center;
  margin: 60px auto auto auto;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: #333;
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}

.container {
  background-color: rgb(225, 224, 199);
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: 420px;
  max-width: 758px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: rgb(225, 224, 199);
  /* background: url("https://res.cloudinary.com/dbhnlktrv/image/upload/v1599997626/background_oeuhe7.jpg"); */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
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

.form {
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  /* background-color: #fff; */
  /* border: none; */
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
}
.input /deep/ .el-input__inner:focus {
  border-color: #000;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.22);
}
.el-item-input {
  width: 100%;
}
</style>>

<style>
/* keyframes放在scoped样式中可能会导致失效，单独准备一个 */
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
