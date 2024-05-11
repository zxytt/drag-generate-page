<template>
  <div class="drawing-item">
    <el-form-item
      :label-width="item.showLabel ? `${item.labelWidth || 100}px` : '0px'"
      :label="item.showLabel ? item.label : ''"
      :prop="conf.mode === 'designer' ? undefined : item.vModel"
      :required="item.required"
    >
      <RenderComponent 
        v-bind="item"
        :item="item"
        :conf="conf"
        :activeId="activeId"
      />
    </el-form-item>
  </div>
</template>

<script setup>
import RenderComponent from './renderComponent.vue'

const props = defineProps({
  item: Object,
  conf: Object,
  activeId: String || Number,
})

</script>

<style lang="scss" scoped>
.drawing-item {
	position: relative;
	cursor: move;
	&.unfocus-bordered {
		&:not(.active-form-item) {
			& > div {
				&:first-child {
					border: 1px dashed #ccc;
				}
			}
		}
	}
	.el-form-item {
		padding: 8px 10px;
	}
}
</style>
