import Vue from "namespace:components/vue2/vue.js"
import xcui from 'namespace:widget/common/afor-vue2/xcui2/xcui.js'

Vue.use(xcui)


export default {
    init(el, data) {
        let app = new Vue({
            template: __inline('./index.html'),
            data(){
                return {
                    

                }
            },
            components: {
            },
            methods: {

            },
            mounted(){
                this.$nextTick(()=>{
                    
                })
            }
        }).$mount(el);
    }
}