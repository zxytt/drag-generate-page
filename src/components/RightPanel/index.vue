<template>
  <el-tabs v-model="state.currentTab" :stretch="true">
    <el-tab-pane label="组件属性" name="field">
      <div class="mr10">
        <el-form size="small" label-width="90px">
          <GeneralPropertyPanel :data="activeData" />
          <AdvancePropertyPanel v-if="Object.keys(activeData).length" :data="activeData" />
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form">
      <FormPropertyPanel :form-conf="props.formConf"/>
    </el-tab-pane>  
  </el-tabs>
</template>

<script setup>
import GeneralPropertyPanel from './general.vue'
import FormPropertyPanel from './form.vue'
import AdvancePropertyPanel from './advance.vue'

const props = defineProps(['showField', 'activeData', 'formConf', 'list'])

const state = ref({
  currentTab: 'field',
  data: {}
})

</script>

<style lang="scss" scoped>

</style>
