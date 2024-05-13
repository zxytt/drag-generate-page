<template>
  <el-container class="container">
    <!-- 左侧 -->
    <el-aside class="left-container">
      <el-scrollbar>
        <el-tabs 
          v-model="state.activeTabName"
          :stretch="true"
        >
          <el-tab-pane 
            v-for="(tab, tabIdx) in state.tabs"
            :label="tab.label"
            :name="tab.name"
            :key="tabIdx"
          >
            <div class="px8">
              <template 
                v-for="(com, comIdx) in tab.coms" 
                :key="comIdx"
              >
                <div class="com-title">{{ com.title }}</div>
                <Draggable
                  :group="{
                    name: 'comsGroup',
                    pull: 'clone',
                    put: false
                  }"
                  :list="com.model"
                  draggable=".com-item"
                  item-key="index"
                  :sort="false"
                  @end="onEnd"
                  :clone="cloneComponent"
                  class="mb20"
                >
                  <template #item="{ element, index }">
                    <div
                      :key="index"
                      class="com-item mb5"
                      @click="addComponent(element)"
                    >
                      <div class="com-body">
                        {{ element.label }}
                        <SvgIcon
                          :icon-class="element.tagIcon"
                          class="svg-icon"
                          size="18"
                          :color="com.color"
                        />
                      </div>
                    </div>
                  </template>
                </Draggable>
              </template>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </el-aside>
    <!-- 中间 -->
    <el-main class="main-container p0">
      <el-container class="h100">
        <el-header class="flex main-header py5">
          <div>
            <el-button :icon="Monitor">PC</el-button>
            <el-button :icon="Iphone">Mobile</el-button>
          </div>
          <div class="operate">
            <el-button type="primary" link :icon="Delete">清空</el-button>
            <el-button type="primary" link :icon="View">预览</el-button>
          </div>
        </el-header>
        <el-main :class="['device', state.deviceMode]">
          <el-form class="drawing-board h100">
            <el-scrollbar>
              <MainRender 
                class="h100 m10"
                groupName="comsGroup"
                :list="state.drawList"
                :animation="200"
                :conf="state.formConf"
                :gutter="state.formConf.gutter"
                :activeId="state.activeId"
              />
            </el-scrollbar>
          </el-form>
          <div v-show="!state.drawList.length" class="empty-info">
            从左侧拖入或点选组件进行表单设计
          </div>
        </el-main>
      </el-container>
    </el-main>
    <!-- 右侧 -->
    <el-aside class="right-container">
      <el-scrollbar>
        <RightPanel 
          class="w100"
          :form-conf="state.formConf"
          :show-field="state.drawList && state.drawList.length"
          :active-data="state.activeData"
          :list="state.drawList"
        />
      </el-scrollbar>
    </el-aside>
  </el-container>
</template>

<script setup>
import configs from '../../configs'
import { Delete, Monitor, Iphone, View } from '@element-plus/icons-vue'
import Draggable from 'vuedraggable' 
import MainRender from '../MainRender/index.vue'
import RightPanel from '../RightPanel/index.vue'

const state = ref({
  activeTabName: 'common',
  deviceMode: 'pc',
  formConf: configs.formConf,
  drawList: [],
  tabs: [
    {
      label: '基础组件',
      name: 'common',
      coms: [
        {
          title: '输入型组件',
          model: configs.inputComponents,
          color: 'var(--el-color-primary)',
        },
        {
          title: '选择型组件',
          model: configs.selectComponents,
          color: 'var(--el-color-primary)',
        },
        {
          title: '布局型组件',
          model: configs.layoutComponents,
          color: 'var(--el-color-danger)',
        },
      ]
    },
    {
      label: '高级组件',
      name: 'custom',
      coms: [],
    },
    {
      label: '模板案例',
      name: 'template',
      coms: [],
    },
  ],
  activeId: null,
  activeData: {},
  tempActiveId: null,
  tempActiveData: {},
})

///新增组件 
const addComponent = ele => {
  const clone = cloneComponent(ele)
  state.value.drawList.push(clone)
  activeFormItem(clone)
}
// 记录当前选中元素
const activeFormItem = ele => {
  state.value.activeData = ele
  state.value.activeId = ele.formId
}
// 克隆组件
const cloneComponent = origin => {
  // const target = JSON.parse(JSON.stringify(origin))
  // target.formId = new Date().getTime()
  // state.value.tempActiveData = target
  // return target
  const clone = JSON.parse(JSON.stringify(origin))
  clone.formId = new Date().getTime()
  if (!clone.layout) clone.layout = "colFormItem"
  if (clone.layout === "colFormItem") {
    clone.vModel = `field${clone.formId}`
    clone.placeholder !== undefined && (clone.placeholder += clone.label)
    state.tempActiveData = clone
  } else if (clone.layout === "rowFormItem") {
    if (clone.rowType === "table") {
      clone.vModel = `field${clone.formId}`
    }
    clone.componentName = `row${clone.formId}`
    clone.gutter = state.formConf.gutter
    cloneChildrenOfRowFormItem(clone)
    state.tempActiveData = clone
  }
  return state.tempActiveData
}
// 拖拽结束
const onEnd = (obj) => {
  if(obj.from !== obj.to) {
    state.value.activeData = state.value.tempActiveData
    state.value.activeId = state.value.tempActiveId
  }
}
const getSameTagCmpNum = (tag) => {
  return state.value.drawList.reduce((count, item) => {
    if (item.children) {
      return (
        count +
        item.children.reduce((c, t) => {
          return t.tag === tag ? c + 1 : c
        }, 0)
      )
    }
    return item.tag === tag ? count + 1 : count
  }, 0)
}
//克隆rowformitem子组件
const cloneChildrenOfRowFormItem = (rowFormItem) => {
  if (rowFormItem.children && rowFormItem.children.length) {
    const children = rowFormItem.children
    children.forEach((clone, index) => {
      clone.formId = rowFormItem.formId + index + 1
      clone.__ID = clone.formId + new Date().getTime() // 改变__ID后可以实现强制更新组件
      if (!clone.layout) clone.layout = "colFormItem"
      if (clone.layout === "colFormItem") {
        clone.vModel = `field${clone.formId}`
        clone.placeholder !== undefined && (clone.placeholder += clone.label)
      } else if (clone.layout === "rowFormItem") {
        clone.componentName = `row${clone.formId}`
        clone.gutter = state.formConf.gutter;
        cloneChildrenOfRowFormItem(clone);
      }
    });
  }
};

provide("activeFormItem", activeFormItem)
// provide("deleteItem", drawingItemDelete)
// provide("copyItem", drawingItemCopy)

</script>

<style scope lang="scss">
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  min-width: 1276px;
  min-height: 800px;
  background-color: #f1f2f3;
}

.left-container {
  width: 300px;
  background-color: #fff;
  .com-title{
    border-left: 3px solid rgb(64, 158, 255); padding-left: 5px; margin-bottom: 5px; font-size: 20px;
    font-size: 14px;
    color: #222;
    margin: 6px 2px;
    .svg-icon {
      color: #666;
      font-size: 18px;
    }
  }
  .com-item {
    display: inline-block;
    width: 48%;
    margin: 1%;
    transition: transform 0ms !important;
  }
  .com-body {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background: #fff;
    font-size: 12px;
    line-height: 18px;
    cursor: move;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    .svg-icon {
      color: #777;
      font-size: 15px;
    }
    &:hover {
      border: 1px dashed #787be8;
      color: #787be8;
      .svg-icon {
        color: #787be8;
      }
    }
  }
}
.main-container {
  flex: 1;
  background-color: #fff;
  border-left: 1px dashed #bbb;
  border-right: 1px dashed #bbb;
  .main-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 2px solid #e4e7ed;
    button{
      height: 28px;
    }
    .operate button{
      padding: 0;
    }
  }
  .empty-info {
    position: absolute;
    top: 33%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 18px;
    color: #ccb1ea;
    letter-spacing: 4px;
  }
  .drawing-board{
    position: relative;
    .com-item {
      &.sortable-ghost {
        border: 1px solid #ccc;
        border-top-color: transparent;
        width: 100%;
        height: 60px;
        overflow: hidden;
        background-color: var(--color-whites);
      }
    }
    .sortable-ghost {
      position: relative;
      display: block;
      height: 60px;
      overflow: hidden;
      background: #fff;
      color: #FFF;
      &::before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 3px;
        background: #5959df;
        z-index: 2;
      }
    }
  }
}
.right-container {
  width: 300px;
  background-color: #fff;
}

</style>