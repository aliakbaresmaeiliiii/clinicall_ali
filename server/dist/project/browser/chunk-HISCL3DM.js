import{b as g,d,i as v}from"./chunk-IDOUBITA.js";import{a as m}from"./chunk-L5IHBF74.js";import{e as k}from"./chunk-NEF4TMLT.js";import{_a as y,c as f,ib as b}from"./chunk-G6XNEXZK.js";import{da as l,g as a,ja as o,na as p}from"./chunk-ELVZKH6B.js";import{g as s,h as u,i as h}from"./chunk-PXA7OGPQ.js";var I=(()=>{var t;let r=class r{constructor(){u(this,t);h(this,t,o(f)),this.userEmail=new a(""),this.storeEmail$=this.userEmail.asObservable(),this.config=m.apiEndPoint,this.isEducator=new a(!1),this.users$=s(this,t).get("https://jsonplaceholder.typicode.com/users")}getUserInfo(e){return s(this,t).get(`${this.config}getUserInfo/${e}`)}checkRoles(e){["Educator","HOD","Institution Administrator","Account Administrator","Director","Curriculum Director","Account Curriculum Director","Account Director","Homeroom Educator"].forEach(D=>{if(e.includes(D)){this.isEducator.next(!0);return}})}profile(e){return s(this,t).get(`https://jsonplaceholder.typicode.com/users/${e}`)}confirmEmail(e){return s(this,t).post(`${this.config}user/confirm`,e)}getOTP(e){return s(this,t).get(`${this.config}user/getOTP/${e}`)}updateProfile(e){return s(this,t).put(`${this.config}user/updateProfile`,e)}forgetPassword(e){return s(this,t).get(`${this.config}user/forgot-passsword/${e}`)}};t=new WeakMap,r.\u0275fac=function(n){return new(n||r)},r.\u0275prov=l({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();var $=(()=>{var t;let r=class r{constructor(){u(this,t);this.config=m.apiEndPoint,h(this,t,o(f)),this.permissions=new a([]),this.refreshTokenInProgress=!1,this.refreshTokenSubject=new a(null),typeof localStorage<"u"&&(this.tokenKey=localStorage.getItem("tokenKey"))}signIn(e){return s(this,t).post(`${this.config}sign-in`,e)}signUp(e){return s(this,t).post(`${this.config}auth/sign-up`,e)}logout(){}getToken(){return localStorage.getItem(this.tokenKey)}isAuthDataAvailable(){return!!this.getToken()}};t=new WeakMap,r.\u0275fac=function(n){return new(n||r)},r.\u0275prov=l({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();var V=(()=>{let t=class t{constructor(){this.router=o(d),this.toastrService=o(v),this.fb=o(b),this.dialog=o(k),this.authService=o($),this.userService=o(I),this.activatedRoute=o(g),this.years=this.getYears()}validateAllFormFields(c){Object.keys(c.controls).forEach(e=>{let n=c.get(e);n instanceof y&&n.markAsTouched({onlySelf:!0})})}onCancel(){this.router.navigate(["aliakbar"],{skipLocationChange:!0})}getYears(){let c=new Date().getUTCFullYear();return Array(c-(c-40)).fill("").map((e,n)=>c-n)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=p({type:t,selectors:[["ng-component"]],decls:0,vars:0,template:function(e,n){},encapsulation:2,changeDetection:0});let i=t;return i})();export{$ as a,I as b,V as c};
