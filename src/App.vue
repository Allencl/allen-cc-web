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
              <a-collapse-panel key="3" header="趋势">
                <div>
                  <a-card class="trend-result-box">
                    <a-tag v-for="(o,i) in upBuffer" :key="i" color="#f50">
                      {{o}}
                      <a-icon type="close" @click="closeUpBuffer(o)" />
                    </a-tag>                      
                  </a-card>
                  <a-card class="trend-result-box">
                    <a-tag v-for="(o,i) in downBuffer" :key="i" color="#87d068">
                      {{o}}
                      <a-icon type="close" @click="closeDownBuffer(o)" />
                    </a-tag>
                  </a-card>   
                  <!-- <a-tag @click="tagsActive" class="usd-tag-box" :color="USDBufferActive?'#f50':'#87d068'">
                    <a-icon :type="USDBufferActive?'arrow-up':'arrow-down'" />
                    USD
                  </a-tag> -->
                  <a-card class="trend-card-btn">
                    <p>JPY</p>
                    <div>
                      <a-button @click="addUpBuffer('JPY')" type="danger" icon="arrow-up" size="small" />
                      <a-button @click="addDownBuffer('JPY')" type="danger" style="border-color:#87d068;background:#87d068" icon="arrow-down" size="small" />
                    </div>
                  </a-card>  
                  <a-card class="trend-card-btn">
                    <p>EUR</p>
                    <div>
                      <a-button @click="addUpBuffer('EUR')" type="danger" icon="arrow-up" size="small" />
                      <a-button @click="addDownBuffer('EUR')" type="danger" style="border-color:#87d068;background:#87d068" icon="arrow-down" size="small" />
                    </div>
                  </a-card>       
                  <a-card class="trend-card-btn">
                    <p>GBP</p>
                    <div>
                      <a-button @click="addUpBuffer('GBP')" type="danger" icon="arrow-up" size="small" />
                      <a-button @click="addDownBuffer('GBP')" type="danger" style="border-color:#87d068;background:#87d068" icon="arrow-down" size="small" />
                    </div>
                  </a-card>  
                  <a-card class="trend-card-btn">
                    <p>USD</p>
                    <div>
                      <a-button @click="addUpBuffer('USD')" type="danger" icon="arrow-up" size="small" />
                      <a-button @click="addDownBuffer('USD')" type="danger" style="border-color:#87d068;background:#87d068" icon="arrow-down" size="small" />
                    </div>
                  </a-card>                                             
                </div>
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

      upBuffer:[],
      downBuffer:[],
      USDBufferActive:false,

    };
  },  
  created(){
    this.initFunc();
    this.initTime();
    this.messageInit();  // 初始化 消息
    this.showConfirm();
    this.initBuffer();
  },
  methods:{
    tagsActive:function(){
      this.USDBufferActive=!this.USDBufferActive;
      localStorage.setItem("USDTagActive",JSON.stringify(this.USDBufferActive));
    },
    initBuffer:function(){
      this.upBuffer=JSON.parse(localStorage.getItem("upBuffer")||"[]");
      this.downBuffer=JSON.parse(localStorage.getItem("downBuffer")||"[]");

      this.USDBufferActive=JSON.parse(localStorage.getItem("USDTagActive")||false);
    },
    setBuffer:function(){
      let that=this;
      localStorage.setItem("upBuffer",JSON.stringify(that.upBuffer));
      localStorage.setItem("downBuffer",JSON.stringify(that.downBuffer));
    },
    closeUpBuffer:function(key){
      this.upBuffer=this.upBuffer.filter(o=>o!=key);
      this.$nextTick(()=>{
        this.setBuffer();
      });
    },
    closeDownBuffer:function(key){
      this.downBuffer=this.downBuffer.filter(o=>o!=key);
      this.$nextTick(()=>{
        this.setBuffer();
      });      
    },
    addUpBuffer:function(key){
      this.upBuffer=[...new Set(this.upBuffer.concat([key]))];
      this.$nextTick(()=>{
        this.setBuffer();
      });      
    },
    addDownBuffer:function(key){
      this.downBuffer=[...new Set(this.downBuffer.concat([key]))];
      this.$nextTick(()=>{
        this.setBuffer();
      });      
    },    
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
      let _obj=document.getElementById("audioIDS");

      _obj.volume =0.2;
      _obj.muted = false;
      _obj.play(); 
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

.usd-tag-box{
  cursor: pointer;
  margin-top: 40px;
  user-select: none;
  // height: 336px;
  font-size: 18px;
  padding: 8px 8px;
}

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

.trend-result-box{
    width: 82px;
    float: left;
    height: 110px;
    margin-bottom: 12px;
    margin-left: 12px;


    .ant-card-body{
      padding: 0px;
      padding-top: 10px;
      padding-left: 6px;

      .ant-tag{
        display: inline-block;
        min-width: 58px;
        margin-bottom: 8px;
      }
    }
}

.trend-card-btn{
  width: 120px;
  float: right;
  margin-bottom: 12px;
  margin-left: 12px;



  .ant-card-body{
    >p{
      font-size: 18px;
    }

    .ant-btn{
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}
</style>
