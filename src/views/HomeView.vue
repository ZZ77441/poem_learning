<template>
  <div class="home">
    <div class="search-wrap">
      <el-input
        placeholder="请输入搜索关键字"
        class="el-input"
        v-model="keyword"
      ></el-input>
      <el-button type="primary" class="el-button" @click="searchPoem()"
        >搜索</el-button
      >
    </div>
    <!-- <poem-card></poem-card> -->
    <div class="recommend" v-show="rec_visible">
      <h2>每日推荐</h2>
      <!-- 标题 -->
      <div class="rec_title">{{ rec_detail.title }}</div>
      <!-- 作者 -->
      <div class="rec_author">
        {{ rec_detail.author + "(" + rec_detail.dynasty + ")" }}
      </div>
      <!-- 诗词内容 -->
      <div class="rec_content_wrap">
        <div
          class="rec_content"
          v-for="(item, index) in rec_detail.content"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <!-- 标签 -->
      <div class="rec_tag_wrap">
        <div class="rec_tag" v-for="(item2, index2) in matchTags" :key="index2">
          {{ item2 }}
        </div>
      </div>
    </div>

    <poem-card
      v-for="item in updatedRecomendPoem"
      :key="item.poemId"
      :poem="item"
      :keyword="keyword"
    ></poem-card>
  </div>
</template>



<script>
import PoemCard from "@/components/PoemCard.vue";
export default {
  components: { PoemCard },
  name: "HomeView",
  data() {
    return {
      rec_detail: {},
      matchTags: {},
      recomendPoem: [],
      searchResPoem: [],
      poem: {
        poemTitle: "",
        poemAuthor: "",
        poemDynasty: "",
        poemContent: "",
        poemComment: "",
        category: "",
      },
      keyword: "",
      rec_visible: true,
    };
  },
  methods: {
    getPoemRandom() {
      this.request.get("/poem/recommend").then((res) => {
        // console.log(res);
        if (res.code === "200") {
          this.recomendPoem = res.data;
          console.log(this.recomendPoem);
        } else {
          this.$message.error("数据加载错误！");
        }
      });
    },
    searchPoem() {
      if (this.keyword != null) {
        this.request
          .get("/poem/search", {
            params: {
              keyword: this.keyword,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.code === "200") {
              this.searchResPoem = res.data;
              this.recomendPoem = this.searchResPoem;
              this.$message.success("搜索成功！");
            } else {
              this.$message.error("数据加载错误！");
            }
          });
        this.rec_visible = false;
      }
    },
  },
  watch: {
    recomendPoem(newValue) {
      // 销毁上一次的 poem-card 组件
      this.prevRecomendPoemLength = 0;
      this.$nextTick(() => {
        // 使用 $nextTick 确保上一次的组件已经被销毁
        this.prevRecomendPoemLength = newValue.length;
      });
    },
  },
  computed: {
    highlightedKeyword() {
      let regex = new RegExp(this.keyword, "gi");
      return this.keyword
        ? this.keyword.replace(regex, '<span style="color: red;">$&</span>')
        : "";
    },
    updatedRecomendPoem() {
      return [...this.recomendPoem];
    },
  },
  //在创建前获取今日推荐诗词
  beforeCreate() {
    this.jinrishici.load((result) => {
      this.rec_detail = result.data.origin;
      this.matchTags = result.data.matchTags;
      //将内容转成json
      let contentJSON = JSON.stringify(this.rec_detail.content);
      this.poem.poemContent = contentJSON;
      this.poem.poemTitle = this.rec_detail.title;
      this.poem.poemAuthor = this.rec_detail.author;
      this.poem.poemDynasty = this.rec_detail.dynasty;
      this.poem.poemComment = JSON.stringify(this.matchTags);
      console.log(this.poem);
      this.request.post("/poem", this.poem).then((res) => {
        console.log(res);
      });
    });
  },
  created() {
    this.getPoemRandom();
  },
};
</script>

<style scoped>
.home {
  height: auto;
  /* display: grid; */
  /* align-items: center; */
  /* place-items: center; */
  width: 100%;
}

.search-wrap {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 80px;
  width: 100%;
  border-radius: 20px;
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); */
  justify-content: center;
}

.search-wrap .el-input {
  height: 40px;
  font-size: 14px;
  color: #333;
  border: none;
  outline: none;
  padding: 10px;
  width: 600px;
}

.search-wrap .el-button {
  height: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #fff;
  background-color: rgb(93, 97, 70);
  border-radius: 0 20px 20px 0;
  padding: 0 20px;
  cursor: pointer;
}

.search-wrap .el-button:hover {
  background-color: steelblue;
}

.recommend {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgb(240, 239, 226);
  border: 1px solid #d7d5bc;
  border-radius: 5px;
  min-height: 200px; /* 设置最小高度，防止内容过少时出现奇怪的效果 */
  width: 680px;
  margin: 60px auto 20px auto;
}

.rec_title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: steelblue;
}

.rec_author {
  font-size: 18px;
  color: #999;
  margin-bottom: 20px;
}

.rec_content_wrap {
  margin-bottom: 20px;
}

.rec_content {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.rec_tag_wrap {
  display: block;
}

.rec_tag {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f2f2;
  color: #666;
  padding: 4px 8px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
