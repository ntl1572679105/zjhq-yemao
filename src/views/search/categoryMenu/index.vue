<template>
  <Teleport to="#searchCategory">
    <div class="content">
      <div class="title"><span v-if="list[0].parentId == '0'">所有分类：</span></div>
      <div class="list">
        <div v-for="(item, index) in list" :key="item.id">
          <!-- <template> -->
          <a
            v-if="item.parentId == parentId"
            :class="{ active: index == searchOptions.categoryIndex }"
            @click="handleClickCategory(item, index)"
          >
            {{ item.name }}{{ parentId }},{{ item.parentId == parentId }}
          </a>
          <!-- <template v-if="item.parentId == '0'&&item.id == searchOptions.id">
            <categoryMenuVue
              :list="item.children"
              :parentId="searchOptions.parentId"
              :id="searchOptions.id"
            ></categoryMenuVue>
          </template> -->
          <template v-if="item.children && item.children.length > 0&&item.id == searchOptions.id">
            <categoryMenuVue
              :list="item.children"
              :parentId="searchOptions.id"
              :id="searchOptions.id"
            ></categoryMenuVue>
          </template>
          <!-- </template> -->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps(['list', 'parentId', 'id']);

const searchOptions = reactive({
  categoryIndex: '',
  parentId: '',
  id: '',
});

const handleClickCategory = (item, index) => {
  searchOptions.categoryIndex = index;
  searchOptions.parentId = item.parentId;
  searchOptions.id = item.id;
};
</script>

<style lang="less" scoped>
.active {
  color: #fb6e23;
}
.content {
  display: flex;

  background-color: #f6f6f6;
  padding: 16px 24px;
  margin-bottom: 8px;
  .title {
    width: 80px;
    flex-basis: 80px;
    font-weight: 700;
  }
  .list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 16px 24px;
  }
}
</style>
