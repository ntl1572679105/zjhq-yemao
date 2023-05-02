<template>
  <div class="hot">
    <header>
      <div class="right">
        <img src="@/assets/images/Home/home_icon_1@2x.png" style="width: 50px; height: 50px" />
        <span class="title">热门推荐</span>
      </div>
      <div class="left">
        <span> 查看全部 </span>
        <right-outlined />
      </div>
    </header>

    <div class="content">
      <div class="hot-bar" v-for="item in 5" :key="item">
        <img
          src="https://picsum.photos/200/300?id=022"
          alt=""
          style="
            width: 116px;
            height: 116px;
            margin-top: 40px;
            border-radius: 4px;
            object-fit: cover;
          "
        />
        <div class="article">美的（Midea）无缝全嵌系列526升法式多门四开门，尊享旗舰版。</div>
        <div class="price">￥5899.00</div>
        <!-- <div class="market-price">市场价：¥6078.00</div> -->
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.hot {
  padding-top: 25px;
}

.content {
  display: flex;
  gap: 8px;
  .hot-bar {
    width: 233px;
    height: 296px;
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #fff;
    transition: 0.3s all;
    cursor: pointer;

    &:hover {
      border: 1px solid #fb6e23;
      box-shadow: 0 2px 6px 0 #0000000a, 0 4px 16px 0 #0000000d;
    }

    .article {
      margin-top: 15px;
      width: 200px;
      height: 48px;
      font-weight: 600;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      color: #fb6e23;
      font-size: 16px;
      font-weight: 700;
      margin-top: 10px;
    }

    .market-price {
      margin-top: 5px;
      color: #00000073;
    }
  }
}
</style>
