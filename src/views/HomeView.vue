<template>
  <div class="home">
    <!-- <poem-card></poem-card> -->
    <div class="recommend">
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
          v-for="(item, index) in this.rec_detail.content"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <!-- 标签 -->
      <div class="rec_tag_wrap">
        <div
          class="rec_tag"
          v-for="(item2, index2) in this.matchTags"
          :key="index2"
        >
          {{ item2 }}
        </div>
      </div>
    </div>

    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
    <poem-card> </poem-card>
  </div>
</template>

<style scoped>
.home {
  height: auto;
  /* display: grid; */
  /* align-items: center; */
  /* place-items: center; */
  width: 100%;
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


<script>
import PoemCard from "@/components/PoemCard.vue";
export default {
  components: { PoemCard },
  name: "HomeView",
  data() {
    return {
      rec_detail: {},
      matchTags: {},
    };
  },
  methods: {},
  //在创建前获取今日推荐诗词
  beforeCreate() {
    this.jinrishici.load((result) => {
      // console.log(result);
      this.rec_detail = result.data.origin;
      this.matchTags = result.data.matchTags;
      // console.log(this.rec_detail);
      // console.log(this.matchTags);
    });
  },
};
</script>