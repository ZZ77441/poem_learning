<template>
  <div class="poem-view">
    <poem-card
      v-for="item in poemDatas"
      :key="item.poemId"
      :poem="item"
      :keyword="null"
    ></poem-card>
  </div>
</template>

<script>
export default {
  props: {
    poemDatas: Array,
  },
  watch: {
    poemDatasChange() {
      window.location.reload();
      return [...this.poemDatas];
    },
  },
};
</script>

<style>
.poem-view {
  width: 100%;
  height: auto;
}
</style>