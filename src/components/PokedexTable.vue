<template>
  <div>
      <table>
          <thead>
              <tr>
                  <th>
                      #
                  </th>
                  <th>Name (EN)</th>
                  <th>
                      Name (JP)
                  </th>
                  <th>Type</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(poke, index) in pokemons" v-bind:key="index">
                  <td>{{ index + 1 }}</td>

                  <td v-if="index !== editIndex">{{ poke.name }}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.name">
                  </td>

                  <td v-if="index !== editIndex">{{ poke.name_jp }}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.name_jp">
                  </td>

                  <td v-if="index !== editIndex">{{ poke.pokemon_types.map(it => it.name).join(', ') }}</td>
                  <td v-if="index === editIndex">
                      <input type="text" v-model="form.pokemon_types">
                  </td>

                  <td v-if="index !== editIndex">
                      <button @click="openForm(index, poke)">Click to Edit</button>
                  </td>
                  <td v-if="index === editIndex">
                      <button @click="editPokemon">Update</button>
                      <button @click="closeForm">Cancel</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import PokedexApiStore from "@/store/PokedexApi"
export default {
    data() {
        return {
            //สำหรับเเสดงข้อมูล
            pokemons: [],

            //สำหรับฟอร์มเเก้ไข
            editIndex: -1,
            form:{
                id: '',
                name: '',
                name_jp: '',
                pokemon_types: ''
            }
        }
    },
    created() {
        this.fetchPokemon()
    },
    methods: {
        async fetchPokemon() {
            // dispatch to call Actions from Store (storeName.dispatch("actionName"))
            await PokedexApiStore.dispatch('fetchPokemon')
            this.pokemons = PokedexApiStore.getters.pokemons
        },
        openForm(index, poke){
            this.editIndex = index
            let cloned = JSON.parse(JSON.stringify(poke))
            this.form.id = cloned.id
            this.form.name = cloned.name
            this.form.name_jp = cloned.name_jp
            this.form.pokemon_types = cloned.pokemon_types.map(it => it.name).join(", ")
        },
        closeForm(){
            this.editIndex = -1
            this.form ={
                id: '',
                name: '',
                name_jp: '',
                pokemon_types: ''
            }
        },
        async editPokemon(){
            let payload = {
                index: this.editIndex,
                id: this.form.id,
                name: this.form.name,
                name_jp: this.form.name_jp,
                pokemon_types: this.form.pokemon_types.split(',').map(
                    (item) => item.trim()
                )
            }
            await PokedexApiStore.dispatch('editPokemon', payload)
            this.closeForm()
            this.fetchPokemon()
        }
    }
}
</script>

<style scoped lang="scss">

</style>