<template>
  <div class="page">
    <topHeaderVue></topHeaderVue>
    <topNavVue></topNavVue>
    <div class="content">
      <div class="head">
        <div class="header-content">
          <div id="searchCategory">
            <div class="header-content-item">
              <div class="title">所有分类：</div>
              <div class="bars">
                <a
                  class="bar"
                  :class="{ active: index == searchOptions.category1Index }"
                  v-for="(item, index) in categoryData"
                  :key="item.id"
                  @click="handleClickCategory1(item, index)"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>

          <div class="header-content-item">
            <a-checkbox
              v-model:checked="state.checkAll"
              :indeterminate="state.indeterminate"
              @change="onCheckAllChange"
            >
              全选
            </a-checkbox>
            <div style="margin-left: 10px"></div>
            <a-checkbox-group v-model:value="state.checkedList" :options="plainOptions" />
          </div>

          <div class="header-content-item">
            <div class="title">商品品牌：</div>
            <div class="bars" style="gap: 8px">
              <img
                v-for="item in 15"
                src="@/assets/images/Home/brand_4@2x.png"
                alt=""
                style="width: 146px; height: 56px"
                :key="item"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="goods-bar" v-for="item in 20" :key="item">
          <img
            src="https://picsum.photos/200/300?id=022"
            alt=""
            style="width: 116px; height: 116px; margin-top: 40px"
          />
          <div class="article">美的（Midea）无缝全嵌系列526升法式多门四开门，尊享旗舰版。</div>
          <div class="price">￥5899.00</div>
          <!-- <div class="market-price">市场价：¥6078.00</div> -->
        </div>
      </div>
    </div>
    <bottomVue></bottomVue>
  </div>
  <!-- <categoryMenuVue :list="categoryData" :parentId="'0'"></categoryMenuVue> -->
</template>

<script setup>
import { reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';
import topHeaderVue from '../home/topHeader/index.vue';
import topNavVue from '../home/topNav/index.vue';
import bottomVue from '../home/bottom/index.vue';

const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: ['打印/复印设备', '装订/封装机'],
});

const store = useStore();
const categoryData = computed(() => store.getters.category);

const searchOptions = reactive({
  category1Index: '',
});

const plainOptions = [
  '打印/复印设备',
  '装订/封装机',
  '扫描设备',
  '扫描仪',
  '投影设备',
  '验钞/点钞机',
  '碎纸设备',
  '保险/保管箱',
  '其它设备',
];

watch(
  () => state.checkedList,
  (val) => {
    state.indeterminate = !!val.length && val.length < plainOptions.length;
    state.checkAll = val.length === plainOptions.length;
  },
);

const onCheckAllChange = (e) => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions : [],
    indeterminate: false,
  });
};

const handleClickCategory1 = (item, index) => {
  searchOptions.category1Index = index;
};
</script>

<style lang="less" scoped>
a{
  color:black
}
a:hover{
  color:#fb6e23;
}
.page {
  background-color: #f6f6f6;
}

.active {
  color: #fb6e23;
}
.head {
  padding-bottom: 24px;
  background-color: white;
  .header-content {
    width: 1200px;
    margin: 0 auto;
    .header-content-item {
      display: flex;
      align-items: center;
      background-color: #f6f6f6;
      align-items: flex-start;
      padding: 16px 24px;
      margin-bottom: 8px;
      .title {
        width: 80px;
        flex-basis: 80px;
        font-weight: 700;
      }
      .bars {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        gap: 16px 24px;
      }
    }
  }
}

.body {
  margin: 0 auto;
  width: 1200px;
  display: flex;
  padding: 24px 0;
  flex-wrap: wrap;
  gap: 8px;

  .goods-bar {
    width: 233px;
    height: 296px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;

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
