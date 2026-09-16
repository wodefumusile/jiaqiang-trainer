var oc=Object.defineProperty;var lc=(i,e,t)=>e in i?oc(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Ws=(i,e,t)=>lc(i,typeof e!="symbol"?e+"":e,t);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yn="srgb",gr="srgb-linear",_r="linear",Et="srgb";const go="300 es";function cc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dc(){const i=xr("canvas");return i.style.display="block",i}const _o={};function xo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ml(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function We(...i){i=Ml(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ut(...i){i=Ml(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Wi(...i){const e=i.join(" ");e in _o||(_o[e]=!0,We(...i))}function hc(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const uc={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};class gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wr=Math.PI/180,Ta=180/Math.PI;function vs(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function ct(i,e,t){return Math.max(e,Math.min(t,i))}function fc(i,e){return(i%e+e)%e}function Xr(i,e,t){return(1-t)*i+t*e}function rs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function cn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ua=class Ua{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ua.prototype.isVector2=!0;let st=Ua;class _i{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],d=r[a+0],g=r[a+1],v=r[a+2],E=r[a+3];if(f!==E||l!==d||c!==g||u!==v){let m=l*d+c*g+u*v+f*E;m<0&&(d=-d,g=-g,v=-v,E=-E,m=-m);let h=1-o;if(m<.9995){const A=Math.acos(m),C=Math.sin(A);h=Math.sin(h*A)/C,o=Math.sin(o*A)/C,l=l*h+d*o,c=c*h+g*o,u=u*h+v*o,f=f*h+E*o}else{l=l*h+d*o,c=c*h+g*o,u=u*h+v*o,f=f*h+E*o;const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],f=r[a],d=r[a+1],g=r[a+2],v=r[a+3];return e[t]=o*v+u*f+l*g-c*d,e[t+1]=l*v+u*d+c*f-o*g,e[t+2]=c*v+u*g+o*d-l*f,e[t+3]=u*v-o*f-l*d-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),f=o(r/2),d=l(n/2),g=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=d*u*f+c*g*v,this._y=c*g*f-d*u*v,this._z=c*u*v+d*g*f,this._w=c*u*f-d*g*v;break;case"YXZ":this._x=d*u*f+c*g*v,this._y=c*g*f-d*u*v,this._z=c*u*v-d*g*f,this._w=c*u*f+d*g*v;break;case"ZXY":this._x=d*u*f-c*g*v,this._y=c*g*f+d*u*v,this._z=c*u*v+d*g*f,this._w=c*u*f-d*g*v;break;case"ZYX":this._x=d*u*f-c*g*v,this._y=c*g*f+d*u*v,this._z=c*u*v-d*g*f,this._w=c*u*f+d*g*v;break;case"YZX":this._x=d*u*f+c*g*v,this._y=c*g*f+d*u*v,this._z=c*u*v-d*g*f,this._w=c*u*f-d*g*v;break;case"XZY":this._x=d*u*f-c*g*v,this._y=c*g*f-d*u*v,this._z=c*u*v+d*g*f,this._w=c*u*f+d*g*v;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(u-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>f){const g=2*Math.sqrt(1+n-o-f);this._w=(u-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>f){const g=2*Math.sqrt(1+o-n-f);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+u)/g}else{const g=2*Math.sqrt(1+f-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Oa=class Oa{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+l*c+a*f-o*u,this.y=n+l*u+o*c-r*f,this.z=s+l*f+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qr.copy(this).projectOnVector(e),this.sub(qr)}reflect(e){return this.sub(qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Oa.prototype.isVector3=!0;let I=Oa;const qr=new I,vo=new _i,Ba=class Ba{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],d=n[2],g=n[5],v=n[8],E=s[0],m=s[3],h=s[6],A=s[1],C=s[4],S=s[7],T=s[2],y=s[5],L=s[8];return r[0]=a*E+o*A+l*T,r[3]=a*m+o*C+l*y,r[6]=a*h+o*S+l*L,r[1]=c*E+u*A+f*T,r[4]=c*m+u*C+f*y,r[7]=c*h+u*S+f*L,r[2]=d*E+g*A+v*T,r[5]=d*m+g*C+v*y,r[8]=d*h+g*S+v*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,d=o*l-u*r,g=c*r-a*l,v=t*f+n*d+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/v;return e[0]=f*E,e[1]=(s*c-u*n)*E,e[2]=(o*n-s*a)*E,e[3]=d*E,e[4]=(u*t-s*l)*E,e[5]=(s*r-o*t)*E,e[6]=g*E,e[7]=(n*l-c*t)*E,e[8]=(a*t-n*r)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yr.makeScale(e,t)),this}rotate(e){return Wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yr.makeRotation(-e)),this}translate(e,t){return Wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ba.prototype.isMatrix3=!0;let Ke=Ba;const Yr=new Ke,So=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mo=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pc(){const i={enabled:!0,workingColorSpace:gr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Et&&(s.r=Xn(s.r),s.g=Xn(s.g),s.b=Xn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===""?_r:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[gr]:{primaries:e,whitePoint:n,transfer:_r,toXYZ:So,fromXYZ:Mo,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yn},outputColorSpaceConfig:{drawingBufferColorSpace:yn}},[yn]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:So,fromXYZ:Mo,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yn}}}),i}const lt=pc();function Xn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ci;class mc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ci===void 0&&(Ci=xr("canvas")),Ci.width=e.width,Ci.height=e.height;const s=Ci.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ci}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Xn(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xn(t[n]/255)*255):t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let gc=0;class Pa{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:gc++}),this.uuid=vs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push($r(s[a].image)):r.push($r(s[a]))}else r=$r(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?mc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}let _c=0;const Kr=new I;class an extends gi{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,n=1001,s=1001,r=1006,a=1008,o=1023,l=1009,c=an.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_c++}),this.uuid=vs(),this.name="",this.source=new Pa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kr).x}get height(){return this.source.getSize(Kr).y}get depth(){return this.source.getSize(Kr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=300;an.DEFAULT_ANISOTROPY=1;const za=class za{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],g=l[5],v=l[9],E=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-E)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+E)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,S=(g+1)/2,T=(h+1)/2,y=(u+d)/4,L=(f+E)/4,_=(v+m)/4;return C>S&&C>T?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=y/n,r=L/n):S>T?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=y/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=L/r,s=_/r),this.set(n,s,r,t),this}let A=Math.sqrt((m-v)*(m-v)+(f-E)*(f-E)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(m-v)/A,this.y=(f-E)/A,this.z=(d-u)/A,this.w=Math.acos((c+g+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ct(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};za.prototype.isVector4=!0;let Ft=za;class xc extends gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new an(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Pa(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends xc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yl extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class vc extends an{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const yr=class yr{constructor(e,t,n,s,r,a,o,l,c,u,f,d,g,v,E,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,f,d,g,v,E,m)}set(e,t,n,s,r,a,o,l,c,u,f,d,g,v,E,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=g,h[7]=v,h[11]=E,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yr().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Pi.setFromMatrixColumn(e,0).length(),r=1/Pi.setFromMatrixColumn(e,1).length(),a=1/Pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*u,g=a*f,v=o*u,E=o*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=g+v*c,t[5]=d-E*c,t[9]=-o*l,t[2]=E-d*c,t[6]=v+g*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,g=l*f,v=c*u,E=c*f;t[0]=d+E*o,t[4]=v*o-g,t[8]=a*c,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=g*o-v,t[6]=E+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,g=l*f,v=c*u,E=c*f;t[0]=d-E*o,t[4]=-a*f,t[8]=v+g*o,t[1]=g+v*o,t[5]=a*u,t[9]=E-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,g=a*f,v=o*u,E=o*f;t[0]=l*u,t[4]=v*c-g,t[8]=d*c+E,t[1]=l*f,t[5]=E*c+d,t[9]=g*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,g=a*c,v=o*l,E=o*c;t[0]=l*u,t[4]=E-d*f,t[8]=v*f+g,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=g*f+v,t[10]=d-E*f}else if(e.order==="XZY"){const d=a*l,g=a*c,v=o*l,E=o*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+E,t[5]=a*u,t[9]=g*f-v,t[2]=v*f-g,t[6]=o*u,t[10]=E*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sc,e,Mc)}lookAt(e,t,n){const s=this.elements;return fn.subVectors(e,t),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Zn.crossVectors(n,fn),Zn.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Zn.crossVectors(n,fn)),Zn.normalize(),Xs.crossVectors(fn,Zn),s[0]=Zn.x,s[4]=Xs.x,s[8]=fn.x,s[1]=Zn.y,s[5]=Xs.y,s[9]=fn.y,s[2]=Zn.z,s[6]=Xs.z,s[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],d=n[9],g=n[13],v=n[2],E=n[6],m=n[10],h=n[14],A=n[3],C=n[7],S=n[11],T=n[15],y=s[0],L=s[4],_=s[8],b=s[12],D=s[1],B=s[5],z=s[9],V=s[13],N=s[2],W=s[6],Z=s[10],Q=s[14],ce=s[3],Y=s[7],re=s[11],oe=s[15];return r[0]=a*y+o*D+l*N+c*ce,r[4]=a*L+o*B+l*W+c*Y,r[8]=a*_+o*z+l*Z+c*re,r[12]=a*b+o*V+l*Q+c*oe,r[1]=u*y+f*D+d*N+g*ce,r[5]=u*L+f*B+d*W+g*Y,r[9]=u*_+f*z+d*Z+g*re,r[13]=u*b+f*V+d*Q+g*oe,r[2]=v*y+E*D+m*N+h*ce,r[6]=v*L+E*B+m*W+h*Y,r[10]=v*_+E*z+m*Z+h*re,r[14]=v*b+E*V+m*Q+h*oe,r[3]=A*y+C*D+S*N+T*ce,r[7]=A*L+C*B+S*W+T*Y,r[11]=A*_+C*z+S*Z+T*re,r[15]=A*b+C*V+S*Q+T*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],g=e[14],v=e[3],E=e[7],m=e[11],h=e[15],A=l*g-c*d,C=o*g-c*f,S=o*d-l*f,T=a*g-c*u,y=a*d-l*u,L=a*f-o*u;return t*(E*A-m*C+h*S)-n*(v*A-m*T+h*y)+s*(v*C-E*T+h*L)-r*(v*S-E*y+m*L)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],g=e[11],v=e[12],E=e[13],m=e[14],h=e[15],A=t*o-n*a,C=t*l-s*a,S=t*c-r*a,T=n*l-s*o,y=n*c-r*o,L=s*c-r*l,_=u*E-f*v,b=u*m-d*v,D=u*h-g*v,B=f*m-d*E,z=f*h-g*E,V=d*h-g*m,N=A*V-C*z+S*B+T*D-y*b+L*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/N;return e[0]=(o*V-l*z+c*B)*W,e[1]=(s*z-n*V-r*B)*W,e[2]=(E*L-m*y+h*T)*W,e[3]=(d*y-f*L-g*T)*W,e[4]=(l*D-a*V-c*b)*W,e[5]=(t*V-s*D+r*b)*W,e[6]=(m*S-v*L-h*C)*W,e[7]=(u*L-d*S+g*C)*W,e[8]=(a*z-o*D+c*_)*W,e[9]=(n*D-t*z-r*_)*W,e[10]=(v*y-E*S+h*A)*W,e[11]=(f*S-u*y-g*A)*W,e[12]=(o*b-a*B-l*_)*W,e[13]=(t*B-n*b+s*_)*W,e[14]=(E*C-v*T-m*A)*W,e[15]=(u*T-f*C+d*A)*W,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,f=o+o,d=r*c,g=r*u,v=r*f,E=a*u,m=a*f,h=o*f,A=l*c,C=l*u,S=l*f,T=n.x,y=n.y,L=n.z;return s[0]=(1-(E+h))*T,s[1]=(g+S)*T,s[2]=(v-C)*T,s[3]=0,s[4]=(g-S)*y,s[5]=(1-(d+h))*y,s[6]=(m+A)*y,s[7]=0,s[8]=(v+C)*L,s[9]=(m-A)*L,s[10]=(1-(d+E))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Pi.set(s[0],s[1],s[2]).length();const o=Pi.set(s[4],s[5],s[6]).length(),l=Pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),En.copy(this);const c=1/a,u=1/o,f=1/l;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=u,En.elements[5]*=u,En.elements[6]*=u,En.elements[8]*=f,En.elements[9]*=f,En.elements[10]*=f,t.setFromRotationMatrix(En),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=2e3,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(n-s),d=(t+e)/(t-e),g=(n+s)/(n-s);let v,E;if(l)v=r/(a-r),E=a*r/(a-r);else if(o===2e3)v=-(a+r)/(a-r),E=-2*a*r/(a-r);else if(o===2001)v=-a/(a-r),E=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=2e3,l=!1){const c=this.elements,u=2/(t-e),f=2/(n-s),d=-(t+e)/(t-e),g=-(n+s)/(n-s);let v,E;if(l)v=1/(a-r),E=a/(a-r);else if(o===2e3)v=-2/(a-r),E=-(a+r)/(a-r);else if(o===2001)v=-1/(a-r),E=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};yr.prototype.isMatrix4=!0;let Nt=yr;const Pi=new I,En=new Nt,Sc=new I(0,0,0),Mc=new I(1,1,1),Zn=new I,Xs=new I,fn=new I,yo=new Nt,Eo=new _i;class Dn{constructor(e=0,t=0,n=0,s=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],f=s[2],d=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Eo.setFromEuler(this),this.setFromQuaternion(Eo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class La{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yc=0;const To=new I,Li=new _i,Gn=new Nt,qs=new I,as=new I,Ec=new I,Tc=new _i,bo=new I(1,0,0),Ao=new I(0,1,0),wo=new I(0,0,1),Ro={type:"added"},bc={type:"removed"},Di={type:"childadded",child:null},Zr={type:"childremoved",child:null};class Xt extends gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yc++}),this.uuid=vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new I,t=new Dn,n=new _i,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Nt},normalMatrix:{value:new Ke}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new La,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.multiply(Li),this}rotateOnWorldAxis(e,t){return Li.setFromAxisAngle(e,t),this.quaternion.premultiply(Li),this}rotateX(e){return this.rotateOnAxis(bo,e)}rotateY(e){return this.rotateOnAxis(Ao,e)}rotateZ(e){return this.rotateOnAxis(wo,e)}translateOnAxis(e,t){return To.copy(e).applyQuaternion(this.quaternion),this.position.add(To.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bo,e)}translateY(e){return this.translateOnAxis(Ao,e)}translateZ(e){return this.translateOnAxis(wo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qs.copy(e):qs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),as.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(as,qs,this.up):Gn.lookAt(qs,as,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),Li.setFromRotationMatrix(Gn),this.quaternion.premultiply(Li.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ut("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ro),Di.child=e,this.dispatchEvent(Di),Di.child=null):ut("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bc),Zr.child=e,this.dispatchEvent(Zr),Zr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ro),Di.child=e,this.dispatchEvent(Di),Di.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,e,Ec),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(as,Tc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Xt.DEFAULT_UP=new I(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mi extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ac={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const m=t.getJointPose(E,n),h=this._getHandJoint(c,E);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),g=.02,v=.005;c.inputState.pinching&&d>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ac)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const El={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function Qr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class nt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,lt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=lt.workingColorSpace){if(e=fc(e,1),t=ct(t,0,1),n=ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Qr(a,r,e+1/3),this.g=Qr(a,r,e),this.b=Qr(a,r,e-1/3)}return lt.colorSpaceToWorking(this,s),this}setStyle(e,t=yn){function n(r){r!==void 0&&parseFloat(r)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yn){const n=El[e.toLowerCase()];return n!==void 0?this.setHex(n,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yn){return lt.workingToColorSpace(Qt.copy(this),e),Math.round(ct(Qt.r*255,0,255))*65536+Math.round(ct(Qt.g*255,0,255))*256+Math.round(ct(Qt.b*255,0,255))}getHexString(e=yn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,s=Qt.g,r=Qt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=yn){lt.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,s=Qt.b;return e!==yn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Ys);const n=Xr(Jn.h,Ys.h,t),s=Xr(Jn.s,Ys.s,t),r=Xr(Jn.l,Ys.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new nt;nt.NAMES=El;class Da{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new nt(e),this.near=t,this.far=n}clone(){return new Da(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wc extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Tn=new I,kn=new I,jr=new I,Hn=new I,Ii=new I,Fi=new I,Co=new I,ea=new I,ta=new I,na=new I,ia=new Ft,sa=new Ft,ra=new Ft;class An{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Tn.subVectors(e,t),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Tn.subVectors(s,t),kn.subVectors(n,t),jr.subVectors(e,t);const a=Tn.dot(Tn),o=Tn.dot(kn),l=Tn.dot(jr),c=kn.dot(kn),u=kn.dot(jr),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,g=(c*l-o*u)*d,v=(a*u-o*l)*d;return r.set(1-g-v,v,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(a,Hn.y),l.addScaledVector(o,Hn.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ia.setScalar(0),sa.setScalar(0),ra.setScalar(0),ia.fromBufferAttribute(e,t),sa.fromBufferAttribute(e,n),ra.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ia,r.x),a.addScaledVector(sa,r.y),a.addScaledVector(ra,r.z),a}static isFrontFacing(e,t,n,s){return Tn.subVectors(n,t),kn.subVectors(e,t),Tn.cross(kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Tn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),Tn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return An.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;Ii.subVectors(s,n),Fi.subVectors(r,n),ea.subVectors(e,n);const l=Ii.dot(ea),c=Fi.dot(ea);if(l<=0&&c<=0)return t.copy(n);ta.subVectors(e,s);const u=Ii.dot(ta),f=Fi.dot(ta);if(u>=0&&f<=u)return t.copy(s);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ii,a);na.subVectors(e,r);const g=Ii.dot(na),v=Fi.dot(na);if(v>=0&&g<=v)return t.copy(r);const E=g*c-l*v;if(E<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(Fi,o);const m=u*v-g*f;if(m<=0&&f-u>=0&&g-v>=0)return Co.subVectors(r,s),o=(f-u)/(f-u+(g-v)),t.copy(s).addScaledVector(Co,o);const h=1/(m+E+d);return a=E*h,o=d*h,t.copy(n).addScaledVector(Ii,a).addScaledVector(Fi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ki{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(e.matrixWorld),this.expandByPoint(bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bn),bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Ks.subVectors(this.max,os),Ni.subVectors(e.a,os),Ui.subVectors(e.b,os),Oi.subVectors(e.c,os),Qn.subVectors(Ui,Ni),jn.subVectors(Oi,Ui),ci.subVectors(Ni,Oi);let t=[0,-Qn.z,Qn.y,0,-jn.z,jn.y,0,-ci.z,ci.y,Qn.z,0,-Qn.x,jn.z,0,-jn.x,ci.z,0,-ci.x,-Qn.y,Qn.x,0,-jn.y,jn.x,0,-ci.y,ci.x,0];return!aa(t,Ni,Ui,Oi,Ks)||(t=[1,0,0,0,1,0,0,0,1],!aa(t,Ni,Ui,Oi,Ks))?!1:(Zs.crossVectors(Qn,jn),t=[Zs.x,Zs.y,Zs.z],aa(t,Ni,Ui,Oi,Ks))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vn=[new I,new I,new I,new I,new I,new I,new I,new I],bn=new I,$s=new Ki,Ni=new I,Ui=new I,Oi=new I,Qn=new I,jn=new I,ci=new I,os=new I,Ks=new I,Zs=new I,di=new I;function aa(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){di.fromArray(i,r);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=e.dot(di),c=t.dot(di),u=n.dot(di);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const zt=new I,Js=new st;let Rc=0;class qn extends gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rc++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Js.fromBufferAttribute(this,t),Js.applyMatrix3(e),this.setXY(t,Js.x,Js.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=rs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rs(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rs(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rs(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),n=cn(n,this.array),s=cn(s,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Tl extends qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class bl extends qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ot extends qn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Cc=new Ki,ls=new I,oa=new I;class Ia{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Cc.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ls.subVectors(e,this.center);const t=ls.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ls,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ls.copy(e.center).add(oa)),this.expandByPoint(ls.copy(e.center).sub(oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Pc=0;const Sn=new Nt,la=new Xt,Bi=new I,pn=new Ki,cs=new Ki,Vt=new I;class gn extends gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pc++}),this.uuid=vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cc(e)?bl:Tl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ot(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Vt.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Vt),Vt.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Vt)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(pn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Vt.addVectors(pn.min,cs.min),pn.expandByPoint(Vt),Vt.addVectors(pn.max,cs.max),pn.expandByPoint(Vt)):(pn.expandByPoint(cs.min),pn.expandByPoint(cs.max))}pn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Vt.fromBufferAttribute(o,c),l&&(Bi.fromBufferAttribute(e,c),Vt.add(Bi)),s=Math.max(s,n.distanceToSquared(Vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new qn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new I,l[_]=new I;const c=new I,u=new I,f=new I,d=new st,g=new st,v=new st,E=new I,m=new I;function h(_,b,D){c.fromBufferAttribute(n,_),u.fromBufferAttribute(n,b),f.fromBufferAttribute(n,D),d.fromBufferAttribute(r,_),g.fromBufferAttribute(r,b),v.fromBufferAttribute(r,D),u.sub(c),f.sub(c),g.sub(d),v.sub(d);const B=1/(g.x*v.y-v.x*g.y);isFinite(B)&&(E.copy(u).multiplyScalar(v.y).addScaledVector(f,-g.y).multiplyScalar(B),m.copy(f).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(B),o[_].add(E),o[b].add(E),o[D].add(E),l[_].add(m),l[b].add(m),l[D].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let _=0,b=A.length;_<b;++_){const D=A[_],B=D.start,z=D.count;for(let V=B,N=B+z;V<N;V+=3)h(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const C=new I,S=new I,T=new I,y=new I;function L(_){T.fromBufferAttribute(s,_),y.copy(T);const b=o[_];C.copy(b),C.sub(T.multiplyScalar(T.dot(b))).normalize(),S.crossVectors(y,b);const B=S.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,B)}for(let _=0,b=A.length;_<b;++_){const D=A[_],B=D.start,z=D.count;for(let V=B,N=B+z;V<N;V+=3)L(e.getX(V+0)),L(e.getX(V+1)),L(e.getX(V+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new qn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,f=new I;if(e)for(let d=0,g=e.count;d<g;d+=3){const v=e.getX(d+0),E=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,E),a.fromBufferAttribute(t,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,E),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(E,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,g=t.count;d<g;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Vt.fromBufferAttribute(e,t),Vt.normalize(),e.setXYZ(t,Vt.x,Vt.y,Vt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let g=0,v=0;for(let E=0,m=l.length;E<m;E++){o.isInterleavedBufferAttribute?g=l[E]*o.data.stride+o.offset:g=l[E]*u;for(let h=0;h<u;h++)d[v++]=c[g++]}return new qn(d,u,f)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],g=e(d,n);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const g=c[f];u.push(g.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let d=0,g=f.length;d<g;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ca=new I,Lc=new I,Dc=new Ke;class ti{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ca.subVectors(n,t).cross(Lc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(ca),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Dc.getNormalMatrix(e),s=this.coplanarPoint(ca).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ic=0;class Zi extends gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ic++}),this.uuid=vs(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ti().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new st().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new st().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Wn=new I,da=new I,Qs=new I,js=new I;class Al{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){da.copy(e).add(t).multiplyScalar(.5),Qs.copy(t).sub(e).normalize(),js.copy(this.origin).sub(da);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Qs),o=js.dot(this.direction),l=-js.dot(Qs),c=js.lengthSq(),u=Math.abs(1-a*a);let f,d,g,v;if(u>0)if(f=a*l-o,d=a*o-l,v=r*u,f>=0)if(d>=-v)if(d<=v){const E=1/u;f*=E,d*=E,g=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;else d<=-v?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c):d<=v?(f=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),g=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),g=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(da).addScaledVector(Qs,d),g}intersectSphere(e,t){if(e.radius<0)return null;Wn.subVectors(e.center,this.origin);const n=Wn.dot(this.direction),s=Wn.dot(Wn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,g=e.z-a.z,v=t.x-a.x,E=t.y-a.y,m=t.z-a.z,h=n.x-a.x,A=n.y-a.y,C=n.z-a.z,S=Math.abs(l),T=Math.abs(c),y=Math.abs(u);let L,_,b,D,B,z,V,N,W,Z,Q,ce;if(S>=T&&S>=y?(b=l,z=f,W=v,ce=h,l>=0?(L=c,_=u,D=d,B=g,V=E,N=m,Z=A,Q=C):(L=u,_=c,D=g,B=d,V=m,N=E,Z=C,Q=A)):T>=y?(b=c,z=d,W=E,ce=A,c>=0?(L=u,_=l,D=g,B=f,V=m,N=v,Z=C,Q=h):(L=l,_=u,D=f,B=g,V=v,N=m,Z=h,Q=C)):(b=u,z=g,W=m,ce=C,u>=0?(L=l,_=c,D=f,B=d,V=v,N=E,Z=h,Q=A):(L=c,_=l,D=d,B=f,V=E,N=v,Z=A,Q=h)),b===0)return null;const Y=L/b,re=_/b,oe=1/b,Ne=D-Y*z,we=B-re*z,ft=V-Y*W,je=N-re*W,Ze=Z-Y*ce,J=Q-re*ce,se=Ze*je-J*ft,fe=Ne*J-we*Ze,He=ft*we-je*Ne;if(s){if(se<0||fe<0||He<0)return null}else if((se<0||fe<0||He<0)&&(se>0||fe>0||He>0))return null;const Ae=se+fe+He;if(Ae===0)return null;const Je=oe*(se*z+fe*W+He*ce);return(Ae>0?Je<0:Je>0)?null:this.at(Je/Ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ni extends Zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Po=new Nt,hi=new Al,er=new Ia,Lo=new I,tr=new I,nr=new I,ir=new I,ha=new I,sr=new I,Do=new I,rr=new I;class mt extends Xt{constructor(e=new gn,t=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){sr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],f=r[l];u!==0&&(ha.fromBufferAttribute(f,e),a?sr.addScaledVector(ha,u):sr.addScaledVector(ha.sub(t),u))}t.add(sr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),hi.copy(e.ray).recast(e.near),!(er.containsPoint(hi.origin)===!1&&(hi.intersectSphere(er,Lo)===null||hi.origin.distanceToSquared(Lo)>(e.far-e.near)**2))&&(Po.copy(r).invert(),hi.copy(e.ray).applyMatrix4(Po),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,E=d.length;v<E;v++){const m=d[v],h=a[m.materialIndex],A=Math.max(m.start,g.start),C=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let S=A,T=C;S<T;S+=3){const y=o.getX(S),L=o.getX(S+1),_=o.getX(S+2);s=ar(this,h,e,n,c,u,f,y,L,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let m=v,h=E;m<h;m+=3){const A=o.getX(m),C=o.getX(m+1),S=o.getX(m+2);s=ar(this,a,e,n,c,u,f,A,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,E=d.length;v<E;v++){const m=d[v],h=a[m.materialIndex],A=Math.max(m.start,g.start),C=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let S=A,T=C;S<T;S+=3){const y=S,L=S+1,_=S+2;s=ar(this,h,e,n,c,u,f,y,L,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const v=Math.max(0,g.start),E=Math.min(l.count,g.start+g.count);for(let m=v,h=E;m<h;m+=3){const A=m,C=m+1,S=m+2;s=ar(this,a,e,n,c,u,f,A,C,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Fc(i,e,t,n,s,r,a,o){let l;if(e.side===1?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===0,o),l===null)return null;rr.copy(o),rr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(rr);return c<t.near||c>t.far?null:{distance:c,point:rr.clone(),object:i}}function ar(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,tr),i.getVertexPosition(l,nr),i.getVertexPosition(c,ir);const u=Fc(i,e,t,n,tr,nr,ir,Do);if(u){const f=new I;An.getBarycoord(Do,tr,nr,ir,f),s&&(u.uv=An.getInterpolatedAttribute(s,o,l,c,f,new st)),r&&(u.uv1=An.getInterpolatedAttribute(r,o,l,c,f,new st)),a&&(u.normal=An.getInterpolatedAttribute(a,o,l,c,f,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new I,materialIndex:0};An.getNormal(tr,nr,ir,d.normal),u.face=d,u.barycoord=f}return u}class Nc extends an{constructor(e=null,t=1,n=1,s,r,a,o,l,c=1003,u=1003,f,d){super(null,a,o,l,c,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ui=new Ia,Uc=new st(.5,.5),or=new I;class Fa{constructor(e=new ti,t=new ti,n=new ti,s=new ti,r=new ti,a=new ti){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],f=r[5],d=r[6],g=r[7],v=r[8],E=r[9],m=r[10],h=r[11],A=r[12],C=r[13],S=r[14],T=r[15];if(s[0].setComponents(c-a,g-u,h-v,T-A).normalize(),s[1].setComponents(c+a,g+u,h+v,T+A).normalize(),s[2].setComponents(c+o,g+f,h+E,T+C).normalize(),s[3].setComponents(c-o,g-f,h-E,T-C).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,g-d,h-m,T-S).normalize();else if(s[4].setComponents(c-l,g-d,h-m,T-S).normalize(),t===2e3)s[5].setComponents(c+l,g+d,h+m,T+S).normalize();else if(t===2001)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){ui.center.set(0,0,0);const t=Uc.distanceTo(e.center);return ui.radius=.7071067811865476+t,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(or.x=s.normal.x>0?e.max.x:e.min.x,or.y=s.normal.y>0?e.max.y:e.min.y,or.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wl extends an{constructor(e=[],t=301,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _s extends an{constructor(e,t,n=1014,s,r,a,o=1003,l=1003,c,u=1026,f=1){if(u!==1026&&u!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Oc extends _s{constructor(e,t=1014,n=301,s,r,a=1003,o=1003,l,c=1026){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Rl extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class wt extends gn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,g=0;v("z","y","x",-1,-1,n,t,e,a,r,0),v("z","y","x",1,-1,n,t,-e,a,r,1),v("x","z","y",1,1,e,n,t,s,a,2),v("x","z","y",1,-1,e,n,-t,s,a,3),v("x","y","z",1,-1,e,t,n,s,r,4),v("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Ot(c,3)),this.setAttribute("normal",new Ot(u,3)),this.setAttribute("uv",new Ot(f,2));function v(E,m,h,A,C,S,T,y,L,_,b){const D=S/L,B=T/_,z=S/2,V=T/2,N=y/2,W=L+1,Z=_+1;let Q=0,ce=0;const Y=new I;for(let re=0;re<Z;re++){const oe=re*B-V;for(let Ne=0;Ne<W;Ne++){const we=Ne*D-z;Y[E]=we*A,Y[m]=oe*C,Y[h]=N,c.push(Y.x,Y.y,Y.z),Y[E]=0,Y[m]=0,Y[h]=y>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(Ne/L),f.push(1-re/_),Q+=1}}for(let re=0;re<_;re++)for(let oe=0;oe<L;oe++){const Ne=d+oe+W*re,we=d+oe+W*(re+1),ft=d+(oe+1)+W*(re+1),je=d+(oe+1)+W*re;l.push(Ne,we,je),l.push(we,ft,je),ce+=6}o.addGroup(g,ce,b),g+=ce,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vr extends gn{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],u=t/2,f=Math.PI/2*e,d=t,g=2*f+d,v=n*2+r,E=s+1,m=new I,h=new I;for(let A=0;A<=v;A++){let C=0,S=0,T=0,y=0;if(A<=n){const b=A/n,D=b*Math.PI/2;S=-u-e*Math.cos(D),T=e*Math.sin(D),y=-e*Math.cos(D),C=b*f}else if(A<=n+r){const b=(A-n)/r;S=-u+b*t,T=e,y=0,C=f+b*d}else{const b=(A-n-r)/n,D=b*Math.PI/2;S=u+e*Math.sin(D),T=e*Math.cos(D),y=e*Math.sin(D),C=f+d+b*f}const L=Math.max(0,Math.min(1,C/g));let _=0;A===0?_=.5/s:A===v&&(_=-.5/s);for(let b=0;b<=s;b++){const D=b/s,B=D*Math.PI*2,z=Math.sin(B),V=Math.cos(B);h.x=-T*V,h.y=S,h.z=T*z,o.push(h.x,h.y,h.z),m.set(-T*V,y,T*z),m.normalize(),l.push(m.x,m.y,m.z),c.push(D+_,L)}if(A>0){const b=(A-1)*E;for(let D=0;D<s;D++){const B=b+D,z=b+D+1,V=A*E+D,N=A*E+D+1;a.push(B,z,V),a.push(z,N,V)}}}this.setIndex(a),this.setAttribute("position",new Ot(o,3)),this.setAttribute("normal",new Ot(l,3)),this.setAttribute("uv",new Ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class xs extends gn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new I,u=new st;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=t;f++,d+=3){const g=n+f/t*s;c.x=e*Math.cos(g),c.y=e*Math.sin(g),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let f=1;f<=t;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Ot(a,3)),this.setAttribute("normal",new Ot(o,3)),this.setAttribute("uv",new Ot(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Sr extends gn{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],d=[],g=[];let v=0;const E=[],m=n/2;let h=0;A(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ot(f,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(g,2));function A(){const S=new I,T=new I;let y=0;const L=(t-e)/n;for(let _=0;_<=r;_++){const b=[],D=_/r,B=D*(t-e)+e;for(let z=0;z<=s;z++){const V=z/s,N=V*l+o,W=Math.sin(N),Z=Math.cos(N);T.x=B*W,T.y=-D*n+m,T.z=B*Z,f.push(T.x,T.y,T.z),S.set(W,L,Z).normalize(),d.push(S.x,S.y,S.z),g.push(V,1-D),b.push(v++)}E.push(b)}for(let _=0;_<s;_++)for(let b=0;b<r;b++){const D=E[b][_],B=E[b+1][_],z=E[b+1][_+1],V=E[b][_+1];(e>0||b!==0)&&(u.push(D,B,V),y+=3),(t>0||b!==r-1)&&(u.push(B,z,V),y+=3)}c.addGroup(h,y,0),h+=y}function C(S){const T=v,y=new st,L=new I;let _=0;const b=S===!0?e:t,D=S===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,m*D,0),d.push(0,D,0),g.push(.5,.5),v++;const B=v;for(let z=0;z<=s;z++){const N=z/s*l+o,W=Math.cos(N),Z=Math.sin(N);L.x=b*Z,L.y=m*D,L.z=b*W,f.push(L.x,L.y,L.z),d.push(0,D,0),y.x=W*.5+.5,y.y=Z*.5*D+.5,g.push(y.x,y.y),v++}for(let z=0;z<s;z++){const V=T+z,N=B+z;S===!0?u.push(N,N+1,V):u.push(N+1,N,V),_+=3}c.addGroup(h,_,S===!0?1:2),h+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qi extends gn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,f=e/o,d=t/l,g=[],v=[],E=[],m=[];for(let h=0;h<u;h++){const A=h*d-a;for(let C=0;C<c;C++){const S=C*f-r;v.push(S,-A,0),E.push(0,0,1),m.push(C/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let A=0;A<o;A++){const C=A+c*h,S=A+c*(h+1),T=A+1+c*(h+1),y=A+1+c*h;g.push(C,S,y),g.push(S,T,y)}this.setIndex(g),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(E,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yi extends gn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new I,d=new I,g=[],v=[],E=[],m=[];for(let h=0;h<=n;h++){const A=[],C=h/n,S=a+C*o,T=e*Math.cos(S),y=Math.sqrt(e*e-T*T);let L=0;h===0&&a===0?L=.5/t:h===n&&l===Math.PI&&(L=-.5/t);for(let _=0;_<=t;_++){const b=_/t,D=s+b*r;f.x=-y*Math.cos(D),f.y=T,f.z=y*Math.sin(D),v.push(f.x,f.y,f.z),d.copy(f).normalize(),E.push(d.x,d.y,d.z),m.push(b+L,1-C),A.push(c++)}u.push(A)}for(let h=0;h<n;h++)for(let A=0;A<t;A++){const C=u[h][A+1],S=u[h][A],T=u[h+1][A],y=u[h+1][A+1];(h!==0||a>0)&&g.push(C,S,y),(h!==n-1||l<Math.PI)&&g.push(S,T,y)}this.setIndex(g),this.setAttribute("position",new Ot(v,3)),this.setAttribute("normal",new Ot(E,3)),this.setAttribute("uv",new Ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function $i(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(Io(s))s.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Io(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function rn(i){const e={};for(let t=0;t<i.length;t++){const n=$i(i[t]);for(const s in n)e[s]=n[s]}return e}function Io(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Bc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const zc={clone:$i,merge:rn};var Gc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends Zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gc,this.fragmentShader=kc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=Bc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new st().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ft().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Nt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Hc extends In{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ms extends Zi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Vc extends Zi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Wc extends Zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xc extends Zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Er extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class qc extends Er{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ua=new Nt,Fo=new I,No=new I;class Pl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fa,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Fo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fo),No.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(No),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){ua.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ua,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const lr=new I,cr=new _i,Cn=new I;class Ll extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=2e3,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(lr,cr,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lr,cr,Cn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(lr,cr,Cn),Cn.x===1&&Cn.y===1&&Cn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lr,cr,Cn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ei=new I,Uo=new st,Oo=new st;class mn extends Ll{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ta*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ei.x,ei.y).multiplyScalar(-e/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-e/ei.z)}getViewSize(e,t){return this.getViewBounds(e,Uo,Oo),t.subVectors(Oo,Uo)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Yc extends Pl{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0}}class ba extends Er{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Yc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Na extends Ll{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $c extends Pl{constructor(){super(new Na(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kc extends Er{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new $c}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Zc extends Er{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const zi=-90,Gi=1;class Jc extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(zi,Gi,e,t);s.layers=this.layers,this.add(s);const r=new mn(zi,Gi,e,t);r.layers=this.layers,this.add(r);const a=new mn(zi,Gi,e,t);a.layers=this.layers,this.add(a);const o=new mn(zi,Gi,e,t);o.layers=this.layers,this.add(o);const l=new mn(zi,Gi,e,t);l.layers=this.layers,this.add(l);const c=new mn(zi,Gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,g),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class Qc extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Bo=new Nt;class dr{constructor(e,t,n=0,s=1/0){this.ray=new Al(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new La,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ut("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bo),this}intersectObject(e,t=!0,n=[]){return Aa(e,this,n,t),n.sort(zo),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Aa(e[s],this,n,t);return n.sort(zo),n}}function zo(i,e){return i.distance-e.distance}function Aa(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Aa(r[a],e,t,!0)}}const Ga=class Ga{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Ga.prototype.isMatrix2=!0;let Go=Ga;function ko(i,e,t,n){const s=jc(n);switch(t){case 1021:return i*e;case 1028:return i*e/s.components*s.byteLength;case 1029:return i*e/s.components*s.byteLength;case 1030:return i*e*2/s.components*s.byteLength;case 1031:return i*e*2/s.components*s.byteLength;case 1022:return i*e*3/s.components*s.byteLength;case 1023:return i*e*4/s.components*s.byteLength;case 1033:return i*e*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function jc(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dl(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ed(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((g,v)=>g.start-v.start);let d=0;for(let g=1;g<f.length;g++){const v=f[d],E=f[g];E.start<=v.start+v.count+1?v.count=Math.max(v.count,E.start+E.count-v.start):(++d,f[d]=E)}f.length=d+1;for(let g=0,v=f.length;g<v;g++){const E=f[g];i.bufferSubData(c,E.start*u.BYTES_PER_ELEMENT,u,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var td=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nd=`#ifdef USE_ALPHAHASH
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
#endif`,id=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,od=`#ifdef USE_AOMAP
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
#endif`,ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cd=`#ifdef USE_BATCHING
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
#endif`,dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ud=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,pd=`#ifdef USE_IRIDESCENCE
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
#endif`,md=`#ifdef USE_BUMPMAP
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
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ed=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Td=`#define PI 3.141592653589793
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
} // validated`,bd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ad=`vec3 transformedNormal = objectNormal;
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
#endif`,wd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ld="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Id=`#ifdef USE_ENVMAP
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
#endif`,Fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Nd=`#ifdef USE_ENVMAP
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
#endif`,Ud=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hd=`#ifdef USE_GRADIENTMAP
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
}`,Vd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qd=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Yd=`#ifdef USE_ENVMAP
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
#endif`,$d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qd=`PhysicalMaterial material;
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
#endif`,jd=`uniform sampler2D dfgLUT;
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
}`,eh=`
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
#endif`,th=`#if defined( RE_IndirectDiffuse )
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
#endif`,nh=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ih=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,sh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ah=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ch=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hh=`#if defined( USE_POINTS_UV )
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
#endif`,uh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ph=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mh=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_h=`#ifdef USE_MORPHTARGETS
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
#endif`,xh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Th=`#ifdef USE_NORMALMAP
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
#endif`,bh=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ah=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ch=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ph=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dh=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ih=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Oh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gh=`float getShadowMask() {
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
}`,kh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hh=`#ifdef USE_SKINNING
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
#endif`,Vh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wh=`#ifdef USE_SKINNING
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
#endif`,Xh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$h=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kh=`#ifdef USE_TRANSMISSION
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
#endif`,Zh=`#ifdef USE_TRANSMISSION
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
#endif`,Jh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nu=`uniform sampler2D t2D;
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
}`,iu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,su=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ru=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,au=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ou=`#include <common>
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
}`,lu=`#if DEPTH_PACKING == 3200
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
}`,cu=`#define DISTANCE
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
}`,du=`#define DISTANCE
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
}`,hu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fu=`uniform float scale;
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
}`,pu=`uniform vec3 diffuse;
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
}`,mu=`#include <common>
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
}`,gu=`uniform vec3 diffuse;
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
}`,_u=`#define LAMBERT
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
}`,xu=`#define LAMBERT
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
}`,vu=`#define MATCAP
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
}`,Su=`#define MATCAP
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
}`,Mu=`#define NORMAL
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
}`,yu=`#define NORMAL
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
}`,Eu=`#define PHONG
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
}`,Tu=`#define PHONG
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
}`,bu=`#define STANDARD
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
}`,Au=`#define STANDARD
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
}`,wu=`#define TOON
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
}`,Ru=`#define TOON
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
}`,Cu=`uniform float size;
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
}`,Pu=`uniform vec3 diffuse;
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
}`,Lu=`#include <common>
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
}`,Du=`uniform vec3 color;
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
}`,Iu=`uniform float rotation;
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
}`,Fu=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:td,alphahash_pars_fragment:nd,alphamap_fragment:id,alphamap_pars_fragment:sd,alphatest_fragment:rd,alphatest_pars_fragment:ad,aomap_fragment:od,aomap_pars_fragment:ld,batching_pars_vertex:cd,batching_vertex:dd,begin_vertex:hd,beginnormal_vertex:ud,bsdfs:fd,iridescence_fragment:pd,bumpmap_pars_fragment:md,clipping_planes_fragment:gd,clipping_planes_pars_fragment:_d,clipping_planes_pars_vertex:xd,clipping_planes_vertex:vd,color_fragment:Sd,color_pars_fragment:Md,color_pars_vertex:yd,color_vertex:Ed,common:Td,cube_uv_reflection_fragment:bd,defaultnormal_vertex:Ad,displacementmap_pars_vertex:wd,displacementmap_vertex:Rd,emissivemap_fragment:Cd,emissivemap_pars_fragment:Pd,colorspace_fragment:Ld,colorspace_pars_fragment:Dd,envmap_fragment:Id,envmap_common_pars_fragment:Fd,envmap_pars_fragment:Nd,envmap_pars_vertex:Ud,envmap_physical_pars_fragment:Yd,envmap_vertex:Od,fog_vertex:Bd,fog_pars_vertex:zd,fog_fragment:Gd,fog_pars_fragment:kd,gradientmap_pars_fragment:Hd,lightmap_pars_fragment:Vd,lights_lambert_fragment:Wd,lights_lambert_pars_fragment:Xd,lights_pars_begin:qd,lights_toon_fragment:$d,lights_toon_pars_fragment:Kd,lights_phong_fragment:Zd,lights_phong_pars_fragment:Jd,lights_physical_fragment:Qd,lights_physical_pars_fragment:jd,lights_fragment_begin:eh,lights_fragment_maps:th,lights_fragment_end:nh,lightprobes_pars_fragment:ih,logdepthbuf_fragment:sh,logdepthbuf_pars_fragment:rh,logdepthbuf_pars_vertex:ah,logdepthbuf_vertex:oh,map_fragment:lh,map_pars_fragment:ch,map_particle_fragment:dh,map_particle_pars_fragment:hh,metalnessmap_fragment:uh,metalnessmap_pars_fragment:fh,morphinstance_vertex:ph,morphcolor_vertex:mh,morphnormal_vertex:gh,morphtarget_pars_vertex:_h,morphtarget_vertex:xh,normal_fragment_begin:vh,normal_fragment_maps:Sh,normal_pars_fragment:Mh,normal_pars_vertex:yh,normal_vertex:Eh,normalmap_pars_fragment:Th,clearcoat_normal_fragment_begin:bh,clearcoat_normal_fragment_maps:Ah,clearcoat_pars_fragment:wh,iridescence_pars_fragment:Rh,opaque_fragment:Ch,packing:Ph,premultiplied_alpha_fragment:Lh,project_vertex:Dh,dithering_fragment:Ih,dithering_pars_fragment:Fh,roughnessmap_fragment:Nh,roughnessmap_pars_fragment:Uh,shadowmap_pars_fragment:Oh,shadowmap_pars_vertex:Bh,shadowmap_vertex:zh,shadowmask_pars_fragment:Gh,skinbase_vertex:kh,skinning_pars_vertex:Hh,skinning_vertex:Vh,skinnormal_vertex:Wh,specularmap_fragment:Xh,specularmap_pars_fragment:qh,tonemapping_fragment:Yh,tonemapping_pars_fragment:$h,transmission_fragment:Kh,transmission_pars_fragment:Zh,uv_pars_fragment:Jh,uv_pars_vertex:Qh,uv_vertex:jh,worldpos_vertex:eu,background_vert:tu,background_frag:nu,backgroundCube_vert:iu,backgroundCube_frag:su,cube_vert:ru,cube_frag:au,depth_vert:ou,depth_frag:lu,distance_vert:cu,distance_frag:du,equirect_vert:hu,equirect_frag:uu,linedashed_vert:fu,linedashed_frag:pu,meshbasic_vert:mu,meshbasic_frag:gu,meshlambert_vert:_u,meshlambert_frag:xu,meshmatcap_vert:vu,meshmatcap_frag:Su,meshnormal_vert:Mu,meshnormal_frag:yu,meshphong_vert:Eu,meshphong_frag:Tu,meshphysical_vert:bu,meshphysical_frag:Au,meshtoon_vert:wu,meshtoon_frag:Ru,points_vert:Cu,points_frag:Pu,shadow_vert:Lu,shadow_frag:Du,sprite_vert:Iu,sprite_frag:Fu},Ee={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Ln={basic:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:rn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:rn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new nt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:rn([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:rn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:rn([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:rn([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:rn([Ee.common,Ee.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:rn([Ee.lights,Ee.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Ln.physical={uniforms:rn([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const hr={r:0,b:0,g:0},Nu=new Nt,Il=new Ke;Il.set(-1,0,0,0,1,0,0,0,1);function Uu(i,e,t,n,s,r){const a=new nt(0);let o=s===!0?0:1,l,c,u=null,f=0,d=null;function g(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){const S=A.backgroundBlurriness>0;C=e.get(C,S)}return C}function v(A){let C=!1;const S=g(A);S===null?m(a,o):S&&S.isColor&&(m(S,1),C=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(A,C){const S=g(C);S&&(S.isCubeTexture||S.mapping===306)?(c===void 0&&(c=new mt(new wt(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:$i(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,y,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Nu.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Il),c.material.toneMapped=lt.getTransfer(S.colorSpace)!==Et,(u!==S||f!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new mt(new qi(2,2),new In({name:"BackgroundMaterial",uniforms:$i(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=lt.getTransfer(S.colorSpace)!==Et,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,C){A.getRGB(hr,Cl(i)),t.buffers.color.setClear(hr.r,hr.g,hr.b,C,r)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,m(a,o)},render:v,addToRenderList:E,dispose:h}}function Ou(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(B,z,V,N,W){let Z=!1;const Q=f(B,N,V,z);r!==Q&&(r=Q,c(r.object)),Z=g(B,N,V,W),Z&&v(B,N,V,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,S(B,z,V,N),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(B){return i.bindVertexArray(B)}function u(B){return i.deleteVertexArray(B)}function f(B,z,V,N){const W=N.wireframe===!0;let Z=n[z.id];Z===void 0&&(Z={},n[z.id]=Z);const Q=B.isInstancedMesh===!0?B.id:0;let ce=Z[Q];ce===void 0&&(ce={},Z[Q]=ce);let Y=ce[V.id];Y===void 0&&(Y={},ce[V.id]=Y);let re=Y[W];return re===void 0&&(re=d(l()),Y[W]=re),re}function d(B){const z=[],V=[],N=[];for(let W=0;W<t;W++)z[W]=0,V[W]=0,N[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:N,object:B,attributes:{},index:null}}function g(B,z,V,N){const W=r.attributes,Z=z.attributes;let Q=0;const ce=V.getAttributes();for(const Y in ce)if(ce[Y].location>=0){const oe=W[Y];let Ne=Z[Y];if(Ne===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(Ne=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(Ne=B.instanceColor)),oe===void 0||oe.attribute!==Ne||Ne&&oe.data!==Ne.data)return!0;Q++}return r.attributesNum!==Q||r.index!==N}function v(B,z,V,N){const W={},Z=z.attributes;let Q=0;const ce=V.getAttributes();for(const Y in ce)if(ce[Y].location>=0){let oe=Z[Y];oe===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(oe=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(oe=B.instanceColor));const Ne={};Ne.attribute=oe,oe&&oe.data&&(Ne.data=oe.data),W[Y]=Ne,Q++}r.attributes=W,r.attributesNum=Q,r.index=N}function E(){const B=r.newAttributes;for(let z=0,V=B.length;z<V;z++)B[z]=0}function m(B){h(B,0)}function h(B,z){const V=r.newAttributes,N=r.enabledAttributes,W=r.attributeDivisors;V[B]=1,N[B]===0&&(i.enableVertexAttribArray(B),N[B]=1),W[B]!==z&&(i.vertexAttribDivisor(B,z),W[B]=z)}function A(){const B=r.newAttributes,z=r.enabledAttributes;for(let V=0,N=z.length;V<N;V++)z[V]!==B[V]&&(i.disableVertexAttribArray(V),z[V]=0)}function C(B,z,V,N,W,Z,Q){Q===!0?i.vertexAttribIPointer(B,z,V,W,Z):i.vertexAttribPointer(B,z,V,N,W,Z)}function S(B,z,V,N){E();const W=N.attributes,Z=V.getAttributes(),Q=z.defaultAttributeValues;for(const ce in Z){const Y=Z[ce];if(Y.location>=0){let re=W[ce];if(re===void 0&&(ce==="instanceMatrix"&&B.instanceMatrix&&(re=B.instanceMatrix),ce==="instanceColor"&&B.instanceColor&&(re=B.instanceColor)),re!==void 0){const oe=re.normalized,Ne=re.itemSize,we=e.get(re);if(we===void 0)continue;const ft=we.buffer,je=we.type,Ze=we.bytesPerElement,J=je===i.INT||je===i.UNSIGNED_INT||re.gpuType===1013;if(re.isInterleavedBufferAttribute){const se=re.data,fe=se.stride,He=re.offset;if(se.isInstancedInterleavedBuffer){for(let Ae=0;Ae<Y.locationSize;Ae++)h(Y.location+Ae,se.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ae=0;Ae<Y.locationSize;Ae++)m(Y.location+Ae);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let Ae=0;Ae<Y.locationSize;Ae++)C(Y.location+Ae,Ne/Y.locationSize,je,oe,fe*Ze,(He+Ne/Y.locationSize*Ae)*Ze,J)}else{if(re.isInstancedBufferAttribute){for(let se=0;se<Y.locationSize;se++)h(Y.location+se,re.meshPerAttribute);B.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let se=0;se<Y.locationSize;se++)m(Y.location+se);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let se=0;se<Y.locationSize;se++)C(Y.location+se,Ne/Y.locationSize,je,oe,Ne*Ze,Ne/Y.locationSize*se*Ze,J)}}else if(Q!==void 0){const oe=Q[ce];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(Y.location,oe);break;case 3:i.vertexAttrib3fv(Y.location,oe);break;case 4:i.vertexAttrib4fv(Y.location,oe);break;default:i.vertexAttrib1fv(Y.location,oe)}}}}A()}function T(){b();for(const B in n){const z=n[B];for(const V in z){const N=z[V];for(const W in N){const Z=N[W];for(const Q in Z)u(Z[Q].object),delete Z[Q];delete N[W]}}delete n[B]}}function y(B){if(n[B.id]===void 0)return;const z=n[B.id];for(const V in z){const N=z[V];for(const W in N){const Z=N[W];for(const Q in Z)u(Z[Q].object),delete Z[Q];delete N[W]}}delete n[B.id]}function L(B){for(const z in n){const V=n[z];for(const N in V){const W=V[N];if(W[B.id]===void 0)continue;const Z=W[B.id];for(const Q in Z)u(Z[Q].object),delete Z[Q];delete W[B.id]}}}function _(B){for(const z in n){const V=n[z],N=B.isInstancedMesh===!0?B.id:0,W=V[N];if(W!==void 0){for(const Z in W){const Q=W[Z];for(const ce in Q)u(Q[ce].object),delete Q[ce];delete W[Z]}delete V[N],Object.keys(V).length===0&&delete n[z]}}}function b(){D(),a=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:y,releaseStatesOfObject:_,releaseStatesOfProgram:L,initAttributes:E,enableAttribute:m,disableUnusedAttributes:A}}function Bu(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let g=0;g<u;g++)d+=c[g];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function zu(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==1023&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const _=L===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==1009&&L!==1015&&!_&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(We("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&We("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),y=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:v,maxTextureSize:E,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:S,maxSamples:T,samples:y}}function Gu(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new ti,o=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const g=f.length!==0||d||n!==0||s;return s=d,n=f.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,g){const v=f.clippingPlanes,E=f.clipIntersection,m=f.clipShadows,h=i.get(f);if(!s||v===null||v.length===0||r&&!m)r?u(null):c();else{const A=r?0:n,C=A*4;let S=h.clippingState||null;l.value=S,S=u(v,d,C,g);for(let T=0;T!==C;++T)S[T]=t[T];h.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,g,v){const E=f!==null?f.length:0;let m=null;if(E!==0){if(m=l.value,v!==!0||m===null){const h=g+E*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<h)&&(m=new Float32Array(h));for(let C=0,S=g;C!==E;++C,S+=4)a.copy(f[C]).applyMatrix4(A,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,m}}const Vi=4,ku=6,Hu=20,Vu=256,ds=new Na,Ho=new nt;let fa=null,pa=0,ma=0,ga=!1;const Wu=new I,fi=new I;class Vo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=Wu}=r;fa=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fa,pa,ma),this._renderer.xr.enabled=ga,e.scissorTest=!1,ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fa=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:gr,depthBuffer:!1},s=Wo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wo(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Xu(r)),this._blurMaterial=Yu(r,e,t),this._ggxMaterial=qu(r,e,t)}return s}_compileMaterial(e){const t=new mt(new gn,e);this._renderer.compile(t,ds)}_sceneToCubeUV(e,t,n,s,r){const l=new mn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,g=f.toneMapping;f.getClearColor(Ho),f.toneMapping=0,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mt(new wt,new ni({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,m=E.material;let h=!1;const A=e.background;A?A.isColor&&(m.color.copy(A),e.background=null,h=!0):(m.color.copy(Ho),h=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));const T=this._cubeSize;ki(s,S*T,C>2?T:0,T,T),f.setRenderTarget(s),h&&f.render(E,l),f.render(e,l)}f.toneMapping=g,f.autoClear=d,e.background=A}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===301||e.mapping===302;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ki(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ds)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=c*1.25,g=f*d,{_lodMax:v}=this,E=this._sizeLods[n],m=3*E*(n>v-Vi?n-v+Vi:0),h=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-t,ki(r,m,h,3*E,2*E),s.setRenderTarget(r),s.render(o,ds),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=v-n,ki(e,m,h,3*E,2*E),s.setRenderTarget(e),s.render(o,ds)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,s,r){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Vi?s-this._lodMax+Vi:0),d=4*(this._cubeSize-u);ki(t,f,d,3*u,2*u),a.setRenderTarget(t),a.render(l,ds)}}function Xu(i){const e=[],t=[];let n=i;const s=i-Vi+1+ku;for(let r=0;r<s;r++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,d=6,g=3,v=new Float32Array(g*d*f),E=new Float32Array(g*d*f);for(let h=0;h<f;h++){const A=h%3*2/3-1,C=h>2?0:-1,S=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];v.set(S,g*d*h);for(let T=0;T<d;T++){const y=u[T*2]*2-1,L=u[T*2+1]*2-1;h===0?fi.set(1,L,y):h===1?fi.set(-y,1,-L):h===2?fi.set(-y,L,1):h===3?fi.set(-1,L,-y):h===4?fi.set(-y,-1,L):fi.set(y,L,-1),fi.toArray(E,(h*d+T)*g)}}const m=new gn;m.setAttribute("position",new qn(v,g)),m.setAttribute("outputDirection",new qn(E,g)),t.push(new mt(m,null)),n>Vi&&n--}return{lodMeshes:t,sizeLods:e}}function Wo(i,e,t){const n=new wn(i,e,t);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ki(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function qu(i,e,t){return new In({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vu,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tr(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yu(i,e,t){return new In({name:"SphericalGaussianBlur",defines:{SAMPLES:Hu,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Tr(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xo(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tr(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function qo(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tr(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Fl extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new wl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wt(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const a=new mt(s,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Jc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}function $u(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,g=!1){return d==null?null:g?a(d):r(d)}function r(d){if(d&&d.isTexture){const g=d.mapping;if(g===303||g===304)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const E=new Fl(v.height);return E.fromEquirectangularTexture(i,d),e.set(d,E),d.addEventListener("dispose",c),o(E.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const g=d.mapping,v=g===303||g===304,E=g===301||g===302;if(v||E){let m=t.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return n===null&&(n=new Vo(i)),m=v?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const A=d.image;return v&&A&&A.height>0||E&&A&&l(A)?(n===null&&(n=new Vo(i)),m=v?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,g){return g===303?d.mapping=301:g===304&&(d.mapping=302),d}function l(d){let g=0;const v=6;for(let E=0;E<v;E++)d[E]!==void 0&&g++;return g===v}function c(d){const g=d.target;g.removeEventListener("dispose",c);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function u(d){const g=d.target;g.removeEventListener("dispose",u);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Ku(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Wi("WebGLRenderer: "+n+" extension not supported."),s}}}function Zu(i,e,t,n){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete s[d.id];const g=r.get(d);g&&(e.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER)}function c(f){const d=[],g=f.index,v=f.attributes.position;let E=0;if(v===void 0)return;if(g!==null){const A=g.array;E=g.version;for(let C=0,S=A.length;C<S;C+=3){const T=A[C+0],y=A[C+1],L=A[C+2];d.push(T,y,y,L,L,T)}}else{const A=v.array;E=v.version;for(let C=0,S=A.length/3-1;C<S;C+=3){const T=C+0,y=C+1,L=C+2;d.push(T,y,y,L,L,T)}}const m=new(v.count>=65535?bl:Tl)(d,1);m.version=E;const h=r.get(f);h&&e.remove(h),r.set(f,m)}function u(f){const d=r.get(f);if(d){const g=f.index;g!==null&&d.version<g.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Ju(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function c(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let E=0;for(let m=0;m<g;m++)E+=d[m];t.update(E,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Qu(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:ut("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ju(i,e,t){const n=new WeakMap,s=new Ft;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let b=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,E=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let C=0;g===!0&&(C=1),v===!0&&(C=2),E===!0&&(C=3);let S=o.attributes.position.count*C,T=1;S>e.maxTextureSize&&(T=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const y=new Float32Array(S*T*4*f),L=new yl(y,S,T,f);L.type=1015,L.needsUpdate=!0;const _=C*4;for(let D=0;D<f;D++){const B=m[D],z=h[D],V=A[D],N=S*T*4*D;for(let W=0;W<B.count;W++){const Z=W*_;g===!0&&(s.fromBufferAttribute(B,W),y[N+Z+0]=s.x,y[N+Z+1]=s.y,y[N+Z+2]=s.z,y[N+Z+3]=0),v===!0&&(s.fromBufferAttribute(z,W),y[N+Z+4]=s.x,y[N+Z+5]=s.y,y[N+Z+6]=s.z,y[N+Z+7]=0),E===!0&&(s.fromBufferAttribute(V,W),y[N+Z+8]=s.x,y[N+Z+9]=s.y,y[N+Z+10]=s.z,y[N+Z+11]=V.itemSize===4?s.w:1)}}d={count:f,texture:L,size:new st(S,T)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let g=0;for(let E=0;E<c.length;E++)g+=c[E];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function ef(i,e,t,n,s){let r=new WeakMap;function a(c){const u=s.render.frame,f=c.geometry,d=e.get(c,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const g=c.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const tf={1:"LINEAR_TONE_MAPPING",2:"REINHARD_TONE_MAPPING",3:"CINEON_TONE_MAPPING",4:"ACES_FILMIC_TONE_MAPPING",6:"AGX_TONE_MAPPING",7:"NEUTRAL_TONE_MAPPING",5:"CUSTOM_TONE_MAPPING"};function nf(i,e,t,n,s,r){const a=new wn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new gn;c.setAttribute("position",new Ot([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ot([0,2,0,0,2,0],2));const u=new Hc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new mt(c,u),d=new Na(-1,1,1,-1,0,1);let g=null,v=null,E=!1,m,h=null,A=[],C=!1;this.setSize=function(S,T){a.setSize(S,T),o!==null&&o.setSize(S,T),l!==null&&l.setSize(S,T);for(let y=0;y<A.length;y++){const L=A[y];L.setSize&&L.setSize(S,T)}},this.setEffects=function(S){A=S,C=A.length>0&&A[0].isRenderPass===!0;const T=a.width,y=a.height;A.length>0&&o===null&&(o=new wn(T,y,{type:1016,depthBuffer:!1,stencilBuffer:!1}),l=new wn(T,y,{type:1016,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<A.length;L++){const _=A[L];_.setSize&&_.setSize(T,y)}},this.begin=function(S,T){if(E||S.toneMapping===0&&A.length===0)return!1;if(h=T,T!==null){const y=T.width,L=T.height;(a.width!==y||a.height!==L)&&this.setSize(y,L)}return C===!1&&S.setRenderTarget(a),m=S.toneMapping,S.toneMapping=0,!0},this.hasRenderPass=function(){return C},this.end=function(S,T){S.toneMapping=m,E=!0;let y=a,L=o;for(let _=0;_<A.length;_++){const b=A[_];b.enabled!==!1&&(b.render(S,L,y,T),b.needsSwap!==!1&&(y=L,L=L===o?l:o))}if(g!==S.outputColorSpace||v!==S.toneMapping){g=S.outputColorSpace,v=S.toneMapping,u.defines={},lt.getTransfer(g)===Et&&(u.defines.SRGB_TRANSFER="");const _=tf[v];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(h),S.render(f,d),h=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Nl=new an,wa=new _s(1,1),Ul=new yl,Ol=new vc,Bl=new wl,Yo=[],$o=[],Ko=new Float32Array(16),Zo=new Float32Array(9),Jo=new Float32Array(4);function Ji(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Yo[s];if(r===void 0&&(r=new Float32Array(s),Yo[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function br(i,e){let t=$o[e];t===void 0&&(t=new Int32Array(e),$o[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function sf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Ht(t,e)}}function af(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Ht(t,e)}}function of(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Ht(t,e)}}function lf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Jo.set(n),i.uniformMatrix2fv(this.addr,!1,Jo),Ht(t,n)}}function cf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Zo.set(n),i.uniformMatrix3fv(this.addr,!1,Zo),Ht(t,n)}}function df(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(kt(t,n))return;Ko.set(n),i.uniformMatrix4fv(this.addr,!1,Ko),Ht(t,n)}}function hf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Ht(t,e)}}function ff(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Ht(t,e)}}function pf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Ht(t,e)}}function mf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function gf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Ht(t,e)}}function _f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Ht(t,e)}}function xf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Ht(t,e)}}function vf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(wa.compareFunction=t.isReversedDepthBuffer()?518:515,r=wa):r=Nl,t.setTexture2D(e||r,s)}function Sf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ol,s)}function Mf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Bl,s)}function yf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ul,s)}function Ef(i){switch(i){case 5126:return sf;case 35664:return rf;case 35665:return af;case 35666:return of;case 35674:return lf;case 35675:return cf;case 35676:return df;case 5124:case 35670:return hf;case 35667:case 35671:return uf;case 35668:case 35672:return ff;case 35669:case 35673:return pf;case 5125:return mf;case 36294:return gf;case 36295:return _f;case 36296:return xf;case 35678:case 36198:case 36298:case 36306:case 35682:return vf;case 35679:case 36299:case 36307:return Sf;case 35680:case 36300:case 36308:case 36293:return Mf;case 36289:case 36303:case 36311:case 36292:return yf}}function Tf(i,e){i.uniform1fv(this.addr,e)}function bf(i,e){const t=Ji(e,this.size,2);i.uniform2fv(this.addr,t)}function Af(i,e){const t=Ji(e,this.size,3);i.uniform3fv(this.addr,t)}function wf(i,e){const t=Ji(e,this.size,4);i.uniform4fv(this.addr,t)}function Rf(i,e){const t=Ji(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cf(i,e){const t=Ji(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Pf(i,e){const t=Ji(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Lf(i,e){i.uniform1iv(this.addr,e)}function Df(i,e){i.uniform2iv(this.addr,e)}function If(i,e){i.uniform3iv(this.addr,e)}function Ff(i,e){i.uniform4iv(this.addr,e)}function Nf(i,e){i.uniform1uiv(this.addr,e)}function Uf(i,e){i.uniform2uiv(this.addr,e)}function Of(i,e){i.uniform3uiv(this.addr,e)}function Bf(i,e){i.uniform4uiv(this.addr,e)}function zf(i,e,t){const n=this.cache,s=e.length,r=br(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=wa:a=Nl;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Gf(i,e,t){const n=this.cache,s=e.length,r=br(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ol,r[a])}function kf(i,e,t){const n=this.cache,s=e.length,r=br(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Bl,r[a])}function Hf(i,e,t){const n=this.cache,s=e.length,r=br(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ul,r[a])}function Vf(i){switch(i){case 5126:return Tf;case 35664:return bf;case 35665:return Af;case 35666:return wf;case 35674:return Rf;case 35675:return Cf;case 35676:return Pf;case 5124:case 35670:return Lf;case 35667:case 35671:return Df;case 35668:case 35672:return If;case 35669:case 35673:return Ff;case 5125:return Nf;case 36294:return Uf;case 36295:return Of;case 36296:return Bf;case 35678:case 36198:case 36298:case 36306:case 35682:return zf;case 35679:case 36299:case 36307:return Gf;case 35680:case 36300:case 36308:case 36293:return kf;case 36289:case 36303:case 36311:case 36292:return Hf}}class Wf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ef(t.type)}}class Xf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vf(t.type)}}class qf{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const _a=/(\w+)(\])?(\[|\.)?/g;function Qo(i,e){i.seq.push(e),i.map[e.id]=e}function Yf(i,e,t){const n=i.name,s=n.length;for(_a.lastIndex=0;;){const r=_a.exec(n),a=_a.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qo(t,c===void 0?new Wf(o,i,e):new Xf(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new qf(o),Qo(t,f)),t=f}}}class mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Yf(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function jo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const $f=37297;let Kf=0;function Zf(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const el=new Ke;function Jf(i){lt._getMatrix(el,lt.workingColorSpace,i);const e=`mat3( ${el.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(i)){case _r:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function tl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Zf(i.getShaderSource(e),o)}else return r}function Qf(i,e){const t=Jf(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jf={1:"Linear",2:"Reinhard",3:"Cineon",4:"ACESFilmic",6:"AgX",7:"Neutral",5:"Custom"};function ep(i,e){const t=jf[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ur=new I;function tp(){lt.getLuminanceCoefficients(ur);const i=ur.x.toFixed(4),e=ur.y.toFixed(4),t=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function np(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function ip(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function sp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function fs(i){return i!==""}function nl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function il(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(i){return i.replace(rp,op)}const ap=new Map;function op(i,e){let t=Qe[e];if(t===void 0){const n=ap.get(e);if(n!==void 0)t=Qe[n],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ra(t)}const lp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sl(i){return i.replace(lp,cp)}function cp(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const dp={1:"SHADOWMAP_TYPE_PCF",3:"SHADOWMAP_TYPE_VSM"};function hp(i){return dp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const up={301:"ENVMAP_TYPE_CUBE",302:"ENVMAP_TYPE_CUBE",306:"ENVMAP_TYPE_CUBE_UV"};function fp(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":up[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const pp={302:"ENVMAP_MODE_REFRACTION"};function mp(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":pp[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const gp={0:"ENVMAP_BLENDING_MULTIPLY",1:"ENVMAP_BLENDING_MIX",2:"ENVMAP_BLENDING_ADD"};function _p(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":gp[i.combine]||"ENVMAP_BLENDING_NONE"}function xp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function vp(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=hp(t),c=fp(t),u=mp(t),f=_p(t),d=xp(t),g=np(t),v=ip(r),E=s.createProgram();let m,h,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fs).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(fs).join(`
`),h.length>0&&(h+=`
`)):(m=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),h=[rl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Qe.tonemapping_pars_fragment:"",t.toneMapping!==0?ep("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Qf("linearToOutputTexel",t.outputColorSpace),tp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fs).join(`
`)),a=Ra(a),a=nl(a,t),a=il(a,t),o=Ra(o),o=nl(o,t),o=il(o,t),a=sl(a),o=sl(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===go?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const C=A+m+a,S=A+h+o,T=jo(s,s.VERTEX_SHADER,C),y=jo(s,s.FRAGMENT_SHADER,S);s.attachShader(E,T),s.attachShader(E,y),t.index0AttributeName!==void 0?s.bindAttribLocation(E,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(E,0,"position"),s.linkProgram(E);function L(B){if(i.debug.checkShaderErrors){const z=s.getProgramInfoLog(E)||"",V=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(y)||"",W=z.trim(),Z=V.trim(),Q=N.trim();let ce=!0,Y=!0;if(s.getProgramParameter(E,s.LINK_STATUS)===!1)if(ce=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,E,T,y);else{const re=tl(s,T,"vertex"),oe=tl(s,y,"fragment");ut("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(E,s.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+W+`
`+re+`
`+oe)}else W!==""?We("WebGLProgram: Program Info Log:",W):(Z===""||Q==="")&&(Y=!1);Y&&(B.diagnostics={runnable:ce,programLog:W,vertexShader:{log:Z,prefix:m},fragmentShader:{log:Q,prefix:h}})}s.deleteShader(T),s.deleteShader(y),_=new mr(s,E),b=sp(s,E)}let _;this.getUniforms=function(){return _===void 0&&L(this),_};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(E,$f)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kf++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=T,this.fragmentShader=y,this}let Sp=0;class Mp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new yp(e),t.set(e,n)),n}}class yp{constructor(e){this.id=Sp++,this.code=e,this.usedTimes=0}}function Ep(i){return i===1030||i===37490||i===36285}function Tp(i,e,t,n,s,r){const a=new La,o=new Mp,l=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer;let d=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return l.add(_),_===0?"uv":`uv${_}`}function E(_,b,D,B,z,V){const N=B.fog,W=z.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?B.environment:null,Q=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ce=e.get(_.envMap||Z,Q),Y=ce&&ce.mapping===306?ce.image.height:null,re=g[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&We("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const oe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Ne=oe!==void 0?oe.length:0;let we=0;W.morphAttributes.position!==void 0&&(we=1),W.morphAttributes.normal!==void 0&&(we=2),W.morphAttributes.color!==void 0&&(we=3);let ft,je,Ze,J;if(re){const it=Ln[re];ft=it.vertexShader,je=it.fragmentShader}else{ft=_.vertexShader,je=_.fragmentShader;const it=o.getVertexShaderStage(_),dt=o.getFragmentShaderStage(_);o.update(_,it,dt),Ze=it.id,J=dt.id}const se=i.getRenderTarget(),fe=i.state.buffers.depth.getReversed(),He=z.isInstancedMesh===!0,Ae=z.isBatchedMesh===!0,Je=!!_.map,gt=!!_.matcap,ke=!!ce,rt=!!_.aoMap,_t=!!_.lightMap,Ye=!!_.bumpMap&&_.wireframe===!1,At=!!_.normalMap,Tt=!!_.displacementMap,pt=!!_.emissiveMap,ze=!!_.metalnessMap,Pt=!!_.roughnessMap,O=_.anisotropy>0,Bt=_.clearcoat>0,xt=_.dispersion>0,w=_.retroreflectivity>0,p=_.iridescence>0,G=_.sheen>0,X=_.transmission>0,K=O&&!!_.anisotropyMap,ue=Bt&&!!_.clearcoatMap,ge=Bt&&!!_.clearcoatNormalMap,j=Bt&&!!_.clearcoatRoughnessMap,ne=p&&!!_.iridescenceMap,_e=p&&!!_.iridescenceThicknessMap,Oe=G&&!!_.sheenColorMap,xe=G&&!!_.sheenRoughnessMap,pe=!!_.specularMap,Ie=!!_.specularColorMap,Fe=!!_.specularIntensityMap,Xe=X&&!!_.transmissionMap,U=X&&!!_.thicknessMap,de=!!_.gradientMap,ee=!!_.alphaMap,ve=_.alphaTest>0,ye=!!_.alphaHash,ae=!!_.extensions;let me=0;_.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(me=i.toneMapping);const te={shaderID:re,shaderType:_.type,shaderName:_.name,vertexShader:ft,fragmentShader:je,defines:_.defines,customVertexShaderID:Ze,customFragmentShaderID:J,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&z._colorsTexture!==null,instancing:He,instancingColor:He&&z.instanceColor!==null,instancingMorph:He&&z.morphTexture!==null,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Je,matcap:gt,envMap:ke,envMapMode:ke&&ce.mapping,envMapCubeUVHeight:Y,aoMap:rt,lightMap:_t,bumpMap:Ye,normalMap:At,displacementMap:Tt,emissiveMap:pt,normalMapObjectSpace:At&&_.normalMapType===1,normalMapTangentSpace:At&&_.normalMapType===0,packedNormalMap:At&&_.normalMapType===0&&Ep(_.normalMap.format),metalnessMap:ze,roughnessMap:Pt,anisotropy:O,anisotropyMap:K,clearcoat:Bt,clearcoatMap:ue,clearcoatNormalMap:ge,clearcoatRoughnessMap:j,dispersion:xt,retroreflection:w,iridescence:p,iridescenceMap:ne,iridescenceThicknessMap:_e,sheen:G,sheenColorMap:Oe,sheenRoughnessMap:xe,specularMap:pe,specularColorMap:Ie,specularIntensityMap:Fe,transmission:X,transmissionMap:Xe,thicknessMap:U,gradientMap:de,opaque:_.transparent===!1&&_.blending===1&&_.alphaToCoverage===!1,alphaMap:ee,alphaTest:ve,alphaHash:ye,combine:_.combine,mapUv:Je&&v(_.map.channel),aoMapUv:rt&&v(_.aoMap.channel),lightMapUv:_t&&v(_.lightMap.channel),bumpMapUv:Ye&&v(_.bumpMap.channel),normalMapUv:At&&v(_.normalMap.channel),displacementMapUv:Tt&&v(_.displacementMap.channel),emissiveMapUv:pt&&v(_.emissiveMap.channel),metalnessMapUv:ze&&v(_.metalnessMap.channel),roughnessMapUv:Pt&&v(_.roughnessMap.channel),anisotropyMapUv:K&&v(_.anisotropyMap.channel),clearcoatMapUv:ue&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:ge&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:xe&&v(_.sheenRoughnessMap.channel),specularMapUv:pe&&v(_.specularMap.channel),specularColorMapUv:Ie&&v(_.specularColorMap.channel),specularIntensityMapUv:Fe&&v(_.specularIntensityMap.channel),transmissionMapUv:Xe&&v(_.transmissionMap.channel),thicknessMapUv:U&&v(_.thicknessMap.channel),alphaMapUv:ee&&v(_.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(At||O),vertexNormals:!!W.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!W.attributes.uv&&(Je||ee),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||W.attributes.normal===void 0&&At===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:fe,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Ne,morphTextureStride:we,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:me,decodeVideoTexture:Je&&_.map.isVideoTexture===!0&&lt.getTransfer(_.map.colorSpace)===Et,decodeVideoTextureEmissive:pt&&_.emissiveMap.isVideoTexture===!0&&lt.getTransfer(_.emissiveMap.colorSpace)===Et,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===2,flipSided:_.side===1,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ae&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return te.vertexUv1s=l.has(1),te.vertexUv2s=l.has(2),te.vertexUv3s=l.has(3),l.clear(),te}function m(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)b.push(D),b.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(h(b,_),A(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function h(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function A(_,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){const b=g[_.type];let D;if(b){const B=Ln[b];D=zc.clone(B.uniforms)}else D=_.uniforms;return D}function S(_,b){let D=u.get(b);return D!==void 0?++D.usedTimes:(D=new vp(i,b,_,s),c.push(D),u.set(b,D)),D}function T(_){if(--_.usedTimes===0){const b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),u.delete(_.cacheKey),_.destroy()}}function y(_){o.remove(_)}function L(){o.dispose()}return{getParameters:E,getProgramCacheKey:m,getUniforms:C,acquireProgram:S,releaseProgram:T,releaseShaderCache:y,programs:c,dispose:L}}function bp(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ap(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function al(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ol(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let g=0;return d.isInstancedMesh&&(g+=2),d.isSkinnedMesh&&(g+=1),g}function o(d,g,v,E,m,h){let A=i[e];return A===void 0?(A={id:d.id,object:d,geometry:g,material:v,materialVariant:a(d),groupOrder:E,renderOrder:d.renderOrder,z:m,group:h},i[e]=A):(A.id=d.id,A.object=d,A.geometry=g,A.material=v,A.materialVariant=a(d),A.groupOrder=E,A.renderOrder=d.renderOrder,A.z=m,A.group=h),e++,A}function l(d,g,v,E,m,h,A){A.reversedDepth===!0&&(m=-m);const C=o(d,g,v,E,m,h);v.transmission>0?n.push(C):v.transparent===!0?s.push(C):t.push(C)}function c(d,g,v,E,m,h){const A=o(d,g,v,E,m,h);v.transmission>0?n.unshift(A):v.transparent===!0?s.unshift(A):t.unshift(A)}function u(d,g){t.length>1&&t.sort(d||Ap),n.length>1&&n.sort(g||al),s.length>1&&s.sort(g||al)}function f(){for(let d=e,g=i.length;d<g;d++){const v=i[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:u}}function wp(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new ol,i.set(n,[a])):s>=r.length?(a=new ol,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Rp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new nt};break;case"SpotLight":t={position:new I,direction:new I,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Cp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Pp=0;function Lp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Dp(i){const e=new Rp,t=Cp(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new Nt,a=new Nt;function o(c){let u=0,f=0,d=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let g=0,v=0,E=0,m=0,h=0,A=0,C=0,S=0,T=0,y=0,L=0,_=0,b=0,D=0;c.sort(Lp);for(let z=0,V=c.length;z<V;z++){const N=c[z],W=N.color,Z=N.intensity,Q=N.distance;let ce=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===1030?ce=N.shadow.map.texture:ce=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=W.r*Z,f+=W.g*Z,d+=W.b*Z;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],Z);D++}else if(N.isSunLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const re=N.shadow,oe=t.get(N);oe.shadowIntensity=re.intensity,oe.shadowBias=re.bias,oe.shadowNormalBias=re.normalBias,oe.shadowRadius=re.radius,oe.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),n.sunShadow[v]=oe,n.sunShadowMap[v]=ce;const Ne=re.getViewportCount();for(let we=0;we<Ne;we++)n.sunShadowMatrix[E+we]=re.getMatrix(we),n.sunShadowCascade[E+we]=re._cascadeData[we];E+=Ne,v++}n.sun[g]=Y,g++}else if(N.isDirectionalLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const re=N.shadow,oe=t.get(N);oe.shadowIntensity=re.intensity,oe.shadowBias=re.bias,oe.shadowNormalBias=re.normalBias,oe.shadowRadius=re.radius,oe.shadowMapSize=re.mapSize,n.directionalShadow[m]=oe,n.directionalShadowMap[m]=ce,n.directionalShadowMatrix[m]=N.shadow.matrix,T++}n.directional[m]=Y,m++}else if(N.isSpotLight){const Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(W).multiplyScalar(Z),Y.distance=Q,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[A]=Y;const re=N.shadow;if(N.map&&(n.spotLightMap[_]=N.map,_++,re.updateMatrices(N),N.castShadow&&b++),n.spotLightMatrix[A]=re.matrix,N.castShadow){const oe=t.get(N);oe.shadowIntensity=re.intensity,oe.shadowBias=re.bias,oe.shadowNormalBias=re.normalBias,oe.shadowRadius=re.radius,oe.shadowMapSize=re.mapSize,n.spotShadow[A]=oe,n.spotShadowMap[A]=ce,L++}A++}else if(N.isRectAreaLight){const Y=e.get(N);Y.color.copy(W).multiplyScalar(Z),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[C]=Y,C++}else if(N.isPointLight){const Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){const re=N.shadow,oe=t.get(N);oe.shadowIntensity=re.intensity,oe.shadowBias=re.bias,oe.shadowNormalBias=re.normalBias,oe.shadowRadius=re.radius,oe.shadowMapSize=re.mapSize,oe.shadowCameraNear=re.camera.near,oe.shadowCameraFar=re.camera.far,n.pointShadow[h]=oe,n.pointShadowMap[h]=ce,n.pointShadowMatrix[h]=N.shadow.matrix,y++}n.point[h]=Y,h++}else if(N.isHemisphereLight){const Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(Z),Y.groundColor.copy(N.groundColor).multiplyScalar(Z),n.hemi[S]=Y,S++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;const B=n.hash;(B.sunLength!==g||B.directionalLength!==m||B.pointLength!==h||B.spotLength!==A||B.rectAreaLength!==C||B.hemiLength!==S||B.numSunShadows!==v||B.numDirectionalShadows!==T||B.numPointShadows!==y||B.numSpotShadows!==L||B.numSpotMaps!==_||B.numLightProbes!==D)&&(n.sun.length=g,n.directional.length=m,n.spot.length=A,n.rectArea.length=C,n.point.length=h,n.hemi.length=S,n.sunShadow.length=v,n.sunShadowMap.length=v,n.sunShadowMatrix.length=E,n.sunShadowCascade.length=E,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=y,n.pointShadowMap.length=y,n.pointShadowMatrix.length=y,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+_-b,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=D,B.sunLength=g,B.directionalLength=m,B.pointLength=h,B.spotLength=A,B.rectAreaLength=C,B.hemiLength=S,B.numSunShadows=v,B.numDirectionalShadows=T,B.numPointShadows=y,B.numSpotShadows=L,B.numSpotMaps=_,B.numLightProbes=D,n.version=Pp++)}function l(c,u){let f=0,d=0,g=0,v=0,E=0,m=0;const h=u.matrixWorldInverse;for(let A=0,C=c.length;A<C;A++){const S=c[A];if(S.isSunLight){const T=n.sun[f];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(h),f++}else if(S.isDirectionalLight){const T=n.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),d++}else if(S.isSpotLight){const T=n.spot[v];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(h),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(h),v++}else if(S.isRectAreaLight){const T=n.rectArea[E];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(h),a.identity(),r.copy(S.matrixWorld),r.premultiply(h),a.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),E++}else if(S.isPointLight){const T=n.point[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(h),g++}else if(S.isHemisphereLight){const T=n.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(h),m++}}}return{setup:o,setupView:l,state:n}}function ll(i){const e=new Dp(i),t=[],n=[],s=[];function r(d){f.camera=d,t.length=0,n.length=0,s.length=0}function a(d){t.push(d)}function o(d){n.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Ip(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new ll(i),e.set(s,[o])):r>=a.length?(o=new ll(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const Fp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Np=`uniform sampler2D shadow_pass;
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
}`,Up=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],Op=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],cl=new Nt,hs=new I,xa=new I;function Bp(i,e,t){let n=new Fa;const s=new st,r=new st,a=new Ft,o=new Wc,l=new Xc,c={},u=t.maxTextureSize,f={0:1,1:0,2:2},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:Fp,fragmentShader:Np}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const v=new gn;v.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new mt(v,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let h=this.type;this.render=function(y,L,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;this.type===2&&(We("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=1);const b=i.getRenderTarget(),D=i.getActiveCubeFace(),B=i.getActiveMipmapLevel(),z=i.state;z.setBlending(0),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const V=h!==this.type;V&&L.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(W=>W.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,W=y.length;N<W;N++){const Z=y[N],Q=Z.shadow;if(Q===void 0){We("WebGLShadowMap:",Z,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);const ce=Q.getFrameExtents();s.multiply(ce),r.copy(Q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ce.x),s.x=r.x*ce.x,Q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ce.y),s.y=r.y*ce.y,Q.mapSize.y=r.y));const Y=i.state.buffers.depth.getReversed();if(Q.camera._reversedDepth=Y,Q.map===null||V===!0){if(Q.map!==null&&(Q.map.depthTexture!==null&&(Q.map.depthTexture.dispose(),Q.map.depthTexture=null),Q.map.dispose()),this.type===3){if(Z.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Q.map=new wn(s.x,s.y,{format:1030,type:1016,minFilter:1006,magFilter:1006,generateMipmaps:!1}),Q.map.texture.name=Z.name+".shadowMap",Q.map.depthTexture=new _s(s.x,s.y,1015),Q.map.depthTexture.name=Z.name+".shadowMapDepth",Q.map.depthTexture.format=1026,Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=1003,Q.map.depthTexture.magFilter=1003}else Z.isPointLight?(Q.map=new Fl(s.x),Q.map.depthTexture=new Oc(s.x,1014)):(Q.map=new wn(s.x,s.y),Q.map.depthTexture=new _s(s.x,s.y,1014)),Q.map.depthTexture.name=Z.name+".shadowMap",Q.map.depthTexture.format=1026,this.type===1?(Q.map.depthTexture.compareFunction=Y?518:515,Q.map.depthTexture.minFilter=1006,Q.map.depthTexture.magFilter=1006):(Q.map.depthTexture.compareFunction=null,Q.map.depthTexture.minFilter=1003,Q.map.depthTexture.magFilter=1003);Q.camera.updateProjectionMatrix()}Q.map.isWebGLCubeRenderTarget!==!0&&(Q.map.width!==s.x||Q.map.height!==s.y)&&Q.map.setSize(s.x,s.y);const re=Q.map.isWebGLCubeRenderTarget?6:Q.getViewportCount();Z.isPointLight!==!0&&Q.updateMatrices(Z,_);for(let oe=0;oe<re;oe++){const Ne=Q.getCamera(oe);if(Z.isPointLight){const we=Q.camera,ft=Q.matrix,je=Z.distance||we.far;je!==we.far&&(we.far=je,we.updateProjectionMatrix()),hs.setFromMatrixPosition(Z.matrixWorld),we.position.copy(hs),xa.copy(we.position),xa.add(Up[oe]),we.up.copy(Op[oe]),we.lookAt(xa),we.updateMatrixWorld(),ft.makeTranslation(-hs.x,-hs.y,-hs.z),cl.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),Q._frustum.setFromProjectionMatrix(cl,we.coordinateSystem,we.reversedDepth)}if(Q.map.isWebGLCubeRenderTarget)i.setRenderTarget(Q.map,oe),i.clear();else{oe===0&&(i.setRenderTarget(Q.map),i.clear());const we=Q.getViewport(oe);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),z.viewport(a)}n=Q.getFrustum(oe),S(L,_,Ne,Z,this.type)}Q.isPointLightShadow!==!0&&this.type===3&&A(Q,_),Q.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(b,D,B)};function A(y,L){const _=e.update(E);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,g.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),y.mapPass===null?y.mapPass=new wn(s.x,s.y,{format:1030,type:1016}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),d.uniforms.shadow_pass.value=y.map.depthTexture,d.uniforms.resolution.value.set(y.map.width,y.map.height),d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(L,null,_,d,E,null),g.uniforms.shadow_pass.value=y.mapPass.texture,g.uniforms.resolution.value.set(y.map.width,y.map.height),g.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(L,null,_,g,E,null)}function C(y,L,_,b){let D=null;const B=_.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(B!==void 0)D=B;else if(D=_.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const z=D.uuid,V=L.uuid;let N=c[z];N===void 0&&(N={},c[z]=N);let W=N[V];W===void 0&&(W=D.clone(),N[V]=W,L.addEventListener("dispose",T)),D=W}if(D.visible=L.visible,D.wireframe=L.wireframe,b===3?D.side=L.shadowSide!==null?L.shadowSide:L.side:D.side=L.shadowSide!==null?L.shadowSide:f[L.side],D.alphaMap=L.alphaMap,D.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,D.map=L.map,D.clipShadows=L.clipShadows,D.clippingPlanes=L.clippingPlanes,D.clipIntersection=L.clipIntersection,D.displacementMap=L.displacementMap,D.displacementScale=L.displacementScale,D.displacementBias=L.displacementBias,D.wireframeLinewidth=L.wireframeLinewidth,D.linewidth=L.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const z=i.properties.get(D);z.light=_}return D}function S(y,L,_,b,D){if(y.visible===!1)return;if(y.layers.test(L.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&D===3)&&(!y.frustumCulled||y.intersectsFrustum(n))){y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,y.matrixWorld);const V=e.update(y),N=y.material;if(Array.isArray(N)){const W=V.groups;for(let Z=0,Q=W.length;Z<Q;Z++){const ce=W[Z],Y=N[ce.materialIndex];if(Y&&Y.visible){const re=C(y,Y,b,D);y.onBeforeShadow(i,y,L,_,V,re,ce),i.renderBufferDirect(_,null,V,re,y,ce),y.onAfterShadow(i,y,L,_,V,re,ce)}}}else if(N.visible){const W=C(y,N,b,D);y.onBeforeShadow(i,y,L,_,V,W,null),i.renderBufferDirect(_,null,V,W,y,null),y.onAfterShadow(i,y,L,_,V,W,null)}}const z=y.children;for(let V=0,N=z.length;V<N;V++)S(z[V],L,_,b,D)}function T(y){y.target.removeEventListener("dispose",T);for(const _ in c){const b=c[_],D=y.target.uuid;D in b&&(b[D].dispose(),delete b[D])}}}function zp(i,e){function t(){let U=!1;const de=new Ft;let ee=null;const ve=new Ft(0,0,0,0);return{setMask:function(ye){ee!==ye&&!U&&(i.colorMask(ye,ye,ye,ye),ee=ye)},setLocked:function(ye){U=ye},setClear:function(ye,ae,me,te,it){it===!0&&(ye*=te,ae*=te,me*=te),de.set(ye,ae,me,te),ve.equals(de)===!1&&(i.clearColor(ye,ae,me,te),ve.copy(de))},reset:function(){U=!1,ee=null,ve.set(-1,0,0,0)}}}function n(){let U=!1,de=!1,ee=null,ve=null,ye=null;return{setReversed:function(ae){if(de!==ae){const me=e.get("EXT_clip_control");ae?me.clipControlEXT(me.LOWER_LEFT_EXT,me.ZERO_TO_ONE_EXT):me.clipControlEXT(me.LOWER_LEFT_EXT,me.NEGATIVE_ONE_TO_ONE_EXT),de=ae;const te=ye;ye=null,this.setClear(te)}},getReversed:function(){return de},setTest:function(ae){ae?se(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(ae){ee!==ae&&!U&&(i.depthMask(ae),ee=ae)},setFunc:function(ae){if(de&&(ae=uc[ae]),ve!==ae){switch(ae){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=ae}},setLocked:function(ae){U=ae},setClear:function(ae){ye!==ae&&(ye=ae,de&&(ae=1-ae),i.clearDepth(ae))},reset:function(){U=!1,ee=null,ve=null,ye=null,de=!1}}}function s(){let U=!1,de=null,ee=null,ve=null,ye=null,ae=null,me=null,te=null,it=null;return{setTest:function(dt){U||(dt?se(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(dt){de!==dt&&!U&&(i.stencilMask(dt),de=dt)},setFunc:function(dt,St,qt){(ee!==dt||ve!==St||ye!==qt)&&(i.stencilFunc(dt,St,qt),ee=dt,ve=St,ye=qt)},setOp:function(dt,St,qt){(ae!==dt||me!==St||te!==qt)&&(i.stencilOp(dt,St,qt),ae=dt,me=St,te=qt)},setLocked:function(dt){U=dt},setClear:function(dt){it!==dt&&(i.clearStencil(dt),it=dt)},reset:function(){U=!1,de=null,ee=null,ve=null,ye=null,ae=null,me=null,te=null,it=null}}}const r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let u={},f={},d={},g=new WeakMap,v=[],E=null,m=!1,h=null,A=null,C=null,S=null,T=null,y=null,L=null,_=new nt(0,0,0),b=0,D=!1,B=null,z=null,V=null,N=null,W=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,ce=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Q=ce>=1):Y.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Q=ce>=2);let re=null,oe={};const Ne=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),ft=new Ft().fromArray(Ne),je=new Ft().fromArray(we);function Ze(U,de,ee,ve){const ye=new Uint8Array(4),ae=i.createTexture();i.bindTexture(U,ae),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let me=0;me<ee;me++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(de+me,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return ae}const J={};J[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(3),Ye(!1),At(1),se(i.CULL_FACE),rt(0);function se(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function fe(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function He(U,de){return d[U]!==de?(i.bindFramebuffer(U,de),d[U]=de,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=de),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=de),!0):!1}function Ae(U,de){let ee=v,ve=!1;if(U){ee=g.get(de),ee===void 0&&(ee=[],g.set(de,ee));const ye=U.textures;if(ee.length!==ye.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,me=ye.length;ae<me;ae++)ee[ae]=i.COLOR_ATTACHMENT0+ae;ee.length=ye.length,ve=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ve=!0);ve&&i.drawBuffers(ee)}function Je(U){return E!==U?(i.useProgram(U),E=U,!0):!1}const gt={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};gt[103]=i.MIN,gt[104]=i.MAX;const ke={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function rt(U,de,ee,ve,ye,ae,me,te,it,dt){if(U===0){m===!0&&(fe(i.BLEND),m=!1);return}if(m===!1&&(se(i.BLEND),m=!0),U!==5){if(U!==h||dt!==D){if((A!==100||T!==100)&&(i.blendEquation(i.FUNC_ADD),A=100,T=100),dt)switch(U){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ut("WebGLState: Invalid blending: ",U);break}else switch(U){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case 3:ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case 4:ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ut("WebGLState: Invalid blending: ",U);break}C=null,S=null,y=null,L=null,_.set(0,0,0),b=0,h=U,D=dt}return}ye=ye||de,ae=ae||ee,me=me||ve,(de!==A||ye!==T)&&(i.blendEquationSeparate(gt[de],gt[ye]),A=de,T=ye),(ee!==C||ve!==S||ae!==y||me!==L)&&(i.blendFuncSeparate(ke[ee],ke[ve],ke[ae],ke[me]),C=ee,S=ve,y=ae,L=me),(te.equals(_)===!1||it!==b)&&(i.blendColor(te.r,te.g,te.b,it),_.copy(te),b=it),h=U,D=!1}function _t(U,de){U.side===2?fe(i.CULL_FACE):se(i.CULL_FACE);let ee=U.side===1;de&&(ee=!ee),Ye(ee),U.blending===1&&U.transparent===!1?rt(0):rt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ve=U.stencilWrite;o.setTest(ve),ve&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),pt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(U){B!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),B=U)}function At(U){U!==0?(se(i.CULL_FACE),U!==z&&(U===1?i.cullFace(i.BACK):U===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),z=U}function Tt(U){U!==V&&(Q&&i.lineWidth(U),V=U)}function pt(U,de,ee){U?(se(i.POLYGON_OFFSET_FILL),(N!==de||W!==ee)&&(N=de,W=ee,a.getReversed()&&(de=-de),i.polygonOffset(de,ee))):fe(i.POLYGON_OFFSET_FILL)}function ze(U){U?se(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function Pt(U){U===void 0&&(U=i.TEXTURE0+Z-1),re!==U&&(i.activeTexture(U),re=U)}function O(U,de,ee){ee===void 0&&(re===null?ee=i.TEXTURE0+Z-1:ee=re);let ve=oe[ee];ve===void 0&&(ve={type:void 0,texture:void 0},oe[ee]=ve),(ve.type!==U||ve.texture!==de)&&(re!==ee&&(i.activeTexture(ee),re=ee),i.bindTexture(U,de||J[U]),ve.type=U,ve.texture=de)}function Bt(){const U=oe[re];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function xt(){try{i.compressedTexImage2D(...arguments)}catch(U){ut("WebGLState:",U)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(U){ut("WebGLState:",U)}}function p(){try{i.texSubImage2D(...arguments)}catch(U){ut("WebGLState:",U)}}function G(){try{i.texSubImage3D(...arguments)}catch(U){ut("WebGLState:",U)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(U){ut("WebGLState:",U)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(U){ut("WebGLState:",U)}}function ue(){try{i.texStorage2D(...arguments)}catch(U){ut("WebGLState:",U)}}function ge(){try{i.texStorage3D(...arguments)}catch(U){ut("WebGLState:",U)}}function j(){try{i.texImage2D(...arguments)}catch(U){ut("WebGLState:",U)}}function ne(){try{i.texImage3D(...arguments)}catch(U){ut("WebGLState:",U)}}function _e(U){return f[U]!==void 0?f[U]:i.getParameter(U)}function Oe(U,de){f[U]!==de&&(i.pixelStorei(U,de),f[U]=de)}function xe(U){ft.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ft.copy(U))}function pe(U){je.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),je.copy(U))}function Ie(U,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let ve=ee.get(U);ve===void 0&&(ve=i.getUniformBlockIndex(de,U.name),ee.set(U,ve))}function Fe(U,de){const ve=c.get(de).get(U);l.get(de)!==ve&&(i.uniformBlockBinding(de,ve,U.__bindingPointIndex),l.set(de,ve))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},re=null,oe={},d={},g=new WeakMap,v=[],E=null,m=!1,h=null,A=null,C=null,S=null,T=null,y=null,L=null,_=new nt(0,0,0),b=0,D=!1,B=null,z=null,V=null,N=null,W=null,ft.set(0,0,i.canvas.width,i.canvas.height),je.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:se,disable:fe,bindFramebuffer:He,drawBuffers:Ae,useProgram:Je,setBlending:rt,setMaterial:_t,setFlipSided:Ye,setCullFace:At,setLineWidth:Tt,setPolygonOffset:pt,setScissorTest:ze,activeTexture:Pt,bindTexture:O,unbindTexture:Bt,compressedTexImage2D:xt,compressedTexImage3D:w,texImage2D:j,texImage3D:ne,pixelStorei:Oe,getParameter:_e,updateUBOMapping:Ie,uniformBlockBinding:Fe,texStorage2D:ue,texStorage3D:ge,texSubImage2D:p,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:K,scissor:xe,viewport:pe,reset:Xe}}function Gp(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,u=new WeakMap,f=new Set;let d;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(w,p){return v?new OffscreenCanvas(w,p):xr("canvas")}function m(w,p,G){let X=1;const K=xt(w);if((K.width>G||K.height>G)&&(X=G/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ue=Math.floor(X*K.width),ge=Math.floor(X*K.height);d===void 0&&(d=E(ue,ge));const j=p?E(ue,ge):d;return j.width=ue,j.height=ge,j.getContext("2d").drawImage(w,0,0,ue,ge),We("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ue+"x"+ge+")."),j}else return"data"in w&&We("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),w;return w}function h(w){return w.generateMipmaps}function A(w){i.generateMipmap(w)}function C(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(w,p,G,X,K,ue=!1){if(w!==null){if(i[w]!==void 0)return i[w];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ge;X&&(ge=e.get("EXT_texture_norm16"),ge||We("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=p;if(p===i.RED&&(G===i.FLOAT&&(j=i.R32F),G===i.HALF_FLOAT&&(j=i.R16F),G===i.UNSIGNED_BYTE&&(j=i.R8),G===i.UNSIGNED_SHORT&&ge&&(j=ge.R16_EXT),G===i.SHORT&&ge&&(j=ge.R16_SNORM_EXT)),p===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(j=i.R8UI),G===i.UNSIGNED_SHORT&&(j=i.R16UI),G===i.UNSIGNED_INT&&(j=i.R32UI),G===i.BYTE&&(j=i.R8I),G===i.SHORT&&(j=i.R16I),G===i.INT&&(j=i.R32I)),p===i.RG&&(G===i.FLOAT&&(j=i.RG32F),G===i.HALF_FLOAT&&(j=i.RG16F),G===i.UNSIGNED_BYTE&&(j=i.RG8),G===i.UNSIGNED_SHORT&&ge&&(j=ge.RG16_EXT),G===i.SHORT&&ge&&(j=ge.RG16_SNORM_EXT)),p===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(j=i.RG8UI),G===i.UNSIGNED_SHORT&&(j=i.RG16UI),G===i.UNSIGNED_INT&&(j=i.RG32UI),G===i.BYTE&&(j=i.RG8I),G===i.SHORT&&(j=i.RG16I),G===i.INT&&(j=i.RG32I)),p===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(j=i.RGB8UI),G===i.UNSIGNED_SHORT&&(j=i.RGB16UI),G===i.UNSIGNED_INT&&(j=i.RGB32UI),G===i.BYTE&&(j=i.RGB8I),G===i.SHORT&&(j=i.RGB16I),G===i.INT&&(j=i.RGB32I)),p===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),G===i.UNSIGNED_INT&&(j=i.RGBA32UI),G===i.BYTE&&(j=i.RGBA8I),G===i.SHORT&&(j=i.RGBA16I),G===i.INT&&(j=i.RGBA32I)),p===i.RGB&&(G===i.UNSIGNED_SHORT&&ge&&(j=ge.RGB16_EXT),G===i.SHORT&&ge&&(j=ge.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),p===i.RGBA){const ne=ue?_r:lt.getTransfer(K);G===i.FLOAT&&(j=i.RGBA32F),G===i.HALF_FLOAT&&(j=i.RGBA16F),G===i.UNSIGNED_BYTE&&(j=ne===Et?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&ge&&(j=ge.RGBA16_EXT),G===i.SHORT&&ge&&(j=ge.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function T(w,p){let G;return w?p===null||p===1014||p===1020?G=i.DEPTH24_STENCIL8:p===1015?G=i.DEPTH32F_STENCIL8:p===1012&&(G=i.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===1014||p===1020?G=i.DEPTH_COMPONENT24:p===1015?G=i.DEPTH_COMPONENT32F:p===1012&&(G=i.DEPTH_COMPONENT16),G}function y(w,p){return h(w)===!0||w.isFramebufferTexture&&w.minFilter!==1003&&w.minFilter!==1006?Math.log2(Math.max(p.width,p.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?p.mipmaps.length:1}function L(w){const p=w.target;p.removeEventListener("dispose",L),b(p),p.isVideoTexture&&u.delete(p),p.isHTMLTexture&&f.delete(p)}function _(w){const p=w.target;p.removeEventListener("dispose",_),B(p)}function b(w){const p=n.get(w);if(p.__webglInit===void 0)return;const G=w.source,X=g.get(G);if(X){const K=X[p.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(w),Object.keys(X).length===0&&g.delete(G)}n.remove(w)}function D(w){const p=n.get(w);i.deleteTexture(p.__webglTexture);const G=w.source,X=g.get(G);delete X[p.__cacheKey],a.memory.textures--}function B(w){const p=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(p.__webglFramebuffer[X]))for(let K=0;K<p.__webglFramebuffer[X].length;K++)i.deleteFramebuffer(p.__webglFramebuffer[X][K]);else i.deleteFramebuffer(p.__webglFramebuffer[X]);p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer[X])}else{if(Array.isArray(p.__webglFramebuffer))for(let X=0;X<p.__webglFramebuffer.length;X++)i.deleteFramebuffer(p.__webglFramebuffer[X]);else i.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&i.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&i.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let X=0;X<p.__webglColorRenderbuffer.length;X++)p.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(p.__webglColorRenderbuffer[X]);p.__webglDepthRenderbuffer&&i.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const G=w.textures;for(let X=0,K=G.length;X<K;X++){const ue=n.get(G[X]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(G[X])}n.remove(w)}let z=0;function V(){z=0}function N(){return z}function W(w){z=w}function Z(){const w=z;return w>=s.maxTextures&&We("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),z+=1,w}function Q(w){const p=[];return p.push(w.wrapS),p.push(w.wrapT),p.push(w.wrapR||0),p.push(w.magFilter),p.push(w.minFilter),p.push(w.anisotropy),p.push(w.internalFormat),p.push(w.format),p.push(w.type),p.push(w.generateMipmaps),p.push(w.premultiplyAlpha),p.push(w.flipY),p.push(w.unpackAlignment),p.push(w.colorSpace),p.join()}function ce(w,p){const G=n.get(w);if(w.isVideoTexture&&O(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&G.__version!==w.version){const X=w.image;if(X===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(G,w,p);return}}else w.isExternalTexture&&(G.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+p)}function Y(w,p){const G=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&G.__version!==w.version){fe(G,w,p);return}else w.isExternalTexture&&(G.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+p)}function re(w,p){const G=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&G.__version!==w.version){fe(G,w,p);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+p)}function oe(w,p){const G=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&G.__version!==w.version){He(G,w,p);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+p)}const Ne={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},we={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},ft={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function je(w,p){if(p.type===1015&&e.has("OES_texture_float_linear")===!1&&(p.magFilter===1006||p.magFilter===1007||p.magFilter===1005||p.magFilter===1008||p.minFilter===1006||p.minFilter===1007||p.minFilter===1005||p.minFilter===1008)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Ne[p.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Ne[p.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Ne[p.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,we[p.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,we[p.minFilter]),p.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ft[p.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===1003||p.minFilter!==1005&&p.minFilter!==1008||p.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||n.get(p).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),n.get(p).__currentAnisotropy=p.anisotropy}}}function Ze(w,p){let G=!1;w.__webglInit===void 0&&(w.__webglInit=!0,p.addEventListener("dispose",L));const X=p.source;let K=g.get(X);K===void 0&&(K={},g.set(X,K));const ue=Q(p);if(ue!==w.__cacheKey){K[ue]===void 0&&(K[ue]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),K[ue].usedTimes++;const ge=K[w.__cacheKey];ge!==void 0&&(K[w.__cacheKey].usedTimes--,ge.usedTimes===0&&D(p)),w.__cacheKey=ue,w.__webglTexture=K[ue].texture}return G}function J(w,p,G){return Math.floor(Math.floor(w/G)/p)}function se(w,p,G,X){const ue=w.updateRanges;if(ue.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,p.width,p.height,G,X,p.data);else{ue.sort((Oe,xe)=>Oe.start-xe.start);let ge=0;for(let Oe=1;Oe<ue.length;Oe++){const xe=ue[ge],pe=ue[Oe],Ie=xe.start+xe.count,Fe=J(pe.start,p.width,4),Xe=J(xe.start,p.width,4);pe.start<=Ie+1&&Fe===Xe&&J(pe.start+pe.count-1,p.width,4)===Fe?xe.count=Math.max(xe.count,pe.start+pe.count-xe.start):(++ge,ue[ge]=pe)}ue.length=ge+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),_e=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,p.width);for(let Oe=0,xe=ue.length;Oe<xe;Oe++){const pe=ue[Oe],Ie=Math.floor(pe.start/4),Fe=Math.ceil(pe.count/4),Xe=Ie%p.width,U=Math.floor(Ie/p.width),de=Fe,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,Xe,U,de,ee,G,X,p.data)}w.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,_e)}}function fe(w,p,G){let X=i.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),p.isData3DTexture&&(X=i.TEXTURE_3D);const K=Ze(w,p),ue=p.source;t.bindTexture(X,w.__webglTexture,i.TEXTURE0+G);const ge=n.get(ue);if(ue.version!==ge.__version||K===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){const ee=lt.getPrimaries(lt.workingColorSpace),ve=p.colorSpace===""?null:lt.getPrimaries(p.colorSpace),ye=p.colorSpace===""||ee===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment);let ne=m(p.image,!1,s.maxTextureSize);ne=Bt(p,ne);const _e=r.convert(p.format,p.colorSpace),Oe=r.convert(p.type);let xe=S(p.internalFormat,_e,Oe,p.normalized,p.colorSpace,p.isVideoTexture);je(X,p);let pe;const Ie=p.mipmaps,Fe=p.isVideoTexture!==!0,Xe=ge.__version===void 0||K===!0,U=ue.dataReady,de=y(p,ne);if(p.isDepthTexture)xe=T(p.format===1027,p.type),Xe&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,xe,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,xe,ne.width,ne.height,0,_e,Oe,null));else if(p.isDataTexture)if(Ie.length>0){Fe&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,xe,Ie[0].width,Ie[0].height);for(let ee=0,ve=Ie.length;ee<ve;ee++)pe=Ie[ee],Fe?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,pe.width,pe.height,_e,Oe,pe.data):t.texImage2D(i.TEXTURE_2D,ee,xe,pe.width,pe.height,0,_e,Oe,pe.data);p.generateMipmaps=!1}else Fe?(Xe&&t.texStorage2D(i.TEXTURE_2D,de,xe,ne.width,ne.height),U&&se(p,ne,_e,Oe)):t.texImage2D(i.TEXTURE_2D,0,xe,ne.width,ne.height,0,_e,Oe,ne.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Fe&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,xe,Ie[0].width,Ie[0].height,ne.depth);for(let ee=0,ve=Ie.length;ee<ve;ee++)if(pe=Ie[ee],p.format!==1023)if(_e!==null)if(Fe){if(U)if(p.layerUpdates.size>0){const ye=ko(pe.width,pe.height,p.format,p.type);for(const ae of p.layerUpdates){const me=pe.data.subarray(ae*ye/pe.data.BYTES_PER_ELEMENT,(ae+1)*ye/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,ae,pe.width,pe.height,1,_e,me)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ne.depth,_e,pe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,xe,pe.width,pe.height,ne.depth,0,pe.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,pe.width,pe.height,ne.depth,_e,Oe,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,xe,pe.width,pe.height,ne.depth,0,_e,Oe,pe.data);p.layerUpdates.size>0&&p.clearLayerUpdates()}else{Fe&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,xe,Ie[0].width,Ie[0].height);for(let ee=0,ve=Ie.length;ee<ve;ee++)pe=Ie[ee],p.format!==1023?_e!==null?Fe?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,pe.width,pe.height,_e,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,xe,pe.width,pe.height,0,pe.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,pe.width,pe.height,_e,Oe,pe.data):t.texImage2D(i.TEXTURE_2D,ee,xe,pe.width,pe.height,0,_e,Oe,pe.data)}else if(p.isDataArrayTexture)if(Fe){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,xe,ne.width,ne.height,ne.depth),U)if(p.layerUpdates.size>0){const ee=ko(ne.width,ne.height,p.format,p.type);for(const ve of p.layerUpdates){const ye=ne.data.subarray(ve*ee/ne.data.BYTES_PER_ELEMENT,(ve+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ve,ne.width,ne.height,1,_e,Oe,ye)}p.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(p.isData3DTexture)Fe?(Xe&&t.texStorage3D(i.TEXTURE_3D,de,xe,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)):t.texImage3D(i.TEXTURE_3D,0,xe,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(p.isFramebufferTexture){if(Xe)if(Fe)t.texStorage2D(i.TEXTURE_2D,de,xe,ne.width,ne.height);else{let ee=ne.width,ve=ne.height;for(let ye=0;ye<de;ye++)t.texImage2D(i.TEXTURE_2D,ye,xe,ee,ve,0,_e,Oe,null),ee>>=1,ve>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in i){const ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),ne.parentNode!==ee){ee.appendChild(ne),f.add(p),ee.onpaint=ve=>{const ye=ve.changedElements;for(const ae of f)ye.includes(ae.image)&&(ae.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const ye=i.RGBA,ae=i.RGBA,me=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ye,ae,me,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Fe&&Xe){const ee=xt(Ie[0]);t.texStorage2D(i.TEXTURE_2D,de,xe,ee.width,ee.height)}for(let ee=0,ve=Ie.length;ee<ve;ee++)pe=Ie[ee],Fe?U&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,_e,Oe,pe):t.texImage2D(i.TEXTURE_2D,ee,xe,_e,Oe,pe);p.generateMipmaps=!1}else if(Fe){if(Xe){const ee=xt(ne);t.texStorage2D(i.TEXTURE_2D,de,xe,ee.width,ee.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e,Oe,ne)}else t.texImage2D(i.TEXTURE_2D,0,xe,_e,Oe,ne);h(p)&&A(X),ge.__version=ue.version,p.onUpdate&&p.onUpdate(p)}w.__version=p.version}function He(w,p,G){if(p.image.length!==6)return;const X=Ze(w,p),K=p.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+G);const ue=n.get(K);if(K.version!==ue.__version||X===!0){t.activeTexture(i.TEXTURE0+G);const ge=lt.getPrimaries(lt.workingColorSpace),j=p.colorSpace===""?null:lt.getPrimaries(p.colorSpace),ne=p.colorSpace===""||ge===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,p.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,p.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const _e=p.isCompressedTexture||p.image[0].isCompressedTexture,Oe=p.image[0]&&p.image[0].isDataTexture,xe=[];for(let ae=0;ae<6;ae++)!_e&&!Oe?xe[ae]=m(p.image[ae],!0,s.maxCubemapSize):xe[ae]=Oe?p.image[ae].image:p.image[ae],xe[ae]=Bt(p,xe[ae]);const pe=xe[0],Ie=r.convert(p.format,p.colorSpace),Fe=r.convert(p.type),Xe=S(p.internalFormat,Ie,Fe,p.normalized,p.colorSpace),U=p.isVideoTexture!==!0,de=ue.__version===void 0||X===!0,ee=K.dataReady;let ve=y(p,pe);je(i.TEXTURE_CUBE_MAP,p);let ye;if(_e){U&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,pe.width,pe.height);for(let ae=0;ae<6;ae++){ye=xe[ae].mipmaps;for(let me=0;me<ye.length;me++){const te=ye[me];p.format!==1023?Ie!==null?U?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me,0,0,te.width,te.height,Ie,te.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me,Xe,te.width,te.height,0,te.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me,0,0,te.width,te.height,Ie,Fe,te.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me,Xe,te.width,te.height,0,Ie,Fe,te.data)}}}else{if(ye=p.mipmaps,U&&de){ye.length>0&&ve++;const ae=xt(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Xe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Oe){U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,xe[ae].width,xe[ae].height,Ie,Fe,xe[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,xe[ae].width,xe[ae].height,0,Ie,Fe,xe[ae].data);for(let me=0;me<ye.length;me++){const it=ye[me].image[ae].image;U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me+1,0,0,it.width,it.height,Ie,Fe,it.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me+1,Xe,it.width,it.height,0,Ie,Fe,it.data)}}else{U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ie,Fe,xe[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,Ie,Fe,xe[ae]);for(let me=0;me<ye.length;me++){const te=ye[me];U?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me+1,0,0,Ie,Fe,te.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,me+1,Xe,Ie,Fe,te.image[ae])}}}h(p)&&A(i.TEXTURE_CUBE_MAP),ue.__version=K.version,p.onUpdate&&p.onUpdate(p)}w.__version=p.version}function Ae(w,p,G,X,K,ue){const ge=r.convert(G.format,G.colorSpace),j=r.convert(G.type),ne=S(G.internalFormat,ge,j,G.normalized,G.colorSpace),_e=n.get(p),Oe=n.get(G);if(Oe.__renderTarget=p,!_e.__hasExternalTextures){const xe=Math.max(1,p.width>>ue),pe=Math.max(1,p.height>>ue);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ue,ne,xe,pe,p.depth,0,ge,j,null):t.texImage2D(K,ue,ne,xe,pe,0,ge,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Pt(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,Oe.__webglTexture,0,ze(p)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,Oe.__webglTexture,ue),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Je(w,p,G){if(i.bindRenderbuffer(i.RENDERBUFFER,w),p.depthBuffer){const X=p.depthTexture,K=X&&X.isDepthTexture?X.type:null,ue=T(p.stencilBuffer,K),ge=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Pt(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze(p),ue,p.width,p.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze(p),ue,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,ue,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ge,i.RENDERBUFFER,w)}else{const X=p.textures;for(let K=0;K<X.length;K++){const ue=X[K],ge=r.convert(ue.format,ue.colorSpace),j=r.convert(ue.type),ne=S(ue.internalFormat,ge,j,ue.normalized,ue.colorSpace);Pt(p)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ze(p),ne,p.width,p.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,ze(p),ne,p.width,p.height):i.renderbufferStorage(i.RENDERBUFFER,ne,p.width,p.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function gt(w,p,G){const X=p.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(p.depthTexture);if(K.__renderTarget=p,(!K.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),X){if(K.__webglInit===void 0&&(K.__webglInit=!0,p.depthTexture.addEventListener("dispose",L)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),je(i.TEXTURE_CUBE_MAP,p.depthTexture);const _e=r.convert(p.depthTexture.format),Oe=r.convert(p.depthTexture.type);let xe;p.depthTexture.format===1026?xe=i.DEPTH_COMPONENT24:p.depthTexture.format===1027&&(xe=i.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,xe,p.width,p.height,0,_e,Oe,null)}}else ce(p.depthTexture,0);const ue=K.__webglTexture,ge=ze(p),j=X?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,ne=p.depthTexture.format===1027?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(p.depthTexture.format===1026)Pt(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ue,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ue,0);else if(p.depthTexture.format===1027)Pt(p)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ue,0,ge):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ke(w){const p=n.get(w),G=w.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),X){const K=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,X.removeEventListener("dispose",K)};X.addEventListener("dispose",K),p.__depthDisposeCallback=K}p.__boundDepthTexture=X}if(w.depthTexture&&!p.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)gt(p.__webglFramebuffer[X],w,X);else{const X=w.texture.mipmaps;X&&X.length>0?gt(p.__webglFramebuffer[0],w,0):gt(p.__webglFramebuffer,w,0)}else if(G){p.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[X]),p.__webglDepthbuffer[X]===void 0)p.__webglDepthbuffer[X]=i.createRenderbuffer(),Je(p.__webglDepthbuffer[X],w,!1);else{const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=p.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}else{const X=w.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=i.createRenderbuffer(),Je(p.__webglDepthbuffer,w,!1);else{const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=p.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ue),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ue)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(w,p,G){const X=n.get(w);p!==void 0&&Ae(X.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&ke(w)}function _t(w){const p=w.texture,G=n.get(w),X=n.get(p);w.addEventListener("dispose",_);const K=w.textures,ue=w.isWebGLCubeRenderTarget===!0,ge=K.length>1;if(ge||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=p.version,a.memory.textures++),ue){G.__webglFramebuffer=[];for(let j=0;j<6;j++)if(p.mipmaps&&p.mipmaps.length>0){G.__webglFramebuffer[j]=[];for(let ne=0;ne<p.mipmaps.length;ne++)G.__webglFramebuffer[j][ne]=i.createFramebuffer()}else G.__webglFramebuffer[j]=i.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){G.__webglFramebuffer=[];for(let j=0;j<p.mipmaps.length;j++)G.__webglFramebuffer[j]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(ge)for(let j=0,ne=K.length;j<ne;j++){const _e=n.get(K[j]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Pt(w)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){const ne=K[j];G.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[j]);const _e=r.convert(ne.format,ne.colorSpace),Oe=r.convert(ne.type),xe=S(ne.internalFormat,_e,Oe,ne.normalized,ne.colorSpace,w.isXRRenderTarget===!0),pe=ze(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,xe,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,G.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Je(G.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ue){t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),je(i.TEXTURE_CUBE_MAP,p);for(let j=0;j<6;j++)if(p.mipmaps&&p.mipmaps.length>0)for(let ne=0;ne<p.mipmaps.length;ne++)Ae(G.__webglFramebuffer[j][ne],w,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else Ae(G.__webglFramebuffer[j],w,p,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);h(p)&&A(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let j=0,ne=K.length;j<ne;j++){const _e=K[j],Oe=n.get(_e);let xe=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(xe=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Oe.__webglTexture),je(xe,_e),Ae(G.__webglFramebuffer,w,_e,i.COLOR_ATTACHMENT0+j,xe,0),h(_e)&&A(xe)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(j=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,X.__webglTexture),je(j,p),p.mipmaps&&p.mipmaps.length>0)for(let ne=0;ne<p.mipmaps.length;ne++)Ae(G.__webglFramebuffer[ne],w,p,i.COLOR_ATTACHMENT0,j,ne);else Ae(G.__webglFramebuffer,w,p,i.COLOR_ATTACHMENT0,j,0);h(p)&&A(j),t.unbindTexture()}w.depthBuffer&&ke(w)}function Ye(w){const p=w.textures;for(let G=0,X=p.length;G<X;G++){const K=p[G];if(h(K)){const ue=C(w),ge=n.get(K).__webglTexture;t.bindTexture(ue,ge),A(ue),t.unbindTexture()}}}const At=[],Tt=[];function pt(w){if(w.samples>0){if(Pt(w)===!1){const p=w.textures,G=w.width,X=w.height;let K=i.COLOR_BUFFER_BIT;const ue=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(w),j=p.length>1;if(j)for(let _e=0;_e<p.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const ne=w.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let _e=0;_e<p.length;_e++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[_e]);const Oe=n.get(p[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Oe,0)}i.blitFramebuffer(0,0,G,X,0,0,G,X,K,i.NEAREST),l===!0&&(At.length=0,Tt.length=0,At.push(i.COLOR_ATTACHMENT0+_e),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(At.push(ue),Tt.push(ue),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let _e=0;_e<p.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,ge.__webglColorRenderbuffer[_e]);const Oe=n.get(p[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){const p=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[p])}}}function ze(w){return Math.min(s.maxSamples,w.samples)}function Pt(w){const p=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function O(w){const p=a.render.frame;u.get(w)!==p&&(u.set(w,p),w.update())}function Bt(w,p){const G=w.colorSpace,X=w.format,K=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||G!==gr&&G!==""&&(lt.getTransfer(G)===Et?(X!==1023||K!==1009)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ut("WebGLTextures: Unsupported texture color space:",G)),p}function xt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=V,this.getTextureUnits=N,this.setTextureUnits=W,this.setTexture2D=ce,this.setTexture2DArray=Y,this.setTexture3D=re,this.setTextureCube=oe,this.rebindTextures=rt,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function kp(i,e){function t(n,s=""){let r;const a=lt.getTransfer(s);if(n===1009)return i.UNSIGNED_BYTE;if(n===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return i.BYTE;if(n===1011)return i.SHORT;if(n===1012)return i.UNSIGNED_SHORT;if(n===1013)return i.INT;if(n===1014)return i.UNSIGNED_INT;if(n===1015)return i.FLOAT;if(n===1016)return i.HALF_FLOAT;if(n===1021)return i.ALPHA;if(n===1022)return i.RGB;if(n===1023)return i.RGBA;if(n===1026)return i.DEPTH_COMPONENT;if(n===1027)return i.DEPTH_STENCIL;if(n===1028)return i.RED;if(n===1029)return i.RED_INTEGER;if(n===1030)return i.RG;if(n===1031)return i.RG_INTEGER;if(n===1033)return i.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===Et)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===33776)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===33776)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===35840)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===36196||n===37492)return a===Et?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===37496)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return r.COMPRESSED_R11_EAC;if(n===37489)return r.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return r.COMPRESSED_RG11_EAC;if(n===37491)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===37808)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===Et?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===36492)return a===Et?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===36283)return r.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Hp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vp=`
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

}`;class Wp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Rl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new In({vertexShader:Hp,fragmentShader:Vp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mt(new qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xp extends gi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,g=null,v=null;const E=typeof XRWebGLBinding<"u",m=new Wp,h={},A=t.getContextAttributes();let C=null,S=null;const T=[],y=[],L=new st;let _=null,b=null;const D=new mn;D.viewport=new Ft;const B=new mn;B.viewport=new Ft;const z=[D,B],V=new Qc;let N=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let se=T[J];return se===void 0&&(se=new Jr,T[J]=se),se.getTargetRaySpace()},this.getControllerGrip=function(J){let se=T[J];return se===void 0&&(se=new Jr,T[J]=se),se.getGripSpace()},this.getHand=function(J){let se=T[J];return se===void 0&&(se=new Jr,T[J]=se),se.getHandSpace()};function Z(J){const se=y.indexOf(J.inputSource);if(se===-1)return;const fe=T[se];fe!==void 0&&(fe.update(J.inputSource,J.frame,c||a),fe.dispatchEvent({type:J.type,data:J.inputSource}))}function Q(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",ce);for(let J=0;J<T.length;J++){const se=y[J];se!==null&&(y[J]=null,T[J].disconnect(se))}N=null,W=null,m.reset();for(const J in h)delete h[J];if(e.setRenderTarget(C),g=null,d=null,f=null,s=null,S=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(L.width,L.height,!1),b!==null){const J=b.camera;J.fov=b.fov,J.zoom=b.zoom,J.updateProjectionMatrix(),b=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return f===null&&E&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",ce),A.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(L),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,He=null,Ae=null;A.depth&&(Ae=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=A.stencil?1027:1026,He=A.stencil?1020:1014);const Je={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Je),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new wn(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new _s(d.textureWidth,d.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const fe={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,fe),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new wn(g.framebufferWidth,g.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ze.setContext(s),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ce(J){for(let se=0;se<J.removed.length;se++){const fe=J.removed[se],He=y.indexOf(fe);He>=0&&(y[He]=null,T[He].disconnect(fe))}for(let se=0;se<J.added.length;se++){const fe=J.added[se];let He=y.indexOf(fe);if(He===-1){for(let Je=0;Je<T.length;Je++)if(Je>=y.length){y.push(fe),He=Je;break}else if(y[Je]===null){y[Je]=fe,He=Je;break}if(He===-1)break}const Ae=T[He];Ae&&Ae.connect(fe)}}const Y=new I,re=new I;function oe(J,se,fe){Y.setFromMatrixPosition(se.matrixWorld),re.setFromMatrixPosition(fe.matrixWorld);const He=Y.distanceTo(re),Ae=se.projectionMatrix.elements,Je=fe.projectionMatrix.elements,gt=Ae[14]/(Ae[10]-1),ke=Ae[14]/(Ae[10]+1),rt=(Ae[9]+1)/Ae[5],_t=(Ae[9]-1)/Ae[5],Ye=(Ae[8]-1)/Ae[0],At=(Je[8]+1)/Je[0],Tt=gt*Ye,pt=gt*At,ze=He/(-Ye+At),Pt=ze*-Ye;if(se.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Pt),J.translateZ(ze),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Ae[10]===-1)J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const O=gt+ze,Bt=ke+ze,xt=Tt-Pt,w=pt+(He-Pt),p=rt*ke/Bt*O,G=_t*ke/Bt*O;J.projectionMatrix.makePerspective(xt,w,p,G,O,Bt),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function Ne(J,se){se===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(se.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let se=J.near,fe=J.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(fe=m.depthFar)),V.near=B.near=D.near=se,V.far=B.far=D.far=fe,(N!==V.near||W!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),N=V.near,W=V.far),V.layers.mask=J.layers.mask|6,D.layers.mask=V.layers.mask&-5,B.layers.mask=V.layers.mask&-3;const He=J.parent,Ae=V.cameras;Ne(V,He);for(let Je=0;Je<Ae.length;Je++)Ne(Ae[Je],He);Ae.length===2?oe(V,D,B):V.projectionMatrix.copy(D.projectionMatrix),b===null&&J.isPerspectiveCamera&&(b={camera:J,fov:J.fov,zoom:J.zoom}),we(J,V,He)};function we(J,se,fe){fe===null?J.matrix.copy(se.matrixWorld):(J.matrix.copy(fe.matrixWorld),J.matrix.invert(),J.matrix.multiply(se.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(se.projectionMatrix),J.projectionMatrixInverse.copy(se.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ta*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(J){return h[J]};let ft=null;function je(J,se){if(u=se.getViewerPose(c||a),v=se,u!==null){const fe=u.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let He=!1;fe.length!==V.cameras.length&&(V.cameras.length=0,He=!0);for(let ke=0;ke<fe.length;ke++){const rt=fe[ke];let _t=null;if(g!==null)_t=g.getViewport(rt);else{const At=f.getViewSubImage(d,rt);_t=At.viewport,ke===0&&(e.setRenderTargetTextures(S,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(S))}let Ye=z[ke];Ye===void 0&&(Ye=new mn,Ye.layers.enable(ke),Ye.viewport=new Ft,z[ke]=Ye),Ye.matrix.fromArray(rt.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(rt.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(_t.x,_t.y,_t.width,_t.height),ke===0&&(V.matrix.copy(Ye.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),He===!0&&V.cameras.push(Ye)}const Ae=s.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){f=n.getBinding();const ke=f.getDepthInformation(fe[0]);ke&&ke.isValid&&ke.texture&&m.init(ke,s.renderState)}if(Ae&&Ae.includes("camera-access")&&E){e.state.unbindTexture(),f=n.getBinding();for(let ke=0;ke<fe.length;ke++){const rt=fe[ke].camera;if(rt){let _t=h[rt];_t||(_t=new Rl,h[rt]=_t);const Ye=f.getCameraImage(rt);_t.sourceTexture=Ye}}}}for(let fe=0;fe<T.length;fe++){const He=y[fe],Ae=T[fe];He!==null&&Ae!==void 0&&Ae.update(He,se,c||a)}ft&&ft(J,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),v=null}const Ze=new Dl;Ze.setAnimationLoop(je),this.setAnimationLoop=function(J){ft=J},this.dispose=function(){}}}const qp=new Nt,zl=new Ke;zl.set(-1,0,0,0,1,0,0,0,1);function Yp(i,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Cl(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,A,C,S){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?r(m,h):h.isMeshLambertMaterial?(r(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(r(m,h),f(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&g(m,h,S)):h.isMeshMatcapMaterial?(r(m,h),v(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),E(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,A,C):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===1&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===1&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const A=e.get(h),C=A.envMap,S=A.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(qp.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(zl),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,A,C){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*A,m.scale.value=C*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function g(m,h,A){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===1&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.retroreflectivity>0&&(m.retroreflectivity.value=h.retroreflectivity),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,h){h.matcap&&(m.matcap.value=h.matcap)}function E(m,h){const A=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $p(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const y=T.program;n.uniformBlockBinding(S,y)}function c(S,T){let y=s[S.id];y===void 0&&(m(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",A));const L=T.program;n.updateUBOMapping(S,L);const _=e.render.frame;r[S.id]!==_&&(d(S),r[S.id]=_)}function u(S){const T=f();S.__bindingPointIndex=T;const y=i.createBuffer(),L=S.__size,_=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,L,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,y),y}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const T=s[S.id],y=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,b=y.length;_<b;_++){const D=y[_];if(Array.isArray(D))for(let B=0,z=D.length;B<z;B++)g(D[B],_,B,L);else g(D,_,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(S,T,y,L){if(E(S,T,y,L)===!0){const _=S.__offset,b=S.value;if(Array.isArray(b)){let D=0;for(let B=0;B<b.length;B++){const z=b[B],V=h(z);v(z,S.__data,D),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(D+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(b,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,S.__data)}}function v(S,T,y){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,y)}function E(S,T,y,L){const _=S.value,b=T+"_"+y;if(L[b]===void 0)return typeof _=="number"||typeof _=="boolean"?L[b]=_:ArrayBuffer.isView(_)?L[b]=_.slice():L[b]=_.clone(),!0;{const D=L[b];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return L[b]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function m(S){const T=S.uniforms;let y=0;const L=16;for(let b=0,D=T.length;b<D;b++){const B=Array.isArray(T[b])?T[b]:[T[b]];for(let z=0,V=B.length;z<V;z++){const N=B[z],W=Array.isArray(N.value)?N.value:[N.value];for(let Z=0,Q=W.length;Z<Q;Z++){const ce=W[Z],Y=h(ce),re=y%L,oe=re%Y.boundary,Ne=re+oe;y+=oe,Ne!==0&&L-Ne<Y.storage&&(y+=L-Ne),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=Y.storage}}}const _=y%L;return _>0&&(y+=L-_),S.__size=y,S.__cache={},this}function h(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):We("WebGLRenderer: Unsupported uniform value type.",S),T}function A(S){const T=S.target;T.removeEventListener("dispose",A);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function C(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}const Kp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Pn=null;function Zp(){return Pn===null&&(Pn=new Nc(Kp,16,16,1030,1016),Pn.name="DFG_LUT",Pn.minFilter=1006,Pn.magFilter=1006,Pn.wrapS=1001,Pn.wrapT=1001,Pn.generateMipmaps=!1,Pn.needsUpdate=!0),Pn}class Jp{constructor(e={}){const{canvas:t=dc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:g=1009}=e;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=a;const E=g,m=new Set([1033,1031,1029]),h=new Set([1009,1014,1012,1020,1017,1018]),A=new Uint32Array(4),C=new Int32Array(4),S=new I;let T=null,y=null;const L=[],_=[];let b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let B=!1,z=null,V=null,N=null,W=null;this._outputColorSpace=yn;let Z=0,Q=0,ce=null,Y=-1,re=null;const oe=new Ft,Ne=new Ft;let we=null;const ft=new nt(0);let je=0,Ze=t.width,J=t.height,se=1,fe=null,He=null;const Ae=new Ft(0,0,Ze,J),Je=new Ft(0,0,Ze,J);let gt=!1;const ke=new Fa;let rt=!1,_t=!1;const Ye=new Nt,At=new I,Tt=new Ft,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ze=!1;function Pt(){return ce===null?se:1}let O=n;function Bt(x,F){return t.getContext(x,F)}let xt,w,p,G,X,K,ue,ge,j,ne,_e,Oe,xe,pe,Ie,Fe,Xe,U,de,ee,ve,ye,ae;try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r186"),t.addEventListener("webglcontextlost",it,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",St,!1),O===null){const F="webgl2";if(O=Bt(F,x),O===null)throw Bt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}me()}catch(x){throw t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",St,!1),ut("WebGLRenderer: "+x.message),x}function me(){xt=new Ku(O),xt.init(),ve=new kp(O,xt),w=new zu(O,xt,e,ve),p=new zp(O,xt),w.reversedDepthBuffer&&d&&p.buffers.depth.setReversed(!0),V=O.createFramebuffer(),N=O.createFramebuffer(),W=O.createFramebuffer(),G=new Qu(O),X=new bp,K=new Gp(O,xt,p,X,w,ve,G),ue=new $u(D),ge=new ed(O),ye=new Ou(O,ge),j=new Zu(O,ge,G,ye),ne=new ef(O,j,ge,ye,G),U=new ju(O,w,K),Ie=new Gu(X),_e=new Tp(D,ue,xt,w,ye,Ie),Oe=new Yp(D,X),xe=new wp,pe=new Ip(xt),Xe=new Uu(D,ue,p,ne,v,l),Fe=new Bp(D,ne,w),ae=new $p(O,G,w,p),de=new Bu(O,xt,G),ee=new Ju(O,xt,G),G.programs=_e.programs,D.capabilities=w,D.extensions=xt,D.properties=X,D.renderLists=xe,D.shadowMap=Fe,D.state=p,D.info=G}E!==1009&&(b=new nf(E,t.width,t.height,o,s,r));const te=new Xp(D,O);this.xr=te,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const x=xt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=xt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(x){x!==void 0&&(se=x,this.setSize(Ze,J,!1))},this.getSize=function(x){return x.set(Ze,J)},this.setSize=function(x,F,q=!0){if(te.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}Ze=x,J=F,t.width=Math.floor(x*se),t.height=Math.floor(F*se),q===!0&&(t.style.width=x+"px",t.style.height=F+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,x,F)},this.getDrawingBufferSize=function(x){return x.set(Ze*se,J*se).floor()},this.setDrawingBufferSize=function(x,F,q){Ze=x,J=F,se=q,t.width=Math.floor(x*q),t.height=Math.floor(F*q),this.setViewport(0,0,x,F)},this.setEffects=function(x){if(E===1009){ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let F=0;F<x.length;F++)if(x[F].isOutputPass===!0){We("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(oe)},this.getViewport=function(x){return x.copy(Ae)},this.setViewport=function(x,F,q,H){x.isVector4?Ae.set(x.x,x.y,x.z,x.w):Ae.set(x,F,q,H),p.viewport(oe.copy(Ae).multiplyScalar(se).round())},this.getScissor=function(x){return x.copy(Je)},this.setScissor=function(x,F,q,H){x.isVector4?Je.set(x.x,x.y,x.z,x.w):Je.set(x,F,q,H),p.scissor(Ne.copy(Je).multiplyScalar(se).round())},this.getScissorTest=function(){return gt},this.setScissorTest=function(x){p.setScissorTest(gt=x)},this.setOpaqueSort=function(x){fe=x},this.setTransparentSort=function(x){He=x},this.getClearColor=function(x){return x.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(x=!0,F=!0,q=!0){let H=0;if(x){let k=!1;if(ce!==null){const Se=ce.texture.format;k=m.has(Se)}if(k){const Se=ce.texture.type,be=h.has(Se),Me=Xe.getClearColor(),Ce=Xe.getClearAlpha(),Pe=Me.r,Ve=Me.g,$e=Me.b;be?(A[0]=Pe,A[1]=Ve,A[2]=$e,A[3]=Ce,O.clearBufferuiv(O.COLOR,0,A)):(C[0]=Pe,C[1]=Ve,C[2]=$e,C[3]=Ce,O.clearBufferiv(O.COLOR,0,C))}else H|=O.COLOR_BUFFER_BIT}F&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),z=x},this.dispose=function(){t.removeEventListener("webglcontextlost",it,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",St,!1),Xe.dispose(),xe.dispose(),pe.dispose(),X.dispose(),ue.dispose(),ne.dispose(),ye.dispose(),ae.dispose(),_e.dispose(),te.dispose(),te.removeEventListener("sessionstart",ji),te.removeEventListener("sessionend",dn),_n.stop()};function it(x){x.preventDefault(),xo("WebGLRenderer: Context Lost."),B=!0}function dt(){xo("WebGLRenderer: Context Restored."),B=!1;const x=G.autoReset,F=Fe.enabled,q=Fe.autoUpdate,H=Fe.needsUpdate,k=Fe.type;me(),G.autoReset=x,Fe.enabled=F,Fe.autoUpdate=q,Fe.needsUpdate=H,Fe.type=k}function St(x){ut("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function qt(x){const F=x.target;F.removeEventListener("dispose",qt),Qi(F)}function Qi(x){Fn(x),X.remove(x)}function Fn(x){const F=X.get(x).programs;F!==void 0&&(F.forEach(function(q){_e.releaseProgram(q)}),x.isShaderMaterial&&_e.releaseShaderCache(x))}this.renderBufferDirect=function(x,F,q,H,k,Se){F===null&&(F=pt);const be=k.isMesh&&k.matrixWorld.determinantAffine()<0,Me=Ms(x,F,q,H,k);p.setMaterial(H,be);let Ce=q.index,Pe=1;if(H.wireframe===!0){if(Ce=j.getWireframeAttribute(q),Ce===void 0)return;Pe=2}const Ve=q.drawRange,$e=q.attributes.position;let le=Ve.start*Pe,qe=(Ve.start+Ve.count)*Pe;Se!==null&&(le=Math.max(le,Se.start*Pe),qe=Math.min(qe,(Se.start+Se.count)*Pe)),Ce!==null?(le=Math.max(le,0),qe=Math.min(qe,Ce.count)):$e!=null&&(le=Math.max(le,0),qe=Math.min(qe,$e.count));const Lt=qe-le;if(Lt<0||Lt===1/0)return;ye.setup(k,H,Me,q,Ce);let yt,R=de;if(Ce!==null&&(yt=ge.get(Ce),R=ee,R.setIndex(yt)),k.isMesh)H.wireframe===!0?(p.setLineWidth(H.wireframeLinewidth*Pt()),R.setMode(O.LINES)):R.setMode(O.TRIANGLES);else if(k.isLine){let Ut=H.linewidth;Ut===void 0&&(Ut=1),p.setLineWidth(Ut*Pt()),k.isLineSegments?R.setMode(O.LINES):k.isLineLoop?R.setMode(O.LINE_LOOP):R.setMode(O.LINE_STRIP)}else k.isPoints?R.setMode(O.POINTS):k.isSprite&&R.setMode(O.TRIANGLES);if(k.isBatchedMesh)if(xt.get("WEBGL_multi_draw"))R.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ut=k._multiDrawStarts,Te=k._multiDrawCounts,Gt=k._multiDrawCount,et=Ce?ge.get(Ce).bytesPerElement:1,Yt=X.get(H).currentProgram.getUniforms();for(let xn=0;xn<Gt;xn++)Yt.setValue(O,"_gl_DrawID",xn),R.render(Ut[xn]/et,Te[xn])}else if(k.isInstancedMesh)R.renderInstances(le,Lt,k.count);else if(q.isInstancedBufferGeometry){const Ut=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Te=Math.min(q.instanceCount,Ut);R.renderInstances(le,Lt,Te)}else R.render(le,Lt)};function ii(x,F,q,H){z!==null&&x.isNodeMaterial&&z.setObject(H,x),rt===!0&&Ie.setState(x,q,!1),x.transparent===!0&&x.side===2&&x.forceSinglePass===!1?(x.side=1,x.needsUpdate=!0,xi(x,F,H),x.side=0,x.needsUpdate=!0,xi(x,F,H),x.side=2):xi(x,F,H)}this.compile=function(x,F,q=null){q===null&&(q=x),z!==null&&z.renderStart(x,F,q),y=pe.get(q),y.init(F),_.push(y),q.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(y.pushLight(k),k.castShadow&&y.pushShadow(k))}),x!==q&&x.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(y.pushLight(k),k.castShadow&&y.pushShadow(k))}),y.setupLights(),z!==null&&z.updateLights(y.state.lightsArray),_t=this.localClippingEnabled,rt=Ie.init(this.clippingPlanes,_t),rt===!0&&Ie.setGlobalState(this.clippingPlanes,F),z!==null&&Fe.render(y.state.shadowsArray,q,F);const H=new Set;return x.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const Se=k.material;if(Se)if(Array.isArray(Se))for(let be=0;be<Se.length;be++){const Me=Se[be];ii(Me,q,F,k),H.add(Me)}else ii(Se,q,F,k),H.add(Se)}),y=_.pop(),z!==null&&z.renderEnd(),H},this.compileAsync=function(x,F,q=null){const H=this.compile(x,F,q);return new Promise(k=>{function Se(){if(H.forEach(function(be){const Ce=X.get(be).currentProgram;(Ce===void 0||Ce.isReady())&&H.delete(be)}),H.size===0){k(x);return}setTimeout(Se,10)}xt.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let si=null;function Ar(x){si&&si(x)}function ji(){_n.stop()}function dn(){_n.start()}const _n=new Dl;_n.setAnimationLoop(Ar),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(x){si=x,te.setAnimationLoop(x),x===null?_n.stop():_n.start()},te.addEventListener("sessionstart",ji),te.addEventListener("sessionend",dn),this.render=function(x,F){if(F!==void 0&&F.isCamera!==!0){ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;z!==null&&z.renderStart(x,F);const q=te.enabled===!0&&te.isPresenting===!0,H=b!==null&&(ce===null||q)&&b.begin(D,ce);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(F),F=te.getCamera()),x.isScene===!0&&x.onBeforeRender(D,x,F,ce),y=pe.get(x,_.length),y.init(F),y.state.textureUnits=K.getTextureUnits(),_.push(y),Ye.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ke.setFromProjectionMatrix(Ye,2e3,F.reversedDepth),_t=this.localClippingEnabled,rt=Ie.init(this.clippingPlanes,_t),T=xe.get(x,L.length),T.init(),L.push(T),te.enabled===!0&&te.isPresenting===!0){const be=D.xr.getDepthSensingMesh();be!==null&&Yn(be,F,-1/0,D.sortObjects)}Yn(x,F,0,D.sortObjects),T.finish(),z!==null&&z.updateLights(y.state.lightsArray),D.sortObjects===!0&&T.sort(fe,He),ze=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,ze&&Xe.addToRenderList(T,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),rt===!0&&Ie.beginShadows();const k=y.state.shadowsArray;if(Fe.render(k,x,F),rt===!0&&Ie.endShadows(),(H&&b.hasRenderPass())===!1){const be=T.opaque,Me=T.transmissive;if(y.setupLights(),F.isArrayCamera){const Ce=F.cameras;if(Me.length>0)for(let Pe=0,Ve=Ce.length;Pe<Ve;Pe++){const $e=Ce[Pe];es(be,Me,x,$e)}ze&&Xe.render(x);for(let Pe=0,Ve=Ce.length;Pe<Ve;Pe++){const $e=Ce[Pe];Nn(T,x,$e,$e.viewport)}}else Me.length>0&&es(be,Me,x,F),ze&&Xe.render(x),Nn(T,x,F)}ce!==null&&Q===0&&(K.updateMultisampleRenderTarget(ce),K.updateRenderTargetMipmap(ce)),H&&b.end(D),x.isScene===!0&&x.onAfterRender(D,x,F),ye.resetDefaultState(),Y=-1,re=null,_.pop(),_.length>0?(y=_[_.length-1],K.setTextureUnits(y.state.textureUnits),rt===!0&&Ie.setGlobalState(D.clippingPlanes,y.state.camera)):y=null,L.pop(),L.length>0?T=L[L.length-1]:T=null,z!==null&&z.renderEnd()};function Yn(x,F,q,H){if(x.visible===!1)return;if(x.layers.test(F.layers)){if(x.isGroup)q=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(F);else if(x.isLightProbeGrid)y.pushLightProbeGrid(x);else if(x.isLight)y.pushLight(x),x.castShadow&&y.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(ke)){H&&Tt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ye);const be=ne.update(x),Me=x.material;Me.visible&&T.push(x,be,Me,q,Tt.z,null,F)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(ke))){const be=ne.update(x),Me=x.material;if(H&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Tt.copy(x.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Tt.copy(be.boundingSphere.center)),Tt.applyMatrix4(x.matrixWorld).applyMatrix4(Ye)),Array.isArray(Me)){const Ce=be.groups;for(let Pe=0,Ve=Ce.length;Pe<Ve;Pe++){const $e=Ce[Pe],le=Me[$e.materialIndex];le&&le.visible&&T.push(x,be,le,q,Tt.z,$e,F)}}else Me.visible&&T.push(x,be,Me,q,Tt.z,null,F)}}const Se=x.children;for(let be=0,Me=Se.length;be<Me;be++)Yn(Se[be],F,q,H)}function Nn(x,F,q,H){const{opaque:k,transmissive:Se,transparent:be}=x;y.setupLightsView(q),rt===!0&&Ie.setGlobalState(D.clippingPlanes,q),H&&p.viewport(oe.copy(H)),k.length>0&&Un(k,F,q),Se.length>0&&Un(Se,F,q),be.length>0&&Un(be,F,q),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function es(x,F,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[H.id]===void 0){const le=xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[H.id]=new wn(1,1,{generateMipmaps:!0,type:le?1016:1009,minFilter:1008,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const Se=y.state.transmissionRenderTarget[H.id],be=H.viewport||oe;Se.setSize(be.z*D.transmissionResolutionScale,be.w*D.transmissionResolutionScale);const Me=D.getRenderTarget(),Ce=D.getActiveCubeFace(),Pe=D.getActiveMipmapLevel();D.setRenderTarget(Se),D.getClearColor(ft),je=D.getClearAlpha(),je<1&&D.setClearColor(16777215,.5),D.clear(),ze&&Xe.render(q);const Ve=D.toneMapping;D.toneMapping=0;const $e=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),y.setupLightsView(H),rt===!0&&Ie.setGlobalState(D.clippingPlanes,H),Un(x,q,H),K.updateMultisampleRenderTarget(Se),K.updateRenderTargetMipmap(Se),xt.has("WEBGL_multisampled_render_to_texture")===!1){let le=!1;for(let qe=0,Lt=F.length;qe<Lt;qe++){const yt=F[qe],{object:R,geometry:Ut,material:Te,group:Gt}=yt;if(Te.side===2&&R.layers.test(H.layers)){const et=Te.side;Te.side=1,Te.needsUpdate=!0,ri(R,q,H,Ut,Te,Gt),Te.side=et,Te.needsUpdate=!0,le=!0}}le===!0&&(K.updateMultisampleRenderTarget(Se),K.updateRenderTargetMipmap(Se))}D.setRenderTarget(Me,Ce,Pe),D.setClearColor(ft,je),$e!==void 0&&(H.viewport=$e),D.toneMapping=Ve}function Un(x,F,q){const H=F.isScene===!0?F.overrideMaterial:null;for(let k=0,Se=x.length;k<Se;k++){const be=x[k],{object:Me,geometry:Ce,group:Pe}=be;let Ve=be.material;Ve.allowOverride===!0&&H!==null&&(Ve=H),Me.layers.test(q.layers)&&ri(Me,F,q,Ce,Ve,Pe)}}function ri(x,F,q,H,k,Se){z!==null&&k.isNodeMaterial&&z.setObject(x,k),x.onBeforeRender(D,F,q,H,k,Se),x.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),k.onBeforeRender(D,F,q,H,x,Se),k.transparent===!0&&k.side===2&&k.forceSinglePass===!1?(k.side=1,k.needsUpdate=!0,D.renderBufferDirect(q,F,H,k,x,Se),k.side=0,k.needsUpdate=!0,D.renderBufferDirect(q,F,H,k,x,Se),k.side=2):D.renderBufferDirect(q,F,H,k,x,Se),x.onAfterRender(D,F,q,H,k,Se)}function xi(x,F,q){F.isScene!==!0&&(F=pt);const H=X.get(x),k=y.state.lights,Se=y.state.shadowsArray,be=k.state.version,Me=_e.getParameters(x,k.state,Se,F,q,y.state.lightProbeGridArray),Ce=_e.getProgramCacheKey(Me);let Pe=H.programs;H.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const Ve=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;H.envMap=ue.get(x.envMap||H.environment,Ve),H.envMapRotation=H.environment!==null&&x.envMap===null?F.environmentRotation:x.envMapRotation,Pe===void 0&&(x.addEventListener("dispose",qt),Pe=new Map,H.programs=Pe);let $e=Pe.get(Ce);if($e!==void 0){if(H.currentProgram===$e&&H.lightsStateVersion===be)return vi(x,Me),$e}else Me.uniforms=_e.getUniforms(x),z!==null&&x.isNodeMaterial&&z.build(x,q,Me),x.onBeforeCompile(Me,D),$e=_e.acquireProgram(Me,Ce),Pe.set(Ce,$e),H.uniforms=Me.uniforms;const le=H.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(le.clippingPlanes=Ie.uniform),vi(x,Me),H.needsLights=$n(x),H.lightsStateVersion=be,H.needsLights&&(le.ambientLightColor.value=k.state.ambient,le.lightProbe.value=k.state.probe,le.sunLights.value=k.state.sun,le.sunLightShadows.value=k.state.sunShadow,le.directionalLights.value=k.state.directional,le.directionalLightShadows.value=k.state.directionalShadow,le.spotLights.value=k.state.spot,le.spotLightShadows.value=k.state.spotShadow,le.rectAreaLights.value=k.state.rectArea,le.ltc_1.value=k.state.rectAreaLTC1,le.ltc_2.value=k.state.rectAreaLTC2,le.pointLights.value=k.state.point,le.pointLightShadows.value=k.state.pointShadow,le.hemisphereLights.value=k.state.hemi,le.sunShadowMatrix.value=k.state.sunShadowMatrix,le.sunShadowCascade.value=k.state.sunShadowCascade,le.directionalShadowMatrix.value=k.state.directionalShadowMatrix,le.spotLightMatrix.value=k.state.spotLightMatrix,le.spotLightMap.value=k.state.spotLightMap,le.pointShadowMatrix.value=k.state.pointShadowMatrix),H.lightProbeGrid=y.state.lightProbeGridArray.length>0,H.currentProgram=$e,H.uniformsList=null,$e}function Ss(x){if(x.uniformsList===null){const F=x.currentProgram.getUniforms();x.uniformsList=mr.seqWithValue(F.seq,x.uniforms)}return x.uniformsList}function vi(x,F){const q=X.get(x);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Si(x,F){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;S.setFromMatrixPosition(F.matrixWorld);for(let q=0,H=x.length;q<H;q++){const k=x[q];if(k.texture!==null&&k.boundingBox.containsPoint(S))return k}return null}function Ms(x,F,q,H,k){F.isScene!==!0&&(F=pt),K.resetTextureUnits();const Se=F.fog,be=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,Me=ce===null?D.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:lt.workingColorSpace,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Pe=ue.get(H.envMap||be,Ce),Ve=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,$e=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),le=!!q.morphAttributes.position,qe=!!q.morphAttributes.normal,Lt=!!q.morphAttributes.color;let yt=0;H.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(yt=D.toneMapping);const R=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ut=R!==void 0?R.length:0,Te=X.get(H),Gt=y.state.lights;if(rt===!0&&(_t===!0||x!==re)){const bt=x===re&&H.id===Y;Ie.setState(H,x,bt)}let et=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Gt.state.version||Te.outputColorSpace!==Me||k.isBatchedMesh&&Te.batching===!1||!k.isBatchedMesh&&Te.batching===!0||k.isBatchedMesh&&Te.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Te.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Te.instancing===!1||!k.isInstancedMesh&&Te.instancing===!0||k.isSkinnedMesh&&Te.skinning===!1||!k.isSkinnedMesh&&Te.skinning===!0||k.isInstancedMesh&&Te.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Te.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Te.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Te.instancingMorph===!1&&k.morphTexture!==null||Te.envMap!==Pe||H.fog===!0&&Te.fog!==Se||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Ie.numPlanes||Te.numIntersection!==Ie.numIntersection)||Te.vertexAlphas!==Ve||Te.vertexTangents!==$e||Te.morphTargets!==le||Te.morphNormals!==qe||Te.morphColors!==Lt||Te.toneMapping!==yt||Te.morphTargetsCount!==Ut||!!Te.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,Te.__version=H.version);let Yt=Te.currentProgram;et===!0&&(Yt=xi(H,F,k),z&&H.isNodeMaterial&&z.onUpdateProgram(H,Yt,Te));let xn=!1,$t=!1,Kt=!1;const ot=Yt.getUniforms(),Rt=Te.uniforms;if(p.useProgram(Yt.program)&&(xn=!0,$t=!0,Kt=!0),H.id!==Y&&(Y=H.id,$t=!0),Te.needsLights){const bt=Si(y.state.lightProbeGridArray,k);Te.lightProbeGrid!==bt&&(Te.lightProbeGrid=bt,$t=!0)}if(xn||re!==x){p.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ot.setValue(O,"projectionMatrix",x.projectionMatrix),ot.setValue(O,"viewMatrix",x.matrixWorldInverse);const hn=ot.map.cameraPosition;hn!==void 0&&hn.setValue(O,At.setFromMatrixPosition(x.matrixWorld)),w.logarithmicDepthBuffer&&ot.setValue(O,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ot.setValue(O,"isOrthographic",x.isOrthographicCamera===!0),re!==x&&(re=x,$t=!0,Kt=!0)}if(Te.needsLights&&(Gt.state.sunShadowMap.length>0&&ot.setValue(O,"sunShadowMap",Gt.state.sunShadowMap,K),Gt.state.directionalShadowMap.length>0&&ot.setValue(O,"directionalShadowMap",Gt.state.directionalShadowMap,K),Gt.state.spotShadowMap.length>0&&ot.setValue(O,"spotShadowMap",Gt.state.spotShadowMap,K),Gt.state.pointShadowMap.length>0&&ot.setValue(O,"pointShadowMap",Gt.state.pointShadowMap,K)),k.isSkinnedMesh){ot.setOptional(O,k,"bindMatrix"),ot.setOptional(O,k,"bindMatrixInverse");const bt=k.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),ot.setValue(O,"boneTexture",bt.boneTexture,K))}k.isBatchedMesh&&(ot.setOptional(O,k,"batchingTexture"),ot.setValue(O,"batchingTexture",k._matricesTexture,K),ot.setOptional(O,k,"batchingIdTexture"),ot.setValue(O,"batchingIdTexture",k._indirectTexture,K),ot.setOptional(O,k,"batchingColorTexture"),k._colorsTexture!==null&&ot.setValue(O,"batchingColorTexture",k._colorsTexture,K));const on=q.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&U.update(k,q,Yt),($t||Te.receiveShadow!==k.receiveShadow)&&(Te.receiveShadow=k.receiveShadow,ot.setValue(O,"receiveShadow",k.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Rt.envMapIntensity.value=F.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=Zp()),$t){if(ot.setValue(O,"toneMappingExposure",D.toneMappingExposure),Te.needsLights&&ys(Rt,Kt),Se&&H.fog===!0&&Oe.refreshFogUniforms(Rt,Se),Oe.refreshMaterialUniforms(Rt,H,se,J,y.state.transmissionRenderTarget[x.id]),Te.needsLights&&Te.lightProbeGrid){const bt=Te.lightProbeGrid;Rt.probesSH.value=bt.texture,Rt.probesMin.value.copy(bt.boundingBox.min),Rt.probesMax.value.copy(bt.boundingBox.max),Rt.probesResolution.value.copy(bt.resolution)}mr.upload(O,Ss(Te),Rt,K)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(mr.upload(O,Ss(Te),Rt,K),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ot.setValue(O,"center",k.center),ot.setValue(O,"modelViewMatrix",k.modelViewMatrix),ot.setValue(O,"normalMatrix",k.normalMatrix),ot.setValue(O,"modelMatrix",k.matrixWorld),H.uniformsGroups!==void 0){const bt=H.uniformsGroups;for(let hn=0,un=bt.length;hn<un;hn++){const On=bt[hn];ae.update(On,Yt),ae.bind(On,Yt)}}return Yt}function ys(x,F){x.ambientLightColor.needsUpdate=F,x.lightProbe.needsUpdate=F,x.sunLights.needsUpdate=F,x.sunLightShadows.needsUpdate=F,x.directionalLights.needsUpdate=F,x.directionalLightShadows.needsUpdate=F,x.pointLights.needsUpdate=F,x.pointLightShadows.needsUpdate=F,x.spotLights.needsUpdate=F,x.spotLightShadows.needsUpdate=F,x.rectAreaLights.needsUpdate=F,x.hemisphereLights.needsUpdate=F}function $n(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return Q},this.getRenderTarget=function(){return ce},this.setRenderTargetTextures=function(x,F,q){const H=X.get(x);H.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),X.get(x.texture).__webglTexture=F,X.get(x.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,F){const q=X.get(x);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(x,F=0,q=0){ce=x,Z=F,Q=q;let H=null,k=!1,Se=!1;if(x){const Me=X.get(x);if(Me.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(O.FRAMEBUFFER,Me.__webglFramebuffer),oe.copy(x.viewport),Ne.copy(x.scissor),we=x.scissorTest,p.viewport(oe),p.scissor(Ne),p.setScissorTest(we),Y=-1;return}else if(Me.__webglFramebuffer===void 0)K.setupRenderTarget(x);else if(Me.__hasExternalTextures)K.rebindTextures(x,X.get(x.texture).__webglTexture,X.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Ve=x.depthTexture;if(Me.__boundDepthTexture!==Ve){if(Ve!==null&&X.has(Ve)&&(x.width!==Ve.image.width||x.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(x)}}const Ce=x.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(Se=!0);const Pe=X.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?H=Pe[F][q]:H=Pe[F],k=!0):x.samples>0&&K.useMultisampledRTT(x)===!1?H=X.get(x).__webglMultisampledFramebuffer:Array.isArray(Pe)?H=Pe[q]:H=Pe,oe.copy(x.viewport),Ne.copy(x.scissor),we=x.scissorTest}else oe.copy(Ae).multiplyScalar(se).floor(),Ne.copy(Je).multiplyScalar(se).floor(),we=gt;if(q!==0&&(H=V),p.bindFramebuffer(O.FRAMEBUFFER,H)&&p.drawBuffers(x,H),p.viewport(oe),p.scissor(Ne),p.setScissorTest(we),k){const Me=X.get(x.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+F,Me.__webglTexture,q)}else if(Se){const Me=F;for(let Ce=0;Ce<x.textures.length;Ce++){const Pe=X.get(x.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,Pe.__webglTexture,q,Me)}}else if(x!==null&&q!==0){const Me=X.get(x.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Me.__webglTexture,q)}Y=-1};function ai(x){const F=X.get(x);return(F.__readFormat!==x.format||F.__readType!==x.type)&&(F.__readFormat=x.format,F.__readType=x.type,F.__formatReadable=w.textureFormatReadable(x.format),F.__typeReadable=w.textureTypeReadable(x.type)),F}this.readRenderTargetPixels=function(x,F,q,H,k,Se,be,Me=0){if(!(x&&x.isWebGLRenderTarget)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=X.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce){p.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const Pe=x.textures[Me],Ve=Pe.format,$e=Pe.type;x.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Me);const le=ai(Pe);if(le.__formatReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(le.__typeReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=x.width-H&&q>=0&&q<=x.height-k&&O.readPixels(F,q,H,k,ve.convert(Ve),ve.convert($e),Se)}finally{const Pe=ce!==null?X.get(ce).__webglFramebuffer:null;p.bindFramebuffer(O.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(x,F,q,H,k,Se,be,Me=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=X.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&be!==void 0&&(Ce=Ce[be]),Ce)if(F>=0&&F<=x.width-H&&q>=0&&q<=x.height-k){p.bindFramebuffer(O.FRAMEBUFFER,Ce);const Pe=x.textures[Me],Ve=Pe.format,$e=Pe.type;x.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Me);const le=ai(Pe);if(le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.bufferData(O.PIXEL_PACK_BUFFER,Se.byteLength,O.STREAM_READ),O.readPixels(F,q,H,k,ve.convert(Ve),ve.convert($e),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const Lt=ce!==null?X.get(ce).__webglFramebuffer:null;p.bindFramebuffer(O.FRAMEBUFFER,Lt);const yt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await hc(O,yt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,qe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Se),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(qe),O.deleteSync(yt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,F=null,q=0){const H=Math.pow(2,-q),k=Math.floor(x.image.width*H),Se=Math.floor(x.image.height*H),be=F!==null?F.x:0,Me=F!==null?F.y:0;K.setTexture2D(x,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,be,Me,k,Se),p.unbindTexture()},this.copyTextureToTexture=function(x,F,q=null,H=null,k=0,Se=0){let be,Me,Ce,Pe,Ve,$e,le,qe,Lt;const yt=x.isCompressedTexture?x.mipmaps[Se]:x.image;if(q!==null)be=q.max.x-q.min.x,Me=q.max.y-q.min.y,Ce=q.isBox3?q.max.z-q.min.z:1,Pe=q.min.x,Ve=q.min.y,$e=q.isBox3?q.min.z:0;else{const Rt=Math.pow(2,-k);be=Math.floor(yt.width*Rt),Me=Math.floor(yt.height*Rt),x.isDataArrayTexture?Ce=yt.depth:x.isData3DTexture?Ce=Math.floor(yt.depth*Rt):Ce=1,Pe=0,Ve=0,$e=0}H!==null?(le=H.x,qe=H.y,Lt=H.z):(le=0,qe=0,Lt=0);const R=ve.convert(F.format),Ut=ve.convert(F.type);let Te;F.isData3DTexture?(K.setTexture3D(F,0),Te=O.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(K.setTexture2DArray(F,0),Te=O.TEXTURE_2D_ARRAY):(K.setTexture2D(F,0),Te=O.TEXTURE_2D),p.activeTexture(O.TEXTURE0),p.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,F.flipY),p.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),p.pixelStorei(O.UNPACK_ALIGNMENT,F.unpackAlignment);const Gt=p.getParameter(O.UNPACK_ROW_LENGTH),et=p.getParameter(O.UNPACK_IMAGE_HEIGHT),Yt=p.getParameter(O.UNPACK_SKIP_PIXELS),xn=p.getParameter(O.UNPACK_SKIP_ROWS),$t=p.getParameter(O.UNPACK_SKIP_IMAGES);p.pixelStorei(O.UNPACK_ROW_LENGTH,yt.width),p.pixelStorei(O.UNPACK_IMAGE_HEIGHT,yt.height),p.pixelStorei(O.UNPACK_SKIP_PIXELS,Pe),p.pixelStorei(O.UNPACK_SKIP_ROWS,Ve),p.pixelStorei(O.UNPACK_SKIP_IMAGES,$e);const Kt=x.isDataArrayTexture||x.isData3DTexture,ot=F.isDataArrayTexture||F.isData3DTexture;if(x.isDepthTexture){const Rt=X.get(x),on=X.get(F),bt=X.get(Rt.__renderTarget),hn=X.get(on.__renderTarget);p.bindFramebuffer(O.READ_FRAMEBUFFER,bt.__webglFramebuffer),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,hn.__webglFramebuffer);for(let un=0;un<Ce;un++)Kt&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(x).__webglTexture,k,$e+un),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,X.get(F).__webglTexture,Se,Lt+un)),O.blitFramebuffer(Pe,Ve,be,Me,le,qe,be,Me,O.DEPTH_BUFFER_BIT,O.NEAREST);p.bindFramebuffer(O.READ_FRAMEBUFFER,null),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(k!==0||x.isRenderTargetTexture||X.has(x)){const Rt=X.get(x),on=X.get(F);p.bindFramebuffer(O.READ_FRAMEBUFFER,N),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,W);for(let bt=0;bt<Ce;bt++)Kt?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Rt.__webglTexture,k,$e+bt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Rt.__webglTexture,k),ot?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,on.__webglTexture,Se,Lt+bt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,on.__webglTexture,Se),k!==0?O.blitFramebuffer(Pe,Ve,be,Me,le,qe,be,Me,O.COLOR_BUFFER_BIT,O.NEAREST):ot?O.copyTexSubImage3D(Te,Se,le,qe,Lt+bt,Pe,Ve,be,Me):O.copyTexSubImage2D(Te,Se,le,qe,Pe,Ve,be,Me);p.bindFramebuffer(O.READ_FRAMEBUFFER,null),p.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ot?x.isDataTexture||x.isData3DTexture?O.texSubImage3D(Te,Se,le,qe,Lt,be,Me,Ce,R,Ut,yt.data):F.isCompressedArrayTexture?O.compressedTexSubImage3D(Te,Se,le,qe,Lt,be,Me,Ce,R,yt.data):O.texSubImage3D(Te,Se,le,qe,Lt,be,Me,Ce,R,Ut,yt):x.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Se,le,qe,be,Me,R,Ut,yt.data):x.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Se,le,qe,yt.width,yt.height,R,yt.data):O.texSubImage2D(O.TEXTURE_2D,Se,le,qe,be,Me,R,Ut,yt);p.pixelStorei(O.UNPACK_ROW_LENGTH,Gt),p.pixelStorei(O.UNPACK_IMAGE_HEIGHT,et),p.pixelStorei(O.UNPACK_SKIP_PIXELS,Yt),p.pixelStorei(O.UNPACK_SKIP_ROWS,xn),p.pixelStorei(O.UNPACK_SKIP_IMAGES,$t),Se===0&&F.generateMipmaps&&O.generateMipmap(Te),p.unbindTexture()},this.initRenderTarget=function(x){X.get(x).__webglFramebuffer===void 0&&K.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?K.setTextureCube(x,0):x.isData3DTexture?K.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?K.setTexture2DArray(x,0):K.setTexture2D(x,0),p.unbindTexture()},this.resetState=function(){Z=0,Q=0,ce=null,p.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}const ps={perfectShots:2,stepPx:.013,maxPx:.055,recoveryMs:500},Hi={magSize:25,fireIntervalMs:103,reloadMs:2500};function Qp(i,e){if(i<=ps.perfectShots)return 0;const t=e*ps.stepPx,n=e*ps.maxPx;return Math.min(n,(i-ps.perfectShots)*t)}function jp(i){return i*.05}function em(i,e,t){const n=Qp(i,e);return t?Math.max(n,jp(e)):n}function tm(i,e){return i||e>ps.recoveryMs}function nm(i,e=Math.random){if(i<=0)return{x:0,y:0};const t=e()*Math.PI*2,n=i*(.4+e()*.6);return{x:Math.cos(t)*n,y:-Math.abs(Math.sin(t))*n-i*.35}}const Mr={body:25,head:100,maxHp:100};function im(i,e){return i?Mr.head:Mr.body}class sm{constructor(){Ws(this,"enabled",!0);Ws(this,"ctx",null);Ws(this,"lastShotAt",0)}setEnabled(e){this.enabled=e}ensure(){if(!this.enabled)return null;if(!this.ctx)try{this.ctx=new AudioContext}catch{return null}return this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx}tone(e,t,n,s,r=0){const a=this.ensure();if(!a)return;const o=a.currentTime+r,l=a.createOscillator(),c=a.createGain();l.type=n,l.frequency.setValueAtTime(e,o),c.gain.setValueAtTime(s,o),c.gain.exponentialRampToValueAtTime(1e-4,o+t),l.connect(c),c.connect(a.destination),l.start(o),l.stop(o+t+.02)}noise(e,t,n,s=0){const r=this.ensure();if(!r)return;const a=r.currentTime+s,o=Math.max(1,Math.floor(r.sampleRate*e)),l=r.createBuffer(1,o,r.sampleRate),c=l.getChannelData(0);for(let g=0;g<o;g++)c[g]=(Math.random()*2-1)*(1-g/o);const u=r.createBufferSource();u.buffer=l;const f=r.createBiquadFilter();f.type="lowpass",f.frequency.setValueAtTime(n,a);const d=r.createGain();d.gain.setValueAtTime(t,a),d.gain.exponentialRampToValueAtTime(1e-4,a+e),u.connect(f),f.connect(d),d.connect(r.destination),u.start(a)}shot(){const e=performance.now();e-this.lastShotAt<40||(this.lastShotAt=e,this.noise(.08,.5,2400),this.tone(220,.07,"square",.12))}hit(){this.tone(170,.12,"triangle",.28)}headshot(){this.tone(1180,.16,"square",.14),this.tone(590,.18,"sine",.2,.02),this.noise(.05,.2,5e3)}miss(){this.tone(760,.06,"sine",.08)}enemyShot(){this.noise(.18,.55,900),this.tone(90,.22,"sine",.35,.02),this.tone(220,.1,"square",.12,.05)}bloodHit(e=!1){const t=e?62:92;this.tone(t,e?.26:.16,"triangle",e?.4:.3),this.tone(t*1.5,.1,"sine",.14,.02),this.noise(e?.2:.12,e?.42:.3,e?700:1100)}deathThud(){this.tone(58,.4,"sine",.5),this.tone(38,.5,"triangle",.3,.03),this.noise(.35,.4,500,.02),this.noise(.5,.22,260,.16)}empty(){this.tone(1400,.03,"square",.05)}reloadStart(){this.tone(520,.04,"square",.12),this.tone(700,.04,"square",.12,.14)}reloadDone(){this.noise(.05,.3,3e3,.02),this.tone(340,.08,"square",.14)}killConfirm(e){const t=Math.min(4,Math.max(0,e-1));this.tone(880+t*120,.09,"sine",.16),this.tone(1320+t*180,.12,"sine",.12,.06),e>=3&&this.tone(1760+t*200,.16,"triangle",.1,.14)}ui(){this.tone(880,.05,"sine",.1)}error(){this.tone(240,.12,"sawtooth",.1)}}const Mn=new sm,dl=[{id:"easy",name:"入门",description:"慢速 · 大头 · 出现前等待久",speedMul:.65,headMul:1.15,waitMul:1.8,jitter:0,bobAmp:0,attackMul:1.4},{id:"normal",name:"普通",description:"标准速度与目标尺寸",speedMul:1,headMul:1,waitMul:1,jitter:.08,bobAmp:0,attackMul:1},{id:"hard",name:"进阶",description:"更快 · 更小 · 出现更突然",speedMul:1.35,headMul:.8,waitMul:.55,jitter:.18,bobAmp:.12,attackMul:.8},{id:"insane",name:"职业",description:"极限速度 · 极小目标",speedMul:1.75,headMul:.62,waitMul:.28,jitter:.3,bobAmp:.22,attackMul:.65},{id:"master",name:"大师",description:"高速 · 微目标 · 变速 · 晃头",speedMul:2.2,headMul:.5,waitMul:.16,jitter:.4,bobAmp:.34,attackMul:.5},{id:"extreme",name:"极限",description:"最高速 · 极微目标 · 强变速 · 强晃动",speedMul:2.8,headMul:.4,waitMul:.1,jitter:.5,bobAmp:.48,attackMul:.4}];function rm(){return typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function am(i){const e=i.shots,t=e.filter(C=>C.hit).length,n=e.filter(C=>C.head).length,s=i.encounters,r=s.filter(C=>C.killed).length;let a=0,o=0,l=0;for(const C of s)C.firstShotHit&&a++,C.firstShotAt!=null&&(o+=C.firstShotAt-C.appearAt,l++);let c=0,u=0;for(const C of e){const S=C.distX;S>0?c++:S<0&&u++}let f=0,d=0;for(const C of s)d=C.killed?d+1:0,d>f&&(f=d);const g=Math.max(0,e.length-r),v=C=>C.length>0?C.reduce((S,T)=>S+T,0)/C.length:0,E=i.modeId==="flick"?s.filter(C=>C.killed&&C.killAt!=null):[],h={flickTimeMs:E.length>0?E.reduce((C,S)=>C+((S.killAt??0)-S.appearAt),0)/E.length:0,flickDistPx:v(s.filter(C=>C.flickDistPx!=null).map(C=>C.flickDistPx??0)),preaimErrPx:v(s.filter(C=>C.preaimErrPx!=null).map(C=>C.preaimErrPx??0)),displacementPx:v(s.filter(C=>C.displacementPx!=null).map(C=>C.displacementPx??0)),trackPct:i.modeId==="tracking"?(()=>{const C=s.reduce((T,y)=>T+(y.trackMs??0),0),S=s.reduce((T,y)=>T+(y.activeDurMs??0),0);return S>0?C/S*100:0})():0},A=s.filter(C=>C.attacked).length;return{id:rm(),modeId:i.modeId,sceneId:i.sceneId,sceneName:i.sceneName,difficultyId:i.difficultyId,difficultyName:i.difficultyName,profileId:i.profileId,profileName:i.profileName,startedAt:i.startedAt,durationMs:i.durationMs,shots:e.length,wastedShots:i.wastedShots??0,hits:t,headshots:n,accuracy:e.length>0?t/e.length:0,encounters:s.length,kills:r,firstShotHits:a,firstShotRate:s.length>0?a/s.length:0,avgReactionMs:l>0?o/l:0,avgCorrectionsPerKill:r>0?g/r:0,overshoots:c,undershoots:u,maxStreak:f,deaths:A,modeExtra:h}}const Gl="jg.sessions.v2",om=50;function lm(){try{const i=localStorage.getItem(Gl),e=i?JSON.parse(i):[];return Array.isArray(e)?e:[]}catch{return[]}}function cm(i){const e=[i,...lm()].slice(0,om);try{localStorage.setItem(Gl,JSON.stringify(e))}catch{}}const dm={cs2:.022,valorant:.07};function kl(i){return i==="custom"?.022:dm[i]}function Hl(i){return i.sens*i.multiplier}function hm(i){const e=i.dpi/2.54,t=Hl(i);return t<=0||e<=0?0:360/(t*e)}const Vl=["#7cfc9b","#00ff6a","#ffffff","#ffd24a","#ff5c5c","#4dc3ff","#ff7ad9"],va={size:[0,26],gap:[0,18],thickness:[1,6]},fr={color:Vl[0],size:8,gap:4,thickness:2},gs=(i,[e,t],n)=>{const s=typeof i=="number"&&Number.isFinite(i)?i:Number(i);return Number.isFinite(s)?Math.min(t,Math.max(e,s)):n};function pi(i){const e=i??{};return{color:typeof e.color=="string"&&/^#[0-9a-f]{6}$/i.test(e.color)?e.color:fr.color,size:Math.round(gs(e.size,va.size,fr.size)),gap:Math.round(gs(e.gap,va.gap,fr.gap)),thickness:Math.round(gs(e.thickness,va.thickness,fr.thickness)),dot:e.dot===!0,outline:e.outline!==!1}}function um(i){return{"--ch-color":i.color,"--ch-len":`${i.size}px`,"--ch-gap":`${i.gap}px`,"--ch-thick":`${i.thickness}px`,"--ch-dot":i.dot?`${Math.max(2,i.thickness)}px`:"0px","--ch-outline":i.outline?"1px":"0px"}}const hl={sens:[.05,10],dpi:[100,3200]},us={id:"default",name:"CS2 标准",sens:2,dpi:800,fov:103};function Sa(i){const e=i??{},t=e.preset==="valorant"?"valorant":"cs2";return{id:typeof e.id=="string"&&e.id?e.id:us.id,name:typeof e.name=="string"&&e.name?e.name:us.name,preset:t,sens:+gs(e.sens,hl.sens,us.sens).toFixed(2),dpi:Math.round(gs(e.dpi,hl.dpi,us.dpi)),fov:typeof e.fov=="number"&&e.fov>0?e.fov:us.fov,multiplier:kl(t)}}function fm(i,e){return{...i,preset:e,multiplier:kl(e)}}function Wl(i){return Hl(i)}function pm(i){return hm(i)}function mm(i){return`${pm(i).toFixed(1)} cm / 360° · ${Wl(i).toFixed(4)} °/计数`}const Ma="v3d-1.7",sn={eyeHeight:1.62,crouchHeight:1.05,moveSpeed:3.4,enemySpeed:3,spawn:{minDistance:4,headHeight:1.6}},Ca=[{id:"room3d",name:"3D 训练房间",desc:"14×26m 室内｜砖墙 · 木箱 · 沙袋 · 门洞",range:"交战 5–11m",room:{w:14,d:26,h:3.2},door:{w:1.4,h:2.3,z:-6},player:{x:0,z:2.6,limitX:4.2,limitZmin:-3.2,limitZmax:2.9},playerCover:{x:.6,z:.9,w:3.2,h:1.3,d:.5},spawns:[{id:"前左箱后",x:-3.8,z:-2.2,tier:0},{id:"前右箱后",x:3.8,z:-1.8,tier:0},{id:"门后左",x:-1.8,z:-7.6,tier:1},{id:"门后右",x:1.8,z:-7.6,tier:1},{id:"左中矮墙后",x:-4.4,z:-4.4,tier:1},{id:"右中矮墙后",x:4.4,z:-4,tier:1}],props:[{x:-1.9,z:-3.4,w:1.2,h:1.1,d:1.2,kind:"crate"},{x:2.2,z:-2.4,w:3.2,h:.95,d:.4,kind:"barrier"},{x:-3.8,z:-2.2,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:3.8,z:-1.8,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:-4.4,z:-4.4,w:1.7,h:1.95,d:1.4,kind:"barrier"},{x:4.4,z:-4,w:1.7,h:1.95,d:1.4,kind:"crate"},{x:-5.4,z:-1.2,w:2,h:.7,d:1,kind:"sandbag"}],fog:{near:8,far:34},lamps:[{x:6.1,y:2.5,z:-1.5}],colors:{floor:3880752,wall:10325881,ceil:2760213,prop:7031340}},{id:"long",name:"长地图 · 远距离交战",desc:"26×84m 走廊｜四段纵深掩体 + 远端门洞",range:"交战 14–42m（随难度拉远）",room:{w:26,d:84,h:4.2},door:{w:2.2,h:2.6,z:-34},player:{x:0,z:6,limitX:8.5,limitZmin:-2,limitZmax:9},playerCover:{x:0,z:4.3,w:4.2,h:1.15,d:.5},spawns:[{id:"近箱左",x:-7.5,z:-8,tier:0},{id:"近箱右",x:7.5,z:-9.5,tier:0},{id:"中墙左",x:-9.5,z:-15,tier:1},{id:"中墙右",x:9.5,z:-17,tier:1},{id:"远箱左",x:-6.5,z:-23,tier:2},{id:"远箱右",x:6.5,z:-25,tier:2},{id:"门后左",x:-2.4,z:-35.4,tier:3},{id:"门后右",x:2.4,z:-35.4,tier:3},{id:"近中矮墙后",x:-2.6,z:-10.5,tier:0},{id:"中箱左二",x:-4.6,z:-18.5,tier:1},{id:"远中箱后",x:1.8,z:-27,tier:2},{id:"远侧墙后",x:-10.5,z:-28,tier:2}],props:[{x:-7.5,z:-8,w:2.1,h:2,d:1.7,kind:"crate"},{x:7.5,z:-9.5,w:2.1,h:2,d:1.7,kind:"crate"},{x:-9.5,z:-15,w:3.6,h:1.3,d:.55,kind:"barrier"},{x:9.5,z:-17,w:3.6,h:1.3,d:.55,kind:"barrier"},{x:-6.5,z:-23,w:2.3,h:1.9,d:1.7,kind:"crate"},{x:6.5,z:-25,w:2.3,h:1.9,d:1.7,kind:"crate"},{x:-3.2,z:-12,w:1.6,h:1.15,d:1.6,kind:"crate"},{x:3.6,z:-19,w:1.6,h:1.15,d:1.6,kind:"crate"},{x:-4.4,z:-32.6,w:2,h:1.8,d:1.5,kind:"crate"},{x:4.4,z:-32.6,w:2,h:1.8,d:1.5,kind:"crate"},{x:-2.6,z:-10.5,w:3,h:1.9,d:.5,kind:"barrier"},{x:-4.6,z:-18.5,w:1.9,h:1.95,d:1.5,kind:"crate"},{x:1.8,z:-27,w:2,h:1.9,d:1.6,kind:"crate"},{x:-10.5,z:-28,w:2.2,h:2,d:1.6,kind:"crate"},{x:-6.2,z:3.4,w:2.2,h:.75,d:1,kind:"sandbag"},{x:6.2,z:3.4,w:2.2,h:.75,d:1,kind:"sandbag"}],fog:{near:30,far:130},proc:{count:5,minDist:13,maxDist:31,keepDoor:4.5,minGap:3.2},lamps:[{x:11.6,y:3.5,z:-4},{x:-11.6,y:3.5,z:-16},{x:11.6,y:3.5,z:-28}],colors:{floor:3420976,wall:8353897,ceil:2366742,prop:5981488}}],gm="room3d",ul=i=>Ca.find(e=>e.id===i)??Ca[0],fl=40,_m=100,pl=1200,xm=2800,ya="jg.slice3d.deathStreak",vm=3,pr=110,ml=460,gl=.9,Sm={amp:.035,rot:.012,ms:300},Mm={amp:.06,rot:.022,ms:450},Ea={amp:.09,rot:.03,ms:1400},_l={easy:[6,3,1,.5],normal:[4,4,2,1],hard:[3,4,3,1.5],insane:[2,3,4,2.5],master:[1.5,2.5,4,3.5],extreme:[1,2,4,5]},ym=(i,e)=>(_l[i]??_l.normal)[e]??1;let Xl=!0,ql=!1;function Wt(i){return ql?new ni({color:i.color}):Xl?new ms({color:i.color,roughness:i.roughness??.8,metalness:i.metalness??.05,emissive:i.emissive??0,emissiveIntensity:i.emissiveIntensity??1}):new Vc({color:i.color,emissive:i.emissive??0})}const xl={easy:{peekSet:[.5,1],crouch:.15,feint:!1,feintDouble:!1,strafeShoot:!1,strafePause:0,crouchSpam:0,repeatPeek:!1,wideBias:0,paceHold:0,paceRush:0,lead:.04,fireDelay:.5,hitRate:.3,headRate:.1,coverChange:!1,jitter:0},normal:{peekSet:[.5,1],crouch:.25,feint:!1,feintDouble:!1,strafeShoot:!1,strafePause:0,crouchSpam:.05,repeatPeek:!1,wideBias:.1,paceHold:.15,paceRush:0,lead:.05,fireDelay:.44,hitRate:.42,headRate:.2,coverChange:!1,jitter:.1},hard:{peekSet:[.5,1,1.6],crouch:.4,feint:!0,feintDouble:!1,strafeShoot:!1,strafePause:.1,crouchSpam:.15,repeatPeek:!0,wideBias:.2,paceHold:.25,paceRush:.2,lead:.08,fireDelay:.38,hitRate:.54,headRate:.3,coverChange:!1,jitter:.2},insane:{peekSet:[.5,1,1.6,2.4],crouch:.45,feint:!0,feintDouble:!1,strafeShoot:!1,strafePause:.2,crouchSpam:.25,repeatPeek:!0,wideBias:.3,paceHold:.3,paceRush:.25,lead:.1,fireDelay:.32,hitRate:.66,headRate:.4,coverChange:!0,jitter:.3},master:{peekSet:[.5,1,1.6,2.4],crouch:.5,feint:!0,feintDouble:!1,strafeShoot:!0,strafePause:.35,crouchSpam:.4,repeatPeek:!0,wideBias:.45,paceHold:.35,paceRush:.3,lead:.12,fireDelay:.26,hitRate:.78,headRate:.5,coverChange:!0,jitter:.45},extreme:{peekSet:[1,1.6,2.4],crouch:.55,feint:!0,feintDouble:!0,strafeShoot:!0,strafePause:.5,crouchSpam:.55,repeatPeek:!0,wideBias:.6,paceHold:.4,paceRush:.35,lead:.14,fireDelay:.2,hitRate:.9,headRate:.6,coverChange:!0,jitter:.65}},Em={easy:"小身位｜命中 30% · 爆头 10%",normal:"小身位 · 偶尔蹲｜命中 42% · 爆头 20%",hard:"假动作 · 急停｜命中 54% · 爆头 30%",insane:"大身位 · 换掩体 · 蹲起｜命中 66% · 爆头 40%",master:"横移对枪 · 预瞄提前量｜命中 78% · 爆头 50%",extreme:"双段假动作 · 大身位横拉｜命中 90% · 爆头 60%"},vl=`
                  <i class="ch-line ch-t"></i>
                  <i class="ch-line ch-b"></i>
                  <i class="ch-line ch-l"></i>
                  <i class="ch-line ch-r"></i>
                  <i class="ch-dot"></i>`;function Tm(){const i=new mi,e=new ms({color:3818060,metalness:.85,roughness:.42}),t=new ms({color:2237995,metalness:.3,roughness:.75}),n=Wt({color:7031340,roughness:.85}),s=new ms({color:12072234,metalness:.2,roughness:.7}),r=(m,h,A,C,S,T)=>{const y=new mt(h,A);return y.position.set(C,S,T),y.castShadow=!0,m.add(y),y};r(i,new wt(.1,.14,.46),t,0,0,-.2),r(i,new wt(.06,.03,.5),t,0,.09,-.22);const a=r(i,new wt(.07,.02,.06),e,.06,.06,-.06);a.name="charging",r(i,new wt(.09,.1,.44),n,0,-.01,-.66);const o=r(i,new Sr(.022,.022,.62,12),e,0,.01,-1.18);o.rotation.x=Math.PI/2;const l=r(i,new Sr(.035,.035,.1,12),e,0,.01,-1.52);l.rotation.x=Math.PI/2;const c=r(i,new wt(.07,.26,.12),t,0,-.2,-.18);c.rotation.x=-.22,c.name="mag";const u=r(i,new wt(.06,.18,.09),t,0,-.17,.02);u.rotation.x=.28,r(i,new wt(.08,.12,.34),t,0,-.01,.16),r(i,new wt(.07,.05,.22),t,0,.07,.14),r(i,new wt(.07,.07,.12),t,0,.15,-.2);const f=r(i,new xs(.024,16),new ni({color:2781071}),0,.15,-.262);f.rotation.y=Math.PI,r(i,new wt(.02,.06,.03),s,.055,.02,-.1);const d=Wt({color:3949622,roughness:.9}),g=Wt({color:14262374,roughness:.8}),v=r(i,new wt(.09,.09,.14),d,0,-.06,-.62);v.rotation.z=.12,r(i,new wt(.07,.05,.1),g,0,0,-.62);const E=r(i,new wt(.09,.11,.12),d,0,-.1,0);return E.rotation.z=-.1,i.traverse(m=>{m.isMesh&&(m.castShadow=!1)}),i}function Sl(){const i=new mi,e=Wt({color:3752783,roughness:.78}),t=Wt({color:2304563,roughness:.7}),n=Wt({color:2830391,roughness:.85}),s=Wt({color:14131825,roughness:.75}),r=Wt({color:2826520,roughness:.9}),a=Wt({color:12597547,roughness:.7}),o=new mt(new wt(.44,.58,.26),e);o.position.y=1.18,i.add(o);const l=new mt(new wt(.36,.38,.3),t);l.position.y=1.22,i.add(l);const c=new mt(new wt(.06,.08,.06),a);c.position.set(-.26,1.3,0),i.add(c);const u=new mt(new Yi(.135,20,16),s);u.position.y=1.63,i.add(u);const f=new mt(new Yi(.142,20,12,0,Math.PI*2,0,Math.PI*.62),r);f.position.y=1.645,i.add(f);const d=new vr(.085,.62,4,10),g=new mt(d,n);g.position.set(-.12,.48,0),i.add(g);const v=new mt(d,n);v.position.set(.12,.48,0),i.add(v);const E=new vr(.07,.5,4,10),m=new mt(E,e);m.position.set(-.29,1.16,-.06),i.add(m);const h=new mt(E,e);h.position.set(.29,1.16,-.06),i.add(h);const A=new mt(new wt(.06,.06,.5),Wt({color:1382685,roughness:.6}));return A.position.set(.16,1.12,-.34),i.add(A),i.traverse(C=>{const S=C;S.isMesh&&(S.receiveShadow=!0,S.castShadow=!1)}),o.castShadow=!0,u.castShadow=!0,g.castShadow=!0,v.castShadow=!0,i.traverse(C=>{const S=C;S.isMesh&&(S.userData.isEnemy=!0,S.userData.zone="body")}),u.userData.zone="head",f.userData.zone="head",{group:i,leftLeg:g,rightLeg:v,leftArm:m,rightArm:h,head:u,torso:o,materials:[e,t,n,s,r,a]}}function bm(i){const e=new mi,t=[],n=Wt({color:i.colors.wall,roughness:.92}),s=Wt({color:i.colors.floor,roughness:.95}),r=Wt({color:i.colors.ceil,roughness:.9}),a=Wt({color:i.colors.prop,roughness:.86}),o=Wt({color:7037254,roughness:.95}),l=i.room,c=new mt(new qi(l.w,l.d),s);c.rotation.x=-Math.PI/2,c.receiveShadow=!0,e.add(c);const u=new mt(new qi(l.w,l.d),r);u.rotation.x=Math.PI/2,u.position.y=l.h,e.add(u);const f=(h,A,C,S,T,y)=>{const L=new mt(new wt(h,A,C),n);return L.position.set(S,T,y),L.castShadow=!1,L.receiveShadow=!0,e.add(L),t.push(L),L},d=l.w/2;f(.3,l.h,l.d,-d,l.h/2,0),f(.3,l.h,l.d,d,l.h/2,0);const g=i.door.w/2,v=i.door.z-.6,E=d-g;f(E,l.h,.3,-d+E/2,l.h/2,v),f(E,l.h,.3,d-E/2,l.h/2,v),f(i.door.w,l.h-i.door.h,.3,0,i.door.h+(l.h-i.door.h)/2,v),f(l.w,l.h,.3,0,l.h/2,l.d/2);for(const h of i.props){if(h.kind==="sandbag"){for(let C=0;C<3;C++){const S=new mt(new Yi(.3,12,8),o);S.scale.set(1.25,.72,.85),S.position.set(h.x-.7+C*.7,.22+(h.h-.4)*.5,h.z),S.castShadow=!0,S.receiveShadow=!0,e.add(S)}continue}const A=new mt(new wt(h.w,h.h,h.d),a);A.position.set(h.x,h.h/2,h.z),A.castShadow=!0,A.receiveShadow=!0,A.userData.isCover=!0,e.add(A),t.push(A)}const m=new ms({color:2762532,emissive:16767392,emissiveIntensity:.6});for(const h of i.lamps){const A=new mt(new wt(.6,.12,.26),m);A.position.set(h.x,h.y,h.z),e.add(A);const C=new ba(16765600,5.5,18,2);C.position.set(h.x,h.y-.1,h.z),e.add(C)}return{root:e,walls:t}}function Cm(i,e){let t=null;try{t=localStorage.getItem("jg.slice3d.scene")}catch{t=null}const n=ul(t);i.innerHTML=`
    <div class="slice3d">
      <canvas id="c3d"></canvas>
      <div class="s3-hud s3-left">
        <div class="s3-title" id="s3-scene-title">${n.name}</div>
        <div class="s3-line" id="s3-scene-range">${n.range}</div>
        <div class="s3-line">版本 ${Ma}</div>
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
      <div class="s3-crosshair" id="s3-cross">${vl}</div>
      <div class="s3-dmg" id="s3-dmg"></div>
      <div class="s3-banner" id="s3-banner"></div>
      <div class="s3-lock-hint hidden" id="s3-lock-hint">点击画面以捕获鼠标（否则无法转视角）</div>
      <!-- 受击/阵亡的渐变红屏：透明度由 JS 每帧驱动（纯 DOM，不占 GPU） -->
      <div class="s3-blood" id="s3-blood"></div>
      <!-- 阵亡界面：先播死亡动画，约 3 秒后弹出大字，点击任意处回开始界面 -->
      <div class="s3-dead hidden" id="s3-dead">
        <div class="s3-dead-text" id="s3-dead-text">你死了</div>
        <div class="s3-dead-streak" id="s3-dead-streak"></div>
        <div class="s3-dead-hint">点击任意处返回开始界面</div>
      </div>
      <div class="s3-overlay" id="s3-overlay">
        <div class="s3-card s3-menu-card">
          <div class="s3-menu-head">
            <div>
              <h2>架枪训练器</h2>
              <p class="s3-menu-sub">鼠标转视角 · WASD 移动 · Ctrl 下蹲 · 左键连发 · R 换弹 · Esc 退出</p>
            </div>
            <div class="s3-ver">${Ma}</div>
          </div>

          <div class="s3-menu">
            <!-- 单元 1：场景 -->
            <section class="s3-sec">
              <div class="s3-sec-head"><b>1</b>场景</div>
              <div class="s3-scene-list" id="s3-scene-row">
                ${Ca.map(M=>`<button class="s3-scene${M.id===n.id?" is-on":""}" data-scene="${M.id}" type="button">
                  <i class="s3-scene-thumb s3-thumb-${M.id}" aria-hidden="true"></i>
                  <span class="s3-scene-txt">
                    <b>${M.name}</b>
                    <em>${M.desc}<br>${M.range}</em>
                  </span>
                  ${M.id===n.id?'<span class="s3-scene-tag">当前</span>':""}
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
                ${dl.map(M=>`<button class="s3-diff" data-diff="${M.id}" type="button">
                    <b>${M.name}</b><em>${Em[M.id]??M.description}</em>
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
                  <div class="s3-crosshair">${vl}</div>
                  <span class="s3-ch-preview-tip">预览</span>
                </div>
                <div class="s3-ch-controls">
                  <div class="s3-field">
                    <label>颜色</label>
                    <div class="s3-swatches" id="s3-ch-colors">
                      ${Vl.map(M=>`<button class="s3-swatch" data-color="${M}" style="--sw:${M}" type="button"></button>`).join("")}
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
  `;const s=i.querySelector("#c3d"),r=i.querySelector("#s3-overlay"),a=i.querySelector("#s3-ammo"),o=i.querySelector("#s3-kills"),l=i.querySelector("#s3-acc"),c=i.querySelector("#s3-hp"),u=i.querySelector("#s3-banner"),f=i.querySelector("#s3-dmg"),d=i.querySelector("#s3-cross"),g=i.querySelector("#s3-cover-on"),v=i.querySelector("#s3-cover-off"),E=i.querySelector("#s3-diff-row"),m=i.querySelector("#s3-fullscreen"),h=i.querySelector("#s3-perf"),A=i.querySelector("#s3-loading"),C=i.querySelector("#s3-load-step"),S=i.querySelector("#s3-load-pct"),T=i.querySelector("#s3-progress-fill"),y=i.querySelector("#s3-result"),L=i.querySelector("#s3-score"),_=i.querySelector("#s3-again"),b=i.querySelector("#s3-back"),D=i.querySelector("#s3-count-row"),B=i.querySelector("#s3-bench"),z=i.querySelector("#s3-bench-out"),V=i.querySelector("#s3-lastlog"),N=i.querySelector("#s3-lock-hint"),W=i.querySelector("#s3-dead"),Z=i.querySelector("#s3-dead-text"),Q=i.querySelector("#s3-dead-streak"),ce=i.querySelector("#s3-blood"),Y=i.querySelector("#s3-start");let re=!1;Y.disabled=!0,Y.textContent="初始化中…",Y.addEventListener("click",()=>{re=!0});let oe=!1,Ne=[],we=()=>{},ft=!1;const je=()=>{const M=$=>{try{const ie=s.requestPointerLock($);return ie&&typeof ie.catch=="function"&&ie.catch(()=>{}),ie}catch{return}};if(ft){M();return}const P=M({unadjustedMovement:!0});P&&P.catch(()=>{ft=!0,M()})};let Ze=Number(localStorage.getItem("jg.slice3d.count")??"10")||10;const J=()=>{i.querySelectorAll("[data-count]").forEach(M=>{M.classList.toggle("is-on",Number(M.dataset.count)===Ze)})};J(),D==null||D.querySelectorAll("[data-count]").forEach(M=>{M.addEventListener("click",()=>{Ze=Number(M.dataset.count)??10,localStorage.setItem("jg.slice3d.count",String(Ze)),J()})});const se=localStorage.getItem("jg.slice3d.quality");let fe=se==="high"||se==="medium"||se==="low"?se:"medium";const He={high:21e5,medium:1e6,low:52e4};Xl=fe==="high",ql=fe==="low";let Ae=se===null;const Je="jg.slice3d.diff";let gt=localStorage.getItem(Je)??"normal";const ke=()=>xl[gt]??xl.normal,rt=()=>{E.querySelectorAll("[data-diff]").forEach(M=>{M.classList.toggle("is-on",M.dataset.diff===gt)})};rt(),E.querySelectorAll("[data-diff]").forEach(M=>{M.addEventListener("click",()=>{var P;gt=M.dataset.diff??"normal",localStorage.setItem(Je,gt),rt(),tn(`难度：${((P=dl.find($=>$.id===gt))==null?void 0:P.name)??gt}`)})});const _t="jg.slice3d.sens",Ye="jg.slice3d.crosshair",At=M=>{try{const P=localStorage.getItem(M);return P?JSON.parse(P):null}catch{return null}},Tt=(M,P)=>{try{localStorage.setItem(M,JSON.stringify(P))}catch{}};let pt=Sa(At(_t)),ze=pi(At(Ye));const Pt=i.querySelector("#s3-sens"),O=i.querySelector("#s3-sens-val"),Bt=i.querySelector("#s3-dpi"),xt=i.querySelector("#s3-sens-out"),w=i.querySelector("#s3-preset-row"),p=i.querySelector("#s3-ch-colors"),G=i.querySelector("#s3-ch-size"),X=i.querySelector("#s3-ch-gap"),K=i.querySelector("#s3-ch-thick"),ue=i.querySelector("#s3-ch-size-val"),ge=i.querySelector("#s3-ch-gap-val"),j=i.querySelector("#s3-ch-thick-val"),ne=i.querySelector("#s3-ch-dot"),_e=i.querySelector("#s3-ch-outline"),Oe=()=>{const M=um(ze);for(const[P,$]of Object.entries(M))i.style.setProperty(P,$)},xe=()=>{Pt.value=String(pt.sens),O.textContent=pt.sens.toFixed(2),Bt.value=String(pt.dpi),w.querySelectorAll("[data-preset]").forEach(M=>M.classList.toggle("is-on",M.dataset.preset===pt.preset)),xt.textContent=`换算：${mm(pt)}`},pe=()=>{G.value=String(ze.size),X.value=String(ze.gap),K.value=String(ze.thickness),ue.textContent=String(ze.size),ge.textContent=String(ze.gap),j.textContent=String(ze.thickness),ne.classList.toggle("is-on",ze.dot),_e.classList.toggle("is-on",ze.outline),p.querySelectorAll(".s3-swatch").forEach(M=>M.classList.toggle("is-on",(M.dataset.color??"").toLowerCase()===ze.color.toLowerCase())),Oe()};w.querySelectorAll("[data-preset]").forEach(M=>{M.addEventListener("click",()=>{pt=fm(pt,M.dataset.preset==="valorant"?"valorant":"cs2"),Tt(_t,pt),xe()})}),Pt.addEventListener("input",()=>{pt=Sa({...pt,sens:Number(Pt.value)}),Tt(_t,pt),xe()}),Bt.addEventListener("change",()=>{pt=Sa({...pt,dpi:Number(Bt.value)}),Tt(_t,pt),xe()}),p.querySelectorAll(".s3-swatch").forEach(M=>{M.addEventListener("click",()=>{ze=pi({...ze,color:M.dataset.color}),Tt(Ye,ze),pe()})}),G.addEventListener("input",()=>{ze=pi({...ze,size:Number(G.value)}),Tt(Ye,ze),pe()}),X.addEventListener("input",()=>{ze=pi({...ze,gap:Number(X.value)}),Tt(Ye,ze),pe()}),K.addEventListener("input",()=>{ze=pi({...ze,thickness:Number(K.value)}),Tt(Ye,ze),pe()}),ne.addEventListener("click",()=>{ze=pi({...ze,dot:!ze.dot}),Tt(Ye,ze),pe()}),_e.addEventListener("click",()=>{ze=pi({...ze,outline:!ze.outline}),Tt(Ye,ze),pe()}),i.querySelectorAll("#s3-scene-row [data-scene]").forEach(M=>{M.addEventListener("click",()=>{const P=M.dataset.scene??gm;if(P===n.id){tn(`场景：${n.name}`);return}try{localStorage.setItem("jg.slice3d.scene",P)}catch{}const $=ul(P);tn(`场景切换到「${$.name}」，正在重建…`),window.setTimeout(()=>window.location.reload(),550)})}),xe(),pe();const Ie="jg.slice3d.autofullscreen";let Fe=!0;try{Fe=localStorage.getItem(Ie)!=="window"}catch{Fe=!0}const Xe=i.querySelector("#s3-fs-row"),U=()=>{Xe.querySelectorAll("[data-fs]").forEach(M=>M.classList.toggle("is-on",M.dataset.fs==="auto"===Fe))};Xe.querySelectorAll("[data-fs]").forEach(M=>{M.addEventListener("click",()=>{Fe=M.dataset.fs==="auto";try{localStorage.setItem(Ie,Fe?"auto":"window")}catch{}U(),tn(Fe?"战斗画面：进入时自动全屏":"战斗画面：只在窗口内")})}),U();const de=new Jp({canvas:s,antialias:fe==="high"}),ee=de.getContext(),ve=ee.getExtension("WEBGL_debug_renderer_info"),ye=String(ve?ee.getParameter(ve.UNMASKED_RENDERER_WEBGL):ee.getParameter(ee.RENDERER)),ae=/swiftshader|software|basic render|llvmpipe|microsoft basic/i.test(ye);de.setPixelRatio(1),de.shadowMap.enabled=fe==="high",de.shadowMap.type=1;const me=new wc;me.background=new nt(855826),me.fog=new Da(855826,n.fog.near,n.fog.far);const te=new mn(75,1,.05,200);te.position.set(n.player.x,sn.eyeHeight,n.player.z),te.rotation.order="YXZ",me.add(new Zc(9078136,.35)),me.add(new qc(16769200,1711394,.45));const it=new Kc(16765600,1.15);it.position.set(7.5,5.5,3.5),it.castShadow=fe==="high",it.shadow.mapSize.set(1024,1024),it.shadow.camera.near=.5,it.shadow.camera.far=40,it.shadow.camera.left=-12,it.shadow.camera.right=12,it.shadow.camera.top=10,it.shadow.camera.bottom=-6,me.add(it);const dt=new ba(16763274,6,14,2);dt.position.set(0,2.4,n.door.z-.4),me.add(dt);const St=bm(n);me.add(St.root);let qt=[];const Qi=()=>{qt=St.walls.map(M=>new Ki().setFromObject(M))},Fn=[...n.spawns],ii=(M,P)=>{const $=new I;for(const ie of qt){if(ie.min.y>sn.eyeHeight+.15||ie.max.y<.05)continue;const he=Math.max(ie.min.x,Math.min(M.x,ie.max.x)),Ue=Math.max(ie.min.z,Math.min(M.z,ie.max.z)),Le=M.x-he,Be=M.z-Ue,Ge=Le*Le+Be*Be;if(!(Ge>P*P))if(Ge>1e-6){const De=Math.sqrt(Ge),ht=(P-De)/De;M.x+=Le*ht,M.z+=Be*ht,$.x+=Le*ht,$.z+=Be*ht}else{const De=M.x-ie.min.x,ht=ie.max.x-M.x,Re=M.z-ie.min.z,tt=ie.max.z-M.z,vt=Math.min(De,ht,Re,tt);vt===De?($.x-=ie.min.x-P-M.x,M.x=ie.min.x-P):vt===ht?($.x+=ie.max.x+P-M.x,M.x=ie.max.x+P):vt===Re?($.z-=ie.min.z-P-M.z,M.z=ie.min.z-P):($.z+=ie.max.z+P-M.z,M.z=ie.max.z+P)}}return $},si=(M,P)=>{let $=null,ie=4;for(const he of qt){const Ue=he.getCenter(new I),Le=Math.hypot(Ue.x-M,Ue.z-P);Le<ie&&(ie=Le,$=he)}return $},Ar=(M,P,$)=>{const ie=si(M,P),he=new I(M,0,P);if(!ie)return he;const Ue=new I(M-te.position.x,0,P-te.position.z);Ue.lengthSq()<1e-4&&Ue.set(0,0,1),Ue.normalize();for(let Le=0;Le<60&&(he.x>ie.min.x-$&&he.x<ie.max.x+$&&he.z>ie.min.z-$&&he.z<ie.max.z+$);Le++)he.addScaledVector(Ue,.08);return he},ji="jg.slice3d.cover",dn={on:(localStorage.getItem(ji)??"on")!=="off"};let _n=[];const Yn=()=>{for(const M of _n){me.remove(M);const P=St.walls.indexOf(M);P>=0&&St.walls.splice(P,1)}if(_n=[],dn.on){const M=n.playerCover,P=Wt({color:9077106,roughness:.92}),$=new mt(new wt(M.w,M.h,M.d),P);$.position.set(M.x,M.h/2,M.z),$.castShadow=!0,$.receiveShadow=!0,$.userData.isPlayerCover=!0,me.add($),_n.push($),St.walls.push($)}g.classList.toggle("is-on",dn.on),v.classList.toggle("is-on",!dn.on),localStorage.setItem(ji,dn.on?"on":"off"),Qi()};Yn();const Nn=new dr,es=()=>{const M=le.group,P=M.position.y+1.63*M.scale.y,$=Un.set(M.position.x,P,M.position.z),ie=ri.copy(te.position).sub($),he=ie.length();return Nn.set($,ie.normalize()),Nn.far=he,Nn.intersectObjects(St.walls,!1).length===0},Un=new I,ri=new I,xi=new I,Ss=new I,vi=(M,P)=>{const $=le.group,ie=Un.set(M,$.position.y+1.63*$.scale.y,P),he=ri.copy(te.position).sub(ie),Ue=he.length();return Nn.set(ie,he.normalize()),Nn.far=Ue,Nn.intersectObjects(St.walls,!1).length===0},Si=()=>{const M=le.group,P=ke(),$=Rn.lengthSq()>.16?P.lead:0,ie=te.position.x+Rn.x*$-M.position.x,he=te.position.z+Rn.z*$-M.position.z;Math.hypot(ie,he)<.05||(M.rotation.y=Math.atan2(ie,he)+Math.PI)},Ms=(M,P,$)=>{const ie=le.group,he=Un.set(M.x-ie.position.x,0,M.z-ie.position.z);if(he.length()<.15)return!0;he.normalize(),ie.position.addScaledVector(he,P*$);const Le=ii(ie.position,.4);if(Le.lengthSq()>1e-6){const Ge=ri.copy(Le).normalize(),De=xi.copy(he).sub(Ss.copy(Ge).multiplyScalar(he.dot(Ge)));De.lengthSq()>1e-6&&ie.position.addScaledVector(De.normalize(),P*$*.85)}Si(),R.walkPhase+=$*7;const Be=Math.sin(R.walkPhase)*.5;return le.leftLeg.rotation.x=Be,le.rightLeg.rotation.x=-Be,le.leftArm.rotation.x=-Be*.5,le.rightArm.rotation.x=Be*.5,!R.crouch&&ie.scale.y<1&&(ie.scale.y=Math.min(1,ie.scale.y+$*2.2),ie.position.y=-.06*(1-ie.scale.y)/.14),!1},ys=()=>{const M=le.group,P=si(M.position.x,M.position.z),$=P?P.getCenter(new I):M.position.clone(),ie=P?(P.max.x-P.min.x)/2:.6,he=[];for(const Ge of[-1,1])for(const De of[.7,1.2,1.8])he.push(new I($.x+Ge*(ie+De),0,M.position.z));const Ue=new I(te.position.x-M.position.x,0,te.position.z-M.position.z).normalize();he.push(M.position.clone().addScaledVector(Ue,1));const Le=he.filter(Ge=>vi(Ge.x,Ge.z)&&ii(Ge.clone(),.42).lengthSq()<1e-6&&!R.badSpots.some(De=>De.distanceTo(Ge)<.7)),Be=Le.length>0?Le:he;return Be.sort((Ge,De)=>Ge.distanceTo(M.position)-De.distanceTo(M.position)),Be[0]},$n=new dr,ai=M=>{const P=new I(M.x,sn.spawn.headHeight,M.z),$=te.position.clone(),ie=[new I(0,0,0),new I(.35,0,0),new I(-.35,0,0),new I(0,.2,0)];for(const he of ie){const Ue=$.clone().add(he),Le=P.clone().sub(Ue),Be=Le.length();if($n.set(Ue,Le.normalize()),$n.far=Be,$n.intersectObjects(St.walls,!1).length===0)return!0}return!1},x=()=>{const M=te.position.x,P=te.position.z,$=Fn.filter(De=>De.z>P-1.5||Math.hypot(De.x-M,De.z-P)<sn.spawn.minDistance?!1:!ai(new I(De.x,0,De.z))),ie=Fn.filter(De=>De.z<=n.door.z),he=$.length>0?$:ie.length>0?ie:Fn,Ue=he.map(De=>ym(gt,De.tier)),Le=Ue.reduce((De,ht)=>De+ht,0);let Be=Math.random()*Le,Ge=he[he.length-1];for(let De=0;De<he.length;De++)if(Be-=Ue[De],Be<=0){Ge=he[De];break}return{...Ge,fallback:$.length===0}},q=(()=>{const M=n.proc;if(!M||M.count<=0)return 0;const P=n.room.w/2,$=n.player.z-M.minDist,ie=n.player.z-M.maxDist;if($<=ie)return 0;const he=Wt({color:n.colors.prop,roughness:.86}),Ue=n.props.map(Be=>({x:Be.x,z:Be.z}));let Le=0;for(let Be=0;Be<M.count*40&&Le<M.count;Be++){const Ge=ie+Math.random()*($-ie),De=P-3.6,ht=-De+Math.random()*De*2;if(Math.abs(ht)<M.keepDoor&&Ge<n.door.z+14||Ue.some(It=>Math.hypot(It.x-ht,It.z-Ge)<M.minGap))continue;const Re=1.8+Math.random()*.7,tt=1.9+Math.random()*.25,vt=1.3+Math.random()*.5,Mt=new mt(new wt(Re,tt,vt),he);if(Mt.position.set(ht,tt/2,Ge),Mt.castShadow=!0,Mt.receiveShadow=!0,Mt.userData.isCover=!0,St.root.add(Mt),St.walls.push(Mt),Qi(),ai(new I(ht,0,Ge))){St.root.remove(Mt);const It=St.walls.indexOf(Mt);It>=0&&St.walls.splice(It,1),Qi();continue}const Zt=Math.hypot(ht-n.player.x,Ge-n.player.z),nn=Zt<18?0:Zt<25?1:Zt<32?2:3;Fn.push({id:`随机位${Le+1}`,x:ht,z:Ge,tier:nn}),Ue.push({x:ht,z:Ge}),Le++}return Le})(),H=i.querySelector(`#s3-scene-row [data-scene="${n.id}"] .s3-scene-txt em`);H&&(H.innerHTML=`${n.desc}<br>${n.range}　·　刷新点 ${n.spawns.length} 固定${q>0?` + ${q} 随机`:""}`);const k=Tm();k.position.set(.16,-.17,-.34),k.rotation.set(0,.04,0),te.add(k),me.add(te);const Se=k.getObjectByName("mag"),be=k.getObjectByName("charging"),Me=Se.position.clone(),Ce=Se.rotation.x,Pe=be.position.clone(),Ve=new ba(16765562,0,6,2);Ve.position.set(0,.01,-1.58),k.add(Ve);const $e=new mt(new xs(.09,12),new ni({color:16769162,transparent:!0,opacity:0}));$e.position.set(0,.01,-1.58),k.add($e);let le=Sl();me.add(le.group);const qe=[le];let Lt=0;const yt=M=>{for(const P of le.materials){const $=P.emissive;$&&$.setHex(M)}},R={state:"hidden",hp:Mr.maxHp,timer:0,peekTargetX:0,peekPos:new I(0,0,0),coverName:"",crouch:!1,aimPose:0,blocked:0,speedJitter:1,strafeShoot:!1,strafeDir:1,strafeSeconds:0,peekOffset:1,strafeNextChange:.4,strafePauseT:0,strafeWaitT:0,crouchHold:0,paceFactor:1,bodyHits:0,sameOffsetHits:0,canChangeCover:!1,feintPlan:!1,feintPhase:0,feintPos:new I,feintPos2:new I,coverPos:new I,waypoint:null,path:[],firingSpot:null,badSpots:[],stallT:0,pathStallT:0,counters:{feints:0,coverChanges:0,repeeks:0,strafeReversals:0,crouchToggles:0,wideSwings:0},dieProgress:0,walkPhase:0},Ut=(M=!1)=>{const P=ke(),$=P.peekSet;return!$||$.length===0?1:M&&Math.random()<Math.max(P.wideBias,.5)?$[$.length-1]:$[Math.floor(Math.random()*$.length)]};let Te=0;const Gt=new I;let et={seq:0,visible:!0,distance:0,cover:"",difficulty:"normal",fallback:!1,cameraY:0,x:0,z:0};const Yt=()=>{if(qe.length>1){Lt=(Lt+1)%qe.length,le=qe[Lt];for(const ht of qe)ht!==le&&(ht.group.visible=!1)}const M=ke(),P=x(),$=Ut(Math.random()<M.wideBias),ie=Math.random()<.5?-1:1;R.state="hidden",R.hp=Mr.maxHp,R.timer=.6+Math.random()*1.6,R.coverName=P.id,we(`敌人刷新：${P.id}（难度 ${gt}）`),R.crouch=Math.random()<M.crouch,R.speedJitter=1+(Math.random()*2-1)*M.jitter,R.strafeShoot=M.strafeShoot,R.canChangeCover=M.coverChange,R.strafeSeconds=0,R.peekOffset=$,R.strafeNextChange=.25+Math.random()*.45,R.strafePauseT=0,R.strafeWaitT=0,R.crouchHold=0,R.bodyHits=0,R.sameOffsetHits=0;const he=Math.random();R.paceFactor=he<M.paceRush?.62:he<M.paceRush+M.paceHold?1.45:1,Te=0,R.feintPlan=M.feint&&(M.feintDouble||Math.random()<.65),R.feintPhase=0,R.aimPose=0,R.blocked=0;const Ue=Ar(P.x,P.z,.42),Le=Ue.x,Be=Ue.z;R.coverPos.set(Le,0,Be);const Ge=Math.sign(te.position.z-Be)||1;R.peekTargetX=P.x+ie*$,R.peekPos.set(R.peekTargetX,0,P.z+Ge*(.9+Math.random()*.8)),R.feintPos.set(P.x+ie*.35,0,P.z+Ge*.35),R.feintPos2.set(P.x+ie*.6,0,P.z+Ge*.72);const De=[];if(P.z<=n.door.z)De.push(new I(0,0,n.door.z));else{const ht=si(Le,Be);if(ht){const Re=ht.getCenter(new I),tt=(ht.max.x-ht.min.x)/2,vt=Math.sign(R.peekTargetX-Re.x)||1,Mt=Re.x+vt*(tt+.55);De.push(new I(Mt,0,Re.z)),De.push(new I(Mt,0,R.peekPos.z))}}R.path=De,R.firingSpot=null,R.badSpots=[],R.stallT=0,R.pathStallT=0,R.dieProgress=0,le.group.visible=!0,le.group.position.set(Le,0,Be),le.group.scale.set(1,.86,1),le.group.position.y=-.06,et={seq:et.seq+1,visible:ai(new I(Le,0,Be)),distance:+Math.hypot(Le-te.position.x,Be-te.position.z).toFixed(2),cover:P.id,difficulty:gt,fallback:P.fallback,cameraY:+te.position.y.toFixed(2),x:+Le.toFixed(2),z:+Be.toFixed(2)},le.group.rotation.set(0,0,0),le.leftArm.rotation.set(0,0,0),le.rightArm.rotation.set(0,0,0),le.leftLeg.rotation.set(0,0,0),le.rightLeg.rotation.set(0,0,0),yt(0)};Yt();const xn=(M,P,$)=>{const ie=M-te.position.x,he=P-te.position.y,Ue=$-te.position.z;Kt=Math.atan2(-ie,-Ue),ot=Math.atan2(he,Math.hypot(ie,Ue))};window.__slice3d={get enemy(){return le},camera:te,scene:me,ai:R,aimAt:xn,getBurst:()=>ts,look:()=>({yaw:+Kt.toFixed(4),pitch:+ot.toFixed(4)}),settings:()=>({sens:{...pt},crosshair:{...ze}}),sceneInfo:()=>({id:n.id,name:n.name,room:{...n.room},spawns:Fn.length,fixedSpawns:n.spawns.length,procSpawns:q,spawnIds:Fn.map(M=>M.id),spawnCoords:Fn.map(M=>[+M.x.toFixed(1),+M.z.toFixed(1)]),walls:St.walls.length,fog:[n.fog.near,n.fog.far],limits:{x:n.player.limitX,zmin:n.player.limitZmin,zmax:n.player.limitZmax},player:{x:+te.position.x.toFixed(2),z:+te.position.z.toFixed(2)}}),colliders:()=>qt.map(M=>({min:[+M.min.x.toFixed(2),+M.min.y.toFixed(2),+M.min.z.toFixed(2)],max:[+M.max.x.toFixed(2),+M.max.y.toFixed(2),+M.max.z.toFixed(2)]})),rifle:k,parts:{mag:Se,charging:be},perf:()=>({fps:+(bs/Math.max(.001,ns)).toFixed(1),quality:fe,dpr:de.getPixelRatio(),calls:de.info.render.calls,triangles:de.info.render.triangles,shadows:de.shadowMap.enabled,buffer:[de.domElement.width,de.domElement.height],longFrames:yi,maxFrameMs:+As.toFixed(1),loopError:Mi,recoveries:Cs,renders:Dr,sinceRenderMs:+(performance.now()-Rs).toFixed(0),spikes:on,rawInput:!ft,gpu:ye,gpuSoftware:ae,antialias:fe==="high"}),resetMaxFrame:()=>{As=0,yi=0},forceStall:()=>{ws=performance.now()-9999},setPlayer:(M,P)=>{jt.set(M,sn.eyeHeight,P),te.position.set(M,sn.eyeHeight,P),Rn.set(0,0,0)},hurtPlayer:(M=fl)=>fo(M),forceEnemyFire:()=>uo(),forceEnemyCycle:()=>{R.state="hidden",R.timer=.25,R.feintPlan=!1},playerState:()=>({hp:Bn,dead:en,streak:zn}),setPlayerHp:M=>{Bn=Math.max(1,Math.round(M)),c.textContent=String(Bn)},enemyFireStats:()=>({shots:lo,hits:co,headshots:ho}),hurtFx:()=>({blood:+Fs.toFixed(3),shakeAmp:+Ti.toFixed(4),shakeLeftMs:Math.max(0,Math.round(Ai-performance.now())),lastShake:{...Nr},bloodSfx:Ns,dead:en}),fireParams:()=>({delay:+Vs().toFixed(3),...ke()}),setQuality:M=>{Ae=!1,Ri(M)},reloadState:()=>({reloading:oi,magY:+Se.position.y.toFixed(3),chargeZ:+be.position.z.toFixed(3)}),coverState:()=>({on:dn.on,count:_n.length,los:es(),blocked:+R.blocked.toFixed(2)}),deaths:()=>at.deaths,kills:()=>at.kills,poolSize:()=>qe.length,forceKill:()=>{R.state!=="dead"&&(R.hp=0,R.state="dead",at.kills++,Ps++,Dt!=null&&Dt.appearAt&&Ei.push(performance.now()-Dt.appearAt),o.textContent=String(at.kills),Or(!0),Ze<999&&at.kills>=Ze&&po())},decals:()=>Us.length,enemyClipCheck:()=>{const M=le.group.position;for(const P of qt){if(P.min.y>sn.eyeHeight+.15||P.max.y<.05)continue;const $=Math.max(P.min.x,Math.min(M.x,P.max.x)),ie=Math.max(P.min.z,Math.min(M.z,P.max.z));if((M.x-$)**2+(M.z-ie)**2<(.4*.6)**2)return!0}return!1},enemyInfo:()=>{const M=le.group,P=te.position.x-M.position.x,$=te.position.z-M.position.z,ie=Math.hypot(P,$),he=-Math.sin(M.rotation.y),Ue=-Math.cos(M.rotation.y),Le=ie>.05?he*(P/ie)+Ue*($/ie):1;return{state:R.state,x:+M.position.x.toFixed(2),z:+M.position.z.toFixed(2),distance:+ie.toFixed(2),facingPlayer:+Le.toFixed(2),lineClear:vi(M.position.x,M.position.z)}},probe:(M,P,$)=>{const ie=te.position.clone(),Ue=new I(M,P,$).clone().sub(ie),Le=Ue.length();$n.set(ie,Ue.normalize()),$n.far=Le;const Be=$n.intersectObjects(St.walls,!1);return{wallCount:St.walls.length,hitCount:Be.length,firstHit:Be[0]?{dist:+Be[0].distance.toFixed(2),far:+Le.toFixed(2)}:null}},spawnInfo:()=>({...et,counters:{...R.counters},strafeSeconds:+R.strafeSeconds.toFixed(1),peekOffset:R.peekOffset,paceFactor:R.paceFactor,crouchHold:+R.crouchHold.toFixed(2),bodyHits:R.bodyHits,coverName:R.coverName}),setDifficulty:M=>{gt=M,localStorage.setItem(Je,M),rt()}};const $t=new Set;let Kt=0,ot=0,Rt=0,on=0;const bt=()=>Math.max(256,Math.round(pt.dpi*.6));let hn=!1,un=!1,On=Hi.magSize,oi=!1,ka=0,wr=0,ts=0,Rr=0,li=0,ln=!1,Es=0,Ts=performance.now(),bs=0,ns=0;const is=[];let Mi="",yi=0,As=0,Cr=!1,Pr=!1,Lr=[],ws=performance.now(),Ha=performance.now(),Dr=0,Rs=performance.now(),Cs=Number(localStorage.getItem("jg.slice3d.recoveries")??"0")||0,Ir=!1;Ne=(()=>{try{const M=localStorage.getItem("jg.slice3d.eventLog"),P=M?JSON.parse(M):[];return Array.isArray(P)?P.slice(-8):[]}catch{return[]}})(),we=M=>{Ne.push(`${new Date().toLocaleTimeString("zh-CN")} ${M}`),Ne.length>8&&Ne.shift();try{localStorage.setItem("jg.slice3d.eventLog",JSON.stringify(Ne))}catch{}};try{const M=localStorage.getItem("jg.slice3d.lastRecovery");M?(V.innerHTML=`<b>上次运行疑似冻结</b>：${M}<br>恢复次数：${Cs}<br>冻结前最后动作：<br>${Ne.map(P=>`· ${P}`).join("<br>")||"（无记录）"}`,localStorage.removeItem("jg.slice3d.lastRecovery")):V.textContent=""}catch{}const at={shots:0,hits:0,kills:0,deaths:0,startedEpoch:Date.now(),startedPerf:performance.now()};let Ps=0;const Ei=[];let Va=performance.now();const Ls=[],Wa=[];let Dt=null;const jt=new I(n.player.x,sn.eyeHeight,n.player.z),Rn=new I;let Bn=100,en=!1,Ds=0,zn=0;try{zn=Math.max(0,Number(localStorage.getItem(ya)??"0")||0)}catch{zn=0}let Is=0,Fr=-1e9,Fs=-1,Ti=0,ss=0,bi=0,Ai=0,Xa=0,qa=0,Ns=0,Nr={x:0,y:0,z:0,roll:0};const Ya=M=>{Is=M,Fr=performance.now()},Yl=M=>{const P=M-Fr;return P<0||P>pr+ml?0:P<=pr?Is*(P/pr):Is*Math.max(0,1-(P-pr)/ml)},$a=(M,P,$,ie,he)=>{Ti=Math.max(Ti,M),ss=Math.max(ss,P),bi=performance.now(),Ai=bi+$,Xa=ie,qa=he},Ka=M=>{if(Ai>bi&&M<Ai){const ie=1-(M-bi)/(Ai-bi),he=Ti*ie*ie,Ue=(Math.random()*2-1)*he+Xa*he*.8,Le=(Math.random()*2-1)*he*.8,Be=(Math.random()*2-1)*he+qa*he*.8,Ge=(Math.random()*2-1)*ss*ie;te.position.x+=Ue,te.position.y+=Le,te.position.z+=Be,te.rotation.z+=Ge,te.rotation.y+=Ge*.4,Nr={x:+Ue.toFixed(4),y:+Le.toFixed(4),z:+Be.toFixed(4),roll:+Ge.toFixed(4)}}else Ti=0,ss=0,Nr={x:0,y:0,z:0,roll:0};const P=en?Math.min(gl,.3+Math.min(1,(M-Ds)/pl)*.6):0,$=Math.max(Yl(M),P);Math.abs($-Fs)>.004&&(Fs=$,ce.style.opacity=$.toFixed(3))},Us=[],Os=[],$l=new xs(.035,10),Kl=new ni({color:1184274,transparent:!0,opacity:.9}),Zl=new ni({color:16767392}),Ur=new ni({color:11018010}),Za=new Yi(.012,5,4),wi=new dr,Bs=(M,P,$,ie=Zl)=>{for(let he=0;he<$;he++){const Ue=new mt(Za,ie);Ue.position.copy(M);const Le=P.clone().multiplyScalar(1.2+Math.random()).add(new I((Math.random()-.5)*1.6,(Math.random()-.5)*1.6,(Math.random()-.5)*1.6));me.add(Ue),Os.push({mesh:Ue,vel:Le,life:.35+Math.random()*.2})}},Ja=(M,P)=>{const $=new mt($l,Kl);if($.position.copy(M).addScaledVector(P,.012),$.lookAt(M.clone().add(P)),me.add($),Us.push($),Us.length>40){const ie=Us.shift();ie&&me.remove(ie)}},Jl=()=>{var Re,tt,vt,Mt,Zt;const M=performance.now();if(oi||On<=0){Mn.empty();return}On--,a.textContent=String(On);const P=Rn.length()>.4;tm(P,M-Rr)&&(ts=0),ts++,Rr=M;const $=em(ts,window.innerWidth,P),ie=nm($),he=75*Math.PI/360,Ue=Math.atan(ie.x/window.innerWidth*2*Math.tan(he)*te.aspect),Le=Math.atan(ie.y/window.innerHeight*2*Math.tan(he)),Be=new I(0,0,-1).applyQuaternion(te.quaternion).applyQuaternion(new _i().setFromEuler(new Dn(-Le,Ue,0,"YXZ"))).normalize();wi.set(te.getWorldPosition(new I),Be);const Ge=[...St.walls,le.group],De=wi.intersectObjects(Ge,!0);at.shots++,Ls.push({t:M-at.startedPerf,hit:!1,head:!1,targetX:0,targetY:0,distX:0});const ht=Ls[Ls.length-1];if(li=1,Ve.intensity=6,$e.material.opacity=.95,Mn.shot(),De.length>0){const nn=De[0].object;let It=!1,Ct=nn;for(;Ct;){if((Re=Ct.userData)!=null&&Re.isEnemy){It=!0;break}Ct=Ct.parent}const vn=nn.userData.zone??"body";if(It&&R.state!=="dead"){const Vr=im(vn==="head");R.hp=Math.max(0,R.hp-Vr),at.hits++,Ql(vn==="head"),jl(De[0].point,vn==="head"?"爆头":`-${Vr}`,vn==="head"?"#ffd24a":"#ff9a86"),ht.hit=!0,ht.head=vn==="head",Dt&&(Dt.shotsFired=(Dt.shotsFired??0)+1,Dt.firstShotAt==null&&(Dt.firstShotAt=M,Dt.firstShotHit=!0,Dt.firstShotHead=vn==="head")),vn!=="head"&&R.hp>0&&ke().repeatPeek&&(R.bodyHits++,(R.bodyHits===1||R.bodyHits===3)&&(Te=1)),yt(5574929),window.setTimeout(()=>yt(0),110),Bs(De[0].point,((tt=De[0].face)==null?void 0:tt.normal)??new I(0,1,0),6,Ur),vn==="head"?Mn.headshot():Mn.hit(),R.hp<=0&&(R.state="dead",at.kills++,we(`击杀 #${at.kills}`),vn==="head"&&Ps++,Dt!=null&&Dt.appearAt&&Ei.push(M-Dt.appearAt),o.textContent=String(at.kills),Mn.killConfirm(at.kills),tn(vn==="head"?"爆头击杀":`击杀（${R.hp===0?"身体":""}）`),Bs(De[0].point,((vt=De[0].face)==null?void 0:vt.normal)??new I(0,1,0),14,Ur),Or(!0),Ze<999&&at.kills>=Ze&&po())}else Ja(De[0].point,((Mt=De[0].face)==null?void 0:Mt.normal)??new I(0,1,0)),Bs(De[0].point,((Zt=De[0].face)==null?void 0:Zt.normal)??new I(0,1,0),7),Mn.miss(),ke().repeatPeek&&R.state!=="hidden"&&R.state!=="dead"&&(Gt.set(le.group.position.x,le.group.position.y+1.15,le.group.position.z),Gt.dot(wi.ray.direction)-wi.ray.origin.dot(wi.ray.direction)>0&&wi.ray.distanceToPoint(Gt)<.9&&(Te=1))}On<=0&&Qa()},Qa=()=>{oi||(oi=!0,wr=performance.now(),ka=wr+Hi.reloadMs,a.textContent="换弹中",Mn.reloadStart())},tn=(M,P=850)=>{u.textContent=M,u.className="s3-banner show",window.setTimeout(()=>{u.className="s3-banner"},P)},Ql=M=>{d.classList.remove("hit","headhit"),d.offsetWidth,d.classList.add(M?"headhit":"hit")},jl=(M,P,$)=>{const ie=M.clone().project(te),he=document.createElement("div");he.className="s3-dmg-item",he.textContent=P,he.style.color=$,he.style.left=`${(ie.x+1)/2*100}%`,he.style.top=`${(-ie.y+1)/2*100}%`,f.appendChild(he),window.setTimeout(()=>he.remove(),700)},ec=()=>{Dt={targetId:at.kills+at.deaths+1,appearAt:performance.now(),firstShotAt:null,firstShotHit:!1,firstShotHead:!1,shotsFired:0,killed:!1,killAt:null,escaped:!1,flickDistPx:null,preaimErrPx:null,displacementPx:0,trackMs:null,activeDurMs:null,attacked:!1}},Or=M=>{Dt&&(Dt.killed=M,Dt.killAt=performance.now(),Dt.escaped=!M,Wa.push(Dt),Dt=null)},ja=M=>{if(!en){if($t.add(M.code),["KeyP","KeyC","KeyR","KeyF","Tab"].includes(M.code)&&M.preventDefault(),M.code==="KeyR"&&Qa(),M.code==="KeyF"&&ro(),M.code==="KeyP"){Ae=!1;const P=fe==="low"?"medium":fe==="medium"?"high":"low";Ri(P),tn(`画质：${P==="low"?"低（540p 级）":P==="medium"?"中（100 万像素）":"高（含阴影，需刷新页面生效）"}`)}M.code==="KeyC"&&(dn.on=!dn.on,Yn(),tn(dn.on?"掩体：开启":"掩体：关闭")),M.code==="Escape"&&rc(),(M.code==="ControlLeft"||M.code==="ControlRight")&&(hn=!0)}},eo=M=>{$t.delete(M.code),(M.code==="ControlLeft"||M.code==="ControlRight")&&(hn=!1)},to=M=>{if(en||!ln||document.pointerLockElement!==s||performance.now()-Rt<120)return;const P=bt(),$=Number.isFinite(M.movementX)?M.movementX:0,ie=Number.isFinite(M.movementY)?M.movementY:0;if(Math.abs($)>P*3||Math.abs(ie)>P*3){on++,on===1&&we(`鼠标位移尖峰 ${Math.round($)}/${Math.round(ie)} 计数（已丢弃）`);return}const Ue=Math.max(-P,Math.min(P,$)),Le=Math.max(-P,Math.min(P,ie)),Be=Wl(pt)*Math.PI/180;Kt-=Ue*Be,ot=Math.max(-1.1,Math.min(1.1,ot-Le*Be))},no=M=>{en||M.button===0&&(un=!0)},io=M=>{M.button===0&&(un=!1)};document.addEventListener("keydown",ja),document.addEventListener("keyup",eo),document.addEventListener("mousemove",to),document.addEventListener("mousedown",no),document.addEventListener("mouseup",io);const Kn=()=>{const M=i.clientWidth||window.innerWidth,P=i.clientHeight||window.innerHeight,$=He[fe],ie=Math.sqrt($/Math.max(1,M*P)),he=Math.max(.5,Math.min(window.devicePixelRatio,ie));de.setPixelRatio(he),de.setSize(M,P,!1),te.aspect=M/P,te.updateProjectionMatrix()},Br=i.querySelector(".slice3d")??i;let zr=0;const so=async()=>{if(document.fullscreenElement===Br)return!0;try{return await Br.requestFullscreen(),zr=performance.now(),!0}catch{return!1}},ro=async()=>{if(document.fullscreenElement){try{await document.exitFullscreen(),tn("已退出全屏")}catch{tn("退出全屏失败")}return}const M=await so();tn(M?"已进入全屏（Esc 退出）":"当前环境不允许全屏，请用浏览器菜单的 F11")},tc=()=>{Kn(),window.setTimeout(Kn,120),window.setTimeout(Kn,420)},ao=()=>{tc(),document.fullscreenElement===Br&&(Rt=performance.now())};document.addEventListener("fullscreenchange",ao),window.addEventListener("resize",Kn),s.addEventListener("webglcontextlost",M=>{M.preventDefault(),Mi="WebGL 上下文丢失（显存或驱动问题）",zs("图形上下文丢失")}),s.addEventListener("webglcontextrestored",()=>{Mi=""});const zs=M=>{if(!Ir){if(Ir=!0,Cs++,localStorage.setItem("jg.slice3d.recoveries",String(Cs)),Fe&&zr>0&&performance.now()-zr<3e3){Fe=!1;try{localStorage.setItem(Ie,"window")}catch{}U()}try{localStorage.setItem("jg.slice3d.lastRecovery",`${M} · ${new Date().toLocaleString("zh-CN")}`)}catch{}try{tn(`${M}，正在自动恢复…`)}catch{}window.setTimeout(()=>window.location.reload(),900)}};window.setInterval(()=>{if(Ir)return;const M=performance.now();if(!ln){!A.classList.contains("hidden")&&M-ws>6e3&&zs("加载阶段停摆（浏览器没有送帧）");return}if(M-ws>2500){zs("主循环停摆（浏览器没有送帧）");return}M-Rs>2e3&&zs("渲染停摆（主循环在跑但画面没更新）")},1e3);const oo=new ResizeObserver(()=>Kn());oo.observe(i),Kn(),(()=>{try{de.compile(me,te),de.render(me,te)}catch{}})();const Ri=M=>{fe=M,we(`画质 → ${M}`),localStorage.setItem("jg.slice3d.quality",M),dt.intensity=M==="low"?3:6,Kn()};Ri(fe);const Gr=()=>new Promise(M=>requestAnimationFrame(()=>M())),Gs=(M=500)=>new Promise(P=>{let $=!1;const ie=()=>{$||($=!0,P())};requestAnimationFrame(ie),window.setTimeout(ie,M)}),ks=(M,P)=>{const $=Math.round(Math.max(0,Math.min(1,M))*100);T.style.width=`${$}%`,S.textContent=`${$}%`,C.textContent=P},nc=async M=>{for(;qe.length<M;){const P=Sl();P.group.visible=!1,me.add(P.group),qe.push(P),ks(qe.length/M*.55,`构建敌人模型 ${qe.length}/${M}`),qe.length%3===0&&await Gs()}for(let P=0;P<qe.length;P++){const $=qe[P];$.group.visible=!0,$.group.position.set(0,0,te.position.z-3.5),de.render(me,te),$.group.visible=!1,$.group.position.set(0,0,0),ks(.55+P/Math.max(1,qe.length)*.35,`预编译着色器 ${P+1}/${qe.length}`),await Gs()}ks(.93,"预热命中特效…"),await Gs();for(let P=0;P<6;P++){const $=new mt(Za,Ur);$.position.set(0,1.2,te.position.z-3),me.add($),de.render(me,te),me.remove($)}ks(1,"准备完成"),await Gs()},Hs=()=>{Bn=100,en=!1,Ds=0,W.classList.add("hidden"),Is=0,Fr=-1e9,Fs=0,ce.style.opacity="0",Ti=0,ss=0,bi=0,Ai=0,Ns=0,at.shots=0,at.hits=0,at.kills=0,at.deaths=0,at.startedEpoch=Date.now(),at.startedPerf=performance.now(),Ps=0,Ei.length=0,Va=performance.now(),o.textContent="0",l.textContent="--",c.textContent="100",a.textContent=String(Hi.magSize),Cr=!1,Yt()},Vs=()=>Math.min(.5,Math.max(.2,ke().fireDelay*R.paceFactor));let lo=0,co=0,ho=0;const kr=new dr,ic=()=>{var ht;const M=le.group,P=Un.set(M.position.x,M.position.y+1.6*M.scale.y,M.position.z),$=ri.copy(te.position).sub(P).normalize(),ie=.05+Math.random()*.06,he=(Math.random()*2-1)*ie,Ue=Math.cos(he),Le=Math.sin(he);$.set($.x*Ue-$.z*Le,$.y+(Math.random()*2-1)*ie*.6,$.x*Le+$.z*Ue).normalize(),kr.set(P,$),kr.far=60;const Be=kr.intersectObjects(St.walls,!1),Ge=Be.length>0?Be[0].point:P.clone().addScaledVector($,14),De=Be.length>0?((ht=Be[0].face)==null?void 0:ht.normal)??new I(0,1,0):new I(0,1,0);Ja(Ge,De),Bs(Ge,De,5)},uo=()=>{lo++,Mn.enemyShot();const M=ke();if(Math.random()>=M.hitRate){ic();return}const P=Math.random()<M.headRate;co++,P&&ho++,fo(P?_m:fl,P)},fo=(M,P=!1)=>{if(en)return;Bn=Math.max(0,Bn-M),c.textContent=String(Bn),P&&Mn.hit(),document.body.classList.add(P?"s3-hurt-head":"s3-hurt"),window.setTimeout(()=>document.body.classList.remove(P?"s3-hurt-head":"s3-hurt"),P?420:260);const $=le.group,ie=te.position.x-$.position.x,he=te.position.z-$.position.z,Ue=Math.hypot(ie,he)||1,Le=P?Mm:Sm;if($a(Le.amp,Le.rot,Le.ms,ie/Ue,he/Ue),Ya(P?.6:.35),Mn.bloodHit(P),Ns++,c.classList.add("s3-hp-hit"),window.setTimeout(()=>c.classList.remove("s3-hp-hit"),P?420:260),Dt&&(Dt.attacked=!0,Or(!1)),Bn<=0){sc();return}we(`${P?"被爆头":"被击中"}：血量剩 ${Bn}`)},sc=()=>{if(!en){en=!0,Ds=performance.now(),at.deaths++,zn++;try{localStorage.setItem(ya,String(zn))}catch{}zn>=vm?(Z.textContent="又死了，你个菜鸡",Z.classList.add("is-taunt"),Q.textContent=`连续阵亡 ${zn} 次`):(Z.textContent="你死了",Z.classList.remove("is-taunt"),Q.textContent=""),we(`玩家阵亡 #${at.deaths}（血量归零，连续 ${zn} 次）`),c.textContent="0",un=!1,$t.clear(),hn=!1,document.pointerLockElement===s&&document.exitPointerLock(),$a(Ea.amp,Ea.rot,Ea.ms,0,0),Ya(gl),Mn.deathThud(),Ns++}};W.addEventListener("click",()=>{W.classList.add("hidden"),en=!1,ln=!1,Hs(),r.classList.remove("hidden"),we("阵亡后返回开始界面")});const po=()=>{Cr=!0,ln=!1,un=!1,zn=0;try{localStorage.setItem(ya,"0")}catch{}document.pointerLockElement===s&&document.exitPointerLock();const M=(performance.now()-Va)/1e3,P=at.shots>0?at.hits/at.shots*100:0,$=at.kills>0?Ps/at.kills*100:0,ie=Ei.length?Ei.reduce((Ue,Le)=>Ue+Le,0)/Ei.length:0,he=[["击杀",`${at.kills} / ${Ze<999?Ze:"∞"}`],["爆头击杀率",`${$.toFixed(1)}%`],["命中率",`${P.toFixed(1)}%`],["平均反应",`${ie.toFixed(0)} ms`],["阵亡",String(at.deaths)],["用时",`${M.toFixed(1)} s`]];L.innerHTML=he.map(([Ue,Le])=>`<div class="s3-score-row"><span>${Ue}</span><b>${Le}</b></div>`).join(""),y.classList.remove("hidden")},Hr=()=>{r.classList.add("hidden"),je(),Fe&&!document.fullscreenElement&&so().then(M=>{M||(we("自动全屏被浏览器拒绝"),window.setTimeout(()=>tn("浏览器拒绝了自动全屏 → 按 F 手动切换（或回菜单点「全屏（F）」）",3e3),900))}),(async()=>(oe?Hs():(A.classList.remove("hidden"),await nc(Math.min(Ze,24)),A.classList.add("hidden"),oe=!0,Hs(),we(`开始本局：敌人 ${Ze}，画质 ${fe}`),ae&&tn("检测到软件渲染（未使用显卡）→ 请在浏览器开启硬件加速")),ln=!0,Ts=performance.now(),document.pointerLockElement!==s&&je()))()},rc=()=>{if(ln=!1,un=!1,cancelAnimationFrame(Es),document.pointerLockElement===s&&document.exitPointerLock(),document.fullscreenElement&&document.exitFullscreen(),at.shots>0){const M=am({modeId:"positioning",sceneId:"3d-slice",sceneName:"3D 试验场景",difficultyId:"normal",difficultyName:"普通",profileId:"3d",profileName:"3D 切片",startedAt:at.startedEpoch,durationMs:performance.now()-at.startedPerf,shots:Ls,wastedShots:0,encounters:Wa});cm(M)}e.onExit()};Y.addEventListener("click",Hr),Y.textContent="点击进入",Y.disabled=!1,re&&Hr(),r.addEventListener("click",M=>{const P=M.target;P&&P.closest("button")&&P.closest("button")!==Y||Hr()}),B.addEventListener("click",()=>{(async()=>{z.innerHTML="采样中…（3 秒，请勿操作）",r.classList.add("hidden"),await Gr();for(let Ge=0;Ge<20;Ge++)await Gr();Lr=[],Pr=!0;const M=performance.now();for(;performance.now()-M<3e3;)await Gr();Pr=!1,r.classList.remove("hidden");const P=Lr.slice().sort((Ge,De)=>Ge-De),$=Ge=>P[Math.min(P.length-1,Math.floor(P.length*Ge))]??0,ie=P.reduce((Ge,De)=>Ge+De,0)/Math.max(1,P.length),he=$(.95),Ue=P[P.length-1]??0,Le=he<=20?"✅ 机器完全跑得动（60 FPS 级）":he<=33?"⚠️ 基本流畅，偶有掉帧":"❌ 渲染吃力（核显/软件渲染，或窗口分辨率过大）",Be=de.domElement;z.innerHTML=`
        <div class="s3-score-row"><span>版本</span><b>${Ma}</b></div>
        <div class="s3-score-row"><span>渲染器</span><b>${ye}</b></div>
        <div class="s3-score-row"><span>帧率</span><b>${(1e3/Math.max(.01,ie)).toFixed(1)} FPS（均值）</b></div>
        <div class="s3-score-row"><span>帧时间 平均/P95/最差</span><b>${ie.toFixed(1)} / ${he.toFixed(1)} / ${Ue.toFixed(1)} ms</b></div>
        <div class="s3-score-row"><span>渲染缓冲</span><b>${Be.width} × ${Be.height}</b></div>
        <div class="s3-score-row"><span>窗口 / DPR</span><b>${window.innerWidth}×${window.innerHeight} / ${window.devicePixelRatio}</b></div>
        <div class="s3-score-row"><span>画质</span><b>${fe==="low"?"低":fe==="medium"?"中":"高"}</b></div>
        <div class="s3-score-row"><span>结论</span><b>${Le}</b></div>
      `})()}),m.addEventListener("click",()=>void ro()),g.addEventListener("click",()=>{dn.on=!0,Yn()}),v.addEventListener("click",()=>{dn.on=!1,Yn()}),_.addEventListener("click",()=>{y.classList.add("hidden"),Hs(),ln=!0,Ts=performance.now(),je()}),b.addEventListener("click",()=>{y.classList.add("hidden"),r.classList.remove("hidden")}),i.querySelector("#s3-quit").addEventListener("click",()=>{ln=!1,e.onExit()}),s.addEventListener("click",()=>{en||document.pointerLockElement!==s&&je()}),document.addEventListener("pointerlockchange",()=>{if(!en){if(document.pointerLockElement===s){Rt=performance.now();return}ln&&document.pointerLockElement!==s&&(r.classList.remove("hidden"),ln=!1)}}),document.addEventListener("pointerlockerror",()=>{ft=!0});const mo=()=>{Es=requestAnimationFrame(mo);try{ac()}catch(M){Mi=M instanceof Error?M.message:String(M)}},ac=()=>{const M=performance.now();if(ws=M,M-Ha<15.5)return;Ha=M;const P=Math.min(.05,(M-Ts)/1e3);if(Ts=M,P>=.9&&(yi++,fe!=="low"&&Ri("low")),P>.4&&yi++,P*1e3>As&&(As=P*1e3),Pr&&Lr.push(P*1e3),!ln)return;if(en){const Re=M-Ds,tt=Math.min(1,Re/pl),vt=1-Math.pow(1-tt,3);te.position.set(jt.x,sn.eyeHeight-vt*(sn.eyeHeight-.34),jt.z),te.rotation.set(ot-vt*.26,Kt+vt*.42,vt*1.18),k.position.set(.2+vt*.3,-.2-vt*.62,-.34+vt*.12),k.rotation.set(vt*.95,.05,vt*.55),$e.material.opacity=0,Re>=xm&&W.classList.contains("hidden")&&(W.classList.remove("hidden"),we("显示阵亡界面")),Ka(M),de.render(me,te),Dr++,Rs=performance.now();return}ln&&document.pointerLockElement!==s?N.classList.remove("hidden"):N.classList.add("hidden"),te.rotation.set(ot,Kt,0);const $=new I(-Math.sin(Kt),0,-Math.cos(Kt)),ie=new I(Math.cos(Kt),0,-Math.sin(Kt)),he=new I;$t.has("KeyW")&&he.add($),$t.has("KeyS")&&he.sub($),$t.has("KeyD")&&he.add(ie),$t.has("KeyA")&&he.sub(ie),he.lengthSq()>0&&he.normalize().multiplyScalar(sn.moveSpeed),Rn.lerp(he,Math.min(1,P*12)),jt.addScaledVector(Rn,P),Rn.length()>.4&&(ts=0),jt.x=Math.max(-n.player.limitX,Math.min(n.player.limitX,jt.x)),jt.z=Math.max(n.player.limitZmin,Math.min(n.player.limitZmax,jt.z));const Ue=hn?sn.crouchHeight:sn.eyeHeight;te.position.set(jt.x,Ue+Math.sin(M*.002)*.006,jt.z),te.position.y+=(Ue-te.position.y)*Math.min(1,P*10),ii(jt,.38).lengthSq()>1e-6&&(Rn.multiplyScalar(.35),te.position.x=jt.x,te.position.z=jt.z),li=Math.max(0,li-P*6.5);const Le=-Rn.x*.012;let Be=0,Ge=0,De=0,ht=0;if(oi){const Re=Math.min(1,(M-wr)/Hi.reloadMs);if(Be=Re<.25?Re/.25:Re>.75?(1-Re)/.25:1,Re>=.2&&Re<.45){const tt=(Re-.2)/.25;Ge=-.55*tt,De=1.1*tt}else if(Re>=.45&&Re<.55)Ge=-.55,De=1.1;else if(Re>=.55&&Re<.8){const tt=(Re-.55)/.25;Ge=-.55*(1-tt),De=1.1*(1-tt)}Re>=.8&&Re<.95&&(ht=Math.sin((Re-.8)/.15*Math.PI)*.085)}Se.position.set(Me.x,Me.y+Ge,Me.z),Se.rotation.x=Ce+De,be.position.set(Pe.x,Pe.y,Pe.z-ht),k.position.set(.16+Le,-.17+li*.03+Be*-.14,-.34+li*.085+Be*.02),k.rotation.set(li*.16+Be*.34,.04+Le*.5,li*.05-Be*.16),Ve.intensity=Math.max(0,Ve.intensity-P*90),$e.material.opacity=Math.max(0,$e.material.opacity-P*12),un&&M-Rr>=Hi.fireIntervalMs&&Jl(),oi&&M>=ka&&(oi=!1,On=Hi.magSize,a.textContent=String(On),Mn.reloadDone()),(()=>{const Re=le.group;if(Te>0){Te=0;const tt=ke();if(tt.repeatPeek&&R.state!=="hidden"&&R.state!=="dead"){R.counters.repeeks++,R.sameOffsetHits++;const vt=R.sameOffsetHits>=3;R.peekOffset=Ut(vt),R.peekOffset>=Math.max(...tt.peekSet)&&R.counters.wideSwings++;const Mt=Math.sign(R.peekTargetX-R.coverPos.x)||1,Zt=Math.random()<.7?-Mt:Mt,nn=Math.sign(te.position.z-R.coverPos.z)||1;R.peekTargetX=R.coverPos.x+Zt*R.peekOffset,R.peekPos.set(R.peekTargetX,0,R.coverPos.z+nn*(.9+Math.random()*.8)),R.firingSpot=new I(R.peekTargetX,0,R.peekPos.z),R.badSpots.length=0,R.aimPose=0,R.strafePauseT=0,R.crouchHold=0,R.path=[R.coverPos.clone()],R.state="walking"}}if(R.state==="hidden")R.timer-=P,R.timer<=0&&!Cr&&(R.state=R.feintPlan?"feinting":"walking",ec());else if(R.state==="feinting"){const tt=ke();if(R.feintPhase===1){R.timer-=P,Si(),le.leftLeg.rotation.x=0,le.rightLeg.rotation.x=0,R.timer<=0&&(R.feintPhase=2);return}const Mt=(R.feintPhase===3?R.feintPos2:R.feintPhase===0?R.feintPos:R.coverPos).clone().sub(Re.position);if(Mt.length()>.05){Mt.normalize(),Re.position.addScaledVector(Mt,sn.enemySpeed*1.6*R.speedJitter*P),Re.rotation.y=Math.atan2(Mt.x,Mt.z)+Math.PI,R.walkPhase+=P*9;const Ct=Math.sin(R.walkPhase)*.5;le.leftLeg.rotation.x=Ct,le.rightLeg.rotation.x=-Ct;return}if(R.feintPhase===0){R.feintPhase=1,R.timer=.16+Math.random()*.22,Si();return}if(R.feintPhase===2&&tt.feintDouble){R.feintPhase=3;return}if(R.counters.feints++,R.canChangeCover&&Math.random()<.45){const Ct=x();R.coverName=Ct.id,R.coverPos.set(Ct.x,0,Ct.z),R.path=[new I(Ct.x,0,Ct.z)],R.firingSpot=null,R.badSpots.length=0,R.counters.coverChanges++,et={seq:et.seq+1,visible:ai(new I(Ct.x,0,Ct.z)),distance:+Math.hypot(Ct.x-te.position.x,Ct.z-te.position.z).toFixed(2),cover:Ct.id,difficulty:gt,fallback:Ct.fallback,cameraY:+te.position.y.toFixed(2),x:+Ct.x.toFixed(2),z:+Ct.z.toFixed(2)}}R.peekOffset=Ut(!0);const nn=Math.random()<.5?-1:1,It=Math.sign(te.position.z-R.coverPos.z)||1;R.peekTargetX=R.coverPos.x+nn*R.peekOffset,R.peekPos.set(R.peekTargetX,0,R.coverPos.z+It*(.9+Math.random()*.8)),R.peekOffset>=Math.max(...tt.peekSet)&&R.counters.wideSwings++,R.firingSpot=new I(R.peekTargetX,0,R.peekPos.z),R.badSpots.length=0,R.feintPlan=!1,R.state="walking"}else if(R.state==="walking"){const tt=sn.enemySpeed*R.speedJitter;if(R.path.length>0){const nn=R.path[0],It=Math.hypot(nn.x-Re.position.x,nn.z-Re.position.z);Ms(nn,tt,P)&&R.path.shift();const Ct=Math.hypot(nn.x-Re.position.x,nn.z-Re.position.z);R.pathStallT=Ct<It-.02?0:R.pathStallT+P,R.pathStallT>1.5&&(R.pathStallT=0,R.path.shift());return}R.firingSpot||(R.firingSpot=ys());const vt=R.firingSpot.distanceTo(Re.position),Mt=Ms(R.firingSpot,tt,P),Zt=R.firingSpot.distanceTo(Re.position);R.stallT=Zt<vt-.02?0:R.stallT+P,R.stallT>1.2&&(R.badSpots.push(R.firingSpot.clone()),R.firingSpot=ys(),R.stallT=0),(Mt||vi(Re.position.x,Re.position.z))&&(R.state="aiming",R.timer=Vs(),R.strafeWaitT=0,le.leftLeg.rotation.x=0,le.rightLeg.rotation.x=0,Si(),R.crouch&&(Re.scale.set(1,.86,1),Re.position.y=-.06))}else if(R.state==="aiming"){if(R.aimPose=Math.min(1,R.aimPose+P*3),le.leftArm.rotation.x=-1.25*R.aimPose,le.rightArm.rotation.x=-1.35*R.aimPose,R.strafeShoot){const It=ke();R.strafeSeconds+=P,R.strafePauseT>0?R.strafePauseT-=P:(R.strafeNextChange-=P,R.strafeNextChange<=0&&(Math.abs(Re.position.x)>5.6?R.strafeDir=-R.strafeDir:Math.random()<It.strafePause?(R.strafePauseT=.1+Math.random()*.18,R.strafeWaitT=0):(R.strafeDir=-R.strafeDir,R.counters.strafeReversals++),R.strafeNextChange=.25+Math.random()*.45),Re.position.x+=R.strafeDir*1.15*P,Math.abs(Re.position.x)>5.6&&(R.strafeDir=-R.strafeDir),ii(Re.position,.4))}const tt=ke();R.crouchHold>0?R.crouchHold-=P:Math.random()<tt.crouchSpam*P*1.3&&(R.crouchHold=.35+Math.random()*.55,R.counters.crouchToggles++);const Mt=R.crouch||R.crouchHold>0?.86:1;Math.abs(Re.scale.y-Mt)>.002&&(Re.scale.y+=(Mt-Re.scale.y)*Math.min(1,P*10),Re.position.y=-.06*(1-Re.scale.y)/.14);const Zt=new I(jt.x-Re.position.x,0,jt.z-Re.position.z);if(Re.rotation.y=Math.atan2(Zt.x,Zt.z)+Math.PI,es()){if(R.timer-=P,R.blocked=0,R.timer>0||(R.strafeWaitT=0,R.blocked=0,uo(),en))return;R.timer=Vs()}else if(R.blocked+=P,R.blocked>.5&&(R.timer=Math.max(R.timer,Vs())),R.blocked>1.2){if(R.blocked=0,R.canChangeCover){const It=x();R.coverName=It.id,R.coverPos.set(It.x,0,It.z),R.counters.coverChanges++;const Ct=Math.random()<.5?-1:1,vn=Ut(!0);R.peekTargetX=It.x+Ct*vn,R.peekPos.set(R.peekTargetX,0,It.z+1.1+Math.random()*.9),R.path=[new I(It.x,0,It.z)],R.firingSpot=null,R.badSpots.length=0}else{const It=Math.random()<.5?-1:1;R.peekPos.x=Math.max(-5.6,Math.min(5.6,Re.position.x+It*1.1))}R.state="walking"}}else R.state==="dead"&&(R.dieProgress=Math.min(1,R.dieProgress+P*1.1),Re.rotation.x=-R.dieProgress*1.35,Re.position.y=-R.dieProgress*.18,R.dieProgress>=1&&(R.timer+=P,R.timer>1&&Yt()))})();for(let Re=Os.length-1;Re>=0;Re--){const tt=Os[Re];tt.life-=P,tt.vel.y-=4.5*P,tt.mesh.position.addScaledVector(tt.vel,P),tt.life<=0&&(me.remove(tt.mesh),Os.splice(Re,1))}if(l.textContent=at.shots>0?`${Math.round(at.hits/at.shots*100)}%`:"--",bs++,ns+=P,ns>=.5){const Re=bs/ns,tt=de.info.render;if(h.textContent=`${Re.toFixed(0)} FPS · ${(1e3/Math.max(1,Re)).toFixed(1)} ms · ${tt.calls} draws · ${(tt.triangles/1e3).toFixed(1)}k tri · dpr ${de.getPixelRatio().toFixed(2)} · 画质 ${fe==="low"?"低":fe==="medium"?"中":"高"}
GPU: ${ye} · 鼠标输入 ${ft?"普通（系统加速可能介入）":"原始"}`+(ae?" ⚠ 软件渲染（未用显卡）":"")+(on>0?` · 位移尖峰 ${on}`:"")+(yi>0?` · 长卡 ${yi}`:"")+(Mi?` · 异常：${Mi}`:""),Ae&&ln&&(is.push(Re),is.length>=6)){const vt=is.reduce((Mt,Zt)=>Mt+Zt,0)/is.length;vt<45&&fe==="high"?(Ri("medium"),tn(`帧率 ${vt.toFixed(0)}，已自动降到中等画质`)):vt<40&&fe==="medium"&&(Ri("low"),tn(`帧率 ${vt.toFixed(0)}，已自动降到低画质（关阴影）`)),is.length=0}bs=0,ns=0}Ka(M),de.render(me,te),Dr++,Rs=performance.now()};return Es=requestAnimationFrame(mo),()=>{cancelAnimationFrame(Es),ln=!1,oo.disconnect(),document.removeEventListener("fullscreenchange",ao),document.removeEventListener("keydown",ja),document.removeEventListener("keyup",eo),document.removeEventListener("mousemove",to),document.removeEventListener("mousedown",no),document.removeEventListener("mouseup",io),window.removeEventListener("resize",Kn),de.dispose()}}export{Cm as mountThreeSlice};
