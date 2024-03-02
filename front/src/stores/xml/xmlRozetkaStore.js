/**
 * Store для данных о содержимом XML для Rozetka
 * - хранить весь список запачастей доступных для передачи на розетку
 * - делает запрос на сервер для обновления списка
 * - делает запросы для обновления данных
 */
import { defineStore } from 'pinia';
import createErrorData from '@/formatData/errorFromStore';
import xmlApiController from '@/api-service/xmlApiController';

const useXmlRozetkaStore = defineStore('xmlRozetka', {
    state: () => ({
        isLoad: false,
        zp: [],
        zpOrigin: [],
        catList: [],
        currentPage: 1,
        pageSize: 30,
    }),
    getters: {
        // Getter для фильтрации товаров по текущей странице
        pagedProducts: (state) => {
            const start = (state.currentPage - 1) * state.pageSize;
            const end = start + state.pageSize;
            return state.zp.slice(start, end);
        },
    },
    actions: {
        setPage(page) {
            this.currentPage = page;
        },
        async loadProduct() {
            const error = await createErrorData();
            try {
                // делаем запрос на сервер
                this.isLoad = true;
                const result = await xmlApiController.getProductRozetka();
                if (result.err) {
                    error.err = true;
                    error.mesasge = result.message;
                    error.statusCode = result.status || 500;
                    return error;
                }
                // анализируем ответ
                // если все ок - возвращаем данные
                this.zp = [...result.res];
                this.zpOrigin = [...result.res];
                this.isLoad = false;
                return true;
            } catch (err) {
                this.isLoad = false;
                error.err = true;
                error.mesasge = err.mesasge;
                return error;
            }
        },
        async filtrType(typeId) {
            // фильтруем список товаров по типу запчасти
            this.currentPage = 1;
            if (typeId === 0) {
                this.zp = [...this.zpOrigin];
                return true;
            }

            this.zp = this.zpOrigin.filter((item) => item.productInfo.category.id === typeId);
            return true;
        },
        async loadCat() {
            const error = await createErrorData();
            try {
                // делаем запрос на сервер
                this.isLoad = true;
                const result = await xmlApiController.getCatRozetka();
                if (result.err) {
                    error.err = true;
                    error.mesasge = result.message;
                    error.statusCode = result.status || 500;
                    return error;
                }
                // анализируем ответ
                // если все ок - возвращаем данные
                this.catList = [...result.res];
                this.isLoad = false;
                return true;
            } catch (err) {
                this.isLoad = false;
                error.err = true;
                error.mesasge = err.mesasge;
                return error;
            }
        },
        async updateRowXls(formData) {
            // проверка всех полей на наличие
            const resValid = await this.validFormData(formData);

            if (resValid.err) {
                return resValid;
            }

            // отправляем данные на сервер
            const resSend = await xmlApiController.updateRowXML(formData);
            return resSend;
        },
        async validFormData(formData) {
            console.log('To validation - ', formData.categoryName);
            if (!formData.categoryName || formData.categoryName === '') {
                return { err: true, msg: 'categoryName is empty' };
            }
            if (!formData.productCatId || formData.productCatId === '') {
                return { err: true, msg: 'productCatId is empty' };
            }
            if (!formData.productId || formData.productId === '') {
                return { err: true, msg: 'productId is empty' };
            }
            if (!formData.productKod || formData.productKod === '') {
                return { err: true, msg: 'productKod is empty' };
            }
            if (!formData.productVendor || formData.productVendor === '') {
                return { err: true, msg: 'productVendor is empty' };
            }
            if (!formData.productNameRU || formData.productNameRU === '') {
                return { err: true, msg: 'productNameRU is empty' };
            }
            if (!formData.productNameUA || formData.productNameUA === '') {
                return { err: true, msg: 'productNameUA is empty' };
            }
            if (!formData.productDescRU || formData.productDescRU === '') {
                return { err: true, msg: 'productDescRU is empty' };
            }
            if (!formData.productDescUA || formData.productDescUA === '') {
                return { err: true, msg: 'productDescUA is empty' };
            }
            if (!formData.params || formData.params.length === 0) {
                return { err: true, msg: 'params is empty' };
            }
            if (!formData.selectedPhotos || formData.selectedPhotos.length === 0) {
                return { err: true, msg: 'selectedPhotos is empty' };
            }
            if (!formData.priceUsd || formData.priceUsd === 0) {
                return { err: true, msg: 'params is empty' };
            }

            return { err: false };
        },
    },
});

export default useXmlRozetkaStore;
