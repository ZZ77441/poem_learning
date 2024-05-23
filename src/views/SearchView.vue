<template>
  <div class="search-view">
    <poem-card
      v-for="(item, index) in recomendPoem"
      :key="index"
      :poem="item"
    ></poem-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchPoem: {},
    };
  },
  methods: {},
};
</script>

<style>
</style>