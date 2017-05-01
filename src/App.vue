<template>
  <div id="app">
    <el-row>
      <el-col :span="6" :offset="5">
         <h1>TodoList -vue.js</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="5">
         <el-input v-model="item" placeholder="请输入内容" @keyup.enter.native="pushIn($event)" ></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" :offset="3">
        <ul>
          <li v-for="(value,index) in items" @mouseover="choose(value)" @mouseout="choose(value)">
            <div class="item-content">
              <input type="checkbox" @change="check(value)">
              <span :class="{finishLine:value.showFinish}">{{index+1}}. {{value.label}}</span>
              <span class="finishText" v-show="value.showFinish">finish</span>
              <a class="deleteBtn" v-show="value.showDelete" @click="deleteItem(index)">Delete</a>
            </div> 
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Store from './components/localStorageCommon'  
export default {
  name: 'app',
  data () {
    return {
      item: '',
      items: [],
      showDelete: false,
      showFinish: false
    }
  },
  mounted: function (){
    this.items = Store.getLocalStorage(); 
  },
  methods: {
    pushIn: function(event){
      if(this.item != ''){
        this.items.unshift({
          label: this.item,
          showDelete: false,
          showFinish: false
        });
        Store.setLocalStorage(this.items);
        this.item = '';
      }
    },
    choose: function(item){
       item.showDelete = !item.showDelete;

    },
    check: function(item){
      item.showFinish = !item.showFinish;
      Store.setLocalStorage(this.items);
    },
    deleteItem: function(index){
      this.items.splice(index,1);
      Store.setLocalStorage(this.items);
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style: outside none none;
  padding: 0;
}
li{
  padding-left:0;
  margin-top:30px;
  font-size:16px;
  font-weight:bold;
  color:#666;
  cursor:pointer;
}
.deleteBtn{
  font-size:12px;
  color:#999;
}
.finishText{
  font-size:2px;
  background-color:#f00;
  color:#fff;
  border-radius:4px;
  letter-space:0.5px;
  padding:0.5px 3px;
  margin-left:1px;
}
.finishLine{
  text-decoration:line-through;
}

</style>
