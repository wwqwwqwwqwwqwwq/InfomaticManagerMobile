(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["iuc-addressBook-addressBook"],{"1e0d":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'.text-distributed[data-v-696e1cec]{width:3em;text-align-last:justify}.VerticalMain .cu-item[data-v-696e1cec]{padding-top:%?10?%;padding-bottom:%?10?%}.VerticalNav.nav[data-v-696e1cec]{width:%?150?%;white-space:normal}.VerticalNav.nav .cu-item[data-v-696e1cec]{width:100%;text-align:center;background-color:#fff;margin:0;border:none;height:50px;line-height:18px;position:relative}.cu-avatar.mid[data-v-696e1cec]{width:%?87?%;height:%?87?%;font-size:2em}.VerticalNav.nav .cu-item.cur[data-v-696e1cec]{background-color:#f1f1f1}.VerticalNav.nav .cu-item.cur[data-v-696e1cec]:after{content:"";width:%?8?%;height:%?36?%;border-radius:%?10?% 0 0 %?10?%;position:absolute;background-color:currentColor;top:0;right:%?0?%;bottom:0;margin:auto}.VerticalBox[data-v-696e1cec]{display:-webkit-box;display:-webkit-flex;display:flex}.VerticalMain[data-v-696e1cec]{background-color:#f1f1f1;-webkit-box-flex:1;-webkit-flex:1;flex:1}',""])},"4f46":function(t,e,i){"use strict";i.r(e);var a=i("b084"),n=i.n(a);for(var c in a)"default"!==c&&function(t){i.d(e,t,function(){return a[t]})}(c);e["default"]=n.a},"5fa9":function(t,e,i){"use strict";i.r(e);var a=i("ae2e"),n=i("4f46");for(var c in n)"default"!==c&&function(t){i.d(e,t,function(){return n[t]})}(c);i("e507");var s=i("2877"),o=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,"696e1cec",null);e["default"]=o.exports},"7e0c":function(t,e,i){var a=i("1e0d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("94d14d20",a,!0,{sourceMap:!1,shadowMode:!1})},ae2e:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",[i("cu-custom",{staticClass:"bg-informatic-brown",attrs:{isBack:!0}},[i("template",{attrs:{slot:"backText"},slot:"backText"},[t._v("返回")]),i("template",{attrs:{slot:"content"},slot:"content"},[t._v("通讯录")])],2)],1),i("v-uni-view",{staticClass:"cu-bar bg-white text-center padding-left"},[t._v("点击号码可以直接播打或者保存到通讯录。")]),i("v-uni-view",{staticClass:"VerticalBox"},[i("v-uni-scroll-view",{staticClass:"VerticalNav nav",staticStyle:{height:"calc(100vh - 290upx)"},attrs:{"scroll-y":"","scroll-with-animation":"","scroll-top":t.verticalNavTop}},t._l(t.list,function(e,a,n){return i("v-uni-view",{key:n,staticClass:"cu-item text-sm align-center text-center",class:n==t.tabCur?"text-informatic-brown cur":"",staticStyle:{display:"inline-grid"},attrs:{"data-id":n},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.TabSelect.apply(void 0,arguments)}}},[t._v(t._s(a.slice(0,a.indexOf("("))))])}),1),i("v-uni-scroll-view",{staticClass:"VerticalMain",staticStyle:{height:"calc(100vh - 325upx)"},attrs:{"scroll-y":"","scroll-with-animation":"","scroll-into-view":"main-"+t.mainCur},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.VerticalMain.apply(void 0,arguments)}}},t._l(t.list,function(e,a,n){return i("v-uni-view",{key:n,staticClass:"padding-top padding-lr",attrs:{id:"main-"+n}},[i("v-uni-view",{staticClass:"cu-bar solid-bottom bg-white"},[i("v-uni-view",{staticClass:"action"},[i("v-uni-text",{staticClass:"cuIcon-title text-informatic-brown"}),t._v(t._s(a))],1)],1),i("v-uni-view",{staticClass:"cu-list menu"},t._l(e,function(e,a){return i("v-uni-view",{key:a,staticClass:"cu-item"},[i("v-uni-view",{staticClass:"cu-avatar mid round margin-tb-sm margin-lr",style:"background-image:url("+e.Avatar+");"}),i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"flex justify-between"},[i("v-uni-view",{staticClass:"text-informatic-brown text-bold text-xl text-distributed"},[i("v-uni-view",[t._v(t._s(e.RealName))])],1),i("v-uni-view",{staticClass:"text-grey text-xs padding-right-sm"},[t._v(t._s(e.Address))])],1),i("v-uni-view",{staticClass:"text-black",staticStyle:{"margin-bottom":"-12rpx"}},[i("v-uni-text",{staticClass:"cuIcon-phone text-black",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toTel(e.Mobile)}}},[t._v(t._s(e.Mobile))])],1),e.Telephone?i("v-uni-view",{staticClass:"text-black"},[i("v-uni-text",{staticClass:"cuIcon-dianhua text-black",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toTel(e.Telephone)}}},[t._v(t._s(e.Telephone))])],1):t._e()],1)],1)}),1)],1)}),1)],1),i("navTab",{attrs:{selection:2}})],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},b084:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("ac6a");var a={data:function(){return{list:[],tabCur:0,mainCur:0,verticalNavTop:0,load:!0,length:0,keys:{}}},onLoad:function(){this.getData()},onReady:function(){},methods:{toTel:function(t){window.location.href="tel:"+t},getData:function(){var t=this;uni.post("/api/security/GetAddressBook",{},function(e){var i=0;for(var a in e.data)t.keys[i]=a,e.data[a].id=i++;t.list=e.data,t.length=i})},TabSelect:function(t){this.tabCur=t.currentTarget.dataset.id,this.mainCur=t.currentTarget.dataset.id,this.verticalNavTop=50*(t.currentTarget.dataset.id-1)},VerticalMain:function(t){var e=this,i=this,a=0;if(this.load){for(var n=function(t){var n=e.keys[t],c=uni.createSelectorQuery().select("#main-"+t);c.fields({size:!0},function(t){i.list[n].top=a,a+=t.height,i.list[n].bottom=a}).exec()},c=0;c<this.length;c++)n(c);this.load=!1}var s=t.detail.scrollTop+10;for(c=0;c<this.length;c++){var o=this.keys[c];if(s>this.list[o].top&&s<this.list[o].bottom)return this.verticalNavTop=50*(c-1),this.tabCur=c,!1}}}};e.default=a},e507:function(t,e,i){"use strict";var a=i("7e0c"),n=i.n(a);n.a}}]);