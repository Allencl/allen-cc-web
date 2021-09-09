<template>
  <div id="app">
    <a-row style="padding-top:60px">
      <a-col :offset="2" :span="6">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </a-col>
      <a-col :span="12">

        <div>
            <a-collapse v-model="activeKey" @change="changeCollapse">
              <a-collapse-panel key="1" header="计算中间值">
              <a-row>
                <a-col :span="10">
                  <div style="text-align:left;">
                    <label style="text-align:right;width:60px;display:inline-block;padding-right:8px;">height: </label>
                    <a-input-number v-model="heightValue"  :min="0" :default-value="0" style="width:160px" />                  
                  </div>

                  <div style="text-align:left;margin-top:12px">
                    <label style="text-align:right;width:60px;display:inline-block;padding-right:8px;">low: </label>
                    <a-input-number v-model="lowValue" :min="0" :default-value="0" style="width:160px" />
                  </div>

                </a-col>
                <a-col :span="12" style="text-align:left">
                  <a-button @click="computedMedianFunc" type="primary" shape="circle" style="margin-top:8px;height:60px;width:60px">
                    <a-icon style="font-size:36px;position:relative;top:3px;" type="android" />
                  </a-button>
                </a-col>
              </a-row>

              <transition name="fade">
                <a-row v-if="showResult" style="margin-top:12px;background:#fafafa">
                  <a-col :span="4" :offset="1">
                      <a-icon type="smile" theme="twoTone" style="padding-top:25px;font-size:46px" />
                  </a-col>
                  <a-col :span="6">
                    <div style="padding-top:15px">
                      <p style="text-align:left">
                        <a-icon type="vertical-align-top" style="padding-right:8px;color:#13c2c2;font-size:26px" />
                        <strong style="font-style:italic;position:relative;top:-2px;font-size:18px">{{resultObj.height}}</strong>
                      </p>
                      <p style="text-align:left">
                        <a-icon type="vertical-align-bottom" style="padding-right:8px;color:#13c2c2;font-size:26px"/>
                        <strong style="font-style:italic;position:relative;top:-2px;font-size:18px">{{resultObj.low}}</strong>
                      </p>
                    </div>  
                  </a-col>
                  <a-col :span="10">
                    <div>
                      <p style="padding-top:36px;text-align:left">
                        <a-icon type="check" style="padding-right:8px;color:#fa8c16;font-size:26px" />
                        <strong style="text-decoration:underline;position:relative;top:-2px;font-size:18px">{{resultObj.average}}</strong>
                      </p>
                    </div>    
                  </a-col>
                </a-row>
              </transition>




              </a-collapse-panel>
              <a-collapse-panel key="2" header="待续...">
                  <p style="text-align:left">正在建设中。。。</p>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="待续...">
                  <p style="text-align:left">正在建设中。。。</p>
              </a-collapse-panel>
            </a-collapse>
          </div>



      </a-col>
    </a-row>

    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      lowValue:0,
      heightValue:0,
      resultObj:{},

      showResult:false,
      activeKey: [],
    };
  },  
  created(){
    this.initFunc();
  },
  methods:{
    initFunc:function(){
      let _keys=(localStorage.getItem("homeCollapseActiveKey")||"[]");
      this.activeKey=JSON.parse(_keys);
    },
    changeCollapse:function(keys){
      this.showResult=false;
      this.lowValue=0;
      this.heightValue=0;
      localStorage.setItem("homeCollapseActiveKey",JSON.stringify(keys));
    },
    computedMedianFunc:function(){
      let {lowValue,heightValue}=this;

      this.showResult=false;

      this.resultObj={
        low:lowValue,
        height:heightValue,
        average:((lowValue+heightValue)/2).toFixed(6)
      };

      this.$nextTick(()=>{
        this.showResult=true;
      });
    }
  }
}
</script>

<style lang="less">

.ant-collapse-header{
  text-align: left;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
</style>
