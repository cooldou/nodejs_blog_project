<template>
  <div class="list">
    <div class="card" v-for="(item, index) in data" :key="item.id">
      <router-link :to="'/details/' + item.id">
        <p class="title">{{item.title}}</p>
      </router-link>
      <p class="date">{{descTime(item.create_time)}}</p>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },

    methods: {
      descTime (data) {
        return data ? dayjs(data).format('YYYY-MM-DD HH:mm') : ''
      }
    }

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
        font-family: Lora, 'Times New Roman', serif;
        color: #808080;
        margin-top: 20px;
      }
    }
  }
</style>