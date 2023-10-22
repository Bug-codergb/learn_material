<template>
  <div class="containerp">
    <div class="tool" ref="stencilContainer"></div>
    <div id="container"></div>
  </div>
</template>

<script>
import { Graph, Shape } from "@antv/x6";

import { data } from "../constant/data";
import { Stencil } from "@antv/x6-plugin-stencil";

import { options } from "../constant/options";
import { port } from "../constant/port";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      graph: null,
    };
  },
  mounted() {
    const { Rect, Circle } = Shape;

    this.graph = new Graph({
      container: document.getElementById("container"),
      ...options(Shape),
    });

    const stencil = new Stencil({
      title: "Components",
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "Search by shape name",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      groups: [
        {
          name: "group1",
          title: "Group(Collapsable)",
        },
        {
          name: "group2",
          title: "Group",
          collapsable: false,
        },
      ],
    });
    this.$refs.stencilContainer.appendChild(stencil.container);

    const r3 = new Rect({
      tools: "boundary",
      width: 80,
      height: 40,
      attrs: {
        body: {
          stroke: "red",
        },
      },
      ports: {
        ...port(),
      },
    });

    const c3 = new Circle({
      width: 60,
      height: 60,
      tools: "boundary",
      attrs: {
        circle: { fill: "#FE854F", strokeWidth: 1, stroke: "#4B4A67" },
        text: { text: "ellipse", fill: "white" },
      },
      ports: {
        ...port(),
      },
    });

    const img = document.createElement("img");
    img.src = require("../assets/logo.png");
    let self = this;
    img.onload = function () {
      const data = self.getBase64Image(img);
      console.log(data);

      self.graph.addNode({
        shape: "image",
        x: 320,
        y: 120,
        width: 94,
        height: 28,
        imageUrl: data,
      });
    };
    stencil.load([r3], "group1");
    stencil.load([c3], "group2");
    //this.graph.fromJSON(data)
    console.log(data);
    const showPorts = (ports, show) => {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    };
    this.graph.on("cell:mouseleave", ({ cell }) => {
      cell.removeTools();

      const container = document.getElementById("container");
      const ports = container.querySelectorAll(".x6-port-body");
      showPorts(ports, false);
    });
    this.graph.on("cell:mouseenter", ({ cell }) => {
      if (cell.isNode()) {
        console.log(1);
      } else {
        cell.addTools(["vertices", "segments"]);
      }
      const container = document.getElementById("container");
      const ports = container.querySelectorAll(".x6-port-body");
      showPorts(ports, true);
    });
  },
  methods: {
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
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
</style>
