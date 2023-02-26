import { store } from '../../store/index';
<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
    unique-opened
    :collapse="$store.state.isCollapse"
  >
    <el-menu-item index="/">
      <template #title>
        <el-icon><location /></el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/list">
        商品列表
      </el-menu-item>
      <el-menu-item index="/product/classify">
        商品分类
      </el-menu-item>
      <el-menu-item index="/product/attr">
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/reply">
        商品评论
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        订单列表
      </el-menu-item>
      <el-menu-item index="/order/offline">
        金额账单
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <template #title>
        <el-icon><location /></el-icon>
        <span>媒体</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><location /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/role">
        角色
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        规则
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        管理员
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang='ts'>

</script>

<style lang='stylus' scoped></style>
