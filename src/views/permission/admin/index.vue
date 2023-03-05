<template>
  <PageContainer>
    <card>
      <template #header>
        数据筛选
      </template>
      <el-form
        :inline="true"
        ref="form"
        :model="listParams"
        :disabled="listLoading"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select
            v-model="listParams.status"
            placeholder="请选择"
            clearable
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              label="显示"
              :value="1"
            />
            <el-option
              label="不显示"
              :value="0"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input
            v-model="listParams.name"
            clearable
            placeholder="请输入身份昵称"
          />
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </card>
    <card>
      <template #header>
        <el-button
          type="primary"
        >
          添加管理员
        </el-button>
      </template>
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column
          prop="id"
          label="ID"
        />
        <el-table-column
          prop="real_name"
          label="姓名"
        />
        <el-table-column
          prop="account"
          label="账号"
        />
        <el-table-column
          prop="roles"
          label="身份"
          min-width="180"
        >
          <template #default="scope">
            <el-space wrap>
              <el-tag
                class="role-tag"
                v-for="(item) in scope.row.roles.split(',')"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column
          label="最后一次登录时间"
          prop="last_time"
        />
        <el-table-column
          label="最后一次登录IP"
          prop="last_ip"
        />
        <el-table-column label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="handleStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <el-button
              type="text"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="确认删除吗？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="text">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :list-count="listCount"
        :response-list="responseList"
        @change="change1"
      />
    </card>
  </PageContainer>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { getAdmins } from '@/api/admin'
import { IListParmas, Admin } from '@/api/types/admin'
import { deleteAdmin, updateAdminStatus } from '../../../api/admin'
import { ElMessage } from 'element-plus'

const list = ref<Admin[]>([]) // 列表数据
const listCount = ref(0) // 总数量
const listLoading = ref(true)
const listParams = reactive({ // 列表数据查询参数
  page: 1, // 当前页码
  limit: 10, // 每页大小
  name: '',
  roles: '',
  status: '' as IListParmas['status']
})
const responseList = async () => {
  listLoading.value = true
  const data = await getAdmins(listParams)
  list.value = data.list
  listLoading.value = false
  listCount.value = data.count
}
const change1 = (val: string) => {
  console.log(val)
}
onMounted(() => {
  responseList()
})
const handleQuery = () => {
  responseList()
}
// 删除管理员
const handleDelete = async (id: number) => {
  await deleteAdmin(id)
  responseList()
  ElMessage.success('删除成功')
}
// 修改状态
const handleStatus = async (item: Admin) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 0 ? '禁用' : '启用'}成功`)
}
</script>

<style scoped>

</style>
