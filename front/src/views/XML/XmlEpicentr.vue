<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';
import ProductCatalogBoxEp from '@/components/XML/Epicentr/ProductCatalogBoxEp.vue';

import useAlertModalStore from '@/stores/alertModalStore';
import useXmlEpicentrStore from '@/stores/xml/xmlEpicentrStore';

const alertModal = useAlertModalStore();
const xmlEpicentrStore = useXmlEpicentrStore();

const loadProduct = async () => {
    const rezultCat = await xmlEpicentrStore.loadCat();
    const rezult = await xmlEpicentrStore.loadProduct();

    if (rezult.err) {
        alertModal.openModal(rezult.mesasge, rezult.statusCode);
    }
    if (rezultCat.err) {
        alertModal.openModal(rezultCat.mesasge, rezultCat.statusCode);
    }
};
</script>

<template>
    <NavBar />
    <div class="container-main">
        <div class="row">
            <div class="col-md-3">XML Epicentr (Product -
                <span v-if="xmlEpicentrStore.zpOrigin">{{ xmlEpicentrStore.zpOrigin.length }}</span>
                in XML -
                <span v-if="!xmlEpicentrStore.isLoad"> {{ xmlEpicentrStore.zp?.length }}</span>
                )
            </div>
            <div class="col-md-2">
                <button class="btn btn-outline-success" @click="loadProduct">
                    Загрузить список
                </button>
            </div>
            <div class="col-md-2">
            </div>
            <div class="col-md-2">
            </div>
        </div>
        <hr />
        <div class="container-product">
            <span v-if="xmlEpicentrStore.isLoad" class="blink">
                Загрузка данных
            </span>
            <div v-else>
                <ProductCatalogBoxEp />
                {{ xmlEpicentrStore.pagedProducts }}</div>
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
