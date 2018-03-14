import EventBus from './eventBus.js'
import FilterCom from './filter/index.js'
import ListCom from './list/index.js'

export default {
    template: __inline('./index.html'),
    data(){
        return {
            searchParams: {
                page_size: 20,
                page: 1,
            },
            total: 0,
            ListData: [], // 列表数据
            loading: false,

        }
    },
    components: {
        FilterCom,
        ListCom
    },
    methods: {
        search: function  (params) {
            // this.searchParams = Object.assign(this.searchParams, params)
            // this.loading = true
            // IoProxy.ioSuc(URL.XXX, this.searchParams).then((data) => {
            //     if(data){

            //         this.ListData = data
                    
                    
            //     }
            // }).always(() => {
            //     this.loading = false
            // })
        },
        goToPage: function  (pageNo, oldPageNo) {
            this.searchParams.page = pageNo
            this.search(this.searchParams)

        },
        onChangeSize: function  (pageSize) {
            this.searchParams.page = 1
            this.searchParams.page_size = pageSize
            this.search(this.searchParams)

        }
    },
    mounted(){
        this.$nextTick(()=>{
            EventBus.$on('onSearch', (params) => {
                this.search(params)
            })
        })
    }
}
