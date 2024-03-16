<script setup>
import useXmlEpicentrStore from '@/stores/xml/xmlEpicentrStore';
import PaginationProductEp from './PaginationProductEp.vue';
import ProductRowBoxEp from './ProductRowBoxEp.vue';

const xmlEpicentrStore = useXmlEpicentrStore();
</script>

<template>
    <div>
        <PaginationProductEp />
        <div v-if="xmlEpicentrStore.pagedProducts">
            <div v-for="product in xmlEpicentrStore.pagedProducts" :key="product.id">
                <ProductRowBoxEp
                    :cat-list="xmlEpicentrStore.catList"
                    :product="product"
                />
                <hr />
            </div>
        </div>
        <div v-else class="alert alert-danger">NOT pagedProducts</div>
        <PaginationProductEp />
    </div>
</template>
<style scoped>
</style>
