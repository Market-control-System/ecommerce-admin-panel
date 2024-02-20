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
        zp: {},
        catList: [],
    }),
    actions: {
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
                this.zp = { ...result.res };
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
    },
});

export default useXmlRozetkaStore;
