<template>
  <div class="page">
    <topHeaderVue></topHeaderVue>
    <topNavVue></topNavVue>

    <div class="content">
      <h1>今年浙江猪肉零售价已下跌两成多</h1>
      <div class="mb-8">浙好淘 2023-04-18 17:00</div>
      <article>
        4月18日，浙江省省商务厅发布2023年第16周（4月10日至16日）生活必需品市场监测报告。报告显示，这一周里，猪肉零售价微降，蔬菜水果零售价持平。
        记者梳理生活必需品市场监测报告发现，今年以来全省猪肉零售价持续下降，价格已下跌两成多。猪肉零售价连降三周
        “猪肉15元/斤，排骨24元/斤，最近这半个月猪肉零售价格没啥变化。”4月19日，在长沙市开福区荷花池生鲜市场，一家猪肉铺的老板告诉记者。
        由于生猪存栏量充足，4月10日至16日这一周，全省猪肉零售价较前一周仍持下降趋势。监测显示，全省鲜猪肉零售价为27.28元/公斤，后腿肉零售价29.21元/公斤，分别略降0.9%和0.5%，并且连续三周略降。
        记者梳理发现，今年以来，全省猪肉零售价格持续下跌，并且跌幅不小。2023年1月2日至8日，全省鲜猪肉零售价为35.05元/公斤，如今已降至27.28元/公斤。算下来，今年以来，全省猪肉零售价格已经下降了22%。
        监测报告分析，随着“五一”假期临近，猪肉需求逐步恢复，但生猪销售端仍将面临一定压力，预计短期内全省猪价走势依然会偏弱。
        蔬菜水果价格平稳
        当前蔬菜市场供应能力强，鲜菜品种丰富，能够满足全省居民及各大餐饮业需求，菜价稳定。监测显示，这一周蔬菜零售均价7.8元/公斤，较上周持平。重点监测的7大类30个蔬菜品种14降14涨2持平。其中，黄瓜、生菜和莴笋价格下降，菠菜和西红柿价格上涨，苦瓜和南瓜价格均持平。
        现阶段，省内鲜嫩蔬菜供应地北移到长江以北地区，北方产区蔬菜供应增多，保鲜费用有所下降。同时，露地蔬菜开始大量上市，蔬菜生产成本下降，全省蔬菜价格或将进入季节性下降区间。不过，春季气候多变，部分菜品价格可能受天气影响有所波动。整体而言，全省菜价将以稳中有降走势运行。
        本周全省水果零售价呈平稳走势运行。监测显示，水果零售均价11.98元/公斤，较上周持平。其中，西瓜、芒果、苹果、香蕉、菠萝和葡萄价格下降，柑橘和梨价格上涨。整体来看，当前全省水果供应稳定、种类多样。后期随着鲜果持续上市，全省整体水果价格将稳中回落。
      </article>
    </div>
    <bottomVue></bottomVue>
  </div>
</template>

<script setup>
import topHeaderVue from '@/views/home/topHeader/index.vue';
import topNavVue from '@/views/home/topNav/index.vue';
import bottomVue from '@/views/home/bottom/index.vue';
</script>

<style lang="less" scoped>
.page {
  background-color: #f6f6f6;
}
.content {
  width: 1200px;
  margin: 0 auto;
  min-height: 565px;
  padding: 25px 0;
}
</style>
