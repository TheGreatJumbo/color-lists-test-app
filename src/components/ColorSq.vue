<template>
<div class="sq" :style="`background-color: ${Color}`" @click="Del({list: ListNum, item: RowNum, id: ID})"/>
</template>

<script>
import {useStore} from 'vuex'

export default {
  name: 'ColorSq',
  props: {
    ListNum: Number,
    RowNum: Number,
    Color: String,
    ID: Number
  },
  setup() {
    const Store = useStore()
    const Del = address => {
      Store.commit('DeleteSq', address)
      if (Store.state.Lists[address.list].items[address.item].amount === 0)
        Store.commit('Uncheck', address)
    }
    return {
      Del
    }
  }
}
</script>

<style scoped>
.sq {
  width: 1rem;
  height: 1rem;
  border: 1px solid white;
}
</style>