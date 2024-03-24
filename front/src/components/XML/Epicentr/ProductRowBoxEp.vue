<script setup>
import { ref, reactive } from 'vue';
import catParamEpic from '@/config/paramEpic/catParamsEpic';

const props = defineProps({
    product: Object,
    catList: Array,
});

const selectEpicCat = ref({
    id: 0,
    ua: null,
    desc: null,
});

const paramsEpicCatToSend = ref([{
    type: null,
    paramcode: null,
    name: null,
    nameru: null,
    valuecode: null,
    text: null,
    textru: null,
}]);

const tmpSelectMultiId = ref('0');

const paramsFromCat = ref([]); // набор параметров для категории Весь доступный набор параметров

const selectCatChange = async (event) => {
    const selectedId = event.target.value;
    // console.log('CHANGE cat to id  - ', parseInt(selectedId, 10));
    const selectedCategory = props.catList.find((cat) => cat.id === parseInt(selectedId, 10));
    // console.log('SERACH IN props.catList', props.catList);
    // console.log('RESULT SEARCH - ', selectedCategory);

    selectEpicCat.value = { ...selectedCategory };
    // console.log('CHANGE cat - ', selectEpicCat);

    // загружаем новый набор параметров для выбранной категории
    const propertyName = `cat${selectedId}`;
    paramsFromCat.value = [...catParamEpic[propertyName]];
};

const selections = reactive({});

// Функция для обновления текущего выбранного значения
const onchangeSelectMulti = (paramid, event) => {
    const selectedValueId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedText = selectedOption.textContent || selectedOption.innerText;

    if (!selections[paramid]) {
        selections[paramid] = { valueid: '', text: '' };
    }

    selections[paramid].valueid = selectedValueId;
    selections[paramid].text = selectedText;
};

const clickAddMultiselect = (paramid) => {
    if (!selections[paramid]) return;

    console.log(`Selected ID: ${selections[paramid].valueid}, Selected Text: ${selections[paramid].text}`);
    // Здесь добавьте логику для обработки выбранного значения и текста
};

const getTextValue = (paramid) => (selections[paramid] ? selections[paramid].text : '');

const setTextValue = (paramid, value) => {
    if (!selections[paramid]) {
        selections[paramid] = { valueid: '', text: '' };
    }
    selections[paramid].text = value;
};
</script>

<template>
    <div class="row">
        <div class="col-md-3">
            <b>{{ props.product.kod }}</b><br/>
            RU: {{ props.product.title.ru }}<br/>
            UA: {{ props.product.title.ua }}<br/>
            <img :src="props.product.foto[0]" alt="foto" class="img-foto"/>
        </div>
        <div class="col-md-9">
            <div class="row">
                <div class="col-md-4">
                    Описание:<br/>
                    {{  props.product.description.ru }}
                </div>
                <div class="col-md-8">
                    <label>Категория в Эпицентре</label>
                    <select
                        class="form-control"
                        v-model="selectEpicCat.id"
                        @change="selectCatChange">
                        <option value="0">Выбрать категорию</option>
                        <option v-for="cat in props.catList" :key="cat.id" :value="cat.id">
                            {{ cat.ua }}
                        </option>
                    </select>
                    {{ selectEpicCat.desc }}<br/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    Параметры<br/>
                    <div>{{ paramsFromCat }}</div>
                    <div
                        v-for="param in paramsFromCat" :key="param.paramid">
                        <div class="input-group mb-3" v-if="param.type ==='multiselect'">
                            <label class="input-group-text">{{ param.name }} + {{ param.paramid }}</label>
                            <select v-model="tmpSelectMultiId" class="form-control" @change="onchangeSelectMulti">
                                <option value="0" selected>Надо выбрать</option>
                                <option v-for="multiselect in param.value" :key="multiselect.valueid">
                                    {{ multiselect.value }}
                                </option>
                            </select>
                            <label class="btn btn-outline-warning"
                                @click="clickAddMultiselect(param.paramid)"
                                @keyup.enter="clickAddMultiselect(param.paramid)"
                                tabindex="0">
                                    add ->
                            </label>
                            <input type="text" :value="getTextValue(param.paramid)"
                                @input="event => setTextValue(param.paramid, event.target.value)" class="form-control"/>
                            <span class="btn btn-outline-success">SAVE</span>
                        </div>
                    </div>

                    {{ paramsEpicCatToSend }}
                </div>
            </div>
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
.img-foto {
    width: 100px;
}
</style>
