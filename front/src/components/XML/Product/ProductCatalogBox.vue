<script setup>
import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import ProductRowBox from './ProductRowBox.vue';
import PaginationProduct from './PaginationProduct.vue';

const xmlRoetkaStore = useXmlRozetkaStore();
</script>

<template>
    <div>
        <PaginationProduct />
        <div v-if="xmlRoetkaStore.pagedProducts">
            <div v-for="product in xmlRoetkaStore.pagedProducts" :key="product.productInfo.id">
                <ProductRowBox
                    :product-in-x-m-l="product.productInXML"
                    :product-info="product.productInfo"
                    :cat-list="xmlRoetkaStore.catList"/>
                <hr />
            </div>
        </div>
        <div v-else class="alert alert-danger">NOT pagedProducts</div>
        <PaginationProduct />
    </div>
</template>
<style scoped>
</style>
