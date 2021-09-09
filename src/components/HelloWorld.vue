<template>
  <div class="global-home">
      <a-card hoverable style="width:360px;">
        <img
          slot="cover"
          alt="example"
          src="./../assets/sandclock.gif" 
        />
        <!-- <template slot="actions" class="ant-card-actions">
          <a-icon key="setting" type="setting" />
          <a-icon key="edit" type="edit" />
          <a-icon key="ellipsis" type="ellipsis" />
        </template> -->
        <a-card-meta>
          <a-row slot="avatar">
            <a-col :span="6" style="">
                <img
                  :style="contenteditable?{transform:'rotate(15deg)'}:{}"
                  width="46px"
                  src="./../assets/favicon.png" 
                  @click="saveSloganHandle"
                />
            </a-col>
            <a-col :span="18">
              <h3 id="slogan" :contenteditable="contenteditable" style="text-align:center" @dblclick="dblclickHandle">{{slogan}}</h3>
            </a-col>
          </a-row>
          

          
        </a-card-meta>
      </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slogan:'',
      contenteditable:false,
    };
  },   
  created(){
    this.initFunc();
  },
  watch:{

  },
  methods:{
    initFunc:function(){
      let _text=(localStorage.getItem("slogan")||"");
      if(!_text) localStorage.setItem("slogan","oh captain my captain!");

      this.slogan=localStorage.getItem("slogan");
    },
    dblclickHandle:function(){
      this.contenteditable=true;
    },
    saveSloganHandle:function(){
      let _text=document.querySelector("#slogan").innerHTML;
      localStorage.setItem("slogan",_text);
      this.contenteditable=false;
    }
  },
  props: {
    msg: String
  }
}
</script>

<style lang="less">
.global-home{
  .ant-card-meta-avatar{
    padding: 0px;
    width: 100%;
  }

  .ant-card-body{
    padding: 30px 8px;

    h3{
      line-height: 50px;
      padding: 0px;
      text-align: center;
      margin: 0px;
    }
  }
}
</style>>


