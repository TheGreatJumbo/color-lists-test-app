<template>
<div class="app">
  <LeftPanel/>
  <RightPanel/>
</div>
</template>

<script>
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
  name: 'App',
  components: {
    LeftPanel,
    RightPanel
  },
  setup() {
    const State = useStore()
    const Lists = computed(() => State.Lists)
    return {
      Lists
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-size: 16px;
}
.app {
  display: flex;
  flex-direction: row;
  margin: 0;
  height: 97vh;
}
</style>
