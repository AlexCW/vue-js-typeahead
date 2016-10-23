<style>

ul {
  list-style: none;
}

.tt-menu {
  cursor: pointer;
  width: 100%;
  text-align: center;
}

.tt-menu h2 {
  font-size: 100%;
  margin: 5px;
}

.tt-suggestion.tt-selectable{
  border: 1px solid lightgray;
  border-radius: 2px;
}
</style>

<template>
<div class="col-sm-6">
  <div id="ingredients">
    <h1>Ingredients</h1>
    <div class="alert alert-danger" v-if="alert">{{alert}}</div>
    <div class="card">
        <template v-if="images.length">
          <template v-for="image in images">
            <img class="card-img-top" height="200" width="300" v-bind:src="image" alt="Card image cap">
          </template>
        </template>
        <template v-else>
            <img class="card-img-top" height="200" width="300" src="https://img.klik-eat.com/inc/upload/images/restaurant/logos/Placeholder/Placeholder%20-%20food.jpg" alt="Card image cap"/>
        </template>
        <div class="card-block">
            <h4 class="card-title">Your Ingredients List</h4>
            <p class="card-text">Add ingredients to your ingredients list and we will do our best to suggets you the best recipes for your pantry of ingredients.</p>
        </div>
        <ul class="list-group list-group-flush">
            <li v-for="(ingredient, index) in ingredients" class="list-group-ingredient">
                <lookahead keep-alive v-model="ingredient.text" src="http://api.eataway.co.uk/ingredients" displayKey="name"></lookahead>
                <a class="btn btn-success" v-on:click="addRow(index, $event)">+</a>
                <a class="btn btn-danger" v-on:click="removeRow(index, $event)">-</a>
            </li>
        </ul>
        </div>
    </div>
  </div>
</template>

<script>
import Lookahead from './Lookahead.vue'

export default {
  template: '#ingredients',
  components: { 'lookahead': Lookahead },
  data: function () {
    return {
      alert: '',
      images: [],
      ingredients: [
        {text: ''}
      ]
    }
  },
  created: function () {
  },
  methods: {
    addRow: function (index, e) {
      if (this.ingredients.length >= 20) {
        this.alert = 'You can have a maximum of twenty ingredients in your list.'
      }
      this.ingredients.splice(index + 1, 0, { text: '' })
    },
    removeRow: function (index, e) {
      if (this.ingredients.length > 1) {
        this.ingredients.splice(index, 1)
      } else {
        this.alert = 'You must have at least one ingredient in your list.'
      }
    },
    formatOptions: function (options) {
      return options.data.map(function (data) {
        data.attributes.id = data.id
        return data.attributes
      })
    }
  },
  watch: {
    ingredients: {
      deep: true,
      handler: function (ingredients) {
        console.log(ingredients)
        if (ingredients.length > 1) {
          this.alert = ''
        }
      }
    }
  }
}
</script>