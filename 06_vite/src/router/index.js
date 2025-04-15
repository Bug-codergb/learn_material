import { createRouter,createWebHistory } from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus'
const handleLogin=()=>{
  ElMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    callback: (action) => {
      console.log("我是个弹窗")
      window.location.href="https://www.sina.com.cn/"
    },
  })
}
const routes=[
  { 
    path: '/:pathMatch(.*)*', 
    name:"404",
    component: ()=>import("@/404.vue") 
  },
  {
    path:"/",
    redirect:"/home"
  },
  {
    path:"/home",
    name:"home",
    component:()=>import("@/views/Home.vue")
  },
  {
    path:"/category",
    name:"category",
    component:()=>import("@/views/Category.vue")
  }
]
const router = createRouter({
  history:createWebHistory(),
  routes
})
router.beforeEach((to, from,next) => {
  /**/
  console.log(to.name)
  if(to.name === "404"){
    handleLogin()
  }else{
    next()
  }
  
})
export default router