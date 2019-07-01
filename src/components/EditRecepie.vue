<template>
    <div v-if="Recepie" class="edit-recepie container">
        <h2>Edit {{ Recepie.title }} </h2>
        <form @submit.prevent="EditRecepie">
            <div class="field-title">
                <label for="title">Recepie Title :</label>
                <input type="text" name="title" v-model="Recepie.title">
            </div>
            <div  v-for="(ing, index) in Recepie.ingredients"  :key="index" class ="field">
                <label for="incredient">Incredient:</label>
                <input type="text" name="ingredient" v-model="Recepie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label> 
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Recepie</button>
            </div>
        </form>
    </div>
</template>
<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name : 'EditRecepie',
    data() {
        return {
            Recepie : null,
            another : null,
            feedback : null
        }
    },
    methods: {
        EditRecepie(){
            //console.log(this.Recepie.title, this.Recepie.ingredients)
            if(this.Recepie.title){
                this.feedback = null
                // create a slug 
                this.Recepie.slug = slugify(this.Recepie.title, {
                    replacement : '-',
                    remove :/[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                //console.log(this.slug) 
                db.collection('recepies').doc(this.Recepie.id).update({
                    title: this.Recepie.title,
                    ingredients : this.Recepie.ingredients,
                    slug :this.Recepie.slug
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
                this.Recepie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback ="you must enter value to add an ingredient"
            }
        },
        deleteIng(ing){
            this.Recepie.ingredients = this.Recepie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('recepies').where('slug', '==', this.$route.params.recepie_slug )
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.Recepie = doc.data()
                this.Recepie.id = doc.id
            })
        })
    }
}
</script>
<style>
.edit-recepie{
    margin-top:60px;
    padding: 20px;
    max-width: 500px;
}
.edit-recepie h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-recepie .field {
    margin: 20px auto;
    position: relative;
}
.edit-recepie .delete {
    position: absolute;
    right:0;
    bottom:16px;
    color:#aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>

