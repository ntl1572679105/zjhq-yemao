<template>
  <PageContainer>
    <CommonTitleAction :title="pageState.title">
      <template #right v-if="pageState.buttonTitle">
        <a-button :loading="submitLoading" @click="onFinish" type="primary">{{
          pageState.buttonTitle
        }}</a-button>
      </template>
    </CommonTitleAction>
    <div class="bg-main flex">
      <a-skeleton active :loading="loading">
        <div style="width: 100%; overflow: hidden">
          <CommonSubTitle title="基本信息" />
          <CommonForm
            :canDisabled="pageState.canDisabled"
            ref="infoForm"
            :formItems="formItems"
            :formData="formData"
          />

          <CommonSubTitle title="商品明细" />
          <GoodsEdit :canDisabled="pageState.canDisabled" :data="dataSource" ref="goodsEdit" />
        </div>
        <FlowContainer
          v-if="approval.businessKey && pageState.canDisabled"
          :businessKey="approval.businessKey"
          :api="projectAudit"
          :params="{ id: id }"
        />
      </a-skeleton>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';
import CommonTitleAction from '@/components/CommonTitleAction/index.vue';
import CommonForm from '@/components/CommonForm/index.vue';
import CommonSubTitle from '@/components/CommonSubTitle/index.vue';
import GoodsEdit from './components/GoodsEdit.vue';
import { projectDetail, projectEdit, projectAdd, projectAudit } from '@/api/operator/project';
import FlowContainer from '@/components/Flow/index.vue';

const loading = ref(false);
const { proxy } = getCurrentInstance();
const props = defineProps({
  id: String,
  type: String, // 1:查看 2:编辑 3:审批
});

// 标题及按钮
const pageState = reactive({
  title: '',
  buttonTitle: '',
  canDisabled: false,
});

const setupPage = () => {
  if (props.type) {
    pageState.title = ['', '项目详情', '编辑项目', '项目审批'][props.type];
    if (props.type === '2') {
      pageState.buttonTitle = '保存';
      pageState.canDisabled = false;
    } else {
      pageState.buttonTitle = '';
      pageState.canDisabled = true;
    }
    formItems.value.splice(
      1,
      0,
      {
        type: 'text',
        label: '申请部门',
        value: 'createDept',
        disabled: true,
      },
      {
        type: 'text',
        label: '申请人',
        value: 'createBy',
        disabled: true,
      },
    );
    formItems.value.splice(0, 0, {
      type: 'text',
      label: '项目编号',
      value: 'id',
      disabled: true,
    });
  } else {
    pageState.title = '新建项目';
    pageState.buttonTitle = '提交';
  }
};

// 表单配置
const formItems = ref([
  {
    type: 'text',
    label: '项目标题',
    value: 'title',
    rules: true,
  },
  //   {
  //     type: 'text',
  //     label: '预算总金额',
  //     value: 'totalPrice',
  //     rules: true,
  //     width: 12,
  //   },
  {
    type: 'file',
    label: '附件',
    value: 'attachmentUrlListJson',
    rules: true,
  },
  {
    type: 'textarea',
    label: '备注',
    value: 'remark',
    rules: true,
  },
]);

const dataSource = ref([]);

const formData = ref({});

onMounted(() => {
  setupPage();
  // 组装默认的formData
  formItems.value.forEach((child) => {
    formData.value[child.value] = undefined;
  });

  if (props.id) {
    // 获取详情
    getDetail(props.id);
  }
});

const getDetail = () => {
  loading.value = true;
  projectDetail(props.id)
    .then((res) => {
      Object.keys(formData.value).forEach((el) => {
        if (el === 'attachmentUrlListJson') {
          // 营业执照
          formData.value[el] = [
            {
              status: 'done',
              url: res.attachmentUrlListJson,
              uid: new Date().getTime(),
              name: res.attachmentUrlListJson.split('/').pop(),
            },
          ];
        } else {
          formData.value[el] = res[el] || undefined;
        }
      });

      dataSource.value = res.projectItemList.map((item) => ({
        ...item,
        attachmentUrlList: item.attachmentUrlListJson
          ? [
              {
                status: 'done',
                url: item.attachmentUrlListJson,
                uid: new Date().getTime(),
                name: item.attachmentUrlListJson.split('/').pop(),
              },
            ]
          : [],
      }));
      approval.businessKey = res.businessKey;
    })
    .finally(() => {
      loading.value = false;
    });
};

/// 审批
const approval = reactive({
  businessKey: '',
});

// 提交保存
const submitLoading = ref(false);
const onFinish = () => {
  const { infoForm, goodsEdit } = proxy.$refs;
  Promise.all([infoForm.validateFields(), goodsEdit.validate()]).then((result) => {
    const info = result[0];
    const projectItemParamList = result[1];
    if (Array.isArray(info.attachmentUrlListJson)) {
      info.attachmentUrlListJson = info.attachmentUrlListJson[0].url;
    }
    projectItemParamList.forEach((item) => {
      if (
        item.attachmentUrlList &&
        Array.isArray(item.attachmentUrlList) &&
        item.attachmentUrlList.length > 0
      ) {
        item.attachmentUrlListJson = item.attachmentUrlList[0].url;
      } else {
        item.attachmentUrlListJson = '';
      }
      item.categoryId = item.categoryId.slice(-1)[0];
    });

    const params = { ...info, projectItemParamList, id: props.id };
    console.log(params);
    const api = props.id ? projectEdit : projectAdd;
    const message = props.id ? '保存成功' : '提交成功';
    submitLoading.value = true;
    api(params)
      .then(() => {
        proxy.$message.success(message);
        proxy.$router.go(-1);
      })
      .finally(() => {
        submitLoading.value = false;
      });
  });
};
</script>

<style lang="less" scoped></style>
