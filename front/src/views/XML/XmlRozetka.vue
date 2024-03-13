<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';
// import FormToXml from '@/components/XML/Product/FormToXml.vue';
import ProductCatalogBox from '@/components/XML/Product/ProductCatalogBox.vue';
import SelectType from '@/components/products/FiltrBTN/SelectType.vue';

import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import useAlertModalStore from '@/stores/alertModalStore';
import XMLRozetkaIsInXML from '@/components/products/FiltrBTN/XMLRozetkaIsInXML.vue';

const xmlRoetkaStore = useXmlRozetkaStore();
const alertModal = useAlertModalStore();

const loadProduct = async () => {
    const rezultCat = await xmlRoetkaStore.loadCat();
    const rezult = await xmlRoetkaStore.loadProduct();

    if (rezult.err) {
        alertModal.openModal(rezult.mesasge, rezult.statusCode);
    }
    if (rezultCat.err) {
        alertModal.openModal(rezultCat.mesasge, rezultCat.statusCode);
    }
};

function updateFiltrSelectType(newType) {
    // console.log('Select new type ', newType);
    xmlRoetkaStore.filtrType(parseInt(newType, 10));
}

</script>

<template>
    <NavBar />
    <div class="container-main">
        <div class="row">
            <div class="col-md-3">XML Rozetka (Cat. -
                <span v-if="xmlRoetkaStore.isLoad">load...</span>
                <span v-else> {{ xmlRoetkaStore.catList?.length }}</span>
                Product -
                <span v-if="!xmlRoetkaStore.isLoad"> {{ xmlRoetkaStore.zp?.length }}</span>)
            </div>
            <div class="col-md-2">
                <button class="btn btn-outline-success" @click="loadProduct">
                    Показать все запчасти
                </button>
            </div>
            <div class="col-md-2">
                <SelectType @update:selected-type="updateFiltrSelectType"
                    v-if="xmlRoetkaStore.zpOrigin"/>
            </div>
            <div class="col-md-2">
                <XMLRozetkaIsInXML check-text="Без XML" check-type="isInNotXml" />
                <XMLRozetkaIsInXML check-text="Только в наличии" check-type="isOstatok" />
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
