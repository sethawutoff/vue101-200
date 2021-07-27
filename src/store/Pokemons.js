import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

let api_endpoint = "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"

Vue.use(Vuex)

export default new Vuex.Store({
    //state เหมือน fields ใน oop
  state: {
      data: [],
  },
  getters:{
    pokemons: (state) => state.data,
  },

  //mutation เหมือน private setter
  //เอาไว้เปลี่ยนค่าใน state
  mutations: {
    fetch(state, { res }){
        state.data = res.data
    },
    add(state, { payload }){
        state.data.push(payload)
    },
    edit(state, { payload }){
        state.data[payload.index].name = payload.name
        state.data[payload.index].type = payload.type
    }
  },

  //action เหมือน public methods ใน oop
  //ให้ภายนอก(component อื่น)เรียกใช้
  //หรือดึงค่าจากภายนอก เช่น API, server
  actions: {
      //commit เป็น keyword ไว้เรียก mutation
    async fetchPokemon({ commit }){
        let res= await Axios.get(api_endpoint)

        commit('fetch', { res })
    },
    addPokemon({ commit }, payload){
        //todo: call api to add data
        commit("add", { payload })
    },
    editPokemon({ commit }, payload){
      // todo: call api to edit data
      commit('edit', { payload })
    },
  },
  modules: {
  }
})
