import PageNotes from './main'

PageNotes.install = function(Vue){  
    Vue.component(PageNotes.name, PageNotes)
}  

export default PageNotes;