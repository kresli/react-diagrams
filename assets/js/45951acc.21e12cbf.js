(self.webpackChunk_kresli_react_diagrams_docs=self.webpackChunk_kresli_react_diagrams_docs||[]).push([[270],{6138:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>g,frontMatter:()=>d,metadata:()=>k,toc:()=>p});var s=t(7560),i=t(8283),a=t(2784),o=t(876),r=t(323),m={dragLink:null,registeredElements:new Map,canvasRef:null,viewRef:null,nodes:[{id:"1",position:[100,100],outputs:[{id:"1"}]},{id:"3",position:[400,400],inputs:[{id:"3"}]}],links:[{input:"1",output:"3",render:function(n){var e=n.start,t=n.end,s=(0,a.useMemo)((function(){var n=e[0],s=e[1],i=t[0],a=t[1];return"M"+n+" "+s+" H"+(n+30)+" L"+(i-30)+" "+a+" "+i+" "+a}),[t,e]);return a.createElement(r.rU,{d:s,stroke:"blue",fill:"none"})}}],position:[0,0],scale:1};const u=function(){var n=(0,r.I_)(m);return a.createElement("div",{style:{width:"100%",height:500}},a.createElement(r.S0,{schema:n}))};var c=t(7110),l=["components"],d={},k={unversionedId:"custom_links/Custom Links",id:"custom_links/Custom Links",isDocsHomePage:!1,title:"Custom Links",description:"Quick Example",source:"@site/docs/custom_links/Custom Links.mdx",sourceDirName:"custom_links",slug:"/custom_links/Custom Links",permalink:"/react-diagrams/custom_links/Custom Links",editUrl:"https://github.com/kresli/react-diagrams/edit/master/website/docs/custom_links/Custom Links.mdx",version:"current",frontMatter:{},sidebar:"ReactDiagrams",previous:{title:"Custom Nodes",permalink:"/react-diagrams/custom_nodes/Custom Nodes"}},p=[{value:"Quick Example",id:"quick-example",children:[]}],h={toc:p};function g(n){var e=n.components,t=(0,i.Z)(n,l);return(0,o.kt)("wrapper",(0,s.Z)({},h,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"quick-example"},"Quick Example"),(0,o.kt)(c.Z,{className:"language-tsx",mdxType:"CodeBlock"},'import {\n  Schema,\n  useSchema,\n  Diagram,\n  Link,\n  SchemaLinkRender,\n} from "@kresli/react-diagrams";\nimport React, { useMemo } from "react";\n\nconst CustomLink: SchemaLinkRender = ({ start, end }) => {\n  const points = useMemo(() => {\n    const [sx, sy] = start;\n    const [ex, ey] = end;\n    return `M${sx} ${sy} H${sx + 30} L${ex - 30} ${ey} ${ex} ${ey}`;\n  }, [end, start]);\n  return <Link d={points} stroke="blue" fill="none" />;\n};\n\nconst initialSchema: Schema = {\n  dragLink: null,\n  registeredElements: new Map(),\n  canvasRef: null,\n  viewRef: null,\n  nodes: [\n    {\n      id: "1",\n      position: [100, 100],\n      outputs: [{ id: "1" }],\n    },\n    {\n      id: "3",\n      position: [400, 400],\n      inputs: [{ id: "3" }],\n    },\n  ],\n  links: [\n    {\n      input: "1",\n      output: "3",\n      render: CustomLink,\n    },\n  ],\n  position: [0, 0],\n  scale: 1,\n};\n\nconst DiagramQuickExample = () => {\n  const schema = useSchema(initialSchema);\n  return (\n    <div style={{ width: "100%", height: 500 }}>\n      <Diagram schema={schema} />\n    </div>\n  );\n};\n\nexport default DiagramQuickExample;\n'),(0,o.kt)(u,{mdxType:"DiagramQuickExample"}))}g.isMDXComponent=!0}}]);