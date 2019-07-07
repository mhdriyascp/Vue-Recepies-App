<template>
    <div class="add-recepie container">
        <h2 class="center-align indigo-text">Add New Recepie</h2>     
        <form @submit.prevent="AddRecepie">
            <div class="field-title">
                <label for="title">Recepie Title :</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div  v-for="(ing, index) in ingredients"  :key="index" class ="field">
                <label for="incredient">Incredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:(press Enter for add more)</label> 
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Recepie</button>
            </div>
        </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name : 'AddRecepie',
    data() {
        return {
            title : null,
            another : null,
            ingredients:[],
            feedback: null,
            slug : null
        }
    },
    methods: {
        AddRecepie(){
            //console.log(this.title, this.ingredients)
            if(this.title){
                this.feedback = null
                // create a slug 
                this.slug = slugify(this.title, {
                    replacement : '-',
                    remove :/[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                console.log(this.slug) 
                db.collection('recepies').add({
                    title: this.title,
                    ingredients : this.ingredients,
                    slug :this.slug
                }).then(() => {
                    //redirect to home page
                    this.$router.push({ name : 'Index'})
                }).catch( err =>{
                    console.log(err)
                })
            } else {
                this.feedback ="You Must Enter a Recepie Title"
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback ="you must enter value to add an ingredient"
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    } 
}
</script>
<style>
.add-recepie{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;
}
.add-recepie h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-recepie .field {
    margin: 20px auto;
    position: relative;
}
.add-recepie .delete {
    position: absolute;
    right:0;
    bottom:16px;
    color:#aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
