import { styleObj2String } from "./utils";

Component({
  properties: {
    dataSource: {
      type: Array,
      value: [],
    },
    columns: {
      type: Array,
      value: [],
    },
    border: {
      type: String,
      value: "",
      observer(newVal, _) {
        this.setData({
          borderStyle: newVal,
        });
      },
    },
    style: {
      type: Object,
      value: "",
      observer(newVal, _) {
        if (newVal?.th) {
          this.setData({
            theadStyle: styleObj2String(newVal?.th),
          });
        }
        if (newVal?.tr) {
          this.setData({
            rowStyle: styleObj2String(newVal?.tr),
          });
        }
      },
    },
  },

  data: {
    tbodyData: [],
    default: {
      theadStyle: styleObj2String({
        background: "#fafafa",
        color: "#000",
        fontFamily: "PingFangSC-Medium",
        fontWeight: 600,
        height: "70rpx",
        fontSize: "24rpx",
      }),
      rowStyle: styleObj2String({
        background: "#fff",
        color: "#000",
        height: "80rpx",
        fontSize: "24rpx",
        fontFamily: "PingFangSC-Regular",
        fontWeight: 400,
      }),
      rowCellStyle: styleObj2String({
        fontSize: "24rpx",
        fontFamily: "PingFangSC-Regular",
        fontWeight: 400,
      }),
    },
  },

  lifetimes: {
    created() {
      this.onTapHanlders = [];
    },
  },

  methods: {
    parseTbodyData(dataSource, columns) {
      const tbodyData = [];
      dataSource.forEach((item, index) => {
        tbodyData[index] = [];
        const dataSourceStyle = item.style || {};
        Object.keys(item).forEach((dataSourceProp) => {
          const dataIndex = columns.findIndex(
            (column) => column.dataIndex === dataSourceProp
          );
          if (dataIndex > -1) {
            tbodyData[index][dataIndex] = {
              data: item[dataSourceProp],
              type: "static",
              style: styleObj2String({
                ...(dataSourceStyle[dataSourceProp] || {}),
                width: `${columns[dataIndex].width}rpx`,
              }),
            };
          }
        });
      });
      return tbodyData;
    },

    parseCustomTbodyData(dataSource) {
      return Array.isArray(dataSource)
        ? dataSource.map(
          ({ text = "", style = {}, bindtap = Function.prototype }) => ({
            text,
            style: styleObj2String(style),
            bindtap,
          })
        )
        : [];
    },

    onTap(e) {
      const handlerIndexList = e?.currentTarget?.dataset?.item;
      if (!handlerIndexList) {
        return;
      }
      const rowIndex = handlerIndexList[0];
      const colIndex = handlerIndexList[1];
      const actionIndex = handlerIndexList[2];
      if (
        rowIndex !== void 0 &&
        colIndex !== void 0 &&
        actionIndex !== void 0
      ) {
        (
          this.onTapHanlders[rowIndex][colIndex][actionIndex] ||
          Function.prototype
        )();
      }
    },
  },

  observers: {
    "dataSource,columns"(dataSource, columns) {
      if (columns.length) {
        const tbodyData = this.parseTbodyData(dataSource, columns);
        columns.forEach((column, columnIndex) => {
          if (
            Reflect.has(column, "render") &&
            typeof column.render === "function"
          ) {
            tbodyData.forEach((rowData, rowIndex) => {
              const customDataSource = column.render(
                dataSource[rowIndex],
                rowIndex
              );
              const customTbodyData =
                this.parseCustomTbodyData(customDataSource);

              rowData[columnIndex] = {
                type: "dynamic",
                data: customTbodyData,
              };

              this.onTapHanlders[rowIndex] = this.onTapHanlders[rowIndex] || [];
              this.onTapHanlders[rowIndex][columnIndex] = customTbodyData.map(
                ({ bindtap }) => bindtap
              );
            });
          }
        });
        this.setData({ tbodyData });
      }
    },
  },
});
