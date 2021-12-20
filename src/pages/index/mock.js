module.exports = {
  dataSource: [
    {
      key: "1",
      site: "总",
      range: 11,
      point: 21,
      session: 16,
      outcome: "5/6/5",
      goalAndLost: "15/19",
      style: {
        site: {
          fontWeight: 500,
          color: "purple",
          fontFamily: "PingFangSC-Medium",
        },
      },
    },
    {
      key: "2",
      site: "主",
      range: 17,
      point: 7,
      session: 8,
      outcome: "1/4/3",
      goalAndLost: "5/11",
      style: {
        site: {
          fontWeight: 500,
          color: "red",
          fontFamily: "PingFangSC-Medium",
        },
      },
    },
    {
      key: "3",
      site: "客",
      range: 6,
      point: 14,
      session: 8,
      outcome: "4/2/2",
      goalAndLost: "10/8",
      style: {
        site: {
          fontWeight: 500,
          fontFamily: "PingFangSC-Medium",
        },
      },
    },
  ],
  columns: [
    {
      title: "全场",
      dataIndex: "site",
      width: 100,
      color: "#8364ef",
    },
    {
      title: "排名",
      dataIndex: "range",
      width: 100,
      color: "red",
    },
    {
      title: "积分",
      dataIndex: "point",
      width: 100,
    },
    {
      title: "场次",
      dataIndex: "session",
      width: 100,
    },
    // {
    //   title: "胜/平/负",
    //   dataIndex: "outcome",
    //   width: 140,
    // },
    {
      title: "进/失",
      dataIndex: "goalAndLost",
      width: 100,
    },
  ],
  border: "1rpx solid #eee",
  style: {
    th: {
      background: "#fafafa",
      height: "70rpx",
      fontSize: "24rpx",
      fontFamily: "PingFangSC-Medium",
    },
    tr: {
      height: "80rpx",
      fontSize: "24rpx",
    },
  },
}
