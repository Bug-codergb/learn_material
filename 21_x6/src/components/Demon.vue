<template>
  <div>
    <div id="root">
      <template v-if="isShow">
        <input class="inp" ref="inp" v-model="value" @blur="inpBlurHandler" />
      </template>
    </div>
    <button @click="get">获取数据</button>
  </div>
</template>
<script>
import { TableSheet, S2Event } from "@antv/s2";
import "@antv/s2/dist/style.min.css";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Demon",
  data() {
    return {
      cell: null,
      position: {},
      value: "",
      isShow: false,
      s2: null,
    };
  },
  mounted() {
    const s2Options = {
      width: 600,
      height: 600,
    };
    const container = document.getElementById("root");
    // const s2 = new PivotSheet(container, data, s2Options);
    // s2.render();
    const data = [
      {
        province: "浙江",
        city: "杭州",
        type: "笔",
        price: "1",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
      {
        province: "浙江",
        city: "温州",
        type: "纸张",
        price: "2",
      },
    ];
    const s2DataConfig = {
      fields: {
        columns: ["province", "b"], // 要展示的列头字段 id 列表
      },
      meta: [
        // 列头字段对应的元信息，比如展示的中文名
        {
          field: "province",
          name: "省份",
        },
        {
          field: "b",
          name: "vvv",
        },
      ],
      data,
    };
    const s2 = new TableSheet(container, s2DataConfig, s2Options);
    this.s2 = s2;
    s2.render();
    s2.on(S2Event.DATA_CELL_CLICK, (e) => {
      console.log("hahaha");
      console.log("rowCellClick", e);
      this.cell = e.target.cfg.parent;
      console.log(this.cell.getMeta());

      const meta = this.cell.getMeta();
      this.value = meta.fieldValue;
      const headHeight = (s2.getColumnNodes()[0] || { height: 0 }).height;

      this.position = {
        left: meta.x,
        top: meta.y + headHeight,
        width: meta.width,
        height: meta.height,
      };

      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.inp.focus({ preventScroll: true });
        this.$refs.inp.style.left = `${this.position.left}px`;
        this.$refs.inp.style.top = `${this.position.top}px`;
        this.$refs.inp.style.width = `${this.position.width}px`;
        this.$refs.inp.style.height = `${this.position.height}px`;
      });
    });
    s2.on(S2Event.COL_CELL_CLICK, (event) => {
      console.log(event);
      s2.tooltip.show({
        position: { x: event.clientX, y: event.clientY },
        content: this.initButton(event),
      });
    });
  },
  methods: {
    setData() {},
    inpBlurHandler() {
      if (this.s2 && this.cell) {
        const { rowIndex, valueField } = this.cell.getMeta();
        console.log(rowIndex, valueField);
        this.s2.dataSet.originData[rowIndex][valueField] = this.value;
        this.s2.render(true);
        this.isShow = false;
      }
    },
    initButton(event) {
      const button = document.createElement("button");
      button.innerText = "点击合并单元格";
      button.className = "merge-cells-button";
      button.onclick = () => this.handler(event);
      return button;
    },
    handler(e) {
      const index = e.target.cfg.parent.getMeta().colIndex;
      console.log(this.s2.dataSet);
      this.s2.dataSet.fields.columns.push("we");
      this.s2.dataSet.meta.push({
        field: "we",
        name: "dwwd",
      });
      console.log(index);
      this.s2.render();
    },
    get() {
      console.log(this.s2);
    },
  },
};
</script>
<style scoped>
#root {
  margin: 0 0 0 100px;
  position: relative;
  .inp {
    position: absolute;
    outline: none;
    border: none;
    border: 1px solid #e1e8fb;
    padding: 0;
  }
}
.merge-cells-button {
  border: 1px solid transparent;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 2px;
  color: #000000d9;
  border-color: #d9d9d9;
  background: #fff;
}
</style>
