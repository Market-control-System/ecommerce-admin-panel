<script setup>

const props = defineProps({
    product: Object,
    catList: Array,
});

</script>

<template>
    <div class="row">
        {{ props.product.title }}
    </div>
</template>

<style scoped>
.zp-in-site {
    border-right: 1px solid green;
}
.foto-box {
    margin: 5px;
}
</style>
