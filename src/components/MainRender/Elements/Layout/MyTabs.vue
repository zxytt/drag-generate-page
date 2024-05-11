<template> 
  <el-tabs v-bind="item" v-model="item.defaultValue"   class="drawing-layout-item" >
    <el-tab-pane v-for="pane in item.children" :key="pane.value" :label="pane.label" :name="pane.value">
      <!-- <render-panel
      :active-id="activeId"
      :list="pane.children"
      tag="el-row"
      :conf="conf"
      :gutter="pane.gutter" 
      justify="left"
    >
    </render-panel> -->
    <MainRender 
      class="h100 m10"
      :list="pane.children"
      :animation="200"
      :conf="conf"
      :gutter="pane.gutter"
    />
    </el-tab-pane>
  </el-tabs> 
</template>

<script lang="ts" setup name="my-tabs">
import MainRender from '../../../MainRender/index.vue'

const tabs = computed(() => {
  return props.item.tabpanes
})
const props=defineProps({
  parent: Object, 
  activeId: String || Number,  
  item: Object,
  conf: Object
});
   
   
</script>