<template>
  <component v-if="!!components[item.tag]&&!item.disTag" :is="components[item.tag]" :conf="conf" :item="item"  v-bind="$attrs"  :form-data="conf.model" v-model="conf.model[item.vModel]">
    <template v-for="(val, name) in item.__slot__" v-slot:[name]>
      {{ val }}
    </template>
  </component>
  <component v-else :is="item.disTag??item.tag" v-bind="$attrs" :form-data="conf.model" v-model="conf.model[item.vModel]">
    <template v-for="(val, name) in item.__slot__" v-slot:[name]>
      {{ val }}
    </template>
  </component>
</template>

<script setup name="render-component">
const props = defineProps({
  item: Object,
  attrs: Object,
  conf: Object,
})

const components = {}
const modules = import.meta.glob('./Elements/FormItems/My*/index.vue', { eager: true })
console.log('renderComponent-modules', modules);
for(const path in modules) {
  let cname = modules[path].default.name
  components[cname] = modules[path].default
}
console.log('renderComponent', props.item, components);
let vm = ref(props.item.defaultValue)
if (props.conf !== undefined) {
  if(props.conf.model[props.item.vModel]===undefined)
    props.conf.model[props.item.vModel] = ref(props.item.defaultValue)
  vm.value = props.conf.model[props.item.vModel]
}
</script>