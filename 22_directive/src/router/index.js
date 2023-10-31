import VueRouter from "vue-router";
const router = new VueRouter({
  mode:"history",
  routes:[
    {
      path:"/home",
      component:()=>import("../components/HelloWorld.vue")
    }
  ]
})
export default router
