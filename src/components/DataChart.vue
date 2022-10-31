<template>
<div>
  <button @click="allchange">显示数据</button>
  <el-row>
    <el-col :span="12">
  <div id="myChart" :style="{ width: '800px', height: '500px',marginTop: '200px' }"></div>
    </el-col>
    <el-col :span="12" >
      <div id="myChart1" :style="{ width: '800px', height: '500px' ,marginTop:'200px'}"></div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "DataChart",
  data(){
    return{
      orderByStatusSum:[234,3244,435,3453],

    }
  },
  methods: {
    allchange(){
      this.drawChart()
      this.drawLine()
    },
    async setAmountSum(status,index){
      const _this=this;
      await _this.axios.get("http://localhost:9090/order/getamountsum/"+status).then(function (resp){
        // _this.orderByStatusSum[num]=resp.data
         _this.$set(_this.orderByStatusSum,index,resp.data)
        // _this.orderByStatusSum.splice(index,1,resp.data)
      })
    },
    drawLine() {
      const _this=this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "订单支付状况",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          top: "10%",
          left: "center",
        },
        color: ['#6eb158', '#cdcdcd', '#3f8cff','#E6A23C'],
        series: [
          {
            name: "支付金额状况",
            type: "pie",
            radius: "50%",
            data: [
              { value: _this.orderByStatusSum[0], name: "已支付金额" },
              { value: _this.orderByStatusSum[1], name: "未支付金额" },
              { value: _this.orderByStatusSum[2], name: "已退款金额" },
              { value: _this.orderByStatusSum[3], name: "已完成金额" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}:}{c}  {per|{d}%}  ",
              backgroundColor: "",
              borderColor: "",
              borderWidth: 1,
              borderRadius: 4,
              rich: {},
            },
          },
        ],
      },true);
    },
    drawChart(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
        title: {
          text: '一周内支付状况图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['已支付', '已付款', '已退款', '已完成']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '已支付',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
          },
          {
            name: '已付款',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
          },
          {
            name: '已退款',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
          },
          {
            name: '已完成',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
          },
          // {
          //   name: 'Line 5',
          //   type: 'line',
          //   stack: 'Total',
          //   smooth: true,
          //   lineStyle: {
          //     width: 0
          //   },
          //   showSymbol: false,
          //   label: {
          //     show: true,
          //     position: 'top'
          //   },
          //   areaStyle: {
          //     opacity: 0.8,
          //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       {
          //         offset: 0,
          //         color: 'rgb(255, 191, 0)'
          //       },
          //       {
          //         offset: 1,
          //         color: 'rgb(224, 62, 76)'
          //       }
          //     ])
          //   },
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [220, 302, 181, 234, 210, 290, 150]
          // }
        ]
      });
    }
  },

  mounted() {
  },
  created() {
    const _this=this
    _this.setAmountSum("已支付",0)
    _this.setAmountSum("未支付",1)
    _this.setAmountSum("已退款",2)
    _this.setAmountSum("已完成",3)
  }
}
</script>

<style scoped>

</style>