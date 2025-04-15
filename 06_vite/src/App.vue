<template>
  <div>
    <button @click="handle('home')">去首页</button>
    <button @click="handle('category')">去分类</button>
    <router-view/>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const handle=(path)=>{
  router.push({
    path:`/${path}`
  })
}
</script>