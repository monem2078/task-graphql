<template>
    <div class="hello">
        <div class="row">
            <div class="col-md-6">
                <h2>Orders</h2>
            </div>
            <div class="col-md-6 text-right">
                 <button @click="toggle()" class="btn btn-primary mb-2">Create</button>
            </div>
        </div>

        <form v-if="create" @submit.prevent="createOrder"  class="mb-3">
            <div class="form-group">
                <label for="buyer">Buyer</label>
                <select class="form-control" id="buyer" v-model="order.buyer.buyerID">
                    <option v-for="buyer in getBuyers" :key="buyer.buyerID" :value="buyer.buyerID"> {{ buyer.buyerName   }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="product">Product</label>
                <select class="form-control" id="product" v-model="order.product.productID" >
                    <option v-for="product in getProducts" :key="product.productID" :value="product.productID" >{{ product.productName }}</option>
                </select>
            </div>
            <button  type="submit" class="btn btn-light btn-block">Save</button>
        </form>


        <div class="card card-body mb-2" v-for="order in getOrders" v-bind:key="order.orderID">
            <h3 class="alert alert-primary">Customer: {{ order.buyer.buyerName }}</h3>
            <hr>
            <h2 class="alert alert-warning">Product: {{ order.product.productName }}</h2>
            <hr>
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
            }
        }
    },

    methods: {
      toggle() {
          this.create = !this.create;
      },

     createOrder() {
            this.$apollo.mutate({
            // Query
            mutation: gql`
                mutation
                    createOrder ($productID: ID!, $buyerID: ID!) {
                        createOrder (productID: $productID, buyerID: $buyerID) {
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
                productID: this.order.product.productID,
                buyerID: this.order.buyer.buyerID,
            }
        }).then((data) => {
            console.log(data.data.createOrder.buyer)
            this.getOrders.push(
                {
                    buyer: data.data.createOrder.buyer,
                    orderID: data.data.createOrder.OrderID,
                    product: data.data.createOrder.product
                })
            this.order.buyer.buyerName = '';
            this.order.buyer.buyerID = '';
            this.order.product.productName = '';
            this.order.product.productID = '';

        }).catch((error) => {
            console.error(error)
        })
      }
    },

    apollo: {
         getOrders: gql`
            query{
                getOrders {
                    orderID
                    buyer{
                        buyerName
                    }
                    product{
                        productName
                    }
                }
            }
            `,
             getBuyers: gql`
            query{
                getBuyers {
                    buyerID
                    buyerName
                }
            }
            `,
            getProducts: gql`
            query{
                getProducts {
                    productID
                    productName
                }
            }
            `,
    }
}


</script>
