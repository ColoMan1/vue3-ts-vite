<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <div class="headerbox">
            <div class="headerLeft">
              <el-icon @click="$store.commit('setisCollapse', !$store.state.isCollapse)">
                <Expand v-if="$store.state.isCollapse" />
                <Fold v-else />
              </el-icon>
              <el-breadcrumb :separator-icon="'ArrowRight'">
                <el-breadcrumb-item
                  v-for="assets in breadcrumb"
                  :key="assets.path"
                >
                  {{ assets.meta.title }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="headerRight">
              <el-input
                v-model="inputvalue"
                placeholder="请输入"
                :prefix-icon="'Search'"
              />
              <el-icon @click="toggleFullScreen">
                <FullScreen />
              </el-icon>
              <el-icon><Bell /></el-icon>
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{ $store.state.user?.account }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      个人中心
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts' setup>
import AppMenu from './components/AppMenu.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { LoginOut } from '../api/common'
import { store } from '../store/index'
// 面包屑导航
const router = useRouter()
const breadcrumb = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
// deahder右边input
const inputvalue = ref('')
// header全屏按钮
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
// admin鼠标移入移出
const handleLoginOut = () => {
  ElMessageBox.confirm(
    '确定退出登录?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
    await LoginOut()
    ElMessage({
      type: 'success',
      message: '退出成功'
    })
    store.commit('setUser', null)
    router.push({
      path: '/login'
    })
  })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出'
      })
    })
}
</script>

<style lang='scss' scoped>
  .el-aside{
    width: auto;
    height: 100%;
    background-color: #545c64;
  }
  .el-main{
    height: 100%;
    background-color: #ccc;
  }
  .el-container {
    height: 100%;
  }
  .el-menu{
    border: 0;
  }
  .el-header{
    display: flex;
  }
  .headerbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .headerLeft{
      display: flex;
    }
    .headerRight{
      display: flex;
      width: 350px;
      align-items: center;
      justify-content: space-between;
      .el-icon{
        vertical-align: middle;
        margin-left: 5px;
      }
      .el-input{
        width: 218px;
      }
    }
  }
  .el-breadcrumb{
    margin-left: 10px;
  }
</style>
