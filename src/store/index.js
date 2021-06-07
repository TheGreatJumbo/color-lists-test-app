import {createStore} from 'vuex'

export default createStore({
  state: {
    Lists: [
      {
        visible: true,
        items: [
          {amount: 1, checked: true, color: '#ff0000'},
          {amount: 2, checked: true, color: '#ff7f00'},
          {amount: 3, checked: true, color: '#ffff00'},
          {amount: 4, checked: true, color: '#00ff00'}
        ],
        squares: [],
        mix: []
      },
      {
        visible: false,
        items: [
          {amount: 2, checked: true, color: '#ff0000'},
          {amount: 4, checked: true, color: '#ff7f00'},
          {amount: 6, checked: true, color: '#ffff00'},
          {amount: 8, checked: true, color: '#00ff00'},
          {amount: 10, checked: true, color: '#00ffff'}
        ],
        squares: [],
        mix: []
      },
      {
        visible: false,
        items: [
          {amount: 10, checked: true, color: '#ff0000'},
          {amount: 9, checked: true, color: '#ff7f00'},
          {amount: 8, checked: true, color: '#ffff00'},
          {amount: 7, checked: true, color: '#00ff00'},
          {amount: 6, checked: true, color: '#00ffff'},
          {amount: 5, checked: true, color: '#0000ff'},
          {amount: 4, checked: true, color: '#ff00ff'},
          {amount: 3, checked: true, color: '#ff7fff'},
          {amount: 2, checked: true, color: '#7f7f7f'},
          {amount: 1, checked: true, color: '#000000'}
        ],
        squares: [],
        mix: []
      },
      {
        visible: false,
        items: [
          {amount: 12, checked: true, color: '#ff0000'},
          {amount: 10, checked: true, color: '#ff7f00'},
          {amount: 8, checked: true, color: '#ffff00'},
          {amount: 6, checked: true, color: '#00ff00'},
          {amount: 4, checked: true, color: '#00ffff'},
          {amount: 2, checked: true, color: '#0000ff'}
        ],
        squares: [],
        mix: []
      },
      {
        visible: false,
        items: [
          {amount: 3, checked: true, color: '#ff0000'},
          {amount: 6, checked: true, color: '#ff7f00'},
          {amount: 9, checked: true, color: '#ffff00'},
          {amount: 12, checked: true, color: '#00ff00'}
        ],
        squares: [],
        mix: []
      }
    ],
  },
  mutations: {
    ShowList(state, address) {
      state.Lists.forEach(list => list.visible = false)
      state.Lists[address].visible = true
    },
    HideList(state, address) {
      state.Lists[address].visible = false
    },
    Check(state, address) {
      state.Lists[address.list].items[address.item].checked = true
      state.Lists[address.list].squares.forEach(sq => {
        if (sq.rowNum === address.item) sq.itemChecked = true
      })
    },
    Uncheck(state, address) {
      state.Lists[address.list].items[address.item].checked = false
      state.Lists[address.list].squares.forEach(sq => {
        if (sq.rowNum === address.item) sq.itemChecked = false
      })
    },
    SetAmount(state, payload) {
      const CurrItem = state.Lists[payload.list].items[payload.item]
      let MaxID = 0
      state.Lists[payload.list].squares.map((sq, n) => {
        if (sq.id > MaxID) MaxID = sq.id
      })
      if (payload.amount > CurrItem.amount) {
        for (let a = CurrItem.amount; a < payload.amount; a++) {
          state.Lists[payload.list].squares.unshift({
            id: MaxID + 1,
            itemChecked: CurrItem.checked,
            listNum: payload.list,
            rowNum: payload.item,
            color: CurrItem.color
          })
        }
      }
      else {
        const Sq = state.Lists[payload.list].squares.findIndex(sq => sq.rowNum === payload.item)
        state.Lists[payload.list].squares.splice(Sq, 1)
      }
      state.Lists[payload.list].items[payload.item].amount = payload.amount
    },
    SetColor(state, payload) {
      const OldColor = state.Lists[payload.list].items[payload.item].color
      state.Lists[payload.list].items[payload.item].color = payload.color
      state.Lists[payload.list].squares.forEach(sq => {
        if (sq.color === OldColor) sq.color = payload.color
      })
    },
    DeleteSq(state, payload) {
      state.Lists[payload.list].items[payload.item].amount = state.Lists[payload.list].items[payload.item].amount - 1

      const Sq = state.Lists[payload.list].squares.findIndex(sq => sq.id === payload.id)
      state.Lists[payload.list].squares.splice(Sq, 1)
    },
    SetSquares(state, list) {
      let id = 0
      state.Lists[list].squares = []
      state.Lists[list].items.forEach((item, n) => {
        for (let sq = 0; sq < item.amount; sq++)
        {
          state.Lists[list].squares.push({
            id: id,
            itemChecked: item.checked,
            listNum: list,
            rowNum: n,
            color: item.color
          })
          id++
        }
      })
    },
    Mix(state, list) {
      state.Lists[list].squares = state.Lists[list].squares.map(i => [Math.random(), i]).sort().map(i => i[1])
    }
  }
})
