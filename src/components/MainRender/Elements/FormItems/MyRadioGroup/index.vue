<template>
  <el-radio-group v-bind="$attrs">
    <template v-for="item in $attrs.options">
      <el-radio-button v-if="$attrs.optionType === 'button'" :label="item.value">{{ item.label }}</el-radio-button>
      <el-radio v-else :border="$attrs.border" :label="item.value">{{ item.label }}</el-radio>
    </template>
  </el-radio-group>
</template>
<script setup name="my-radio-group">
import { ref } from 'vue'
</script>