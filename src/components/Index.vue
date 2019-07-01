<template>
  <div class="index container">
    <div class="card" v-for="Recepie in Recepies" :key="Recepie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecepie(Recepie.id)">delete</i>
        <h2 class="indigo-text">{{Recepie.title}}</h2> 
        <ul class="incredients">
          <li class="" v-for="(ingredient, index) in Recepie.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul> 
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name : 'EditRecepie', params:{ recepie_slug : Recepie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data() {
    return {
      Recepies : []
    }
  },
  methods:{
    deleteRecepie(id){
      // delete doc from firestore
      db.collection('recepies').doc(id).delete()
      .then(() => {
        this.Recepies = this.Recepies.filter(Recepie =>{
        return Recepie.id != id
        })
      })
    }
  },
  created(){
    // fetch data from firestore
    db.collection('recepies').get()
    .then(snapshote => {
      snapshote.forEach(doc => {
        //console.log(doc.data(), doc.id)
        let Recepie = doc.data()
        Recepie.id = doc.id
        this.Recepies.push(Recepie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size :1.8em;
  text-align: center;
  margin-top: 0px;
}
.index .incredients{
  margin: 30px auto;
}
.index .incredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top:4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
