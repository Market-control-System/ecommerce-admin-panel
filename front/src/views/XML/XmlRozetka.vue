<script setup>
// страница для работы с XML Rozetka - доступен всем авторизованым юзерам
import NavBar from '@/components/NavBar/NavBar.vue';

import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';
import useAlertModalStore from '@/stores/alertModalStore';

const xmlRoetkaStore = useXmlRozetkaStore();
const alertModal = useAlertModalStore();

const loadProduct = async () => {
    const rezult = await xmlRoetkaStore.loadProduct();

    if (rezult.err) {
        alertModal.openModal(rezult.mesasge, rezult.statusCode);
    }
};
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
            {{ xmlRoetkaStore.zp }}
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
