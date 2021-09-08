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
            <a-col :span="8" style="">
                <img
                  width="46px"
                  src="./../assets/favicon.png" 
                />
            </a-col>
            <a-col :span="16">
              <h3 style="text-align:center">oh captain my captain</h3>
            </a-col>
          </a-row>
          

          
        </a-card-meta>
      </a-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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


