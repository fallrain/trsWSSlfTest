/**
 * 说明：
 */
Vue.component('slt', {
  props : ['person'],
  template : '<ul>' +
  '<li class="v-slt" v-for="p in person">{{p.name}}</li>' +
  '</ul>'
});
Vue.component('anchored-heading', {
  template : '#anchored-heading-template',
  props : {
    level : {
      type : Number,
      required : true
    }
  }
});
Vue.component('ipt', {
  template : '<div>'
  + '<input type="text" placeholder="这是个输入框" v-bind:value="counter">'
  + '<button type="button" v-on:click="counter++;">计算</button>'
  + '</div>',
  props : ['fn'],
  data : function(){
    return {
      counter : 0
    };
  }
});
//emitTest名字不行????
Vue.component('cbsj', {
  template : '<div>'
  + '<button type="button" v-on:click="woca">传播事件</button>'
  + '</div>',
  methods : {
    woca : function(){
      this.$emit('woca');
    },
  }
});
Vue.component('button-counter', {
  template : '<button v-on:click="increment">{{ counter }}</button>',
  data : function(){
    return {
      counter : 0
    }
  },
  methods : {
    increment : function(){
      this.counter += 1
      this.$emit('increment')
    }
  },
});
Vue.component('slotCld', {
  props : ['slotCldData'],
  template : '' +
  '<div ref="slotCldRef">' +
  '<slot name="slotCldSlot" text="要插入的地方的text" v-for="slot in slotCldData" :ren="slot.name"></slot>' +
  '<button type="button" @click="tets">测试ref</button>' +
  '</div>',
  methods : {
    tets : function(){
      console.log(app.$refs);
      alert(app.$refs.slotCldRef);
    }
  },
});
var app;
app = new Vue({
  el : '#app',
  data : {
    chooseNan : '选了男的',
    noChooseNan : '没选男的',
    chooseNv : '选了女的',
    noChooseNv : '没选女的',
    isRedBg : false,
    message : 'Hello Vue!',
    message1 : 'Hello Vue!',
    data : {},
    isIf : false,
    rdSex : [],
    ckAihao : [],
    slts : '值是',
    setNewValOldVal : '这是老的值',
    persons : [
      {
        name : 'wangchenhao'
      },
      {
        name : 'wangdaer'
      },
      {
        name : 'chenchunmei'
      }
    ],
    total : 0
  },
  methods : {
    alert1 : function(val){
      if(val){
        alert(val);
      }else{
        alert('alert');
      }
    },
    showTips : function(){
      var vthis = this;
      setTimeout(function(){
        vthis.$set(vthis.data, 'newVal', '设置完了新的值');
        $('#beNewSpan').html('现在有值了：');
      }, 2000);
    },
    changeBg : function(){
      this.isRedBg = true;
      $('#mybj').html('背景红色');
    },
    setNewValTest : function(lazy){
      if(lazy){
        this.setNewValOldVal = '延迟判断值';
        Vue.nextTick(function(){
          if($('#setNewValOldVal').text() === '延迟判断值'){
            alert('和新值相等');
          }else{
            alert('和新值不相等');
          }
        });
      }else{
        this.setNewValOldVal = '立即判断值';
        if($('#setNewValOldVal').text() === '立即判断值'){
          alert('和新值相等');
        }else{
          alert('和新值不相等');
        }
      }
    },
    slfIptFn : function(){
      counter++;
    },
    incrementTotal : function(){
      this.total += 1
    }
  },
  computed : {
    computeVal : function(){
      var vthis = this;
      var val = '';
      for(var i = 0; i < 2; i++){
        val += 'a';
      }
      return val;
    }
  }
});
