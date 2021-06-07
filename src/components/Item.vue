<template>
  <div class="item">
    <div>
      <input type="checkbox" :id="Num" :checked="Checked" @change="ToggleCheck({list: ListNum, item: Num})">
      <label :for="Num">Item {{Num + 1}}</label>
    </div>
    <input type="number" min="0" max="100" v-model="AmountInput" @change="AmountInput !== '' && AmountInput !== 'e' ? ChangeAmount({list: ListNum, item: Num}) : null">
    <input type="color" v-model="ColorModel" @change="ChangeColor({list: ListNum, item: Num})">
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {ref} from 'vue'

export default {
  name: 'LeftItem',
  props: {
    Num: Number,
    ListNum: Number,
    Color: String,
    Amount: Number,
    Checked: Boolean
  },
  setup(props) {
    const Store = useStore()
    const AmountInput = ref(props.Amount.toString())
    const ColorModel = ref(props.Color)

    const ToggleCheck = address => Store.commit(props.Checked ? 'Uncheck' : 'Check', address)

    const ChangeAmount = address => {
      Store.commit(AmountInput.value === '0' ? 'Uncheck' : 'Check', address)
      Store.commit('SetAmount', {...address, amount: parseInt(AmountInput.value)})
    }
    const ChangeColor = address => {
      Store.commit('SetColor', {...address, color: ColorModel.value})
    }
    return {
      AmountInput, ColorModel,
      ToggleCheck, ChangeAmount, ChangeColor
    }
  }
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
  width: 100%;
  padding: 0 5px;
}
input[type='number'] {
  flex-grow: 1;
  margin: 0 5px;
}
.sq {
  width: 15px;
  height: 15px;
  border: 1px solid black;
}
</style>