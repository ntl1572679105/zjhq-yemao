<template>
  <PageContainer>
    <CommonTitleAction title="商品详情">
      <template #right>
        <a-button :loading="submitLoading" @click="onFinish" type="primary">{{
          id ? '保存' : '提交'
        }}</a-button>
      </template>
    </CommonTitleAction>
    <div class="bg-main">
      <a-skeleton active :loading="loading">
        <div>
          <CommonSubTitle title="基本信息" />
          <CommonForm
            ref="infoForm"
            class="mb-10"
            :canDisabled="pageState.canDisabled"
            :formItems="formItems[0]"
            :formData="formData[0]"
          />
          <CommonSubTitle title="商品规格" />
          <GoodsEdit v-model:data="skuDataSource.list" ref="skuForm" :canDisabled="pageState.canDisabled" />
          <CommonSubTitle title="单位设置" />
          <CommonForm
            :canDisabled="pageState.canDisabled"
            ref="unitForm"
            :formItems="formItems[1]"
            :formData="formData[1]"
          />
          <CommonSubTitle title="其他信息" />
          <CommonForm
            :canDisabled="pageState.canDisabled"
            ref="otherForm"
            :formItems="formItems[2]"
            :formData="formData[2]"
          />
          <CommonSubTitle title="图片上传" />
          <a-form class="mainImgForm" :model="mainFileList" ref="imgForm" layout="vertical">
            <a-form-item name="mainUrl">
              <template #label>
                <span
                  >商品图片<span class="f-12 c-0045"
                    >（图片尺寸：800x800px，大小≤3M，支持JPG、PNG、JPEG）</span
                  ></span
                >
              </template>
              <a-upload
                :disabled="pageState.canDisabled"
                v-model:file-list="mainFileList"
                :customRequest="handleMainUpload"
                name="mainImg"
                list-type="picture-card"
                class="avatar-uploader"
                accept="image/png, image/jpeg, image/jpg"
                :before-upload="beforeUpload"
                @preview="handlePreview"
                @remove="handleMainRemove"
              >
                <div v-if="mainFileList.length < 1">
                  <loading-outlined v-if="mainUploading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-form>
        </div>
      </a-skeleton>
      <a-modal
        :visible="previewVisible"
        :footer="null"
        @cancel="handleCancel"
        centered
        width="500px"
      >
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from 'vue';
import CommonTitleAction from '@/components/CommonTitleAction/index.vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import CommonForm from '@/components/CommonForm/index.vue';
import CommonSubTitle from '@/components/CommonSubTitle/index.vue';
import GoodsEdit from './components/GoodsEdit.vue';
import { UpdateGoods, AddGoods, GoodsDetail } from '@/api/goods.js';
import { categoryAll } from '@/api/operator/demand.js';
import dayjs from 'dayjs';
import { getUnitDict, Upload } from '@/api/common.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
  id: String,
  type: String,
});

// 标题及按钮
const pageState = reactive({
  canDisabled: false,
});

const loading = ref(false);
const imgForm = ref();

const setupPage = () => {
  if (props.type === '1') {
    pageState.canDisabled = true;
  } else {
    pageState.canDisabled = false;
  }
};
// 表单配置
const formItems = ref([
  [
    {
      type: 'text',
      label: '商品编码',
      value: 'id',
      disabled: props.type && props.type === '1',
    },
    {
      type: 'text',
      label: '商品名称',
      value: 'name',
      rules: true,
    },
    {
      type: 'select',
      label: '商品类型',
      value: 'categoryId',
      options: [],
      rules: true,
    },
  ],
  [
    {
      type: 'select',
      label: '单位',
      value: 'unit',
      options: [],
      rules: true,
    },
    {
      type: 'text',
      label: '描述',
      value: 'unitDescription',
      rules: true,
    },
    {
      type: 'number',
      label: '起订量',
      value: 'minimumOrderQuantity',
    },
  ],
  [
    {
      type: 'number',
      label: '商品排序',
      value: 'sort',
      rules: true,
    },
    {
      type: 'text',
      label: '商品品牌',
      value: 'brand',
      rules: true,
    },
    {
      type: 'text',
      label: '商品产地',
      value: 'locality',
    },
    {
      type: 'text',
      label: '商品参数',
      value: 'parameter',
      rules: true,
    },
    {
      type: 'text',
      label: '上架日期',
      value: 'onShelfTime',
      rules: true,
    },
  ],
]);

const unitDataSource = reactive({
  list: [],
});

const skuDataSource = reactive({
  list: [],
});

const dataSource = reactive({ list: [], alertAmount: 0 });

const formData = ref(new Array(formItems.value.length).fill([]));

onMounted(() => {
  // 组装默认的formData
  setupPage();
  getCategoryList();
  const tempList = [];
  formItems.value.forEach((child) => {
    const el = {};
    child.forEach((item) => {
      el[item.value] = undefined;
    });
    tempList.push(el);
  });
  formData.value = tempList;
  getDict();
  // 获取详情
  props.id && getDetail(props.id);
});

const getDetail = () => {
  loading.value = true;
  GoodsDetail(props.id)
    .then((res) => {
      formData.value.forEach((child) => {
        Object.keys(child).forEach((el) => {
          child[el] = res[el];
        });
      });
      unitDataSource.list = res;
      skuDataSource.list = res.skuVos;
      console.log(skuDataSource.list);
      res.mainUrl &&
        (mainFileList.value = [
          {
            status: 'done',
            url: res.mainUrl,
          },
        ]);
      dataSource.list = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

const mainFileList = ref([]);
const mainUploading = ref(false);

// 上传图片的限制
const beforeUpload = (file) => {
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    proxy.$message.error('图片不能大于3MB!');
  }
  return isLt3M;
};
// 主图和副图的添加删除
const handleMainRemove = () => {
  mainFileList.value = [];
};

const handleMainUpload = ({ file }) => {
  const formData = new FormData();
  formData.append('file', file);
  mainUploading.value = true;
  Upload(formData)
    .then((res) => {
      mainFileList.value = [
        {
          status: 'done',
          url: res.url,
          name: res.originName,
        },
      ];
      mainUploading.value = false;
    })
    .catch((e) => {
      console.log(e);
      mainUploading.value = false;
      handleMainRemove();
      proxy.$message.error('图片上传失败，请重试');
    });
};

const previewVisible = ref(false);
const previewImage = ref('');

// // 预览图片  @preview="handlePreview"

const handlePreview = (file) => {
  console.log(file);
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
};
const handleCancel = () => {
  previewVisible.value = false;
};

// 获取字典内容
const getDict = () => {
  getUnitDict().then((res) => {
    formItems.value[1][0].options = res.map((item) => ({
      label: item.dictKey,
      value: item.dictKey,
    }));
  });
};

// 提交保存
const submitLoading = ref(false);
const onFinish = () => {
  const { infoForm, skuForm, otherForm, unitForm, imgForm } = proxy.$refs;
  Promise.all([
    infoForm.validateFields(),
    skuForm.validate(),
    otherForm.validateFields(),
    unitForm.validateFields(),
    imgForm.validateFields(),
  ]).then((result) => {
    const info = result[0];
    const sku = result[1];
    const other = result[2];
    const unitForm = result[3];
    const imgForm = result[4];

    console.log(sku);
    const params = { ...info, ...sku, ...other, ...unitForm, ...imgForm, id: props.id };
    params.skuParams = undefined;
    params.skuParams = sku.map((item) => ({
      ...item,
      attributeDTO: {
        key: item.skuKey,
        value: item.skuValue,
      },
      pid: undefined,
      skuKey: undefined,
      skuValue: undefined
    }));
    params.onShelfTime = dayjs(params.onShelfTime);
    params.mainUrl = mainFileList.value ? mainFileList.value[0].url : undefined;
    const api = props.id ? UpdateGoods : AddGoods;
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

const getCategoryList = () => {
  categoryAll().then((res) => {
    console.log(res, 'categoryList');
    const list = [];
    transformData(res, list);
    formItems.value[0][2].options = list;
  });
};

// 转换类目结构
const transformData = (list, result) => {
  if (list && list.length > 0) {
    list.forEach((item) => {
      const child = { label: item.name, value: item.id, children: [] };
      transformData(item.children, child.children);
      if (child.children.length <= 0) {
        delete child.children;
      }
      result.push(child);
    });
  }
};
</script>

<style lang="less" scoped>
.mainImgForm {
  padding: 0 32px 5px 32px;
}
</style>
