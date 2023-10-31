<template>
  <div class="hello">
    <el-button v-track="{ title:'用户管理',currentURL:this.$route.path,handle:'点击', trigger:'click'}" @click="add">添加</el-button>
    <el-button v-track="{title:'系统设置',currentURL:this.$route.path,handle:'删除',trigger:'click'}" @click="deleteHandle">
      <span>删除</span>
    </el-button>
    <el-button>
      <img src="../assets/logo.png" data-alias="tom"/>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    console.log(this.$route);
    document.addEventListener("click",(e)=>{
       console.log(e.target);
       console.log(e.target.dataset.alias)
       console.log(this.$route)
      // console.log(e.currentTarget);
      // console.log(this.$route)
    })
  },
  methods:{
    add(){
      console.log(1)
    },
    deleteHandle(){
      console.log(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
