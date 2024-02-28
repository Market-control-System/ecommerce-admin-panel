<script setup>
import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import ProductRowBox from './ProductRowBox.vue';
import PaginationProduct from './PaginationProduct.vue';

const xmlRoetkaStore = useXmlRozetkaStore();
// const { pagedProducts } = xmlRoetkaStore;
</script>

<template>
    <div>
        <PaginationProduct />
        <div v-for="product in xmlRoetkaStore.pagedProducts" :key="product.productInfo.id">
            <ProductRowBox
                :product-in-x-m-l="product.productInXML"
                :product-info="product.productInfo"
                :cat-list="xmlRoetkaStore.catList"/>
            <hr />
        </div>
        <PaginationProduct />
    </div>
</template>
<style scoped>
</style>
