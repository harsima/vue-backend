import PageTitle from './main'

PageTitle.install = function(Vue){  
    Vue.component(PageTitle.name, PageTitle)
}  

export default PageTitle;