<template>
<div class="panel">
  <div class="right-list" v-for="(list, n) in Lists">
    <RightList :Visible="list.visible" :Items="list.items" :Num="n"/>
  </div>
</div>
</template>

<script>
import RightList from './RightList'
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
name: 'RightPanel',
  components: {RightList},
  setup() {
    const Store = useStore()
    const Lists = computed(() => Store.state.Lists)
    return {
      Lists
    }
  }
}
</script>

<style scoped>
.right-list {
  list-style: none;
  margin: 5px;
}
</style>