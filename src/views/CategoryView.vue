<template>
  <div class="category-view">
    <div class="category-nav">
      <div class="category-wrap">
        <div class="categories">
          <div
            class="btn"
            v-for="(item, index) in categories"
            :key="index"
            @click="handleBtnClick(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <h2 class="category-title"></h2>
    </div>

    <poem-view :poemDatas="this.catePoem"></poem-view>
  </div>
</template>

<script>
import PoemView from "./PoemView.vue";
export default {
  components: { PoemView },
  data() {
    return {
      categories: [
        "黯然神伤",
        "弹琴阅经",
        "得道修仙",
        "对酒当歌",
        "羁旅思乡",
        "金戈铁马",
        "静悟禅机",
        "鸟语花香",
        "山川巍峨",
        "世事变迁",
        "水天一色",
        "送别思旧",
        "田园躬耕",
        "心系国家",
        "云游四方",
      ], // 分类列表
      catePoem: [],
      key: "",
    };
  },
  methods: {
    handleBtnClick(item) {
      this.key = item;
      console.log(this.key);
      this.getCatePoem();
    },
    getCatePoem() {
      this.request.get("/poem/getCategory?key=" + this.key).then((res) => {
        console.log(res);
        this.catePoem = res.data;
      });
    },
  },
};
</script>

<style>
.category-view {
  margin-top: 80px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px; */
}

.category-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.category-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.categories .btn {
  background-color: #eaeaea;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.category-title {
  margin-bottom: 10px;
}
</style>