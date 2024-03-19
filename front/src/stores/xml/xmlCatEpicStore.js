// YЕ РАБОЧАЯ ШТУКА !!!!! МОЖНО УДАЛЯТЬ

import { defineStore } from 'pinia';
import createErrorData from '@/formatData/errorFromStore';

const useXmlEpicCatStore = defineStore('xmlEpicCat', {
    state: () => ({
        isLoad: false,
        catParam: {
            cat8413: [],
            cat8766: [],
            cat7294: [],
            cat7956: [],
        },
        errorData: createErrorData.createErrorDataNotSync(),
    }),
    actions: {
        async loadCatAttr(codeCat) {
            this.isLoad = true;
            const method = 'GET';
            const token = '5a6489d1a5c48c9d174bd31f2a0a8fd0';
            const url = `https://api.epicentrm.com.ua/v2/pim/attribute-sets?filter%5Bcodes%5D%5B%5D=${codeCat}`;
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Добавление токена в заголовки
            };

            const fetchPromise = await fetch(`${url}`, {
                method,
                headers,
            });
            const response = await Promise.race([
                fetchPromise,
                this.timeoutPromise(1000, 'Сервер довго не відповідає.'),
            ]);
            // console.log(response)
            this.isLoad = false;

            if (response.ok) {
                const res = await response.json();
                console.log(res);
                this.catParam[`cat${codeCat}`] = [...res];
                return true;
            }
            const tempError = await response.json();
            this.errorData.err = true;
            this.errorData.message = tempError.message;
            this.errorData.statusCode = tempError.code;
            return false;
        },
        timeoutPromise(ms, error) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error(error));
                }, ms);
            });
        },
    },
});

export default useXmlEpicCatStore;
