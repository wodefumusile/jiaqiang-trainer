var El=Object.defineProperty;var yl=(i,e,t)=>e in i?El(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var As=(i,e,t)=>yl(i,typeof e!="symbol"?e+"":e,t);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gn="srgb",Zs="srgb-linear",Js="linear",vt="srgb";const Na="300 es";function Tl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function bl(){const i=Qs("canvas");return i.style.display="block",i}const Oa={};function Ba(...i){const e="THREE."+i.shift();console.log(e,...i)}function Bo(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=Bo(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ut(...i){i=Bo(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Fi(...i){const e=i.join(" ");e in Oa||(Oa[e]=!0,He(...i))}function Al(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const wl={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};class di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Er=Math.PI/180,ta=180/Math.PI;function cs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function at(i,e,t){return Math.max(e,Math.min(t,i))}function Rl(i,e){return(i%e+e)%e}function yr(i,e,t){return(1-t)*i+t*e}function Ki(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const fa=class fa{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};fa.prototype.isVector2=!0;let tt=fa;class ui{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],d=r[a+0],g=r[a+1],v=r[a+2],T=r[a+3];if(f!==T||l!==d||c!==g||h!==v){let m=l*d+c*g+h*v+f*T;m<0&&(d=-d,g=-g,v=-v,T=-T,m=-m);let u=1-o;if(m<.9995){const w=Math.acos(m),C=Math.sin(w);u=Math.sin(u*w)/C,o=Math.sin(o*w)/C,l=l*u+d*o,c=c*u+g*o,h=h*u+v*o,f=f*u+T*o}else{l=l*u+d*o,c=c*u+g*o,h=h*u+v*o,f=f*u+T*o;const w=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=w,c*=w,h*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],d=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+h*f+l*g-c*d,e[t+1]=l*v+h*d+c*f-o*g,e[t+2]=c*v+h*g+o*d-l*f,e[t+3]=h*v-o*f-l*d-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),d=l(n/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f-d*g*v;break;case"YXZ":this._x=d*h*f+c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f+d*g*v;break;case"ZXY":this._x=d*h*f-c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f-d*g*v;break;case"ZYX":this._x=d*h*f-c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f+d*g*v;break;case"YZX":this._x=d*h*f+c*g*v,this._y=c*g*f+d*h*v,this._z=c*h*v-d*g*f,this._w=c*h*f-d*g*v;break;case"XZY":this._x=d*h*f-c*g*v,this._y=c*g*f-d*h*v,this._z=c*h*v+d*g*f,this._w=c*h*f+d*g*v;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],d=n+o+f;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>f){const g=2*Math.sqrt(1+n-o-f);this._w=(h-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>f){const g=2*Math.sqrt(1+o-n-f);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+f-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const pa=class pa{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(za.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(za.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tr.copy(this).projectOnVector(e),this.sub(Tr)}reflect(e){return this.sub(Tr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};pa.prototype.isVector3=!0;let I=pa;const Tr=new I,za=new ui,ma=class ma{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],g=n[5],v=n[8],T=s[0],m=s[3],u=s[6],w=s[1],C=s[4],S=s[7],b=s[2],y=s[5],P=s[8];return r[0]=a*T+o*w+l*b,r[3]=a*m+o*C+l*y,r[6]=a*u+o*S+l*P,r[1]=c*T+h*w+f*b,r[4]=c*m+h*C+f*y,r[7]=c*u+h*S+f*P,r[2]=d*T+g*w+v*b,r[5]=d*m+g*C+v*y,r[8]=d*u+g*S+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,d=o*l-h*r,g=c*r-a*l,v=t*f+n*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/v;return e[0]=f*T,e[1]=(s*c-h*n)*T,e[2]=(o*n-s*a)*T,e[3]=d*T,e[4]=(h*t-s*l)*T,e[5]=(s*r-o*t)*T,e[6]=g*T,e[7]=(n*l-c*t)*T,e[8]=(a*t-n*r)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Fi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(br.makeScale(e,t)),this}rotate(e){return Fi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(br.makeRotation(-e)),this}translate(e,t){return Fi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(br.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ma.prototype.isMatrix3=!0;let qe=ma;const br=new qe,Ga=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ka=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cl(){const i={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=zn(s.r),s.g=zn(s.g),s.b=zn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?Js:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Fi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Fi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Zs]:{primaries:e,whitePoint:n,transfer:Js,toXYZ:Ga,fromXYZ:ka,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Ga,fromXYZ:ka,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),i}const rt=Cl();function zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class Pl{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=Qs("canvas")),vi.width=e.width,vi.height=e.height;const s=vi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=zn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(zn(t[n]/255)*255):t[n]=zn(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ll=0;class oa{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ll++}),this.uuid=cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ar(s[a].image)):r.push(Ar(s[a]))}else r=Ar(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ar(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}let Dl=0;const wr=new I;class en extends di{constructor(e=en.DEFAULT_IMAGE,t=en.DEFAULT_MAPPING,n=1001,s=1001,r=1006,a=1008,o=1023,l=1009,c=en.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dl++}),this.uuid=cs(),this.name="",this.source=new oa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wr).x}get height(){return this.source.getSize(wr).y}get depth(){return this.source.getSize(wr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=300;en.DEFAULT_ANISOTROPY=1;const ga=class ga{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],f=l[8],d=l[1],g=l[5],v=l[9],T=l[2],m=l[6],u=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-T)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+T)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,S=(g+1)/2,b=(u+1)/2,y=(h+d)/4,P=(f+T)/4,_=(v+m)/4;return C>S&&C>b?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=y/n,r=P/n):S>b?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=y/s,r=_/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=P/r,s=_/r),this.set(n,s,r,t),this}let w=Math.sqrt((m-v)*(m-v)+(f-T)*(f-T)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-v)/w,this.y=(f-T)/w,this.z=(d-h)/w,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ga.prototype.isVector4=!0;let Pt=ga;class Il extends di{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new en(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new oa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends Il{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class zo extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fl extends en{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const nr=class nr{constructor(e,t,n,s,r,a,o,l,c,h,f,d,g,v,T,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,f,d,g,v,T,m)}set(e,t,n,s,r,a,o,l,c,h,f,d,g,v,T,m){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=f,u[14]=d,u[3]=g,u[7]=v,u[11]=T,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Si.setFromMatrixColumn(e,0).length(),r=1/Si.setFromMatrixColumn(e,1).length(),a=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*h,g=a*f,v=o*h,T=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=g+v*c,t[5]=d-T*c,t[9]=-o*l,t[2]=T-d*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,g=l*f,v=c*h,T=c*f;t[0]=d+T*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=g*o-v,t[6]=T+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,g=l*f,v=c*h,T=c*f;t[0]=d-T*o,t[4]=-a*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*h,t[9]=T-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,g=a*f,v=o*h,T=o*f;t[0]=l*h,t[4]=v*c-g,t[8]=d*c+T,t[1]=l*f,t[5]=T*c+d,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,g=a*c,v=o*l,T=o*c;t[0]=l*h,t[4]=T-d*f,t[8]=v*f+g,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=g*f+v,t[10]=d-T*f}else if(e.order==="XZY"){const d=a*l,g=a*c,v=o*l,T=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=d*f+T,t[5]=a*h,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*h,t[10]=T*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ul,e,Nl)}lookAt(e,t,n){const s=this.elements;return dn.subVectors(e,t),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),qn.crossVectors(n,dn),qn.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),qn.crossVectors(n,dn)),qn.normalize(),ws.crossVectors(dn,qn),s[0]=qn.x,s[4]=ws.x,s[8]=dn.x,s[1]=qn.y,s[5]=ws.y,s[9]=dn.y,s[2]=qn.z,s[6]=ws.z,s[10]=dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],g=n[13],v=n[2],T=n[6],m=n[10],u=n[14],w=n[3],C=n[7],S=n[11],b=n[15],y=s[0],P=s[4],_=s[8],A=s[12],L=s[1],B=s[5],z=s[9],V=s[13],U=s[2],W=s[6],j=s[10],ee=s[14],oe=s[3],$=s[7],ne=s[11],re=s[15];return r[0]=a*y+o*L+l*U+c*oe,r[4]=a*P+o*B+l*W+c*$,r[8]=a*_+o*z+l*j+c*ne,r[12]=a*A+o*V+l*ee+c*re,r[1]=h*y+f*L+d*U+g*oe,r[5]=h*P+f*B+d*W+g*$,r[9]=h*_+f*z+d*j+g*ne,r[13]=h*A+f*V+d*ee+g*re,r[2]=v*y+T*L+m*U+u*oe,r[6]=v*P+T*B+m*W+u*$,r[10]=v*_+T*z+m*j+u*ne,r[14]=v*A+T*V+m*ee+u*re,r[3]=w*y+C*L+S*U+b*oe,r[7]=w*P+C*B+S*W+b*$,r[11]=w*_+C*z+S*j+b*ne,r[15]=w*A+C*V+S*ee+b*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],d=e[10],g=e[14],v=e[3],T=e[7],m=e[11],u=e[15],w=l*g-c*d,C=o*g-c*f,S=o*d-l*f,b=a*g-c*h,y=a*d-l*h,P=a*f-o*h;return t*(T*w-m*C+u*S)-n*(v*w-m*b+u*y)+s*(v*C-T*b+u*P)-r*(v*S-T*y+m*P)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],d=e[10],g=e[11],v=e[12],T=e[13],m=e[14],u=e[15],w=t*o-n*a,C=t*l-s*a,S=t*c-r*a,b=n*l-s*o,y=n*c-r*o,P=s*c-r*l,_=h*T-f*v,A=h*m-d*v,L=h*u-g*v,B=f*m-d*T,z=f*u-g*T,V=d*u-g*m,U=w*V-C*z+S*B+b*L-y*A+P*_;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/U;return e[0]=(o*V-l*z+c*B)*W,e[1]=(s*z-n*V-r*B)*W,e[2]=(T*P-m*y+u*b)*W,e[3]=(d*y-f*P-g*b)*W,e[4]=(l*L-a*V-c*A)*W,e[5]=(t*V-s*L+r*A)*W,e[6]=(m*S-v*P-u*C)*W,e[7]=(h*P-d*S+g*C)*W,e[8]=(a*z-o*L+c*_)*W,e[9]=(n*L-t*z-r*_)*W,e[10]=(v*y-T*S+u*w)*W,e[11]=(f*S-h*y-g*w)*W,e[12]=(o*A-a*B-l*_)*W,e[13]=(t*B-n*A+s*_)*W,e[14]=(T*C-v*b-m*w)*W,e[15]=(h*b-f*C+d*w)*W,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,f=o+o,d=r*c,g=r*h,v=r*f,T=a*h,m=a*f,u=o*f,w=l*c,C=l*h,S=l*f,b=n.x,y=n.y,P=n.z;return s[0]=(1-(T+u))*b,s[1]=(g+S)*b,s[2]=(v-C)*b,s[3]=0,s[4]=(g-S)*y,s[5]=(1-(d+u))*y,s[6]=(m+w)*y,s[7]=0,s[8]=(v+C)*P,s[9]=(m-w)*P,s[10]=(1-(d+T))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Si.set(s[0],s[1],s[2]).length();const o=Si.set(s[4],s[5],s[6]).length(),l=Si.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);const c=1/a,h=1/o,f=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=f,vn.elements[9]*=f,vn.elements[10]*=f,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=2e3,l=!1){const c=this.elements,h=2*r/(t-e),f=2*r/(n-s),d=(t+e)/(t-e),g=(n+s)/(n-s);let v,T;if(l)v=r/(a-r),T=a*r/(a-r);else if(o===2e3)v=-(a+r)/(a-r),T=-2*a*r/(a-r);else if(o===2001)v=-a/(a-r),T=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=T,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=2e3,l=!1){const c=this.elements,h=2/(t-e),f=2/(n-s),d=-(t+e)/(t-e),g=-(n+s)/(n-s);let v,T;if(l)v=1/(a-r),T=a/(a-r);else if(o===2e3)v=-2/(a-r),T=-(a+r)/(a-r);else if(o===2001)v=-1/(a-r),T=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=T,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nr.prototype.isMatrix4=!0;let Lt=nr;const Si=new I,vn=new Lt,Ul=new I(0,0,0),Nl=new I(1,1,1),qn=new I,ws=new I,dn=new I,Ha=new Lt,Va=new ui;class Cn{constructor(e=0,t=0,n=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-at(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(at(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-at(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(at(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ha.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ha,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Va.setFromEuler(this),this.setFromQuaternion(Va,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class la{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ol=0;const Wa=new I,Mi=new ui,In=new Lt,Rs=new I,Zi=new I,Bl=new I,zl=new ui,Xa=new I(1,0,0),qa=new I(0,1,0),Ya=new I(0,0,1),$a={type:"added"},Gl={type:"removed"},Ei={type:"childadded",child:null},Rr={type:"childremoved",child:null};class qt extends di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ol++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new I,t=new Cn,n=new ui,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Lt},normalMatrix:{value:new qe}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new la,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(Xa,e)}rotateY(e){return this.rotateOnAxis(qa,e)}rotateZ(e){return this.rotateOnAxis(Ya,e)}translateOnAxis(e,t){return Wa.copy(e).applyQuaternion(this.quaternion),this.position.add(Wa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xa,e)}translateY(e){return this.translateOnAxis(qa,e)}translateZ(e){return this.translateOnAxis(Ya,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rs.copy(e):Rs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Zi,Rs,this.up):In.lookAt(Rs,Zi,this.up),this.quaternion.setFromRotationMatrix(In),s&&(In.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(In),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ut("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($a),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):ut("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gl),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($a),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Bl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,zl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),f=a(e.shapes),d=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}qt.DEFAULT_UP=new I(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ci extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kl={type:"move"};class Cr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const T of e.hand.values()){const m=t.getJointPose(T,n),u=this._getHandJoint(c,T);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),g=.02,v=.005;c.inputState.pinching&&d>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kl)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ci;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Go={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function Pr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=Rl(e,1),t=at(t,0,1),n=at(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Pr(a,r,e+1/3),this.g=Pr(a,r,e),this.b=Pr(a,r,e-1/3)}return rt.colorSpaceToWorking(this,s),this}setStyle(e,t=gn){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gn){const n=Go[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zn(e.r),this.g=zn(e.g),this.b=zn(e.b),this}copyLinearToSRGB(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gn){return rt.workingToColorSpace(Zt.copy(this),e),Math.round(at(Zt.r*255,0,255))*65536+Math.round(at(Zt.g*255,0,255))*256+Math.round(at(Zt.b*255,0,255))}getHexString(e=gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,s=Zt.g,r=Zt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=gn){rt.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,s=Zt.b;return e!==gn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Yn),this.setHSL(Yn.h+e,Yn.s+t,Yn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yn),e.getHSL(Cs);const n=yr(Yn.h,Cs.h,t),s=yr(Yn.s,Cs.s,t),r=yr(Yn.l,Cs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new et;et.NAMES=Go;class ca{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new et(e),this.near=t,this.far=n}clone(){return new ca(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hl extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Sn=new I,Fn=new I,Lr=new I,Un=new I,yi=new I,Ti=new I,Ka=new I,Dr=new I,Ir=new I,Fr=new I,Ur=new Pt,Nr=new Pt,Or=new Pt;class En{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Sn.subVectors(e,t),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Sn.subVectors(s,t),Fn.subVectors(n,t),Lr.subVectors(e,t);const a=Sn.dot(Sn),o=Sn.dot(Fn),l=Sn.dot(Lr),c=Fn.dot(Fn),h=Fn.dot(Lr),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,g=(c*l-o*h)*d,v=(a*h-o*l)*d;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Ur.setScalar(0),Nr.setScalar(0),Or.setScalar(0),Ur.fromBufferAttribute(e,t),Nr.fromBufferAttribute(e,n),Or.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ur,r.x),a.addScaledVector(Nr,r.y),a.addScaledVector(Or,r.z),a}static isFrontFacing(e,t,n,s){return Sn.subVectors(n,t),Fn.subVectors(e,t),Sn.cross(Fn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),Sn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return En.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;yi.subVectors(s,n),Ti.subVectors(r,n),Dr.subVectors(e,n);const l=yi.dot(Dr),c=Ti.dot(Dr);if(l<=0&&c<=0)return t.copy(n);Ir.subVectors(e,s);const h=yi.dot(Ir),f=Ti.dot(Ir);if(h>=0&&f<=h)return t.copy(s);const d=l*f-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(yi,a);Fr.subVectors(e,r);const g=yi.dot(Fr),v=Ti.dot(Fr);if(v>=0&&g<=v)return t.copy(r);const T=g*c-l*v;if(T<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Ti,o);const m=h*v-g*f;if(m<=0&&f-h>=0&&g-v>=0)return Ka.subVectors(r,s),o=(f-h)/(f-h+(g-v)),t.copy(s).addScaledVector(Ka,o);const u=1/(m+T+d);return a=T*u,o=d*u,t.copy(n).addScaledVector(yi,a).addScaledVector(Ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zi{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ps.copy(n.boundingBox)),Ps.applyMatrix4(e.matrixWorld),this.union(Ps)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Ls.subVectors(this.max,Ji),bi.subVectors(e.a,Ji),Ai.subVectors(e.b,Ji),wi.subVectors(e.c,Ji),$n.subVectors(Ai,bi),Kn.subVectors(wi,Ai),ii.subVectors(bi,wi);let t=[0,-$n.z,$n.y,0,-Kn.z,Kn.y,0,-ii.z,ii.y,$n.z,0,-$n.x,Kn.z,0,-Kn.x,ii.z,0,-ii.x,-$n.y,$n.x,0,-Kn.y,Kn.x,0,-ii.y,ii.x,0];return!Br(t,bi,Ai,wi,Ls)||(t=[1,0,0,0,1,0,0,0,1],!Br(t,bi,Ai,wi,Ls))?!1:(Ds.crossVectors($n,Kn),t=[Ds.x,Ds.y,Ds.z],Br(t,bi,Ai,wi,Ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Nn=[new I,new I,new I,new I,new I,new I,new I,new I],Mn=new I,Ps=new zi,bi=new I,Ai=new I,wi=new I,$n=new I,Kn=new I,ii=new I,Ji=new I,Ls=new I,Ds=new I,si=new I;function Br(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){si.fromArray(i,r);const o=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),l=e.dot(si),c=t.dot(si),h=n.dot(si);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Bt=new I,Is=new tt;let Vl=0;class Gn extends di{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vl++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Is.fromBufferAttribute(this,t),Is.applyMatrix3(e),this.setXY(t,Is.x,Is.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ki(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ko extends Gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ho extends Gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ft extends Gn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Wl=new zi,Qi=new I,zr=new I;class da{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Wl.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Qi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(zr)),this.expandByPoint(Qi.copy(e.center).sub(zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Xl=0;const mn=new Lt,Gr=new qt,Ri=new I,un=new zi,ji=new zi,Wt=new I;class fn extends di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xl++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tl(e)?Ho:ko)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return Gr.lookAt(e),Gr.updateMatrix(),this.applyMatrix4(Gr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ft(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new da);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(un.min,ji.min),un.expandByPoint(Wt),Wt.addVectors(un.max,ji.max),un.expandByPoint(Wt)):(un.expandByPoint(ji.min),un.expandByPoint(ji.max))}un.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Wt.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),Wt.add(Ri)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Gn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new I,l[_]=new I;const c=new I,h=new I,f=new I,d=new tt,g=new tt,v=new tt,T=new I,m=new I;function u(_,A,L){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,A),f.fromBufferAttribute(n,L),d.fromBufferAttribute(r,_),g.fromBufferAttribute(r,A),v.fromBufferAttribute(r,L),h.sub(c),f.sub(c),g.sub(d),v.sub(d);const B=1/(g.x*v.y-v.x*g.y);isFinite(B)&&(T.copy(h).multiplyScalar(v.y).addScaledVector(f,-g.y).multiplyScalar(B),m.copy(f).multiplyScalar(g.x).addScaledVector(h,-v.x).multiplyScalar(B),o[_].add(T),o[A].add(T),o[L].add(T),l[_].add(m),l[A].add(m),l[L].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let _=0,A=w.length;_<A;++_){const L=w[_],B=L.start,z=L.count;for(let V=B,U=B+z;V<U;V+=3)u(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const C=new I,S=new I,b=new I,y=new I;function P(_){b.fromBufferAttribute(s,_),y.copy(b);const A=o[_];C.copy(A),C.sub(b.multiplyScalar(b.dot(A))).normalize(),S.crossVectors(y,A);const B=S.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,B)}for(let _=0,A=w.length;_<A;++_){const L=w[_],B=L.start,z=L.count;for(let V=B,U=B+z;V<U;V+=3)P(e.getX(V+0)),P(e.getX(V+1)),P(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Gn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,f=new I;if(e)for(let d=0,g=e.count;d<g;d+=3){const v=e.getX(d+0),T=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,T),a.fromBufferAttribute(t,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,T),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(T,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h);let g=0,v=0;for(let T=0,m=l.length;T<m;T++){o.isInterleavedBufferAttribute?g=l[T]*o.data.stride+o.offset:g=l[T]*h;for(let u=0;u<h;u++)d[v++]=c[g++]}return new Gn(d,h,f)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const d=c[h],g=e(d,n);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){const g=c[f];h.push(g.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],f=r[c];for(let d=0,g=f.length;d<g;d++)h.push(f[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kr=new I,ql=new I,Yl=new qe;class Jn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=kr.subVectors(n,t).cross(ql.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(kr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yl.getNormalMatrix(e),s=this.coplanarPoint(kr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let $l=0;class Gi extends di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$l++}),this.uuid=cs(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Jn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new tt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new tt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const On=new I,Hr=new I,Fs=new I,Us=new I;class Vo{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Hr.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Us.copy(this.origin).sub(Hr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Fs),o=Us.dot(this.direction),l=-Us.dot(Fs),c=Us.lengthSq(),h=Math.abs(1-a*a);let f,d,g,v;if(h>0)if(f=a*l-o,d=a*o-l,v=r*h,f>=0)if(d>=-v)if(d<=v){const T=1/h;f*=T,d*=T,g=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d<=-v?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c):d<=v?(f=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Hr).addScaledVector(Fs,d),g}intersectSphere(e,t){if(e.radius<0)return null;On.subVectors(e.center,this.origin);const n=On.dot(this.direction),s=On.dot(On)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=e.x-a.x,d=e.y-a.y,g=e.z-a.z,v=t.x-a.x,T=t.y-a.y,m=t.z-a.z,u=n.x-a.x,w=n.y-a.y,C=n.z-a.z,S=Math.abs(l),b=Math.abs(c),y=Math.abs(h);let P,_,A,L,B,z,V,U,W,j,ee,oe;if(S>=b&&S>=y?(A=l,z=f,W=v,oe=u,l>=0?(P=c,_=h,L=d,B=g,V=T,U=m,j=w,ee=C):(P=h,_=c,L=g,B=d,V=m,U=T,j=C,ee=w)):b>=y?(A=c,z=d,W=T,oe=w,c>=0?(P=h,_=l,L=g,B=f,V=m,U=v,j=C,ee=u):(P=l,_=h,L=f,B=g,V=v,U=m,j=u,ee=C)):(A=h,z=g,W=m,oe=C,h>=0?(P=l,_=c,L=f,B=d,V=v,U=T,j=u,ee=w):(P=c,_=l,L=d,B=f,V=T,U=v,j=w,ee=u)),A===0)return null;const $=P/A,ne=_/A,re=1/A,Le=L-$*z,Fe=B-ne*z,ht=V-$*W,Ne=U-ne*W,lt=j-$*oe,J=ee-ne*oe,ie=lt*Ne-J*ht,Me=Le*J-Fe*lt,Oe=ht*Fe-Ne*Le;if(s){if(ie<0||Me<0||Oe<0)return null}else if((ie<0||Me<0||Oe<0)&&(ie>0||Me>0||Oe>0))return null;const Ae=ie+Me+Oe;if(Ae===0)return null;const Ye=re*(ie*z+Me*W+Oe*oe);return(Ae>0?Ye<0:Ye>0)?null:this.at(Ye/Ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qn extends Gi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Za=new Lt,ri=new Vo,Ns=new da,Ja=new I,Os=new I,Bs=new I,zs=new I,Vr=new I,Gs=new I,Qa=new I,ks=new I;class pt extends qt{constructor(e=new fn,t=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Gs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(Vr.fromBufferAttribute(f,e),a?Gs.addScaledVector(Vr,h):Gs.addScaledVector(Vr.sub(t),h))}t.add(Gs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(r),ri.copy(e.ray).recast(e.near),!(Ns.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Ns,Ja)===null||ri.origin.distanceToSquared(Ja)>(e.far-e.near)**2))&&(Za.copy(r).invert(),ri.copy(e.ray).applyMatrix4(Za),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,T=d.length;v<T;v++){const m=d[v],u=a[m.materialIndex],w=Math.max(m.start,g.start),C=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let S=w,b=C;S<b;S+=3){const y=o.getX(S),P=o.getX(S+1),_=o.getX(S+2);s=Hs(this,u,e,n,c,h,f,y,P,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),T=Math.min(o.count,g.start+g.count);for(let m=v,u=T;m<u;m+=3){const w=o.getX(m),C=o.getX(m+1),S=o.getX(m+2);s=Hs(this,a,e,n,c,h,f,w,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,T=d.length;v<T;v++){const m=d[v],u=a[m.materialIndex],w=Math.max(m.start,g.start),C=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let S=w,b=C;S<b;S+=3){const y=S,P=S+1,_=S+2;s=Hs(this,u,e,n,c,h,f,y,P,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),T=Math.min(l.count,g.start+g.count);for(let m=v,u=T;m<u;m+=3){const w=m,C=m+1,S=m+2;s=Hs(this,a,e,n,c,h,f,w,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Kl(i,e,t,n,s,r,a,o){let l;if(e.side===1?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===0,o),l===null)return null;ks.copy(o),ks.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ks);return c<t.near||c>t.far?null:{distance:c,point:ks.clone(),object:i}}function Hs(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Os),i.getVertexPosition(l,Bs),i.getVertexPosition(c,zs);const h=Kl(i,e,t,n,Os,Bs,zs,Qa);if(h){const f=new I;En.getBarycoord(Qa,Os,Bs,zs,f),s&&(h.uv=En.getInterpolatedAttribute(s,o,l,c,f,new tt)),r&&(h.uv1=En.getInterpolatedAttribute(r,o,l,c,f,new tt)),a&&(h.normal=En.getInterpolatedAttribute(a,o,l,c,f,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};En.getNormal(Os,Bs,zs,d.normal),h.face=d,h.barycoord=f}return h}class Zl extends en{constructor(e=null,t=1,n=1,s,r,a,o,l,c=1003,h=1003,f,d){super(null,a,o,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ai=new da,Jl=new tt(.5,.5),Vs=new I;class ua{constructor(e=new Jn,t=new Jn,n=new Jn,s=new Jn,r=new Jn,a=new Jn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],g=r[7],v=r[8],T=r[9],m=r[10],u=r[11],w=r[12],C=r[13],S=r[14],b=r[15];if(s[0].setComponents(c-a,g-h,u-v,b-w).normalize(),s[1].setComponents(c+a,g+h,u+v,b+w).normalize(),s[2].setComponents(c+o,g+f,u+T,b+C).normalize(),s[3].setComponents(c-o,g-f,u-T,b-C).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,g-d,u-m,b-S).normalize();else if(s[4].setComponents(c-l,g-d,u-m,b-S).normalize(),t===2e3)s[5].setComponents(c+l,g+d,u+m,b+S).normalize();else if(t===2001)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){ai.center.set(0,0,0);const t=Jl.distanceTo(e.center);return ai.radius=.7071067811865476+t,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Vs.x=s.normal.x>0?e.max.x:e.min.x,Vs.y=s.normal.y>0?e.max.y:e.min.y,Vs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wo extends en{constructor(e=[],t=301,n,s,r,a,o,l,c,h){super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class os extends en{constructor(e,t,n=1014,s,r,a,o=1003,l=1003,c,h=1026,f=1){if(h!==1026&&h!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new oa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Ql extends os{constructor(e,t=1014,n=301,s,r,a=1003,o=1003,l,c=1026){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xo extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class yt extends fn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let d=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(h,3)),this.setAttribute("uv",new Ft(f,2));function v(T,m,u,w,C,S,b,y,P,_,A){const L=S/P,B=b/_,z=S/2,V=b/2,U=y/2,W=P+1,j=_+1;let ee=0,oe=0;const $=new I;for(let ne=0;ne<j;ne++){const re=ne*B-V;for(let Le=0;Le<W;Le++){const Fe=Le*L-z;$[T]=Fe*w,$[m]=re*C,$[u]=U,c.push($.x,$.y,$.z),$[T]=0,$[m]=0,$[u]=y>0?1:-1,h.push($.x,$.y,$.z),f.push(Le/P),f.push(1-ne/_),ee+=1}}for(let ne=0;ne<_;ne++)for(let re=0;re<P;re++){const Le=d+re+W*ne,Fe=d+re+W*(ne+1),ht=d+(re+1)+W*(ne+1),Ne=d+(re+1)+W*ne;l.push(Le,Fe,Ne),l.push(Fe,ht,Ne),oe+=6}o.addGroup(g,oe,A),g+=oe,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class js extends fn{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=t/2,f=Math.PI/2*e,d=t,g=2*f+d,v=n*2+r,T=s+1,m=new I,u=new I;for(let w=0;w<=v;w++){let C=0,S=0,b=0,y=0;if(w<=n){const A=w/n,L=A*Math.PI/2;S=-h-e*Math.cos(L),b=e*Math.sin(L),y=-e*Math.cos(L),C=A*f}else if(w<=n+r){const A=(w-n)/r;S=-h+A*t,b=e,y=0,C=f+A*d}else{const A=(w-n-r)/n,L=A*Math.PI/2;S=h+e*Math.sin(L),b=e*Math.cos(L),y=e*Math.sin(L),C=f+d+A*f}const P=Math.max(0,Math.min(1,C/g));let _=0;w===0?_=.5/s:w===v&&(_=-.5/s);for(let A=0;A<=s;A++){const L=A/s,B=L*Math.PI*2,z=Math.sin(B),V=Math.cos(B);u.x=-b*V,u.y=S,u.z=b*z,o.push(u.x,u.y,u.z),m.set(-b*V,y,b*z),m.normalize(),l.push(m.x,m.y,m.z),c.push(L+_,P)}if(w>0){const A=(w-1)*T;for(let L=0;L<s;L++){const B=A+L,z=A+L+1,V=w*T+L,U=w*T+L+1;a.push(B,z,V),a.push(z,U,V)}}}this.setIndex(a),this.setAttribute("position",new Ft(o,3)),this.setAttribute("normal",new Ft(l,3)),this.setAttribute("uv",new Ft(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class ls extends fn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new I,h=new tt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const g=n+f/t*s;c.x=e*Math.cos(g),c.y=e*Math.sin(g),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Ft(a,3)),this.setAttribute("normal",new Ft(o,3)),this.setAttribute("uv",new Ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class er extends fn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],g=[];let v=0;const T=[],m=n/2;let u=0;w(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(h),this.setAttribute("position",new Ft(f,3)),this.setAttribute("normal",new Ft(d,3)),this.setAttribute("uv",new Ft(g,2));function w(){const S=new I,b=new I;let y=0;const P=(t-e)/n;for(let _=0;_<=r;_++){const A=[],L=_/r,B=L*(t-e)+e;for(let z=0;z<=s;z++){const V=z/s,U=V*l+o,W=Math.sin(U),j=Math.cos(U);b.x=B*W,b.y=-L*n+m,b.z=B*j,f.push(b.x,b.y,b.z),S.set(W,P,j).normalize(),d.push(S.x,S.y,S.z),g.push(V,1-L),A.push(v++)}T.push(A)}for(let _=0;_<s;_++)for(let A=0;A<r;A++){const L=T[A][_],B=T[A+1][_],z=T[A+1][_+1],V=T[A][_+1];(e>0||A!==0)&&(h.push(L,B,V),y+=3),(t>0||A!==r-1)&&(h.push(B,z,V),y+=3)}c.addGroup(u,y,0),u+=y}function C(S){const b=v,y=new tt,P=new I;let _=0;const A=S===!0?e:t,L=S===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,m*L,0),d.push(0,L,0),g.push(.5,.5),v++;const B=v;for(let z=0;z<=s;z++){const U=z/s*l+o,W=Math.cos(U),j=Math.sin(U);P.x=A*j,P.y=m*L,P.z=A*W,f.push(P.x,P.y,P.z),d.push(0,L,0),y.x=W*.5+.5,y.y=j*.5*L+.5,g.push(y.x,y.y),v++}for(let z=0;z<s;z++){const V=b+z,U=B+z;S===!0?h.push(U,U+1,V):h.push(U+1,U,V),_+=3}c.addGroup(u,_,S===!0?1:2),u+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new er(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ni extends fn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=e/o,d=t/l,g=[],v=[],T=[],m=[];for(let u=0;u<h;u++){const w=u*d-a;for(let C=0;C<c;C++){const S=C*f-r;v.push(S,-w,0),T.push(0,0,1),m.push(C/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let w=0;w<o;w++){const C=w+c*u,S=w+c*(u+1),b=w+1+c*(u+1),y=w+1+c*u;g.push(C,S,y),g.push(S,b,y)}this.setIndex(g),this.setAttribute("position",new Ft(v,3)),this.setAttribute("normal",new Ft(T,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.width,e.height,e.widthSegments,e.heightSegments)}}class Oi extends fn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new I,d=new I,g=[],v=[],T=[],m=[];for(let u=0;u<=n;u++){const w=[],C=u/n,S=a+C*o,b=e*Math.cos(S),y=Math.sqrt(e*e-b*b);let P=0;u===0&&a===0?P=.5/t:u===n&&l===Math.PI&&(P=-.5/t);for(let _=0;_<=t;_++){const A=_/t,L=s+A*r;f.x=-y*Math.cos(L),f.y=b,f.z=y*Math.sin(L),v.push(f.x,f.y,f.z),d.copy(f).normalize(),T.push(d.x,d.y,d.z),m.push(A+P,1-C),w.push(c++)}h.push(w)}for(let u=0;u<n;u++)for(let w=0;w<t;w++){const C=h[u][w+1],S=h[u][w],b=h[u+1][w],y=h[u+1][w+1];(u!==0||a>0)&&g.push(C,S,y),(u!==n-1||l<Math.PI)&&g.push(S,b,y)}this.setIndex(g),this.setAttribute("position",new Ft(v,3)),this.setAttribute("normal",new Ft(T,3)),this.setAttribute("uv",new Ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(ja(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ja(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function jt(i){const e={};for(let t=0;t<i.length;t++){const n=Bi(i[t]);for(const s in n)e[s]=n[s]}return e}function ja(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function jl(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function qo(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}const ec={clone:Bi,merge:jt};var tc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pn extends Gi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tc,this.fragmentShader=nc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bi(e.uniforms),this.uniformsGroups=jl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new et().setHex(s.value);break;case"v2":this.uniforms[n].value=new tt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Pt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new qe().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Lt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ic extends Pn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rs extends Gi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class sc extends Gi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rc extends Gi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ac extends Gi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ir extends qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class oc extends ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new et(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Wr=new Lt,eo=new I,to=new I;class Yo{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ua,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;eo.setFromMatrixPosition(e.matrixWorld),t.position.copy(eo),to.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(to),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Wr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Wr,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Wr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ws=new I,Xs=new ui,An=new I;class $o extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ws,Xs,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ws,Xs,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ws,Xs,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new I,no=new tt,io=new tt;class hn extends $o{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ta*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z)}getViewSize(e,t){return this.getViewBounds(e,no,io),t.subVectors(io,no)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Er*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lc extends Yo{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}}class na extends ir{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class ha extends $o{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cc extends Yo{constructor(){super(new ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dc extends ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.target=new qt,this.shadow=new cc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class uc extends ir{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ci=-90,Pi=1;class hc extends qt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(Ci,Pi,e,t);s.layers=this.layers,this.add(s);const r=new hn(Ci,Pi,e,t);r.layers=this.layers,this.add(r);const a=new hn(Ci,Pi,e,t);a.layers=this.layers,this.add(a);const o=new hn(Ci,Pi,e,t);o.layers=this.layers,this.add(o);const l=new hn(Ci,Pi,e,t);l.layers=this.layers,this.add(l);const c=new hn(Ci,Pi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const T=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=T,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class fc extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const so=new Lt;class Xr{constructor(e,t,n=0,s=1/0){this.ray=new Vo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new la,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ut("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return so.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(so),this}intersectObject(e,t=!0,n=[]){return ia(e,this,n,t),n.sort(ro),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ia(e[s],this,n,t);return n.sort(ro),n}}function ro(i,e){return i.distance-e.distance}function ia(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ia(r[a],e,t,!0)}}const _a=class _a{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};_a.prototype.isMatrix2=!0;let ao=_a;function oo(i,e,t,n){const s=pc(n);switch(t){case 1021:return i*e;case 1028:return i*e/s.components*s.byteLength;case 1029:return i*e/s.components*s.byteLength;case 1030:return i*e*2/s.components*s.byteLength;case 1031:return i*e*2/s.components*s.byteLength;case 1022:return i*e*3/s.components*s.byteLength;case 1023:return i*e*4/s.components*s.byteLength;case 1033:return i*e*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pc(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ko(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function mc(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<f.length;g++){const v=f[d],T=f[g];T.start<=v.start+v.count+1?v.count=Math.max(v.count,T.start+T.count-v.start):(++d,f[d]=T)}f.length=d+1;for(let g=0,v=f.length;g<v;g++){const T=f[g];i.bufferSubData(c,T.start*h.BYTES_PER_ELEMENT,h,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var gc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_c=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ec=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tc=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,bc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ac=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rc=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ic=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Nc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Oc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zc=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Gc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,kc=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Hc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qc="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yc=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$c=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Kc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ed=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,id=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ad=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,od=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ld=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,md=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,vd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Md=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ed=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Td=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ad=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ld=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Id=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ud=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Gd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$d=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,su=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ru=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,au=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ou=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,du=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,uu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_u=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vu=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Su=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Au=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ru=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Du=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Uu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ou=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ku=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hu=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vu=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qu=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yu=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$u=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ku=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:gc,alphahash_pars_fragment:_c,alphamap_fragment:xc,alphamap_pars_fragment:vc,alphatest_fragment:Sc,alphatest_pars_fragment:Mc,aomap_fragment:Ec,aomap_pars_fragment:yc,batching_pars_vertex:Tc,batching_vertex:bc,begin_vertex:Ac,beginnormal_vertex:wc,bsdfs:Rc,iridescence_fragment:Cc,bumpmap_pars_fragment:Pc,clipping_planes_fragment:Lc,clipping_planes_pars_fragment:Dc,clipping_planes_pars_vertex:Ic,clipping_planes_vertex:Fc,color_fragment:Uc,color_pars_fragment:Nc,color_pars_vertex:Oc,color_vertex:Bc,common:zc,cube_uv_reflection_fragment:Gc,defaultnormal_vertex:kc,displacementmap_pars_vertex:Hc,displacementmap_vertex:Vc,emissivemap_fragment:Wc,emissivemap_pars_fragment:Xc,colorspace_fragment:qc,colorspace_pars_fragment:Yc,envmap_fragment:$c,envmap_common_pars_fragment:Kc,envmap_pars_fragment:Zc,envmap_pars_vertex:Jc,envmap_physical_pars_fragment:ld,envmap_vertex:Qc,fog_vertex:jc,fog_pars_vertex:ed,fog_fragment:td,fog_pars_fragment:nd,gradientmap_pars_fragment:id,lightmap_pars_fragment:sd,lights_lambert_fragment:rd,lights_lambert_pars_fragment:ad,lights_pars_begin:od,lights_toon_fragment:cd,lights_toon_pars_fragment:dd,lights_phong_fragment:ud,lights_phong_pars_fragment:hd,lights_physical_fragment:fd,lights_physical_pars_fragment:pd,lights_fragment_begin:md,lights_fragment_maps:gd,lights_fragment_end:_d,lightprobes_pars_fragment:xd,logdepthbuf_fragment:vd,logdepthbuf_pars_fragment:Sd,logdepthbuf_pars_vertex:Md,logdepthbuf_vertex:Ed,map_fragment:yd,map_pars_fragment:Td,map_particle_fragment:bd,map_particle_pars_fragment:Ad,metalnessmap_fragment:wd,metalnessmap_pars_fragment:Rd,morphinstance_vertex:Cd,morphcolor_vertex:Pd,morphnormal_vertex:Ld,morphtarget_pars_vertex:Dd,morphtarget_vertex:Id,normal_fragment_begin:Fd,normal_fragment_maps:Ud,normal_pars_fragment:Nd,normal_pars_vertex:Od,normal_vertex:Bd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Gd,clearcoat_normal_fragment_maps:kd,clearcoat_pars_fragment:Hd,iridescence_pars_fragment:Vd,opaque_fragment:Wd,packing:Xd,premultiplied_alpha_fragment:qd,project_vertex:Yd,dithering_fragment:$d,dithering_pars_fragment:Kd,roughnessmap_fragment:Zd,roughnessmap_pars_fragment:Jd,shadowmap_pars_fragment:Qd,shadowmap_pars_vertex:jd,shadowmap_vertex:eu,shadowmask_pars_fragment:tu,skinbase_vertex:nu,skinning_pars_vertex:iu,skinning_vertex:su,skinnormal_vertex:ru,specularmap_fragment:au,specularmap_pars_fragment:ou,tonemapping_fragment:lu,tonemapping_pars_fragment:cu,transmission_fragment:du,transmission_pars_fragment:uu,uv_pars_fragment:hu,uv_pars_vertex:fu,uv_vertex:pu,worldpos_vertex:mu,background_vert:gu,background_frag:_u,backgroundCube_vert:xu,backgroundCube_frag:vu,cube_vert:Su,cube_frag:Mu,depth_vert:Eu,depth_frag:yu,distance_vert:Tu,distance_frag:bu,equirect_vert:Au,equirect_frag:wu,linedashed_vert:Ru,linedashed_frag:Cu,meshbasic_vert:Pu,meshbasic_frag:Lu,meshlambert_vert:Du,meshlambert_frag:Iu,meshmatcap_vert:Fu,meshmatcap_frag:Uu,meshnormal_vert:Nu,meshnormal_frag:Ou,meshphong_vert:Bu,meshphong_frag:zu,meshphysical_vert:Gu,meshphysical_frag:ku,meshtoon_vert:Hu,meshtoon_frag:Vu,points_vert:Wu,points_frag:Xu,shadow_vert:qu,shadow_frag:Yu,sprite_vert:$u,sprite_frag:Ku},Ee={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Rn={basic:{uniforms:jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:jt([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:jt([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:jt([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new et(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:jt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:jt([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:jt([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:jt([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:jt([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:jt([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:jt([Ee.common,Ee.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:jt([Ee.lights,Ee.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Rn.physical={uniforms:jt([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const qs={r:0,b:0,g:0},Zu=new Lt,Zo=new qe;Zo.set(-1,0,0,0,1,0,0,0,1);function Ju(i,e,t,n,s,r){const a=new et(0);let o=s===!0?0:1,l,c,h=null,f=0,d=null;function g(w){let C=w.isScene===!0?w.background:null;if(C&&C.isTexture){const S=w.backgroundBlurriness>0;C=e.get(C,S)}return C}function v(w){let C=!1;const S=g(w);S===null?m(a,o):S&&S.isColor&&(m(S,1),C=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function T(w,C){const S=g(C);S&&(S.isCubeTexture||S.mapping===306)?(c===void 0&&(c=new pt(new yt(1,1,1),new Pn({name:"BackgroundCubeMaterial",uniforms:Bi(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,y,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Zu.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Zo),c.material.toneMapped=rt.getTransfer(S.colorSpace)!==vt,(h!==S||f!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,d=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new pt(new Ni(2,2),new Pn({name:"BackgroundMaterial",uniforms:Bi(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=rt.getTransfer(S.colorSpace)!==vt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,f=S.version,d=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function m(w,C){w.getRGB(qs,qo(i)),t.buffers.color.setClear(qs.r,qs.g,qs.b,C,r)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,C=1){a.set(w),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,m(a,o)},render:v,addToRenderList:T,dispose:u}}function Qu(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(B,z,V,U,W){let j=!1;const ee=f(B,U,V,z);r!==ee&&(r=ee,c(r.object)),j=g(B,U,V,W),j&&v(B,U,V,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,S(B,z,V,U),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(B){return i.bindVertexArray(B)}function h(B){return i.deleteVertexArray(B)}function f(B,z,V,U){const W=U.wireframe===!0;let j=n[z.id];j===void 0&&(j={},n[z.id]=j);const ee=B.isInstancedMesh===!0?B.id:0;let oe=j[ee];oe===void 0&&(oe={},j[ee]=oe);let $=oe[V.id];$===void 0&&($={},oe[V.id]=$);let ne=$[W];return ne===void 0&&(ne=d(l()),$[W]=ne),ne}function d(B){const z=[],V=[],U=[];for(let W=0;W<t;W++)z[W]=0,V[W]=0,U[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:U,object:B,attributes:{},index:null}}function g(B,z,V,U){const W=r.attributes,j=z.attributes;let ee=0;const oe=V.getAttributes();for(const $ in oe)if(oe[$].location>=0){const re=W[$];let Le=j[$];if(Le===void 0&&($==="instanceMatrix"&&B.instanceMatrix&&(Le=B.instanceMatrix),$==="instanceColor"&&B.instanceColor&&(Le=B.instanceColor)),re===void 0||re.attribute!==Le||Le&&re.data!==Le.data)return!0;ee++}return r.attributesNum!==ee||r.index!==U}function v(B,z,V,U){const W={},j=z.attributes;let ee=0;const oe=V.getAttributes();for(const $ in oe)if(oe[$].location>=0){let re=j[$];re===void 0&&($==="instanceMatrix"&&B.instanceMatrix&&(re=B.instanceMatrix),$==="instanceColor"&&B.instanceColor&&(re=B.instanceColor));const Le={};Le.attribute=re,re&&re.data&&(Le.data=re.data),W[$]=Le,ee++}r.attributes=W,r.attributesNum=ee,r.index=U}function T(){const B=r.newAttributes;for(let z=0,V=B.length;z<V;z++)B[z]=0}function m(B){u(B,0)}function u(B,z){const V=r.newAttributes,U=r.enabledAttributes,W=r.attributeDivisors;V[B]=1,U[B]===0&&(i.enableVertexAttribArray(B),U[B]=1),W[B]!==z&&(i.vertexAttribDivisor(B,z),W[B]=z)}function w(){const B=r.newAttributes,z=r.enabledAttributes;for(let V=0,U=z.length;V<U;V++)z[V]!==B[V]&&(i.disableVertexAttribArray(V),z[V]=0)}function C(B,z,V,U,W,j,ee){ee===!0?i.vertexAttribIPointer(B,z,V,W,j):i.vertexAttribPointer(B,z,V,U,W,j)}function S(B,z,V,U){T();const W=U.attributes,j=V.getAttributes(),ee=z.defaultAttributeValues;for(const oe in j){const $=j[oe];if($.location>=0){let ne=W[oe];if(ne===void 0&&(oe==="instanceMatrix"&&B.instanceMatrix&&(ne=B.instanceMatrix),oe==="instanceColor"&&B.instanceColor&&(ne=B.instanceColor)),ne!==void 0){const re=ne.normalized,Le=ne.itemSize,Fe=e.get(ne);if(Fe===void 0)continue;const ht=Fe.buffer,Ne=Fe.type,lt=Fe.bytesPerElement,J=Ne===i.INT||Ne===i.UNSIGNED_INT||ne.gpuType===1013;if(ne.isInterleavedBufferAttribute){const ie=ne.data,Me=ie.stride,Oe=ne.offset;if(ie.isInstancedInterleavedBuffer){for(let Ae=0;Ae<$.locationSize;Ae++)u($.location+Ae,ie.meshPerAttribute);B.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ae=0;Ae<$.locationSize;Ae++)m($.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let Ae=0;Ae<$.locationSize;Ae++)C($.location+Ae,Le/$.locationSize,Ne,re,Me*lt,(Oe+Le/$.locationSize*Ae)*lt,J)}else{if(ne.isInstancedBufferAttribute){for(let ie=0;ie<$.locationSize;ie++)u($.location+ie,ne.meshPerAttribute);B.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let ie=0;ie<$.locationSize;ie++)m($.location+ie);i.bindBuffer(i.ARRAY_BUFFER,ht);for(let ie=0;ie<$.locationSize;ie++)C($.location+ie,Le/$.locationSize,Ne,re,Le*lt,Le/$.locationSize*ie*lt,J)}}else if(ee!==void 0){const re=ee[oe];if(re!==void 0)switch(re.length){case 2:i.vertexAttrib2fv($.location,re);break;case 3:i.vertexAttrib3fv($.location,re);break;case 4:i.vertexAttrib4fv($.location,re);break;default:i.vertexAttrib1fv($.location,re)}}}}w()}function b(){A();for(const B in n){const z=n[B];for(const V in z){const U=z[V];for(const W in U){const j=U[W];for(const ee in j)h(j[ee].object),delete j[ee];delete U[W]}}delete n[B]}}function y(B){if(n[B.id]===void 0)return;const z=n[B.id];for(const V in z){const U=z[V];for(const W in U){const j=U[W];for(const ee in j)h(j[ee].object),delete j[ee];delete U[W]}}delete n[B.id]}function P(B){for(const z in n){const V=n[z];for(const U in V){const W=V[U];if(W[B.id]===void 0)continue;const j=W[B.id];for(const ee in j)h(j[ee].object),delete j[ee];delete W[B.id]}}}function _(B){for(const z in n){const V=n[z],U=B.isInstancedMesh===!0?B.id:0,W=V[U];if(W!==void 0){for(const j in W){const ee=W[j];for(const oe in ee)h(ee[oe].object),delete ee[oe];delete W[j]}delete V[U],Object.keys(V).length===0&&delete n[z]}}}function A(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:b,releaseStatesOfGeometry:y,releaseStatesOfObject:_,releaseStatesOfProgram:P,initAttributes:T,enableAttribute:m,disableUnusedAttributes:w}}function ju(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let g=0;g<h;g++)d+=c[g];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function eh(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==1023&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const _=P===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==1009&&P!==1015&&!_&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:T,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:w,maxVaryings:C,maxFragmentUniforms:S,maxSamples:b,samples:y}}function th(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Jn,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const g=f.length!==0||d||n!==0||s;return s=d,n=f.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,g){const v=f.clippingPlanes,T=f.clipIntersection,m=f.clipShadows,u=i.get(f);if(!s||v===null||v.length===0||r&&!m)r?h(null):c();else{const w=r?0:n,C=w*4;let S=u.clippingState||null;l.value=S,S=h(v,d,C,g);for(let b=0;b!==C;++b)S[b]=t[b];u.clippingState=S,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,d,g,v){const T=f!==null?f.length:0;let m=null;if(T!==0){if(m=l.value,v!==!0||m===null){const u=g+T*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<u)&&(m=new Float32Array(u));for(let C=0,S=g;C!==T;++C,S+=4)a.copy(f[C]).applyMatrix4(w,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,m}}const Ii=4,nh=6,ih=20,sh=256,es=new ha,lo=new et;let qr=null,Yr=0,$r=0,Kr=!1;const rh=new I,oi=new I;class co{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=rh}=r;qr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),Kr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ho(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(qr,Yr,$r),this._renderer.xr.enabled=Kr,e.scissorTest=!1,Li(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qr=this._renderer.getRenderTarget(),Yr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),Kr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Zs,depthBuffer:!1},s=uo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uo(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ah(r)),this._blurMaterial=lh(r,e,t),this._ggxMaterial=oh(r,e,t)}return s}_compileMaterial(e){const t=new pt(new fn,e);this._renderer.compile(t,es)}_sceneToCubeUV(e,t,n,s,r){const l=new hn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,g=f.toneMapping;f.getClearColor(lo),f.toneMapping=0,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pt(new yt,new Qn({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,m=T.material;let u=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,u=!0):(m.color.copy(lo),u=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[C],r.y,r.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[C]));const b=this._cubeSize;Li(s,S*b,C>2?b:0,b,b),f.setRenderTarget(s),u&&f.render(T,l),f.render(e,l)}f.toneMapping=g,f.autoClear=d,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===301||e.mapping===302;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=fo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ho());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Li(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,es)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),d=c*1.25,g=f*d,{_lodMax:v}=this,T=this._sizeLods[n],m=3*T*(n>v-Ii?n-v+Ii:0),u=4*(this._cubeSize-T);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,Li(r,m,u,3*T,2*T),s.setRenderTarget(r),s.render(o,es),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,Li(e,m,u,3*T,2*T),s.setRenderTarget(e),s.render(o,es)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],f=3*h*(s>this._lodMax-Ii?s-this._lodMax+Ii:0),d=4*(this._cubeSize-h);Li(t,f,d,3*h,2*h),a.setRenderTarget(t),a.render(l,es)}}function ah(i){const e=[],t=[];let n=i;const s=i-Ii+1+nh;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,d=6,g=3,v=new Float32Array(g*d*f),T=new Float32Array(g*d*f);for(let u=0;u<f;u++){const w=u%3*2/3-1,C=u>2?0:-1,S=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];v.set(S,g*d*u);for(let b=0;b<d;b++){const y=h[b*2]*2-1,P=h[b*2+1]*2-1;u===0?oi.set(1,P,y):u===1?oi.set(-y,1,-P):u===2?oi.set(-y,P,1):u===3?oi.set(-1,P,-y):u===4?oi.set(-y,-1,P):oi.set(y,P,-1),oi.toArray(T,(u*d+b)*g)}}const m=new fn;m.setAttribute("position",new Gn(v,g)),m.setAttribute("outputDirection",new Gn(T,g)),t.push(new pt(m,null)),n>Ii&&n--}return{lodMeshes:t,sizeLods:e}}function uo(i,e,t){const n=new yn(i,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Li(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function oh(i,e,t){return new Pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sh,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function lh(i,e,t){return new Pn({name:"SphericalGaussianBlur",defines:{SAMPLES:ih,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ho(){return new Pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fo(){return new Pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function sr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Jo extends yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Wo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yt(5,5,5),r=new Pn({name:"CubemapFromEquirect",uniforms:Bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new pt(s,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new hc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function ch(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===303||g===304)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const T=new Jo(v.height);return T.fromEquirectangularTexture(i,d),e.set(d,T),d.addEventListener("dispose",c),o(T.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const g=d.mapping,v=g===303||g===304,T=g===301||g===302;if(v||T){let m=t.get(d);const u=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==u)return n===null&&(n=new co(i)),m=v?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const w=d.image;return v&&w&&w.height>0||T&&w&&l(w)?(n===null&&(n=new co(i)),m=v?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,g){return g===303?d.mapping=301:g===304&&(d.mapping=302),d}function l(d){let g=0;const v=6;for(let T=0;T<v;T++)d[T]!==void 0&&g++;return g===v}function c(d){const g=d.target;g.removeEventListener("dispose",c);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function h(d){const g=d.target;g.removeEventListener("dispose",h);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function dh(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Fi("WebGLRenderer: "+n+" extension not supported."),s}}}function uh(i,e,t,n){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];const g=r.get(d);g&&(e.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER)}function c(f){const d=[],g=f.index,v=f.attributes.position;let T=0;if(v===void 0)return;if(g!==null){const w=g.array;T=g.version;for(let C=0,S=w.length;C<S;C+=3){const b=w[C+0],y=w[C+1],P=w[C+2];d.push(b,y,y,P,P,b)}}else{const w=v.array;T=v.version;for(let C=0,S=w.length/3-1;C<S;C+=3){const b=C+0,y=C+1,P=C+2;d.push(b,y,y,P,P,b)}}const m=new(v.count>=65535?Ho:ko)(d,1);m.version=T;const u=r.get(f);u&&e.remove(u),r.set(f,m)}function h(f){const d=r.get(f);if(d){const g=f.index;g!==null&&d.version<g.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function hh(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),t.update(d,n,g))}function h(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let T=0;for(let m=0;m<g;m++)T+=d[m];t.update(T,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function fh(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:ut("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ph(i,e,t){const n=new WeakMap,s=new Pt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,T=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let C=0;g===!0&&(C=1),v===!0&&(C=2),T===!0&&(C=3);let S=o.attributes.position.count*C,b=1;S>e.maxTextureSize&&(b=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const y=new Float32Array(S*b*4*f),P=new zo(y,S,b,f);P.type=1015,P.needsUpdate=!0;const _=C*4;for(let L=0;L<f;L++){const B=m[L],z=u[L],V=w[L],U=S*b*4*L;for(let W=0;W<B.count;W++){const j=W*_;g===!0&&(s.fromBufferAttribute(B,W),y[U+j+0]=s.x,y[U+j+1]=s.y,y[U+j+2]=s.z,y[U+j+3]=0),v===!0&&(s.fromBufferAttribute(z,W),y[U+j+4]=s.x,y[U+j+5]=s.y,y[U+j+6]=s.z,y[U+j+7]=0),T===!0&&(s.fromBufferAttribute(V,W),y[U+j+8]=s.x,y[U+j+9]=s.y,y[U+j+10]=s.z,y[U+j+11]=V.itemSize===4?s.w:1)}}d={count:f,texture:P,size:new tt(S,b)},n.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let T=0;T<c.length;T++)g+=c[T];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function mh(i,e,t,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==h&&(g.update(),r.set(g,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const gh={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function _h(i,e,t,n,s,r){const a=new yn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new fn;c.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ft([0,2,0,0,2,0],2));const h=new ic({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new pt(c,h),d=new ha(-1,1,1,-1,0,1);let g=null,v=null,T=!1,m,u=null,w=[],C=!1;this.setSize=function(S,b){a.setSize(S,b),o!==null&&o.setSize(S,b),l!==null&&l.setSize(S,b);for(let y=0;y<w.length;y++){const P=w[y];P.setSize&&P.setSize(S,b)}},this.setEffects=function(S){w=S,C=w.length>0&&w[0].isRenderPass===!0;const b=a.width,y=a.height;w.length>0&&o===null&&(o=new yn(b,y,{type:1016,depthBuffer:!1,stencilBuffer:!1}),l=new yn(b,y,{type:1016,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<w.length;P++){const _=w[P];_.setSize&&_.setSize(b,y)}},this.begin=function(S,b){if(T||S.toneMapping===0&&w.length===0)return!1;if(u=b,b!==null){const y=b.width,P=b.height;(a.width!==y||a.height!==P)&&this.setSize(y,P)}return C===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=0,!0},this.hasRenderPass=function(){return C},this.end=function(S,b){S.toneMapping=m,T=!0;let y=a,P=o;for(let _=0;_<w.length;_++){const A=w[_];A.enabled!==!1&&(A.render(S,P,y,b),A.needsSwap!==!1&&(y=P,P=P===o?l:o))}if(g!==S.outputColorSpace||v!==S.toneMapping){g=S.outputColorSpace,v=S.toneMapping,h.defines={},rt.getTransfer(g)===vt&&(h.defines.SRGB_TRANSFER="");const _=gh[v];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(u),S.render(f,d),u=null,T=!1},this.isCompositing=function(){return T},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const Qo=new en,sa=new os(1,1),jo=new zo,el=new Fl,tl=new Wo,po=[],mo=[],go=new Float32Array(16),_o=new Float32Array(9),xo=new Float32Array(4);function ki(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=po[s];if(r===void 0&&(r=new Float32Array(s),po[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rr(i,e){let t=mo[e];t===void 0&&(t=new Int32Array(e),mo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function xh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Sh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function Mh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function Eh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Gt(t,n))return;xo.set(n),i.uniformMatrix2fv(this.addr,!1,xo),kt(t,n)}}function yh(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Gt(t,n))return;_o.set(n),i.uniformMatrix3fv(this.addr,!1,_o),kt(t,n)}}function Th(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Gt(t,n))return;go.set(n),i.uniformMatrix4fv(this.addr,!1,go),kt(t,n)}}function bh(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Ah(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function wh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function Rh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function Ch(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ph(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function Lh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function Dh(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function Ih(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(sa.compareFunction=t.isReversedDepthBuffer()?518:515,r=sa):r=Qo,t.setTexture2D(e||r,s)}function Fh(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||el,s)}function Uh(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||tl,s)}function Nh(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||jo,s)}function Oh(i){switch(i){case 5126:return xh;case 35664:return vh;case 35665:return Sh;case 35666:return Mh;case 35674:return Eh;case 35675:return yh;case 35676:return Th;case 5124:case 35670:return bh;case 35667:case 35671:return Ah;case 35668:case 35672:return wh;case 35669:case 35673:return Rh;case 5125:return Ch;case 36294:return Ph;case 36295:return Lh;case 36296:return Dh;case 35678:case 36198:case 36298:case 36306:case 35682:return Ih;case 35679:case 36299:case 36307:return Fh;case 35680:case 36300:case 36308:case 36293:return Uh;case 36289:case 36303:case 36311:case 36292:return Nh}}function Bh(i,e){i.uniform1fv(this.addr,e)}function zh(i,e){const t=ki(e,this.size,2);i.uniform2fv(this.addr,t)}function Gh(i,e){const t=ki(e,this.size,3);i.uniform3fv(this.addr,t)}function kh(i,e){const t=ki(e,this.size,4);i.uniform4fv(this.addr,t)}function Hh(i,e){const t=ki(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vh(i,e){const t=ki(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wh(i,e){const t=ki(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xh(i,e){i.uniform1iv(this.addr,e)}function qh(i,e){i.uniform2iv(this.addr,e)}function Yh(i,e){i.uniform3iv(this.addr,e)}function $h(i,e){i.uniform4iv(this.addr,e)}function Kh(i,e){i.uniform1uiv(this.addr,e)}function Zh(i,e){i.uniform2uiv(this.addr,e)}function Jh(i,e){i.uniform3uiv(this.addr,e)}function Qh(i,e){i.uniform4uiv(this.addr,e)}function jh(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=sa:a=Qo;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function ef(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||el,r[a])}function tf(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||tl,r[a])}function nf(i,e,t){const n=this.cache,s=e.length,r=rr(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||jo,r[a])}function sf(i){switch(i){case 5126:return Bh;case 35664:return zh;case 35665:return Gh;case 35666:return kh;case 35674:return Hh;case 35675:return Vh;case 35676:return Wh;case 5124:case 35670:return Xh;case 35667:case 35671:return qh;case 35668:case 35672:return Yh;case 35669:case 35673:return $h;case 5125:return Kh;case 36294:return Zh;case 36295:return Jh;case 36296:return Qh;case 35678:case 36198:case 36298:case 36306:case 35682:return jh;case 35679:case 36299:case 36307:return ef;case 35680:case 36300:case 36308:case 36293:return tf;case 36289:case 36303:case 36311:case 36292:return nf}}class rf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Oh(t.type)}}class af{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sf(t.type)}}class of{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Zr=/(\w+)(\])?(\[|\.)?/g;function vo(i,e){i.seq.push(e),i.map[e.id]=e}function lf(i,e,t){const n=i.name,s=n.length;for(Zr.lastIndex=0;;){const r=Zr.exec(n),a=Zr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vo(t,c===void 0?new rf(o,i,e):new af(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new of(o),vo(t,f)),t=f}}}class Ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);lf(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function So(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const cf=37297;let df=0;function uf(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Mo=new qe;function hf(i){rt._getMatrix(Mo,rt.workingColorSpace,i);const e=`mat3( ${Mo.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(i)){case Js:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Eo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+uf(i.getShaderSource(e),o)}else return r}function ff(i,e){const t=hf(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const pf={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function mf(i,e){const t=pf[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ys=new I;function gf(){rt.getLuminanceCoefficients(Ys);const i=Ys.x.toFixed(4),e=Ys.y.toFixed(4),t=Ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _f(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function xf(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vf(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function is(i){return i!==""}function yo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function To(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sf=/^[ \t]*#include +<([\w\d./]+)>/gm;function ra(i){return i.replace(Sf,Ef)}const Mf=new Map;function Ef(i,e){let t=Qe[e];if(t===void 0){const n=Mf.get(e);if(n!==void 0)t=Qe[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ra(t)}const yf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bo(i){return i.replace(yf,Tf)}function Tf(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ao(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const bf={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function Af(i){return bf[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wf={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function Rf(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":wf[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Cf={302:"ENVMAP_MODE_REFRACTION"};function Pf(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cf[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Lf={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function Df(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Lf[i.combine]||"ENVMAP_BLENDING_NONE"}function If(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Ff(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Af(t),c=Rf(t),h=Pf(t),f=Df(t),d=If(t),g=_f(t),v=xf(r),T=s.createProgram();let m,u,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(is).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(is).join(`
`),u.length>0&&(u+=`
`)):(m=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),u=[Ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Qe.tonemapping_pars_fragment:"",t.toneMapping!==0?mf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,ff("linearToOutputTexel",t.outputColorSpace),gf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(is).join(`
`)),a=ra(a),a=yo(a,t),a=To(a,t),o=ra(o),o=yo(o,t),o=To(o,t),a=bo(a),o=bo(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",t.glslVersion===Na?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Na?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const C=w+m+a,S=w+u+o,b=So(s,s.VERTEX_SHADER,C),y=So(s,s.FRAGMENT_SHADER,S);s.attachShader(T,b),s.attachShader(T,y),t.index0AttributeName!==void 0?s.bindAttribLocation(T,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(T,0,"position"),s.linkProgram(T);function P(B){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(T)||"",V=s.getShaderInfoLog(b)||"",U=s.getShaderInfoLog(y)||"",W=z.trim(),j=V.trim(),ee=U.trim();let oe=!0,$=!0;if(s.getProgramParameter(T,s.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,T,b,y);else{const ne=Eo(s,b,"vertex"),re=Eo(s,y,"fragment");ut("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(T,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+W+`
`+ne+`
`+re)}else W!==""?He("WebGLProgram: Program Info Log:",W):(j===""||ee==="")&&($=!1);$&&(B.diagnostics={runnable:oe,programLog:W,vertexShader:{log:j,prefix:m},fragmentShader:{log:ee,prefix:u}})}s.deleteShader(b),s.deleteShader(y),_=new Ks(s,T),A=vf(s,T)}let _;this.getUniforms=function(){return _===void 0&&P(this),_};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(T,cf)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=df++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=b,this.fragmentShader=y,this}let Uf=0;class Nf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Of(e),t.set(e,n)),n}}class Of{constructor(e){this.id=Uf++,this.code=e,this.usedTimes=0}}function Bf(i){return i===1030||i===37490||i===36285}function zf(i,e,t,n,s,r){const a=new la,o=new Nf,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer;let d=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return l.add(_),_===0?"uv":`uv${_}`}function T(_,A,L,B,z,V){const U=B.fog,W=z.geometry,j=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?B.environment:null,ee=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,oe=e.get(_.envMap||j,ee),$=oe&&oe.mapping===306?oe.image.height:null,ne=g[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&He("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const re=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Le=re!==void 0?re.length:0;let Fe=0;W.morphAttributes.position!==void 0&&(Fe=1),W.morphAttributes.normal!==void 0&&(Fe=2),W.morphAttributes.color!==void 0&&(Fe=3);let ht,Ne,lt,J;if(ne){const gt=Rn[ne];ht=gt.vertexShader,Ne=gt.fragmentShader}else{ht=_.vertexShader,Ne=_.fragmentShader;const gt=o.getVertexShaderStage(_),je=o.getFragmentShaderStage(_);o.update(_,gt,je),lt=gt.id,J=je.id}const ie=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Oe=z.isInstancedMesh===!0,Ae=z.isBatchedMesh===!0,Ye=!!_.map,Mt=!!_.matcap,Je=!!oe,$e=!!_.aoMap,We=!!_.lightMap,Re=!!_.bumpMap&&_.wireframe===!1,St=!!_.normalMap,Ut=!!_.displacementMap,Ht=!!_.emissiveMap,bt=!!_.metalnessMap,Ct=!!_.roughnessMap,N=_.anisotropy>0,Nt=_.clearcoat>0,ct=_.dispersion>0,R=_.retroreflectivity>0,p=_.iridescence>0,G=_.sheen>0,X=_.transmission>0,K=N&&!!_.anisotropyMap,de=Nt&&!!_.clearcoatMap,me=Nt&&!!_.clearcoatNormalMap,Z=Nt&&!!_.clearcoatRoughnessMap,te=p&&!!_.iridescenceMap,he=p&&!!_.iridescenceThicknessMap,Ce=G&&!!_.sheenColorMap,ve=G&&!!_.sheenRoughnessMap,fe=!!_.specularMap,xe=!!_.specularColorMap,Ue=!!_.specularIntensityMap,Ve=X&&!!_.transmissionMap,F=X&&!!_.thicknessMap,pe=!!_.gradientMap,Y=!!_.alphaMap,Q=_.alphaTest>0,ue=!!_.alphaHash,ae=!!_.extensions;let ye=0;_.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ye=i.toneMapping);const Pe={shaderID:ne,shaderType:_.type,shaderName:_.name,vertexShader:ht,fragmentShader:Ne,defines:_.defines,customVertexShaderID:lt,customFragmentShaderID:J,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&z._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&z.instanceColor!==null,instancingMorph:Oe&&z.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ye,matcap:Mt,envMap:Je,envMapMode:Je&&oe.mapping,envMapCubeUVHeight:$,aoMap:$e,lightMap:We,bumpMap:Re,normalMap:St,displacementMap:Ut,emissiveMap:Ht,normalMapObjectSpace:St&&_.normalMapType===1,normalMapTangentSpace:St&&_.normalMapType===0,packedNormalMap:St&&_.normalMapType===0&&Bf(_.normalMap.format),metalnessMap:bt,roughnessMap:Ct,anisotropy:N,anisotropyMap:K,clearcoat:Nt,clearcoatMap:de,clearcoatNormalMap:me,clearcoatRoughnessMap:Z,dispersion:ct,retroreflection:R,iridescence:p,iridescenceMap:te,iridescenceThicknessMap:he,sheen:G,sheenColorMap:Ce,sheenRoughnessMap:ve,specularMap:fe,specularColorMap:xe,specularIntensityMap:Ue,transmission:X,transmissionMap:Ve,thicknessMap:F,gradientMap:pe,opaque:_.transparent===!1&&_.blending===1&&_.alphaToCoverage===!1,alphaMap:Y,alphaTest:Q,alphaHash:ue,combine:_.combine,mapUv:Ye&&v(_.map.channel),aoMapUv:$e&&v(_.aoMap.channel),lightMapUv:We&&v(_.lightMap.channel),bumpMapUv:Re&&v(_.bumpMap.channel),normalMapUv:St&&v(_.normalMap.channel),displacementMapUv:Ut&&v(_.displacementMap.channel),emissiveMapUv:Ht&&v(_.emissiveMap.channel),metalnessMapUv:bt&&v(_.metalnessMap.channel),roughnessMapUv:Ct&&v(_.roughnessMap.channel),anisotropyMapUv:K&&v(_.anisotropyMap.channel),clearcoatMapUv:de&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:me&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:he&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:ve&&v(_.sheenRoughnessMap.channel),specularMapUv:fe&&v(_.specularMap.channel),specularColorMapUv:xe&&v(_.specularColorMap.channel),specularIntensityMapUv:Ue&&v(_.specularIntensityMap.channel),transmissionMapUv:Ve&&v(_.transmissionMap.channel),thicknessMapUv:F&&v(_.thicknessMap.channel),alphaMapUv:Y&&v(_.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(St||N),vertexNormals:!!W.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(Ye||Y),fog:!!U,useFog:_.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||W.attributes.normal===void 0&&St===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Me,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Fe,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:Ye&&_.map.isVideoTexture===!0&&rt.getTransfer(_.map.colorSpace)===vt,decodeVideoTextureEmissive:Ht&&_.emissiveMap.isVideoTexture===!0&&rt.getTransfer(_.emissiveMap.colorSpace)===vt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===2,flipSided:_.side===1,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ae&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Pe.vertexUv1s=l.has(1),Pe.vertexUv2s=l.has(2),Pe.vertexUv3s=l.has(3),l.clear(),Pe}function m(_){const A=[];if(_.shaderID?A.push(_.shaderID):(A.push(_.customVertexShaderID),A.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)A.push(L),A.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(u(A,_),w(A,_),A.push(i.outputColorSpace)),A.push(_.customProgramCacheKey),A.join()}function u(_,A){_.push(A.precision),_.push(A.outputColorSpace),_.push(A.envMapMode),_.push(A.envMapCubeUVHeight),_.push(A.mapUv),_.push(A.alphaMapUv),_.push(A.lightMapUv),_.push(A.aoMapUv),_.push(A.bumpMapUv),_.push(A.normalMapUv),_.push(A.displacementMapUv),_.push(A.emissiveMapUv),_.push(A.metalnessMapUv),_.push(A.roughnessMapUv),_.push(A.anisotropyMapUv),_.push(A.clearcoatMapUv),_.push(A.clearcoatNormalMapUv),_.push(A.clearcoatRoughnessMapUv),_.push(A.iridescenceMapUv),_.push(A.iridescenceThicknessMapUv),_.push(A.sheenColorMapUv),_.push(A.sheenRoughnessMapUv),_.push(A.specularMapUv),_.push(A.specularColorMapUv),_.push(A.specularIntensityMapUv),_.push(A.transmissionMapUv),_.push(A.thicknessMapUv),_.push(A.combine),_.push(A.fogExp2),_.push(A.sizeAttenuation),_.push(A.morphTargetsCount),_.push(A.morphAttributeCount),_.push(A.numSunLights),_.push(A.numDirLights),_.push(A.numPointLights),_.push(A.numSpotLights),_.push(A.numSpotLightMaps),_.push(A.numHemiLights),_.push(A.numRectAreaLights),_.push(A.numSunLightShadows),_.push(A.numDirLightShadows),_.push(A.numPointLightShadows),_.push(A.numSpotLightShadows),_.push(A.numSpotLightShadowsWithMaps),_.push(A.numLightProbes),_.push(A.shadowMapType),_.push(A.toneMapping),_.push(A.numClippingPlanes),_.push(A.numClipIntersection),_.push(A.depthPacking)}function w(_,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const A=g[_.type];let L;if(A){const B=Rn[A];L=ec.clone(B.uniforms)}else L=_.uniforms;return L}function S(_,A){let L=h.get(A);return L!==void 0?++L.usedTimes:(L=new Ff(i,A,_,s),c.push(L),h.set(A,L)),L}function b(_){if(--_.usedTimes===0){const A=c.indexOf(_);c[A]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function P(){o.dispose()}return{getParameters:T,getProgramCacheKey:m,getUniforms:C,acquireProgram:S,releaseProgram:b,releaseShaderCache:y,programs:c,dispose:P}}function Gf(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function kf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function wo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ro(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,v,T,m,u){let w=i[e];return w===void 0?(w={id:d.id,object:d,geometry:g,material:v,materialVariant:a(d),groupOrder:T,renderOrder:d.renderOrder,z:m,group:u},i[e]=w):(w.id=d.id,w.object=d,w.geometry=g,w.material=v,w.materialVariant=a(d),w.groupOrder=T,w.renderOrder=d.renderOrder,w.z=m,w.group=u),e++,w}function l(d,g,v,T,m,u,w){w.reversedDepth===!0&&(m=-m);const C=o(d,g,v,T,m,u);v.transmission>0?n.push(C):v.transparent===!0?s.push(C):t.push(C)}function c(d,g,v,T,m,u){const w=o(d,g,v,T,m,u);v.transmission>0?n.unshift(w):v.transparent===!0?s.unshift(w):t.unshift(w)}function h(d,g){t.length>1&&t.sort(d||kf),n.length>1&&n.sort(g||wo),s.length>1&&s.sort(g||wo)}function f(){for(let d=e,g=i.length;d<g;d++){const v=i[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function Hf(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ro,i.set(n,[a])):s>=r.length?(a=new Ro,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new et};break;case"SpotLight":t={position:new I,direction:new I,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Wf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Xf=0;function qf(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Yf(i){const e=new Vf,t=Wf(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new Lt,a=new Lt;function o(c){let h=0,f=0,d=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let g=0,v=0,T=0,m=0,u=0,w=0,C=0,S=0,b=0,y=0,P=0,_=0,A=0,L=0;c.sort(qf);for(let z=0,V=c.length;z<V;z++){const U=c[z],W=U.color,j=U.intensity,ee=U.distance;let oe=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===1030?oe=U.shadow.map.texture:oe=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=W.r*j,f+=W.g*j,d+=W.b*j;else if(U.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(U.sh.coefficients[$],j);L++}else if(U.isSunLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ne=U.shadow,re=t.get(U);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),n.sunShadow[v]=re,n.sunShadowMap[v]=oe;const Le=ne.getViewportCount();for(let Fe=0;Fe<Le;Fe++)n.sunShadowMatrix[T+Fe]=ne.getMatrix(Fe),n.sunShadowCascade[T+Fe]=ne._cascadeData[Fe];T+=Le,v++}n.sun[g]=$,g++}else if(U.isDirectionalLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ne=U.shadow,re=t.get(U);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.directionalShadow[m]=re,n.directionalShadowMap[m]=oe,n.directionalShadowMatrix[m]=U.shadow.matrix,b++}n.directional[m]=$,m++}else if(U.isSpotLight){const $=e.get(U);$.position.setFromMatrixPosition(U.matrixWorld),$.color.copy(W).multiplyScalar(j),$.distance=ee,$.coneCos=Math.cos(U.angle),$.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),$.decay=U.decay,n.spot[w]=$;const ne=U.shadow;if(U.map&&(n.spotLightMap[_]=U.map,_++,ne.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[w]=ne.matrix,U.castShadow){const re=t.get(U);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,n.spotShadow[w]=re,n.spotShadowMap[w]=oe,P++}w++}else if(U.isRectAreaLight){const $=e.get(U);$.color.copy(W).multiplyScalar(j),$.halfWidth.set(U.width*.5,0,0),$.halfHeight.set(0,U.height*.5,0),n.rectArea[C]=$,C++}else if(U.isPointLight){const $=e.get(U);if($.color.copy(U.color).multiplyScalar(U.intensity),$.distance=U.distance,$.decay=U.decay,U.castShadow){const ne=U.shadow,re=t.get(U);re.shadowIntensity=ne.intensity,re.shadowBias=ne.bias,re.shadowNormalBias=ne.normalBias,re.shadowRadius=ne.radius,re.shadowMapSize=ne.mapSize,re.shadowCameraNear=ne.camera.near,re.shadowCameraFar=ne.camera.far,n.pointShadow[u]=re,n.pointShadowMap[u]=oe,n.pointShadowMatrix[u]=U.shadow.matrix,y++}n.point[u]=$,u++}else if(U.isHemisphereLight){const $=e.get(U);$.skyColor.copy(U.color).multiplyScalar(j),$.groundColor.copy(U.groundColor).multiplyScalar(j),n.hemi[S]=$,S++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const B=n.hash;(B.sunLength!==g||B.directionalLength!==m||B.pointLength!==u||B.spotLength!==w||B.rectAreaLength!==C||B.hemiLength!==S||B.numSunShadows!==v||B.numDirectionalShadows!==b||B.numPointShadows!==y||B.numSpotShadows!==P||B.numSpotMaps!==_||B.numLightProbes!==L)&&(n.sun.length=g,n.directional.length=m,n.spot.length=w,n.rectArea.length=C,n.point.length=u,n.hemi.length=S,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=T,n.sunShadowCascade.length=T,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=y,n.pointShadowMap.length=y,n.pointShadowMatrix.length=y,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+_-A,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,B.sunLength=g,B.directionalLength=m,B.pointLength=u,B.spotLength=w,B.rectAreaLength=C,B.hemiLength=S,B.numSunShadows=v,B.numDirectionalShadows=b,B.numPointShadows=y,B.numSpotShadows=P,B.numSpotMaps=_,B.numLightProbes=L,n.version=Xf++)}function l(c,h){let f=0,d=0,g=0,v=0,T=0,m=0;const u=h.matrixWorldInverse;for(let w=0,C=c.length;w<C;w++){const S=c[w];if(S.isSunLight){const b=n.sun[f];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(u),f++}else if(S.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),d++}else if(S.isSpotLight){const b=n.spot[v];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),b.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),v++}else if(S.isRectAreaLight){const b=n.rectArea[T];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),a.identity(),r.copy(S.matrixWorld),r.premultiply(u),a.extractRotation(r),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),T++}else if(S.isPointLight){const b=n.point[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(u),g++}else if(S.isHemisphereLight){const b=n.hemi[m];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(u),m++}}}return{setup:o,setupView:l,state:n}}function Co(i){const e=new Yf(i),t=[],n=[],s=[];function r(d){f.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function $f(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Co(i),e.set(s,[o])):r>=a.length?(o=new Co(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Kf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Jf=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Qf=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Po=new Lt,ts=new I,Jr=new I;function jf(i,e,t){let n=new ua;const s=new tt,r=new tt,a=new Pt,o=new rc,l=new ac,c={},h=t.maxTextureSize,f={0:1,1:0,2:2},d=new Pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:Kf,fragmentShader:Zf}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const v=new fn;v.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new pt(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let u=this.type;this.render=function(y,P,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===2&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=1);const A=i.getRenderTarget(),L=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),z=i.state;z.setBlending(0),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=u!==this.type;V&&P.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(W=>W.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,W=y.length;U<W;U++){const j=y[U],ee=j.shadow;if(ee===void 0){He("WebGLShadowMap:",j,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;s.copy(ee.mapSize);const oe=ee.getFrameExtents();s.multiply(oe),r.copy(ee.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,ee.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,ee.mapSize.y=r.y));const $=i.state.buffers.depth.getReversed();if(ee.camera._reversedDepth=$,ee.map===null||V===!0){if(ee.map!==null&&(ee.map.depthTexture!==null&&(ee.map.depthTexture.dispose(),ee.map.depthTexture=null),ee.map.dispose()),this.type===3){if(j.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ee.map=new yn(s.x,s.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),ee.map.texture.name=j.name+".shadowMap",ee.map.depthTexture=new os(s.x,s.y,1015),ee.map.depthTexture.name=j.name+".shadowMapDepth",ee.map.depthTexture.format=1026,ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=1003,ee.map.depthTexture.magFilter=1003}else j.isPointLight?(ee.map=new Jo(s.x),ee.map.depthTexture=new Ql(s.x,1014)):(ee.map=new yn(s.x,s.y),ee.map.depthTexture=new os(s.x,s.y,1014)),ee.map.depthTexture.name=j.name+".shadowMap",ee.map.depthTexture.format=1026,this.type===1?(ee.map.depthTexture.compareFunction=$?518:515,ee.map.depthTexture.minFilter=1006,ee.map.depthTexture.magFilter=1006):(ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=1003,ee.map.depthTexture.magFilter=1003);ee.camera.updateProjectionMatrix()}ee.map.isWebGLCubeRenderTarget!==!0&&(ee.map.width!==s.x||ee.map.height!==s.y)&&ee.map.setSize(s.x,s.y);const ne=ee.map.isWebGLCubeRenderTarget?6:ee.getViewportCount();j.isPointLight!==!0&&ee.updateMatrices(j,_);for(let re=0;re<ne;re++){const Le=ee.getCamera(re);if(j.isPointLight){const Fe=ee.camera,ht=ee.matrix,Ne=j.distance||Fe.far;Ne!==Fe.far&&(Fe.far=Ne,Fe.updateProjectionMatrix()),ts.setFromMatrixPosition(j.matrixWorld),Fe.position.copy(ts),Jr.copy(Fe.position),Jr.add(Jf[re]),Fe.up.copy(Qf[re]),Fe.lookAt(Jr),Fe.updateMatrixWorld(),ht.makeTranslation(-ts.x,-ts.y,-ts.z),Po.multiplyMatrices(Fe.projectionMatrix,Fe.matrixWorldInverse),ee._frustum.setFromProjectionMatrix(Po,Fe.coordinateSystem,Fe.reversedDepth)}if(ee.map.isWebGLCubeRenderTarget)i.setRenderTarget(ee.map,re),i.clear();else{re===0&&(i.setRenderTarget(ee.map),i.clear());const Fe=ee.getViewport(re);a.set(r.x*Fe.x,r.y*Fe.y,r.x*Fe.z,r.y*Fe.w),z.viewport(a)}n=ee.getFrustum(re),S(P,_,Le,j,this.type)}ee.isPointLightShadow!==!0&&this.type===3&&w(ee,_),ee.needsUpdate=!1}u=this.type,m.needsUpdate=!1,i.setRenderTarget(A,L,B)};function w(y,P){const _=e.update(T);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,g.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),y.mapPass===null?y.mapPass=new yn(s.x,s.y,{format:1030,type:1016}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),d.uniforms.shadow_pass.value=y.map.depthTexture,d.uniforms.resolution.value.set(y.map.width,y.map.height),d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(P,null,_,d,T,null),g.uniforms.shadow_pass.value=y.mapPass.texture,g.uniforms.resolution.value.set(y.map.width,y.map.height),g.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(P,null,_,g,T,null)}function C(y,P,_,A){let L=null;const B=_.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(B!==void 0)L=B;else if(L=_.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const z=L.uuid,V=P.uuid;let U=c[z];U===void 0&&(U={},c[z]=U);let W=U[V];W===void 0&&(W=L.clone(),U[V]=W,P.addEventListener("dispose",b)),L=W}if(L.visible=P.visible,L.wireframe=P.wireframe,A===3?L.side=P.shadowSide!==null?P.shadowSide:P.side:L.side=P.shadowSide!==null?P.shadowSide:f[P.side],L.alphaMap=P.alphaMap,L.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,L.map=P.map,L.clipShadows=P.clipShadows,L.clippingPlanes=P.clippingPlanes,L.clipIntersection=P.clipIntersection,L.displacementMap=P.displacementMap,L.displacementScale=P.displacementScale,L.displacementBias=P.displacementBias,L.wireframeLinewidth=P.wireframeLinewidth,L.linewidth=P.linewidth,_.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const z=i.properties.get(L);z.light=_}return L}function S(y,P,_,A,L){if(y.visible===!1)return;if(y.layers.test(P.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&L===3)&&(!y.frustumCulled||y.intersectsFrustum(n))){y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,y.matrixWorld);const V=e.update(y),U=y.material;if(Array.isArray(U)){const W=V.groups;for(let j=0,ee=W.length;j<ee;j++){const oe=W[j],$=U[oe.materialIndex];if($&&$.visible){const ne=C(y,$,A,L);y.onBeforeShadow(i,y,P,_,V,ne,oe),i.renderBufferDirect(_,null,V,ne,y,oe),y.onAfterShadow(i,y,P,_,V,ne,oe)}}}else if(U.visible){const W=C(y,U,A,L);y.onBeforeShadow(i,y,P,_,V,W,null),i.renderBufferDirect(_,null,V,W,y,null),y.onAfterShadow(i,y,P,_,V,W,null)}}const z=y.children;for(let V=0,U=z.length;V<U;V++)S(z[V],P,_,A,L)}function b(y){y.target.removeEventListener("dispose",b);for(const _ in c){const A=c[_],L=y.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function ep(i,e){function t(){let F=!1;const pe=new Pt;let Y=null;const Q=new Pt(0,0,0,0);return{setMask:function(ue){Y!==ue&&!F&&(i.colorMask(ue,ue,ue,ue),Y=ue)},setLocked:function(ue){F=ue},setClear:function(ue,ae,ye,Pe,gt){gt===!0&&(ue*=Pe,ae*=Pe,ye*=Pe),pe.set(ue,ae,ye,Pe),Q.equals(pe)===!1&&(i.clearColor(ue,ae,ye,Pe),Q.copy(pe))},reset:function(){F=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let F=!1,pe=!1,Y=null,Q=null,ue=null;return{setReversed:function(ae){if(pe!==ae){const ye=e.get("EXT_clip_control");ae?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),pe=ae;const Pe=ue;ue=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(ae){ae?ie(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(ae){Y!==ae&&!F&&(i.depthMask(ae),Y=ae)},setFunc:function(ae){if(pe&&(ae=wl[ae]),Q!==ae){switch(ae){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ae}},setLocked:function(ae){F=ae},setClear:function(ae){ue!==ae&&(ue=ae,pe&&(ae=1-ae),i.clearDepth(ae))},reset:function(){F=!1,Y=null,Q=null,ue=null,pe=!1}}}function s(){let F=!1,pe=null,Y=null,Q=null,ue=null,ae=null,ye=null,Pe=null,gt=null;return{setTest:function(je){F||(je?ie(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(je){pe!==je&&!F&&(i.stencilMask(je),pe=je)},setFunc:function(je,Yt,tn){(Y!==je||Q!==Yt||ue!==tn)&&(i.stencilFunc(je,Yt,tn),Y=je,Q=Yt,ue=tn)},setOp:function(je,Yt,tn){(ae!==je||ye!==Yt||Pe!==tn)&&(i.stencilOp(je,Yt,tn),ae=je,ye=Yt,Pe=tn)},setLocked:function(je){F=je},setClear:function(je){gt!==je&&(i.clearStencil(je),gt=je)},reset:function(){F=!1,pe=null,Y=null,Q=null,ue=null,ae=null,ye=null,Pe=null,gt=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},f={},d={},g=new WeakMap,v=[],T=null,m=!1,u=null,w=null,C=null,S=null,b=null,y=null,P=null,_=new et(0,0,0),A=0,L=!1,B=null,z=null,V=null,U=null,W=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,oe=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec($)[1]),ee=oe>=1):$.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),ee=oe>=2);let ne=null,re={};const Le=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),ht=new Pt().fromArray(Le),Ne=new Pt().fromArray(Fe);function lt(F,pe,Y,Q){const ue=new Uint8Array(4),ae=i.createTexture();i.bindTexture(F,ae),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ye=0;ye<Y;ye++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(pe+ye,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return ae}const J={};J[i.TEXTURE_2D]=lt(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(i.DEPTH_TEST),a.setFunc(3),Re(!1),St(1),ie(i.CULL_FACE),$e(0);function ie(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function Me(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function Oe(F,pe){return d[F]!==pe?(i.bindFramebuffer(F,pe),d[F]=pe,F===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=pe),F===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ae(F,pe){let Y=v,Q=!1;if(F){Y=g.get(pe),Y===void 0&&(Y=[],g.set(pe,Y));const ue=F.textures;if(Y.length!==ue.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,ye=ue.length;ae<ye;ae++)Y[ae]=i.COLOR_ATTACHMENT0+ae;Y.length=ue.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function Ye(F){return T!==F?(i.useProgram(F),T=F,!0):!1}const Mt={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};Mt[103]=i.MIN,Mt[104]=i.MAX;const Je={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function $e(F,pe,Y,Q,ue,ae,ye,Pe,gt,je){if(F===0){m===!0&&(Me(i.BLEND),m=!1);return}if(m===!1&&(ie(i.BLEND),m=!0),F!==5){if(F!==u||je!==L){if((w!==100||b!==100)&&(i.blendEquation(i.FUNC_ADD),w=100,b=100),je)switch(F){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ut("WebGLState: Invalid blending: ",F);break}else switch(F){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case 3:ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ut("WebGLState: Invalid blending: ",F);break}C=null,S=null,y=null,P=null,_.set(0,0,0),A=0,u=F,L=je}return}ue=ue||pe,ae=ae||Y,ye=ye||Q,(pe!==w||ue!==b)&&(i.blendEquationSeparate(Mt[pe],Mt[ue]),w=pe,b=ue),(Y!==C||Q!==S||ae!==y||ye!==P)&&(i.blendFuncSeparate(Je[Y],Je[Q],Je[ae],Je[ye]),C=Y,S=Q,y=ae,P=ye),(Pe.equals(_)===!1||gt!==A)&&(i.blendColor(Pe.r,Pe.g,Pe.b,gt),_.copy(Pe),A=gt),u=F,L=!1}function We(F,pe){F.side===2?Me(i.CULL_FACE):ie(i.CULL_FACE);let Y=F.side===1;pe&&(Y=!Y),Re(Y),F.blending===1&&F.transparent===!1?$e(0):$e(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const Q=F.stencilWrite;o.setTest(Q),Q&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ht(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Re(F){B!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),B=F)}function St(F){F!==0?(ie(i.CULL_FACE),F!==z&&(F===1?i.cullFace(i.BACK):F===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),z=F}function Ut(F){F!==V&&(ee&&i.lineWidth(F),V=F)}function Ht(F,pe,Y){F?(ie(i.POLYGON_OFFSET_FILL),(U!==pe||W!==Y)&&(U=pe,W=Y,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,Y))):Me(i.POLYGON_OFFSET_FILL)}function bt(F){F?ie(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function Ct(F){F===void 0&&(F=i.TEXTURE0+j-1),ne!==F&&(i.activeTexture(F),ne=F)}function N(F,pe,Y){Y===void 0&&(ne===null?Y=i.TEXTURE0+j-1:Y=ne);let Q=re[Y];Q===void 0&&(Q={type:void 0,texture:void 0},re[Y]=Q),(Q.type!==F||Q.texture!==pe)&&(ne!==Y&&(i.activeTexture(Y),ne=Y),i.bindTexture(F,pe||J[F]),Q.type=F,Q.texture=pe)}function Nt(){const F=re[ne];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ct(){try{i.compressedTexImage2D(...arguments)}catch(F){ut("WebGLState:",F)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(F){ut("WebGLState:",F)}}function p(){try{i.texSubImage2D(...arguments)}catch(F){ut("WebGLState:",F)}}function G(){try{i.texSubImage3D(...arguments)}catch(F){ut("WebGLState:",F)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(F){ut("WebGLState:",F)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(F){ut("WebGLState:",F)}}function de(){try{i.texStorage2D(...arguments)}catch(F){ut("WebGLState:",F)}}function me(){try{i.texStorage3D(...arguments)}catch(F){ut("WebGLState:",F)}}function Z(){try{i.texImage2D(...arguments)}catch(F){ut("WebGLState:",F)}}function te(){try{i.texImage3D(...arguments)}catch(F){ut("WebGLState:",F)}}function he(F){return f[F]!==void 0?f[F]:i.getParameter(F)}function Ce(F,pe){f[F]!==pe&&(i.pixelStorei(F,pe),f[F]=pe)}function ve(F){ht.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),ht.copy(F))}function fe(F){Ne.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Ne.copy(F))}function xe(F,pe){let Y=c.get(pe);Y===void 0&&(Y=new WeakMap,c.set(pe,Y));let Q=Y.get(F);Q===void 0&&(Q=i.getUniformBlockIndex(pe,F.name),Y.set(F,Q))}function Ue(F,pe){const Q=c.get(pe).get(F);l.get(pe)!==Q&&(i.uniformBlockBinding(pe,Q,F.__bindingPointIndex),l.set(pe,Q))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},ne=null,re={},d={},g=new WeakMap,v=[],T=null,m=!1,u=null,w=null,C=null,S=null,b=null,y=null,P=null,_=new et(0,0,0),A=0,L=!1,B=null,z=null,V=null,U=null,W=null,ht.set(0,0,i.canvas.width,i.canvas.height),Ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:Me,bindFramebuffer:Oe,drawBuffers:Ae,useProgram:Ye,setBlending:$e,setMaterial:We,setFlipSided:Re,setCullFace:St,setLineWidth:Ut,setPolygonOffset:Ht,setScissorTest:bt,activeTexture:Ct,bindTexture:N,unbindTexture:Nt,compressedTexImage2D:ct,compressedTexImage3D:R,texImage2D:Z,texImage3D:te,pixelStorei:Ce,getParameter:he,updateUBOMapping:xe,uniformBlockBinding:Ue,texStorage2D:de,texStorage3D:me,texSubImage2D:p,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:K,scissor:ve,viewport:fe,reset:Ve}}function tp(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,h=new WeakMap,f=new Set;let d;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(R,p){return v?new OffscreenCanvas(R,p):Qs("canvas")}function m(R,p,G){let X=1;const K=ct(R);if((K.width>G||K.height>G)&&(X=G/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const de=Math.floor(X*K.width),me=Math.floor(X*K.height);d===void 0&&(d=T(de,me));const Z=p?T(de,me):d;return Z.width=de,Z.height=me,Z.getContext("2d").drawImage(R,0,0,de,me),He("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+de+"x"+me+")."),Z}else return"data"in R&&He("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),R;return R}function u(R){return R.generateMipmaps}function w(R){i.generateMipmap(R)}function C(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,p,G,X,K,de=!1){if(R!==null){if(i[R]!==void 0)return i[R];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let me;X&&(me=e.get("EXT_texture_norm16"),me||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=p;if(p===i.RED&&(G===i.FLOAT&&(Z=i.R32F),G===i.HALF_FLOAT&&(Z=i.R16F),G===i.UNSIGNED_BYTE&&(Z=i.R8),G===i.UNSIGNED_SHORT&&me&&(Z=me.R16_EXT),G===i.SHORT&&me&&(Z=me.R16_SNORM_EXT)),p===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.R8UI),G===i.UNSIGNED_SHORT&&(Z=i.R16UI),G===i.UNSIGNED_INT&&(Z=i.R32UI),G===i.BYTE&&(Z=i.R8I),G===i.SHORT&&(Z=i.R16I),G===i.INT&&(Z=i.R32I)),p===i.RG&&(G===i.FLOAT&&(Z=i.RG32F),G===i.HALF_FLOAT&&(Z=i.RG16F),G===i.UNSIGNED_BYTE&&(Z=i.RG8),G===i.UNSIGNED_SHORT&&me&&(Z=me.RG16_EXT),G===i.SHORT&&me&&(Z=me.RG16_SNORM_EXT)),p===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RG8UI),G===i.UNSIGNED_SHORT&&(Z=i.RG16UI),G===i.UNSIGNED_INT&&(Z=i.RG32UI),G===i.BYTE&&(Z=i.RG8I),G===i.SHORT&&(Z=i.RG16I),G===i.INT&&(Z=i.RG32I)),p===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),G===i.UNSIGNED_INT&&(Z=i.RGB32UI),G===i.BYTE&&(Z=i.RGB8I),G===i.SHORT&&(Z=i.RGB16I),G===i.INT&&(Z=i.RGB32I)),p===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),G===i.UNSIGNED_INT&&(Z=i.RGBA32UI),G===i.BYTE&&(Z=i.RGBA8I),G===i.SHORT&&(Z=i.RGBA16I),G===i.INT&&(Z=i.RGBA32I)),p===i.RGB&&(G===i.UNSIGNED_SHORT&&me&&(Z=me.RGB16_EXT),G===i.SHORT&&me&&(Z=me.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),p===i.RGBA){const te=de?Js:rt.getTransfer(K);G===i.FLOAT&&(Z=i.RGBA32F),G===i.HALF_FLOAT&&(Z=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Z=te===vt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&me&&(Z=me.RGBA16_EXT),G===i.SHORT&&me&&(Z=me.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function b(R,p){let G;return R?p===null||p===1014||p===1020?G=i.DEPTH24_STENCIL8:p===1015?G=i.DEPTH32F_STENCIL8:p===1012&&(G=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===1014||p===1020?G=i.DEPTH_COMPONENT24:p===1015?G=i.DEPTH_COMPONENT32F:p===1012&&(G=i.DEPTH_COMPONENT16),G}function y(R,p){return u(R)===!0||R.isFramebufferTexture&&R.minFilter!==1003&&R.minFilter!==1006?Math.log2(Math.max(p.width,p.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?p.mipmaps.length:1}function P(R){const p=R.target;p.removeEventListener("dispose",P),A(p),p.isVideoTexture&&h.delete(p),p.isHTMLTexture&&f.delete(p)}function _(R){const p=R.target;p.removeEventListener("dispose",_),B(p)}function A(R){const p=n.get(R);if(p.__webglInit===void 0)return;const G=R.source,X=g.get(G);if(X){const K=X[p.__cacheKey];K.usedTimes--,K.usedTimes===0&&L(R),Object.keys(X).length===0&&g.delete(G)}n.remove(R)}function L(R){const p=n.get(R);i.deleteTexture(p.__webglTexture);const G=R.source,X=g.get(G);delete X[p.__cacheKey],a.memory.textures--}function B(R){const p=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(p.__webglFramebuffer[X]))for(let K=0;K<p.__webglFramebuffer[X].length;K++)i.deleteFramebuffer(p.__webglFramebuffer[X][K]);else i.deleteFramebuffer(p.__webglFramebuffer[X]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[X])}else{if(Array.isArray(p.__webglFramebuffer))for(let X=0;X<p.__webglFramebuffer.length;X++)i.deleteFramebuffer(p.__webglFramebuffer[X]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let X=0;X<p.__webglColorRenderbuffer.length;X++)p.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[X]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const G=R.textures;for(let X=0,K=G.length;X<K;X++){const de=n.get(G[X]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(R)}let z=0;function V(){z=0}function U(){return z}function W(R){z=R}function j(){const R=z;return R>=s.maxTextures&&He("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,R}function ee(R){const p=[];return p.push(R.wrapS),p.push(R.wrapT),p.push(R.wrapR||0),p.push(R.magFilter),p.push(R.minFilter),p.push(R.anisotropy),p.push(R.internalFormat),p.push(R.format),p.push(R.type),p.push(R.generateMipmaps),p.push(R.premultiplyAlpha),p.push(R.flipY),p.push(R.unpackAlignment),p.push(R.colorSpace),p.join()}function oe(R,p){const G=n.get(R);if(R.isVideoTexture&&N(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&G.__version!==R.version){const X=R.image;if(X===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(G,R,p);return}}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+p)}function $(R,p){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Me(G,R,p);return}else R.isExternalTexture&&(G.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+p)}function ne(R,p){const G=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){Me(G,R,p);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+p)}function re(R,p){const G=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&G.__version!==R.version){Oe(G,R,p);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+p)}const Le={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},Fe={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},ht={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function Ne(R,p){if(p.type===1015&&e.has("OES_texture_float_linear")===!1&&(p.magFilter===1006||p.magFilter===1007||p.magFilter===1005||p.magFilter===1008||p.minFilter===1006||p.minFilter===1007||p.minFilter===1005||p.minFilter===1008)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,Le[p.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,Le[p.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,Le[p.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Fe[p.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Fe[p.minFilter]),p.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ht[p.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===1003||p.minFilter!==1005&&p.minFilter!==1008||p.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function lt(R,p){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,p.addEventListener("dispose",P));const X=p.source;let K=g.get(X);K===void 0&&(K={},g.set(X,K));const de=ee(p);if(de!==R.__cacheKey){K[de]===void 0&&(K[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),K[de].usedTimes++;const me=K[R.__cacheKey];me!==void 0&&(K[R.__cacheKey].usedTimes--,me.usedTimes===0&&L(p)),R.__cacheKey=de,R.__webglTexture=K[de].texture}return G}function J(R,p,G){return Math.floor(Math.floor(R/G)/p)}function ie(R,p,G,X){const de=R.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,G,X,p.data);else{de.sort((Ce,ve)=>Ce.start-ve.start);let me=0;for(let Ce=1;Ce<de.length;Ce++){const ve=de[me],fe=de[Ce],xe=ve.start+ve.count,Ue=J(fe.start,p.width,4),Ve=J(ve.start,p.width,4);fe.start<=xe+1&&Ue===Ve&&J(fe.start+fe.count-1,p.width,4)===Ue?ve.count=Math.max(ve.count,fe.start+fe.count-ve.start):(++me,de[me]=fe)}de.length=me+1;const Z=t.getParameter(i.UNPACK_ROW_LENGTH),te=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let Ce=0,ve=de.length;Ce<ve;Ce++){const fe=de[Ce],xe=Math.floor(fe.start/4),Ue=Math.ceil(fe.count/4),Ve=xe%p.width,F=Math.floor(xe/p.width),pe=Ue,Y=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ve),t.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Ve,F,pe,Y,G,X,p.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,te),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function Me(R,p,G){let X=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(X=i.TEXTURE_3D);const K=lt(R,p),de=p.source;t.bindTexture(X,R.__webglTexture,i.TEXTURE0+G);const me=n.get(de);if(de.version!==me.__version||K===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){const Y=rt.getPrimaries(rt.workingColorSpace),Q=p.colorSpace===""?null:rt.getPrimaries(p.colorSpace),ue=p.colorSpace===""||Y===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue)}t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment);let te=m(p.image,!1,s.maxTextureSize);te=Nt(p,te);const he=r.convert(p.format,p.colorSpace),Ce=r.convert(p.type);let ve=S(p.internalFormat,he,Ce,p.normalized,p.colorSpace,p.isVideoTexture);Ne(X,p);let fe;const xe=p.mipmaps,Ue=p.isVideoTexture!==!0,Ve=me.__version===void 0||K===!0,F=de.dataReady,pe=y(p,te);if(p.isDepthTexture)ve=b(p.format===1027,p.type),Ve&&(Ue?t.texStorage2D(i.TEXTURE_2D,1,ve,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,ve,te.width,te.height,0,he,Ce,null));else if(p.isDataTexture)if(xe.length>0){Ue&&Ve&&t.texStorage2D(i.TEXTURE_2D,pe,ve,xe[0].width,xe[0].height);for(let Y=0,Q=xe.length;Y<Q;Y++)fe=xe[Y],Ue?F&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,fe.width,fe.height,he,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,Y,ve,fe.width,fe.height,0,he,Ce,fe.data);p.generateMipmaps=!1}else Ue?(Ve&&t.texStorage2D(i.TEXTURE_2D,pe,ve,te.width,te.height),F&&ie(p,te,he,Ce)):t.texImage2D(i.TEXTURE_2D,0,ve,te.width,te.height,0,he,Ce,te.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Ue&&Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ve,xe[0].width,xe[0].height,te.depth);for(let Y=0,Q=xe.length;Y<Q;Y++)if(fe=xe[Y],p.format!==1023)if(he!==null)if(Ue){if(F)if(p.layerUpdates.size>0){const ue=oo(fe.width,fe.height,p.format,p.type);for(const ae of p.layerUpdates){const ye=fe.data.subarray(ae*ue/fe.data.BYTES_PER_ELEMENT,(ae+1)*ue/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,ae,fe.width,fe.height,1,he,ye)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,fe.width,fe.height,te.depth,he,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,ve,fe.width,fe.height,te.depth,0,fe.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,fe.width,fe.height,te.depth,he,Ce,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Y,ve,fe.width,fe.height,te.depth,0,he,Ce,fe.data);p.layerUpdates.size>0&&p.clearLayerUpdates()}else{Ue&&Ve&&t.texStorage2D(i.TEXTURE_2D,pe,ve,xe[0].width,xe[0].height);for(let Y=0,Q=xe.length;Y<Q;Y++)fe=xe[Y],p.format!==1023?he!==null?Ue?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,Y,ve,fe.width,fe.height,0,fe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?F&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,fe.width,fe.height,he,Ce,fe.data):t.texImage2D(i.TEXTURE_2D,Y,ve,fe.width,fe.height,0,he,Ce,fe.data)}else if(p.isDataArrayTexture)if(Ue){if(Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ve,te.width,te.height,te.depth),F)if(p.layerUpdates.size>0){const Y=oo(te.width,te.height,p.format,p.type);for(const Q of p.layerUpdates){const ue=te.data.subarray(Q*Y/te.data.BYTES_PER_ELEMENT,(Q+1)*Y/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,he,Ce,ue)}p.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Ce,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,te.width,te.height,te.depth,0,he,Ce,te.data);else if(p.isData3DTexture)Ue?(Ve&&t.texStorage3D(i.TEXTURE_3D,pe,ve,te.width,te.height,te.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Ce,te.data)):t.texImage3D(i.TEXTURE_3D,0,ve,te.width,te.height,te.depth,0,he,Ce,te.data);else if(p.isFramebufferTexture){if(Ve)if(Ue)t.texStorage2D(i.TEXTURE_2D,pe,ve,te.width,te.height);else{let Y=te.width,Q=te.height;for(let ue=0;ue<pe;ue++)t.texImage2D(i.TEXTURE_2D,ue,ve,Y,Q,0,he,Ce,null),Y>>=1,Q>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in i){const Y=i.canvas;if(Y.hasAttribute("layoutsubtree")||Y.setAttribute("layoutsubtree","true"),te.parentNode!==Y){Y.appendChild(te),f.add(p),Y.onpaint=Q=>{const ue=Q.changedElements;for(const ae of f)ue.includes(ae.image)&&(ae.needsUpdate=!0)},Y.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,te);else{const ue=i.RGBA,ae=i.RGBA,ye=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ue,ae,ye,te)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(xe.length>0){if(Ue&&Ve){const Y=ct(xe[0]);t.texStorage2D(i.TEXTURE_2D,pe,ve,Y.width,Y.height)}for(let Y=0,Q=xe.length;Y<Q;Y++)fe=xe[Y],Ue?F&&t.texSubImage2D(i.TEXTURE_2D,Y,0,0,he,Ce,fe):t.texImage2D(i.TEXTURE_2D,Y,ve,he,Ce,fe);p.generateMipmaps=!1}else if(Ue){if(Ve){const Y=ct(te);t.texStorage2D(i.TEXTURE_2D,pe,ve,Y.width,Y.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Ce,te)}else t.texImage2D(i.TEXTURE_2D,0,ve,he,Ce,te);u(p)&&w(X),me.__version=de.version,p.onUpdate&&p.onUpdate(p)}R.__version=p.version}function Oe(R,p,G){if(p.image.length!==6)return;const X=lt(R,p),K=p.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+G);const de=n.get(K);if(K.version!==de.__version||X===!0){t.activeTexture(i.TEXTURE0+G);const me=rt.getPrimaries(rt.workingColorSpace),Z=p.colorSpace===""?null:rt.getPrimaries(p.colorSpace),te=p.colorSpace===""||me===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const he=p.isCompressedTexture||p.image[0].isCompressedTexture,Ce=p.image[0]&&p.image[0].isDataTexture,ve=[];for(let ae=0;ae<6;ae++)!he&&!Ce?ve[ae]=m(p.image[ae],!0,s.maxCubemapSize):ve[ae]=Ce?p.image[ae].image:p.image[ae],ve[ae]=Nt(p,ve[ae]);const fe=ve[0],xe=r.convert(p.format,p.colorSpace),Ue=r.convert(p.type),Ve=S(p.internalFormat,xe,Ue,p.normalized,p.colorSpace),F=p.isVideoTexture!==!0,pe=de.__version===void 0||X===!0,Y=K.dataReady;let Q=y(p,fe);Ne(i.TEXTURE_CUBE_MAP,p);let ue;if(he){F&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Q,Ve,fe.width,fe.height);for(let ae=0;ae<6;ae++){ue=ve[ae].mipmaps;for(let ye=0;ye<ue.length;ye++){const Pe=ue[ye];p.format!==1023?xe!==null?F?Y&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye,0,0,Pe.width,Pe.height,xe,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye,Ve,Pe.width,Pe.height,0,Pe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye,0,0,Pe.width,Pe.height,xe,Ue,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye,Ve,Pe.width,Pe.height,0,xe,Ue,Pe.data)}}}else{if(ue=p.mipmaps,F&&pe){ue.length>0&&Q++;const ae=ct(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Q,Ve,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Ce){F?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ve[ae].width,ve[ae].height,xe,Ue,ve[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ve,ve[ae].width,ve[ae].height,0,xe,Ue,ve[ae].data);for(let ye=0;ye<ue.length;ye++){const gt=ue[ye].image[ae].image;F?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye+1,0,0,gt.width,gt.height,xe,Ue,gt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye+1,Ve,gt.width,gt.height,0,xe,Ue,gt.data)}}else{F?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,xe,Ue,ve[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ve,xe,Ue,ve[ae]);for(let ye=0;ye<ue.length;ye++){const Pe=ue[ye];F?Y&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye+1,0,0,xe,Ue,Pe.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ye+1,Ve,xe,Ue,Pe.image[ae])}}}u(p)&&w(i.TEXTURE_CUBE_MAP),de.__version=K.version,p.onUpdate&&p.onUpdate(p)}R.__version=p.version}function Ae(R,p,G,X,K,de){const me=r.convert(G.format,G.colorSpace),Z=r.convert(G.type),te=S(G.internalFormat,me,Z,G.normalized,G.colorSpace),he=n.get(p),Ce=n.get(G);if(Ce.__renderTarget=p,!he.__hasExternalTextures){const ve=Math.max(1,p.width>>de),fe=Math.max(1,p.height>>de);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,de,te,ve,fe,p.depth,0,me,Z,null):t.texImage2D(K,de,te,ve,fe,0,me,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ct(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,Ce.__webglTexture,0,bt(p)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,Ce.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(R,p,G){if(i.bindRenderbuffer(i.RENDERBUFFER,R),p.depthBuffer){const X=p.depthTexture,K=X&&X.isDepthTexture?X.type:null,de=b(p.stencilBuffer,K),me=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ct(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt(p),de,p.width,p.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt(p),de,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,de,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,me,i.RENDERBUFFER,R)}else{const X=p.textures;for(let K=0;K<X.length;K++){const de=X[K],me=r.convert(de.format,de.colorSpace),Z=r.convert(de.type),te=S(de.internalFormat,me,Z,de.normalized,de.colorSpace);Ct(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt(p),te,p.width,p.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt(p),te,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,te,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Mt(R,p,G){const X=p.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(p.depthTexture);if(K.__renderTarget=p,(!K.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),X){if(K.__webglInit===void 0&&(K.__webglInit=!0,p.depthTexture.addEventListener("dispose",P)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,p.depthTexture);const he=r.convert(p.depthTexture.format),Ce=r.convert(p.depthTexture.type);let ve;p.depthTexture.format===1026?ve=i.DEPTH_COMPONENT24:p.depthTexture.format===1027&&(ve=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ve,p.width,p.height,0,he,Ce,null)}}else oe(p.depthTexture,0);const de=K.__webglTexture,me=bt(p),Z=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,te=p.depthTexture.format===1027?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(p.depthTexture.format===1026)Ct(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,Z,de,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,te,Z,de,0);else if(p.depthTexture.format===1027)Ct(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,Z,de,0,me):i.framebufferTexture2D(i.FRAMEBUFFER,te,Z,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Je(R){const p=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==R.depthTexture){const X=R.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),X){const K=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),p.__depthDisposeCallback=K}p.__boundDepthTexture=X}if(R.depthTexture&&!p.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)Mt(p.__webglFramebuffer[X],R,X);else{const X=R.texture.mipmaps;X&&X.length>0?Mt(p.__webglFramebuffer[0],R,0):Mt(p.__webglFramebuffer,R,0)}else if(G){p.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[X]),p.__webglDepthbuffer[X]===void 0)p.__webglDepthbuffer[X]=i.createRenderbuffer(),Ye(p.__webglDepthbuffer[X],R,!1);else{const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=p.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,de)}}else{const X=R.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),Ye(p.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,de)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function $e(R,p,G){const X=n.get(R);p!==void 0&&Ae(X.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Je(R)}function We(R){const p=R.texture,G=n.get(R),X=n.get(p);R.addEventListener("dispose",_);const K=R.textures,de=R.isWebGLCubeRenderTarget===!0,me=K.length>1;if(me||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=p.version,a.memory.textures++),de){G.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(p.mipmaps&&p.mipmaps.length>0){G.__webglFramebuffer[Z]=[];for(let te=0;te<p.mipmaps.length;te++)G.__webglFramebuffer[Z][te]=i.createFramebuffer()}else G.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){G.__webglFramebuffer=[];for(let Z=0;Z<p.mipmaps.length;Z++)G.__webglFramebuffer[Z]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(me)for(let Z=0,te=K.length;Z<te;Z++){const he=n.get(K[Z]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Ct(R)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){const te=K[Z];G.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[Z]);const he=r.convert(te.format,te.colorSpace),Ce=r.convert(te.type),ve=S(te.internalFormat,he,Ce,te.normalized,te.colorSpace,R.isXRRenderTarget===!0),fe=bt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,ve,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,G.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Ye(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,p);for(let Z=0;Z<6;Z++)if(p.mipmaps&&p.mipmaps.length>0)for(let te=0;te<p.mipmaps.length;te++)Ae(G.__webglFramebuffer[Z][te],R,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,te);else Ae(G.__webglFramebuffer[Z],R,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);u(p)&&w(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let Z=0,te=K.length;Z<te;Z++){const he=K[Z],Ce=n.get(he);let ve=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ve=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ve,Ce.__webglTexture),Ne(ve,he),Ae(G.__webglFramebuffer,R,he,i.COLOR_ATTACHMENT0+Z,ve,0),u(he)&&w(ve)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Z=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,X.__webglTexture),Ne(Z,p),p.mipmaps&&p.mipmaps.length>0)for(let te=0;te<p.mipmaps.length;te++)Ae(G.__webglFramebuffer[te],R,p,i.COLOR_ATTACHMENT0,Z,te);else Ae(G.__webglFramebuffer,R,p,i.COLOR_ATTACHMENT0,Z,0);u(p)&&w(Z),t.unbindTexture()}R.depthBuffer&&Je(R)}function Re(R){const p=R.textures;for(let G=0,X=p.length;G<X;G++){const K=p[G];if(u(K)){const de=C(R),me=n.get(K).__webglTexture;t.bindTexture(de,me),w(de),t.unbindTexture()}}}const St=[],Ut=[];function Ht(R){if(R.samples>0){if(Ct(R)===!1){const p=R.textures,G=R.width,X=R.height;let K=i.COLOR_BUFFER_BIT;const de=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(R),Z=p.length>1;if(Z)for(let he=0;he<p.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer);const te=R.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let he=0;he<p.length;he++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[he]);const Ce=n.get(p[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ce,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,K,i.NEAREST),l===!0&&(St.length=0,Ut.length=0,St.push(i.COLOR_ATTACHMENT0+he),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(St.push(de),Ut.push(de),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ut)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let he=0;he<p.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,me.__webglColorRenderbuffer[he]);const Ce=n.get(p[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,Ce,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){const p=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function bt(R){return Math.min(s.maxSamples,R.samples)}function Ct(R){const p=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function N(R){const p=a.render.frame;h.get(R)!==p&&(h.set(R,p),R.update())}function Nt(R,p){const G=R.colorSpace,X=R.format,K=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==Zs&&G!==""&&(rt.getTransfer(G)===vt?(X!==1023||K!==1009)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ut("WebGLTextures: Unsupported texture color space:",G)),p}function ct(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=V,this.getTextureUnits=U,this.setTextureUnits=W,this.setTexture2D=oe,this.setTexture2DArray=$,this.setTexture3D=ne,this.setTextureCube=re,this.rebindTextures=$e,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Re,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Je,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function np(i,e){function t(n,s=""){let r;const a=rt.getTransfer(s);if(n===1009)return i.UNSIGNED_BYTE;if(n===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return i.BYTE;if(n===1011)return i.SHORT;if(n===1012)return i.UNSIGNED_SHORT;if(n===1013)return i.INT;if(n===1014)return i.UNSIGNED_INT;if(n===1015)return i.FLOAT;if(n===1016)return i.HALF_FLOAT;if(n===1021)return i.ALPHA;if(n===1022)return i.RGB;if(n===1023)return i.RGBA;if(n===1026)return i.DEPTH_COMPONENT;if(n===1027)return i.DEPTH_STENCIL;if(n===1028)return i.RED;if(n===1029)return i.RED_INTEGER;if(n===1030)return i.RG;if(n===1031)return i.RG_INTEGER;if(n===1033)return i.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return r.COMPRESSED_R11_EAC;if(n===37489)return r.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return r.COMPRESSED_RG11_EAC;if(n===37491)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36283)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const ip=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Xo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Pn({vertexShader:ip,fragmentShader:sp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ap extends di{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,g=null,v=null;const T=typeof XRWebGLBinding<"u",m=new rp,u={},w=t.getContextAttributes();let C=null,S=null;const b=[],y=[],P=new tt;let _=null,A=null;const L=new hn;L.viewport=new Pt;const B=new hn;B.viewport=new Pt;const z=[L,B],V=new fc;let U=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ie=b[J];return ie===void 0&&(ie=new Cr,b[J]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(J){let ie=b[J];return ie===void 0&&(ie=new Cr,b[J]=ie),ie.getGripSpace()},this.getHand=function(J){let ie=b[J];return ie===void 0&&(ie=new Cr,b[J]=ie),ie.getHandSpace()};function j(J){const ie=y.indexOf(J.inputSource);if(ie===-1)return;const Me=b[ie];Me!==void 0&&(Me.update(J.inputSource,J.frame,c||a),Me.dispatchEvent({type:J.type,data:J.inputSource}))}function ee(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",oe);for(let J=0;J<b.length;J++){const ie=y[J];ie!==null&&(y[J]=null,b[J].disconnect(ie))}U=null,W=null,m.reset();for(const J in u)delete u[J];if(e.setRenderTarget(C),g=null,d=null,f=null,s=null,S=null,lt.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(P.width,P.height,!1),A!==null){const J=A.camera;J.fov=A.fov,J.zoom=A.zoom,J.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&T&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",oe),w.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(P),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Oe=null,Ae=null;w.depth&&(Ae=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=w.stencil?1027:1026,Oe=w.stencil?1020:1014);const Ye={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Ye),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new yn(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new os(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Me={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new yn(g.framebufferWidth,g.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),lt.setContext(s),lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function oe(J){for(let ie=0;ie<J.removed.length;ie++){const Me=J.removed[ie],Oe=y.indexOf(Me);Oe>=0&&(y[Oe]=null,b[Oe].disconnect(Me))}for(let ie=0;ie<J.added.length;ie++){const Me=J.added[ie];let Oe=y.indexOf(Me);if(Oe===-1){for(let Ye=0;Ye<b.length;Ye++)if(Ye>=y.length){y.push(Me),Oe=Ye;break}else if(y[Ye]===null){y[Ye]=Me,Oe=Ye;break}if(Oe===-1)break}const Ae=b[Oe];Ae&&Ae.connect(Me)}}const $=new I,ne=new I;function re(J,ie,Me){$.setFromMatrixPosition(ie.matrixWorld),ne.setFromMatrixPosition(Me.matrixWorld);const Oe=$.distanceTo(ne),Ae=ie.projectionMatrix.elements,Ye=Me.projectionMatrix.elements,Mt=Ae[14]/(Ae[10]-1),Je=Ae[14]/(Ae[10]+1),$e=(Ae[9]+1)/Ae[5],We=(Ae[9]-1)/Ae[5],Re=(Ae[8]-1)/Ae[0],St=(Ye[8]+1)/Ye[0],Ut=Mt*Re,Ht=Mt*St,bt=Oe/(-Re+St),Ct=bt*-Re;if(ie.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ct),J.translateZ(bt),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ae[10]===-1)J.projectionMatrix.copy(ie.projectionMatrix),J.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const N=Mt+bt,Nt=Je+bt,ct=Ut-Ct,R=Ht+(Oe-Ct),p=$e*Je/Nt*N,G=We*Je/Nt*N;J.projectionMatrix.makePerspective(ct,R,p,G,N,Nt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Le(J,ie){ie===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ie.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ie=J.near,Me=J.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),V.near=B.near=L.near=ie,V.far=B.far=L.far=Me,(U!==V.near||W!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),U=V.near,W=V.far),V.layers.mask=J.layers.mask|6,L.layers.mask=V.layers.mask&-5,B.layers.mask=V.layers.mask&-3;const Oe=J.parent,Ae=V.cameras;Le(V,Oe);for(let Ye=0;Ye<Ae.length;Ye++)Le(Ae[Ye],Oe);Ae.length===2?re(V,L,B):V.projectionMatrix.copy(L.projectionMatrix),A===null&&J.isPerspectiveCamera&&(A={camera:J,fov:J.fov,zoom:J.zoom}),Fe(J,V,Oe)};function Fe(J,ie,Me){Me===null?J.matrix.copy(ie.matrixWorld):(J.matrix.copy(Me.matrixWorld),J.matrix.invert(),J.matrix.multiply(ie.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ie.projectionMatrix),J.projectionMatrixInverse.copy(ie.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=ta*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(J){return u[J]};let ht=null;function Ne(J,ie){if(h=ie.getViewerPose(c||a),v=ie,h!==null){const Me=h.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let Oe=!1;Me.length!==V.cameras.length&&(V.cameras.length=0,Oe=!0);for(let Je=0;Je<Me.length;Je++){const $e=Me[Je];let We=null;if(g!==null)We=g.getViewport($e);else{const St=f.getViewSubImage(d,$e);We=St.viewport,Je===0&&(e.setRenderTargetTextures(S,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(S))}let Re=z[Je];Re===void 0&&(Re=new hn,Re.layers.enable(Je),Re.viewport=new Pt,z[Je]=Re),Re.matrix.fromArray($e.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray($e.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set(We.x,We.y,We.width,We.height),Je===0&&(V.matrix.copy(Re.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Oe===!0&&V.cameras.push(Re)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&T){f=n.getBinding();const Je=f.getDepthInformation(Me[0]);Je&&Je.isValid&&Je.texture&&m.init(Je,s.renderState)}if(Ae&&Ae.includes("camera-access")&&T){e.state.unbindTexture(),f=n.getBinding();for(let Je=0;Je<Me.length;Je++){const $e=Me[Je].camera;if($e){let We=u[$e];We||(We=new Xo,u[$e]=We);const Re=f.getCameraImage($e);We.sourceTexture=Re}}}}for(let Me=0;Me<b.length;Me++){const Oe=y[Me],Ae=b[Me];Oe!==null&&Ae!==void 0&&Ae.update(Oe,ie,c||a)}ht&&ht(J,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),v=null}const lt=new Ko;lt.setAnimationLoop(Ne),this.setAnimationLoop=function(J){ht=J},this.dispose=function(){}}}const op=new Lt,nl=new qe;nl.set(-1,0,0,0,1,0,0,0,1);function lp(i,e){function t(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function n(m,u){u.color.getRGB(m.fogColor.value,qo(i)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function s(m,u,w,C,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?r(m,u):u.isMeshLambertMaterial?(r(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(r(m,u),f(m,u)):u.isMeshPhongMaterial?(r(m,u),h(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(r(m,u),d(m,u),u.isMeshPhysicalMaterial&&g(m,u,S)):u.isMeshMatcapMaterial?(r(m,u),v(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),T(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,w,C):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,t(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===1&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,t(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===1&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,t(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,t(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const w=e.get(u),C=w.envMap,S=w.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(op.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nl),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,w,C){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*w,m.scale.value=C*.5,u.map&&(m.map.value=u.map,t(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,t(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,t(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function h(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function f(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function g(m,u,w){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===1&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.retroreflectivity>0&&(m.retroreflectivity.value=u.retroreflectivity),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function T(m,u){const w=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cp(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const y=b.program;n.uniformBlockBinding(S,y)}function c(S,b){let y=s[S.id];y===void 0&&(m(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",w));const P=b.program;n.updateUBOMapping(S,P);const _=e.render.frame;r[S.id]!==_&&(d(S),r[S.id]=_)}function h(S){const b=f();S.__bindingPointIndex=b;const y=i.createBuffer(),P=S.__size,_=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,P,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,y),y}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const b=s[S.id],y=S.uniforms,P=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,A=y.length;_<A;_++){const L=y[_];if(Array.isArray(L))for(let B=0,z=L.length;B<z;B++)g(L[B],_,B,P);else g(L,_,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(S,b,y,P){if(T(S,b,y,P)===!0){const _=S.__offset,A=S.value;if(Array.isArray(A)){let L=0;for(let B=0;B<A.length;B++){const z=A[B],V=u(z);v(z,S.__data,L),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(L+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(A,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,S.__data)}}function v(S,b,y){typeof S=="number"||typeof S=="boolean"?b[0]=S:S.isMatrix3?(b[0]=S.elements[0],b[1]=S.elements[1],b[2]=S.elements[2],b[3]=0,b[4]=S.elements[3],b[5]=S.elements[4],b[6]=S.elements[5],b[7]=0,b[8]=S.elements[6],b[9]=S.elements[7],b[10]=S.elements[8],b[11]=0):ArrayBuffer.isView(S)?b.set(new S.constructor(S.buffer,S.byteOffset,b.length)):S.toArray(b,y)}function T(S,b,y,P){const _=S.value,A=b+"_"+y;if(P[A]===void 0)return typeof _=="number"||typeof _=="boolean"?P[A]=_:ArrayBuffer.isView(_)?P[A]=_.slice():P[A]=_.clone(),!0;{const L=P[A];if(typeof _=="number"||typeof _=="boolean"){if(L!==_)return P[A]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(L.equals(_)===!1)return L.copy(_),!0}}return!1}function m(S){const b=S.uniforms;let y=0;const P=16;for(let A=0,L=b.length;A<L;A++){const B=Array.isArray(b[A])?b[A]:[b[A]];for(let z=0,V=B.length;z<V;z++){const U=B[z],W=Array.isArray(U.value)?U.value:[U.value];for(let j=0,ee=W.length;j<ee;j++){const oe=W[j],$=u(oe),ne=y%P,re=ne%$.boundary,Le=ne+re;y+=re,Le!==0&&P-Le<$.storage&&(y+=P-Le),U.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=$.storage}}}const _=y%P;return _>0&&(y+=P-_),S.__size=y,S.__cache={},this}function u(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):He("WebGLRenderer: Unsupported uniform value type.",S),b}function w(S){const b=S.target;b.removeEventListener("dispose",w);const y=a.indexOf(b.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function C(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}const dp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function up(){return wn===null&&(wn=new Zl(dp,16,16,1030,1016),wn.name="DFG_LUT",wn.minFilter=1006,wn.magFilter=1006,wn.wrapS=1001,wn.wrapT=1001,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class hp{constructor(e={}){const{canvas:t=bl(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=1009}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;const T=g,m=new Set([1033,1031,1029]),u=new Set([1009,1014,1012,1020,1017,1018]),w=new Uint32Array(4),C=new Int32Array(4),S=new I;let b=null,y=null;const P=[],_=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let B=!1,z=null,V=null,U=null,W=null;this._outputColorSpace=gn;let j=0,ee=0,oe=null,$=-1,ne=null;const re=new Pt,Le=new Pt;let Fe=null;const ht=new et(0);let Ne=0,lt=t.width,J=t.height,ie=1,Me=null,Oe=null;const Ae=new Pt(0,0,lt,J),Ye=new Pt(0,0,lt,J);let Mt=!1;const Je=new ua;let $e=!1,We=!1;const Re=new Lt,St=new I,Ut=new Pt,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function Ct(){return oe===null?ie:1}let N=n;function Nt(x,D){return t.getContext(x,D)}let ct,R,p,G,X,K,de,me,Z,te,he,Ce,ve,fe,xe,Ue,Ve,F,pe,Y,Q,ue,ae;try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r186"),t.addEventListener("webglcontextlost",gt,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",Yt,!1),N===null){const D="webgl2";if(N=Nt(D,x),N===null)throw Nt(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ye()}catch(x){throw t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",Yt,!1),ut("WebGLRenderer: "+x.message),x}function ye(){ct=new dh(N),ct.init(),Q=new np(N,ct),R=new eh(N,ct,e,Q),p=new ep(N,ct),R.reversedDepthBuffer&&d&&p.buffers.depth.setReversed(!0),V=N.createFramebuffer(),U=N.createFramebuffer(),W=N.createFramebuffer(),G=new fh(N),X=new Gf,K=new tp(N,ct,p,X,R,Q,G),de=new ch(L),me=new mc(N),ue=new Qu(N,me),Z=new uh(N,me,G,ue),te=new mh(N,Z,me,ue,G),F=new ph(N,R,K),xe=new th(X),he=new zf(L,de,ct,R,ue,xe),Ce=new lp(L,X),ve=new Hf,fe=new $f(ct),Ve=new Ju(L,de,p,te,v,l),Ue=new jf(L,te,R),ae=new cp(N,G,R,p),pe=new ju(N,ct,G),Y=new hh(N,ct,G),G.programs=he.programs,L.capabilities=R,L.extensions=ct,L.properties=X,L.renderLists=ve,L.shadowMap=Ue,L.state=p,L.info=G}T!==1009&&(A=new _h(T,t.width,t.height,o,s,r));const Pe=new ap(L,N);this.xr=Pe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const x=ct.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ct.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(x){x!==void 0&&(ie=x,this.setSize(lt,J,!1))},this.getSize=function(x){return x.set(lt,J)},this.setSize=function(x,D,q=!0){if(Pe.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}lt=x,J=D,t.width=Math.floor(x*ie),t.height=Math.floor(D*ie),q===!0&&(t.style.width=x+"px",t.style.height=D+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(lt*ie,J*ie).floor()},this.setDrawingBufferSize=function(x,D,q){lt=x,J=D,ie=q,t.width=Math.floor(x*q),t.height=Math.floor(D*q),this.setViewport(0,0,x,D)},this.setEffects=function(x){if(T===1009){ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let D=0;D<x.length;D++)if(x[D].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(re)},this.getViewport=function(x){return x.copy(Ae)},this.setViewport=function(x,D,q,k){x.isVector4?Ae.set(x.x,x.y,x.z,x.w):Ae.set(x,D,q,k),p.viewport(re.copy(Ae).multiplyScalar(ie).round())},this.getScissor=function(x){return x.copy(Ye)},this.setScissor=function(x,D,q,k){x.isVector4?Ye.set(x.x,x.y,x.z,x.w):Ye.set(x,D,q,k),p.scissor(Le.copy(Ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(x){p.setScissorTest(Mt=x)},this.setOpaqueSort=function(x){Me=x},this.setTransparentSort=function(x){Oe=x},this.getClearColor=function(x){return x.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor(...arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha(...arguments)},this.clear=function(x=!0,D=!0,q=!0){let k=0;if(x){let H=!1;if(oe!==null){const Se=oe.texture.format;H=m.has(Se)}if(H){const Se=oe.texture.type,be=u.has(Se),ge=Ve.getClearColor(),ce=Ve.getClearAlpha(),Te=ge.r,Xe=ge.g,Ze=ge.b;be?(w[0]=Te,w[1]=Xe,w[2]=Ze,w[3]=ce,N.clearBufferuiv(N.COLOR,0,w)):(C[0]=Te,C[1]=Xe,C[2]=Ze,C[3]=ce,N.clearBufferiv(N.COLOR,0,C))}else k|=N.COLOR_BUFFER_BIT}D&&(k|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),z=x},this.dispose=function(){t.removeEventListener("webglcontextlost",gt,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",Yt,!1),Ve.dispose(),ve.dispose(),fe.dispose(),X.dispose(),de.dispose(),te.dispose(),ue.dispose(),ae.dispose(),he.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Ln),Pe.removeEventListener("sessionend",Hi),_n.stop()};function gt(x){x.preventDefault(),Ba("WebGLRenderer: Context Lost."),B=!0}function je(){Ba("WebGLRenderer: Context Restored."),B=!1;const x=G.autoReset,D=Ue.enabled,q=Ue.autoUpdate,k=Ue.needsUpdate,H=Ue.type;ye(),G.autoReset=x,Ue.enabled=D,Ue.autoUpdate=q,Ue.needsUpdate=k,Ue.type=H}function Yt(x){ut("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function tn(x){const D=x.target;D.removeEventListener("dispose",tn),ar(D)}function ar(x){ds(x),X.remove(x)}function ds(x){const D=X.get(x).programs;D!==void 0&&(D.forEach(function(q){he.releaseProgram(q)}),x.isShaderMaterial&&he.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,q,k,H,Se){D===null&&(D=Ht);const be=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=Wi(x,D,q,k,H);p.setMaterial(k,be);let ce=q.index,Te=1;if(k.wireframe===!0){if(ce=Z.getWireframeAttribute(q),ce===void 0)return;Te=2}const Xe=q.drawRange,Ze=q.attributes.position;let M=Xe.start*Te,st=(Xe.start+Xe.count)*Te;Se!==null&&(M=Math.max(M,Se.start*Te),st=Math.min(st,(Se.start+Se.count)*Te)),ce!==null?(M=Math.max(M,0),st=Math.min(st,ce.count)):Ze!=null&&(M=Math.max(M,0),st=Math.min(st,Ze.count));const Tt=st-M;if(Tt<0||Tt===1/0)return;ue.setup(H,k,ge,q,ce);let xt,dt=pe;if(ce!==null&&(xt=me.get(ce),dt=Y,dt.setIndex(xt)),H.isMesh)k.wireframe===!0?(p.setLineWidth(k.wireframeLinewidth*Ct()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(H.isLine){let Ot=k.linewidth;Ot===void 0&&(Ot=1),p.setLineWidth(Ot*Ct()),H.isLineSegments?dt.setMode(N.LINES):H.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else H.isPoints?dt.setMode(N.POINTS):H.isSprite&&dt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))dt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ot=H._multiDrawStarts,we=H._multiDrawCounts,Dt=H._multiDrawCount,Ke=ce?me.get(ce).bytesPerElement:1,Vt=X.get(k).currentProgram.getUniforms();for(let nn=0;nn<Dt;nn++)Vt.setValue(N,"_gl_DrawID",nn),dt.render(Ot[nn]/Ke,we[nn])}else if(H.isInstancedMesh)dt.renderInstances(M,Tt,H.count);else if(q.isInstancedBufferGeometry){const Ot=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,we=Math.min(q.instanceCount,Ot);dt.renderInstances(M,Tt,we)}else dt.render(M,Tt)};function on(x,D,q,k){z!==null&&x.isNodeMaterial&&z.setObject(k,x),$e===!0&&xe.setState(x,q,!1),x.transparent===!0&&x.side===2&&x.forceSinglePass===!1?(x.side=1,x.needsUpdate=!0,ti(x,D,k),x.side=0,x.needsUpdate=!0,ti(x,D,k),x.side=2):ti(x,D,k)}this.compile=function(x,D,q=null){q===null&&(q=x),z!==null&&z.renderStart(x,D,q),y=fe.get(q),y.init(D),_.push(y),q.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(y.pushLight(H),H.castShadow&&y.pushShadow(H))}),x!==q&&x.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(y.pushLight(H),H.castShadow&&y.pushShadow(H))}),y.setupLights(),z!==null&&z.updateLights(y.state.lightsArray),We=this.localClippingEnabled,$e=xe.init(this.clippingPlanes,We),$e===!0&&xe.setGlobalState(this.clippingPlanes,D),z!==null&&Ue.render(y.state.shadowsArray,q,D);const k=new Set;return x.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const Se=H.material;if(Se)if(Array.isArray(Se))for(let be=0;be<Se.length;be++){const ge=Se[be];on(ge,q,D,H),k.add(ge)}else on(Se,q,D,H),k.add(Se)}),y=_.pop(),z!==null&&z.renderEnd(),k},this.compileAsync=function(x,D,q=null){const k=this.compile(x,D,q);return new Promise(H=>{function Se(){if(k.forEach(function(be){const ce=X.get(be).currentProgram;(ce===void 0||ce.isReady())&&k.delete(be)}),k.size===0){H(x);return}setTimeout(Se,10)}ct.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let kn=null;function hi(x){kn&&kn(x)}function Ln(){_n.stop()}function Hi(){_n.start()}const _n=new Ko;_n.setAnimationLoop(hi),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(x){kn=x,Pe.setAnimationLoop(x),x===null?_n.stop():_n.start()},Pe.addEventListener("sessionstart",Ln),Pe.addEventListener("sessionend",Hi),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;z!==null&&z.renderStart(x,D);const q=Pe.enabled===!0&&Pe.isPresenting===!0,k=A!==null&&(oe===null||q)&&A.begin(L,oe);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(D),D=Pe.getCamera()),x.isScene===!0&&x.onBeforeRender(L,x,D,oe),y=fe.get(x,_.length),y.init(D),y.state.textureUnits=K.getTextureUnits(),_.push(y),Re.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Je.setFromProjectionMatrix(Re,2e3,D.reversedDepth),We=this.localClippingEnabled,$e=xe.init(this.clippingPlanes,We),b=ve.get(x,P.length),b.init(),P.push(b),Pe.enabled===!0&&Pe.isPresenting===!0){const be=L.xr.getDepthSensingMesh();be!==null&&jn(be,D,-1/0,L.sortObjects)}jn(x,D,0,L.sortObjects),b.finish(),z!==null&&z.updateLights(y.state.lightsArray),L.sortObjects===!0&&b.sort(Me,Oe),bt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,bt&&Ve.addToRenderList(b,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&xe.beginShadows();const H=y.state.shadowsArray;if(Ue.render(H,x,D),$e===!0&&xe.endShadows(),(k&&A.hasRenderPass())===!1){const be=b.opaque,ge=b.transmissive;if(y.setupLights(),D.isArrayCamera){const ce=D.cameras;if(ge.length>0)for(let Te=0,Xe=ce.length;Te<Xe;Te++){const Ze=ce[Te];hs(be,ge,x,Ze)}bt&&Ve.render(x);for(let Te=0,Xe=ce.length;Te<Xe;Te++){const Ze=ce[Te];us(b,x,Ze,Ze.viewport)}}else ge.length>0&&hs(be,ge,x,D),bt&&Ve.render(x),us(b,x,D)}oe!==null&&ee===0&&(K.updateMultisampleRenderTarget(oe),K.updateRenderTargetMipmap(oe)),k&&A.end(L),x.isScene===!0&&x.onAfterRender(L,x,D),ue.resetDefaultState(),$=-1,ne=null,_.pop(),_.length>0?(y=_[_.length-1],K.setTextureUnits(y.state.textureUnits),$e===!0&&xe.setGlobalState(L.clippingPlanes,y.state.camera)):y=null,P.pop(),P.length>0?b=P[P.length-1]:b=null,z!==null&&z.renderEnd()};function jn(x,D,q,k){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)q=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLightProbeGrid)y.pushLightProbeGrid(x);else if(x.isLight)y.pushLight(x),x.castShadow&&y.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(Je)){k&&Ut.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Re);const be=te.update(x),ge=x.material;ge.visible&&b.push(x,be,ge,q,Ut.z,null,D)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(Je))){const be=te.update(x),ge=x.material;if(k&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ut.copy(x.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ut.copy(be.boundingSphere.center)),Ut.applyMatrix4(x.matrixWorld).applyMatrix4(Re)),Array.isArray(ge)){const ce=be.groups;for(let Te=0,Xe=ce.length;Te<Xe;Te++){const Ze=ce[Te],M=ge[Ze.materialIndex];M&&M.visible&&b.push(x,be,M,q,Ut.z,Ze,D)}}else ge.visible&&b.push(x,be,ge,q,Ut.z,null,D)}}const Se=x.children;for(let be=0,ge=Se.length;be<ge;be++)jn(Se[be],D,q,k)}function us(x,D,q,k){const{opaque:H,transmissive:Se,transparent:be}=x;y.setupLightsView(q),$e===!0&&xe.setGlobalState(L.clippingPlanes,q),k&&p.viewport(re.copy(k)),H.length>0&&Hn(H,D,q),Se.length>0&&Hn(Se,D,q),be.length>0&&Hn(be,D,q),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function hs(x,D,q,k){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[k.id]===void 0){const M=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[k.id]=new yn(1,1,{generateMipmaps:!0,type:M?1016:1009,minFilter:1008,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:rt.workingColorSpace})}const Se=y.state.transmissionRenderTarget[k.id],be=k.viewport||re;Se.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);const ge=L.getRenderTarget(),ce=L.getActiveCubeFace(),Te=L.getActiveMipmapLevel();L.setRenderTarget(Se),L.getClearColor(ht),Ne=L.getClearAlpha(),Ne<1&&L.setClearColor(16777215,.5),L.clear(),bt&&Ve.render(q);const Xe=L.toneMapping;L.toneMapping=0;const Ze=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),y.setupLightsView(k),$e===!0&&xe.setGlobalState(L.clippingPlanes,k),Hn(x,q,k),K.updateMultisampleRenderTarget(Se),K.updateRenderTargetMipmap(Se),ct.has("WEBGL_multisampled_render_to_texture")===!1){let M=!1;for(let st=0,Tt=D.length;st<Tt;st++){const xt=D[st],{object:dt,geometry:Ot,material:we,group:Dt}=xt;if(we.side===2&&dt.layers.test(k.layers)){const Ke=we.side;we.side=1,we.needsUpdate=!0,ei(dt,q,k,Ot,we,Dt),we.side=Ke,we.needsUpdate=!0,M=!0}}M===!0&&(K.updateMultisampleRenderTarget(Se),K.updateRenderTargetMipmap(Se))}L.setRenderTarget(ge,ce,Te),L.setClearColor(ht,Ne),Ze!==void 0&&(k.viewport=Ze),L.toneMapping=Xe}function Hn(x,D,q){const k=D.isScene===!0?D.overrideMaterial:null;for(let H=0,Se=x.length;H<Se;H++){const be=x[H],{object:ge,geometry:ce,group:Te}=be;let Xe=be.material;Xe.allowOverride===!0&&k!==null&&(Xe=k),ge.layers.test(q.layers)&&ei(ge,D,q,ce,Xe,Te)}}function ei(x,D,q,k,H,Se){z!==null&&H.isNodeMaterial&&z.setObject(x,H),x.onBeforeRender(L,D,q,k,H,Se),x.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),H.onBeforeRender(L,D,q,k,x,Se),H.transparent===!0&&H.side===2&&H.forceSinglePass===!1?(H.side=1,H.needsUpdate=!0,L.renderBufferDirect(q,D,k,H,x,Se),H.side=0,H.needsUpdate=!0,L.renderBufferDirect(q,D,k,H,x,Se),H.side=2):L.renderBufferDirect(q,D,k,H,x,Se),x.onAfterRender(L,D,q,k,H,Se)}function ti(x,D,q){D.isScene!==!0&&(D=Ht);const k=X.get(x),H=y.state.lights,Se=y.state.shadowsArray,be=H.state.version,ge=he.getParameters(x,H.state,Se,D,q,y.state.lightProbeGridArray),ce=he.getProgramCacheKey(ge);let Te=k.programs;k.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Xe=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;k.envMap=de.get(x.envMap||k.environment,Xe),k.envMapRotation=k.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,Te===void 0&&(x.addEventListener("dispose",tn),Te=new Map,k.programs=Te);let Ze=Te.get(ce);if(Ze!==void 0){if(k.currentProgram===Ze&&k.lightsStateVersion===be)return Dn(x,ge),Ze}else ge.uniforms=he.getUniforms(x),z!==null&&x.isNodeMaterial&&z.build(x,q,ge),x.onBeforeCompile(ge,L),Ze=he.acquireProgram(ge,ce),Te.set(ce,Ze),k.uniforms=ge.uniforms;const M=k.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(M.clippingPlanes=xe.uniform),Dn(x,ge),k.needsLights=Xi(x),k.lightsStateVersion=be,k.needsLights&&(M.ambientLightColor.value=H.state.ambient,M.lightProbe.value=H.state.probe,M.sunLights.value=H.state.sun,M.sunLightShadows.value=H.state.sunShadow,M.directionalLights.value=H.state.directional,M.directionalLightShadows.value=H.state.directionalShadow,M.spotLights.value=H.state.spot,M.spotLightShadows.value=H.state.spotShadow,M.rectAreaLights.value=H.state.rectArea,M.ltc_1.value=H.state.rectAreaLTC1,M.ltc_2.value=H.state.rectAreaLTC2,M.pointLights.value=H.state.point,M.pointLightShadows.value=H.state.pointShadow,M.hemisphereLights.value=H.state.hemi,M.sunShadowMatrix.value=H.state.sunShadowMatrix,M.sunShadowCascade.value=H.state.sunShadowCascade,M.directionalShadowMatrix.value=H.state.directionalShadowMatrix,M.spotLightMatrix.value=H.state.spotLightMatrix,M.spotLightMap.value=H.state.spotLightMap,M.pointShadowMatrix.value=H.state.pointShadowMatrix),k.lightProbeGrid=y.state.lightProbeGridArray.length>0,k.currentProgram=Ze,k.uniformsList=null,Ze}function Vi(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=Ks.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function Dn(x,D){const q=X.get(x);q.outputColorSpace=D.outputColorSpace,q.batching=D.batching,q.batchingColor=D.batchingColor,q.instancing=D.instancing,q.instancingColor=D.instancingColor,q.instancingMorph=D.instancingMorph,q.skinning=D.skinning,q.morphTargets=D.morphTargets,q.morphNormals=D.morphNormals,q.morphColors=D.morphColors,q.morphTargetsCount=D.morphTargetsCount,q.numClippingPlanes=D.numClippingPlanes,q.numIntersection=D.numClipIntersection,q.vertexAlphas=D.vertexAlphas,q.vertexTangents=D.vertexTangents,q.toneMapping=D.toneMapping}function fi(x,D){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;S.setFromMatrixPosition(D.matrixWorld);for(let q=0,k=x.length;q<k;q++){const H=x[q];if(H.texture!==null&&H.boundingBox.containsPoint(S))return H}return null}function Wi(x,D,q,k,H){D.isScene!==!0&&(D=Ht),K.resetTextureUnits();const Se=D.fog,be=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,ge=oe===null?L.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:rt.workingColorSpace,ce=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Te=de.get(k.envMap||be,ce),Xe=k.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ze=!!q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),M=!!q.morphAttributes.position,st=!!q.morphAttributes.normal,Tt=!!q.morphAttributes.color;let xt=0;k.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(xt=L.toneMapping);const dt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ot=dt!==void 0?dt.length:0,we=X.get(k),Dt=y.state.lights;if($e===!0&&(We===!0||x!==ne)){const ot=x===ne&&k.id===$;xe.setState(k,x,ot)}let Ke=!1;k.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Dt.state.version||we.outputColorSpace!==ge||H.isBatchedMesh&&we.batching===!1||!H.isBatchedMesh&&we.batching===!0||H.isBatchedMesh&&we.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&we.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&we.instancing===!1||!H.isInstancedMesh&&we.instancing===!0||H.isSkinnedMesh&&we.skinning===!1||!H.isSkinnedMesh&&we.skinning===!0||H.isInstancedMesh&&we.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&we.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&we.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&we.instancingMorph===!1&&H.morphTexture!==null||we.envMap!==Te||k.fog===!0&&we.fog!==Se||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==xe.numPlanes||we.numIntersection!==xe.numIntersection)||we.vertexAlphas!==Xe||we.vertexTangents!==Ze||we.morphTargets!==M||we.morphNormals!==st||we.morphColors!==Tt||we.toneMapping!==xt||we.morphTargetsCount!==Ot||!!we.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,we.__version=k.version);let Vt=we.currentProgram;Ke===!0&&(Vt=ti(k,D,H),z&&k.isNodeMaterial&&z.onUpdateProgram(k,Vt,we));let nn=!1,sn=!1,Vn=!1;const ft=Vt.getUniforms(),Et=we.uniforms;if(p.useProgram(Vt.program)&&(nn=!0,sn=!0,Vn=!0),k.id!==$&&($=k.id,sn=!0),we.needsLights){const ot=fi(y.state.lightProbeGridArray,H);we.lightProbeGrid!==ot&&(we.lightProbeGrid=ot,sn=!0)}if(nn||ne!==x){p.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ft.setValue(N,"projectionMatrix",x.projectionMatrix),ft.setValue(N,"viewMatrix",x.matrixWorldInverse);const xn=ft.map.cameraPosition;xn!==void 0&&xn.setValue(N,St.setFromMatrixPosition(x.matrixWorld)),R.logarithmicDepthBuffer&&ft.setValue(N,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ft.setValue(N,"isOrthographic",x.isOrthographicCamera===!0),ne!==x&&(ne=x,sn=!0,Vn=!0)}if(we.needsLights&&(Dt.state.sunShadowMap.length>0&&ft.setValue(N,"sunShadowMap",Dt.state.sunShadowMap,K),Dt.state.directionalShadowMap.length>0&&ft.setValue(N,"directionalShadowMap",Dt.state.directionalShadowMap,K),Dt.state.spotShadowMap.length>0&&ft.setValue(N,"spotShadowMap",Dt.state.spotShadowMap,K),Dt.state.pointShadowMap.length>0&&ft.setValue(N,"pointShadowMap",Dt.state.pointShadowMap,K)),H.isSkinnedMesh){ft.setOptional(N,H,"bindMatrix"),ft.setOptional(N,H,"bindMatrixInverse");const ot=H.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),ft.setValue(N,"boneTexture",ot.boneTexture,K))}H.isBatchedMesh&&(ft.setOptional(N,H,"batchingTexture"),ft.setValue(N,"batchingTexture",H._matricesTexture,K),ft.setOptional(N,H,"batchingIdTexture"),ft.setValue(N,"batchingIdTexture",H._indirectTexture,K),ft.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&ft.setValue(N,"batchingColorTexture",H._colorsTexture,K));const Jt=q.morphAttributes;if((Jt.position!==void 0||Jt.normal!==void 0||Jt.color!==void 0)&&F.update(H,q,Vt),(sn||we.receiveShadow!==H.receiveShadow)&&(we.receiveShadow=H.receiveShadow,ft.setValue(N,"receiveShadow",H.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(Et.envMapIntensity.value=D.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=up()),sn){if(ft.setValue(N,"toneMappingExposure",L.toneMappingExposure),we.needsLights&&xa(Et,Vn),Se&&k.fog===!0&&Ce.refreshFogUniforms(Et,Se),Ce.refreshMaterialUniforms(Et,k,ie,J,y.state.transmissionRenderTarget[x.id]),we.needsLights&&we.lightProbeGrid){const ot=we.lightProbeGrid;Et.probesSH.value=ot.texture,Et.probesMin.value.copy(ot.boundingBox.min),Et.probesMax.value.copy(ot.boundingBox.max),Et.probesResolution.value.copy(ot.resolution)}Ks.upload(N,Vi(we),Et,K)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ks.upload(N,Vi(we),Et,K),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ft.setValue(N,"center",H.center),ft.setValue(N,"modelViewMatrix",H.modelViewMatrix),ft.setValue(N,"normalMatrix",H.normalMatrix),ft.setValue(N,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){const ot=k.uniformsGroups;for(let xn=0,Tn=ot.length;xn<Tn;xn++){const Wn=ot[xn];ae.update(Wn,Vt),ae.bind(Wn,Vt)}}return Vt}function xa(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.sunLights.needsUpdate=D,x.sunLightShadows.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function Xi(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(x,D,q){const k=X.get(x);k.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),X.get(x.texture).__webglTexture=D,X.get(x.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,D){const q=X.get(x);q.__webglFramebuffer=D,q.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(x,D=0,q=0){oe=x,j=D,ee=q;let k=null,H=!1,Se=!1;if(x){const ge=X.get(x);if(ge.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(N.FRAMEBUFFER,ge.__webglFramebuffer),re.copy(x.viewport),Le.copy(x.scissor),Fe=x.scissorTest,p.viewport(re),p.scissor(Le),p.setScissorTest(Fe),$=-1;return}else if(ge.__webglFramebuffer===void 0)K.setupRenderTarget(x);else if(ge.__hasExternalTextures)K.rebindTextures(x,X.get(x.texture).__webglTexture,X.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Xe=x.depthTexture;if(ge.__boundDepthTexture!==Xe){if(Xe!==null&&X.has(Xe)&&(x.width!==Xe.image.width||x.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(x)}}const ce=x.texture;(ce.isData3DTexture||ce.isDataArrayTexture||ce.isCompressedArrayTexture)&&(Se=!0);const Te=X.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Te[D])?k=Te[D][q]:k=Te[D],H=!0):x.samples>0&&K.useMultisampledRTT(x)===!1?k=X.get(x).__webglMultisampledFramebuffer:Array.isArray(Te)?k=Te[q]:k=Te,re.copy(x.viewport),Le.copy(x.scissor),Fe=x.scissorTest}else re.copy(Ae).multiplyScalar(ie).floor(),Le.copy(Ye).multiplyScalar(ie).floor(),Fe=Mt;if(q!==0&&(k=V),p.bindFramebuffer(N.FRAMEBUFFER,k)&&p.drawBuffers(x,k),p.viewport(re),p.scissor(Le),p.setScissorTest(Fe),H){const ge=X.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,ge.__webglTexture,q)}else if(Se){const ge=D;for(let ce=0;ce<x.textures.length;ce++){const Te=X.get(x.textures[ce]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ce,Te.__webglTexture,q,ge)}}else if(x!==null&&q!==0){const ge=X.get(x.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,q)}$=-1};function qi(x){const D=X.get(x);return(D.__readFormat!==x.format||D.__readType!==x.type)&&(D.__readFormat=x.format,D.__readType=x.type,D.__formatReadable=R.textureFormatReadable(x.format),D.__typeReadable=R.textureTypeReadable(x.type)),D}this.readRenderTargetPixels=function(x,D,q,k,H,Se,be,ge=0){if(!(x&&x.isWebGLRenderTarget)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ce=X.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(ce=ce[be]),ce){p.bindFramebuffer(N.FRAMEBUFFER,ce);try{const Te=x.textures[ge],Xe=Te.format,Ze=Te.type;x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge);const M=qi(Te);if(M.__formatReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(M.__typeReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-k&&q>=0&&q<=x.height-H&&N.readPixels(D,q,k,H,Q.convert(Xe),Q.convert(Ze),Se)}finally{const Te=oe!==null?X.get(oe).__webglFramebuffer:null;p.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(x,D,q,k,H,Se,be,ge=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ce=X.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(ce=ce[be]),ce)if(D>=0&&D<=x.width-k&&q>=0&&q<=x.height-H){p.bindFramebuffer(N.FRAMEBUFFER,ce);const Te=x.textures[ge],Xe=Te.format,Ze=Te.type;x.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge);const M=qi(Te);if(M.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(M.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,st),N.bufferData(N.PIXEL_PACK_BUFFER,Se.byteLength,N.STREAM_READ),N.readPixels(D,q,k,H,Q.convert(Xe),Q.convert(Ze),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);const Tt=oe!==null?X.get(oe).__webglFramebuffer:null;p.bindFramebuffer(N.FRAMEBUFFER,Tt);const xt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Al(N,xt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,st),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Se),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(st),N.deleteSync(xt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,D=null,q=0){const k=Math.pow(2,-q),H=Math.floor(x.image.width*k),Se=Math.floor(x.image.height*k),be=D!==null?D.x:0,ge=D!==null?D.y:0;K.setTexture2D(x,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,be,ge,H,Se),p.unbindTexture()},this.copyTextureToTexture=function(x,D,q=null,k=null,H=0,Se=0){let be,ge,ce,Te,Xe,Ze,M,st,Tt;const xt=x.isCompressedTexture?x.mipmaps[Se]:x.image;if(q!==null)be=q.max.x-q.min.x,ge=q.max.y-q.min.y,ce=q.isBox3?q.max.z-q.min.z:1,Te=q.min.x,Xe=q.min.y,Ze=q.isBox3?q.min.z:0;else{const Et=Math.pow(2,-H);be=Math.floor(xt.width*Et),ge=Math.floor(xt.height*Et),x.isDataArrayTexture?ce=xt.depth:x.isData3DTexture?ce=Math.floor(xt.depth*Et):ce=1,Te=0,Xe=0,Ze=0}k!==null?(M=k.x,st=k.y,Tt=k.z):(M=0,st=0,Tt=0);const dt=Q.convert(D.format),Ot=Q.convert(D.type);let we;D.isData3DTexture?(K.setTexture3D(D,0),we=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(K.setTexture2DArray(D,0),we=N.TEXTURE_2D_ARRAY):(K.setTexture2D(D,0),we=N.TEXTURE_2D),p.activeTexture(N.TEXTURE0),p.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),p.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),p.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);const Dt=p.getParameter(N.UNPACK_ROW_LENGTH),Ke=p.getParameter(N.UNPACK_IMAGE_HEIGHT),Vt=p.getParameter(N.UNPACK_SKIP_PIXELS),nn=p.getParameter(N.UNPACK_SKIP_ROWS),sn=p.getParameter(N.UNPACK_SKIP_IMAGES);p.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),p.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),p.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),p.pixelStorei(N.UNPACK_SKIP_ROWS,Xe),p.pixelStorei(N.UNPACK_SKIP_IMAGES,Ze);const Vn=x.isDataArrayTexture||x.isData3DTexture,ft=D.isDataArrayTexture||D.isData3DTexture;if(x.isDepthTexture){const Et=X.get(x),Jt=X.get(D),ot=X.get(Et.__renderTarget),xn=X.get(Jt.__renderTarget);p.bindFramebuffer(N.READ_FRAMEBUFFER,ot.__webglFramebuffer),p.bindFramebuffer(N.DRAW_FRAMEBUFFER,xn.__webglFramebuffer);for(let Tn=0;Tn<ce;Tn++)Vn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(x).__webglTexture,H,Ze+Tn),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,X.get(D).__webglTexture,Se,Tt+Tn)),N.blitFramebuffer(Te,Xe,be,ge,M,st,be,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);p.bindFramebuffer(N.READ_FRAMEBUFFER,null),p.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||x.isRenderTargetTexture||X.has(x)){const Et=X.get(x),Jt=X.get(D);p.bindFramebuffer(N.READ_FRAMEBUFFER,U),p.bindFramebuffer(N.DRAW_FRAMEBUFFER,W);for(let ot=0;ot<ce;ot++)Vn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.__webglTexture,H,Ze+ot):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Et.__webglTexture,H),ft?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Jt.__webglTexture,Se,Tt+ot):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Jt.__webglTexture,Se),H!==0?N.blitFramebuffer(Te,Xe,be,ge,M,st,be,ge,N.COLOR_BUFFER_BIT,N.NEAREST):ft?N.copyTexSubImage3D(we,Se,M,st,Tt+ot,Te,Xe,be,ge):N.copyTexSubImage2D(we,Se,M,st,Te,Xe,be,ge);p.bindFramebuffer(N.READ_FRAMEBUFFER,null),p.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ft?x.isDataTexture||x.isData3DTexture?N.texSubImage3D(we,Se,M,st,Tt,be,ge,ce,dt,Ot,xt.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(we,Se,M,st,Tt,be,ge,ce,dt,xt.data):N.texSubImage3D(we,Se,M,st,Tt,be,ge,ce,dt,Ot,xt):x.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Se,M,st,be,ge,dt,Ot,xt.data):x.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Se,M,st,xt.width,xt.height,dt,xt.data):N.texSubImage2D(N.TEXTURE_2D,Se,M,st,be,ge,dt,Ot,xt);p.pixelStorei(N.UNPACK_ROW_LENGTH,Dt),p.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ke),p.pixelStorei(N.UNPACK_SKIP_PIXELS,Vt),p.pixelStorei(N.UNPACK_SKIP_ROWS,nn),p.pixelStorei(N.UNPACK_SKIP_IMAGES,sn),Se===0&&D.generateMipmaps&&N.generateMipmap(we),p.unbindTexture()},this.initRenderTarget=function(x){X.get(x).__webglFramebuffer===void 0&&K.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?K.setTextureCube(x,0):x.isData3DTexture?K.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?K.setTexture2DArray(x,0):K.setTexture2D(x,0),p.unbindTexture()},this.resetState=function(){j=0,ee=0,oe=null,p.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}}const ss={perfectShots:2,stepPx:.013,maxPx:.055,recoveryMs:500},Di={magSize:25,fireIntervalMs:103,reloadMs:2500};function fp(i,e){if(i<=ss.perfectShots)return 0;const t=e*ss.stepPx,n=e*ss.maxPx;return Math.min(n,(i-ss.perfectShots)*t)}function pp(i){return i*.05}function mp(i,e,t){const n=fp(i,e);return t?Math.max(n,pp(e)):n}function gp(i,e){return i||e>ss.recoveryMs}function _p(i,e=Math.random){if(i<=0)return{x:0,y:0};const t=e()*Math.PI*2,n=i*(.4+e()*.6);return{x:Math.cos(t)*n,y:-Math.abs(Math.sin(t))*n-i*.35}}const tr={body:25,head:100,maxHp:100};function xp(i,e){return i?tr.head:tr.body}class vp{constructor(){As(this,"enabled",!0);As(this,"ctx",null);As(this,"lastShotAt",0)}setEnabled(e){this.enabled=e}ensure(){if(!this.enabled)return null;if(!this.ctx)try{this.ctx=new AudioContext}catch{return null}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}tone(e,t,n,s,r=0){const a=this.ensure();if(!a)return;const o=a.currentTime+r,l=a.createOscillator(),c=a.createGain();l.type=n,l.frequency.setValueAtTime(e,o),c.gain.setValueAtTime(s,o),c.gain.exponentialRampToValueAtTime(1e-4,o+t),l.connect(c),c.connect(a.destination),l.start(o),l.stop(o+t+.02)}noise(e,t,n,s=0){const r=this.ensure();if(!r)return;const a=r.currentTime+s,o=Math.max(1,Math.floor(r.sampleRate*e)),l=r.createBuffer(1,o,r.sampleRate),c=l.getChannelData(0);for(let g=0;g<o;g++)c[g]=(Math.random()*2-1)*(1-g/o);const h=r.createBufferSource();h.buffer=l;const f=r.createBiquadFilter();f.type="lowpass",f.frequency.setValueAtTime(n,a);const d=r.createGain();d.gain.setValueAtTime(t,a),d.gain.exponentialRampToValueAtTime(1e-4,a+e),h.connect(f),f.connect(d),d.connect(r.destination),h.start(a)}shot(){const e=performance.now();e-this.lastShotAt<40||(this.lastShotAt=e,this.noise(.08,.5,2400),this.tone(220,.07,"square",.12))}hit(){this.tone(170,.12,"triangle",.28)}headshot(){this.tone(1180,.16,"square",.14),this.tone(590,.18,"sine",.2,.02),this.noise(.05,.2,5e3)}miss(){this.tone(760,.06,"sine",.08)}enemyShot(){this.noise(.18,.55,900),this.tone(90,.22,"sine",.35,.02),this.tone(220,.1,"square",.12,.05)}empty(){this.tone(1400,.03,"square",.05)}reloadStart(){this.tone(520,.04,"square",.12),this.tone(700,.04,"square",.12,.14)}reloadDone(){this.noise(.05,.3,3e3,.02),this.tone(340,.08,"square",.14)}killConfirm(e){const t=Math.min(4,Math.max(0,e-1));this.tone(880+t*120,.09,"sine",.16),this.tone(1320+t*180,.12,"sine",.12,.06),e>=3&&this.tone(1760+t*200,.16,"triangle",.1,.14)}ui(){this.tone(880,.05,"sine",.1)}error(){this.tone(240,.12,"sawtooth",.1)}}const Bn=new vp,Lo=[{id:"easy",name:"入门",description:"慢速 · 大头 · 出现前等待久",speedMul:.65,headMul:1.15,waitMul:1.8,jitter:0,bobAmp:0,attackMul:1.4},{id:"normal",name:"普通",description:"标准速度与目标尺寸",speedMul:1,headMul:1,waitMul:1,jitter:.08,bobAmp:0,attackMul:1},{id:"hard",name:"进阶",description:"更快 · 更小 · 出现更突然",speedMul:1.35,headMul:.8,waitMul:.55,jitter:.18,bobAmp:.12,attackMul:.8},{id:"insane",name:"职业",description:"极限速度 · 极小目标",speedMul:1.75,headMul:.62,waitMul:.28,jitter:.3,bobAmp:.22,attackMul:.65},{id:"master",name:"大师",description:"高速 · 微目标 · 变速 · 晃头",speedMul:2.2,headMul:.5,waitMul:.16,jitter:.4,bobAmp:.34,attackMul:.5},{id:"extreme",name:"极限",description:"最高速 · 极微目标 · 强变速 · 强晃动",speedMul:2.8,headMul:.4,waitMul:.1,jitter:.5,bobAmp:.48,attackMul:.4}];function Sp(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Mp(i){const e=i.shots,t=e.filter(C=>C.hit).length,n=e.filter(C=>C.head).length,s=i.encounters,r=s.filter(C=>C.killed).length;let a=0,o=0,l=0;for(const C of s)C.firstShotHit&&a++,C.firstShotAt!=null&&(o+=C.firstShotAt-C.appearAt,l++);let c=0,h=0;for(const C of e){const S=C.distX;S>0?c++:S<0&&h++}let f=0,d=0;for(const C of s)d=C.killed?d+1:0,d>f&&(f=d);const g=Math.max(0,e.length-r),v=C=>C.length>0?C.reduce((S,b)=>S+b,0)/C.length:0,T=i.modeId==="flick"?s.filter(C=>C.killed&&C.killAt!=null):[],u={flickTimeMs:T.length>0?T.reduce((C,S)=>C+((S.killAt??0)-S.appearAt),0)/T.length:0,flickDistPx:v(s.filter(C=>C.flickDistPx!=null).map(C=>C.flickDistPx??0)),preaimErrPx:v(s.filter(C=>C.preaimErrPx!=null).map(C=>C.preaimErrPx??0)),displacementPx:v(s.filter(C=>C.displacementPx!=null).map(C=>C.displacementPx??0)),trackPct:i.modeId==="tracking"?(()=>{const C=s.reduce((b,y)=>b+(y.trackMs??0),0),S=s.reduce((b,y)=>b+(y.activeDurMs??0),0);return S>0?C/S*100:0})():0},w=s.filter(C=>C.attacked).length;return{id:Sp(),modeId:i.modeId,sceneId:i.sceneId,sceneName:i.sceneName,difficultyId:i.difficultyId,difficultyName:i.difficultyName,profileId:i.profileId,profileName:i.profileName,startedAt:i.startedAt,durationMs:i.durationMs,shots:e.length,wastedShots:i.wastedShots??0,hits:t,headshots:n,accuracy:e.length>0?t/e.length:0,encounters:s.length,kills:r,firstShotHits:a,firstShotRate:s.length>0?a/s.length:0,avgReactionMs:l>0?o/l:0,avgCorrectionsPerKill:r>0?g/r:0,overshoots:c,undershoots:h,maxStreak:f,deaths:w,modeExtra:u}}const il="jg.sessions.v2",Ep=50;function yp(){try{const i=localStorage.getItem(il),e=i?JSON.parse(i):[];return Array.isArray(e)?e:[]}catch{return[]}}function Tp(i){const e=[i,...yp()].slice(0,Ep);try{localStorage.setItem(il,JSON.stringify(e))}catch{}}const bp={cs2:.022,valorant:.07};function sl(i){return i==="custom"?.022:bp[i]}function rl(i){return i.sens*i.multiplier}function Ap(i){const e=i.dpi/2.54,t=rl(i);return t<=0||e<=0?0:360/(t*e)}const al=["#7cfc9b","#00ff6a","#ffffff","#ffd24a","#ff5c5c","#4dc3ff","#ff7ad9"],Qr={size:[0,26],gap:[0,18],thickness:[1,6]},$s={color:al[0],size:8,gap:4,thickness:2},as=(i,[e,t],n)=>{const s=typeof i=="number"&&Number.isFinite(i)?i:Number(i);return Number.isFinite(s)?Math.min(t,Math.max(e,s)):n};function li(i){const e=i??{};return{color:typeof e.color=="string"&&/^#[0-9a-f]{6}$/i.test(e.color)?e.color:$s.color,size:Math.round(as(e.size,Qr.size,$s.size)),gap:Math.round(as(e.gap,Qr.gap,$s.gap)),thickness:Math.round(as(e.thickness,Qr.thickness,$s.thickness)),dot:e.dot===!0,outline:e.outline!==!1}}function wp(i){return{"--ch-color":i.color,"--ch-len":`${i.size}px`,"--ch-gap":`${i.gap}px`,"--ch-thick":`${i.thickness}px`,"--ch-dot":i.dot?`${Math.max(2,i.thickness)}px`:"0px","--ch-outline":i.outline?"1px":"0px"}}const Do={sens:[.05,10],dpi:[100,3200]},ns={id:"default",name:"CS2 标准",sens:2,dpi:800,fov:103};function jr(i){const e=i??{},t=e.preset==="valorant"?"valorant":"cs2";return{id:typeof e.id=="string"&&e.id?e.id:ns.id,name:typeof e.name=="string"&&e.name?e.name:ns.name,preset:t,sens:+as(e.sens,Do.sens,ns.sens).toFixed(2),dpi:Math.round(as(e.dpi,Do.dpi,ns.dpi)),fov:typeof e.fov=="number"&&e.fov>0?e.fov:ns.fov,multiplier:sl(t)}}function Rp(i,e){return{...i,preset:e,multiplier:sl(e)}}function ol(i){return rl(i)}function Cp(i){return Ap(i)}function Pp(i){return`${Cp(i).toFixed(1)} cm / 360° · ${ol(i).toFixed(4)} °/计数`}const ea="v3d-1.3",zt={eyeHeight:1.62,crouchHeight:1.05,moveSpeed:3.4,enemyAimTime:[.55,.95],enemySpeed:3,spawn:{minDistance:4,headHeight:1.6}},aa=[{id:"room3d",name:"3D 训练房间",desc:"14×26m 室内｜砖墙 · 木箱 · 沙袋 · 门洞",range:"交战 5–11m",room:{w:14,d:26,h:3.2},door:{w:1.4,h:2.3,z:-6},player:{x:0,z:2.6,limitX:4.2,limitZmin:-3.2,limitZmax:2.9},playerCover:{x:.6,z:.9,w:3.2,h:1.3,d:.5},spawns:[{id:"前左箱后",x:-3.8,z:-2.2,tier:0},{id:"前右箱后",x:3.8,z:-1.8,tier:0},{id:"门后左",x:-1.8,z:-7.6,tier:1},{id:"门后右",x:1.8,z:-7.6,tier:1},{id:"左中矮墙后",x:-4.4,z:-4.4,tier:1},{id:"右中矮墙后",x:4.4,z:-4,tier:1}],props:[{x:-1.9,z:-3.4,w:1.2,h:1.1,d:1.2,kind:"crate"},{x:2.2,z:-2.4,w:3.2,h:.95,d:.4,kind:"barrier"},{x:-3.8,z:-2.2,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:3.8,z:-1.8,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:-4.4,z:-4.4,w:1.7,h:1.95,d:1.4,kind:"barrier"},{x:4.4,z:-4,w:1.7,h:1.95,d:1.4,kind:"crate"},{x:-5.4,z:-1.2,w:2,h:.7,d:1,kind:"sandbag"}],fog:{near:8,far:34},lamps:[{x:6.1,y:2.5,z:-1.5}],colors:{floor:3880752,wall:10325881,ceil:2760213,prop:7031340}},{id:"long",name:"长地图 · 远距离交战",desc:"26×84m 走廊｜四段纵深掩体 + 远端门洞",range:"交战 14–42m（随难度拉远）",room:{w:26,d:84,h:4.2},door:{w:2.2,h:2.6,z:-34},player:{x:0,z:6,limitX:8.5,limitZmin:-2,limitZmax:9},playerCover:{x:0,z:4.3,w:4.2,h:1.15,d:.5},spawns:[{id:"近箱左",x:-7.5,z:-8,tier:0},{id:"近箱右",x:7.5,z:-9.5,tier:0},{id:"中墙左",x:-9.5,z:-15,tier:1},{id:"中墙右",x:9.5,z:-17,tier:1},{id:"远箱左",x:-6.5,z:-23,tier:2},{id:"远箱右",x:6.5,z:-25,tier:2},{id:"门后左",x:-2.4,z:-35.4,tier:3},{id:"门后右",x:2.4,z:-35.4,tier:3},{id:"近中矮墙后",x:-2.6,z:-10.5,tier:0},{id:"中箱左二",x:-4.6,z:-18.5,tier:1},{id:"远中箱后",x:1.8,z:-27,tier:2},{id:"远侧墙后",x:-10.5,z:-28,tier:2}],props:[{x:-7.5,z:-8,w:2.1,h:2,d:1.7,kind:"crate"},{x:7.5,z:-9.5,w:2.1,h:2,d:1.7,kind:"crate"},{x:-9.5,z:-15,w:3.6,h:1.3,d:.55,kind:"barrier"},{x:9.5,z:-17,w:3.6,h:1.3,d:.55,kind:"barrier"},{x:-6.5,z:-23,w:2.3,h:1.9,d:1.7,kind:"crate"},{x:6.5,z:-25,w:2.3,h:1.9,d:1.7,kind:"crate"},{x:-3.2,z:-12,w:1.6,h:1.15,d:1.6,kind:"crate"},{x:3.6,z:-19,w:1.6,h:1.15,d:1.6,kind:"crate"},{x:-4.4,z:-32.6,w:2,h:1.8,d:1.5,kind:"crate"},{x:4.4,z:-32.6,w:2,h:1.8,d:1.5,kind:"crate"},{x:-2.6,z:-10.5,w:3,h:1.9,d:.5,kind:"barrier"},{x:-4.6,z:-18.5,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:1.8,z:-27,w:2,h:1.9,d:1.6,kind:"crate"},{x:-10.5,z:-28,w:2.2,h:2,d:1.6,kind:"crate"},{x:-6.2,z:3.4,w:2.2,h:.75,d:1,kind:"sandbag"},{x:6.2,z:3.4,w:2.2,h:.75,d:1,kind:"sandbag"}],fog:{near:30,far:130},proc:{count:5,minDist:13,maxDist:31,keepDoor:4.5,minGap:3.2},lamps:[{x:11.6,y:3.5,z:-4},{x:-11.6,y:3.5,z:-16},{x:11.6,y:3.5,z:-28}],colors:{floor:3420976,wall:8353897,ceil:2366742,prop:5981488}}],Lp="room3d",Io=i=>aa.find(e=>e.id===i)??aa[0],Dp=.55,Fo={easy:[6,3,1,.5],normal:[4,4,2,1],hard:[3,4,3,1.5],insane:[2,3,4,2.5],master:[1.5,2.5,4,3.5],extreme:[1,2,4,5]},Ip=(i,e)=>(Fo[i]??Fo.normal)[e]??1;let ll=!0,cl=!1;function Xt(i){return cl?new Qn({color:i.color}):ll?new rs({color:i.color,roughness:i.roughness??.8,metalness:i.metalness??.05,emissive:i.emissive??0,emissiveIntensity:i.emissiveIntensity??1}):new sc({color:i.color,emissive:i.emissive??0})}const Uo={easy:{peekSet:[.5,1],crouch:.15,feint:!1,feintDouble:!1,strafeShoot:!1,strafePause:0,crouchSpam:0,repeatPeek:!1,wideBias:0,paceHold:0,paceRush:0,lead:.04,coverChange:!1,jitter:0},normal:{peekSet:[.5,1],crouch:.25,feint:!1,feintDouble:!1,strafeShoot:!1,strafePause:0,crouchSpam:.05,repeatPeek:!1,wideBias:.1,paceHold:.15,paceRush:0,lead:.05,coverChange:!1,jitter:.1},hard:{peekSet:[.5,1,1.6],crouch:.4,feint:!0,feintDouble:!1,strafeShoot:!1,strafePause:.1,crouchSpam:.15,repeatPeek:!0,wideBias:.2,paceHold:.25,paceRush:.2,lead:.08,coverChange:!1,jitter:.2},insane:{peekSet:[.5,1,1.6,2.4],crouch:.45,feint:!0,feintDouble:!1,strafeShoot:!1,strafePause:.2,crouchSpam:.25,repeatPeek:!0,wideBias:.3,paceHold:.3,paceRush:.25,lead:.1,coverChange:!0,jitter:.3},master:{peekSet:[.5,1,1.6,2.4],crouch:.5,feint:!0,feintDouble:!1,strafeShoot:!0,strafePause:.35,crouchSpam:.4,repeatPeek:!0,wideBias:.45,paceHold:.35,paceRush:.3,lead:.12,coverChange:!0,jitter:.45},extreme:{peekSet:[1,1.6,2.4],crouch:.55,feint:!0,feintDouble:!0,strafeShoot:!0,strafePause:.5,crouchSpam:.55,repeatPeek:!0,wideBias:.6,paceHold:.4,paceRush:.35,lead:.14,coverChange:!0,jitter:.65}},Fp={easy:"小身位 · 不还手战术",normal:"小身位 · 偶尔蹲",hard:"假动作 · 急停 · 擦弹再拉",insane:"大身位 · 换掩体 · 蹲起",master:"横移对枪 · 预瞄提前量",extreme:"双段假动作 · 大身位横拉"},No=`
                  <i class="ch-line ch-t"></i>
                  <i class="ch-line ch-b"></i>
                  <i class="ch-line ch-l"></i>
                  <i class="ch-line ch-r"></i>
                  <i class="ch-dot"></i>`;function Up(){const i=new ci,e=new rs({color:3818060,metalness:.85,roughness:.42}),t=new rs({color:2237995,metalness:.3,roughness:.75}),n=Xt({color:7031340,roughness:.85}),s=new rs({color:12072234,metalness:.2,roughness:.7}),r=(m,u,w,C,S,b)=>{const y=new pt(u,w);return y.position.set(C,S,b),y.castShadow=!0,m.add(y),y};r(i,new yt(.1,.14,.46),t,0,0,-.2),r(i,new yt(.06,.03,.5),t,0,.09,-.22);const a=r(i,new yt(.07,.02,.06),e,.06,.06,-.06);a.name="charging",r(i,new yt(.09,.1,.44),n,0,-.01,-.66);const o=r(i,new er(.022,.022,.62,12),e,0,.01,-1.18);o.rotation.x=Math.PI/2;const l=r(i,new er(.035,.035,.1,12),e,0,.01,-1.52);l.rotation.x=Math.PI/2;const c=r(i,new yt(.07,.26,.12),t,0,-.2,-.18);c.rotation.x=-.22,c.name="mag";const h=r(i,new yt(.06,.18,.09),t,0,-.17,.02);h.rotation.x=.28,r(i,new yt(.08,.12,.34),t,0,-.01,.16),r(i,new yt(.07,.05,.22),t,0,.07,.14),r(i,new yt(.07,.07,.12),t,0,.15,-.2);const f=r(i,new ls(.024,16),new Qn({color:2781071}),0,.15,-.262);f.rotation.y=Math.PI,r(i,new yt(.02,.06,.03),s,.055,.02,-.1);const d=Xt({color:3949622,roughness:.9}),g=Xt({color:14262374,roughness:.8}),v=r(i,new yt(.09,.09,.14),d,0,-.06,-.62);v.rotation.z=.12,r(i,new yt(.07,.05,.1),g,0,0,-.62);const T=r(i,new yt(.09,.11,.12),d,0,-.1,0);return T.rotation.z=-.1,i.traverse(m=>{m.isMesh&&(m.castShadow=!1)}),i}function Oo(){const i=new ci,e=Xt({color:3752783,roughness:.78}),t=Xt({color:2304563,roughness:.7}),n=Xt({color:2830391,roughness:.85}),s=Xt({color:14131825,roughness:.75}),r=Xt({color:2826520,roughness:.9}),a=Xt({color:12597547,roughness:.7}),o=new pt(new yt(.44,.58,.26),e);o.position.y=1.18,i.add(o);const l=new pt(new yt(.36,.38,.3),t);l.position.y=1.22,i.add(l);const c=new pt(new yt(.06,.08,.06),a);c.position.set(-.26,1.3,0),i.add(c);const h=new pt(new Oi(.135,20,16),s);h.position.y=1.63,i.add(h);const f=new pt(new Oi(.142,20,12,0,Math.PI*2,0,Math.PI*.62),r);f.position.y=1.645,i.add(f);const d=new js(.085,.62,4,10),g=new pt(d,n);g.position.set(-.12,.48,0),i.add(g);const v=new pt(d,n);v.position.set(.12,.48,0),i.add(v);const T=new js(.07,.5,4,10),m=new pt(T,e);m.position.set(-.29,1.16,-.06),i.add(m);const u=new pt(T,e);u.position.set(.29,1.16,-.06),i.add(u);const w=new pt(new yt(.06,.06,.5),Xt({color:1382685,roughness:.6}));return w.position.set(.16,1.12,-.34),i.add(w),i.traverse(C=>{const S=C;S.isMesh&&(S.receiveShadow=!0,S.castShadow=!1)}),o.castShadow=!0,h.castShadow=!0,g.castShadow=!0,v.castShadow=!0,i.traverse(C=>{const S=C;S.isMesh&&(S.userData.isEnemy=!0,S.userData.zone="body")}),h.userData.zone="head",f.userData.zone="head",{group:i,leftLeg:g,rightLeg:v,leftArm:m,rightArm:u,head:h,torso:o,materials:[e,t,n,s,r,a]}}function Np(i){const e=new ci,t=[],n=Xt({color:i.colors.wall,roughness:.92}),s=Xt({color:i.colors.floor,roughness:.95}),r=Xt({color:i.colors.ceil,roughness:.9}),a=Xt({color:i.colors.prop,roughness:.86}),o=Xt({color:7037254,roughness:.95}),l=i.room,c=new pt(new Ni(l.w,l.d),s);c.rotation.x=-Math.PI/2,c.receiveShadow=!0,e.add(c);const h=new pt(new Ni(l.w,l.d),r);h.rotation.x=Math.PI/2,h.position.y=l.h,e.add(h);const f=(u,w,C,S,b,y)=>{const P=new pt(new yt(u,w,C),n);return P.position.set(S,b,y),P.castShadow=!1,P.receiveShadow=!0,e.add(P),t.push(P),P},d=l.w/2;f(.3,l.h,l.d,-d,l.h/2,0),f(.3,l.h,l.d,d,l.h/2,0);const g=i.door.w/2,v=i.door.z-.6,T=d-g;f(T,l.h,.3,-d+T/2,l.h/2,v),f(T,l.h,.3,d-T/2,l.h/2,v),f(i.door.w,l.h-i.door.h,.3,0,i.door.h+(l.h-i.door.h)/2,v),f(l.w,l.h,.3,0,l.h/2,l.d/2);for(const u of i.props){if(u.kind==="sandbag"){for(let C=0;C<3;C++){const S=new pt(new Oi(.3,12,8),o);S.scale.set(1.25,.72,.85),S.position.set(u.x-.7+C*.7,.22+(u.h-.4)*.5,u.z),S.castShadow=!0,S.receiveShadow=!0,e.add(S)}continue}const w=new pt(new yt(u.w,u.h,u.d),a);w.position.set(u.x,u.h/2,u.z),w.castShadow=!0,w.receiveShadow=!0,w.userData.isCover=!0,e.add(w),t.push(w)}const m=new rs({color:2762532,emissive:16767392,emissiveIntensity:.6});for(const u of i.lamps){const w=new pt(new yt(.6,.12,.26),m);w.position.set(u.x,u.y,u.z),e.add(w);const C=new na(16765600,5.5,18,2);C.position.set(u.x,u.y-.1,u.z),e.add(C)}return{root:e,walls:t}}function Gp(i,e){let t=null;try{t=localStorage.getItem("jg.slice3d.scene")}catch{t=null}const n=Io(t);i.innerHTML=`
    <div class="slice3d">
      <canvas id="c3d"></canvas>
      <div class="s3-hud s3-left">
        <div class="s3-title" id="s3-scene-title">${n.name}</div>
        <div class="s3-line" id="s3-scene-range">${n.range}</div>
        <div class="s3-line">版本 ${ea}</div>
        <div class="s3-line">鼠标转视角 · WASD 移动 · Ctrl 下蹲</div>
        <div class="s3-line">按住左键连发 · R 换弹 · Esc 退出</div>
        <div class="s3-line">F 全屏切换 · C 掩体 · P 画质</div>
        <div class="s3-line s3-perf" id="s3-perf">--</div>
      </div>
      <div class="s3-hud s3-right">
        <div class="s3-line">击杀 <b id="s3-kills">0</b></div>
        <div class="s3-line">命中率 <b id="s3-acc">--</b></div>
        <div class="s3-line">血量 <b id="s3-hp">100</b></div>
      </div>
      <div class="s3-ammo"><span id="s3-ammo">25</span> / 25</div>
      <div class="s3-crosshair" id="s3-cross">${No}</div>
      <div class="s3-dmg" id="s3-dmg"></div>
      <div class="s3-banner" id="s3-banner"></div>
      <div class="s3-lock-hint hidden" id="s3-lock-hint">点击画面以捕获鼠标（否则无法转视角）</div>
      <div class="s3-overlay" id="s3-overlay">
        <div class="s3-card s3-menu-card">
          <div class="s3-menu-head">
            <div>
              <h2>架枪训练器</h2>
              <p class="s3-menu-sub">鼠标转视角 · WASD 移动 · Ctrl 下蹲 · 左键连发 · R 换弹 · Esc 退出</p>
            </div>
            <div class="s3-ver">${ea}</div>
          </div>

          <div class="s3-menu">
            <!-- 单元 1：场景 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>1</b>场景</div>
              <div class="s3-scene-list" id="s3-scene-row">
                ${aa.map(E=>`<button class="s3-scene${E.id===n.id?" is-on":""}" data-scene="${E.id}" type="button">
                  <i class="s3-scene-thumb s3-thumb-${E.id}" aria-hidden="true"></i>
                  <span class="s3-scene-txt">
                    <b>${E.name}</b>
                    <em>${E.desc}<br>${E.range}</em>
                  </span>
                  ${E.id===n.id?'<span class="s3-scene-tag">当前</span>':""}
                </button>`).join("")}
              </div>
              <p class="s3-hint">切换场景会自动重载一次（房间要按新尺寸重建）。</p>
              <div class="s3-field-row">
                <div class="s3-field">
                  <label>玩家掩体</label>
                  <div class="s3-pills">
                    <button class="s3-pill" id="s3-cover-on" type="button">有掩体</button>
                    <button class="s3-pill" id="s3-cover-off" type="button">空旷场地</button>
                  </div>
                </div>
                <div class="s3-field">
                  <label>战斗画面</label>
                  <div class="s3-pills" id="s3-fs-row">
                    <button class="s3-pill" data-fs="auto" type="button">自动全屏</button>
                    <button class="s3-pill" data-fs="window" type="button">窗口内</button>
                  </div>
                </div>
              </div>
            </section>

            <!-- 单元 2：难度 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>2</b>难度</div>
              <div class="s3-diff-grid" id="s3-diff-row">
                ${Lo.map(E=>`<button class="s3-diff" data-diff="${E.id}" type="button">
                    <b>${E.name}</b><em>${Fp[E.id]??E.description}</em>
                  </button>`).join("")}
              </div>
              <div class="s3-field">
                <label>本局敌人数量</label>
                <div class="s3-pills" id="s3-count-row">
                  <button class="s3-pill" data-count="5" type="button">5</button>
                  <button class="s3-pill" data-count="10" type="button">10</button>
                  <button class="s3-pill" data-count="20" type="button">20</button>
                  <button class="s3-pill" data-count="999" type="button">不限</button>
                </div>
              </div>
            </section>

            <!-- 单元 3：灵敏度及其相关 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>3</b>灵敏度及其相关</div>
              <div class="s3-field">
                <label>游戏预设</label>
                <div class="s3-pills" id="s3-preset-row">
                  <button class="s3-pill" data-preset="cs2" type="button">CS2</button>
                  <button class="s3-pill" data-preset="valorant" type="button">Valorant</button>
                </div>
              </div>
              <div class="s3-field">
                <label>游戏内灵敏度 <span class="s3-num" id="s3-sens-val">2.00</span></label>
                <input class="s3-range" type="range" id="s3-sens" min="0.05" max="10" step="0.01" value="2" />
              </div>
              <div class="s3-field s3-field-inline">
                <label>鼠标 DPI</label>
                <input class="s3-input" type="number" id="s3-dpi" min="100" max="3200" step="50" value="800" />
              </div>
              <div class="s3-readout" id="s3-sens-out">--</div>
              <p class="s3-hint">
                已自动请求原始输入（raw input）；若系统不支持，请关掉 Windows 的「提高指针精确度」，
                否则快速甩枪时的位移会被系统放大。
              </p>
            </section>

            <!-- 单元 4：准星设置 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>4</b>准星设置</div>
              <div class="s3-ch-wrap">
                <div class="s3-ch-preview">
                  <div class="s3-crosshair">${No}</div>
                  <span class="s3-ch-preview-tip">预览</span>
                </div>
                <div class="s3-ch-controls">
                  <div class="s3-field">
                    <label>颜色</label>
                    <div class="s3-swatches" id="s3-ch-colors">
                      ${al.map(E=>`<button class="s3-swatch" data-color="${E}" style="--sw:${E}" type="button"></button>`).join("")}
                    </div>
                  </div>
                  <div class="s3-ch-sliders">
                    <div class="s3-field">
                      <label>长度 <span class="s3-num" id="s3-ch-size-val">8</span></label>
                      <input class="s3-range" type="range" id="s3-ch-size" min="0" max="26" step="1" value="8" />
                    </div>
                    <div class="s3-field">
                      <label>间隙 <span class="s3-num" id="s3-ch-gap-val">4</span></label>
                      <input class="s3-range" type="range" id="s3-ch-gap" min="0" max="18" step="1" value="4" />
                    </div>
                    <div class="s3-field">
                      <label>粗细 <span class="s3-num" id="s3-ch-thick-val">2</span></label>
                      <input class="s3-range" type="range" id="s3-ch-thick" min="1" max="6" step="1" value="2" />
                    </div>
                  </div>
                  <div class="s3-field">
                    <label>附加</label>
                    <div class="s3-pills">
                      <button class="s3-pill" id="s3-ch-dot" type="button">中心点</button>
                      <button class="s3-pill" id="s3-ch-outline" type="button">描边</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="s3-menu-foot">
            <button class="btn-primary btn-lg" id="s3-start" disabled>初始化中…</button>
            <div class="s3-foot-tools">
              <button class="btn-ghost btn-sm" id="s3-fullscreen" type="button">全屏（F）</button>
              <button class="btn-ghost btn-sm" id="s3-bench" type="button">性能自检</button>
              <button class="btn-ghost btn-sm" id="s3-quit" type="button">退出</button>
            </div>
            <div class="s3-bench-out" id="s3-bench-out"></div>
            <div class="s3-lastlog" id="s3-lastlog"></div>
          </div>
        </div>
      </div>
      <div class="overlay hidden" id="s3-loading">
        <div class="s3-card">
          <h2>正在准备训练</h2>
          <p id="s3-load-step">初始化…</p>
          <div class="s3-progress"><i id="s3-progress-fill"></i></div>
          <p class="s3-line" id="s3-load-pct">0%</p>
        </div>
      </div>
      <div class="overlay hidden" id="s3-result">
        <div class="s3-card">
          <h2>训练成绩</h2>
          <div class="s3-score" id="s3-score"></div>
          <div class="row">
            <button class="btn-primary" id="s3-again">再来一局</button>
            <button class="btn-ghost" id="s3-back">返回设置</button>
          </div>
        </div>
      </div>
    </div>
  `;const s=i.querySelector("#c3d"),r=i.querySelector("#s3-overlay"),a=i.querySelector("#s3-ammo"),o=i.querySelector("#s3-kills"),l=i.querySelector("#s3-acc"),c=i.querySelector("#s3-hp"),h=i.querySelector("#s3-banner"),f=i.querySelector("#s3-dmg"),d=i.querySelector("#s3-cross"),g=i.querySelector("#s3-cover-on"),v=i.querySelector("#s3-cover-off"),T=i.querySelector("#s3-diff-row"),m=i.querySelector("#s3-fullscreen"),u=i.querySelector("#s3-perf"),w=i.querySelector("#s3-loading"),C=i.querySelector("#s3-load-step"),S=i.querySelector("#s3-load-pct"),b=i.querySelector("#s3-progress-fill"),y=i.querySelector("#s3-result"),P=i.querySelector("#s3-score"),_=i.querySelector("#s3-again"),A=i.querySelector("#s3-back"),L=i.querySelector("#s3-count-row"),B=i.querySelector("#s3-bench"),z=i.querySelector("#s3-bench-out"),V=i.querySelector("#s3-lastlog"),U=i.querySelector("#s3-lock-hint"),W=i.querySelector("#s3-start");let j=!1;W.disabled=!0,W.textContent="初始化中…",W.addEventListener("click",()=>{j=!0});let ee=!1,oe=[],$=()=>{},ne=!1;const re=()=>{if(ne){try{s.requestPointerLock()}catch{}return}try{const E=s.requestPointerLock({unadjustedMovement:!0});E&&typeof E.catch=="function"&&E.catch(()=>{ne=!0;try{s.requestPointerLock()}catch{}})}catch{ne=!0;try{s.requestPointerLock()}catch{}}};let Le=Number(localStorage.getItem("jg.slice3d.count")??"10")||10;const Fe=()=>{i.querySelectorAll("[data-count]").forEach(E=>{E.classList.toggle("is-on",Number(E.dataset.count)===Le)})};Fe(),L==null||L.querySelectorAll("[data-count]").forEach(E=>{E.addEventListener("click",()=>{Le=Number(E.dataset.count)??10,localStorage.setItem("jg.slice3d.count",String(Le)),Fe()})});const ht=localStorage.getItem("jg.slice3d.quality");let Ne=ht==="high"||ht==="medium"||ht==="low"?ht:"medium";const lt={high:21e5,medium:1e6,low:52e4};ll=Ne==="high",cl=Ne==="low";let J=ht===null;const ie="jg.slice3d.diff";let Me=localStorage.getItem(ie)??"normal";const Oe=()=>Uo[Me]??Uo.normal,Ae=()=>{T.querySelectorAll("[data-diff]").forEach(E=>{E.classList.toggle("is-on",E.dataset.diff===Me)})};Ae(),T.querySelectorAll("[data-diff]").forEach(E=>{E.addEventListener("click",()=>{var O;Me=E.dataset.diff??"normal",localStorage.setItem(ie,Me),Ae(),rn(`难度：${((O=Lo.find(se=>se.id===Me))==null?void 0:O.name)??Me}`)})});const Ye="jg.slice3d.sens",Mt="jg.slice3d.crosshair",Je=E=>{try{const O=localStorage.getItem(E);return O?JSON.parse(O):null}catch{return null}},$e=(E,O)=>{try{localStorage.setItem(E,JSON.stringify(O))}catch{}};let We=jr(Je(Ye)),Re=li(Je(Mt));const St=i.querySelector("#s3-sens"),Ut=i.querySelector("#s3-sens-val"),Ht=i.querySelector("#s3-dpi"),bt=i.querySelector("#s3-sens-out"),Ct=i.querySelector("#s3-preset-row"),N=i.querySelector("#s3-ch-colors"),Nt=i.querySelector("#s3-ch-size"),ct=i.querySelector("#s3-ch-gap"),R=i.querySelector("#s3-ch-thick"),p=i.querySelector("#s3-ch-size-val"),G=i.querySelector("#s3-ch-gap-val"),X=i.querySelector("#s3-ch-thick-val"),K=i.querySelector("#s3-ch-dot"),de=i.querySelector("#s3-ch-outline"),me=()=>{const E=wp(Re);for(const[O,se]of Object.entries(E))i.style.setProperty(O,se)},Z=()=>{St.value=String(We.sens),Ut.textContent=We.sens.toFixed(2),Ht.value=String(We.dpi),Ct.querySelectorAll("[data-preset]").forEach(E=>E.classList.toggle("is-on",E.dataset.preset===We.preset)),bt.textContent=`换算：${Pp(We)}`},te=()=>{Nt.value=String(Re.size),ct.value=String(Re.gap),R.value=String(Re.thickness),p.textContent=String(Re.size),G.textContent=String(Re.gap),X.textContent=String(Re.thickness),K.classList.toggle("is-on",Re.dot),de.classList.toggle("is-on",Re.outline),N.querySelectorAll(".s3-swatch").forEach(E=>E.classList.toggle("is-on",(E.dataset.color??"").toLowerCase()===Re.color.toLowerCase())),me()};Ct.querySelectorAll("[data-preset]").forEach(E=>{E.addEventListener("click",()=>{We=Rp(We,E.dataset.preset==="valorant"?"valorant":"cs2"),$e(Ye,We),Z()})}),St.addEventListener("input",()=>{We=jr({...We,sens:Number(St.value)}),$e(Ye,We),Z()}),Ht.addEventListener("change",()=>{We=jr({...We,dpi:Number(Ht.value)}),$e(Ye,We),Z()}),N.querySelectorAll(".s3-swatch").forEach(E=>{E.addEventListener("click",()=>{Re=li({...Re,color:E.dataset.color}),$e(Mt,Re),te()})}),Nt.addEventListener("input",()=>{Re=li({...Re,size:Number(Nt.value)}),$e(Mt,Re),te()}),ct.addEventListener("input",()=>{Re=li({...Re,gap:Number(ct.value)}),$e(Mt,Re),te()}),R.addEventListener("input",()=>{Re=li({...Re,thickness:Number(R.value)}),$e(Mt,Re),te()}),K.addEventListener("click",()=>{Re=li({...Re,dot:!Re.dot}),$e(Mt,Re),te()}),de.addEventListener("click",()=>{Re=li({...Re,outline:!Re.outline}),$e(Mt,Re),te()}),i.querySelectorAll("#s3-scene-row [data-scene]").forEach(E=>{E.addEventListener("click",()=>{const O=E.dataset.scene??Lp;if(O===n.id){rn(`场景：${n.name}`);return}try{localStorage.setItem("jg.slice3d.scene",O)}catch{}const se=Io(O);rn(`场景切换到「${se.name}」，正在重建…`),window.setTimeout(()=>window.location.reload(),550)})}),Z(),te();const he="jg.slice3d.autofullscreen";let Ce=!0;try{Ce=localStorage.getItem(he)!=="window"}catch{Ce=!0}const ve=i.querySelector("#s3-fs-row"),fe=()=>{ve.querySelectorAll("[data-fs]").forEach(E=>E.classList.toggle("is-on",E.dataset.fs==="auto"===Ce))};ve.querySelectorAll("[data-fs]").forEach(E=>{E.addEventListener("click",()=>{Ce=E.dataset.fs==="auto";try{localStorage.setItem(he,Ce?"auto":"window")}catch{}fe(),rn(Ce?"战斗画面：进入时自动全屏":"战斗画面：只在窗口内")})}),fe();const xe=new hp({canvas:s,antialias:Ne==="high"}),Ue=xe.getContext(),Ve=Ue.getExtension("WEBGL_debug_renderer_info"),F=String(Ve?Ue.getParameter(Ve.UNMASKED_RENDERER_WEBGL):Ue.getParameter(Ue.RENDERER)),pe=/swiftshader|software|basic render|llvmpipe|microsoft basic/i.test(F);xe.setPixelRatio(1),xe.shadowMap.enabled=Ne==="high",xe.shadowMap.type=1;const Y=new Hl;Y.background=new et(855826),Y.fog=new ca(855826,n.fog.near,n.fog.far);const Q=new hn(75,1,.05,200);Q.position.set(n.player.x,zt.eyeHeight,n.player.z),Q.rotation.order="YXZ",Y.add(new uc(9078136,.35)),Y.add(new oc(16769200,1711394,.45));const ue=new dc(16765600,1.15);ue.position.set(7.5,5.5,3.5),ue.castShadow=Ne==="high",ue.shadow.mapSize.set(1024,1024),ue.shadow.camera.near=.5,ue.shadow.camera.far=40,ue.shadow.camera.left=-12,ue.shadow.camera.right=12,ue.shadow.camera.top=10,ue.shadow.camera.bottom=-6,Y.add(ue);const ae=new na(16763274,6,14,2);ae.position.set(0,2.4,n.door.z-.4),Y.add(ae);const ye=Np(n);Y.add(ye.root);let Pe=[];const gt=()=>{Pe=ye.walls.map(E=>new zi().setFromObject(E))},je=[...n.spawns],Yt=(E,O)=>{const se=new I;for(const le of Pe){if(le.min.y>zt.eyeHeight+.15||le.max.y<.05)continue;const _e=Math.max(le.min.x,Math.min(E.x,le.max.x)),ze=Math.max(le.min.z,Math.min(E.z,le.max.z)),Be=E.x-_e,Ge=E.z-ze,ke=Be*Be+Ge*Ge;if(!(ke>O*O))if(ke>1e-6){const Ie=Math.sqrt(ke),mt=(O-Ie)/Ie;E.x+=Be*mt,E.z+=Ge*mt,se.x+=Be*mt,se.z+=Ge*mt}else{const Ie=E.x-le.min.x,mt=le.max.x-E.x,De=E.z-le.min.z,it=le.max.z-E.z,It=Math.min(Ie,mt,De,it);It===Ie?(se.x-=le.min.x-O-E.x,E.x=le.min.x-O):It===mt?(se.x+=le.max.x+O-E.x,E.x=le.max.x+O):It===De?(se.z-=le.min.z-O-E.z,E.z=le.min.z-O):(se.z+=le.max.z+O-E.z,E.z=le.max.z+O)}}return se},tn=(E,O)=>{let se=null,le=4;for(const _e of Pe){const ze=_e.getCenter(new I),Be=Math.hypot(ze.x-E,ze.z-O);Be<le&&(le=Be,se=_e)}return se},ar=(E,O,se)=>{const le=tn(E,O),_e=new I(E,0,O);if(!le)return _e;const ze=new I(E-Q.position.x,0,O-Q.position.z);ze.lengthSq()<1e-4&&ze.set(0,0,1),ze.normalize();for(let Be=0;Be<60&&(_e.x>le.min.x-se&&_e.x<le.max.x+se&&_e.z>le.min.z-se&&_e.z<le.max.z+se);Be++)_e.addScaledVector(ze,.08);return _e},ds="jg.slice3d.cover",on={on:(localStorage.getItem(ds)??"on")!=="off"};let kn=[];const hi=()=>{for(const E of kn){Y.remove(E);const O=ye.walls.indexOf(E);O>=0&&ye.walls.splice(O,1)}if(kn=[],on.on){const E=n.playerCover,O=Xt({color:9077106,roughness:.92}),se=new pt(new yt(E.w,E.h,E.d),O);se.position.set(E.x,E.h/2,E.z),se.castShadow=!0,se.receiveShadow=!0,se.userData.isPlayerCover=!0,Y.add(se),kn.push(se),ye.walls.push(se)}g.classList.toggle("is-on",on.on),v.classList.toggle("is-on",!on.on),localStorage.setItem(ds,on.on?"on":"off"),gt()};hi();const Ln=new Xr,Hi=()=>{const E=ce.group,O=E.position.y+1.63*E.scale.y,se=_n.set(E.position.x,O,E.position.z),le=jn.copy(Q.position).sub(se),_e=le.length();return Ln.set(se,le.normalize()),Ln.far=_e,Ln.intersectObjects(ye.walls,!1).length===0},_n=new I,jn=new I,us=new I,hs=new I,Hn=(E,O)=>{const se=ce.group,le=_n.set(E,se.position.y+1.63*se.scale.y,O),_e=jn.copy(Q.position).sub(le),ze=_e.length();return Ln.set(le,_e.normalize()),Ln.far=ze,Ln.intersectObjects(ye.walls,!1).length===0},ei=()=>{const E=ce.group,O=Oe(),se=bn.lengthSq()>.16?O.lead:0,le=Q.position.x+bn.x*se-E.position.x,_e=Q.position.z+bn.z*se-E.position.z;Math.hypot(le,_e)<.05||(E.rotation.y=Math.atan2(le,_e)+Math.PI)},ti=(E,O,se)=>{const le=ce.group,_e=_n.set(E.x-le.position.x,0,E.z-le.position.z);if(_e.length()<.15)return!0;_e.normalize(),le.position.addScaledVector(_e,O*se);const Be=Yt(le.position,.4);if(Be.lengthSq()>1e-6){const ke=jn.copy(Be).normalize(),Ie=us.copy(_e).sub(hs.copy(ke).multiplyScalar(_e.dot(ke)));Ie.lengthSq()>1e-6&&le.position.addScaledVector(Ie.normalize(),O*se*.85)}ei(),M.walkPhase+=se*7;const Ge=Math.sin(M.walkPhase)*.5;return ce.leftLeg.rotation.x=Ge,ce.rightLeg.rotation.x=-Ge,ce.leftArm.rotation.x=-Ge*.5,ce.rightArm.rotation.x=Ge*.5,!M.crouch&&le.scale.y<1&&(le.scale.y=Math.min(1,le.scale.y+se*2.2),le.position.y=-.06*(1-le.scale.y)/.14),!1},Vi=()=>{const E=ce.group,O=tn(E.position.x,E.position.z),se=O?O.getCenter(new I):E.position.clone(),le=O?(O.max.x-O.min.x)/2:.6,_e=[];for(const ke of[-1,1])for(const Ie of[.7,1.2,1.8])_e.push(new I(se.x+ke*(le+Ie),0,E.position.z));const ze=new I(Q.position.x-E.position.x,0,Q.position.z-E.position.z).normalize();_e.push(E.position.clone().addScaledVector(ze,1));const Be=_e.filter(ke=>Hn(ke.x,ke.z)&&Yt(ke.clone(),.42).lengthSq()<1e-6&&!M.badSpots.some(Ie=>Ie.distanceTo(ke)<.7)),Ge=Be.length>0?Be:_e;return Ge.sort((ke,Ie)=>ke.distanceTo(E.position)-Ie.distanceTo(E.position)),Ge[0]},Dn=new Xr,fi=E=>{const O=new I(E.x,zt.spawn.headHeight,E.z),se=Q.position.clone(),le=[new I(0,0,0),new I(.35,0,0),new I(-.35,0,0),new I(0,.2,0)];for(const _e of le){const ze=se.clone().add(_e),Be=O.clone().sub(ze),Ge=Be.length();if(Dn.set(ze,Be.normalize()),Dn.far=Ge,Dn.intersectObjects(ye.walls,!1).length===0)return!0}return!1},Wi=()=>{const E=Q.position.x,O=Q.position.z,se=je.filter(Ie=>Ie.z>O-1.5||Math.hypot(Ie.x-E,Ie.z-O)<zt.spawn.minDistance?!1:!fi(new I(Ie.x,0,Ie.z))),le=je.filter(Ie=>Ie.z<=n.door.z),_e=se.length>0?se:le.length>0?le:je,ze=_e.map(Ie=>Ip(Me,Ie.tier)),Be=ze.reduce((Ie,mt)=>Ie+mt,0);let Ge=Math.random()*Be,ke=_e[_e.length-1];for(let Ie=0;Ie<_e.length;Ie++)if(Ge-=ze[Ie],Ge<=0){ke=_e[Ie];break}return{...ke,fallback:se.length===0}},Xi=(()=>{const E=n.proc;if(!E||E.count<=0)return 0;const O=n.room.w/2,se=n.player.z-E.minDist,le=n.player.z-E.maxDist;if(se<=le)return 0;const _e=Xt({color:n.colors.prop,roughness:.86}),ze=n.props.map(Ge=>({x:Ge.x,z:Ge.z}));let Be=0;for(let Ge=0;Ge<E.count*40&&Be<E.count;Ge++){const ke=le+Math.random()*(se-le),Ie=O-3.6,mt=-Ie+Math.random()*Ie*2;if(Math.abs(mt)<E.keepDoor&&ke<n.door.z+14||ze.some(Rt=>Math.hypot(Rt.x-mt,Rt.z-ke)<E.minGap))continue;const De=1.8+Math.random()*.7,it=1.9+Math.random()*.25,It=1.3+Math.random()*.5,_t=new pt(new yt(De,it,It),_e);if(_t.position.set(mt,it/2,ke),_t.castShadow=!0,_t.receiveShadow=!0,_t.userData.isCover=!0,ye.root.add(_t),ye.walls.push(_t),gt(),fi(new I(mt,0,ke))){ye.root.remove(_t);const Rt=ye.walls.indexOf(_t);Rt>=0&&ye.walls.splice(Rt,1),gt();continue}const $t=Math.hypot(mt-n.player.x,ke-n.player.z),Qt=$t<18?0:$t<25?1:$t<32?2:3;je.push({id:`随机位${Be+1}`,x:mt,z:ke,tier:Qt}),ze.push({x:mt,z:ke}),Be++}return Be})(),qi=i.querySelector(`#s3-scene-row [data-scene="${n.id}"] .s3-scene-txt em`);qi&&(qi.innerHTML=`${n.desc}<br>${n.range}　·　刷新点 ${n.spawns.length} 固定${Xi>0?` + ${Xi} 随机`:""}`);const x=Up();x.position.set(.16,-.17,-.34),x.rotation.set(0,.04,0),Q.add(x),Y.add(Q);const D=x.getObjectByName("mag"),q=x.getObjectByName("charging"),k=D.position.clone(),H=D.rotation.x,Se=q.position.clone(),be=new na(16765562,0,6,2);be.position.set(0,.01,-1.58),x.add(be);const ge=new pt(new ls(.09,12),new Qn({color:16769162,transparent:!0,opacity:0}));ge.position.set(0,.01,-1.58),x.add(ge);let ce=Oo();Y.add(ce.group);const Te=[ce];let Xe=0;const Ze=E=>{for(const O of ce.materials){const se=O.emissive;se&&se.setHex(E)}},M={state:"hidden",hp:tr.maxHp,timer:0,peekTargetX:0,peekPos:new I(0,0,0),coverName:"",crouch:!1,aimPose:0,blocked:0,speedJitter:1,strafeShoot:!1,strafeDir:1,strafeSeconds:0,peekOffset:1,strafeNextChange:.4,strafePauseT:0,strafeWaitT:0,crouchHold:0,paceFactor:1,bodyHits:0,sameOffsetHits:0,canChangeCover:!1,feintPlan:!1,feintPhase:0,feintPos:new I,feintPos2:new I,coverPos:new I,waypoint:null,path:[],firingSpot:null,badSpots:[],stallT:0,pathStallT:0,counters:{feints:0,coverChanges:0,repeeks:0,strafeReversals:0,crouchToggles:0,wideSwings:0},dieProgress:0,walkPhase:0},st=(E=!1)=>{const O=Oe(),se=O.peekSet;return!se||se.length===0?1:E&&Math.random()<Math.max(O.wideBias,.5)?se[se.length-1]:se[Math.floor(Math.random()*se.length)]};let Tt=0;const xt=new I;let dt={seq:0,visible:!0,distance:0,cover:"",difficulty:"normal",fallback:!1,cameraY:0,x:0,z:0};const Ot=()=>{if(Te.length>1){Xe=(Xe+1)%Te.length,ce=Te[Xe];for(const mt of Te)mt!==ce&&(mt.group.visible=!1)}const E=Oe(),O=Wi(),se=st(Math.random()<E.wideBias),le=Math.random()<.5?-1:1;M.state="hidden",M.hp=tr.maxHp,M.timer=.6+Math.random()*1.6,M.coverName=O.id,$(`敌人刷新：${O.id}（难度 ${Me}）`),M.crouch=Math.random()<E.crouch,M.speedJitter=1+(Math.random()*2-1)*E.jitter,M.strafeShoot=E.strafeShoot,M.canChangeCover=E.coverChange,M.strafeSeconds=0,M.peekOffset=se,M.strafeNextChange=.25+Math.random()*.45,M.strafePauseT=0,M.strafeWaitT=0,M.crouchHold=0,M.bodyHits=0,M.sameOffsetHits=0;const _e=Math.random();M.paceFactor=_e<E.paceRush?.62:_e<E.paceRush+E.paceHold?1.45:1,Tt=0,M.feintPlan=E.feint&&(E.feintDouble||Math.random()<.65),M.feintPhase=0,M.aimPose=0,M.blocked=0;const ze=ar(O.x,O.z,.42),Be=ze.x,Ge=ze.z;M.coverPos.set(Be,0,Ge);const ke=Math.sign(Q.position.z-Ge)||1;M.peekTargetX=O.x+le*se,M.peekPos.set(M.peekTargetX,0,O.z+ke*(.9+Math.random()*.8)),M.feintPos.set(O.x+le*.35,0,O.z+ke*.35),M.feintPos2.set(O.x+le*.6,0,O.z+ke*.72);const Ie=[];if(O.z<=n.door.z)Ie.push(new I(0,0,n.door.z));else{const mt=tn(Be,Ge);if(mt){const De=mt.getCenter(new I),it=(mt.max.x-mt.min.x)/2,It=Math.sign(M.peekTargetX-De.x)||1,_t=De.x+It*(it+.55);Ie.push(new I(_t,0,De.z)),Ie.push(new I(_t,0,M.peekPos.z))}}M.path=Ie,M.firingSpot=null,M.badSpots=[],M.stallT=0,M.pathStallT=0,M.dieProgress=0,ce.group.visible=!0,ce.group.position.set(Be,0,Ge),ce.group.scale.set(1,.86,1),ce.group.position.y=-.06,dt={seq:dt.seq+1,visible:fi(new I(Be,0,Ge)),distance:+Math.hypot(Be-Q.position.x,Ge-Q.position.z).toFixed(2),cover:O.id,difficulty:Me,fallback:O.fallback,cameraY:+Q.position.y.toFixed(2),x:+Be.toFixed(2),z:+Ge.toFixed(2)},ce.group.rotation.set(0,0,0),ce.leftArm.rotation.set(0,0,0),ce.rightArm.rotation.set(0,0,0),ce.leftLeg.rotation.set(0,0,0),ce.rightLeg.rotation.set(0,0,0),Ze(0)};Ot();const we=(E,O,se)=>{const le=E-Q.position.x,_e=O-Q.position.y,ze=se-Q.position.z;Ke=Math.atan2(-le,-ze),Vt=Math.atan2(_e,Math.hypot(le,ze))};window.__slice3d={get enemy(){return ce},camera:Q,scene:Y,ai:M,aimAt:we,getBurst:()=>Wn,look:()=>({yaw:+Ke.toFixed(4),pitch:+Vt.toFixed(4)}),settings:()=>({sens:{...We},crosshair:{...Re}}),sceneInfo:()=>({id:n.id,name:n.name,room:{...n.room},spawns:je.length,fixedSpawns:n.spawns.length,procSpawns:Xi,spawnIds:je.map(E=>E.id),spawnCoords:je.map(E=>[+E.x.toFixed(1),+E.z.toFixed(1)]),walls:ye.walls.length,fog:[n.fog.near,n.fog.far],limits:{x:n.player.limitX,zmin:n.player.limitZmin,zmax:n.player.limitZmax},player:{x:+Q.position.x.toFixed(2),z:+Q.position.z.toFixed(2)}}),colliders:()=>Pe.map(E=>({min:[+E.min.x.toFixed(2),+E.min.y.toFixed(2),+E.min.z.toFixed(2)],max:[+E.max.x.toFixed(2),+E.max.y.toFixed(2),+E.max.z.toFixed(2)]})),rifle:x,parts:{mag:D,charging:q},perf:()=>({fps:+(ms/Math.max(.001,Yi)).toFixed(1),quality:Ne,dpr:xe.getPixelRatio(),calls:xe.info.render.calls,triangles:xe.info.render.triangles,shadows:xe.shadowMap.enabled,buffer:[xe.domElement.width,xe.domElement.height],longFrames:mi,maxFrameMs:+gs.toFixed(1),loopError:pi,recoveries:xs,renders:Sa,sinceRenderMs:+(performance.now()-ur).toFixed(0),spikes:sn,rawInput:!ne,gpu:F,gpuSoftware:pe,antialias:Ne==="high"}),resetMaxFrame:()=>{gs=0,mi=0},forceStall:()=>{_s=performance.now()-9999},setPlayer:(E,O)=>{cn.set(E,zt.eyeHeight,O),Q.position.set(E,zt.eyeHeight,O),bn.set(0,0,0)},setQuality:E=>{J=!1,xi(E)},reloadState:()=>({reloading:ot,magY:+D.position.y.toFixed(3),chargeZ:+q.position.z.toFixed(3)}),coverState:()=>({on:on.on,count:kn.length,los:Hi(),blocked:+M.blocked.toFixed(2)}),deaths:()=>nt.deaths,kills:()=>nt.kills,poolSize:()=>Te.length,forceKill:()=>{M.state!=="dead"&&(M.hp=0,M.state="dead",nt.kills++,vs++,wt!=null&&wt.appearAt&&gi.push(performance.now()-wt.appearAt),o.textContent=String(nt.kills),mr(!0),Le<999&&nt.kills>=Le&&Fa())},decals:()=>Ms.length,enemyClipCheck:()=>{const E=ce.group.position;for(const O of Pe){if(O.min.y>zt.eyeHeight+.15||O.max.y<.05)continue;const se=Math.max(O.min.x,Math.min(E.x,O.max.x)),le=Math.max(O.min.z,Math.min(E.z,O.max.z));if((E.x-se)**2+(E.z-le)**2<(.4*.6)**2)return!0}return!1},enemyInfo:()=>{const E=ce.group,O=Q.position.x-E.position.x,se=Q.position.z-E.position.z,le=Math.hypot(O,se),_e=-Math.sin(E.rotation.y),ze=-Math.cos(E.rotation.y),Be=le>.05?_e*(O/le)+ze*(se/le):1;return{state:M.state,x:+E.position.x.toFixed(2),z:+E.position.z.toFixed(2),distance:+le.toFixed(2),facingPlayer:+Be.toFixed(2),lineClear:Hn(E.position.x,E.position.z)}},probe:(E,O,se)=>{const le=Q.position.clone(),ze=new I(E,O,se).clone().sub(le),Be=ze.length();Dn.set(le,ze.normalize()),Dn.far=Be;const Ge=Dn.intersectObjects(ye.walls,!1);return{wallCount:ye.walls.length,hitCount:Ge.length,firstHit:Ge[0]?{dist:+Ge[0].distance.toFixed(2),far:+Be.toFixed(2)}:null}},spawnInfo:()=>({...dt,counters:{...M.counters},strafeSeconds:+M.strafeSeconds.toFixed(1),peekOffset:M.peekOffset,paceFactor:M.paceFactor,crouchHold:+M.crouchHold.toFixed(2),bodyHits:M.bodyHits,coverName:M.coverName}),setDifficulty:E=>{Me=E,localStorage.setItem(ie,E),Ae()}};const Dt=new Set;let Ke=0,Vt=0,nn=0,sn=0;const Vn=()=>Math.max(256,Math.round(We.dpi*.6));let ft=!1,Et=!1,Jt=Di.magSize,ot=!1,xn=0,Tn=0,Wn=0,or=0,ni=0,ln=!1,fs=0,ps=performance.now(),ms=0,Yi=0;const $i=[];let pi="",mi=0,gs=0,lr=!1,cr=!1,dr=[],_s=performance.now(),va=performance.now(),Sa=0,ur=performance.now(),xs=Number(localStorage.getItem("jg.slice3d.recoveries")??"0")||0,hr=!1;oe=(()=>{try{const E=localStorage.getItem("jg.slice3d.eventLog"),O=E?JSON.parse(E):[];return Array.isArray(O)?O.slice(-8):[]}catch{return[]}})(),$=E=>{oe.push(`${new Date().toLocaleTimeString("zh-CN")} ${E}`),oe.length>8&&oe.shift();try{localStorage.setItem("jg.slice3d.eventLog",JSON.stringify(oe))}catch{}};try{const E=localStorage.getItem("jg.slice3d.lastRecovery");E?(V.innerHTML=`<b>上次运行疑似冻结</b>：${E}<br>恢复次数：${xs}<br>冻结前最后动作：<br>${oe.map(O=>`· ${O}`).join("<br>")||"（无记录）"}`,localStorage.removeItem("jg.slice3d.lastRecovery")):V.textContent=""}catch{}const nt={shots:0,hits:0,kills:0,deaths:0,startedEpoch:Date.now(),startedPerf:performance.now()};let vs=0;const gi=[];let Ma=performance.now();const Ss=[],Ea=[];let wt=null;const cn=new I(n.player.x,zt.eyeHeight,n.player.z),bn=new I,Ms=[],Es=[],dl=new ls(.035,10),ul=new Qn({color:1184274,transparent:!0,opacity:.9}),hl=new Qn({color:16767392}),fr=new Qn({color:11018010}),ya=new Oi(.012,5,4),_i=new Xr,pr=(E,O,se,le=hl)=>{for(let _e=0;_e<se;_e++){const ze=new pt(ya,le);ze.position.copy(E);const Be=O.clone().multiplyScalar(1.2+Math.random()).add(new I((Math.random()-.5)*1.6,(Math.random()-.5)*1.6,(Math.random()-.5)*1.6));Y.add(ze),Es.push({mesh:ze,vel:Be,life:.35+Math.random()*.2})}},fl=(E,O)=>{const se=new pt(dl,ul);if(se.position.copy(E).addScaledVector(O,.012),se.lookAt(E.clone().add(O)),Y.add(se),Ms.push(se),Ms.length>40){const le=Ms.shift();le&&Y.remove(le)}},pl=()=>{var De,it,It,_t,$t;const E=performance.now();if(ot||Jt<=0){Bn.empty();return}Jt--,a.textContent=String(Jt);const O=bn.length()>.4;gp(O,E-or)&&(Wn=0),Wn++,or=E;const se=mp(Wn,window.innerWidth,O),le=_p(se),_e=75*Math.PI/360,ze=Math.atan(le.x/window.innerWidth*2*Math.tan(_e)*Q.aspect),Be=Math.atan(le.y/window.innerHeight*2*Math.tan(_e)),Ge=new I(0,0,-1).applyQuaternion(Q.quaternion).applyQuaternion(new ui().setFromEuler(new Cn(-Be,ze,0,"YXZ"))).normalize();_i.set(Q.getWorldPosition(new I),Ge);const ke=[...ye.walls,ce.group],Ie=_i.intersectObjects(ke,!0);nt.shots++,Ss.push({t:E-nt.startedPerf,hit:!1,head:!1,targetX:0,targetY:0,distX:0});const mt=Ss[Ss.length-1];if(ni=1,be.intensity=6,ge.material.opacity=.95,Bn.shot(),Ie.length>0){const Qt=Ie[0].object;let Rt=!1,At=Qt;for(;At;){if((De=At.userData)!=null&&De.isEnemy){Rt=!0;break}At=At.parent}const pn=Qt.userData.zone??"body";if(Rt&&M.state!=="dead"){const Mr=xp(pn==="head");M.hp=Math.max(0,M.hp-Mr),nt.hits++,ml(pn==="head"),gl(Ie[0].point,pn==="head"?"爆头":`-${Mr}`,pn==="head"?"#ffd24a":"#ff9a86"),mt.hit=!0,mt.head=pn==="head",wt&&(wt.shotsFired=(wt.shotsFired??0)+1,wt.firstShotAt==null&&(wt.firstShotAt=E,wt.firstShotHit=!0,wt.firstShotHead=pn==="head")),pn!=="head"&&M.hp>0&&Oe().repeatPeek&&(M.bodyHits++,(M.bodyHits===1||M.bodyHits===3)&&(Tt=1)),Ze(5574929),window.setTimeout(()=>Ze(0),110),pr(Ie[0].point,((it=Ie[0].face)==null?void 0:it.normal)??new I(0,1,0),6,fr),pn==="head"?Bn.headshot():Bn.hit(),M.hp<=0&&(M.state="dead",nt.kills++,$(`击杀 #${nt.kills}`),pn==="head"&&vs++,wt!=null&&wt.appearAt&&gi.push(E-wt.appearAt),o.textContent=String(nt.kills),Bn.killConfirm(nt.kills),rn(pn==="head"?"爆头击杀":`击杀（${M.hp===0?"身体":""}）`),pr(Ie[0].point,((It=Ie[0].face)==null?void 0:It.normal)??new I(0,1,0),14,fr),mr(!0),Le<999&&nt.kills>=Le&&Fa())}else fl(Ie[0].point,((_t=Ie[0].face)==null?void 0:_t.normal)??new I(0,1,0)),pr(Ie[0].point,(($t=Ie[0].face)==null?void 0:$t.normal)??new I(0,1,0),7),Bn.miss(),Oe().repeatPeek&&M.state!=="hidden"&&M.state!=="dead"&&(xt.set(ce.group.position.x,ce.group.position.y+1.15,ce.group.position.z),xt.dot(_i.ray.direction)-_i.ray.origin.dot(_i.ray.direction)>0&&_i.ray.distanceToPoint(xt)<.9&&(Tt=1))}Jt<=0&&Ta()},Ta=()=>{ot||(ot=!0,Tn=performance.now(),xn=Tn+Di.reloadMs,a.textContent="换弹中",Bn.reloadStart())},rn=E=>{h.textContent=E,h.className="s3-banner show",window.setTimeout(()=>{h.className="s3-banner"},850)},ml=E=>{d.classList.remove("hit","headhit"),d.offsetWidth,d.classList.add(E?"headhit":"hit")},gl=(E,O,se)=>{const le=E.clone().project(Q),_e=document.createElement("div");_e.className="s3-dmg-item",_e.textContent=O,_e.style.color=se,_e.style.left=`${(le.x+1)/2*100}%`,_e.style.top=`${(-le.y+1)/2*100}%`,f.appendChild(_e),window.setTimeout(()=>_e.remove(),700)},_l=()=>{wt={targetId:nt.kills+nt.deaths+1,appearAt:performance.now(),firstShotAt:null,firstShotHit:!1,firstShotHead:!1,shotsFired:0,killed:!1,killAt:null,escaped:!1,flickDistPx:null,preaimErrPx:null,displacementPx:0,trackMs:null,activeDurMs:null,attacked:!1}},mr=E=>{wt&&(wt.killed=E,wt.killAt=performance.now(),wt.escaped=!E,Ea.push(wt),wt=null)},ba=E=>{if(Dt.add(E.code),["KeyP","KeyC","KeyR","KeyF","Tab"].includes(E.code)&&E.preventDefault(),E.code==="KeyR"&&Ta(),E.code==="KeyF"&&La(),E.code==="KeyP"){J=!1;const O=Ne==="low"?"medium":Ne==="medium"?"high":"low";xi(O),rn(`画质：${O==="low"?"低（540p 级）":O==="medium"?"中（100 万像素）":"高（含阴影，需刷新页面生效）"}`)}E.code==="KeyC"&&(on.on=!on.on,hi(),rn(on.on?"掩体：开启":"掩体：关闭")),E.code==="Escape"&&Sl(),(E.code==="ControlLeft"||E.code==="ControlRight")&&(ft=!0)},Aa=E=>{Dt.delete(E.code),(E.code==="ControlLeft"||E.code==="ControlRight")&&(ft=!1)},wa=E=>{if(!ln||document.pointerLockElement!==s||performance.now()-nn<120)return;const O=Vn(),se=Number.isFinite(E.movementX)?E.movementX:0,le=Number.isFinite(E.movementY)?E.movementY:0;if(Math.abs(se)>O*3||Math.abs(le)>O*3){sn++,sn===1&&$(`鼠标位移尖峰 ${Math.round(se)}/${Math.round(le)} 计数（已丢弃）`);return}const ze=Math.max(-O,Math.min(O,se)),Be=Math.max(-O,Math.min(O,le)),Ge=ol(We)*Math.PI/180;Ke-=ze*Ge,Vt=Math.max(-1.1,Math.min(1.1,Vt-Be*Ge))},Ra=E=>{E.button===0&&(Et=!0)},Ca=E=>{E.button===0&&(Et=!1)};document.addEventListener("keydown",ba),document.addEventListener("keyup",Aa),document.addEventListener("mousemove",wa),document.addEventListener("mousedown",Ra),document.addEventListener("mouseup",Ca);const Xn=()=>{const E=i.clientWidth||window.innerWidth,O=i.clientHeight||window.innerHeight,se=lt[Ne],le=Math.sqrt(se/Math.max(1,E*O)),_e=Math.max(.5,Math.min(window.devicePixelRatio,le));xe.setPixelRatio(_e),xe.setSize(E,O,!1),Q.aspect=E/O,Q.updateProjectionMatrix()},gr=i.querySelector(".slice3d")??i;let _r=0;const Pa=async()=>{if(document.fullscreenElement===gr)return!0;try{return await gr.requestFullscreen(),_r=performance.now(),!0}catch{return!1}},La=async()=>{if(document.fullscreenElement){try{await document.exitFullscreen(),rn("已退出全屏")}catch{rn("退出全屏失败")}return}const E=await Pa();rn(E?"已进入全屏（Esc 退出）":"当前环境不允许全屏，请用浏览器菜单的 F11")},xl=()=>{Xn(),window.setTimeout(Xn,120),window.setTimeout(Xn,420)},Da=()=>{xl(),document.fullscreenElement===gr&&(nn=performance.now())};document.addEventListener("fullscreenchange",Da),window.addEventListener("resize",Xn),s.addEventListener("webglcontextlost",E=>{E.preventDefault(),pi="WebGL 上下文丢失（显存或驱动问题）",ys("图形上下文丢失")}),s.addEventListener("webglcontextrestored",()=>{pi=""});const ys=E=>{if(!hr){if(hr=!0,xs++,localStorage.setItem("jg.slice3d.recoveries",String(xs)),Ce&&_r>0&&performance.now()-_r<3e3){Ce=!1;try{localStorage.setItem(he,"window")}catch{}fe()}try{localStorage.setItem("jg.slice3d.lastRecovery",`${E} · ${new Date().toLocaleString("zh-CN")}`)}catch{}try{rn(`${E}，正在自动恢复…`)}catch{}window.setTimeout(()=>window.location.reload(),900)}};window.setInterval(()=>{if(hr)return;const E=performance.now();if(!ln){!w.classList.contains("hidden")&&E-_s>6e3&&ys("加载阶段停摆（浏览器没有送帧）");return}if(E-_s>2500){ys("主循环停摆（浏览器没有送帧）");return}E-ur>2e3&&ys("渲染停摆（主循环在跑但画面没更新）")},1e3);const Ia=new ResizeObserver(()=>Xn());Ia.observe(i),Xn(),(()=>{try{xe.compile(Y,Q),xe.render(Y,Q)}catch{}})();const xi=E=>{Ne=E,$(`画质 → ${E}`),localStorage.setItem("jg.slice3d.quality",E),ae.intensity=E==="low"?3:6,Xn()};xi(Ne);const xr=()=>new Promise(E=>requestAnimationFrame(()=>E())),Ts=(E=500)=>new Promise(O=>{let se=!1;const le=()=>{se||(se=!0,O())};requestAnimationFrame(le),window.setTimeout(le,E)}),bs=(E,O)=>{const se=Math.round(Math.max(0,Math.min(1,E))*100);b.style.width=`${se}%`,S.textContent=`${se}%`,C.textContent=O},vl=async E=>{for(;Te.length<E;){const O=Oo();O.group.visible=!1,Y.add(O.group),Te.push(O),bs(Te.length/E*.55,`构建敌人模型 ${Te.length}/${E}`),Te.length%3===0&&await Ts()}for(let O=0;O<Te.length;O++){const se=Te[O];se.group.visible=!0,se.group.position.set(0,0,Q.position.z-3.5),xe.render(Y,Q),se.group.visible=!1,se.group.position.set(0,0,0),bs(.55+O/Math.max(1,Te.length)*.35,`预编译着色器 ${O+1}/${Te.length}`),await Ts()}bs(.93,"预热命中特效…"),await Ts();for(let O=0;O<6;O++){const se=new pt(ya,fr);se.position.set(0,1.2,Q.position.z-3),Y.add(se),xe.render(Y,Q),Y.remove(se)}bs(1,"准备完成"),await Ts()},vr=()=>{nt.shots=0,nt.hits=0,nt.kills=0,nt.deaths=0,nt.startedEpoch=Date.now(),nt.startedPerf=performance.now(),vs=0,gi.length=0,Ma=performance.now(),o.textContent="0",l.textContent="--",c.textContent="100",a.textContent=String(Di.magSize),lr=!1,Ot()},Fa=()=>{lr=!0,ln=!1,Et=!1,document.pointerLockElement===s&&document.exitPointerLock();const E=(performance.now()-Ma)/1e3,O=nt.shots>0?nt.hits/nt.shots*100:0,se=nt.kills>0?vs/nt.kills*100:0,le=gi.length?gi.reduce((ze,Be)=>ze+Be,0)/gi.length:0,_e=[["击杀",`${nt.kills} / ${Le<999?Le:"∞"}`],["爆头击杀率",`${se.toFixed(1)}%`],["命中率",`${O.toFixed(1)}%`],["平均反应",`${le.toFixed(0)} ms`],["阵亡",String(nt.deaths)],["用时",`${E.toFixed(1)} s`]];P.innerHTML=_e.map(([ze,Be])=>`<div class="s3-score-row"><span>${ze}</span><b>${Be}</b></div>`).join(""),y.classList.remove("hidden")},Sr=()=>{r.classList.add("hidden"),re(),Ce&&!document.fullscreenElement&&Pa().then(E=>{E||$("自动全屏被浏览器拒绝")}),(async()=>(ee?vr():(w.classList.remove("hidden"),await vl(Math.min(Le,24)),w.classList.add("hidden"),ee=!0,vr(),$(`开始本局：敌人 ${Le}，画质 ${Ne}`),pe&&rn("检测到软件渲染（未使用显卡）→ 请在浏览器开启硬件加速")),ln=!0,ps=performance.now(),document.pointerLockElement!==s&&re()))()},Sl=()=>{if(ln=!1,Et=!1,cancelAnimationFrame(fs),document.pointerLockElement===s&&document.exitPointerLock(),document.fullscreenElement&&document.exitFullscreen(),nt.shots>0){const E=Mp({modeId:"positioning",sceneId:"3d-slice",sceneName:"3D 试验场景",difficultyId:"normal",difficultyName:"普通",profileId:"3d",profileName:"3D 切片",startedAt:nt.startedEpoch,durationMs:performance.now()-nt.startedPerf,shots:Ss,wastedShots:0,encounters:Ea});Tp(E)}e.onExit()};W.addEventListener("click",Sr),W.textContent="点击进入",W.disabled=!1,j&&Sr(),r.addEventListener("click",E=>{const O=E.target;O&&O.closest("button")&&O.closest("button")!==W||Sr()}),B.addEventListener("click",()=>{(async()=>{z.innerHTML="采样中…（3 秒，请勿操作）",r.classList.add("hidden"),await xr();for(let ke=0;ke<20;ke++)await xr();dr=[],cr=!0;const E=performance.now();for(;performance.now()-E<3e3;)await xr();cr=!1,r.classList.remove("hidden");const O=dr.slice().sort((ke,Ie)=>ke-Ie),se=ke=>O[Math.min(O.length-1,Math.floor(O.length*ke))]??0,le=O.reduce((ke,Ie)=>ke+Ie,0)/Math.max(1,O.length),_e=se(.95),ze=O[O.length-1]??0,Be=_e<=20?"✅ 机器完全跑得动（60 FPS 级）":_e<=33?"⚠️ 基本流畅，偶有掉帧":"❌ 渲染吃力（核显/软件渲染，或窗口分辨率过大）",Ge=xe.domElement;z.innerHTML=`
        <div class="s3-score-row"><span>版本</span><b>${ea}</b></div>
        <div class="s3-score-row"><span>渲染器</span><b>${F}</b></div>
        <div class="s3-score-row"><span>帧率</span><b>${(1e3/Math.max(.01,le)).toFixed(1)} FPS（均值）</b></div>
        <div class="s3-score-row"><span>帧时间 平均/P95/最差</span><b>${le.toFixed(1)} / ${_e.toFixed(1)} / ${ze.toFixed(1)} ms</b></div>
        <div class="s3-score-row"><span>渲染缓冲</span><b>${Ge.width} × ${Ge.height}</b></div>
        <div class="s3-score-row"><span>窗口 / DPR</span><b>${window.innerWidth}×${window.innerHeight} / ${window.devicePixelRatio}</b></div>
        <div class="s3-score-row"><span>画质</span><b>${Ne==="low"?"低":Ne==="medium"?"中":"高"}</b></div>
        <div class="s3-score-row"><span>结论</span><b>${Be}</b></div>
      `})()}),m.addEventListener("click",()=>void La()),g.addEventListener("click",()=>{on.on=!0,hi()}),v.addEventListener("click",()=>{on.on=!1,hi()}),_.addEventListener("click",()=>{y.classList.add("hidden"),vr(),ln=!0,ps=performance.now(),re()}),A.addEventListener("click",()=>{y.classList.add("hidden"),r.classList.remove("hidden")}),i.querySelector("#s3-quit").addEventListener("click",()=>{ln=!1,e.onExit()}),s.addEventListener("click",()=>{document.pointerLockElement!==s&&re()}),document.addEventListener("pointerlockchange",()=>{if(document.pointerLockElement===s){nn=performance.now();return}ln&&document.pointerLockElement!==s&&(r.classList.remove("hidden"),ln=!1)}),document.addEventListener("pointerlockerror",()=>{ne=!0});const Ua=()=>{fs=requestAnimationFrame(Ua);try{Ml()}catch(E){pi=E instanceof Error?E.message:String(E)}},Ml=()=>{const E=performance.now();if(_s=E,E-va<15.5)return;va=E;const O=Math.min(.05,(E-ps)/1e3);if(ps=E,O>=.9&&(mi++,Ne!=="low"&&xi("low")),O>.4&&mi++,O*1e3>gs&&(gs=O*1e3),cr&&dr.push(O*1e3),!ln)return;ln&&document.pointerLockElement!==s?U.classList.remove("hidden"):U.classList.add("hidden"),Q.rotation.set(Vt,Ke,0);const se=new I(-Math.sin(Ke),0,-Math.cos(Ke)),le=new I(Math.cos(Ke),0,-Math.sin(Ke)),_e=new I;Dt.has("KeyW")&&_e.add(se),Dt.has("KeyS")&&_e.sub(se),Dt.has("KeyD")&&_e.add(le),Dt.has("KeyA")&&_e.sub(le),_e.lengthSq()>0&&_e.normalize().multiplyScalar(zt.moveSpeed),bn.lerp(_e,Math.min(1,O*12)),cn.addScaledVector(bn,O),bn.length()>.4&&(Wn=0),cn.x=Math.max(-n.player.limitX,Math.min(n.player.limitX,cn.x)),cn.z=Math.max(n.player.limitZmin,Math.min(n.player.limitZmax,cn.z));const ze=ft?zt.crouchHeight:zt.eyeHeight;Q.position.set(cn.x,ze+Math.sin(E*.002)*.006,cn.z),Q.position.y+=(ze-Q.position.y)*Math.min(1,O*10),Yt(cn,.38).lengthSq()>1e-6&&(bn.multiplyScalar(.35),Q.position.x=cn.x,Q.position.z=cn.z),ni=Math.max(0,ni-O*6.5);const Be=-bn.x*.012;let Ge=0,ke=0,Ie=0,mt=0;if(ot){const De=Math.min(1,(E-Tn)/Di.reloadMs);if(Ge=De<.25?De/.25:De>.75?(1-De)/.25:1,De>=.2&&De<.45){const it=(De-.2)/.25;ke=-.55*it,Ie=1.1*it}else if(De>=.45&&De<.55)ke=-.55,Ie=1.1;else if(De>=.55&&De<.8){const it=(De-.55)/.25;ke=-.55*(1-it),Ie=1.1*(1-it)}De>=.8&&De<.95&&(mt=Math.sin((De-.8)/.15*Math.PI)*.085)}D.position.set(k.x,k.y+ke,k.z),D.rotation.x=H+Ie,q.position.set(Se.x,Se.y,Se.z-mt),x.position.set(.16+Be,-.17+ni*.03+Ge*-.14,-.34+ni*.085+Ge*.02),x.rotation.set(ni*.16+Ge*.34,.04+Be*.5,ni*.05-Ge*.16),be.intensity=Math.max(0,be.intensity-O*90),ge.material.opacity=Math.max(0,ge.material.opacity-O*12),Et&&E-or>=Di.fireIntervalMs&&pl(),ot&&E>=xn&&(ot=!1,Jt=Di.magSize,a.textContent=String(Jt),Bn.reloadDone()),(()=>{const De=ce.group;if(Tt>0){Tt=0;const it=Oe();if(it.repeatPeek&&M.state!=="hidden"&&M.state!=="dead"){M.counters.repeeks++,M.sameOffsetHits++;const It=M.sameOffsetHits>=3;M.peekOffset=st(It),M.peekOffset>=Math.max(...it.peekSet)&&M.counters.wideSwings++;const _t=Math.sign(M.peekTargetX-M.coverPos.x)||1,$t=Math.random()<.7?-_t:_t,Qt=Math.sign(Q.position.z-M.coverPos.z)||1;M.peekTargetX=M.coverPos.x+$t*M.peekOffset,M.peekPos.set(M.peekTargetX,0,M.coverPos.z+Qt*(.9+Math.random()*.8)),M.firingSpot=new I(M.peekTargetX,0,M.peekPos.z),M.badSpots.length=0,M.aimPose=0,M.strafePauseT=0,M.crouchHold=0,M.path=[M.coverPos.clone()],M.state="walking"}}if(M.state==="hidden")M.timer-=O,M.timer<=0&&!lr&&(M.state=M.feintPlan?"feinting":"walking",_l());else if(M.state==="feinting"){const it=Oe();if(M.feintPhase===1){M.timer-=O,ei(),ce.leftLeg.rotation.x=0,ce.rightLeg.rotation.x=0,M.timer<=0&&(M.feintPhase=2);return}const _t=(M.feintPhase===3?M.feintPos2:M.feintPhase===0?M.feintPos:M.coverPos).clone().sub(De.position);if(_t.length()>.05){_t.normalize(),De.position.addScaledVector(_t,zt.enemySpeed*1.6*M.speedJitter*O),De.rotation.y=Math.atan2(_t.x,_t.z)+Math.PI,M.walkPhase+=O*9;const At=Math.sin(M.walkPhase)*.5;ce.leftLeg.rotation.x=At,ce.rightLeg.rotation.x=-At;return}if(M.feintPhase===0){M.feintPhase=1,M.timer=.16+Math.random()*.22,ei();return}if(M.feintPhase===2&&it.feintDouble){M.feintPhase=3;return}if(M.counters.feints++,M.canChangeCover&&Math.random()<.45){const At=Wi();M.coverName=At.id,M.coverPos.set(At.x,0,At.z),M.path=[new I(At.x,0,At.z)],M.firingSpot=null,M.badSpots.length=0,M.counters.coverChanges++,dt={seq:dt.seq+1,visible:fi(new I(At.x,0,At.z)),distance:+Math.hypot(At.x-Q.position.x,At.z-Q.position.z).toFixed(2),cover:At.id,difficulty:Me,fallback:At.fallback,cameraY:+Q.position.y.toFixed(2),x:+At.x.toFixed(2),z:+At.z.toFixed(2)}}M.peekOffset=st(!0);const Qt=Math.random()<.5?-1:1,Rt=Math.sign(Q.position.z-M.coverPos.z)||1;M.peekTargetX=M.coverPos.x+Qt*M.peekOffset,M.peekPos.set(M.peekTargetX,0,M.coverPos.z+Rt*(.9+Math.random()*.8)),M.peekOffset>=Math.max(...it.peekSet)&&M.counters.wideSwings++,M.firingSpot=new I(M.peekTargetX,0,M.peekPos.z),M.badSpots.length=0,M.feintPlan=!1,M.state="walking"}else if(M.state==="walking"){const it=zt.enemySpeed*M.speedJitter;if(M.path.length>0){const Qt=M.path[0],Rt=Math.hypot(Qt.x-De.position.x,Qt.z-De.position.z);ti(Qt,it,O)&&M.path.shift();const At=Math.hypot(Qt.x-De.position.x,Qt.z-De.position.z);M.pathStallT=At<Rt-.02?0:M.pathStallT+O,M.pathStallT>1.5&&(M.pathStallT=0,M.path.shift());return}M.firingSpot||(M.firingSpot=Vi());const It=M.firingSpot.distanceTo(De.position),_t=ti(M.firingSpot,it,O),$t=M.firingSpot.distanceTo(De.position);M.stallT=$t<It-.02?0:M.stallT+O,M.stallT>1.2&&(M.badSpots.push(M.firingSpot.clone()),M.firingSpot=Vi(),M.stallT=0),(_t||Hn(De.position.x,De.position.z))&&(M.state="aiming",M.timer=(zt.enemyAimTime[0]+Math.random()*(zt.enemyAimTime[1]-zt.enemyAimTime[0]))*M.paceFactor,M.strafeWaitT=0,ce.leftLeg.rotation.x=0,ce.rightLeg.rotation.x=0,ei(),M.crouch&&(De.scale.set(1,.86,1),De.position.y=-.06))}else if(M.state==="aiming"){if(M.aimPose=Math.min(1,M.aimPose+O*3),ce.leftArm.rotation.x=-1.25*M.aimPose,ce.rightArm.rotation.x=-1.35*M.aimPose,M.strafeShoot){const Rt=Oe();M.strafeSeconds+=O,M.strafePauseT>0?M.strafePauseT-=O:(M.strafeNextChange-=O,M.strafeNextChange<=0&&(Math.abs(De.position.x)>5.6?M.strafeDir=-M.strafeDir:Math.random()<Rt.strafePause?(M.strafePauseT=.1+Math.random()*.18,M.strafeWaitT=0):(M.strafeDir=-M.strafeDir,M.counters.strafeReversals++),M.strafeNextChange=.25+Math.random()*.45),De.position.x+=M.strafeDir*1.15*O,Math.abs(De.position.x)>5.6&&(M.strafeDir=-M.strafeDir),Yt(De.position,.4))}const it=Oe();M.crouchHold>0?M.crouchHold-=O:Math.random()<it.crouchSpam*O*1.3&&(M.crouchHold=.35+Math.random()*.55,M.counters.crouchToggles++);const _t=M.crouch||M.crouchHold>0?.86:1;Math.abs(De.scale.y-_t)>.002&&(De.scale.y+=(_t-De.scale.y)*Math.min(1,O*10),De.position.y=-.06*(1-De.scale.y)/.14);const $t=new I(cn.x-De.position.x,0,cn.z-De.position.z);if(De.rotation.y=Math.atan2($t.x,$t.z)+Math.PI,Hi()){if(M.timer-=O,M.blocked=0,M.timer>0||M.strafeShoot&&M.strafePauseT<=0&&(M.strafeWaitT+=O,M.strafeWaitT<.7))return;M.strafeWaitT=0,M.blocked=0,nt.deaths++,$(`玩家阵亡 #${nt.deaths}`),c.textContent="0",Bn.enemyShot(),document.body.classList.add("s3-hurt"),window.setTimeout(()=>document.body.classList.remove("s3-hurt"),260),wt&&(wt.attacked=!0,mr(!1)),M.timer=(zt.enemyAimTime[0]+Math.random()*(zt.enemyAimTime[1]-zt.enemyAimTime[0]))*M.paceFactor,window.setTimeout(()=>{c.textContent="100"},900)}else if(M.blocked+=O,M.blocked>.5&&(M.timer=Math.max(M.timer,Dp)),M.blocked>1.2){if(M.blocked=0,M.canChangeCover){const Rt=Wi();M.coverName=Rt.id,M.coverPos.set(Rt.x,0,Rt.z),M.counters.coverChanges++;const At=Math.random()<.5?-1:1,pn=st(!0);M.peekTargetX=Rt.x+At*pn,M.peekPos.set(M.peekTargetX,0,Rt.z+1.1+Math.random()*.9),M.path=[new I(Rt.x,0,Rt.z)],M.firingSpot=null,M.badSpots.length=0}else{const Rt=Math.random()<.5?-1:1;M.peekPos.x=Math.max(-5.6,Math.min(5.6,De.position.x+Rt*1.1))}M.state="walking"}}else M.state==="dead"&&(M.dieProgress=Math.min(1,M.dieProgress+O*1.1),De.rotation.x=-M.dieProgress*1.35,De.position.y=-M.dieProgress*.18,M.dieProgress>=1&&(M.timer+=O,M.timer>1&&Ot()))})();for(let De=Es.length-1;De>=0;De--){const it=Es[De];it.life-=O,it.vel.y-=4.5*O,it.mesh.position.addScaledVector(it.vel,O),it.life<=0&&(Y.remove(it.mesh),Es.splice(De,1))}if(l.textContent=nt.shots>0?`${Math.round(nt.hits/nt.shots*100)}%`:"--",ms++,Yi+=O,Yi>=.5){const De=ms/Yi,it=xe.info.render;if(u.textContent=`${De.toFixed(0)} FPS · ${(1e3/Math.max(1,De)).toFixed(1)} ms · ${it.calls} draws · ${(it.triangles/1e3).toFixed(1)}k tri · dpr ${xe.getPixelRatio().toFixed(2)} · 画质 ${Ne==="low"?"低":Ne==="medium"?"中":"高"}
GPU: ${F} · 鼠标输入 ${ne?"普通（系统加速可能介入）":"原始"}`+(pe?" ⚠ 软件渲染（未用显卡）":"")+(sn>0?` · 位移尖峰 ${sn}`:"")+(mi>0?` · 长卡 ${mi}`:"")+(pi?` · 异常：${pi}`:""),J&&ln&&($i.push(De),$i.length>=6)){const It=$i.reduce((_t,$t)=>_t+$t,0)/$i.length;It<45&&Ne==="high"?(xi("medium"),rn(`帧率 ${It.toFixed(0)}，已自动降到中等画质`)):It<40&&Ne==="medium"&&(xi("low"),rn(`帧率 ${It.toFixed(0)}，已自动降到低画质（关阴影）`)),$i.length=0}ms=0,Yi=0}xe.render(Y,Q),Sa++,ur=performance.now()};return fs=requestAnimationFrame(Ua),()=>{cancelAnimationFrame(fs),ln=!1,Ia.disconnect(),document.removeEventListener("fullscreenchange",Da),document.removeEventListener("keydown",ba),document.removeEventListener("keyup",Aa),document.removeEventListener("mousemove",wa),document.removeEventListener("mousedown",Ra),document.removeEventListener("mouseup",Ca),window.removeEventListener("resize",Xn),xe.dispose()}}export{Gp as mountThreeSlice};
