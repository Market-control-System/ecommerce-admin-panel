<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';
import FormToXml from '@/components/XML/Product/FormToXml.vue';

import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import useAlertModalStore from '@/stores/alertModalStore';
import useKursStore from '@/components/Plugin/GetKursUSD/kursStore';

const xmlRoetkaStore = useXmlRozetkaStore();
const alertModal = useAlertModalStore();
const kursStore = useKursStore();

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

function getImageUrl(foto, product) {
    if (!foto.nameFile || foto.nameFile === 'nofoto.jpg') {
        return `//baseparts.com.ua/image/${foto.nameFile}`;
    }
    return `//baseparts.com.ua/image/zp/${product.productInfo.category.id}/${product.productInfo.id}/t/${foto.nameFile}`;
}
</script>

<template>
    <NavBar />
    <div class="container-main">
        <div class="row">
            <div class="col-md-3">XML Rozetka (Category -
                <span v-if="xmlRoetkaStore.isLoad">load...</span>
                <span v-else>{{ xmlRoetkaStore.catList.length }}</span>
                )
            </div>
            <div class="col-md-2">
                <button class="btn btn-outline-success" @click="loadProduct">
                    Показать все запчасти
                </button>
            </div>
        </div>
        <hr />
        <div class="container-product">
            <span v-if="xmlRoetkaStore.isLoad" class="blink">
                Загрузка данных
            </span>
            <div v-else>
                <div v-for="product in xmlRoetkaStore.zp" :key="product.productInfo.id">
                    <div class="row">
                        <div class="col-md-4 zp-in-site">
                            <div class="row">
                                <div class="col-md-8">
                                    <div>RU: {{ product.productInfo.title.ru }}</div>
                                    <div>UA: {{ product.productInfo.title.ua }}</div>
                                </div>
                                <div class="col-md-4">
                                    <div>UA: {{ product.productInfo.category.ua }}</div>
                                    <a
                                        class="link"
                                        :href="`https://baseparts.com.ua/zapchast/zapchast${product.productInfo.id}.html`"
                                        target="_blank">
                                        Link
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8">
                                    <div v-for="foto in product.productInfo.foto"
                                        :key="foto.idFoto">
                                        <img :src="getImageUrl(foto, product)"
                                            class="img-thumbnail img-xml-prev"
                                            alt="...">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    Price: {{ Math.round(product.productInfo.price.value * kursStore.usd) }} грн.
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <small>Description RU</small>
                                    <div class="descriptopn-zp">
                                        {{ product.productInfo.description.ru }}
                                    </div>
                                    <hr />
                                    <small>Description UA</small>
                                    <div class="descriptopn-zp">
                                        {{ product.productInfo.description.ua }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <FormToXml
                                :xml-info="product.productInXML"
                                :cat-list="xmlRoetkaStore.catList"
                                :id="product.productInfo.id"/>
                        </div>
                    </div>
                    <hr />
                </div>
                {{ xmlRoetkaStore.zp }}
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
.zp-in-site {
    border-right: 1px solid green;
}
</style>
