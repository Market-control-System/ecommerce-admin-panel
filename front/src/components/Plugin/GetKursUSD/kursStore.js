import { defineStore } from 'pinia';
import kursUSDApiController from '@/api-service/pluginApiController/kursUSDController';

const useKursStore = defineStore('kurs', {
    state: () => ({
        usd: null,
        eur: null,
        isLoad: true,
        err: false,
    }),

    actions: {
        async getKurs(token) {
            const result = await kursUSDApiController.getKurs(token);
            if (result.err) {
                this.isLoad = false;
                this.err = true;
                return false;
            }
            this.err = false;
            this.isLoad = false;
            this.usd = result.res.usd;
            this.eur = result.res.eur;
            return true;
        },
    },
});

export default useKursStore;
