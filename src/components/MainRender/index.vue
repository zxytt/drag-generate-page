<template>
  <div>
    <Draggable
      :group="{
        name: groupName,
      }"
      :list="list"
      item-key="index"
      class="drag-wrapper"
    >
      <template #item="{ element, index }">
        <el-col :span="element.span" :offset="element.offset" :push="element.push" :pull="element.pull">
          <RenderItem
            :parent="list" 
            :item="element"
            :conf="conf"
            :activeId="activeId"
            :index="index"
          />
        </el-col>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import Draggable from 'vuedraggable'

const props = defineProps({
  groupName: String,
  list: Array,
  conf: Object,
  activeId: String || Number,
  gutter: Number
})


</script>

<style lang="scss" scoped>
.drag-wrapper{
  min-height: 80px;
  height: 100%;
}
</style>
