<template>
  <div class="panel">
    <ul v-for="(list, n) in Lists">
      <li class="left-list"><div :class="list.visible ? 'open' : 'close'" @click="ToggleList(n, list.visible)"/><LeftList :Visible="list.visible" :Items="list.items" :Num="n"/></li>
    </ul>
  </div>
</template>

<script>
import LeftList from './LeftList'
import Item from './Item'
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
  name: 'LeftPanel',
  components: {
    Item,
    LeftList
  },
  setup() {
    const Store = useStore()
    const Lists = computed(() => Store.state.Lists)
    const ToggleList = (address, currVis) => {
      Store.commit(currVis ? 'HideList' : 'ShowList', address)
    }
    return {
      Lists, ToggleList
    }
  }
}
</script>

<style>
.panel {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 2vh 2vw;
  border: 1px solid black;
}
.left-list {
  display: flex;
  flex-direction: row;
}
.close:before {
  content: '\25BA';
}
.open:before {
  content: '\25BC';
}
</style>