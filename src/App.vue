<template>
  <div id="app">
    <a-row style="padding-top:60px">
      <a-col :offset="1" :span="8">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </a-col>
      <a-col  :offset="1" :span="12">

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
              <a-collapse-panel key="2" header="计时器">
                  <div style="text-align:left">
                    <div style="display:inline-block">
                      <a-input-number v-model="timeValue"  :min="0" :max="59" :default-value="0" style="width:80px;margin-right:18px" />  
                      <a-button type="primary" style="border-color:#87d068;background:#87d068;" icon="plus" @click="addTime"></a-button>  
                    </div>
                    <div style="display:inline-block">
                      <ul v-if="toggleTabs">
                        <a-tag 
                          style="margin-right:18px"
                          v-for="(o,i) in timeValueList"
                          :key="i"
                          closable
                          @close="closeTag(o)"
                          color="#87d068">{{o}}</a-tag>
                      </ul>                            
                    </div>
                  </div>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="待续...">
                  <p style="text-align:left">正在建设中。。。</p>
              </a-collapse-panel>
            </a-collapse>
          </div>



      </a-col>
    </a-row>
    <div style="visibility:hidden;">
        <audio 
            id="audioIDS"
            ref="audioID" 
            :src="audioMp3"
            muted="muted"
            autoplay="true"
        >
            Your browser does not support the audio element.
        </audio>
    </div>
    
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
      audioMp3: require('./assets/mp3.mp3'),  // 音乐

      toggleTabs:true,
      timeValue:0,
      lowValue:0,
      heightValue:0,
      resultObj:{},

      showResult:false,
      activeKey: [],
      timeValueList:[],
      timerGlobal1:null,   // 计时器

    };
  },  
  created(){
    this.initFunc();
    this.initTime();
    this.messageInit();  // 初始化 消息
    this.showConfirm();
  },
  methods:{
    showConfirm:function() {
      let that=this;
      this.$confirm({
        title: '获取音频权限?',
        onOk() {
          that.playFunc();
        },
        onCancel() {},
      });
    },

    /**
     * 初始化 消息
    */
    messageInit: function(){
        var that=this;

        this.$nextTick(()=>{

          // 消息
          Notification.requestPermission().then(function(permission){
              if(permission=="granted"){
                  that.timerGlobal1 && clearInterval(that.timerGlobal1);
                  var timer1=setInterval(() => {
                      that.timerHandle();
                  },39000);
                  that.timerGlobal1=timer1;
              }else{
                  alert("未获取权限！");
              }
          });          
        });
    },
    /**
     * 计时器  
    */
    timerHandle: function(){
        var _date= new Date().getMinutes();

        if( this.timeValueList.filter(o=>o==_date)["length"] ){
            new Notification(`⏳ ${_date}`,{
                icon:"https://gw.alipayobjects.com/zos/rmsportal/UTjFYEzMSYVwzxIGVhMu.png"
            });
            // document.querySelector("#audioIDS").prop('muted',true);
            this.playFunc();
        }
    },
    playFunc:function(){
      document.getElementById("audioIDS").muted = false;
      document.getElementById("audioIDS").play();     
    },
    closeTag:function(o){
      let _list=this.timeValueList.filter(k=>k!=o);
      this.timeValueList=_list;

      this.toggleTabs=false;
      this.$nextTick(()=>{
        this.toggleTabs=true;
        this.updateTime();
      });
    },
    initTime:function(){
      this.timeValueList=JSON.parse(localStorage.getItem("timeBuffer")||"[]");
    },
    addTime:function(){
      this.timeValueList=this.timeValueList.concat([this.timeValue]);


      this.$nextTick(()=>{
        this.updateTime();
      });      
    },
    updateTime:function(){
      localStorage.setItem("timeBuffer",JSON.stringify(this.timeValueList));
    },
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
