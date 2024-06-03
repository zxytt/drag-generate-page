<template>
  <el-tabs v-model="state.currentTab" :stretch="true" class="mr10">
    <el-tab-pane label="栅格" name="span">
      <br />
      <el-form-item v-if="props.data.span !== undefined" label="表单栅格">
        <el-slider v-model="props.data.span" :max="24" :min="1" :marks="{ 12: '' }" @change="spanChange" />
      </el-form-item>
      <el-form-item v-if="props.data.span !== undefined" label="左侧间隔">
        <el-slider v-model="props.data.offset" :max="24" :min="0" :marks="{ 12: '' }" />
      </el-form-item>
      <el-form-item v-if="props.data.span !== undefined" label="右移格数">
        <el-slider v-model="props.data.push" :max="24" :min="0" :marks="{ 12: '' }" />
      </el-form-item>
      <el-form-item v-if="props.data.span !== undefined" label="左移格数">
        <el-slider v-model="props.data.pull" :max="24" :min="0" :marks="{ 12: '' }" />
      </el-form-item>
    </el-tab-pane>
    <!-- <el-tab-pane label="事件" name="event">
      <br/>
      待开发
    </el-tab-pane>
    <el-tab-pane label="CSS" name="css">
      <br/>
      待开发
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup>
const props = defineProps(['data'])

const state = reactive({
  currentTab: 'span'
})
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-right: 10px;
}
</style>
