<template>
    <div class="hello">
        <div class="row">
            <div class="col-md-6">
                <h2>Products</h2>
            </div>
            <div class="col-md-6 text-right">
                 <button @click="toggle()" class="btn btn-primary mb-2">Create</button>
            </div>
        </div>

        <form v-if="create" @submit.prevent="createProduct"  class="mb-3">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="Name" v-model="product.productName">
            </div>
            <button  type="submit" class="btn btn-light btn-block">Save</button>
        </form>



        <div class="card card-body mb-2" v-for="product in getProducts" v-bind:key="product.productID">
            <h3>{{ product.productName }}</h3>
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
            product: {
                productID: '',
                productName: ''
            }
        }
    },

    methods: {
      toggle() {
          this.create = ! this.create;
      },

      createProduct() {
            this.$apollo.mutate({
            // Query
            mutation: gql`
                mutation
                    createProduct ($productName: String!) {
                        createProduct (productName: $productName) {
                        productID
                        productName
                    }
             }`,
            // Parameters
            variables: {
            productName: this.product.productName,
            }
        }).then((data) => {
            this.getProducts.push({productID: data.data.createProduct.productID, productName: data.data.createProduct.productName})
            this.product.productName = ''
        }).catch((error) => {
            console.error(error)
        })
      }
    },

    apollo: {
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
