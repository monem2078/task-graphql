<template>
    <div class="hello">
       <div class="row">
            <div class="col-md-6">
                <h2>Buyers</h2>
            </div>
            <div class="col-md-6 text-right">
                 <button @click="toggle()" class="btn btn-primary mb-2">Create</button>
            </div>
        </div>

        <form v-if="create" @submit.prevent="createBuyer"  class="mb-3">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Name" v-model="buyer.buyerName">
            </div>
            <button  type="submit" class="btn btn-light btn-block">Save</button>
        </form>




        <div class="card card-body mb-2" v-for="buyer in getBuyers" v-bind:key="buyer.buyerID">
            <h3>{{ buyer.buyerName }}</h3>
            <hr>
             <router-link class="btn btn-warning" :to="`/buyer/orders/${buyer.buyerID}`">Orders</router-link>
         </div>

     </div>
</template>


<script>
import gql from 'graphql-tag';
export default {
    data() {
        return{
            create: false,
            clicked: false,
            buyer: {
                buyerID: '',
                buyerName: ''
            },
            orders: [{}],
        }
    },

    methods: {
      toggle() {
          this.create = !this.create;
      },

      createBuyer() {
            this.$apollo.mutate({
            // Query
            mutation: gql`
                mutation
                     createBuyer ($name: String!) {
                        createBuyer (buyerName: $name) {
                        buyerID
                        buyerName
                    }
             }`,
            // Parameters
            variables: {
            name: this.buyer.buyerName,
            }
        }).then((data) => {
            this.getBuyers.push({buyerID: data.data.createBuyer.buyerID, buyerName: data.data.createBuyer.buyerName})
            this.buyer.buyerName = ''
        }).catch((error) => {
            console.error(error)
        })
      },

      getOrdersByBuyer(buyerID, index) {
        let x = '#element' + index
        console.log(x)
        this.$el.querySelector(x).classList.replace('hidden', 'show')
        this.$apollo.mutate({
            // Query
            mutation: gql`
                mutation
                     getOrdersByUser ($user_id: ID!) {
                        getOrdersByUser (user_id: $user_id) {
                        orderID
                            buyer {
                                buyerID
                                buyerName
                            }
                            product {
                                productID
                                productName
                            }
                    }
             }`,
            // Parameters
            variables: {
            user_id: buyerID,
            }
        }).then((data) => {
            this.orders = data.data.getOrdersByUser
        }).catch((error) => {
            console.error(error)
        })
       }
    },




    apollo: {
         getBuyers: gql`
            query{
                getBuyers {
                    buyerID
                    buyerName
                }
            }
            `,
    }
}


</script>


<style scoped>
.hidden { display: none; }
.show {display: inline}
</style>
