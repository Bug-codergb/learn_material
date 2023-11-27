<template>
  <div>
    <div class="containerp">
      <div class="tool" ref="stencilContainer"></div>
      <div id="container"></div>
    </div>
    <button @click="reset">撤销</button>
    <div @click="fill">填充</div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      graph: null,
      cell: {},
    };
  },
  mounted() {
    let graph = new Graph({
      container: document.getElementById("container"),
      grid: true,
      clipboard: true,
      history: {
        enabled: true,
        ignoreAdd: true,
        ignoreRemove: true,
        ignoreChange: false,
      },
    });
    console.log(graph);
    this.graph = graph;
    graph.addNode({
      x: 100,
      y: 60,
      width: 100,
      height: 40,
      label: "次佛为发就为i哦飞机微风减肥的  ",
      style: "border-radius: 19px",
      attrs: {
        body: {
          fill: "#ec4141",
          stroke: "#5F95FF",
          strokeWidth: 11,
          style: {},
        },
        text: {
          fontSize: 20,
          fill: "#fff",
        },
      },
    });
    graph.enableHistory();
  },
  methods: {
    reset() {
      console.log(this.graph.history);
      this.graph.history.undo();
    },
    fill() {
      console.log("111");
      if (this.cell) {
        this.cell.setAttrs({
          body: { fill: "#ec4141" },
          label: { text: "My Label" },
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  width: 800px;
  height: 600px;
}
.tool {
  width: 200px;
  height: 600px;
  overflow: hidden;
}
.containerp {
  display: flex;
}
button {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
