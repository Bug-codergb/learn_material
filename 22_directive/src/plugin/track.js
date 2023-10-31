export const MyPlugin={
  install(Vue,options){
    console.log(options);
    Vue.directive("track",{
      inserted(el,binding){
        console.log(el)
        el.addEventListener('click',()=>{
          console.log(binding.value,el.innerHTML);
        });

      }
    })
  }
}
