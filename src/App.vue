<template>
  <div id="app">
    <a-row style="padding-top:160px">
      <a-col :offset="2" :span="6">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </a-col>
      <a-col :span="12">

        <div>
            <a-collapse v-model="activeKey" @change="changeCollapse">
              <a-collapse-panel key="1" header="计算中间值">
              <a-row>
                <a-col :span="6">
                  <div style="text-align:left;">
                    <label style="text-align:right;width:60px;display:inline-block;padding-right:8px;">height: </label>
                    <a-input-number v-model="heightValue"  :min="0" :default-value="0" style="width:160px" />                  
                  </div>

                  <div style="text-align:left;margin-top:12px">
                    <label style="text-align:right;width:60px;display:inline-block;padding-right:8px;">low: </label>
                    <a-input-number v-model="lowValue" :min="0" :default-value="0" style="width:160px" />
                  </div>

                </a-col>
                <a-col :span="16" style="text-align:left">
                  <a-button @click="computedMedianFunc" type="primary" shape="circle" style="margin-top:8px;height:60px;width:60px">
                    <a-icon style="font-size:36px" type="android" />
                  </a-button>

                  <a-result v-if="showResult" title="oh captain my captain!">
                    <template #icon>
                      <a-icon type="smile" theme="twoTone" />
                    </template>
                    <a-row>
                          <a-col :span="8">
                            <div>
                              <p>
                                <a-icon type="vertical-align-top" style="font-size:28px" />
                                <strong>{{resultObj.height}}</strong>
                              </p>
                              <p>
                                <a-icon type="vertical-align-bottom" style="font-size:28px"/>
                                <strong>{{resultObj.low}}</strong>
                              </p>
                            </div>  
                          </a-col>
                          <a-col :span="16">
                            <div>
                              <p>
                              <a-icon type="vertical-align-bottom" style="font-size:28px" />
                              <strong>{{resultObj.average}}</strong>
                            </p>
                          </div>    
                      </a-col>
                    </a-row>

  
                  </a-result>

                </a-col>
              </a-row>




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
      localStorage.setItem("homeCollapseActiveKey",JSON.stringify(keys));
    },
    computedMedianFunc:function(){
      let {lowValue,heightValue}=this;

      this.showResult=false;

      this.resultObj={
        low:lowValue,
        height:heightValue,
        average:(lowValue+heightValue)/2
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
  margin-top: 60px;
}
</style>
