<template>
  <div class="right-list">
    <div class="title-button">
      <span>List {{Num + 1}}</span>
      <button :disabled="!Visible"
              @click="ToggleSort(Num)"
      >{{Sorted ? 'Перемешать' : 'Сортировать'}}</button>
    </div>
    <div v-if="Visible && Sorted" class="sq-row" v-for="(item, n) in Items">
      <ColorSq v-for="_ in item.amount"
               v-if="item.checked"
               :ListNum="Num"
               :RowNum="n"
               :Color="item.color"
      />
    </div>
    <div v-if="Visible && !Sorted" class="sq-row">
      <ColorSq v-for="sq in Squares"
               v-show="sq?.itemChecked"
               :ID="sq?.id"
               :ListNum="sq?.listNum"
               :RowNum="sq?.rowNum"
               :Color="sq?.color"/>
    </div>
  </div>
</template>

<script>
import ColorSq from './ColorSq'
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
export default {
  name: 'RightList',
  components: {ColorSq},
  props: {
    Num: Number,
    Visible: Boolean,
    Items: Array
  },
  setup(props) {
    const Store = useStore()
    const Sorted = ref(true)
    let Random = ref(Math.random())
    const Squares = computed(() => Store.state.Lists[props.Num].squares)

    const ToggleSort = () => {
      Sorted.value = !Sorted.value
      Store.commit('SetSquares', props.Num)
      Store.commit('Mix', props.Num)
    }
    return {
      Squares, Sorted, Random,
      ToggleSort
    }
  }
}
</script>

<style scoped>
.right-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
.title-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.sq-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>