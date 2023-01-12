import{_ as s,c as a,o as n,e as p}from"./app.d1545f5f.js";const d=JSON.parse('{"title":"useBreakpointChrome","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]}],"relativePath":"composable/breakpoint/chrome.md","lastUpdated":1673486967000}'),e={name:"composable/breakpoint/chrome.md"},l=p(`<h1 id="usebreakpointchrome" tabindex="-1">useBreakpointChrome <a class="header-anchor" href="#usebreakpointchrome" aria-hidden="true">#</a></h1><blockquote><p>Use the Chrome breakpoints within javascript code.</p></blockquote><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><p>Check <a href="./breakpoint.html">useBreakpoint</a> for more detailed usage</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki vitesse-dark vp-code-dark"><code><span class="line"><span style="color:#4D9375;">import</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">{</span><span style="color:#DBD7CAEE;"> </span><span style="color:#BD976A;">useBreakpointChrome</span><span style="color:#DBD7CAEE;"> </span><span style="color:#666666;">}</span><span style="color:#DBD7CAEE;"> </span><span style="color:#4D9375;">from</span><span style="color:#DBD7CAEE;"> </span><span style="color:#C98A7DAA;">&#39;</span><span style="color:#C98A7D;">@elonehoo/pistachio</span><span style="color:#C98A7DAA;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#80A665;">useBreakpointChrome</span><span style="color:#666666;">();</span></span>
<span class="line"><span style="color:#758575DD;">/* Equivalent of:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#758575DD;">useBreakpoint({</span></span>
<span class="line"><span style="color:#758575DD;">  mobileS: 320,</span></span>
<span class="line"><span style="color:#758575DD;">  mobileM: 375,</span></span>
<span class="line"><span style="color:#758575DD;">  mobileL: 425,</span></span>
<span class="line"><span style="color:#758575DD;">  tablet: 768,</span></span>
<span class="line"><span style="color:#758575DD;">  laptop: 1024,</span></span>
<span class="line"><span style="color:#758575DD;">  laptopL: 1440,</span></span>
<span class="line"><span style="color:#758575DD;">  desktop4K: 2560</span></span>
<span class="line"><span style="color:#758575DD;">})</span></span>
<span class="line"><span style="color:#758575DD;">*/</span></span>
<span class="line"></span></code></pre><pre class="shiki vitesse-light vp-code-light"><code><span class="line"><span style="color:#1E754F;">import</span><span style="color:#393A34;"> </span><span style="color:#999999;">{</span><span style="color:#393A34;"> </span><span style="color:#B07D48;">useBreakpointChrome</span><span style="color:#393A34;"> </span><span style="color:#999999;">}</span><span style="color:#393A34;"> </span><span style="color:#1E754F;">from</span><span style="color:#393A34;"> </span><span style="color:#B56959AA;">&#39;</span><span style="color:#B56959;">@elonehoo/pistachio</span><span style="color:#B56959AA;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#59873A;">useBreakpointChrome</span><span style="color:#999999;">();</span></span>
<span class="line"><span style="color:#A0ADA0;">/* Equivalent of:</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A0ADA0;">useBreakpoint({</span></span>
<span class="line"><span style="color:#A0ADA0;">  mobileS: 320,</span></span>
<span class="line"><span style="color:#A0ADA0;">  mobileM: 375,</span></span>
<span class="line"><span style="color:#A0ADA0;">  mobileL: 425,</span></span>
<span class="line"><span style="color:#A0ADA0;">  tablet: 768,</span></span>
<span class="line"><span style="color:#A0ADA0;">  laptop: 1024,</span></span>
<span class="line"><span style="color:#A0ADA0;">  laptopL: 1440,</span></span>
<span class="line"><span style="color:#A0ADA0;">  desktop4K: 2560</span></span>
<span class="line"><span style="color:#A0ADA0;">})</span></span>
<span class="line"><span style="color:#A0ADA0;">*/</span></span>
<span class="line"></span></code></pre></div>`,5),o=[l];function t(c,r,i,A,y,D){return n(),a("div",null,o)}const m=s(e,[["render",t]]);export{d as __pageData,m as default};
