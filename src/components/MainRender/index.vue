<template>
  <div>
    <Draggable
      v-if="conf.mode === 'designer'"
      :group="{
        name: groupName,
      }"
      :list="list"
      item-key="index"
      class="drag-wrapper"
      :component-data="componentData"
      :animation="200"
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
    <el-row v-else :gutter="componentData.gutter" style="display:flex"  justify="center" align="middle" >
      <el-col v-for="(element, index) in list"  :span="element.span" :offset="element.offset" :push="element.push" :pull="element.pull">
        <render-item :index="index" :active-id="activeId" :parent="list" :item="element" :conf="conf"> </render-item>
      </el-col>
    </el-row>
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

const componentData = computed(() => {
  return {
    gutter: props.gutter ?? 5,
    justify: 'start',
    style: { 'margin-left': 0, width: '100%', alignContent: 'start', height: '100%' },
  }
})
</script>

<style lang="scss" scoped>
.drag-wrapper{
	min-height: 80px;
	padding: 20px;
	overflow: hidden;
}
</style>
