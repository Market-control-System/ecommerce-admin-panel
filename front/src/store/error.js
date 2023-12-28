import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    error: false,
    msg: '',
    component: '',
  }),
  actions: {
    reset() {
        this.error = false;
        this.msg = '';
        this.component = '';
    },
    setError(err = {msg:null, component:null}){
        this.error = true;
        this.msg = err.msg;
        this.component = err.component;
    },
  }
});
