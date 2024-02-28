<script setup>
import useKursStore from '@/components/Plugin/GetKursUSD/kursStore';
import FormToXml from './FormToXml.vue';

const kursStore = useKursStore();

const props = defineProps({
    productInfo: Object,
    productInXML: Object,
    catList: Array,
});

function getImageUrl(foto, product) {
    if (!foto.nameFile || foto.nameFile === 'nofoto.jpg') {
        return `https://baseparts.com.ua/image/${foto.nameFile}`;
    }
    return `https://baseparts.com.ua/image/zp/${product.category.id}/${product.id}/t/${foto.nameFile}`;
}
</script>

<template>
    <div class="row">
        <div class="col-md-4 zp-in-site">
            <div class="row">
                <div class="col-md-8">
                    <div>RU: {{ props.productInfo.title.ru }}</div>
                    <div>UA: {{ props.productInfo.title.ua }}</div>
                </div>
                <div class="col-md-4">
                    <div>UA: {{ props.productInfo.category.ua }}</div>
                    <a
                        class="link"
                        :href="`https://baseparts.com.ua/zapchast/zapchast${props.productInfo.id}.html`"
                        target="_blank">
                            Link
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <span v-for="foto in props.productInfo.foto"
                        class="foto-box"
                        :key="foto.idFoto">
                        <img :src="getImageUrl(foto, props.productInfo)"
                            class="img-thumbnail img-xml-prev"
                            alt="...">
                    </span>
                </div>
                <div class="col-md-4">
                    Price: {{ Math.round(props.productInfo.price.value * kursStore.usd) }} грн.
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <small>Description RU</small>
                    <div class="descriptopn-zp">
                        {{ props.productInfo.description.ru }}
                    </div>
                    <hr />
                    <small>Description UA</small>
                    <div class="descriptopn-zp">
                            {{ props.productInfo.description.ua }}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <FormToXml
                :xml-info="props.productInXML"
                :cat-list="props.catList"
                :id="props.productInfo.id"
                :product="props.productInfo"
                :kurs="kursStore.usd"/>
        </div>
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
