<template>
  <!-- 诗词卡片 -->
  <div class="poem-card">
    <!-- 标题 -->
    <div class="title-wrap">
      <h2 class="title" v-highlight="keyword">{{ poem.poemTitle }}</h2>
      <div class="option">
        <span @click="showTranslate()">译</span>
        <span @click="showRecite()">背</span>
        <span @click="userStar()" :class="starIcon"></span>
      </div>
    </div>
    <!-- 作者 -->
    <div
      class="author"
      style="cursor: pointer"
      @click="handleToBaidu"
      v-highlight="keyword"
    >
      {{ poem.poemAuthor + "(" + poem.poemDynasty + ")" }}
    </div>
    <!-- 诗词内容 -->
    <div class="content-wrap">
      <div class="content" v-for="(item, index) in content" :key="index">
        <span v-highlight="keyword">{{ item }}</span>
        <el-collapse-transition>
          <div class="content-translate" v-show="isShowTrans">
            <!-- 这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里是翻译这里 -->
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!-- 标签 -->
    <div class="tag-wrap">
      <div class="tag" v-for="(item, index) in poemTag" :key="index">
        {{ item }}
      </div>
      <div class="tag">{{ poem.category }}</div>
    </div>

    <!-- 背诵窗口 -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="700px"
      center
      title="古诗背诵"
      v-dialogDrag
    >
      <div class="recite-wrap">
        <div
          class="recite-content"
          v-for="(item, index) in reciteContent"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <el-input
        placeholder="输入缺失的字，空格分隔。"
        v-model="inputRecite"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRecite()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 收藏窗口 -->
    <div class="star-dialog">
      <el-dialog
        :visible.sync="starDialogVisible"
        width="700px"
        center
        v-dialogDrag
        :modal="false"
        class="pointer"
        title="收藏注释"
      >
        <div class="star-wrap">
          <el-input
            v-model="userComment.content"
            type="textarea"
            :rows="2"
            placeholder="请输入内容,可为空"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelStar()">取 消</el-button>
          <el-button type="primary" @click="submitStar()">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoemCard",
  props: {
    poem: Object,
    keyword: String,
    AllStar: Boolean,
  },
  directives: {
    //设置搜索框相同内容高亮
    highlight: {
      bind(el, binding) {
        let keyword = binding.value;
        let regex = new RegExp(keyword, "g");
        el.innerHTML = el.innerHTML.replace(
          regex,
          `<span style="color: red;">${keyword}</span>`
        );
      },
    },
  },
  data() {
    return {
      content: [],
      reciteContent: [],
      poemTag: [],
      isShowTrans: false,
      dialogFormVisible: false,
      poemForm: {},
      formLabelWidth: "120px",
      reciteBlank: [],
      inputRecite: "",
      starIcon: "el-icon-star-off",
      starDialogVisible: false,
      userComment: {
        userId: "",
        poemId: "",
        type: "",
        content: "",
      },
    };
  },
  watch: {
    poemChange(oldPoem, newPoem) {
      console.log(oldPoem, newPoem);
    },
  },
  mounted() {
    if (this.AllStar) {
      this.starIcon = "el-icon-star-on";
    }
  },
  created() {
    let data = this.poem.poemContent;
    this.content = JSON.parse(data);
    this.poemTag = JSON.parse(this.poem.poemComment);
  },
  methods: {
    handleToBaidu() {
      let url = "https://baike.baidu.com/item/" + this.poem.poemAuthor;
      window.open(url, "_blank");
    },
    showTranslate() {
      this.request
        .get("/trans?content=" + "五陵射雕客，走马占春光。")
        .then((res) => {
          console.log(res);
          JSON.parse(res);
          let unicode = res.trans_result.dst;
          console.log(unicode);
          let text = unescape(unicode.replace(/\\u/g, "%u"));
          console.log(text);
        });
      this.isShowTrans = !this.isShowTrans;
    },
    showRecite() {
      this.dialogFormVisible = true;
      // console.log(this.content);
      this.filteredContent();
      console.log(this.reciteContent);
      console.log(this.reciteBlank);
    },
    // 随机为每句去掉一个字
    filteredContent() {
      let arr = this.content;
      for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        const removeIndex = Math.floor(Math.random() * str.length); // 随机选择要删除的字符的位置
        this.reciteBlank[i] = str[removeIndex];
        const result =
          str.slice(0, removeIndex) + "__" + str.slice(removeIndex + 1); // 将选定位置的字符替换为下划线
        this.reciteContent[i] = result;
      }
    },
    // 验证是否正确
    submitRecite() {
      let words = this.inputRecite.split(" ");
      console.log(words);
      const isSame = this.reciteBlank.every((elem, index) => {
        return elem === words[index]; // 检查每个元素是否相同
      });
      console.log(isSame);
      if (isSame) {
        this.$message.success("回答正确！");
        this.dialogFormVisible = false;
      } else {
        this.$message.warning("似乎有错哦！");
      }
    },
    //用户收藏
    userStar() {
      if (localStorage.getItem("user") === null) {
        this.$message.error("请先登录！");
        this.$router.push("/login");
        return;
      }
      if (this.starIcon == "el-icon-star-on") {
        this.starIcon = "el-icon-star-off";
      } else {
        this.starIcon = "el-icon-star-on";
        this.starDialogVisible = true;
      }
    },
    cancelStar() {
      this.starIcon = "el-icon-star-off";
      this.starDialogVisible = false;
    },
    submitStar() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.userComment.userId = user.userId;
      this.userComment.poemId = this.poem.poemId;
      console.log(this.userComment);
      this.request.post("/user/starComment", this.userComment).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.$message.success("收藏成功！");
        } else {
          this.$message.error("系统错误！");
        }
      });
      this.starDialogVisible = false;
    },
  },
};
</script>

<style scoped>
.poem-card {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  padding: 20px;
  background-color: rgb(240, 239, 226);
  border: 1px solid #d7d5bc;
  border-radius: 5px;
  min-height: 200px; /* 设置最小高度，防止内容过少时出现奇怪的效果 */
  width: 680px;
  margin: 20px auto;
}

.title-wrap {
  display: flex;
  align-items: center;
  position: relative;
}

.title {
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: steelblue;
}

.option {
  display: inline-block;
  position: absolute;
  right: 10px;
  display: flex;
  flex-direction: row;
}

.option > span {
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  background-color: rgb(190, 220, 240);
  height: 30px;
  width: 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option > span:hover {
  background-color: #f5f5f5; /* 鼠标悬停时的背景色 */
}

.author {
  font-size: 18px;
  color: #999;
  margin-bottom: 20px;
}

.content-wrap {
  margin: 10px 0;
}

.content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.recite-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
}

.recite-content {
  display: inline-block;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
  font-weight: bold;
  font-family: KaiTi;
}

.content-translate {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 2px;
  color: green;
}

.tag-wrap {
  display: block;
}

.tag {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f2f2;
  color: #666;
  padding: 4px 8px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}

/* .star-dialog > .el-dialog__wrapper {
  pointer-events: none;
  /deep/ .el-dialog {
    pointer-events: auto;
  }
} */

.pointer {
  pointer-events: auto !important;
}
</style>
