import PageToolbar from './main'

PageToolbar.install = function(Vue){  
    Vue.component(PageToolbar.name, PageToolbar)
}  

export default PageToolbar;