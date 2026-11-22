import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const F=[(y,b)=>(y+b)|0,(y,b)=>(y-b)|0,(y,b)=>Math.imul(y,b),(y,b)=>(y/b)|0,(y,b)=>(y%b)|0,(y,b)=>((y>>>0)/(b>>>0))|0,(y,b)=>((y>>>0)%(b>>>0))|0,0,(y,b)=>y&b,(y,b)=>y|b,(y,b)=>y^b,0,(y,b)=>y<<(b&31),(y,b)=>y>>(b&31),(y,b)=>(y>>>(b&31))|0,0,(y,b)=>y===b?1:0,(y,b)=>y<b?1:0,(y,b)=>(y>>>0)<(b>>>0)?1:0];
function run(p,q){
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,x=0,t=0,l=0,n=0;
 const e=v=>[o.subarray(0,l),v],T=v=>{throw v};
 try{
  for(;;){
   if(t===1e6)T(10);
   if(x<0||x>=p.length)T(9);
   const a=p[x],m=a===1?1:a===2?4:a>47&&a<52?2:0;
   if(x+m>=p.length)T(9);
   t++;x+=1+m;
   if(a>15&&a<35&&a!==23&&a!==27&&a!==31){
    if(s<2)T(2);
    const b=D[s-1],y=D[s-2];
    if(!b&&a>18&&a<23)T(4);
    s-=2;D[s++]=F[a-16](y,b);
    continue;
   }
   switch(a){
    case 0:return e(0);
    case 1:if(s>255)T(3);D[s++]=(p[x-1]<<24)>>24;break;
    case 2:if(s>255)T(3);D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
    case 3:if(s<1)T(2);s--;break;
    case 4:if(s<1||s>255)T(s<1?2:3);D[s]=D[s-1];s++;break;
    case 5:if(s<2)T(2);[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
    case 6:if(s<2||s>255)T(s<2?2:3);D[s]=D[s-2];s++;break;
    case 7:if(s<3)T(2);[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
    case 23:if(s<1)T(2);D[s-1]=-D[s-1]|0;break;
    case 27:if(s<1)T(2);D[s-1]=~D[s-1];break;
    case 48:case 49:case 50:{
     const v=((p[x-2]|p[x-1]<<8)<<16)>>16;
     if(a!==48){if(s<1)T(2);const w=D[--s];if((a===49)!==(w===0))break;}
     x+=v;break;
    }
    case 51:if(c===64)T(7);C[c++]=x;x=p[x-2]|p[x-1]<<8;break;
    case 52:if(!c)T(8);x=C[--c];break;
    case 64:if(s<1)T(2);{const v=D[s-1];if(v<0||v>255)T(6);D[s-1]=M[v]}break;
    case 65:if(s<2)T(2);{const v=D[s-1],w=D[s-2];if(v<0||v>255)T(6);s-=2;M[v]=w}break;
    case 80:if(s<1)T(2);{const g=""+D[s-1];if(l+g.length>65536)T(11);s--;o.set(Buffer.from(g),l);l+=g.length}break;
    case 81:if(s<1)T(2);if(l>65535)T(11);o[l++]=D[--s]&255;break;
    case 82:if(s>255)T(3);D[s++]=n<q.length?q[n++]:-1;break;
    case 83:if(s<1)T(2);return e(D[--s]&255);
    default:T(5);
   }
  }
 }catch(c){if(typeof c!=="number")throw c;return e(c)}
}
for(const id of readdirSync(I).sort()){
 const[u,v]=run(readFileSync(I+"/"+id+"/program.bin"),readFileSync(I+"/"+id+"/input.bin"));
 mkdirSync(O+"/"+id,{recursive:true});
 writeFileSync(O+"/"+id+"/stdout.bin",u);
 writeFileSync(O+"/"+id+"/exit.txt",v+"\n");
}
