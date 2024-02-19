<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';

import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import useAlertModalStore from '@/stores/alertModalStore';
import useKursStore from '@/components/Plugin/GetKursUSD/kursStore';

const xmlRoetkaStore = useXmlRozetkaStore();
const alertModal = useAlertModalStore();
const kursStore = useKursStore();

const loadProduct = async () => {
    const rezult = await xmlRoetkaStore.loadProduct();

    if (rezult.err) {
        alertModal.openModal(rezult.mesasge, rezult.statusCode);
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
            <div class="col-md-2">XML Rozetka</div>
            <div class="col-md-3">
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
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-8">
                                    <div>{{ product.productInfo.title.ru }}</div>
                                    <div>{{ product.productInfo.title.ua }}</div>
                                </div>
                                <div class="col-md-4">
                                    <div>{{ product.productInfo.category.ua }}</div>
                                    <div>{{ product.productInfo.category.ru }}</div>
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
                                    Price: {{ product.productInfo.price.value }} грн.
                                    <br /> Kurs store - {{ kursStore.usd }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">

                        </div>
                    </div>
                    <div>{{ product.productInfo.title.ru }}</div>
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
</style>
