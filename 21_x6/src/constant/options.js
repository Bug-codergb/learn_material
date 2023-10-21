export const options = (Shape) => {
  return {
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: {
        name: "manhattan",
        args: {
          padding: 1,
        },
      },
      connector: {
        name: "normal",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 0,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF",
          },
        },
      },
    },
    resizing: true,
    rotating: true,
    selecting: {
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
  };
};
