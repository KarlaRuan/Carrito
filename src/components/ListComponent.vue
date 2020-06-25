<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Modelo</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Cantidad</th>

                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product._id">
                        <td id="model">{{ product.model }}</td>
                        <td id="desc">{{ product.desc }}</td>
                        <td>$<span id="price">{{ product.price }}</span></td>
                        <td><input :id="product._id" style="width: 30px" type="text" value="1"></td>
                        <td>
                            <button @click.prevent="add2Cart(product.model, product.desc, product.price,product._id)" class="btn">
                                <img src="../../public/img/carrito-de-compras.png" style="width: 30px"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                products: []
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/product';
            axios.get(apiURL).then(res => {
                this.products = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            add2Cart(model, desc, price, id){
                let quantity = document.getElementById(id).value;
                let apiURL = `http://localhost:4000/cart/add-cart`;
         //       console.log(model+" - "+desc+" - "+price+" - "+quantity)
                axios.post(apiURL, {
                    model : model,
                    price: price,
                    desc: desc,
                    quantity: quantity
                }).then(() => {
                    this.$router.push('/view')
                }).catch(error => {
                        console.log(error)
                    console.log("Tenemos un problema")
                });
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>
