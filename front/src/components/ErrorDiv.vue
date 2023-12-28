<script setup>
import { onMounted, watch } from 'vue';
import { useErrorStore } from '@/store/error';
import {Modal} from 'bootstrap';

const errorStore = useErrorStore();
let myModal;

const closeModal = async () => {
    errorStore.reset();
};

onMounted(() => {
    myModal = new Modal(document.getElementById('errorDiv'), {
      keyboard: false
    });
});
watch(() => errorStore.error, (newErrorValue) => {
    if (newErrorValue) {
        myModal.show();
    } else {
        myModal.hide();
    }
});
</script>
<template>
    <div class="modal" tabindex="-1" id="errorDiv">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error Box</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <b>Component: {{ errorStore.component }}</b><br/>
                <p>
                    {{ errorStore.msg }}
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>