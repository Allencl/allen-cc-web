<template>
  <div style="background:#ECECEC; padding:30px">
    <a-card title="Card title" :bordered="false" style="width: 300px">

    <template slot="title" class="ant-card-actions">
          
    </template>
      <img  src="./../assets/sandclock.gif" alt="">
     
      <p>

        
      </p>
      <p>Card content</p>
      <p>Card content</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
