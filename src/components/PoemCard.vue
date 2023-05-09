<template>
  <!-- 诗词卡片 -->
  <div class="poem-card">
    <!-- 标题 -->
    <div class="title-wrap">
      <h2 class="title">标题</h2>
      <div class="option">
        <span>译</span>
        <span>背</span>
      </div>
    </div>
    <!-- 作者 -->
    <div class="author">作者</div>
    <!-- 诗词内容 -->
    <div class="content-wrap">
      <div class="content">
        这是一首诗，这是一首诗，这是一首诗，这是一首诗。
      </div>
      <div class="content">
        这是一首诗，这是一首诗，这是一首诗，这是一首诗。
      </div>
      <div class="content">
        这是一首诗，这是一首诗，这是一首诗，这是一首诗。
      </div>
      <div class="content">
        这是一首诗，这是一首诗，这是一首诗，这是一首诗。
      </div>
    </div>
    <!-- 标签 -->
    <div class="tag-wrap">
      <div class="tag">标签</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PoemCard",
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
}
</style>
