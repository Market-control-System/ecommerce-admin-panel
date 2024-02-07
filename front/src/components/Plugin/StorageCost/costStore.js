import { defineStore } from 'pinia';
import storageCostApiController from '@/api-service/pluginApiController/storageCostController';

const useCostStore = defineStore('cost', {
    state: () => ({
        cost: {
            profitools: {
                costIn: 0,
                costOut: 0,
            },
            motoservice: {
                constIn: 0,
                costOut: 0,
            },
            usdKurs: 0,
            date: null,
        },
        isLoad: true,
        err: false,
    }),
    getters: {
        totalCost(state) {
            return {
                costIn: state.cost.profitools.costIn + state.cost.motoservice.costIn,
                costOut: state.cost.profitools.costOut + state.cost.motoservice.costOut,
            };
        }
    },
    actions: {
        async loadCost(token) {
            const result = await storageCostApiController.loadLastCost(token);
            if (result.err) {
                this.isLoad = false;
                this.err = true;
                return false;
            }
            this.err = false;
            this.isLoad = false;
            
            this.cost.date = result.res.date;
            this.cost.usdKurs = result.res.kursUsd;
            this.cost.profitools.costIn = result.res.profitools.constIn;
            this.cost.profitools.costOut = result.res.profitools.costOut;
            this.cost.motoservice.constIn = result.res.profitools.costIn;
            this.cost.motoservice.costOut = result.res.profitools.costOut;
            return true;
        },
    },
});

export default useCostStore;
