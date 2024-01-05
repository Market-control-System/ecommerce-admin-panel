<script setup>
//import { defineProps } from 'vue';

const props = defineProps({
  productList: {
    type: Array,
    required: true,
  }
});
</script>

<template>
    <div class="alert alert-info" v-for="product in props.productList" :key="product.id">
        Name: {{ product.titleZapchast }} <br/>
        Ostastok: {{ product.ostatok }} <br/>
    </div>
</template>