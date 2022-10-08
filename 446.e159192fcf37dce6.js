"use strict";(self.webpackChunkproject_shopping=self.webpackChunkproject_shopping||[]).push([[446],{6446:(O,m,s)=>{s.r(m),s.d(m,{RecipesModule:()=>L});var o=s(2382),p=s(8588),h=s(5698),f=s(4004),e=s(1223),T=s(8619);let A=(()=>{class t{constructor(i,n){this.router=i,this.authService=n}canActivate(i,n){return this.authService.user.pipe((0,h.q)(1),(0,f.U)(c=>!!c||this.router.createUrlTree(["/auth"])))}}return t.\u0275fac=function(i){return new(i||t)(e.LFG(p.F0),e.LFG(T.e))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var l=s(7568),R=s(578),u=s(9808);function q(t,r){if(1&t&&(e.TgZ(0,"li",10),e._uU(1),e.qZA()),2&t){const i=r.$implicit;e.xp6(1),e.AsE(" ",i.name," (",i.amount,") ")}}let _=(()=>{class t{constructor(i,n,c){this.recipeService=i,this.route=n,this.router=c}ngOnInit(){this.route.params.subscribe(i=>{this.id=+i.id,this.recipe=this.recipeService.getRecipe(this.id)})}onAddToShopingList(){this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)}onEditRecipe(){this.router.navigate(["edit"],{relativeTo:this.route})}onDeleteRecipe(){this.recipeService.deleteRecipe(this.id),this.router.navigate(["/recipes"])}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(l.j),e.Y36(p.gz),e.Y36(p.F0))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipe-detail"]],decls:30,vars:5,consts:[[1,"row"],[1,"col-xs-12"],[1,"img-responsive",2,"max-height","300px",3,"src","alt"],["appDropdown","",1,"btn-group"],[1,"btn","btn-primary","dropdown-toggle"],[1,"caret"],[1,"dropdown-menu"],[2,"cursor","pointer",3,"click"],[1,"list-group"],["class","list-group-item",4,"ngFor","ngForOf"],[1,"list-group-item"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"img",2),e.qZA(),e.qZA(),e.TgZ(3,"div",0),e.TgZ(4,"div",1),e.TgZ(5,"h1"),e._uU(6),e.qZA(),e.qZA(),e.qZA(),e.TgZ(7,"div",0),e.TgZ(8,"div",1),e.TgZ(9,"div",3),e.TgZ(10,"button",4),e._uU(11," Manage Recipe "),e._UZ(12,"span",5),e.qZA(),e.TgZ(13,"ul",6),e.TgZ(14,"li"),e.TgZ(15,"a",7),e.NdJ("click",function(){return n.onAddToShopingList()}),e._uU(16,"To Shopping List"),e.qZA(),e.qZA(),e.TgZ(17,"li"),e.TgZ(18,"a",7),e.NdJ("click",function(){return n.onEditRecipe()}),e._uU(19,"Edit"),e.qZA(),e.qZA(),e.TgZ(20,"li"),e.TgZ(21,"a",7),e.NdJ("click",function(){return n.onDeleteRecipe()}),e._uU(22,"Delete"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(23,"div",0),e.TgZ(24,"div",1),e._uU(25),e.qZA(),e.qZA(),e.TgZ(26,"div",0),e.TgZ(27,"div",1),e.TgZ(28,"ul",8),e.YNc(29,q,2,2,"li",9),e.qZA(),e.qZA(),e.qZA()),2&i&&(e.xp6(2),e.s9C("alt",n.recipe.name),e.Q6J("src",n.recipe.imagePath,e.LSH),e.xp6(4),e.Oqu(n.recipe.name),e.xp6(19),e.Oqu(n.recipe.description),e.xp6(4),e.Q6J("ngForOf",n.recipe.ingredients))},directives:[R.w,u.sg],styles:[""]}),t})();class C{constructor(r,i,n,c){this.name=r,this.description=i,this.imagePath=n,this.ingredients=c}}function S(t,r){if(1&t){const i=e.EpF();e.TgZ(0,"div",17),e.TgZ(1,"div",18),e._UZ(2,"input",19),e.qZA(),e.TgZ(3,"div",20),e._UZ(4,"input",21),e.qZA(),e.TgZ(5,"div",20),e.TgZ(6,"button",4),e.NdJ("click",function(){const d=e.CHM(i).index;return e.oxw().onDeleteIngredient(d)}),e._uU(7," X "),e.qZA(),e.qZA(),e.qZA()}2&t&&e.Q6J("formGroupName",r.index)}let g=(()=>{class t{constructor(i,n,c){this.route=i,this.router=n,this.recipeService=c,this.isEditMode=!1}ngOnInit(){this.route.params.subscribe(i=>{this.id=+i.id,this.isEditMode=!!i.id,this.initForm()})}onSubmit(){const a=new C(this.recipeForm.value.name,this.recipeForm.value.description,this.recipeForm.value.imagePath,this.recipeForm.value.ingredients);this.isEditMode?this.recipeService.updateRecipe(this.id,a):this.recipeService.addRecipe(a),this.onCancel()}onAddIngredient(){this.recipeForm.get("ingredients").push(new o.cw({name:new o.NI(null,o.kI.required),amount:new o.NI(null,[o.kI.required,o.kI.pattern(/^[1-9]+[0-9]*$/)])}))}get ingredientsControls(){return this.recipeForm.get("ingredients").controls}onCancel(){this.router.navigate(["../"],{relativeTo:this.route})}onDeleteIngredient(i){this.recipeForm.get("ingredients").removeAt(i)}initForm(){let i="",n="",c="",d=new o.Oe([]);if(this.isEditMode){const a=this.recipeService.getRecipe(this.id);if(i=a.name,n=a.imagePath,c=a.description,a.ingredients)for(const v of a.ingredients)d.push(new o.cw({name:new o.NI(v.name,o.kI.required),amount:new o.NI(v.amount,[o.kI.required,o.kI.pattern(/^[1-9]+[0-9]*$/)])}))}this.recipeForm=new o.cw({name:new o.NI(i,o.kI.required),imagePath:new o.NI(n,o.kI.required),description:new o.NI(c,o.kI.required),ingredients:d})}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(p.gz),e.Y36(p.F0),e.Y36(l.j))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipe-edit"]],decls:39,vars:4,consts:[[1,"row"],[1,"col-xs-12"],[3,"formGroup","ngSubmit"],["type","submit",1,"btn","btn-success",3,"disabled"],["type","button",1,"btn","btn-danger",3,"click"],[1,"form-group"],["for","name"],["type","text","name","name","id","name","formControlName","name",1,"form-control"],["for","imagePath"],["type","text","name","imagePath","id","imagePath","formControlName","imagePath",1,"form-control"],["imagePath",""],["alt","Image",1,"img-responsive",3,"src"],["for","description"],["type","text","name","description","id","description","rows","6","formControlName","description",1,"form-control"],["formArrayName","ingredients",1,"col-xs-12"],["class","row","style","margin-top: 10px",3,"formGroupName",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-primary",3,"click"],[1,"row",2,"margin-top","10px",3,"formGroupName"],[1,"col-xs-8"],["type","text","formControlName","name",1,"form-control"],[1,"col-xs-2"],["type","text","formControlName","amount",1,"form-control"]],template:function(i,n){if(1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"form",2),e.NdJ("ngSubmit",function(){return n.onSubmit()}),e.TgZ(3,"div",0),e.TgZ(4,"div",1),e.TgZ(5,"button",3),e._uU(6," Save "),e.qZA(),e.TgZ(7,"button",4),e.NdJ("click",function(){return n.onCancel()}),e._uU(8," Cancel "),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"div",0),e.TgZ(10,"div",1),e.TgZ(11,"div",5),e.TgZ(12,"label",6),e._uU(13,"Name"),e.qZA(),e._UZ(14,"input",7),e.qZA(),e.qZA(),e.qZA(),e.TgZ(15,"div",0),e.TgZ(16,"div",1),e.TgZ(17,"div",5),e.TgZ(18,"label",8),e._uU(19,"Image URL"),e.qZA(),e._UZ(20,"input",9,10),e.qZA(),e.qZA(),e.qZA(),e.TgZ(22,"div",0),e.TgZ(23,"div",1),e._UZ(24,"img",11),e.qZA(),e.qZA(),e.TgZ(25,"div",0),e.TgZ(26,"div",1),e.TgZ(27,"div",5),e.TgZ(28,"label",12),e._uU(29,"Description"),e.qZA(),e._UZ(30,"textarea",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(31,"div",0),e.TgZ(32,"div",14),e.YNc(33,S,8,1,"div",15),e._UZ(34,"hr"),e.TgZ(35,"div",0),e.TgZ(36,"div",1),e.TgZ(37,"button",16),e.NdJ("click",function(){return n.onAddIngredient()}),e._uU(38," Add Ingredient "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&i){const c=e.MAs(21);e.xp6(2),e.Q6J("formGroup",n.recipeForm),e.xp6(3),e.Q6J("disabled",!n.recipeForm.valid),e.xp6(19),e.Q6J("src",c.value,e.LSH),e.xp6(9),e.Q6J("ngForOf",n.ingredientsControls)}},directives:[o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u,o.CE,u.sg,o.x0],styles:["input.ng-invalid.ng-touched[_ngcontent-%COMP%], textarea.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}"]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipe-start"]],decls:2,vars:0,template:function(i,n){1&i&&(e.TgZ(0,"h3"),e._uU(1,"Please select a recipe!"),e.qZA())},encapsulation:2}),t})();const y=function(t){return[t]};let I=(()=>{class t{constructor(i){this.recipeService=i}ngOnInit(){this.recipe=this.recipeService.getRecipe(this.index)}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(l.j))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipe-item"]],inputs:{index:"index"},decls:8,vars:7,consts:[["routerLinkActive","active",1,"list-group-item","clearfix",2,"cursor","pointer",3,"routerLink"],[1,"pull-left"],[1,"list-group-item-heading"],[1,"list-group-item-text"],[1,"pull-right"],[1,"img-responsive",2,"max-height","50px",3,"src","alt"]],template:function(i,n){1&i&&(e.TgZ(0,"a",0),e.TgZ(1,"div",1),e.TgZ(2,"h4",2),e._uU(3),e.qZA(),e.TgZ(4,"p",3),e._uU(5),e.qZA(),e.qZA(),e.TgZ(6,"span",4),e._UZ(7,"img",5),e.qZA(),e.qZA()),2&i&&(e.Q6J("routerLink",e.VKq(5,y,n.index)),e.xp6(3),e.Oqu(n.recipe.name),e.xp6(2),e.Oqu(n.recipe.description),e.xp6(2),e.s9C("src",n.recipe.imagePath,e.LSH),e.Q6J("alt",n.recipe.name))},directives:[p.yS,p.Od],styles:[""]}),t})();function U(t,r){1&t&&e._UZ(0,"app-recipe-item",4),2&t&&e.Q6J("index",r.index)}let b=(()=>{class t{constructor(i,n,c){this.recipeService=i,this.router=n,this.route=c}ngOnInit(){this.subscription=this.recipeService.recipesChanged.subscribe(i=>this.recipes=i),this.recipes=this.recipeService.getRecipes()}ngOnDestroy(){this.subscription.unsubscribe()}onNewRecipe(){this.router.navigate(["new"],{relativeTo:this.route})}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(l.j),e.Y36(p.F0),e.Y36(p.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipe-list"]],decls:8,vars:1,consts:[[1,"row"],[1,"col-xs-12"],[1,"btn","btn-success",3,"click"],[3,"index",4,"ngFor","ngForOf"],[3,"index"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"button",2),e.NdJ("click",function(){return n.onNewRecipe()}),e._uU(3,"New Recipe"),e.qZA(),e.qZA(),e.qZA(),e._UZ(4,"hr"),e.TgZ(5,"div",0),e.TgZ(6,"div",1),e.YNc(7,U,1,1,"app-recipe-item",3),e.qZA(),e.qZA()),2&i&&(e.xp6(7),e.Q6J("ngForOf",n.recipes))},directives:[u.sg,I],styles:[""]}),t})(),x=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-recipes"]],decls:5,vars:0,consts:[[1,"row"],[1,"col-md-5"],[1,"col-md-7"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"app-recipe-list"),e.qZA(),e.TgZ(3,"div",2),e._UZ(4,"router-outlet"),e.qZA(),e.qZA())},directives:[b,p.lC],styles:[""]}),t})();var w=s(1807);let Z=(()=>{class t{constructor(i,n){this.dataStorageService=i,this.recipeService=n}resolve(i,n){if(0===this.recipeService.getRecipes().length)return this.dataStorageService.fetchRecipes()}}return t.\u0275fac=function(i){return new(i||t)(e.LFG(w.Z),e.LFG(l.j))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const N=[{path:"",component:x,children:[{path:"new",component:g},{path:":id",component:_,resolve:[Z]},{path:":id/edit",component:g,resolve:[Z]},{path:"",component:F}],canActivate:[A]}];let k=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[p.Bz.forChild(N)],p.Bz]}),t})();var J=s(4466);let L=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[p.Bz,o.UX,k,J.m]]}),t})()}}]);