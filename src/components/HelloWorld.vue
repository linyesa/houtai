<template>
  <div class="hello">
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <i class="el-icon-s-data"  style="color:blue;font-size:100%"></i>
    <i class="el-icon-water-cup"  style="color:blue;font-size:100%"></i>ballball
    <div id="myChart" :style="{ width: '800px', height: '500px' }"></div>
    <div>
      <button @click='getAmountSum("已支付")'>button</button>
      <button @click="change">change button</button>
    </div>
    <div>{{test1[0]}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
   return{
     value:'',
     options: [{
       value: '已支付',
       label: '已支付'
     }, {
       value: '已退款',
       label: '已退款'
     }, {
       value: '已完成',
       label: '已完成'
     }],
     test1:[0,1]
   }
  },
  methods: {
    change(){
      // this.test1[0]=100
      console.log(this.test1)
      this.$set(this.test1,0,100)
      console.log(this.test1)
    },
    test(str){
      console.log(str)
    },
    getAmountSum(status){
      const _this=this;
      _this.axios.get("http://localhost:9090/order/getamountsum/"+status).then(function (resp){
        console.log(resp)
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
        title: {
          text: '周图'
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
    },
  },
 mounted() {
    this.drawLine()
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

