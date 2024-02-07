<script setup>
/**
* Плагин - паказывает последнюю подсчитанную стоимость склада - суммарную / профитулс/ мотосервис
* МОжет отображать цифру
* Может показывать график
* Насйтроки:
* - грфик/цифра
* - сумарный / профитулс / мотосервис
* - или возможность показать все сразу
*/

const props = defineProps({
    token: {
        type: String,
        required: true,
    },
});

const BTNUpdateCostClick = async () => {

};
</script>
<template>
    <div>
        Стоимость склада
        454 000 000
        Profitools
        2435 000 000
        Motoservice
        100 000 000
        {{ props.token }}
        <button class="btn btn-sm btn-primary" @click="BTNUpdateCostClick">
            Обновить
        </button>
    </div>
</template>
