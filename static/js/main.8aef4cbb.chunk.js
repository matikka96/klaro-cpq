(this["webpackJsonpklaro-cpq"]=this["webpackJsonpklaro-cpq"]||[]).push([[0],{23:function(e,t,s){},24:function(e,t,s){},43:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s(2),c=s.n(n),l=s(12),r=s.n(l),o=(s(23),s(24),s(25),s(13)),i=s(14),u=s(17),h=s(16),m=s(15),d=s.n(m),j=function(e){Object(u.a)(s,e);var t=Object(h.a)(s);function s(){var e;Object(o.a)(this,s);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={searchQuery:"",searchResult:null},e.updateSearchQuery=function(t){e.setState({searchQuery:t.target.value})},e.loadBookData=function(){""!==e.state.searchQuery?d.a.get("https://www.googleapis.com/books/v1/volumes?q="+e.state.searchQuery.replace(" ","+")).then((function(t){e.setState({searchResult:t.data})})).catch((function(e){return console.log(e)})):e.setState({searchResult:null})},e}return Object(i.a)(s,[{key:"componentDidUpdate",value:function(e,t){this.state.searchQuery!==t.searchQuery&&this.loadBookData()}},{key:"render",value:function(){return Object(a.jsxs)("div",{className:"container",children:[Object(a.jsxs)("header",{className:"text-center py-4",children:[Object(a.jsx)("h1",{className:"py-2",children:"Book search"}),Object(a.jsx)("input",{className:"form-control mx-auto shadow",type:"search",placeholder:"Search books by name or author",onChange:this.updateSearchQuery,autoFocus:!0})]}),Object(a.jsxs)("main",{children:[this.state.searchResult?Object(a.jsx)("span",{className:"text-reset",children:"".concat(this.state.searchResult.totalItems,' search results with query "').concat(this.state.searchQuery,'"')}):null,this.state.searchResult?Object(a.jsx)("ul",{className:"list-unstyled",children:this.state.searchResult.items.map((function(e,t){return Object(a.jsxs)("li",{className:"media border-bottom py-3",children:[Object(a.jsx)("img",{src:e.volumeInfo.imageLinks?e.volumeInfo.imageLinks.thumbnail:"data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",className:"mr-3 img-fluid img-thumbnail",style:{width:"128px"},alt:e.volumeInfo.title}),Object(a.jsxs)("div",{className:"media-body d-flex flex-column align-self-baseline",children:[Object(a.jsxs)("h5",{className:"mt-0 mb-1",children:[e.volumeInfo.title,e.volumeInfo.authors?Object(a.jsxs)("small",{className:"font-italic",children:[" ","by ",e.volumeInfo.authors.join(", ")," "]}):null]}),Object(a.jsx)("p",{className:"text-justify text-dark",style:{maxHeight:"90px",overflowY:"hidden"},children:e.volumeInfo.description}),Object(a.jsxs)("ul",{className:"list-unstyled",children:[e.volumeInfo.previewLink?Object(a.jsx)("li",{children:Object(a.jsx)("a",{target:"_blank",rel:"noreferrer",href:e.volumeInfo.previewLink,children:"Open preview"})}):null,e.volumeInfo.infoLink?Object(a.jsx)("li",{children:Object(a.jsx)("a",{target:"_blank",rel:"noreferrer",href:e.volumeInfo.infoLink,children:"More info"})}):null]})]})]},t)}))}):null]})]})}}]),s}(n.Component);var f=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(j,{})})},b=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,44)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,l=t.getTTFB;s(e),a(e),n(e),c(e),l(e)}))};r.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(f,{})}),document.getElementById("root")),b()}},[[43,1,2]]]);
//# sourceMappingURL=main.8aef4cbb.chunk.js.map