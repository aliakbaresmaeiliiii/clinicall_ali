import{a as Vt}from"./chunk-3DWRYTCO.js";import{b as yt,c as Dt,d as Mt,e as kt}from"./chunk-II25SR44.js";import{a as Nt,b as $t,c as Bt,d as jt,e as Ht}from"./chunk-KET4RZDJ.js";import{a as vt}from"./chunk-L5IHBF74.js";import{a as At,c as Lt}from"./chunk-GFHBUUTT.js";import{a as V,b as Ct,c as St,d as wt,e as Ft,f as Ot,h as Et,i as Pt,k as It,l as Tt}from"./chunk-AO66UQSR.js";import{a as bt}from"./chunk-7UJPHKAS.js";import{Sa as ct,Ua as W,Wa as pt,Xa as mt,Z as rt,ab as ut,c as ot,cb as gt,fb as ft,ha as lt,ib as ht,ma as I,mb as T,na as dt,ob as A,pa as st,rb as L,sb as _t,vb as N,wb as xt}from"./chunk-Q6FRQWYL.js";import{Aa as j,Cb as h,Hb as c,Ib as H,Mb as S,Nb as G,Pb as R,Qb as z,Rb as r,Sb as l,Tb as m,Xb as b,_b as g,ac as p,da as K,db as U,fb as d,gb as f,gd as nt,hd as E,id as it,ja as Q,jc as tt,jd as P,kc as s,lc as M,mc as y,na as _,nd as at,rc as et,sc as w,vc as k,wc as J,xa as C,xc as F,ya as x,za as B,zc as O}from"./chunk-OZGOJA6I.js";import{a as q,g as D,h as X,i as Y}from"./chunk-PXA7OGPQ.js";var Gt=(()=>{let n=class n{constructor(t){this.dataList=[],this.date=t,this.isPastDate=t.setHours(0,0,0,0)<new Date().setHours(0,0,0,0),this.isToday=t.setHours(0,0,0,0)==new Date().setHours(0,0,0,0)}getDateString(){return this.date.toISOString().split("T")[0]}};n.\u0275fac=function(i){return new(i||n)(f(Date))},n.\u0275cmp=_({type:n,selectors:[["calendar-day"]],standalone:!0,features:[et([]),w],decls:0,vars:0,template:function(i,a){},encapsulation:2});let e=n;return e})();var Rt=(()=>{let n=class n{};n.\u0275fac=function(i){return new(i||n)},n.\u0275cmp=_({type:n,selectors:[["app-time-picker"]],standalone:!0,features:[w],decls:10,vars:2,consts:[["picker",""],["appearance","fill"],["matInput","",3,"matDatepicker"],["matInput","","type","time","id","appt","name","appt",1,"time-picker"],["matSuffix","",3,"for"],["matDatepickerToggleIcon",""]],template:function(i,a){if(i&1&&(r(0,"mat-form-field",1)(1,"mat-label"),s(2,"Date time"),l(),m(3,"input",2)(4,"input",3),r(5,"mat-datepicker-toggle",4)(6,"mat-icon",5),s(7,"today"),l()(),m(8,"mat-datepicker",null,0),l()),i&2){let u=tt(9);d(3),c("matDatepicker",u),d(2),c("for",u)}},dependencies:[_t,L,T,A,Ct,V,Ht,Nt,$t,jt,Bt,rt,xt,N],styles:[".time-picker[_ngcontent-%COMP%]{position:relative}.time-picker[_ngcontent-%COMP%]::-webkit-calendar-picker-indicator{background:url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20enable-background%3D%22new%200%200%2024%2024%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224px%22%20fill%3D%22%23000000%22%3E%3Cg%3E%3Crect%20fill%3D%22none%22%20height%3D%2224%22%20width%3D%2224%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath%20d%3D%22M12%2C2C6.5%2C2%2C2%2C6.5%2C2%2C12s4.5%2C10%2C10%2C10s10-4.5%2C10-10S17.5%2C2%2C12%2C2z%20M16.2%2C16.2L11%2C13V7h1.5v5.2l4.5%2C2.7L16.2%2C16.2z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}[_nghost-%COMP%]     .mat-form-field-infix{display:flex}.mat-form-field[_ngcontent-%COMP%]{width:100%}"]});let e=n;return e})();var zt=e=>({"background-color":e});function te(e,n){if(e&1){let o=b();r(0,"button",19),g("click",function(){C(o);let i=p();return x(i.value="")}),r(1,"mat-icon"),s(2,"close"),l()()}}function ee(e,n){if(e&1&&(r(0,"mat-option",20),m(1,"div",11),l()),e&2){let o=n.$implicit;c("value",o),d(),c("ngStyle",k(2,zt,o))}}var Jt=(()=>{let n=class n{constructor(t,i,a){this.fb=t,this.dialogRef=i,this.data=a,this.title="Create Appointment",this.value="Clear me",this.colors=["#FF0000","#00FF00","#0000FF"],this.date=a.data.date,setTimeout(()=>{this.title="testing change detection"},2e3)}ngOnInit(){this.createForm(),this.data.data&&this.updateForm(),this.form.get("color")?.valueChanges.subscribe(t=>{this.selectedColor=t})}createForm(){this.form=this.fb.group({event_title:["",[W.required,W.minLength(3),bt(["test","dummy"])]],event_description:[""],color:["#FF0000"]})}onColorChange(t){this.selectedColor=t.value}submit(){this.dialogRef.close(this.form.value)}updateForm(){this.form.patchValue({event_title:this.data.data.dataList[0]?.event_title,event_description:this.data.data.dataList[0]?.event_description,color:this.data.data.dataList[0]?.color}),this.selectedColor=this.form.get("color")?.value}};n.\u0275fac=function(i){return new(i||n)(f(ht),f(St),f(wt))},n.\u0275cmp=_({type:n,selectors:[["app-dialog-calendar"]],decls:37,vars:13,consts:[[3,"ngSubmit","formGroup"],[1,"mat-typography"],[1,"section"],["appearance","outline"],["matInput","","type","text","formControlName","event_title"],["matSuffix","","mat-icon-button","","aria-label","Clear"],[1,"container"],[1,"date"],[1,"material-symbols-outlined","ml-3"],[1,"show-date"],["formControlName","color",3,"selectionChange"],[1,"color-span",3,"ngStyle"],[3,"value",4,"ngFor","ngForOf"],["appearance","outline",1,"example-full-width"],["matInput","","placeholder","Ex. It makes me feel...","formControlName","event_description"],["mat-icon-button","","color","primary","type","button","aria-label","Example icon button with a home icon"],["align","end"],["mat-button","","mat-dialog-close","","type","button"],["mat-button","","type","submit",3,"mat-dialog-close","disabled"],["matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"],[3,"value"]],template:function(i,a){i&1&&(r(0,"mat-toolbar")(1,"span"),s(2),l()(),r(3,"form",0),g("ngSubmit",function(){return a.submit()}),r(4,"mat-dialog-content",1)(5,"div",2)(6,"mat-form-field",3)(7,"mat-label"),s(8,"Add title"),l(),m(9,"input",4),h(10,te,3,0,"button",5),l(),r(11,"div",6)(12,"div",7)(13,"span",8),s(14," schedule "),l(),r(15,"strong"),s(16),F(17,"date"),l()(),r(18,"div",9)(19,"mat-form-field",3)(20,"mat-select",10),g("selectionChange",function(v){return a.onColorChange(v)}),r(21,"mat-select-trigger"),m(22,"span",11),l(),h(23,ee,2,4,"mat-option",12),l()()()(),m(24,"app-time-picker"),r(25,"mat-form-field",13)(26,"mat-label"),s(27,"Leave a comment"),l(),m(28,"textarea",14),l()(),r(29,"button",15)(30,"mat-icon"),s(31,"add"),l()()(),r(32,"mat-dialog-actions",16)(33,"button",17),s(34,"Cancel"),l(),r(35,"button",18),s(36," Save "),l()()()),i&2&&(d(2),M(a.title),d(),c("formGroup",a.form),d(7),S(a.value?10:-1),d(6),y(" ",O(17,8,a.date,"short")," "),d(6),c("ngStyle",k(11,zt,a.selectedColor)),d(),c("ngForOf",a.colors),d(12),c("mat-dialog-close",!0)("disabled",!a.form.valid))},dependencies:[lt,N,L,T,A,I,st,V,Ot,Pt,Et,At,It,Tt,ut,ct,pt,mt,gt,ft,E,P,Rt,at],styles:[".date[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:1rem}.section[_ngcontent-%COMP%]{border:1px solid gray;border-radius:5px;padding:1rem}.color-circle[_ngcontent-%COMP%]{display:inline-block;width:24px;height:24px;border-radius:50%;margin-right:8px;vertical-align:middle}  .mdc-text-field--outlined{--mdc-outlined-text-field-container-shape: 28px}.container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 6rem;gap:44px}.show-date[_ngcontent-%COMP%]{display:flex;flex-direction:column}.selected-color-display[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;color:#fff;border-radius:50px;padding:5px;height:43px;border:1px solid gray}.color-span[_ngcontent-%COMP%]{display:inline-block;width:20px;height:20px;border:1px solid gray;margin-right:5px;vertical-align:middle;border-radius:13px}"]});let e=n;return e})();var Wt=(()=>{var n;let o=class o{constructor(){X(this,n);Y(this,n,Q(ot)),this.config=vt.apiEndPoint}createAppointment(i){return D(this,n).post(`${this.config}/insertAppointment`,i)}getAppointmentData(){return D(this,n).get(`${this.config}/getAppointment`)}deleteAppointment(i){return D(this,n).delete(`${this.config}/deleteAppointment/delete/${i}`)}updateAppointment(i){return D(this,n).put(`${this.config}/updateAppointment/update`,i)}};n=new WeakMap,o.\u0275fac=function(a){return new(a||o)},o.\u0275prov=K({token:o,factory:o.\u0275fac,providedIn:"root"});let e=o;return e})();var ie=(e,n)=>({"past-date":e,today:n}),ae=e=>({"blue-date":e}),oe=(e,n)=>({top:e,left:n});function re(e,n){if(e&1&&(r(0,"th"),s(1),l()),e&2){let o=n.$implicit;d(),M(o)}}function le(e,n){e&1&&(r(0,"li"),s(1,"There are no items."),l())}function de(e,n){if(e&1&&(r(0,"strong"),s(1),l()),e&2){let o=p().$implicit,t=p(2);d(),y(" ",t.monthNames[o.date.getMonth()]," ")}}function se(e,n){if(e&1&&(r(0,"p",21)(1,"strong"),s(2),l()()),e&2){let o=n.$implicit;d(2),M(o.event_title)}}function ce(e,n){if(e&1&&(m(0,"p",19),h(1,se,3,1,"p",20)),e&2){let o=n.$implicit,t=p(2).$implicit;H("background-color",o.color),d(),c("ngForOf",t.dataList)}}function pe(e,n){e&1&&(r(0,"li"),s(1,"There are no items."),l())}function me(e,n){if(e&1){let o=b();r(0,"div",18),g("contextmenu",function(i){C(o);let a=p().$implicit,u=p(2);return x(u.onRightClick(i,a))}),R(1,ce,2,3,null,null,G,!1,pe,2,0,"li"),l()}if(e&2){let o=p().$implicit;d(),z(o.dataList)}}function ue(e,n){if(e&1){let o=b();r(0,"td",14),g("click",function(){let i=C(o).$implicit,a=p(2);return x(a.getValueOfMonth(i))}),r(1,"div",15),g("cdkDropListDropped",function(i){C(o);let a=p(2);return x(a.drop(i))})("cdkDragEnded",function(i){C(o);let a=p(2);return x(a.dragEnded(i))}),r(2,"strong"),s(3),l(),h(4,de,2,1,"strong",16)(5,me,4,1,"div",17),l()()}if(e&2){let o=n.$implicit,t=n.index,i=p().index,a=p();c("ngClass",J(6,ie,o.isPastDate,o.isToday)),d(),c("ngClass",k(9,ae,o.isToday))("cdkDropListData",a.calendar),d(2),y("",o.date.getDate()," "),d(),c("ngIf",o.isToday||i==0&&t==0||o.date.getDate()==1),d(),c("ngIf",o.dataList)}}function ge(e,n){if(e&1&&(r(0,"tr"),h(1,ue,6,11,"td",13),l()),e&2){let o=n.$implicit;d(),c("ngForOf",o)}}function fe(e,n){if(e&1){let o=b();r(0,"div",12)(1,"div",22)(2,"button",23),g("click",function(){C(o);let i=p();return x(i.deleteAppointment())}),r(3,"span",24),s(4," delete "),l(),r(5,"span"),s(6," Delete "),l()()(),m(7,"hr"),r(8,"div"),m(9,"p",19),l()()}if(e&2){let o=p();c("ngStyle",J(3,oe,o.contextMenuPosition.y,o.contextMenuPosition.x)),d(9),H("background-color",o.dataContexMenu.dataList[0].color)}}var Ge=(()=>{let n=class n{constructor(t,i){this.matDialog=t,this.calendarService=i,this.calendar=[],this.contextMenuVisible=!1,this.contextMenuPosition={x:"0px",y:"0px"},this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],this.weekDayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],this.monthIndex=0,this.apiData=[]}ngOnInit(){this.generateCalendarDays(this.monthIndex),this.loadApiData()}generateCalendarDays(t){this.calendar=[],this.day=new Date(new Date().setMonth(new Date().getMonth()+t)),this.displayMonth=this.monthNames[this.day.getMonth()];let i=this.getStartDateForCalendar(this.day);this.dateToAdd=i;for(var a=0;a<42;a++)this.calendar.push(new Gt(new Date(this.dateToAdd))),this.dateToAdd=new Date(this.dateToAdd.setDate(this.dateToAdd.getDate()+1))}getStartDateForCalendar(t){let a=new Date(t.setDate(0));if(a.getDay()!=1)do a=new Date(a.setDate(a.getDate()-1));while(a.getDay()!=1);return a}increaseMonth(){this.monthIndex++,this.generateCalendarDays(this.monthIndex),this.loadApiData()}decreaseMonth(){this.monthIndex--,this.generateCalendarDays(this.monthIndex),this.loadApiData()}setCurrentMonth(){this.monthIndex=0,this.generateCalendarDays(this.monthIndex),this.loadApiData()}loadApiData(){this.calendarService.getAppointmentData().subscribe(t=>{this.apiData=t.data,this.mergeData()})}mergeData(){this.calendar.forEach(t=>{let i=this.apiData.find(a=>a.date&&new Date(a.date).toDateString()===t.date.toDateString());i?t.dataList.push(i):t.dataList=[]})}getValueOfMonth(t){this.isSelected!==!1&&this.matDialog.open(Jt,{width:"500px",data:{data:t}}).afterClosed().subscribe(a=>{if(a){t.dataList.push(a);let u=t.date,v=q({date:u},a);this.sendEventData(v)}})}dragStarted(){this.isSelected=!0}dragEnded(t){this.isSelected=!1}drop(t){yt(t.previousContainer.data,t.container.data,t.previousIndex,t.currentIndex);let i=t.container.data[0];this.calendar.forEach(u=>{let v=t.container.data.find(Z=>Z.date&&new Date(Z.date).toDateString()===u.date.toDateString())});let a={};this.updateAppointment(i)}sendEventData(t){let i={event_title:t.event_title,event_description:t.event_description,color:t.color,date:t.date};this.calendarService.createAppointment(i).subscribe(a=>{this.ngOnInit()})}onRightClick(t,i){t.preventDefault(),this.dataContexMenu=i,this.contextMenuPosition={x:`${t.clientX}px`,y:`${t.clientY}px`},this.contextMenuVisible=!0}onMenuItemClick(t){this.contextMenuVisible=!1}onClickOutside(t){this.contextMenuVisible&&(this.contextMenuVisible=!1)}deleteAppointment(){let t=this.dataContexMenu.dataList[0].event_id;this.calendarService.deleteAppointment(t).subscribe(i=>{i&&this.ngOnInit()})}updateAppointment(t){}};n.\u0275fac=function(i){return new(i||n)(f(Ft),f(Wt))},n.\u0275cmp=_({type:n,selectors:[["app-calendar"]],hostBindings:function(i,a){i&1&&g("click",function(v){return a.onClickOutside(v)},!1,U)},decls:23,vars:7,consts:[[1,"btn_calendar"],["mat-flat-button","","color","primary",1,"btn-today",3,"click"],[1,"displayMonth"],[1,"example-button-container"],["mat-mini-fab","","color","primary","aria-label","",3,"click"],["matTooltip","last month","xmlns","http://www.w3.org/2000/svg","height","20px","viewBox","0 -960 960 960","width","20px","fill","#75FBFD"],["d","m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"],["xmlns","http://www.w3.org/2000/svg","height","20px","viewBox","0 -960 960 960","width","20px","fill","#75FBFD"],["d","M630-444H192v-72h438L429-717l51-51 288 288-288 288-51-51 201-201Z"],["cdkDropListGroup",""],[1,"calendar-table"],[4,"ngFor","ngForOf"],[1,"context-menu",3,"ngStyle"],["class","calendar-day",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"calendar-day",3,"click","ngClass"],["cdkDropList","",1,"calendar-day-header",3,"cdkDropListDropped","cdkDragEnded","ngClass","cdkDropListData"],[4,"ngIf"],["cdkDrag","","class","body-event",3,"contextmenu",4,"ngIf"],["cdkDrag","",1,"body-event",3,"contextmenu"],[1,"priority"],["class","event_title",4,"ngFor","ngForOf"],[1,"event_title"],[1,"btn_delete"],["mat-button","","color","primary","type","button",1,"flat",3,"click"],[1,"material-symbols-outlined"]],template:function(i,a){i&1&&(r(0,"div",0)(1,"button",1),g("click",function(){return a.setCurrentMonth()}),s(2," Today "),l(),r(3,"strong",2),s(4),l(),r(5,"div",3)(6,"button",4),g("click",function(){return a.decreaseMonth()}),B(),r(7,"svg",5),m(8,"path",6),l()(),j(),r(9,"button",4),g("click",function(){return a.increaseMonth()}),B(),r(10,"svg",7),m(11,"path",8),l()()()(),j(),r(12,"div",9)(13,"table",10)(14,"thead")(15,"tr"),R(16,re,2,1,"th",null,G,!1,le,2,0,"li"),l()(),r(19,"tbody"),h(20,ge,2,1,"tr",11),F(21,"chunk"),l()()(),h(22,fe,10,6,"div",12)),i&2&&(d(4),y(" ",a.displayMonth," "),d(12),z(a.weekDayNames),d(4),c("ngForOf",O(21,4,a.calendar,7)),d(2),S(a.contextMenuVisible?22:-1))},dependencies:[I,dt,Mt,kt,Dt,Lt,nt,E,it,P,Vt],styles:[".btn_calendar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;gap:2rem}.btn-today[_ngcontent-%COMP%]{border-radius:25px}.calendar-table[_ngcontent-%COMP%]{border-collapse:collapse;width:100%;max-width:100%;margin-bottom:1rem;border:1px solid #dee2e6;background-color:#fff}.calendar-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{vertical-align:bottom;border-bottom:2px solid #dee2e6;width:14.2%}.calendar-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .calendar-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{border:1px solid #dee2e6}.calendar-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .calendar-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}.calendar-day[_ngcontent-%COMP%]{height:12vh;max-height:12vh;cursor:pointer}.calendar-items-wrapper[_ngcontent-%COMP%]{margin-left:-10px;margin-right:-10px;overflow-y:auto;max-height:calc(100% - 20px)}.calendar-day.past-date[_ngcontent-%COMP%], .calendar-day[_ngcontent-%COMP%]:hover{background-color:#f8f8f8}.blue-date[_ngcontent-%COMP%]{color:#106ebe}.content-schedule[_ngcontent-%COMP%]{border:1px solid gray;border-radius:5px;background-color:#f8f8f8;padding:6px}p[_ngcontent-%COMP%]{margin:0;color:gray}.priority[_ngcontent-%COMP%]{width:20px;height:20px;border-radius:50%}.event_title[_ngcontent-%COMP%]{max-width:113px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px}.event_title[_ngcontent-%COMP%]:hover{color:#fff}.body-event[_ngcontent-%COMP%]{margin-top:1rem;display:flex;gap:11px}.body-event[_ngcontent-%COMP%]:hover{background-color:#d3d3d3;border:1px solid lightgray;transition:.2s;padding:5px;border-radius:5px}.context-menu[_ngcontent-%COMP%]{position:absolute;width:10rem;list-style:none;margin:0;padding:0;background:#fff;border:1px solid black;box-shadow:0 2px 10px #0003;z-index:1000;border-radius:5px}.context-menu[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:10px}.btn_delete[_ngcontent-%COMP%]{display:flex;align-items:center}.context-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:8px 12px;cursor:pointer}.context-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#f1f1f1}  .mdc-button__label{display:flex;align-items:center;gap:5px}"]});let e=n;return e})();export{Rt as a,Ge as b};
