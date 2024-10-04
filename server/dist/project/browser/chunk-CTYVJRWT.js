import{a as xe}from"./chunk-CWEPZK4S.js";import"./chunk-EUJNIQZJ.js";import{a as ge}from"./chunk-AU4ZVG6D.js";import{a as fe}from"./chunk-AJNYBHYU.js";import{b as pe}from"./chunk-XWWO6FD4.js";import"./chunk-VMWLO5GT.js";import"./chunk-25GXYLEO.js";import"./chunk-3DWRYTCO.js";import"./chunk-II25SR44.js";import{a as ve}from"./chunk-7HKMKCBO.js";import{b as Y,c as $}from"./chunk-K3CEKAPB.js";import"./chunk-HQJZKG3L.js";import"./chunk-JTEL34EY.js";import{d as ne,e as b,h as Z,i as ae,n as U}from"./chunk-RTZIDAJU.js";import"./chunk-L5IHBF74.js";import{a as he}from"./chunk-YLBNOGFN.js";import"./chunk-GFHBUUTT.js";import{b as de,m as ce}from"./chunk-AO66UQSR.js";import{a as ue}from"./chunk-7UJPHKAS.js";import{Sa as T,Ua as p,Wa as q,Xa as L,Ya as me,_ as y,_a as se,ab as D,cb as O,db as le,fb as j,jb as B,kb as G,ma as k,mb as A,nb as V,qa as R,rb as z,sb as W,vb as H,wb as X}from"./chunk-Q6FRQWYL.js";import{Ba as _,Cb as h,Hb as l,Mb as K,O as te,Rb as r,Sb as o,Tb as u,Z as re,_b as I,ac as P,ea as C,fb as a,id as oe,ja as f,kc as n,lc as Q,mc as ie,na as x,oa as N,pd as w,q as ee,sc as S,wb as F}from"./chunk-OZGOJA6I.js";import{g as v,h as M,i as E}from"./chunk-PXA7OGPQ.js";var Se=(()=>{var e,d,m;let s=class s{constructor(){M(this,e);M(this,d);M(this,m);E(this,e,f(Y)),E(this,d,f(ae)),this.matcher=new y,E(this,m,f(ne)),this.showOtpComponent=!0,this.config={allowNumbersOnly:!1,length:4,isPasswordInput:!1,disableAutoFocus:!1,inputStyles:{width:"50px",height:"50px"}}}ngOnInit(){this.form=new me({verify_code:new se("",[p.required,p.minLength(4)])}),v(this,e).storeEmail$.subscribe(c=>{this.userData=c})}onOtpChange(c){this.otp=c,this.otp.length===this.config.length&&this.onSubmit()}onSubmit(){let c={email:this.userData,verify_code:this.otp};ee(c).pipe(te(500),re(g=>v(this,e).confirmEmail(g))).subscribe(g=>{g&&(v(this,d).success("Login is successful!"),v(this,m).navigate(["aliakbar/settings"]))})}getOtp(){v(this,e).getOTP(this.userData).subscribe(c=>{})}get verify_code(){return this.form.get("verify_code")}};e=new WeakMap,d=new WeakMap,m=new WeakMap,s.\u0275fac=function(g){return new(g||s)},s.\u0275cmp=x({type:s,selectors:[["app-confirm-email"]],standalone:!0,features:[S],decls:12,vars:0,consts:[[1,"flex","content","h-svh"],[1,"w-1/2"],[1,"left-img"],[1,"w-1/2","text-center"],[1,"w-2/3","m-auto","desktop:mt-20","flex","items-center","justify-center"],[1,"py-12","px-4","sm:px-6","lg:px-8","max-w-md","shadow-lg","bg-white","rounded-lg"],[1,"mt-6","text-center","text-3xl","font-extrabold","text-gray-900"],[1,"mt-2","text-center","text-sm","text-gray-600"],["routerLink","/auth/register",1,"font-medium","text-indigo-600","hover:text-indigo-500"]],template:function(g,Be){g&1&&(r(0,"div",0)(1,"section",1),u(2,"div",2),o(),r(3,"section",3)(4,"div",4)(5,"div",5)(6,"div")(7,"h2",6),n(8," Please check your email and enter your verification code! "),o(),r(9,"p",7)(10,"a",8),n(11," Sign up "),o()()()()()()())},dependencies:[ge,b,w],styles:['.content[_ngcontent-%COMP%]{background-color:#fff}.left-img[_ngcontent-%COMP%]{background-image:url("./media/bg-03-WXASOHB4.png");height:100%;width:100%;background-repeat:no-repeat;background-position:center center;background-size:cover;display:flex;align-items:center;justify-content:center;padding:30px 15px;position:relative;z-index:1}'],changeDetection:0});let t=s;return t})();function _e(t,e){t&1&&(r(0,"mat-error"),n(1,"Please enter a valid userName"),o())}function Fe(t,e){t&1&&(r(0,"mat-error"),n(1,"userName is "),r(2,"strong"),n(3,"required"),o()())}function Ie(t,e){if(t&1&&(r(0,"mat-error"),n(1,"userName is too short "),r(2,"strong"),n(3),o()()),t&2){let d,m=P();a(3),Q((d=m.form.controls.userName.getError("minlength"))==null?null:d.requiredLength)}}function Pe(t,e){if(t&1&&(r(0,"mat-error"),n(1,"The value "),r(2,"strong"),n(3),o(),n(4,"is banned"),o()),t&2){let d=P();a(3),ie("",d.userName==null?null:d.userName.getError("banWords").bannedWord," ")}}function ke(t,e){t&1&&(r(0,"mat-error"),n(1,"Please enter a valid email address"),o())}function Re(t,e){t&1&&(r(0,"mat-error"),n(1,"email is "),r(2,"strong"),n(3,"required"),o()())}function Te(t,e){t&1&&(r(0,"mat-error"),n(1,"password is "),r(2,"strong"),n(3,"required"),o()())}function qe(t,e){if(t&1&&(r(0,"mat-error"),n(1,"password is too short "),r(2,"strong"),n(3),o()()),t&2){let d,m=P();a(3),Q((d=m.form.controls.password.controls.password.getError("minlength"))==null?null:d.requiredLength)}}function Le(t,e){t&1&&(r(0,"mat-error"),n(1,"Password doesn't match"),o())}var we=(()=>{let e=class e extends ${constructor(){super(...arguments),this.uniqueNickname=f(ve),this.title="Angular",this.labelUserName="UserName",this.labelPassword="password",this.matcher=new y,this.form=this.fb.group({userName:["Aliakbar",[p.required,p.minLength(2),ue(["test"])]],email:["a@gmail.com",[p.required,p.email]],password:this.fb.group({password:["",[p.required,p.minLength(3)]],confirmPassword:""},{validators:he})})}onSubmit(){let m={userName:this.form.value.userName,email:this.form.value.email,password:this.form.controls.password.value.password,confirmPassword:this.form.controls.password.value.confirmPassword};this.authService.signUp(m).subscribe(s=>{this.userService.userEmail.next(s.newUser?.email),this.router.navigate(["auth/confirm-email"])})}trackByFn(){}get userName(){return this.form.get("userName")}get email(){return this.form.get("email")}get confirmPassword(){return this.form.get("confirmPassword")}};e.\u0275fac=(()=>{let m;return function(i){return(m||(m=_(e)))(i||e)}})(),e.\u0275cmp=x({type:e,selectors:[["app-register"]],standalone:!0,features:[F,S],decls:46,vars:15,consts:[[1,"flex","content","h-full"],[1,"w-1/2"],[1,"left-img"],[1,"w-1/2","text-center","h-screen"],[1,"w-2/3","m-auto","desktop:mt-20"],[1,"text-left","font-extrabold"],[1,"cursor-pointer","flex","justify-start","text-xs","sign-up"],[1,"grid","md:grid-cols-2",3,"ngSubmit","formGroup"],["data-testing","userName","appearance","outline",1,"w-full"],["type","text","matInput","","formControlName","userName","placeholder","userName",3,"errorStateMatcher"],[4,"ngIf"],["data-testing","email","appearance","outline",1,"w-full"],["type","email","matInput","","formControlName","email","placeholder","email",1,"w-full",3,"errorStateMatcher"],["formGroupName","password"],["data-testing","password","appearance","outline",1,"w-full"],["type","password","matInput","","formControlName","password","placeholder","password",3,"errorStateMatcher"],["data-testing","confirmPassword","appearance","outline",1,"w-full"],["type","password","matInput","","formControlName","confirmPassword","placeholder","confirmPassword",3,"errorStateMatcher"],["routerLink","/login",1,"ml-2"],[1,"text-blue"],["data-testid","login-button","mat-raised-button","","color","primary","type","submit",1,"rounded-full","w-full","mt-2",3,"disabled"]],template:function(s,i){s&1&&(r(0,"div",0)(1,"section",1),u(2,"div",2),o(),r(3,"section",3)(4,"div",4)(5,"h3",5),n(6,"Sign Up"),o(),r(7,"h2",6),n(8," Enter details to create your account "),o(),r(9,"div")(10,"form",7),I("ngSubmit",function(){return i.onSubmit()}),r(11,"div")(12,"mat-form-field",8)(13,"mat-label"),n(14,"userName"),o(),u(15,"input",9),h(16,_e,2,0,"mat-error",10)(17,Fe,4,0,"mat-error",10)(18,Ie,4,1,"mat-error",10)(19,Pe,5,1,"mat-error",10),o()(),r(20,"div")(21,"mat-form-field",11)(22,"mat-label"),n(23,"Email"),o(),u(24,"input",12),h(25,ke,2,0,"mat-error",10)(26,Re,4,0,"mat-error",10),o()(),r(27,"div",13)(28,"mat-form-field",14)(29,"mat-label"),n(30,"Password"),o(),u(31,"input",15),h(32,Te,4,0,"mat-error",10)(33,qe,4,1,"mat-error",10),o(),r(34,"mat-form-field",16)(35,"mat-label"),n(36,"Confirm Password"),o(),u(37,"input",17),h(38,Le,2,0,"mat-error",10),o()(),r(39,"h2",6),n(40," Already Registered? "),r(41,"a",18)(42,"strong",19),n(43,"Login"),o()()(),r(44,"button",20),n(45," Sign up "),o()()()()()()),s&2&&(a(10),l("formGroup",i.form),a(5),l("errorStateMatcher",i.matcher),a(),l("ngIf",(i.userName==null?null:i.userName.hasError("userName"))&&!(i.userName!=null&&i.userName.hasError("required"))),a(),l("ngIf",i.userName==null?null:i.userName.hasError("required")),a(),l("ngIf",i.form.controls.userName.hasError("minlength")),a(),l("ngIf",i.userName==null?null:i.userName.hasError("banWords")),a(5),l("errorStateMatcher",i.matcher),a(),l("ngIf",(i.email==null?null:i.email.hasError("email"))&&!(i.email!=null&&i.email.hasError("required"))),a(),l("ngIf",i.email==null?null:i.email.hasError("required")),a(5),l("errorStateMatcher",i.matcher),a(),l("ngIf",i.form.controls.password.controls.password.hasError("required")),a(),l("ngIf",i.form.controls.password.controls.password.hasError("minlength")),a(4),l("errorStateMatcher",i.matcher),a(),l("ngIf",!(i.confirmPassword!=null&&i.confirmPassword.hasError("passwordShouldMatch"))),a(6),l("disabled",!i.form.valid))},dependencies:[B,D,T,q,L,G,O,j,le,U,X,H,z,A,V,R,k,W,b,w,oe,ce],styles:['.content[_ngcontent-%COMP%]{background-color:#fff}.left-img[_ngcontent-%COMP%]{background-image:url("./media/bg-03-WXASOHB4.png");height:100%;width:100%;background-repeat:no-repeat;background-position:center center;background-size:cover;display:flex;align-items:center;justify-content:center;padding:30px 15px;position:relative;z-index:1}']});let t=e;return t})();function De(t,e){t&1&&(r(0,"mat-error"),n(1,"Please enter a valid email address"),o())}function Oe(t,e){t&1&&(r(0,"mat-error"),n(1,"email is "),r(2,"strong"),n(3,"required"),o()())}var be=(()=>{let e=class e extends ${constructor(){super(...arguments),this.matcher=new y,this.servce=f(Y),this.form=this.fb.group({email:["",[p.required,p.email]]})}ngOnInit(){}resetPassword(){this.servce.forgetPassword(this.form.value.email).subscribe(m=>{})}get email(){return this.form.get("email")}};e.\u0275fac=(()=>{let m;return function(i){return(m||(m=_(e)))(i||e)}})(),e.\u0275cmp=x({type:e,selectors:[["app-forgot-password"]],standalone:!0,features:[F,S],decls:25,vars:5,consts:[[1,"flex","content","h-full"],[1,"w-1/2"],[1,"left-img"],[1,"w-1/2","text-center","h-screen","flex","justify-center","items-center"],[1,"w-2/3"],[1,"text-left","font-extrabold"],[1,"flex","justify-start","text-xs","sign-up"],[1,"font-extrabold","text-base","p-3","text-gray"],[3,"ngSubmit","formGroup"],["data-testing","email","appearance","outline",1,"w-full"],["type","text","matInput","","formControlName","email","placeholder","Email",3,"errorStateMatcher"],["mat-flat-button","","data-testid","login-button","color","primary","type","submit",1,"login-button","ease-in-out","duration-300","w-full","desktop:m-0","tablet:mt-2","mobile:mt-2",3,"disabled"],[1,"mt-3"],["routerLink","/login"],[1,"text-blue"]],template:function(s,i){s&1&&(r(0,"div",0)(1,"section",1),u(2,"div",2),o(),r(3,"section",3)(4,"div",4)(5,"h3",5),n(6,"Reset Password"),o(),r(7,"h2",6),n(8," Let Us Help You "),o(),r(9,"div")(10,"p",7),n(11," Enter your registered email address. "),o(),r(12,"form",8),I("ngSubmit",function(){return i.resetPassword()}),r(13,"mat-form-field",9)(14,"mat-label"),n(15,"Email"),o(),u(16,"input",10),h(17,De,2,0,"mat-error")(18,Oe,4,0,"mat-error"),o(),r(19,"button",11),n(20," Reset My Password "),o(),r(21,"div",12)(22,"a",13)(23,"strong",14),n(24,"Login"),o()()()()()()()()),s&2&&(a(12),l("formGroup",i.form),a(4),l("errorStateMatcher",i.matcher),a(),K(i.email!=null&&i.email.hasError("email")&&!(i.email!=null&&i.email.hasError("required"))?17:-1),a(),K(i.email!=null&&i.email.hasError("required")?18:-1),a(),l("disabled",!i.form.valid))},dependencies:[B,D,T,q,L,G,O,j,U,X,H,z,A,V,R,k,W,b,w,de],styles:['.content[_ngcontent-%COMP%]{background-color:#fff}.left-img[_ngcontent-%COMP%]{background-image:url("./media/bg-01-724LABUB.png");height:100%;width:100%;background-repeat:no-repeat;background-position:center center;background-size:cover;display:flex;align-items:center;justify-content:center;padding:30px 15px;position:relative;z-index:1}']});let t=e;return t})();var je=[{path:"",component:pe},{path:"register",component:we},{path:"confirm-email",component:Se},{path:"forgot-password",component:be}],ye=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=N({type:e}),e.\u0275inj=C({imports:[Z.forChild(je),Z]});let t=e;return t})();var Gt=(()=>{let e=class e{};e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=N({type:e}),e.\u0275inj=C({imports:[ye,xe,fe]});let t=e;return t})();export{Gt as CoreModule};
