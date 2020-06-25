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
                    <td>{{ product.model }}</td>
                    <td>{{ product.desc }}</td>
                    <td>${{ product.price }}</td>
                    <td><input :id="product._id" style="width: 30px" type="text" :value="product.quantity"></td>
                    <td>
                        <button @click.prevent="deleteProduct(product._id)" class="btn btn-danger">Eliminar</button>
                        <span class="pr-2"></span>
                        <button @click.prevent="updateProduct(product.model, product.desc, product.price,product._id)" class="btn btn-primary">
                            Actualizar</button>
                    </td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td>${{ total }}</td>
                </tr>
                </tbody>
            </table>
            <hr>
            <router-link :to="{name: 'home'}" class="btn btn-primary">Seguir comprando</router-link>
            <button @click.prevent="payProduct()" class="btn btn-success float-right">Proceder al pago</button>

        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                products: [],
                total: 0
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/cart';
            axios.get(apiURL).then(res => {
                this.products = res.data;
                this.products.forEach((value) => {
                    this.total += (value.price*value.quantity);
                });
            }).catch(error => {
                console.log(error)
            });

        },
        methods: {
            deleteProduct(id){
                let apiURL = `http://localhost:4000/cart/delete-cart/${id}`;
                let indexOfArrayItem = this.products.findIndex(i => i._id === id);
                if (window.confirm("¿Seguro que quieres eliminar este artículo de tu carrito??")) {
                    axios.delete(apiURL).then(() => {
                        this.products.splice(indexOfArrayItem, 1);
                        this.total = 0;
                        this.products.forEach((value) => {
                            this.total += (value.price*value.quantity);
                        });
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            updateProduct(model, desc, price, id){
                let quantity = document.getElementById(id).value;
                let apiURL = `http://localhost:4000/cart/update-cart/${id}`;
                axios.post(apiURL,{
                    model : model,
                    price: price,
                    desc: desc,
                    quantity: quantity
                }).then(() => {
                    this.$router.go();
                })
                    .catch(error => {
                    console.log(error)
                    console.log("Tenemos un problema2")
                });
            },
            payProduct(){
                this.total = 0;
                this.products.forEach((value) => {

                    console.log(value._id)
                    let apiURL = `http://localhost:4000/cart/delete-cart/${value._id}`;
                    axios.delete(apiURL).then(() => {
                    }).catch(error => {
                        console.log(error)
                    });
                    this.$router.go();
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
