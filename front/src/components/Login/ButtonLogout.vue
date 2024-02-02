<script setup>
// нкопка должна быть самодостаточна! Возвращает тип клика - login/logout
// но данные о пользователе и авторизации берет сама из стора!
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isUserAuth: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(['exit']);

function emitExit() {
    emit('exit', !props.isUserAuth);
}
</script>

<template>
    <span v-if="props.isUserAuth">
        <button
            class="btn btn-outline-light my-2 my-sm-0"
            @click="emitExit">
                Exit
        </button>
    </span>
    <button v-else
        class="btn btn-outline-success my-2 my-sm-0"
        @click="emitExit">
            Login
    </button>
</template>
