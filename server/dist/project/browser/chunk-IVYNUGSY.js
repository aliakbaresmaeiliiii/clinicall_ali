import{a as Ee}from"./chunk-UUEQ425Z.js";import{a as Re}from"./chunk-CSJNNEUZ.js";import{a as ke}from"./chunk-3SAJJG2T.js";import{a as he,b as pe}from"./chunk-DNSOJDVW.js";import{d as Y,e as W,f as X,h as Q,n as me}from"./chunk-EGMUEH5E.js";import{b as Ie}from"./chunk-5MOUG5TN.js";import{a as te,e as ie}from"./chunk-LFXQKQAG.js";import{Oa as ne,Qa as I,Sa as se,Ta as oe,Ua as re,Wa as w,Ya as ae,_ as ee,_a as le,bb as ce,fb as ue,gb as de,ib as ge,jb as fe,nb as _e,ob as Oe,rb as we,sb as ve}from"./chunk-JG53XC6X.js";import{Cb as T,Da as $,F as z,Hb as g,Ia as b,M as V,Mb as f,Rb as a,Sb as c,Tb as _,X as R,_b as y,da as j,ea as q,fb as d,g as k,h as A,i as L,ia as p,ja as h,kc as u,lc as S,mb as B,na as G,oa as K,ob as Z,qd as O,s as F,sc as J,uc as H}from"./chunk-S2IW6LC3.js";import{a as v,g as C,h as x,i as U,j as E}from"./chunk-PXA7OGPQ.js";var P=class{constructor(){}loadScript(n,m,i,e=null){if(typeof document<"u"&&!document.getElementById(n)){let t=document.createElement("script");t.async=!0,t.src=m,t.onload=i,e||(e=document.head),e.appendChild(t)}}},D=class{},Ne={oneTapEnabled:!0},N=(()=>{let n=class n extends P{constructor(i,e){super(),this.clientId=i,this.initOptions=e,this.changeUser=new b,this._socialUser=new k(null),this._accessToken=new k(null),this._receivedAccessToken=new b,this.initOptions=v(v({},Ne),this.initOptions),this._socialUser.pipe(R(1)).subscribe(this.changeUser),this._accessToken.pipe(R(1)).subscribe(this._receivedAccessToken)}initialize(i,e){return new Promise((t,s)=>{try{this.loadScript(n.PROVIDER_ID,this.getGoogleLoginScriptSrc(e),()=>{if(google.accounts.id.initialize({client_id:this.clientId,auto_select:i,callback:({credential:o})=>{let l=this.createSocialUser(o);this._socialUser.next(l)},prompt_parent_id:this.initOptions?.prompt_parent_id,itp_support:this.initOptions.oneTapEnabled,use_fedcm_for_prompt:this.initOptions.oneTapEnabled}),this.initOptions.oneTapEnabled&&this._socialUser.pipe(z(o=>o===null)).subscribe(()=>google.accounts.id.prompt(console.debug)),this.initOptions.scopes){let o=this.initOptions.scopes instanceof Array?this.initOptions.scopes.filter(l=>l).join(" "):this.initOptions.scopes;this._tokenClient=google.accounts.oauth2.initTokenClient({client_id:this.clientId,scope:o,prompt:this.initOptions.prompt,callback:l=>{l.error?this._accessToken.error({code:l.error,description:l.error_description,uri:l.error_uri}):this._accessToken.next(l.access_token)}})}t()})}catch(o){s(o)}})}getLoginStatus(){return new Promise((i,e)=>{this._socialUser.value?i(this._socialUser.value):e(`No user is currently logged in with ${n.PROVIDER_ID}`)})}refreshToken(){return new Promise((i,e)=>{google.accounts.id.revoke(this._socialUser.value.id,t=>{t.error?e(t.error):i(this._socialUser.value)})})}getAccessToken(){return new Promise((i,e)=>{this._tokenClient?(this._tokenClient.requestAccessToken({hint:this._socialUser.value?.email}),this._receivedAccessToken.pipe(V(1)).subscribe(i)):this._socialUser.value?e("No token client was instantiated, you should specify some scopes."):e("You should be logged-in first.")})}revokeAccessToken(){return new Promise((i,e)=>{this._tokenClient?this._accessToken.value?google.accounts.oauth2.revoke(this._accessToken.value,()=>{this._accessToken.next(null),i()}):e("No access token to revoke"):e("No token client was instantiated, you should specify some scopes.")})}signIn(){return Promise.reject('You should not call this method directly for Google, use "<asl-google-signin-button>" wrapper or generate the button yourself with "google.accounts.id.renderButton()" (https://developers.google.com/identity/gsi/web/guides/display-button#javascript)')}signOut(){return E(this,null,function*(){google.accounts.id.disableAutoSelect(),this._socialUser.next(null)})}createSocialUser(i){let e=new D;e.idToken=i;let t=this.decodeJwt(i);return e.id=t.sub,e.name=t.name,e.email=t.email,e.photoUrl=t.picture,e.firstName=t.given_name,e.lastName=t.family_name,e}decodeJwt(i){let t=i.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(window.atob(t).split("").map(function(o){return"%"+("00"+o.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(s)}getGoogleLoginScriptSrc(i){return i?`https://accounts.google.com/gsi/client?hl=${i}`:"https://accounts.google.com/gsi/client"}};n.PROVIDER_ID="GOOGLE";let r=n;return r})(),be=(()=>{let n=class n{get authState(){return this._authState.asObservable()}get initState(){return this._initState.asObservable()}constructor(i,e,t){this._ngZone=e,this._injector=t,this.providers=new Map,this.autoLogin=!1,this.lang="",this._user=null,this._authState=new A(1),this.initialized=!1,this._initState=new L,i instanceof Promise?i.then(s=>{this.initialize(s)}):this.initialize(i)}initialize(i){this.autoLogin=i.autoLogin!==void 0?i.autoLogin:!1,this.lang=i.lang!==void 0?i.lang:"";let{onError:e=console.error}=i;i.providers.forEach(t=>{this.providers.set(t.id,"prototype"in t.provider?this._injector.get(t.provider):t.provider)}),Promise.all(Array.from(this.providers.values()).map(t=>t.initialize(this.autoLogin,this.lang))).then(()=>{if(this.autoLogin){let t=[],s=!1;this.providers.forEach((o,l)=>{let M=o.getLoginStatus();t.push(M),M.then(ye=>{this.setUser(ye,l),s=!0}).catch(console.debug)}),Promise.all(t).catch(()=>{s||(this._user=null,this._authState.next(null))})}this.providers.forEach((t,s)=>{F(t.changeUser)&&t.changeUser.subscribe(o=>{this._ngZone.run(()=>{this.setUser(o,s)})})})}).catch(t=>{e(t)}).finally(()=>{this.initialized=!0,this._initState.next(this.initialized),this._initState.complete()})}getAccessToken(i){return E(this,null,function*(){let e=this.providers.get(i);if(this.initialized)if(e){if(!(e instanceof N))throw n.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN}else throw n.ERR_LOGIN_PROVIDER_NOT_FOUND;else throw n.ERR_NOT_INITIALIZED;return yield e.getAccessToken()})}refreshAuthToken(i){return new Promise((e,t)=>{if(!this.initialized)t(n.ERR_NOT_INITIALIZED);else{let s=this.providers.get(i);s?typeof s.refreshToken!="function"?t(n.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN):s.refreshToken().then(o=>{this.setUser(o,i),e()}).catch(o=>{t(o)}):t(n.ERR_LOGIN_PROVIDER_NOT_FOUND)}})}refreshAccessToken(i){return new Promise((e,t)=>{if(!this.initialized)t(n.ERR_NOT_INITIALIZED);else if(i!==N.PROVIDER_ID)t(n.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);else{let s=this.providers.get(i);s instanceof N?s.revokeAccessToken().then(e).catch(t):t(n.ERR_LOGIN_PROVIDER_NOT_FOUND)}})}signIn(i,e){return new Promise((t,s)=>{if(!this.initialized)s(n.ERR_NOT_INITIALIZED);else{let o=this.providers.get(i);o?o.signIn(e).then(l=>{this.setUser(l,i),t(l)}).catch(l=>{s(l)}):s(n.ERR_LOGIN_PROVIDER_NOT_FOUND)}})}signOut(i=!1){return new Promise((e,t)=>{if(!this.initialized)t(n.ERR_NOT_INITIALIZED);else if(!this._user)t(n.ERR_NOT_LOGGED_IN);else{let s=this._user.provider,o=this.providers.get(s);o?o.signOut(i).then(()=>{e(),this.setUser(null)}).catch(l=>{t(l)}):t(n.ERR_LOGIN_PROVIDER_NOT_FOUND)}})}setUser(i,e){i&&e&&(i.provider=e),this._user=i,this._authState.next(i)}};n.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",n.ERR_NOT_LOGGED_IN="Not logged in",n.ERR_NOT_INITIALIZED="Login providers not ready yet. Are there errors on your console?",n.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN="Chosen login provider is not supported for refreshing a token",n.ERR_NOT_SUPPORTED_FOR_ACCESS_TOKEN="Chosen login provider is not supported for getting an access token",n.\u0275fac=function(e){return new(e||n)(p("SocialAuthServiceConfig"),p(Z),p($))},n.\u0275prov=j({token:n,factory:n.\u0275fac,providedIn:"root"});let r=n;return r})(),Te=(()=>{let n=class n{static initialize(i){return{ngModule:n,providers:[be,{provide:"SocialAuthServiceConfig",useValue:i}]}}constructor(i){if(i)throw new Error("SocialLoginModule is already loaded. Import it in the AppModule only")}};n.\u0275fac=function(e){return new(e||n)(p(n,12))},n.\u0275mod=K({type:n}),n.\u0275inj=q({providers:[be],imports:[O]});let r=n;return r})();var Pe=()=>["/auth/forgot-password"];function De(r,n){r&1&&(a(0,"mat-error"),u(1,"Please enter a valid userName address"),c())}function Me(r,n){r&1&&(a(0,"mat-error"),u(1,"UserName is "),a(2,"strong"),u(3,"required"),c()())}function Ce(r,n){r&1&&(a(0,"mat-error"),u(1,"Please enter a valid password address"),c())}function xe(r,n){r&1&&(a(0,"mat-error"),u(1,"password is "),a(2,"strong"),u(3,"required"),c()())}var vt=(()=>{var n;let m=class m{constructor(){x(this,n);this.router=h(Y),U(this,n,h(ke)),this.permissionService=h(Re),this.renderer=h(B),this.matcher=new ee,this.themeManager=h(Ee),this.title="Angular",this.labelUserName="UserName",this.labelPassword="password",this.wobbleField=!1,this.theme=this.themeManager.theme}toggleTheme(){this.themeManager.toggleTheme()}createForm(){this.form=new re({email:new w("",[I.required,I.email]),password:new w("",I.required),remmeber:new w(!1)})}refreshToken(){}ngOnInit(){this.createForm()}decodeToken(e){return JSON.parse(atob(e.split(".")[1]))}handleLogin(e){if(e&&e.credential){let t=this.decodeToken(e.credential);console.log("payload",t),sessionStorage.setItem("loggedInUser",JSON.stringify(t)),this.router.navigate(["aliakbar/dashboard"])}else console.error("Invalid response or missing credential")}login(e){this.form.value&&C(this,n).signIn(this.form.value).subscribe(t=>{this.permissionService.setPermissions(t.data.permissions);let s=t.data,o=JSON.stringify(s);localStorage.setItem("userData",o),this.router.navigate(["aliakbar/settings"])})}navigateRegister(){this.router.navigate(["auth/register"])}onAdminRol(e){this.role=e}onDoctorRol(e){}onPatientRol(e){}get email(){return this.form.get("email")}get password(){return this.form.get("password")}};n=new WeakMap,m.\u0275fac=function(t){return new(t||m)},m.\u0275cmp=G({type:m,selectors:[["app-login"]],standalone:!0,features:[J],decls:39,vars:11,consts:[[1,"desktop:flex","content","w-full","h-full"],[1,"w-1/2","desktop:block","mobile:hidden"],[1,"left-img"],[1,"desktop:w-1/2","text-center","h-screen","mt-28","w-full"],[1,"desktop:w-2/3","m-auto","desktop:mt-20","mobile:p-8"],[1,"desktop:text-left","font-extrabold","mobile:text-center"],[1,"cursor-pointer","flex","justify-start","text-xs","sign-up"],[1,"ml-2",3,"click"],[1,"text-blue-600"],[1,"w-full"],[1,"text-left","font-extrabold","text-3xl","p-3"],[3,"ngSubmit","formGroup"],["data-testing","username","appearance","outline",1,"w-full"],["type","text","matInput","","formControlName","email","placeholder","UserName",3,"errorStateMatcher"],["appearance","outline",1,"w-full","pt-2"],["type","Password","matInput","","formControlName","password","placeholder","Password",3,"errorStateMatcher"],[1,"flex","justify-between","items-center"],["formControlName","remmeber"],["routerLinkActive","router-link-active",1,"cursor-pointer","flex","justify-end","text-xs","dark:textblu","hover:text-blue","mt-7","mb-7",3,"routerLink"],["mat-flat-button","","data-testid","login-button","color","primary","type","submit",1,"login-button","ease-in-out","duration-300","w-full","desktop:m-0","tablet:mt-2","mobile:mt-2"],[1,"social-login-title"],[1,"flex","justify-center","items-center","gap-3"],["id","google-btn"]],template:function(t,s){t&1&&(a(0,"div",0)(1,"section",1),_(2,"div",2),c(),a(3,"section",3)(4,"div",4)(5,"h3",5),u(6,"Welcome Back"),c(),a(7,"h2",6),u(8," Need an account? "),a(9,"a",7),y("click",function(){return s.navigateRegister()}),a(10,"strong",8),u(11,"Sign up"),c()()(),a(12,"div",9)(13,"h3",10),u(14,"Sign in"),c(),a(15,"form",11),y("ngSubmit",function(l){return s.login(l)}),a(16,"mat-form-field",12)(17,"mat-label"),u(18),c(),_(19,"input",13),T(20,De,2,0,"mat-error")(21,Me,4,0,"mat-error"),c(),a(22,"mat-form-field",14)(23,"mat-label"),u(24),c(),_(25,"input",15),T(26,Ce,2,0,"mat-error")(27,xe,4,0,"mat-error"),c(),a(28,"div",16)(29,"mat-checkbox",17),u(30,"Remember me"),c(),a(31,"a",18),u(32," Forgot Password? "),c()(),a(33,"button",19),u(34," Login "),c(),a(35,"h2",20),u(36,"OR"),c(),a(37,"div",21),_(38,"div",22),c()()()()()()),t&2&&(d(15),g("formGroup",s.form),d(3),S(s.labelUserName),d(),g("errorStateMatcher",s.matcher),d(),f(s.email!=null&&s.email.hasError("email")&&!(s.email!=null&&s.email.hasError("required"))?20:-1),d(),f(s.email!=null&&s.email.hasError("required")?21:-1),d(3),S(s.labelPassword),d(),g("errorStateMatcher",s.matcher),d(),f(s.password!=null&&s.password.hasError("password")&&!(s.password!=null&&s.password.hasError("required"))?26:-1),d(),f(s.password!=null&&s.password.hasError("required")?27:-1),d(4),g("routerLink",H(10,Pe)))},dependencies:[ue,ae,ne,se,oe,de,le,ce,me,ve,we,_e,ge,fe,ie,te,Oe,W,O,Ie,Q,X,pe,he,Te],styles:['.content[_ngcontent-%COMP%]{background-color:#fff}.left-img[_ngcontent-%COMP%]{background-image:url("./media/bg-01-724LABUB.png");height:100%;width:100%;background-repeat:no-repeat;background-position:center center;background-size:cover;display:flex;align-items:center;justify-content:center;padding:30px 15px;position:relative;z-index:1}.social-login-title[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;text-align:center;position:relative;font-size:1.5em;margin:0}.social-login-title[_ngcontent-%COMP%]:before, .social-login-title[_ngcontent-%COMP%]:after{content:"";flex-grow:1;height:1px;background:linear-gradient(to right,#bbb8b8,#f3f3f3);margin:0 10px}.social-login-title[_ngcontent-%COMP%]:after{background:linear-gradient(to left,#bbb8b8,#f3f3f3)}.sign-up[_ngcontent-%COMP%]{color:#97a2b4}.login-button[_ngcontent-%COMP%]{transition:all .3s ease-in-out}.login-button[_ngcontent-%COMP%]:hover{transform:scale(1.05)}']});let r=m;return r})();export{vt as a};
