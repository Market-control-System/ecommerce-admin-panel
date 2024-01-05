<script setup>
//import '../assets/styles/mainCarcas.scss';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import {getProductList} from '@/api-service/product-service.js';
import ProductList from '@/components/products/ProductList.vue';

const authStore = useAuthStore();

const exitBtn = () => {
  authStore.logout();
};

let prList = ref([]);

const loadProductClick = async () => {
      const res = await getProductList('profitools', {filtr:'all'});
      if (!res.err) {
        prList.value = res.data;
        console.log(prList.value);
      } else {
        console.log(res.err);
      }
}

</script>

<template>
  <div class="container ">
    <button class="btn btn-primary" @click="exitBtn">Exit</button>
    <button class="btn btn-danger" @click="loadProductClick">Load product</button>
    <div class="row">
      <div class="col-3">
        <div class="left-menu">
          <div class="side-bar-logo">Admin Panel</div>

        </div>
      </div>
      <div class="col-9">
        {{ authStore.user }}
          <ProductList :productList = "prList"/>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss">
//@import "@/assets/styles/my-component-styles.scss";
</style>