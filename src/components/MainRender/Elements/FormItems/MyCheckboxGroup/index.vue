<template>
  <el-checkbox-group v-bind="$attrs">
    <template v-for="item in $attrs.options">
      <el-checkbox-button v-if="$attrs.optionType === 'button'" :label="item.value">{{ item.label }}</el-checkbox-button>
      <el-checkbox v-else :border="$attrs.border" :label="item.value">{{ item.label }}</el-checkbox>
    </template>
  </el-checkbox-group>
</template>
<script setup name="my-checkbox-group">
import { ref } from 'vue'
</script>  