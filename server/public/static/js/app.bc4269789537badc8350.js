webpackJsonp([1],{"//fM":function(e,n){},0:function(e,n){},"7zck":function(e,n){},"9Ez/":function(e,n){},NHnr:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=o("7+uW"),i=o("3EgV"),a=o.n(i),d=(o("7zck"),o("csSS"),o("sphj"),o("69U5")),s=o("ZEWO"),m=o("gyJL"),r=o("1bcK"),l={render:function(){var e=this.$createElement,n=this._self._c||e;return n("v-app",[n("router-view")],1)},staticRenderFns:[]},c=o("VU/8")({name:"App"},l,!1,null,null,null).exports,u=o("/ocq"),p={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("Main Page")])},staticRenderFns:[]},f=o("VU/8")({name:"MainPage"},p,!1,null,null,null).exports,h=o("Dd8w"),v=o.n(h),g=o("NYxO"),_={name:"Header",methods:v()({},Object(g.b)(["setDraggingTag"]),{onDrag:function(e){this.setDraggingTag(e.target.id)}})},N={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("v-app-bar",{attrs:{color:"#01012b",dense:"",dark:""}},[o("v-app-bar-nav-icon"),e._v(" "),o("v-toolbar-title",[e._v("Flow graph")]),e._v(" "),o("v-spacer"),e._v(" "),o("v-menu",{scopedSlots:e._u([{key:"activator",fn:function(n){var t=n.on,i=n.attrs;return[o("v-btn",e._g(e._b({attrs:{icon:""}},"v-btn",i,!1),t),[o("v-icon",[e._v("mdi-plus")])],1)]}}])},[e._v(" "),o("v-list",[o("v-subheader",[e._v("Add node")]),e._v(" "),o("v-list-item",[o("v-chip",{attrs:{draggable:"",color:"#ff2a6d",id:"domain"},on:{drag:e.onDrag}},[e._v("\n                    Domain\n                ")])],1),e._v(" "),o("v-list-item",[o("v-chip",{attrs:{draggable:"",color:"#d1f7ff",id:"page"},on:{drag:e.onDrag}},[e._v("\n                    Page\n                ")])],1)],1)],1)],1)},staticRenderFns:[]},E=o("VU/8")(_,N,!1,null,null,null).exports,M="EDIT_COMPONENT",C="EDIT_DOMAIN",y="EDIT_PAGE",D="READ_DOMAIN_INFO",I="READ_PAGE_INFO",P="READ_COMPONENT_INFO",O={DOMAIN:[D,C],PAGE:[y,I],COMPONENT:[M,P],EDIT:[y,C,M]},b=o("NM3X"),w=o.n(b),$=(o("hGhl"),o("eKt1")),k=o.n($),S=o("iZbT"),T=o.n(S),A=(o("//fM"),o("V4YW")),x=o.n(A),G=(o("irot"),o("2R8v")),F=o.n(G),U=o("tlQw"),R=o.n(U),q=F()(["\n    query allImages($id: ID!) {\n        allImages(id: $id) {\n            source\n        }\n    }\n"],["\n    query allImages($id: ID!) {\n        allImages(id: $id) {\n            source\n        }\n    }\n"]),j=R()(q),B={name:"InfoCardSlot",components:{FilePond:w()(k.a,T.a,x.a)},props:{isEditing:{type:Boolean},node:{type:Object}},data:function(){return{images:[]}},methods:{fileRenameFunction:function(e){var n=window.prompt("Enter new filename");return this.node.data._id+"_"+n+e.extension},handleFilePondInit:function(){var e=this,n=[];this.$apollo.query({query:j,variables:{id:this.node.data._id}}).then(function(o){o.data.allImages.forEach(function(e){n.push({source:e.source,options:{type:"limbo"}})}),e.images=n})}}},V={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("v-card",{attrs:{elevation:"10"}},[o("v-card-actions",[o("v-spacer"),e._v(" "),o("v-btn",{attrs:{icon:"",outlined:""},on:{click:function(n){return e.$emit("onClose")}}},[o("v-icon",[e._v("mdi-close")])],1)],1),e._v(" "),o("v-card-title",[e._t("title")],2),e._v(" "),o("v-card-text",[e.isEditing?e._t("editInfo"):e._t("readInfo"),e._v(" "),e.isEditing?o("file-pond",{ref:"pond",attrs:{name:"filepond","label-idle":"Drop files here...","allow-multiple":!0,"accepted-file-types":"image/png",server:{url:"http://127.0.0.1:3000",process:"/upload/img",revert:"/upload/img",restore:"/upload/",load:"/upload/"},files:e.images,fileRenameFunction:e.fileRenameFunction,copyRelativePath:!0,alertCopyPath:!0},on:{init:e.handleFilePondInit}}):e._e()],2),e._v(" "),o("v-card-actions",[o("v-spacer"),e._v(" "),e.isEditing?o("div",[o("v-btn",{attrs:{elevation:"1",rounded:""},on:{click:function(n){return e.$emit("onCancel")}}},[o("v-icon",[e._v("\n                    mdi-cancel\n                ")]),e._v("\n                Cancel\n            ")],1),e._v(" "),o("v-btn",{attrs:{elevation:"3",color:"#99ff00",rounded:""},on:{click:function(n){return e.$emit("onSave")}}},[o("v-icon",[e._v("\n                    mdi-checkbox-marked-circle\n                ")]),e._v("\n                Save\n            ")],1)],1):o("v-btn",{attrs:{elevation:"3",rounded:""},on:{click:function(n){return e.$emit("onEdit")}}},[o("v-icon",[e._v("\n                mdi-pencil\n            ")]),e._v("\n            Edit\n        ")],1)],1)],1)},staticRenderFns:[]},Y=o("VU/8")(B,V,!1,null,null,null).exports,L=o("EFqf"),H=o.n(L),X=o("OvQW"),z=o.n(X),W=o("6nXs"),K=o.n(W),Q=(o("p5PA"),o("V8mf")),J=o.n(Q),Z={name:"Editor",props:{value:String},data:function(){return{config:{},easymde:null}},methods:{bindingEvents:function(){var e=this;this.easymde.codemirror.on("change",function(n,o){if("setValue"!==o.origin){var t=e.easymde.value();e.handleInput(t)}}),this.easymde.codemirror.on("blur",function(){var n=e.easymde.value();e.handleBlur(n)})},handleInput:function(e){this.isUpdated=!0,this.$emit("input",e)},handleBlur:function(e){this.isUpdated=!0,this.$emit("blur",e)}},mounted:function(){this.config={element:this.$el.firstElementChild,renderingConfig:{singleLineBreaks:!1,codeSyntaxHighlighting:!0,hljs:J.a,sanitizerFunction:function(e){return z.a.sanitize(e,{USE_PROFILES:{html:!0}})}},initialValue:this.value,showIcons:["table"]},this.easymde=new K.a(this.config),this.bindingEvents()}},ee={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"easymde"},[n("textarea")])}]},ne=o("VU/8")(Z,ee,!1,null,null,null).exports,oe={name:"DomainInfoCard",props:{mode:{type:String},node:{type:Object}},components:{InfoCardSlot:Y,Editor:ne},watch:{mode:{handler:function(e,n){this.workMode=e}},node:{handler:function(e,n){this.url=e.data.url,this.memo=e.data.memo}}},data:function(){return{url:this.node.data.url,memo:null===this.node.data.memo?"":this.node.data.memo,workMode:this.mode,memoModified:null===this.node.data.memo?"":this.node.data.memo}},computed:{title:function(){switch(this.workMode){case D:return"Domain infomation";case C:return"Edit domain information"}},isEditing:function(){return O.EDIT.includes(this.workMode)},compiledMemo:function(){var e=H()(this.memo);return z.a.sanitize(e,{USE_PROFILES:{html:!0}})}},methods:v()({},Object(g.b)(["modifyDomainNode"]),{onClose:function(){this.$emit("onClose")},onEdit:function(){this.workMode=C},onSave:function(){var e=this;this.memo=this.memoModified;var n=v()({},this.node.data,{memo:this.memo});this.modifyDomainNode({vue:this,oldNode:this.node,newDomainData:n}).then(function(){e.workMode=D})},onCancel:function(){this.memoModified=this.memo,this.workMode=D},onMemoInput:function(e){this.memoModified=e},onMemoBlur:function(e){this.memoModified=e}})},te={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("info-card-slot",{attrs:{isEditing:e.isEditing,node:e.node},on:{onClose:e.onClose,onSave:e.onSave,onEdit:e.onEdit,onCancel:e.onCancel}},[o("div",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),e._v(" "),o("div",{attrs:{slot:"readInfo"},slot:"readInfo"},[o("p",[e._v("url: "+e._s(e.url))]),e._v(" "),o("p",[e._v("memo: "+e._s(e.memo))]),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",{domProps:{innerHTML:e._s(e.compiledMemo)}})],1)],1),e._v(" "),o("div",{attrs:{slot:"editInfo"},slot:"editInfo"},[o("v-row",[o("v-col",[o("v-text-field",{attrs:{label:"Domain URL",disabled:""},model:{value:e.url,callback:function(n){e.url=n},expression:"url"}}),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",[o("editor",{attrs:{value:e.memoModified},on:{input:e.onMemoInput,blur:e.onMemoBlur}})],1)],1)],1)],1)],1)])},staticRenderFns:[]},ie=o("VU/8")(oe,te,!1,null,null,null).exports,ae={name:"PageInfoCard",props:{mode:{type:String},node:{type:Object}},watch:{mode:{handler:function(e,n){this.workMode=e}},node:{handler:function(e,n){this.name=e.data.name,this.path=e.data.path,this.memo=null===e.data.memo?"":e.data.memo,this.nameModified=e.data.name,this.pathModified=e.data.path,this.memoModified=null===e.data.memo?"":e.data.memo,this.mode!==this.workMode&&(this.workMode=this.mode)}}},components:{InfoCardSlot:Y,Editor:ne},data:function(){return{name:this.node.data.name,path:this.node.data.path,memo:null===this.node.data.memo?"":this.node.data.memo,workMode:this.mode,nameModified:this.node.data.name,pathModified:this.node.data.path,memoModified:null===this.node.data.memo?"":this.node.data.memo}},computed:{title:function(){switch(this.workMode){case y:return"Edit page information";case I:return"Page informtaion"}},isEditing:function(){return O.EDIT.includes(this.workMode)},compiledMemo:function(){var e=H()(this.memo);return z.a.sanitize(e,{USE_PROFILES:{html:!0}})}},methods:v()({},Object(g.b)(["modifyPageNode"]),{onClose:function(){this.$emit("onClose")},onEdit:function(){this.workMode=y},onSave:function(){var e=this;this.name=this.nameModified,this.path=this.pathModified,this.memo=this.memoModified;var n=v()({},this.node.data,{name:this.name,path:this.path,memo:this.memo});this.modifyPageNode({vue:this,oldNode:this.node,newPageData:n}).then(function(){e.workMode=I})},onCancel:function(){this.nameModified=this.name,this.pathModified=this.path,this.memoModified=this.memo,this.workMode=I},onMemoInput:function(e){this.memoModified=e},onMemoBlur:function(e){this.memoModified=e}}),beforeDestroy:function(){},beforeUpdate:function(){}},de={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("info-card-slot",{attrs:{isEditing:e.isEditing,node:e.node},on:{onClose:e.onClose,onSave:e.onSave,onEdit:e.onEdit,onCancel:e.onCancel}},[o("div",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),e._v(" "),o("div",{attrs:{slot:"readInfo"},slot:"readInfo"},[o("p",[e._v("name: "+e._s(e.name))]),e._v(" "),o("p",[e._v("path: "+e._s(e.path))]),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",{domProps:{innerHTML:e._s(e.compiledMemo)}})],1)],1),e._v(" "),o("div",{attrs:{slot:"editInfo"},slot:"editInfo"},[o("v-row",[o("v-col",[o("v-text-field",{attrs:{label:"Page name"},model:{value:e.nameModified,callback:function(n){e.nameModified=n},expression:"nameModified"}}),e._v(" "),o("v-text-field",{attrs:{label:"Page path"},model:{value:e.pathModified,callback:function(n){e.pathModified=n},expression:"pathModified"}}),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",[o("editor",{attrs:{value:e.memoModified},on:{input:e.onMemoInput,blur:e.onMemoBlur}})],1)],1)],1)],1)],1)])},staticRenderFns:[]},se=o("VU/8")(ae,de,!1,null,null,null).exports,me={name:"ComponentInfoCard",props:{mode:{type:String},node:{type:Object}},watch:{mode:{handler:function(e,n){this.workMode=e}},node:{handler:function(e,n){this.name=e.data.name,this.memo=null===e.data.memo?"":e.data.memo,this.nameModified=e.data.name,this.memoModified=null===e.data.memo?"":e.data.memo,this.mode!==this.workMode&&(this.workMode=this.mode)}}},components:{InfoCardSlot:Y,Editor:ne},data:function(){return{name:this.node.data.name,memo:null===this.node.data.memo?"":this.node.data.memo,workMode:this.mode,nameModified:this.node.data.name,memoModified:null===this.node.data.memo?"":this.node.data.memo}},computed:{title:function(){switch(this.workMode){case M:return"Edit component information";case P:return"Component informtaion"}},isEditing:function(){return O.EDIT.includes(this.workMode)},compiledMemo:function(){var e=H()(this.memo);return z.a.sanitize(e,{USE_PROFILES:{html:!0}})}},methods:v()({},Object(g.b)(["modifyComponentNode"]),{onClose:function(){this.$emit("onClose")},onEdit:function(){this.workMode=M},onSave:function(){var e=this;this.name=this.nameModified,this.memo=this.memoModified;var n=v()({},this.node.data,{name:this.name,memo:this.memo});this.modifyComponentNode({vue:this,oldNode:this.node,newComponentData:n}).then(function(){e.workMode=P})},onCancel:function(){this.nameModified=this.name,this.memoModified=this.memo,this.workMode=P},onMemoInput:function(e){this.memoModified=e},onMemoBlur:function(e){this.memoModified=e}})},re={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("info-card-slot",{attrs:{isEditing:e.isEditing,node:e.node},on:{onClose:e.onClose,onSave:e.onSave,onEdit:e.onEdit,onCancel:e.onCancel}},[o("div",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.title))]),e._v(" "),o("div",{attrs:{slot:"readInfo"},slot:"readInfo"},[o("p",[e._v("name: "+e._s(e.name))]),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",{domProps:{innerHTML:e._s(e.compiledMemo)}})],1)],1),e._v(" "),o("div",{attrs:{slot:"editInfo"},slot:"editInfo"},[o("v-row",[o("v-col",[o("v-text-field",{attrs:{label:"Component name"},model:{value:e.nameModified,callback:function(n){e.nameModified=n},expression:"nameModified"}}),e._v(" "),o("v-card",[o("v-card-title",[e._v("Memo")]),e._v(" "),o("v-card-text",[o("editor",{attrs:{value:e.memoModified},on:{input:e.onMemoInput,blur:e.onMemoBlur}})],1)],1)],1)],1)],1)])},staticRenderFns:[]},le={name:"InfoCard",components:{DomainInfoCard:ie,PageInfoCard:se,ComponentInfoCard:o("VU/8")(me,re,!1,null,null,null).exports},props:{mode:{type:String},node:{type:Object}}},ce={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",["domain"===e.node.type?o("domain-info-card",{attrs:{mode:e.mode,node:e.node},on:{onClose:function(n){return e.$emit("onClose")}}}):e._e(),e._v(" "),"page"===e.node.type?o("page-info-card",{attrs:{mode:e.mode,node:e.node},on:{onClose:function(n){return e.$emit("onClose")}}}):e._e(),e._v(" "),"component"===e.node.type?o("component-info-card",{attrs:{mode:e.mode,node:e.node},on:{onClose:function(n){return e.$emit("onClose")}}}):e._e()],1)},staticRenderFns:[]},ue=o("VU/8")(le,ce,!1,null,null,null).exports,pe=o("GiK3"),fe=o.n(pe),he=o("g432");o("9Ez/");function ve(e){var n=e.data;return fe.a.createElement("div",{className:"node domainNode"},fe.a.createElement("div",{className:"titleBox"},fe.a.createElement("i",{className:"mdi mdi-earth"}),"Domain"),fe.a.createElement("div",{className:"infoBox"},fe.a.createElement("div",null,fe.a.createElement("b",null,"URL "),n.url)),fe.a.createElement(he.b,{type:"source",position:"right"}))}function ge(e){var n=e.data;return fe.a.createElement("div",{className:"node pageNode"},fe.a.createElement(he.b,{type:"target",position:"left"}),fe.a.createElement("div",{className:"titleBox"},fe.a.createElement("i",{className:"mdi mdi-file"}),"Page"),fe.a.createElement("div",{className:"infoBox"},fe.a.createElement("div",null,fe.a.createElement("b",null,"Path "),n.path,fe.a.createElement("br",null),fe.a.createElement("b",null,"Name "),n.name)),fe.a.createElement(he.b,{type:"source",position:"right"}))}function _e(e){var n=e.data;return fe.a.createElement("div",{className:"node componentNode"},fe.a.createElement(he.b,{type:"target",position:"left"}),fe.a.createElement("div",{className:"titleBox"},fe.a.createElement("i",{className:"mdi mdi-view-grid"}),"Component"),fe.a.createElement("div",{className:"infoBox"},fe.a.createElement("div",null,fe.a.createElement("b",null,"Name "),n.name)),fe.a.createElement(he.b,{type:"source",position:"right"}))}var Ne={name:"NodeMenu",props:{selectedMenuNode:{type:Object},positionX:{type:Number},positionY:{type:Number}},data:function(){return{isPageOpened:!1,componentOpendPages:[]}},methods:v()({},Object(g.b)(["createNode","createComponentNode","fetchPageNodes","fetchComponentNodes","emptyPageNodes","emptyComponentNodes","emptyEdges","closeComponentNodes"]),{onClickOpenPages:function(){var e=this;if(this.isPageOpened)return this.emptyComponentNodes(),this.emptyPageNodes(),this.emptyEdges(),void(this.isPageOpened=!1);this.fetchPageNodes({vue:this,domainNode:this.selectedMenuNode}).then(function(){e.isPageOpened=!0})},onClickAddPage:function(){this.createNode({vue:this,type:"page",position:{x:this.positionX,y:this.positionY}}).then(function(e){})},onClickOpenComponents:function(){var e=this,n=this.componentOpendPages.indexOf(this.selectedMenuNode.id);if(n>-1)return this.componentOpendPages.splice(n,1),void this.closeComponentNodes(this.selectedMenuNode.id);this.fetchComponentNodes({vue:this,pageNode:this.selectedMenuNode}).then(function(){e.componentOpendPages.push(e.selectedMenuNode.id)})},onClickAddComponent:function(){var e=null,n=null;"component"===this.selectedMenuNode.type?(e=this.selectedMenuNode.data.page,n=this.selectedMenuNode.id):e=this.selectedMenuNode.id,this.createComponentNode({vue:this,type:"component",position:{x:this.positionX,y:this.positionY},pageId:e,parentId:n}).then(function(e){})}})},Ee={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",["domain"===e.selectedMenuNode.type?o("v-list",[o("v-subheader",[e._v("Domain Menu")]),e._v(" "),o("v-list-item",{on:{click:e.onClickOpenPages}},[o("v-list-item-avatar",[o("v-icon",[e._v("mdi-file")])],1),e._v(" "),e.isPageOpened?o("v-list-item-content",[e._v("\r\n                Close pages\r\n            ")]):o("v-list-item-content",[e._v("\r\n                Open pages\r\n            ")])],1),e._v(" "),o("v-list-item",{on:{click:e.onClickAddPage}},[o("v-list-item-avatar",[o("v-icon",[e._v("mdi-file-plus")])],1),e._v(" "),o("v-list-item-content",[e._v("\r\n                Add page\r\n            ")])],1)],1):"page"===e.selectedMenuNode.type?o("v-list",[o("v-subheader",[e._v("Page Menu")]),e._v(" "),o("v-list-item",{on:{click:e.onClickOpenComponents}},[o("v-list-item-avatar",[o("v-icon",[e._v("mdi-view-grid")])],1),e._v(" "),e.componentOpendPages.includes(e.selectedMenuNode.id)?o("v-list-item-content",[e._v("\r\n                Close components\r\n            ")]):o("v-list-item-content",[e._v("\r\n                Open components\r\n            ")])],1),e._v(" "),o("v-list-item",{on:{click:e.onClickAddComponent}},[o("v-list-item-avatar",[o("v-icon",[e._v("mdi-view-grid-plus")])],1),e._v(" "),o("v-list-item-content",[e._v("\r\n                Add Component\r\n            ")])],1)],1):"component"===e.selectedMenuNode.type?o("v-list",[o("v-subheader",[e._v("Component Menu")]),e._v(" "),o("v-list-item",{on:{click:e.onClickAddComponent}},[o("v-list-item-avatar",[o("v-icon",[e._v("mdi-view-grid-plus")])],1),e._v(" "),o("v-list-item-content",[e._v("\r\n                Add Component\r\n            ")])],1)],1):e._e()],1)},staticRenderFns:[]},Me=o("VU/8")(Ne,Ee,!1,null,null,null).exports,Ce={name:"FlowGraph",props:{domain:{type:String}},components:{ReactFlowGraph:function(e){var n={domain:ve,page:ge,component:_e},o={width:"100%",height:(.6*window.innerHeight).toString()+"px"};return fe.a.createElement(he.d,{nodeTypes:n,style:o,elements:e.elements,onElementClick:e.onElementClick,onDrop:e.onDrop,onDragOver:function(e){e.preventDefault()},onNodeContextMenu:e.onNodeContextMenu},fe.a.createElement(he.c,null),fe.a.createElement(he.a,null))},InfoCard:ue,NodeMenu:Me},computed:v()({},Object(g.c)(["graphElements"]),Object(g.d)(["draggingTag"])),data:function(){return{showInfo:!1,mode:null,selectedNode:null,showNodeMenu:!1,nodeMenuX:0,nodeMenuY:0,selectedMenuNode:null}},methods:v()({},Object(g.b)(["createNode"]),{onDrop:function(e){},onNodeContextMenu:function(e,n){e.preventDefault(),this.nodeMenuX=e.clientX,this.nodeMenuY=e.clientY,this.selectedMenuNode=n,this.showNodeMenu=!0},onElementClick:function(e,n){if(this.showInfo&&n.id===this.selectedNode.id)return this.mode=null,this.selectedNode=null,void(this.showInfo=!1);switch(n.type){case"domain":this.onDomainClick(e,n);break;case"page":this.onPageClick(e,n);break;case"component":this.onComponentClick(e,n)}},onPageClick:function(e,n){this.mode=I,this.selectedNode=n,this.showInfo=!0},onDomainClick:function(e,n){this.mode=D,this.selectedNode=n,this.showInfo=!0},onComponentClick:function(e,n){this.mode=P,this.selectedNode=n,this.showInfo=!0},onCloseInfo:function(){this.showInfo=!1,this.mode=null,this.selectedNode=null}})},ye={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("v-container",{attrs:{fluid:""}},[o("div",[o("react-flow-graph",{attrs:{elements:e.graphElements,onElementClick:e.onElementClick,onDrop:e.onDrop,onNodeContextMenu:e.onNodeContextMenu}}),e._v(" "),o("v-menu",{attrs:{"position-x":e.nodeMenuX,"position-y":e.nodeMenuY,absolute:""},model:{value:e.showNodeMenu,callback:function(n){e.showNodeMenu=n},expression:"showNodeMenu"}},[o("node-menu",{attrs:{selectedMenuNode:e.selectedMenuNode,positionX:e.nodeMenuX,positionY:e.nodeMenuY}})],1),e._v(" "),e.showInfo?o("info-card",{attrs:{mode:e.mode,node:e.selectedNode},on:{onClose:e.onCloseInfo}}):e._e()],1)])},staticRenderFns:[]},De=o("VU/8")(Ce,ye,!1,null,null,null).exports,Ie={name:"DomainAddButton",props:{domain:{type:String}},methods:v()({},Object(g.b)(["createDomainNode"]),{onAddDomain:function(){this.createDomainNode({vue:this,url:this.domain})}})},Pe={render:function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("span",[o("p",[e._v(e._s(e.domain)+" is NOT registered.")]),e._v(" "),o("p",[e._v("Click the button if you want to register it.")])]),e._v(" "),o("v-btn",{attrs:{dark:"",color:"#ff2a6d"},on:{click:e.onAddDomain}},[e._v("Add Domain "+e._s(e.domain))])],1)},staticRenderFns:[]};var Oe=o("VU/8")(Ie,Pe,!1,function(e){o("fn28")},"data-v-3af6eff4",null).exports,be={name:"GraphPage",props:{domain:{type:String}},components:{AppHeader:E,FlowGraph:De,DomainAddButton:Oe},computed:v()({},Object(g.c)(["graphElements"])),methods:v()({},Object(g.b)(["fetchDomainNode"])),created:function(){this.fetchDomainNode({vue:this,domain:this.domain})}},we={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",[n("app-header"),this._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-row",[0!==this.graphElements.length?n("v-col",[n("flow-graph",{attrs:{domain:this.domain}})],1):n("v-col",{attrs:{align:"center"}},[n("domain-add-button",{attrs:{domain:this.domain}})],1)],1)],1)],1)},staticRenderFns:[]},$e=o("VU/8")(be,we,!1,null,null,null).exports;t.default.use(u.a);var ke,Se=new u.a({mode:"history",routes:[{path:"/",name:"MainPage",component:f},{path:"/graph/:domain",name:"GraphPage",components:{default:$e},props:{default:!0}}]}),Te=o("bOdI"),Ae=o.n(Te),xe=o("M4fF"),Ge=o.n(xe),Fe=(ke={},Ae()(ke,"SET_DOMAIN_NODE",function(e,n){e.domainNode=n}),Ae()(ke,"EMPTY_PAGE_NODES",function(e){e.pageNodes=[]}),Ae()(ke,"EMPTY_COMPONENT_NODES",function(e){e.componentNodes={}}),Ae()(ke,"EMPTY_EDGES",function(e){e.edges={}}),Ae()(ke,"CLOSE_COMPONENT_NODES",function(e,n){e.componentNodes[n]&&(e.componentNodes[n].forEach(function(n){e.edges[n.data._id]&&t.default.delete(e.edges,n.data._id)}),t.default.delete(e.componentNodes,n))}),Ae()(ke,"CONCAT_PAGE_NODES",function(e,n){e.pageNodes=e.pageNodes.concat(n)}),Ae()(ke,"CONCAT_COMPONENT_NODES",function(e,n){for(var o in n)if(o in e.componentNodes){var i=Ge.a.differenceBy(n[o],e.componentNodes[o],"id");e.componentNodes[o]=e.componentNodes[o].concat(i)}else t.default.set(e.componentNodes,o,n[o])}),Ae()(ke,"CONCAT_EDGES",function(e,n){for(var o in n)if(o in e.edges){var i=Ge.a.differenceBy(e.edges[o],n[o],"id");e.edges[o]=e.edges[o].concat(i)}else t.default.set(e.edges,o,n[o])}),Ae()(ke,"DELETE_PAGE_NODE",function(e,n){for(var o=0;o<e.pageNodes.length;o++)if(e.pageNodes[o].id===n){e.pageNodes.splice(o,1);break}for(var t=0;t<e.edges.length;t++)e.edges[t].target===n?e.edges.splice(t,1):e.edges[t].source===n&&e.edges.splice(t,1)}),Ae()(ke,"PUSH_PAGE_NODE",function(e,n){e.pageNodes.push(n)}),Ae()(ke,"PUSH_COMPONENT_NODE",function(e,n){var o=n.data.page;o in e.componentNodes?e.componentNodes[o].push(n):t.default.set(e.componentNodes,o,[n])}),Ae()(ke,"SET_DRAGGING_TAG",function(e,n){e.draggingTag=n}),Ae()(ke,"UPDATE_PAGE_NODE",function(e,n){for(var o=0;o<e.pageNodes.length;o++)if(e.pageNodes[o].id===n.id){e.pageNodes.splice(o,1),e.pageNodes.push(n);break}}),Ae()(ke,"UPDATE_COMPONENT_NODE",function(e,n){var o=n.data.page;if(o in e.componentNodes){for(var t=0;t<e.componentNodes[o].length;t++)if(e.componentNodes[o][t].id===n.id){e.componentNodes[o].splice(t,1),e.componentNodes[o].push(n);break}}else console.log("No node to update. Please add node first.")}),ke),Ue=F()(["\n    query domainInfo($url: String!) {\n        domainInfo(url: $url) {\n            _id\n            url\n            pages\n            memo\n        }\n}"],["\n    query domainInfo($url: String!) {\n        domainInfo(url: $url) {\n            _id\n            url\n            pages\n            memo\n        }\n}"]),Re=F()(["\n    mutation createDomain ($domain: DomainInput!) {\n        createDomain (domain: $domain) {\n            _id\n            url\n            pages\n            memo\n        }\n    }\n"],["\n    mutation createDomain ($domain: DomainInput!) {\n        createDomain (domain: $domain) {\n            _id\n            url\n            pages\n            memo\n        }\n    }\n"]),qe=F()(["\n    mutation modifyDomain ($domain: DomainInput!) {\n        modifyDomain (domain: $domain) {\n            _id\n            url\n            pages\n            memo\n        }\n    }\n"],["\n    mutation modifyDomain ($domain: DomainInput!) {\n        modifyDomain (domain: $domain) {\n            _id\n            url\n            pages\n            memo\n        }\n    }\n"]),je=R()(Ue),Be=R()(Re),Ve=R()(qe),Ye=F()(["\n    query pageInfo ($_id: ID!) {\n        pageInfo (_id: $_id) {\n            _id\n            url\n            memo\n        }\n    }\n"],["\n    query pageInfo ($_id: ID!) {\n        pageInfo (_id: $_id) {\n            _id\n            url\n            memo\n        }\n    }\n"]),Le=F()(["\n    query allPagesInfo ($domain: ID!) {\n        allPagesInfo(domain: $domain) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    query allPagesInfo ($domain: ID!) {\n        allPagesInfo(domain: $domain) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"]),He=F()(["\n    query pagesInfo ($ids: [ID!]!) {\n        pagesInfo(ids: $ids) {\n\n            _id\n            name\n\n        }\n    }\n\n"],["\n    query pagesInfo ($ids: [ID!]!) {\n        pagesInfo(ids: $ids) {\n\n            _id\n            name\n\n        }\n    }\n\n"]),Xe=F()(["\n    mutation createPage ($page: PageInput!) {\n        createPage (page: $page) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    mutation createPage ($page: PageInput!) {\n        createPage (page: $page) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"]),ze=F()(["\n    mutation modifyPage ($page: PageInput!) {\n        modifyPage (page: $page) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    mutation modifyPage ($page: PageInput!) {\n        modifyPage (page: $page) {\n            _id\n            name\n            path\n            domain\n            groups\n            components\n            memo\n        }\n    }\n"]),We=(R()(Ye),R()(Le)),Ke=(R()(He),R()(Xe)),Qe=R()(ze),Je=F()(["\n    query allComponentsInfo ($page: ID!) {\n        allComponentsInfo(page: $page) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    query allComponentsInfo ($page: ID!) {\n        allComponentsInfo(page: $page) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"]),Ze=F()(["\n    mutation createComponent ($component: ComponentInput!) {\n        createComponent (component: $component) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    mutation createComponent ($component: ComponentInput!) {\n        createComponent (component: $component) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"]),en=F()(["\n    mutation modifyComponent ($component: ComponentInput!) {\n        modifyComponent (component: $component) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"],["\n    mutation modifyComponent ($component: ComponentInput!) {\n        modifyComponent (component: $component) {\n            _id\n            name\n            domain\n            page\n            parent\n            groups\n            components\n            memo\n        }\n    }\n"]),nn=R()(Je),on=R()(Ze),tn=R()(en),an={fetchDomainNode:function(e,n){var o=e.commit,t=n.vue,i=n.domain;t.$apollo.query({query:je,variables:{url:i}}).then(function(e){null!=e.data.domainInfo?o("SET_DOMAIN_NODE",{id:e.data.domainInfo._id,type:"domain",data:v()({},e.data.domainInfo),position:{x:100,y:100}}):o("SET_DOMAIN_NODE",null)})},fetchPageNodes:function(e,n){var o=e.commit,t=n.vue,i=n.domainNode,a=[],d={};t.$apollo.query({query:We,variables:{domain:i.data._id}}).then(function(e){var n=i.position.x+200,s=i.position.y;e.data.allPagesInfo.forEach(function(e,o){a.push({id:e._id,type:"page",data:v()({},e),position:{x:n,y:s}}),s+=130,e._id in d||(d[e._id]=[]),d[e._id].push({id:"e"+i.data._id+"-"+e._id,source:i.data._id,target:e._id,type:"step"})}),o("CONCAT_PAGE_NODES",a),t.$nextTick(function(){o("CONCAT_EDGES",d)})}).catch(function(e){console.log(e)})},fetchComponentNodes:function(e,n){var o=e.commit,t=n.vue,i=n.pageNode,a={},d={};t.$apollo.query({query:nn,variables:{page:i.data._id}}).then(function(e){var n=i.position.x+200,s=i.position.y;e.data.allComponentsInfo.forEach(function(e,o){var t=i.data._id,m=n,r=s;null!==e.parent&&(t=e.parent,m=n+200),e.page in a||(a[e.page]=[]),a[e.page].push({id:e._id,type:"component",data:v()({},e),position:{x:m,y:r}}),s+=130,e._id in d||(d[e._id]=[]),d[e._id].push({id:"e"+t+"-"+e._id,source:t,target:e._id,type:"step"})}),o("CONCAT_COMPONENT_NODES",a),t.$nextTick(function(){o("CONCAT_EDGES",d)})}).catch(function(e){console.log(e)})},emptyPageNodes:function(e){(0,e.commit)("EMPTY_PAGE_NODES")},emptyComponentNodes:function(e){(0,e.commit)("EMPTY_COMPONENT_NODES")},emptyEdges:function(e){(0,e.commit)("EMPTY_EDGES")},closeComponentNodes:function(e,n){(0,e.commit)("CLOSE_COMPONENT_NODES",n)},concatPageNodes:function(e,n){(0,e.commit)("CONCAT_PAGE_NODES",n)},concatEdges:function(e,n){(0,e.commit)("CONCAT_EDGES",n)},createNode:function(e,n){var o=e.dispatch,t=n.vue,i=n.type,a=n.position;switch(i){case"page":return o("createPageNode",{vue:t,position:a});case"domain":return void console.log("createNode domain is not implemented")}},createComponentNode:function(e,n){var o=e.state,t=e.commit,i=n.vue,a=n.position,d=n.pageId,s=n.parentId;return i.$apollo.mutate({mutation:on,variables:{component:{_id:"new_id",name:"new_component",domain:o.domainNode.data._id,page:d,parent:s,groups:[],components:[],memo:""}}}).then(function(e){var n={id:e.data.createComponent._id,type:"component",position:a,data:e.data.createComponent};t("PUSH_COMPONENT_NODE",n);var o=d;null!==s&&(o=s);var m=Ae()({},n.id,[{id:"e"+o+"-"+n.id,source:o,target:n.id,type:"step"}]);return i.$nextTick(function(){t("CONCAT_EDGES",m)}),n})},createDomainNode:function(e,n){e.state;var o=e.commit,t=n.vue,i=n.url;return t.$apollo.mutate({mutation:Be,variables:{domain:{_id:"new_id",url:i,pages:[],memo:""}}}).then(function(e){var n={id:e.data.createDomain._id,type:"domain",position:{x:100,y:100},data:e.data.createDomain};return o("SET_DOMAIN_NODE",n),n})},createPageNode:function(e,n){var o=e.state,t=e.commit,i=n.vue,a=n.position;return i.$apollo.mutate({mutation:Ke,variables:{page:{_id:"new_id",name:"new_page",path:"new_path",domain:o.domainNode.data._id,groups:[],components:[],memo:""}}}).then(function(e){var n={id:e.data.createPage._id,type:"page",position:a,data:e.data.createPage};t("PUSH_PAGE_NODE",n);var d=Ae()({},n.id,[{id:"e"+o.domainNode.data._id+"-"+n.id,source:o.domainNode.data._id,target:n.id,type:"step"}]);return i.$nextTick(function(){t("CONCAT_EDGES",d)}),n})},modifyDomainNode:function(e,n){var o=e.commit,t=n.vue,i=n.oldNode,a=n.newDomainData;t.$apollo.mutate({mutation:Ve,variables:{domain:a}}).then(function(e){var n=v()({},i,{data:e.data.modifyDomain});o("SET_DOMAIN_NODE",n)})},modifyPageNode:function(e,n){var o=e.commit,t=n.vue,i=n.oldNode,a=n.newPageData;t.$apollo.mutate({mutation:Qe,variables:{page:a}}).then(function(e){var n=v()({},i,{data:e.data.modifyPage});o("UPDATE_PAGE_NODE",n)})},modifyComponentNode:function(e,n){var o=e.commit,t=n.vue,i=n.oldNode,a=n.newComponentData;t.$apollo.mutate({mutation:tn,variables:{component:a}}).then(function(e){var n=v()({},i,{data:e.data.modifyComponent});o("UPDATE_COMPONENT_NODE",n)})},setDraggingTag:function(e,n){(0,e.commit)("SET_DRAGGING_TAG",n)}};t.default.use(g.a);var dn=new g.a.Store({state:{domainNode:null,pageNodes:[],componentNodes:{},edges:{},draggingTag:""},getters:{graphElements:function(e){var n=[];for(var o in null!==e.domainNode&&n.push(e.domainNode),n=n.concat(e.pageNodes),e.componentNodes)n=n.concat(e.componentNodes[o]);for(var t in e.edges)n=n.concat(e.edges[t]);return n}},mutations:Fe,actions:an}),sn=o("hm+w");o.d(n,"apolloClient",function(){return rn}),t.default.use(sn.VuePlugin),t.default.use(a.a),t.default.config.productionTip=!1;t.default.use(d.a);var mn=new m.a({uri:"//localhost:3000/graphql"}),rn=new s.a({link:mn,cache:new r.a({addTypename:!1}),connectToDevTools:!0,defaultOptions:{watchQuery:{fetchPolicy:"no-cache",errorPolicy:"ignore"},query:{fetchPolicy:"no-cache",errorPolicy:"all"}}}),ln=new d.a({defaultClient:rn});new t.default({el:"#app",vuetify:new a.a({}),apolloProvider:ln,router:Se,store:dn,components:{App:c},template:"<App/>"})},csSS:function(e,n){},fn28:function(e,n){},hGhl:function(e,n){},irot:function(e,n){},p5PA:function(e,n){},sphj:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.bc4269789537badc8350.js.map