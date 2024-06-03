<template>
  <div :class="colClassName" @click.native.stop="activeFormItem(item)">
    <template v-if="conf.mode==='designer'">
      <span class="drawing-item-delete" title="删除" @click="deleteItem(index, parent)">
        <el-icon><Delete /></el-icon>
      </span>
      <span class="drawing-item-copy" title="复制" @click="copyItem(item, parent)">
        <el-icon><CopyDocument /></el-icon>
      </span>
    </template>
    <RenderFormItem 
      :item="item" 
      :conf="conf"
      :activeId="activeId" 
    />
  </div>
</template>

<script setup>
import { Delete, CopyDocument } from '@element-plus/icons-vue'

const props = defineProps({
  parent: Object,
  item: Object,
  conf: Object,
  activeId: String || Number,
  index: String || Number
})

const activeFormItem = inject('activeFormItem')
provide('activeFormItem', activeFormItem)
// const copyItem = inject('copyItem')
// const deleteItem = inject('deleteItem')

let colClassName = computed(() => {
  if(props.conf.mode === 'designer') {
    return props.activeId === props.item.formId ? 'drawing-item active-form-item' : 'drawing-item'
  }
  return ''
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
.drawing-item,
.drawing-layout-item {
  &:hover {
	background: var(--color-whites);
	border-radius: 6px;
	outline: 1px dashed #38adff!important;
    & > .el-form-item {
      background: var(--color-whites);
      border-radius: 6px;
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
      display: initial;
    }
  }
  & > .drawing-item-copy,
  & > .drawing-item-delete {
    display: none;
    position: absolute;
    top: -10px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    border: 1px solid;
    cursor: pointer;
    z-index: 1;
  }
  & > .drawing-item-copy {
    right: 56px;
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: #fff;
    &:hover {
      background: var(--color-primary);
      color: #fff;
    }
  }
  & > .drawing-item-delete {
    right: 24px;
    border-color: #f56c6c;
    color: #f56c6c;
    background: #fff;
    &:hover {
      background: #f56c6c;
      color: #fff;
    }
  }
}
.active-form-item {
	background: #f6f7ff;
  border-radius: 6px;
  outline: 1px solid #38adff !important;
}
</style>
