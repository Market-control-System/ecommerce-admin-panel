<script setup>
import { computed } from 'vue';
import useXmlEpicentrStore from '@/stores/xml/xmlEpicentrStore';

const xmlEpicentrStore = useXmlEpicentrStore();
const totalPages = computed(() => Math.ceil(xmlEpicentrStore.zp.length / xmlEpicentrStore.pageSize));
</script>

<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"
                :class="{ disabled: xmlEpicentrStore.currentPage === 1 }">
                <a
                    class="page-link"
                    href="#"
                    @click="xmlEpicentrStore.setPage(xmlEpicentrStore.currentPage - 1)">
                    Previous
                </a>
            </li>
            <!-- Повторение для каждой страницы, если нужно -->
            <li class="page-item"
                :class="{ active: xmlEpicentrStore.currentPage === page }"
                v-for="page in totalPages"
                :key="page">
                <a
                    class="page-link"
                    href="#"
                    @click="xmlEpicentrStore.setPage(page)">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: xmlEpicentrStore.currentPage === totalPages }">
                <a class="page-link" href="#" @click="xmlEpicentrStore.setPage(xmlEpicentrStore.currentPage + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.page-link {
  background-color: black;
  color: white;
}
.active a{
  background-color: white;
  color: black;
}
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
