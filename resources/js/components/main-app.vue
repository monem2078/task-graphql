<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-info mb-2">
                <router-link class="navbar-brand" style="margin-left:70px" :to="{ name: 'products' }">Products</router-link>
                <router-link class="navbar-brand" style="margin-left:50px" :to="{ name: 'buyers' }">Buyers</router-link>
                <router-link class="navbar-brand" style="margin-left:50px" :to="{ name: 'orders' }">Orders</router-link>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
