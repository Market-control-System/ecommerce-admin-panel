<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';
// import FormToXml from '@/components/XML/Product/FormToXml.vue';
import ProductCatalogBox from '@/components/XML/Product/ProductCatalogBox.vue';
import SelectType from '@/components/products/FiltrBTN/SelectType.vue';

import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import useAlertModalStore from '@/stores/alertModalStore';

const xmlRoetkaStore = useXmlRozetkaStore();
const alertModal = useAlertModalStore();

const loadProduct = async () => {
    const rezult = await xmlRoetkaStore.loadProduct();
    const rezultCat = await xmlRoetkaStore.loadCat();

    if (rezult.err) {
        alertModal.openModal(rezult.mesasge, rezult.statusCode);
    }
    if (rezultCat.err) {
        alertModal.openModal(rezultCat.mesasge, rezultCat.statusCode);
    }
};

async function updateFiltrSelectType(newType) {
    // console.log('Select new type ', newType);
    await xmlRoetkaStore.filtrType(parseInt(newType, 10));
}

</script>

<template>
    <NavBar />
    <div class="container-main">
        <div class="row">
            <div class="col-md-3">XML Rozetka (Cat. -
                <span v-if="xmlRoetkaStore.isLoad">load...</span>
                <span v-else> {{ xmlRoetkaStore.catList.length }}</span>
                Product -
                <span v-if="!xmlRoetkaStore.isLoad"> {{ xmlRoetkaStore.zp.length }}</span>)
            </div>
            <div class="col-md-2">
                <button class="btn btn-outline-success" @click="loadProduct">
                    Показать все запчасти
                </button>
            </div>
            <div class="col-md-2">
                <SelectType @update:selected-type="updateFiltrSelectType"/>
            </div>
        </div>
        <hr />
        <div class="container-product">
            <span v-if="xmlRoetkaStore.isLoad" class="blink">
                Загрузка данных
            </span>
            <div v-else>
                <ProductCatalogBox />
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes blink {
    50% { opacity: 0; }
}
.blink {
    animation: blink 1s infinite;
}
.container-product {
    padding-left: 10px;
}
</style>
