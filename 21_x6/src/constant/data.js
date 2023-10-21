export const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
      shape: "rect",
      data: {
        content:1212
      },
      ports: [
        {
          id: 'port2',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
        {
          id: 'port3',
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: '#31d0c6',
              strokeWidth: 2,
              fill: '#fff',
            },
          },
        },
      ]
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值  
      shape: 'ellipse', 
      attrs: {
        body: {
          fill: 'skyblue',
          stroke: '#bfa',
          
        },
        label: {
          text: 'Hello',
          fill: '#ec4141',
          fontSize: 20,
          fontWeight: 'bold',
        }
      }
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
      attrs: {
        line: {
          stroke: 'orange',
        },
      },
      vertices: [
        { x: 100, y: 200 }, 
        { x: 300, y: 120 },
      ],
      router: {
        name: 'orth',
        args: {},
      },
    },
  ],
};