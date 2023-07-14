[[toc]]

## 绘制效果

## [vis-network 文档地址](https://visjs.github.io/vis-network/docs/network/)

- 使用

1. 安装:npm install vis-network

```js
npm install vis-network

```

2.  vis-network 的引入方式需要注意

```js
const vis = require('vis-network/dist/vis-network.min.js')
或者
import vis from 'vis-network/dist/vis-network.min.js'
```

```vue
<template>
  <div>
    <div id="mynetwork" ref="mynetwork"></div>
  </div>
</template>
<script>
// const vis = require('vis-network/dist/vis-network.min.js')
import vis from 'vis-network/dist/vis-network.min.js'
export default {
  name: 'Topo',
  components: {},
  data() {
    return {
      nodes: null,
      edges: null,
      options: null,
      network: null,
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    // 转换树形结构数据为vis-network所需的节点和边数据结构
    convertTreeToVisData(treeData) {
      const nodes = []
      const edges = []
      // 递归函数，处理节点及其子节点
      function processNode(node, level, parentNodeId = null) {
        // 创建节点对象
        const nodeId = node.id
        const newNode = {
          id: nodeId,
          label: node.name,
          level,
          data: node,
        }
        // 将节点添加到节点数组
        nodes.push(newNode)
        // 如果存在父节点，则创建边对象并添加到边数组
        if (parentNodeId) {
          const newEdge = { from: parentNodeId, to: nodeId }
          edges.push(newEdge)
        }
        // 递归处理子节点
        if (node.children && node.children.length > 0) {
          for (const childNode of node.children) {
            processNode(childNode, level + 1, nodeId)
          }
        }
      }

      // 从根节点开始递归处理
      processNode(treeData, 1)
      nodes[0].label = ''
      nodes[0].shape = 'image'
      nodes[0].image = require('@/static/images/cloud.png')
      this.nodes = new vis.DataSet(nodes)
      this.edges = new vis.DataSet(edges)
      return { nodes, edges }
    },
    roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath()
      ctx.strokeStyle = 'rgb(75,211,121)'
      ctx.moveTo(x + radius, y)
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      ctx.closePath()
      ctx.stroke()
    },
    draw(e) {
      let that = this
      const { ctx } = e
      let currentNode = that.nodes.get().filter((item) => item.id == e.id)[0]
      return {
        drawNode() {
          if (e.id != '1') {
            ctx.beginPath()
            if (currentNode.data.status === 'ONLINE') {
              ctx.strokeStyle = 'rgb(75,211,121)'
            } else {
              ctx.strokeStyle = 'rgba(0,0,0,.4)'
            }
            if (currentNode.data.deviceType && currentNode.data.deviceType == 'AP') {
              that.roundRect(ctx, e.x - 50, e.y, 100, 100, 20)
            } else {
              ctx.moveTo(e.x, e.y)
              ctx.lineTo(e.x - 55, e.y)
              ctx.lineTo(e.x - 75, e.y + 15)
              ctx.stroke()
              ctx.moveTo(e.x, e.y)
              ctx.lineTo(e.x + 55, e.y)
              ctx.lineTo(e.x + 75, e.y + 15)
              ctx.stroke()
              ctx.strokeRect(e.x - 75, e.y + 15, 150, 30)
              ctx.stroke()
            }
          }
        },
        drawExternalLabel() {
          if (e.id != '1') {
            let currentNode = that.nodes.get().filter((item) => item.id == e.id)[0]
            let label = currentNode.data.name
            let status = currentNode.data.status
            let ip = currentNode.data.ip
            if (currentNode.data.status === 'ONLINE') {
              ctx.strokeStyle = 'rgb(75,211,121)'
            } else {
              ctx.strokeStyle = 'rgba(0,0,0,.4)'
            }
            ctx.font = 'normal 11px sans-serif'

            if (currentNode.data.deviceType && currentNode.data.deviceType == 'AP') {
              ctx.strokeText(status, e.x, e.y + 40) //写status文字
              ctx.strokeText('IP: ' + ip, e.x - 40, e.y + 60) //写ip文字
              ctx.strokeText('AP: ' + label, e.x - 40, e.y + 80) //写lable文字
            } else {
              ctx.strokeText(label, e.x - 65, e.y + 40) //写lable文字
              ctx.strokeText('IP:' + ip, e.x - 65, e.y + 28) //写ip文字
              ctx.strokeText(status, e.x + 25, e.y + 28) //写status文字
            }
          }
        },
        // nodeDimensions: { width: 200, height: 100 }, //告诉画布 你画出图形胡范围多大
      }
    },
    init() {
      const container = this.$refs.mynetwork
      const data = {
        nodes: this.nodes,
        edges: this.edges,
      }
      this.options = {
        autoResize: true, // 默认true,自动调整容器的大小
        height: '100%', // 默认值
        width: '100%', // 默认值
        locale: 'cn', // 选择语言，默认英文en，cn为汉语
        // 配置模块
        configure: {
          enabled: false, // false时不会在界面上出现各种配置项
        },

        // 节点模块
        nodes: {
          chosen: true, // 对选择节点做出反应
          labelHighlightBold: false,
          // hidden: true, // 为true不会显示节点。但仍是物理模拟的一部分
          shape: 'custom',
          ctxRenderer: (e) => this.draw(e, this.nodes),
          size: 40, // 节点大小
          physics: false, // 关闭物理引擎
          x: 0,
          y: 0,
        },
        // 边模块
        edges: {
          physics: false,
          color: 'rgb(75,211,121)',
          smooth: {
            roundness: 0.4,
            enabled: true,
            type: 'cubicBezier', // 平滑曲线的类型
            // forceDirection: 'none', // 用于分层布局的配置项,可选值有: ['horizontal', 'vertical', 'none']
          },
          // arrows: {
          //   // 这里可以用来自定义箭头，type为image类型即可
          //   middle: { enabled: true },
          // },
        },
        // 交互模块
        interaction: {
          zoomView: true,
          selectConnectedEdges: false,
        },
        physics: false,
        // 布局
        layout: {
          hierarchical: {
            enabled: true,
            levelSeparation: 150, // 层级之间的距离,太小的话箭头会盖住标签字
            nodeSpacing: 200, // 节点之间的距离
            treeSpacing: 100, // 树之间的距离
            direction: 'UD',
          },
        },
      }
      this.network = new vis.Network(container, data, this.options)
      // 注册节点点击事件处理程序
      this.network.on('click', (event) => {
        const { nodes } = event
        if (nodes.length > 0) {
          // const nodeId = nodes[0]
          // 一般获取节点详情有节点id就行了，下面代码可以拿到当前节点所有数据
          let currentNode = this.nodes.get().filter((item) => item.id == nodes[0])[0]
          console.log('Node object:', currentNode)
          // TODO
        }
      })
    },
  },
}
</script>
```

3.  关于 vis-network 的数据结构

    在官方的例子里面我们看到拓扑图的结构是这样的

    ```js
    for (var i = 0; i < 15; i++) {
      nodes.push({ id: i, label: String(i) })
    }
    edges.push({ from: 0, to: 1 })
    edges.push({ from: 0, to: 6 })
    edges.push({ from: 0, to: 13 })
    edges.push({ from: 0, to: 11 })
    edges.push({ from: 1, to: 2 })
    edges.push({ from: 2, to: 3 })
    edges.push({ from: 2, to: 4 })
    edges.push({ from: 3, to: 5 })
    edges.push({ from: 1, to: 10 })
    edges.push({ from: 1, to: 7 })
    edges.push({ from: 2, to: 8 })
    edges.push({ from: 2, to: 9 })
    edges.push({ from: 3, to: 14 })
    edges.push({ from: 1, to: 12 })
    nodes[0]['level'] = 0
    nodes[1]['level'] = 1
    nodes[2]['level'] = 3
    nodes[3]['level'] = 4
    nodes[4]['level'] = 4
    nodes[5]['level'] = 5
    nodes[6]['level'] = 1
    nodes[7]['level'] = 2
    nodes[8]['level'] = 4
    nodes[9]['level'] = 4
    nodes[10]['level'] = 2
    nodes[11]['level'] = 1
    nodes[12]['level'] = 2
    nodes[13]['level'] = 1
    nodes[14]['level'] = 5
    ```

    nodes 通过 level 来确定是第几级，edges 通过 id 来连接 nodes,如果你能说服后端人员直接返回这种数据格式就不需要上面 convertTreeToVisData()函数的处理了
    convertTreeToVisData 将树形结构的数据转换成 vis-network 需要的数据格式

    ```js
    <!-- 后端返回的数据 -->
    treeData:{
      id:1,
      label:'根节点',
      children:[
        {
        id:2,
        label:'子节点1'
        },
         {
        id:3,
        label:'子节点2'
        children:[
          {
            id:4,
            label:'子节点3'
          }
        ]
        }
      ]
      ...
    }

    ```

4.  自定义节点样式建议使用 nodes 的 ctxRenderer 属性，用 canvas 绘制
