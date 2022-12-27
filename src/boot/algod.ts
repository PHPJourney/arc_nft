import algotools from 'src/utils/algotools';
import { boot } from 'quasar/wrappers';
const tools = new algotools(process.env.ALGO_TOKEN, process.env.ALGO_SERVER, process.env.ALGO_PORT);
declare module 'vue/types/vue' {
    interface Vue {
        $algod: any;
    }
}

export default boot(({ Vue }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Vue.prototype.$algod = tools;
});