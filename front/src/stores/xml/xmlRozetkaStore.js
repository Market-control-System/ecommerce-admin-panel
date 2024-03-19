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
        zpNow: [],
        zpOrigin: [], // оригинальный массив с сервера - полный набор
        catList: [], // список категорий на маркетплейсе
        currentPage: 1,
        pageSize: 30,
        filtr: { // набор для фильтрации
            typeId: 0, // по нашему типу запчасти
            isInNotXML: false, // только те что не в XML
            isOstatok: false, // отлько где остаток больше 0
        },
    }),
    getters: {
        // вычисляем реактивно отрфильтрованный список
        zp: (state) => {
            let tempArr = [...state.zpOrigin];
            // если стоит флаг - Только то что в наличии
            if (state.filtr.isOstatok) {
                tempArr = tempArr.filter((item) => item.productInfo.ostatok > 0);
            }
            // если установлено показывать те что отсутствуют в XML
            if (state.filtr.isInNotXML) {
                tempArr = tempArr.filter((item) => !item.productInXML.kod);
            }
            if (state.filtr.typeId === 0) {
                state.zpNow = tempArr;
                return tempArr;
            }
            const temp = tempArr.filter((item) => item.productInfo.category.id === state.filtr.typeId);
            state.zpNow = temp;
            return temp;
        },
        // Getter для фильтрации товаров по текущей странице
        pagedProducts: (state) => {
            // обращение в этом геттере к геттерму zp - выдавало ошибку про незвестность зп
            // поэтому создал промежуточный стейт
            const start = (state.currentPage - 1) * state.pageSize;
            const end = start + state.pageSize;
            return state.zpNow.slice(start, end);
        },
    },
    actions: {
        setPage(page) {
            this.currentPage = page;
        },
        async loadProduct() {
            const error = await createErrorData.createErrorDataSync();
            this.currentPage = 1;
            this.filtr.isInNotXML = false;
            this.filtr.isOstatok = false;
            this.filtr.typeId = 0;
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
                // this.zp = [...result.res];
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
        filtrType(typeId) {
            // устанавливаем параметр фильтра и сбрасываем текущую страницу
            this.currentPage = 1;
            this.filtr.typeId = typeId;
            return true;
        },
        filtrIsInNotXML(value) {
            // устанавливаем параметр фильтра и сбрасываем текущую страницу
            this.currentPage = 1;
            this.filtr.isInNotXML = value;
            return true;
        },
        filtrIsOstatok(value) {
            this.currentPage = 1;
            this.filtr.isOstatok = value;
            return true;
        },
        async loadCat() {
            const error = await createErrorData.createErrorDataSync();
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
