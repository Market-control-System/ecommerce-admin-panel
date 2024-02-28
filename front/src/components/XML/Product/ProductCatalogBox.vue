<script setup>
import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import ProductRowBox from './ProductRowBox.vue';

const xmlRoetkaStore = useXmlRozetkaStore();
</script>

<template>
    <div v-for="product in xmlRoetkaStore.zp" :key="product.productInfo.id">
        <ProductRowBox
            :product-in-x-m-l="product.productInXML"
            :product-info="product.productInfo"
            :cat-list="xmlRoetkaStore.catList"/>
        <hr />
    </div>
</template>
<style scoped>
</style>
