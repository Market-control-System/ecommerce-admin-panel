/**
 * Store для данных о содержимом XML для Epicentr
 */
import { defineStore } from 'pinia';
import createErrorData from '@/formatData/errorFromStore';
import xmlApiController from '@/api-service/xmlApiController';

const useXmlEpicentrStore = defineStore('xmlEpicentr', {
    state: () => ({
        isLoad: false,
        zpNow: [],
        zpOrigin: [], // оригинальный массив с сервера - полный набор
        catList: [], // список категорий на маркетплейсе
        currentPage: 1,
        pageSize: 10,
        filtr: { // набор для фильтрации
            typeId: 0, // по нашему типу запчасти
            isInNotXML: false, // только те что не в XML
            isOstatok: false, // отлько где остаток больше 0
        },
    }),
    getters: {
        // НАДО ПЕРЕДЕЛАТЬ - НЕ РАБОТАЕТ !!!!!
        // вычисляем реактивно отрфильтрованный список
        zp: (state) => {
            const tempArr = [...state.zpOrigin];
            // если стоит флаг - Только то что в наличии
            // if (state.filtr.isOstatok) {
            //    tempArr = tempArr.filter((item) => item.productInfo.ostatok > 0);
            // }
            // если установлено показывать те что отсутствуют в XML
            // if (state.filtr.isInNotXML) {
            //    tempArr = tempArr.filter((item) => !item.productInXML.kod);
            // }
            // if (state.filtr.typeId === 0) {
            //    state.zpNow = tempArr;
            //    return tempArr;
            // }
            // const temp = tempArr.filter((item) => item.productInfo.category.id === state.filtr.typeId);
            // state.zpNow = temp;
            state.zpNow = tempArr;
            return tempArr; // temp
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
            const error = await createErrorData();
            this.currentPage = 1;
            try {
                // делаем запрос на сервер
                this.isLoad = true;
                const result = await xmlApiController.getProductEpicentr();
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
        async loadCat() {
            const error = await createErrorData();
            try {
                // делаем запрос на сервер
                this.isLoad = true;
                const result = await xmlApiController.getCatEpicentr();
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
            return { err: false };
        },
    },
});

export default useXmlEpicentrStore;
