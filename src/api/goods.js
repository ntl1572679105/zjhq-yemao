import { request } from "@/utils/request";

const goodsApi = {
  // 分页查询商品列表
  list: '/shqjcpt/operator/product/page',
  // 查询商品详情
  detail: '/shqjcpt/operator/product/',
  // 新增商品
  add: '/shqjcpt/operator/product',
  // 删除商品
  delete: '/shqjcpt/operator/product/',
  // 修改商品
  update: '/shqjcpt/operator/product'
}

export function GoodsList (params) {
  return request({
    url: goodsApi.list,
    method: 'get',
    params
  })
}

export function GoodsDetail (id) {
  return request({
    url: goodsApi.detail + id,
    method: 'get',
  })
}

export function AddGoods (parameter) {
  return request({
    url: goodsApi.add,
    method: 'post',
    data: parameter
  })
}

export function DelGoods (id) {
  return request({
    url: goodsApi.delete + id,
    method: 'delete',
  })
}

export function UpdateGoods (parameter) {
  return request({
    url: goodsApi.update,
    method: 'put',
    data: parameter
  })
}