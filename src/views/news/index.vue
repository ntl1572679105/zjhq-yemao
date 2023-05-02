<template>
  <div class="page">
    <topHeaderVue></topHeaderVue>
    <topNavVue></topNavVue>
    <img src="@/assets/images/Home/banner_info@2x.png" alt="" style="width: 100%; height: 360px" />
    <div class="content">
      <div class="news-item" v-for="item in 8" :key="item" @click="goNewsDetailRoute">
        <div class="left"><file-text-filled /></div>
        <div class="right">
          <div class="title">今日好价：猪肉价格跌破历史新低！！！</div>
          <div class="time">— 2020.06.21</div>
          <div class="article">
            合作共创，凝聚未来，一年一度的春季运动会将于04.18号正式开幕，活动将持续1个月，请注意时间水水水水。
          </div>
        </div>
      </div>
    </div>
    <bottomVue></bottomVue>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import topHeaderVue from '../home/topHeader/index.vue';
import topNavVue from '../home/topNav/index.vue';
import bottomVue from '../home/bottom/index.vue';


const router=useRouter()
const goNewsDetailRoute=()=>{
    router.push('/newsDetail')
}
</script>

<style lang="less" scoped>
.page {
  background-color: #f6f6f6;
}
.content {
  width: 1200px;
  margin: 0 auto;
  min-height: 565px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 25px 0;
  .news-item {
    width: 590px;
    height: 120px;
    background-color: white;
    padding: 15px;
    display: flex;
    cursor: pointer;
    .left {
      width: 30px;
    }

    .right {
      width: 530px;
      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title {
        font-size: 16px;
        font-weight: 700;
      }

      .time {
        margin-top: 5px;
        color: #00000073;
      }

      .article {
        margin-top: 10px;
      }
    }
  }

  .news-item:hover .title {
    color: #fb6e23;
  }
}
</style>
