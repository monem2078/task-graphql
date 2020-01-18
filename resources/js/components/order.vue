<template>
    <div class="hello">
        <div class="card card-body mb-2" v-for="order in orders" v-bind:key="order.orderID">
            <h3  class="alert alert-light">ID: {{ order.orderID }}</h3>
            <h3 v-if="order.buyer" class="alert alert-primary">Customer: {{ order.buyer.buyerName }}</h3>
            <hr>
            <h2 v-if="order.product" class="alert alert-warning">Product: {{ order.product.productName }}</h2>
         </div>
     </div>
</template>


<script>
import gql from 'graphql-tag';
export default {
    data() {
        return{
            create: false,
            order: {
                buyer: {
                    buyerName: '',
                    buyerID: ''
                },
                product: {
                    productName: '',
                    productID: ''
                }
            },
            orders: [{}]
        }
    },

      mounted: function() {
        this.$apollo.mutate({
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
            user_id: this.$route.params.id,
            }
        }).then((data) => {
            this.orders = data.data.getOrdersByUser
        }).catch((error) => {
            console.error(error)
        })
       },

    methods: {
      toggle() {
          this.create = !this.create;
      },
    },


}


</script>
