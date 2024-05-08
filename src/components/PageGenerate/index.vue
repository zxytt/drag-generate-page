<template>
  <el-container class="container">
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
                >
                  <template #item="{ element, index }">
                    <div
                      :key="index"
                      class="com-item"
                      @click="addComponent(element)"
                    >
                      <div class="com-body">
                        {{ element.label }}
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
    <el-main class="main-container p0">
      <MainRender 
        groupName="comsGroup"
        :list="state.drawList"
      />
      <!-- <div class="flex main-navbar">
        <div>
          <el-button>PC</el-button>
          <el-button>Mobile</el-button>
        </div>
        <div>
          <el-button text>清空</el-button>
          <el-button text>预览</el-button>
        </div>
      </div>
      <div>
        <Draggable
          :group="{
            name: 'comsGroup',
          }"
          :list="state.drawList"
          item-key="index"
          ghost-class="ghost" 
          :force-fallback="true"
          class="h100px"
        >
          <template #item="{ element, index }">
            <div>
              {{ element.label }}
            </div>
          </template>
        </Draggable>
      </div> -->
    </el-main>
    <el-aside class="right-container">aside</el-aside>
  </el-container>
</template>

<script setup>
import configs from './configs'
import Draggable from 'vuedraggable' 

const state = ref({
  activeTabName: 'common',
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
  drawList: []
})

///新增组件
const addComponent = (item) => {
  state.value.drawList.push(item);
}
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
}
.main-container {
  flex: 1;
  background-color: #fff;
  border-left: 1px dashed #bbb;
  border-right: 1px dashed #bbb;
}
.right-container {
  width: 300px;
  background-color: #fff;
}
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
</style>