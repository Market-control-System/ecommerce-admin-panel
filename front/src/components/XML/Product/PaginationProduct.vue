<script setup>
import { computed } from 'vue';
import useXmlRozetkaStore from '@/stores/xml/xmlRozetkaStore';

const xmlRozetkaStore = useXmlRozetkaStore();
const totalPages = computed(() => Math.ceil(xmlRozetkaStore.zp.length / xmlRozetkaStore.pageSize));
</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"
                :class="{ disabled: xmlRozetkaStore.currentPage === 1 }">
                <a
                    class="page-link"
                    href="#"
                    @click="xmlRozetkaStore.setPage(xmlRozetkaStore.currentPage - 1)">
                    Previous
                </a>
            </li>
            <!-- Повторение для каждой страницы, если нужно -->
            <li class="page-item"
                :class="{ active: xmlRozetkaStore.currentPage === page }"
                v-for="page in totalPages"
                :key="page">
                <a
                    class="page-link"
                    href="#"
                    @click="xmlRozetkaStore.setPage(page)">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: xmlRozetkaStore.currentPage === totalPages }">
                <a class="page-link" href="#" @click="xmlRozetkaStore.setPage(xmlRozetkaStore.currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>
