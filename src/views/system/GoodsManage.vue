<template>
  <PageContainer>
    <div>
      <CommonTitleAction title="商品中心管理">
        <template #right>
          <a-space>
            <!-- <a-button type="primary" @click="invitationList()">邀请列表</a-button> -->
            <a-button type="primary" @click="importGoods()">商品导入</a-button>
            <a-button type="primary" @click="showApproval" :loading="invitationLoading"
              >新建商品</a-button
            >
          </a-space>
        </template>
      </CommonTitleAction>
      <TableSearch
        ref="tableRef"
        :formItems="formItems"
        :formData="formData"
        :columns="columns"
        :scroll="{ x: 1600 }"
        :api="GoodsList"
        :setupParams="setupParams"
      >
        <template #cell="{ column, record, index, text }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a @click="showApproval(record, 1)">查看</a>
              <a @click="showApproval(record, 2)">修改</a>
              <a @click="priceCompare(record)">比价</a>
            </a-space>
          </template>
          <template v-else-if="column.key === 'date'">
            {{ dayjs(text).format('YYYY-MM-DD') }}
          </template>
          <template v-else-if="column.dataIndex === 'categoryIds'">
            {{ text }}
          </template>
          <template v-else-if="column.key === 'status'">
            <a-switch
              v-model:checked="record.status"
              :checkedValue="0"
              :unCheckedValue="1"
            ></a-switch>
          </template>
        </template>
      </TableSearch>
    </div>
  </PageContainer>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue';
import CommonTitleAction from '@/components/CommonTitleAction/index.vue';
import TableSearch from '@/components/TableSearch/index.vue';
import { GoodsList } from '@/api/goods.js';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import {
  categoryAll,
  categoryDetail,
  categoryDelete,
  categoryEdit,
} from '@/api/operator/demand.js';

const { proxy } = getCurrentInstance();
const router = useRouter();

const productCategoryList = ref([]);

const formItems = ref([
  {
    type: 'text',
    label: '商品编号',
    value: 'id',
  },
  {
    type: 'text',
    label: '商品名称',
    value: 'name',
  },
  {
    type: 'cascaderSelect',
    label: '商品类型',
    value: 'categoryId',
    options: productCategoryList,
  },
  {
    type: 'select',
    label: '商品状态',
    value: 'status',
    options: [
      { label: '启用', value: 0 },
      { label: '停用', value: 1 },
    ],
  },
]);

const formData = {
  id: undefined,
  name: undefined,
  goodsType: undefined,
  status: undefined,
};

const setupParams = (data) => {
  console.log(data);
  const requestParameters = {};
  // if (data && data.createTime) {
  //   requestParameters.createTime = dayjs(data.createTime).format('YYYY-MM-DD');
  // }
  if (data && data.categoryIds) {
    requestParameters.categoryId = data.categoryIds[data.categoryIds.length - 1];
  }
  return requestParameters;
};

const columns = [
  {
    title: '商品编号',
    dataIndex: 'id',
    width: 200,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    ellipsis: true,
    width: 180,
  },
  {
    title: '商品类型',
    dataIndex: 'categoryIds',
    width: 180,
    ellipsis: true,
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: 200,
    ellipsis: true,
  },
  {
    title: '启用',
    dataIndex: 'status',
    key: 'status',
    width: 120,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 180,
  },
  {
    title: '状态变更时间',
    dataIndex: 'createTime',
    key: 'date',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 220,
  },
];

const showApproval = (record, type) => {
  if (record.id) {
    router.push({
      path: `/system/goodsDetail/${type}/${record.id}`,
    });
  } else {
    router.push({
      path: `/system/addGoods`,
    });
  }
};

const getCategoryList = () => {
  categoryAll().then((res) => {
    console.log(res, 'categoryList');
    const list = [];
    transformData(res, list);
    productCategoryList.value = list;
    console.log(productCategoryList.value, 'categoryList');
  });
};

// 转换类目结构
const transformData = (list, result) => {
  if (list && list.length > 0) {
    list.forEach((item) => {
      const child = { label: item.name, value: item.id, children: [] };
      transformData(item.children, child.children);
      if (child.children.length) {
        delete child.children;
      }
      result.push(child);
    });
  }
};
onMounted(() => {
  getCategoryList();
});
</script>

<style lang="less" scoped>
.approval {
  position: relative;
  // padding-left: 16px;
  margin-right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 3px;

  &::before {
    content: ' ';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    left: 0px;
    top: 0px;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}

.approval0 {
  border: 1px solid #1b77ff;

  &::before {
    background: #1b77ff;
  }
}

.approval1 {
  &:before {
    background: #52c41a;
  }
}

.approval2 {
  &:before {
    background: #f22933;
  }
}
</style>
