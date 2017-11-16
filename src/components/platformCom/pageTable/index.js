import PageTable from './main'

PageTable.install = function(Vue){  
    Vue.component(PageTable.name, PageTable)
}  

export default PageTable;