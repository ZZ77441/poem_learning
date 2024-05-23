<template>
  <div class="admin-charts">
    <el-row>
      <el-col :span="12">
        <div id="poetBar" class="chart"></div>
      </el-col>
      <el-col :span="12">
        <div id="dynastyPie" class="chart"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "AdminCharts",
  data() {
    return {
      name: "",
    };
  },
  mounted() {
    let dynastyPie = this.$echarts.init(document.getElementById("dynastyPie"));
    let poetBar = this.$echarts.init(document.getElementById("poetBar"));
    this.request.get("/echarts/topAuthors").then((res) => {
      // console.log(res);
      let authorCount = res.data;
      poetOption.xAxis.data = authorCount.map((item) => item.poemAuthor);
      poetOption.series[0].data = authorCount.map((item) => item.count);
      poetBar.setOption(poetOption);
    });

    this.request.get("/echarts/dynastyCounts").then((res) => {
      // console.log(res);
      if (res.code === "200") {
        let pieData = res.data;
        pieOption.series[0].data = pieData.map((result) => {
          return {
            value: result.count,
            name: result.dynasty,
          };
        });
        dynastyPie.setOption(pieOption);
      } else {
        this.$message.error("加载错误！");
      }
    });

    var pieOption = {
      title: {
        text: "朝代比例",
        x: "center",
        y: "top",
        fontSize: 5,
        fontWeight: "bolder",
        color: "#ffffff",
      },
      legend: {
        top: "bottom",
      },
      tooltip: {
        trigger: "item",
      },

      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    var poetOption = {
      title: {
        text: "诗词数量排行",
        subtext: "前十诗人数据",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: [],
        axisLabel: {
          interval: 0, // 不隔开显示
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          label: {
            show: true, //开启显示数值
            position: "top", //数值在上方显示
            //数值样式
            color: "#3d5afe", //字体颜色
            fontSize: 14, //字体大小
          },
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.chart {
  height: 500px;
  width: 500px;
}
</style>