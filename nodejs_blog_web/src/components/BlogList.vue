<template>
  <div class="list">
    <div class="card">
      <router-link :to="'/details/' + 1">
        <p class="title">nodejs教程</p>
      </router-link>
      <p class="date">2020-03-23</p>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.list {
  .card {
    margin-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 26px;
      font-weight: 600;
      color: #0085a1;
    }
    .date {
      font-style: italic;
      font-family: Lora, "Times New Roman", serif;
      color: #808080;
      margin-top: 20px;
    }
  }
}
</style>