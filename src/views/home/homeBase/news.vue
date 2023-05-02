<template>
  <div class="news">
    <header>
      <div class="right">
        <span class="title">资讯信息</span>
        <span class="description">资讯/公告</span>
      </div>
      <div class="left" @click="goNewsRoute">
        <span> 查看全部 </span>
        <right-outlined />
      </div>
    </header>

    <div class="news-content">
      <div class="news-item" v-for="item in 4" :key="item" @click="goNewsDetailRoute">
        <div class="left"><file-text-filled style="color:#fb6e23;"/></div>
        <div class="right">
          <div class="title">今日好价：猪肉价格跌破历史新低！！！</div>
          <div class="time">— 2020.06.21</div>
          <div class="article">
            合作共创，凝聚未来，一年一度的春季运动会将于04.18号正式开幕，活动将持续1个月，请注意时间水水水水。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goNewsDetailRoute = () => {
  router.push('/newsDetail');
};

const goNewsRoute=()=>{
  router.push('/news');
}
</script>

<style lang="less" scoped>
.news {
  margin-top: 35px;
}

.news-content {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;

  .news-item {
    width: 590px;
    border: 1px solid #fff;
    height: 118px;
    background-color: white;
    padding: 15px;
    display: flex;
    cursor: pointer;
    transition: 0.3s all;
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

  .news-item:hover {
    .title {
      color: #fb6e23;
    }
    border: 1px solid #fb6e23;
    box-shadow: 0 2px 6px 0 #0000000a, 0 4px 16px 0 #0000000d;
  }
}
</style>
