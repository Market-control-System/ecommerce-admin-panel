<script setup>
import { ref } from 'vue';
import catParamEpic from '@/config/paramEpic/catParamsEpic';
import useXmlEpicentrStore from '@/stores/xml/xmlEpicentrStore';

const props = defineProps({
    product: Object,
    catList: Array,
});

const epicXmlStore = useXmlEpicentrStore();

const selectEpicCat = ref({
    id: 0,
    ua: null,
    desc: null,
});

const paramsEpicCatToSend = ref([]);
// {
//    type: null,
//    paramcode: null,
//    name: null,
//    nameru: null,
//    valuecode: null,
//    text: null,
//    textru: null,
// }

const paramsFromCat = ref([]); // набор параметров для категории Весь доступный набор параметров

const selectCatChange = async (event) => { // категория на Эпицентре
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

// добавление параметра
const addParam = async (param) => {
    // {
    //    type: null,
    //    paramcode: null,
    //    name: null,
    //    nameru: null,
    //    valuecode: null,
    //    text: null,
    //    textru: null,
    // }
    const index = paramsEpicCatToSend.value.findIndex((item) => item.paramcode === param.paramid);

    // Собираем объект для добавления/обновления
    let newItem = {};
    if (param.type === 'multiselect') {
        const filteredValues = param.value
            .filter((item) => param.valuecode.includes(item.valueid))
            .map((item) => item.value);
        newItem = {
            type: 'multiselect',
            paramcode: param.paramid,
            name: param.name,
            nameru: null,
            valuecode: param.valuecode.join(', '),
            text: filteredValues.join(', '),
            textru: null,
        };
    } else if (param.type === 'text') {
        newItem = {
            type: 'text',
            paramcode: param.paramid,
            name: param.name,
            nameru: null,
            valuecode: null,
            text: param.value,
            textru: null,
        };
    }

    // Если элемент существует, заменяем его
    if (index !== -1) {
        paramsEpicCatToSend.value.splice(index, 1, newItem);
    } else {
        // Иначе, добавляем новый элемент
        paramsEpicCatToSend.value.push(newItem);
    }
};

// работа с параметрами
// инициализация начального массива
// Варинт когда мы будем передавать с сервера данные для редактирования
// const params = ref(
//    Array.isArray(props.xmlInfo.param) && props.xmlInfo.param.length > 0
//        ? props.xmlInfo.param
//        : [],
// );
// const params = ref([]);

// добавляем в MXL
const resultRowClass = ref('');
const updateData = async () => {
    console.log('CATEGORY - ', selectEpicCat.value);
    const dataToEmit = {
        productKod: props.product.kod,
        epicCatId: selectEpicCat.value.id,
        epicCatName: selectEpicCat.value.ua,
        params: paramsEpicCatToSend.value,
    };
    paramsEpicCatToSend.value = null;
    console.log(dataToEmit);
    const resultSend = await epicXmlStore.updateRowXls(dataToEmit);

    if (resultSend.err) {
        resultRowClass.value = 'alert alert-success';
    } else {
        resultRowClass.value = 'alert alert-danger';
    }
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
                    <div
                        v-for="param in paramsFromCat" :key="param.paramid">
                        <div class="input-group mb-3" v-if="param.type ==='multiselect'">
                            <label class="input-group-text">{{ param.name }}</label>
                            <select class="form-control"
                                v-model="param.valuecode"
                                multiple>
                                <option v-for="multiselect in param.value" :key="multiselect.valueid" :value="multiselect.valueid">
                                    {{ multiselect.value }}
                                </option>
                            </select>
                            <span class="btn" :class="param.isIsset? 'btn-outline-warning':'btn-outline-success'"
                                @click="addParam(param); param.isIsset = true"
                                @keyup.enter="addParam(param)"
                                tabindex="0">
                                <span v-if="param.isIsset">Edit</span>
                                <span v-else>Save</span>
                            </span>
                        </div>
                        <div class="input-group mb-3" v-if="param.type ==='text'">
                            <label class="input-group-text">
                                {{ param.name }}
                            </label>
                            <textarea v-model="param.value" class="form-control" style="height: 120px;">
                            </textarea>
                            <span class="btn" :class="param.isIsset? 'btn-outline-warning':'btn-outline-success'"
                                @click="addParam(param); param.isIsset = true"
                                @keyup.enter="addParam(param)"
                                tabindex="0">
                                <span v-if="param.isIsset">Edit</span>
                                <span v-else>Save</span>
                            </span>
                        </div>
                    </div>
                    <button class="btn btn-outline-info" @click="updateData">Добавить в XML</button>
                    {{ paramsEpicCatToSend }}
                    <div :class="resultRowClass"></div>
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
