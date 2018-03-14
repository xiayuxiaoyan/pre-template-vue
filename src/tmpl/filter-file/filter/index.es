import EventBus from '../eventBus.js'

export default {
    template: __inline('./index.html'),
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            searchParams: {
                
            },

        }
    },
    components: {
 
    },
    methods: {
        search: function  () {
            // onSearch事件名易重复，最好是个性化命名
            EventBus.$emit('onSearch', this.searchParams)
        },        
    },
    mounted(){
        this.$nextTick(()=>{
            
        })
    }
}
