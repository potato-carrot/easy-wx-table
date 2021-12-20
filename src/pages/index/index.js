import { dataSource, columns, style, border } from "./mock";
let _page;

Page({
  data: {
    dataSource,
    columns,
    style,
    border,
  },

  onLoad() {
    _page = this;
    this.setData({
      columns: [
        ...columns,
        {
          title: "操作",
          dataIndex: "action",
          width: 120,
          render(row, index) {
            return [
              {
                text: "编辑",
                style: {
                  color: "red",
                  fontSize: "24rpx",
                  marginRight: "10rpx",
                },
                bindtap: () => console.log(`编辑表格${index}`),
              },
              {
                text: "删除",
                style: {
                  color: "blue",
                  fontSize: "24rpx",
                },
                bindtap: () => _page.deleteRow(row),
              },
            ];
          },
        },
      ],
    })
  },

  deleteRow(row) {
    this.setData({
      dataSource: this.data.dataSource.filter(({ key }) => row.key !== key),
    });
  },
})
