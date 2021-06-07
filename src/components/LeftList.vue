<template>
  <div>
    <input :class="CheckboxState.class"
           :disabled="!Visible"
           :checked="CheckboxState.checked"
           type="checkbox"
           :id="`L${Num}`"
           @change="ToggleAll"
    >
    <label :for="`L${Num}`">List {{Num + 1}}</label>
    <ul v-if="Visible" v-for="(item, n) in Items">
      <li class="left-list-item">
        <Item :Num="n" :ListNum="Num" :Amount="item.amount" :Checked="item.checked" :Color="item.color"/>
      </li>
    </ul>
  </div>

</template>

<script>
import Item from './Item'
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  name: 'LeftList',
  components: {
    Item
  },
  props: {
    Num: Number,
    Visible: Boolean,
    Items: Array
  },
  setup(props) {
    const Store = useStore()
    const ListChecked = computed(() => Store.state.Lists[props.Num].items.map(list => (list.checked)))

    const CheckboxState = computed(() => {
      if (ListChecked.value.includes(false) && ListChecked.value.includes(true)) return {class: 'point', checked: false}
      if (ListChecked.value.includes(false) && !ListChecked.value.includes(true)) return {class: '', checked: false}
      if (!ListChecked.value.includes(false) && ListChecked.value.includes(true)) return {class: '', checked: true}
    })
    const ToggleAll = () => {
      if (ListChecked.value.includes(false) && ListChecked.value.includes(true)) {
        Store.state.Lists[props.Num].items.forEach((_, i) => {
          Store.commit('Check', {list: props.Num, item: i})
        })
      }
      else if (ListChecked.value.includes(false) && !ListChecked.value.includes(true)) {
        Store.state.Lists[props.Num].items.forEach((_, i) => {
          Store.commit('Check', {list: props.Num, item: i})
        })
      }
      else if (!ListChecked.value.includes(false) && ListChecked.value.includes(true)) {
        Store.state.Lists[props.Num].items.forEach((_, i) => {
          Store.commit('Uncheck', {list: props.Num, item: i})
        })
      }
    }
    return {
      CheckboxState,
      ToggleAll
    }
  }
}
</script>

<style scoped>
.point {
  display: none;
}
.point + label:before {
  content: '*';
  display: inline-block;
  text-align: center;
  width: 11px;
  height: 11px;
  margin: 0 2px;
  color: gray;
  border: 1px solid gray;
  border-radius: 2px;
}
.left-list-item {
  list-style: none;
  display: flex;
  flex-direction: row;
}
</style>