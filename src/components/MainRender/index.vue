<template>
  <el-container>
    <el-header class="flex  main-navbar py5">
      <div>
        <el-button :icon="Monitor">PC</el-button>
        <el-button :icon="Iphone">Mobile</el-button>
      </div>
      <div>
        <el-button text :icon="Delete">清空</el-button>
        <el-button text :icon="View">预览</el-button>
      </div>
    </el-header>
    <el-main>
      <el-scrollbar>
        <el-form>
          <Draggable
            :group="{
              name: groupName,
            }"
            :list="list"
            item-key="index"
            ghost-class="ghost" 
            :force-fallback="true"
            class="h100px"
          >
            <template #item="{ element, index }">
              <div>
                {{ element.label }}
              </div>
            </template>
          </Draggable>
        </el-form>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup>
import { Delete, Monitor, Iphone, View } from '@element-plus/icons-vue'
import Draggable from 'vuedraggable'

const props = defineProps({
  groupName: String,
  list: Array
})

</script>

<style lang="scss" scoped>
.main-navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border-bottom: 2px solid #e4e7ed;
}
:deep(.el-button) {
  height: 28px;
}
</style>
