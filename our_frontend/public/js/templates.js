angular.module("templates",[]).run(["$templateCache",function(n){n.put("components/comment-box/comment-box.html",'<link rel="stylesheet" href="comment-box.css">\n\n<div class="container">\n    <div class="dialogbox">\n        <div class="body">\n            <span class="tip tip-left"></span>\n            <div class="message">\n                <span placeholder="Add a Comment">Example of comment</span>\n            </div>\n        </div>\n    </div>\n</div>'),n.put("components/login-dialog/login-dialog.html",'<form name="loginForm" ng-submit="login()">\n    <md-toolbar>\n        <div class="md-toolbar-tools">\n            <h2>Enter credentials</h2>\n        </div>\n    </md-toolbar>\n\n    <md-dialog-content layout-margin>\n        <h2 class="md-title md-primary">Login</h2>\n        <span class="md-body-2 mv-error-text" ng-show="errorText">{{errorText}}</span>\n        <md-input-container class="md-block">\n            <label>Username</label>\n            <input required name="username" ng-model="username">\n            <div ng-messages="loginForm.username.$error">\n                <div ng-message="required">Username is required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>Password</label>\n            <input type="password" name="password" required ng-model="password">\n            <div ng-messages="loginForm.password.$error">\n                <div ng-message="required">Password is required.</div>\n            </div>\n        </md-input-container>\n    </md-dialog-content>\n    <md-dialog-actions layout="row" layout-align="space-around center">\n        <md-button ng-click="cancel()">\n            Cancel\n        </md-button>\n        <md-button type="submit" ng-disabled="loginForm.$invalid">\n            Log in\n        </md-button>\n    </md-dialog-actions>\n\n</form>'),n.put("components/recipe-card/recipe-card.html",'<md-card-title>\n\n    <md-card-title-text>\n        <span class="md-headline">{{recipe.title}}</span>\n        <!--<span class="md-subhead"></span>-->\n    </md-card-title-text>\n    <md-card-title-media>\n        <img class="mv-card-pic" ng-src="{{recipe.thumbnailImageId}}" />\n\n    </md-card-title-media>\n</md-card-title>\n<md-card-content>\n    Date: {{"05-06-2016"}} | Rating: {{recipe.rating}} | Created By: {{recipe.user.username}}\n</md-card-content>\n<md-card-actions layout="row" layout-align="end center">\n    <md-button class="md-ink-ripple md-accent" ui-sref="recipes.detail({recipeId: recipe._id})">\n        Details\n    </md-button>\n</md-card-actions>\n\n<!--<a class="mdl-button mdl-button&#45;&#45;colored mdl-js-button mdl-js-ripple-effect" href="#/movies/{{movie._id}}">-->\n\n\n'),n.put("components/register-dialog/register-dialog.html",'<form name="registerForm" ng-submit="register()">\n    <md-toolbar>\n        <div class="md-toolbar-tools">\n            <h2>Register</h2>\n        </div>\n    </md-toolbar>\n\n    <md-dialog-content layout-margin>\n        <h2 class="md-title md-primary">Sign up for food monkey</h2>\n        <p class="md-warn" ng-show="errorText">{{errorText}}</p>\n        <md-input-container class="md-block">\n            <label>First name</label>\n            <input type="text" name="firstName" required ng-model="firstName">\n            <div ng-messages="registerForm.firstName.$error">\n                <div ng-message="required">First name required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>Last name</label>\n            <input type="text" name="lastName" ng-model="lastName">\n            <div ng-messages="registerForm.lastName.$error">\n                <div ng-message="required">Last Name is required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>eMail</label>\n            <input type="text" name="email" required ng-model="email">\n            <div ng-messages="registerForm.email.$error">\n                <div ng-message="required">eMail is required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>Username</label>\n            <input type="text" required name="username" ng-model="username">\n            <div ng-messages="registerForm.username.$error">\n                <div ng-message="required">Username is required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>Password</label>\n            <input type="password" required name="password" ng-model="pwd">\n            <div ng-messages="registerForm.password.$error">\n                <div ng-message="required">Password is required.</div>\n            </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n            <label>Repeat password</label>\n            <input type="password" name="passwordConfirm" required compare-to="pwd" ng-model="pwdConfirm">\n            <div ng-messages="registerForm.passwordConfirm.$error">\n                <div ng-message="required">Password confirmation required.</div>\n                <div ng-message="compareTo">Passwords must match.</div>\n            </div>\n        </md-input-container>\n    </md-dialog-content>\n    <md-dialog-actions layout="row" layout-align="space-around center">\n        <md-button ng-click="cancel()">\n            Cancel\n        </md-button>\n        <md-button type="submit" ng-disabled="registerForm.$invalid">\n            Sign up\n        </md-button>\n    </md-dialog-actions>\n</form>'),n.put("components/toolbar/toolbar.html",'\n\n<!-- header -->\n\n<div layout="row" layout-padding layout-align="space-between center">\n    <div>\n        <md-button href="/#">Home</md-button>\n        <md-button href="/#/recipes">Browse Recipes</md-button>\n        <md-button href="/#/create" ng-if="loggedIn">Create Recipes</md-button>\n <!--       <md-menu>\n            <md-button md-menu-origin ng-click="$mdOpenMenu()">Recipes</md-button>\n            <md-menu-content width="2">\n                &lt;!&ndash; for logged in &ndash;&gt;\n                <md-menu-item hide-xs ng-if="!loggedIn">\n                    <md-button>Create</md-button>\n                </md-menu-item>\n                &lt;!&ndash; for logged in &ndash;&gt;\n                <md-menu-item>\n                    <md-button>Browse</md-button>\n                </md-menu-item>\n            </md-menu-content>\n        </md-menu>-->\n    </div>\n    <div class="nav-buttons">\n        <!-- not logged in -->\n        <md-button hide-xs ng-if="!loggedIn" ng-click="showLoginDialog()" class="md-raised">Login</md-button>\n        <md-button hide-xs ng-if="!loggedIn" ng-click="showSignupDialog()" class="md-raised">Register</md-button>\n        <!-- logged in -->\n        <md-button ng-if="loggedIn" class="">Hi, {{user.username}} </md-button>\n        <md-button ng-if="loggedIn" ng-click="logout()" class="md-raised">Log Out</md-button>\n    </div>\n    </div>\n\n<!-- header -->\n'),n.put("views/detail/recipe-detail.html",'<div layout="row" layout-padding>\n    <div class="banner">\n        <img class="mv-display-pic" ng-src="{{recipe.mainImageId}}">\n    </div>\n\n    <div class="container">\n        <h1>{{recipe.title}}</h1>\n        <h2>Prep Time: {{recipe.prepTime}}</h2>\n        <h2>Difficulty: {{recipe.difficulty}}</h2>\n        <h2>Rating: {{recipe.rating}}</h2>\n        <h3>By: {{recipe.user.username}}</h3>\n        <h3>Created: {{recipe.createdOn | date}}</h3>\n        <h4>{{recipe.description}}</h4>\n\n        <ul>\n            <li ng-repeat="ingredient in recipe.ingredients">{{ingredient.name}}</li>\n\n            <li ng-repeat="step in recipe.steps">{{step}}</li>\n        </ul>\n\n        <form name="CommentForm" ng-submit="addNewComment()" ng-if="loggedIn">\n            <md-input-container class="md-block">\n                <label>Share your inputs!</label>\n                <input type="text" name="Comment" ng-model="commentText">\n            </md-input-container>\n            <md-button type="submit">Comment</md-button>\n        </form>\n\n        <p ng-if="!loggedIn">Please log in to add comments</p>\n\n        <ul mv-comment-box class="comment-box" comment="comment" ng-repeat="comment in comments">{{comment.text}}</ul>\n    </div>\n\n\n</div>\n\n\n'),n.put("views/home/home.html",'<!--\n banner -->\n<div class="banner">\n    <div class="container">\n        <div class="banner-info">\n            <h1 class="animated font-cursive fadeInLeftBig" data-wow-duration="1000ms" data-wow-delay="300ms">Welcome to Food Monkey.<span>Online cooking enthusiasts community</span></h1>\n            <div class="banner-info1 animated wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">\n                <ul id="flexiselDemo1">\n                    <li>\n                        <div class="banner-info1-grid">\n                            <img src="images/1.png" alt=" " class="img-responsive" />\n                            <h3 class="font-cursive">Create Recipes</h3>\n                            <p> You can create and upload your own recipe.</p>\n                        </div>\n                    </li>\n                    <li>\n                        <div class="banner-info1-grid">\n                            <img src="images/2.png" alt=" " class="img-responsive" />\n                            <h3 class="font-cursive">Browse recipes</h3>\n                            <p> You can see recipes uploaded by other users. </p>\n                        </div>\n                    </li>\n                    <li>\n                        <div class="banner-info1-grid">\n                            <img src="images/3.png" alt=" " class="img-responsive" />\n                            <h3 class="font-cursive">Order ingredients</h3>\n                            <p>Found a recipe you want to try, we will deliver it to your doorstep.</p>\n                        </div>\n                    </li>\n                </ul>\n                <script type="text/javascript">\n                    $(window).load(function() {\n                        $("#flexiselDemo1").flexisel({\n                            visibleItems: 3,\n                            animationSpeed: 1000,\n                            autoPlay: true,\n                            autoPlaySpeed: 3000,\n                            pauseOnHover: true,\n                            enableResponsiveBreakpoints: true,\n                            responsiveBreakpoints: {\n                                portrait: {\n                                    changePoint:480,\n                                    visibleItems: 1\n                                },\n                                landscape: {\n                                    changePoint:640,\n                                    visibleItems:2\n                                },\n                                tablet: {\n                                    changePoint:768,\n                                    visibleItems: 2\n                                }\n                            }\n                        });\n\n                    });\n                </script>\n                <script type="text/javascript" src="template-js/jquery.flexisel.js"></script>\n                <div class="more wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">\n                    <a href="single.html" class="hvr-curl-bottom-right">Read More</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- //banner -->\n<div class="footer-bottom wow fadeInUp" data-wow-duration="1000ms" data-wow-delay="300ms">\n    <div class="container">\n        <p>&copy 2016 Food Monkey. All rights reserved | Design by <a href="http://w3layouts.com/"> W3layouts.</a></p>\n    </div>\n</div>'),n.put("views/list/recipe-list.html",'<div layout="row" layout-wrap>\n    <md-card mv-recipe-card class="recipe-card" recipe="recipe" ng-repeat="recipe in recipes"></md-card>\n</div>\n\n'),n.put("views/root/root.html",'\n<!--[if lt IE 7]>\n<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>\n<![endif]-->\n\n\n<md-toolbar class="md-primary" mv-toolbar>\n\n\n</md-toolbar>\n<md-content role="main" class="mv-content" layout-padding ui-view="content"></md-content>\n\n<!--stuff that belongs outside of the md-content container like fab buttons-->\n<div ui-view="outside"></div>\n\n\n\n\n')}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJHRlbXBsYXRlQ2FjaGUiLCJwdXQiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFRQyxPQUFPLGdCQUFpQkMsS0FBSyxpQkFBa0IsU0FBU0MsR0FBaEVBLEVBQUFDLElBQUEsMENBQUEsOFZBQ0FELEVBQUFDLElBQUEsNENBQUEsMDFDQUNBRCxFQUFBQyxJQUFBLDBDQUFBLHd5QkFDQUQsRUFBQUMsSUFBQSxrREFBQSwyekZBQ0FELEVBQUFDLElBQUEsa0NBQUEsKzRDQUNBRCxFQUFBQyxJQUFBLGtDQUFBLHN2Q0FDQUQsRUFBQUMsSUFBQSx1QkFBQSwyNUdBQ0FELEVBQUFDLElBQUEsOEJBQUEsd0pBQ0FELEVBQUFDLElBQUEsdUJBQUEiLCJmaWxlIjoidGVtcGxhdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXNcIiwgW10pLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dChcImNvbXBvbmVudHMvY29tbWVudC1ib3gvY29tbWVudC1ib3guaHRtbFwiLFwiPGxpbmsgcmVsPVxcXCJzdHlsZXNoZWV0XFxcIiBocmVmPVxcXCJjb21tZW50LWJveC5jc3NcXFwiPlxcblxcbjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRpYWxvZ2JveFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJib2R5XFxcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGlwIHRpcC1sZWZ0XFxcIj48L3NwYW4+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibWVzc2FnZVxcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuIHBsYWNlaG9sZGVyPVxcXCJBZGQgYSBDb21tZW50XFxcIj5FeGFtcGxlIG9mIGNvbW1lbnQ8L3NwYW4+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCIpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KFwiY29tcG9uZW50cy9sb2dpbi1kaWFsb2cvbG9naW4tZGlhbG9nLmh0bWxcIixcIjxmb3JtIG5hbWU9XFxcImxvZ2luRm9ybVxcXCIgbmctc3VibWl0PVxcXCJsb2dpbigpXFxcIj5cXG4gICAgPG1kLXRvb2xiYXI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZC10b29sYmFyLXRvb2xzXFxcIj5cXG4gICAgICAgICAgICA8aDI+RW50ZXIgY3JlZGVudGlhbHM8L2gyPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvbWQtdG9vbGJhcj5cXG5cXG4gICAgPG1kLWRpYWxvZy1jb250ZW50IGxheW91dC1tYXJnaW4+XFxuICAgICAgICA8aDIgY2xhc3M9XFxcIm1kLXRpdGxlIG1kLXByaW1hcnlcXFwiPkxvZ2luPC9oMj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtZC1ib2R5LTIgbXYtZXJyb3ItdGV4dFxcXCIgbmctc2hvdz1cXFwiZXJyb3JUZXh0XFxcIj57e2Vycm9yVGV4dH19PC9zcGFuPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5Vc2VybmFtZTwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIG5hbWU9XFxcInVzZXJuYW1lXFxcIiBuZy1tb2RlbD1cXFwidXNlcm5hbWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZXM9XFxcImxvZ2luRm9ybS51c2VybmFtZS4kZXJyb3JcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XFxcInJlcXVpcmVkXFxcIj5Vc2VybmFtZSBpcyByZXF1aXJlZC48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBuYW1lPVxcXCJwYXNzd29yZFxcXCIgcmVxdWlyZWQgbmctbW9kZWw9XFxcInBhc3N3b3JkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVxcXCJsb2dpbkZvcm0ucGFzc3dvcmQuJGVycm9yXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlPVxcXCJyZXF1aXJlZFxcXCI+UGFzc3dvcmQgaXMgcmVxdWlyZWQuPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXG4gICAgPC9tZC1kaWFsb2ctY29udGVudD5cXG4gICAgPG1kLWRpYWxvZy1hY3Rpb25zIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWFyb3VuZCBjZW50ZXJcXFwiPlxcbiAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY2FuY2VsKClcXFwiPlxcbiAgICAgICAgICAgIENhbmNlbFxcbiAgICAgICAgPC9tZC1idXR0b24+XFxuICAgICAgICA8bWQtYnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgbmctZGlzYWJsZWQ9XFxcImxvZ2luRm9ybS4kaW52YWxpZFxcXCI+XFxuICAgICAgICAgICAgTG9nIGluXFxuICAgICAgICA8L21kLWJ1dHRvbj5cXG4gICAgPC9tZC1kaWFsb2ctYWN0aW9ucz5cXG5cXG48L2Zvcm0+XCIpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KFwiY29tcG9uZW50cy9yZWNpcGUtY2FyZC9yZWNpcGUtY2FyZC5odG1sXCIsXCI8bWQtY2FyZC10aXRsZT5cXG5cXG4gICAgPG1kLWNhcmQtdGl0bGUtdGV4dD5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtZC1oZWFkbGluZVxcXCI+e3tyZWNpcGUudGl0bGV9fTwvc3Bhbj5cXG4gICAgICAgIDwhLS08c3BhbiBjbGFzcz1cXFwibWQtc3ViaGVhZFxcXCI+PC9zcGFuPi0tPlxcbiAgICA8L21kLWNhcmQtdGl0bGUtdGV4dD5cXG4gICAgPG1kLWNhcmQtdGl0bGUtbWVkaWE+XFxuICAgICAgICA8aW1nIGNsYXNzPVxcXCJtdi1jYXJkLXBpY1xcXCIgbmctc3JjPVxcXCJ7e3JlY2lwZS50aHVtYm5haWxJbWFnZUlkfX1cXFwiIC8+XFxuXFxuICAgIDwvbWQtY2FyZC10aXRsZS1tZWRpYT5cXG48L21kLWNhcmQtdGl0bGU+XFxuPG1kLWNhcmQtY29udGVudD5cXG4gICAgRGF0ZToge3tcXFwiMDUtMDYtMjAxNlxcXCJ9fSB8IFJhdGluZzoge3tyZWNpcGUucmF0aW5nfX0gfCBDcmVhdGVkIEJ5OiB7e3JlY2lwZS51c2VyLnVzZXJuYW1lfX1cXG48L21kLWNhcmQtY29udGVudD5cXG48bWQtY2FyZC1hY3Rpb25zIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcImVuZCBjZW50ZXJcXFwiPlxcbiAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1pbmstcmlwcGxlIG1kLWFjY2VudFxcXCIgdWktc3JlZj1cXFwicmVjaXBlcy5kZXRhaWwoe3JlY2lwZUlkOiByZWNpcGUuX2lkfSlcXFwiPlxcbiAgICAgICAgRGV0YWlsc1xcbiAgICA8L21kLWJ1dHRvbj5cXG48L21kLWNhcmQtYWN0aW9ucz5cXG5cXG48IS0tPGEgY2xhc3M9XFxcIm1kbC1idXR0b24gbWRsLWJ1dHRvbiYjNDU7JiM0NTtjb2xvcmVkIG1kbC1qcy1idXR0b24gbWRsLWpzLXJpcHBsZS1lZmZlY3RcXFwiIGhyZWY9XFxcIiMvbW92aWVzL3t7bW92aWUuX2lkfX1cXFwiPi0tPlxcblxcblxcblwiKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dChcImNvbXBvbmVudHMvcmVnaXN0ZXItZGlhbG9nL3JlZ2lzdGVyLWRpYWxvZy5odG1sXCIsXCI8Zm9ybSBuYW1lPVxcXCJyZWdpc3RlckZvcm1cXFwiIG5nLXN1Ym1pdD1cXFwicmVnaXN0ZXIoKVxcXCI+XFxuICAgIDxtZC10b29sYmFyPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibWQtdG9vbGJhci10b29sc1xcXCI+XFxuICAgICAgICAgICAgPGgyPlJlZ2lzdGVyPC9oMj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L21kLXRvb2xiYXI+XFxuXFxuICAgIDxtZC1kaWFsb2ctY29udGVudCBsYXlvdXQtbWFyZ2luPlxcbiAgICAgICAgPGgyIGNsYXNzPVxcXCJtZC10aXRsZSBtZC1wcmltYXJ5XFxcIj5TaWduIHVwIGZvciBmb29kIG1vbmtleTwvaDI+XFxuICAgICAgICA8cCBjbGFzcz1cXFwibWQtd2FyblxcXCIgbmctc2hvdz1cXFwiZXJyb3JUZXh0XFxcIj57e2Vycm9yVGV4dH19PC9wPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5GaXJzdCBuYW1lPC9sYWJlbD5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwiZmlyc3ROYW1lXFxcIiByZXF1aXJlZCBuZy1tb2RlbD1cXFwiZmlyc3ROYW1lXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2VzPVxcXCJyZWdpc3RlckZvcm0uZmlyc3ROYW1lLiRlcnJvclxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cXFwicmVxdWlyZWRcXFwiPkZpcnN0IG5hbWUgcmVxdWlyZWQuPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXG4gICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm1kLWJsb2NrXFxcIj5cXG4gICAgICAgICAgICA8bGFiZWw+TGFzdCBuYW1lPC9sYWJlbD5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmFtZT1cXFwibGFzdE5hbWVcXFwiIG5nLW1vZGVsPVxcXCJsYXN0TmFtZVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cXFwicmVnaXN0ZXJGb3JtLmxhc3ROYW1lLiRlcnJvclxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cXFwicmVxdWlyZWRcXFwiPkxhc3QgTmFtZSBpcyByZXF1aXJlZC48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5lTWFpbDwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcImVtYWlsXFxcIiByZXF1aXJlZCBuZy1tb2RlbD1cXFwiZW1haWxcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZXM9XFxcInJlZ2lzdGVyRm9ybS5lbWFpbC4kZXJyb3JcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XFxcInJlcXVpcmVkXFxcIj5lTWFpbCBpcyByZXF1aXJlZC48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5Vc2VybmFtZTwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIHJlcXVpcmVkIG5hbWU9XFxcInVzZXJuYW1lXFxcIiBuZy1tb2RlbD1cXFwidXNlcm5hbWVcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZXM9XFxcInJlZ2lzdGVyRm9ybS51c2VybmFtZS4kZXJyb3JcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XFxcInJlcXVpcmVkXFxcIj5Vc2VybmFtZSBpcyByZXF1aXJlZC48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcbiAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiByZXF1aXJlZCBuYW1lPVxcXCJwYXNzd29yZFxcXCIgbmctbW9kZWw9XFxcInB3ZFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlcz1cXFwicmVnaXN0ZXJGb3JtLnBhc3N3b3JkLiRlcnJvclxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZT1cXFwicmVxdWlyZWRcXFwiPlBhc3N3b3JkIGlzIHJlcXVpcmVkLjwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxuICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJtZC1ibG9ja1xcXCI+XFxuICAgICAgICAgICAgPGxhYmVsPlJlcGVhdCBwYXNzd29yZDwvbGFiZWw+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInBhc3N3b3JkXFxcIiBuYW1lPVxcXCJwYXNzd29yZENvbmZpcm1cXFwiIHJlcXVpcmVkIGNvbXBhcmUtdG89XFxcInB3ZFxcXCIgbmctbW9kZWw9XFxcInB3ZENvbmZpcm1cXFwiPlxcbiAgICAgICAgICAgIDxkaXYgbmctbWVzc2FnZXM9XFxcInJlZ2lzdGVyRm9ybS5wYXNzd29yZENvbmZpcm0uJGVycm9yXFxcIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1tZXNzYWdlPVxcXCJyZXF1aXJlZFxcXCI+UGFzc3dvcmQgY29uZmlybWF0aW9uIHJlcXVpcmVkLjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLW1lc3NhZ2U9XFxcImNvbXBhcmVUb1xcXCI+UGFzc3dvcmRzIG11c3QgbWF0Y2guPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXG4gICAgPC9tZC1kaWFsb2ctY29udGVudD5cXG4gICAgPG1kLWRpYWxvZy1hY3Rpb25zIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWFyb3VuZCBjZW50ZXJcXFwiPlxcbiAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY2FuY2VsKClcXFwiPlxcbiAgICAgICAgICAgIENhbmNlbFxcbiAgICAgICAgPC9tZC1idXR0b24+XFxuICAgICAgICA8bWQtYnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgbmctZGlzYWJsZWQ9XFxcInJlZ2lzdGVyRm9ybS4kaW52YWxpZFxcXCI+XFxuICAgICAgICAgICAgU2lnbiB1cFxcbiAgICAgICAgPC9tZC1idXR0b24+XFxuICAgIDwvbWQtZGlhbG9nLWFjdGlvbnM+XFxuPC9mb3JtPlwiKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dChcImNvbXBvbmVudHMvdG9vbGJhci90b29sYmFyLmh0bWxcIixcIlxcblxcbjwhLS0gaGVhZGVyIC0tPlxcblxcbjxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1wYWRkaW5nIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiPlxcbiAgICA8ZGl2PlxcbiAgICAgICAgPG1kLWJ1dHRvbiBocmVmPVxcXCIvI1xcXCI+SG9tZTwvbWQtYnV0dG9uPlxcbiAgICAgICAgPG1kLWJ1dHRvbiBocmVmPVxcXCIvIy9yZWNpcGVzXFxcIj5Ccm93c2UgUmVjaXBlczwvbWQtYnV0dG9uPlxcbiAgICAgICAgPG1kLWJ1dHRvbiBocmVmPVxcXCIvIy9jcmVhdGVcXFwiIG5nLWlmPVxcXCJsb2dnZWRJblxcXCI+Q3JlYXRlIFJlY2lwZXM8L21kLWJ1dHRvbj5cXG4gPCEtLSAgICAgICA8bWQtbWVudT5cXG4gICAgICAgICAgICA8bWQtYnV0dG9uIG1kLW1lbnUtb3JpZ2luIG5nLWNsaWNrPVxcXCIkbWRPcGVuTWVudSgpXFxcIj5SZWNpcGVzPC9tZC1idXR0b24+XFxuICAgICAgICAgICAgPG1kLW1lbnUtY29udGVudCB3aWR0aD1cXFwiMlxcXCI+XFxuICAgICAgICAgICAgICAgICZsdDshJm5kYXNoOyBmb3IgbG9nZ2VkIGluICZuZGFzaDsmZ3Q7XFxuICAgICAgICAgICAgICAgIDxtZC1tZW51LWl0ZW0gaGlkZS14cyBuZy1pZj1cXFwiIWxvZ2dlZEluXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxtZC1idXR0b24+Q3JlYXRlPC9tZC1idXR0b24+XFxuICAgICAgICAgICAgICAgIDwvbWQtbWVudS1pdGVtPlxcbiAgICAgICAgICAgICAgICAmbHQ7ISZuZGFzaDsgZm9yIGxvZ2dlZCBpbiAmbmRhc2g7Jmd0O1xcbiAgICAgICAgICAgICAgICA8bWQtbWVudS1pdGVtPlxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWJ1dHRvbj5Ccm93c2U8L21kLWJ1dHRvbj5cXG4gICAgICAgICAgICAgICAgPC9tZC1tZW51LWl0ZW0+XFxuICAgICAgICAgICAgPC9tZC1tZW51LWNvbnRlbnQ+XFxuICAgICAgICA8L21kLW1lbnU+LS0+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJuYXYtYnV0dG9uc1xcXCI+XFxuICAgICAgICA8IS0tIG5vdCBsb2dnZWQgaW4gLS0+XFxuICAgICAgICA8bWQtYnV0dG9uIGhpZGUteHMgbmctaWY9XFxcIiFsb2dnZWRJblxcXCIgbmctY2xpY2s9XFxcInNob3dMb2dpbkRpYWxvZygpXFxcIiBjbGFzcz1cXFwibWQtcmFpc2VkXFxcIj5Mb2dpbjwvbWQtYnV0dG9uPlxcbiAgICAgICAgPG1kLWJ1dHRvbiBoaWRlLXhzIG5nLWlmPVxcXCIhbG9nZ2VkSW5cXFwiIG5nLWNsaWNrPVxcXCJzaG93U2lnbnVwRGlhbG9nKClcXFwiIGNsYXNzPVxcXCJtZC1yYWlzZWRcXFwiPlJlZ2lzdGVyPC9tZC1idXR0b24+XFxuICAgICAgICA8IS0tIGxvZ2dlZCBpbiAtLT5cXG4gICAgICAgIDxtZC1idXR0b24gbmctaWY9XFxcImxvZ2dlZEluXFxcIiBjbGFzcz1cXFwiXFxcIj5IaSwge3t1c2VyLnVzZXJuYW1lfX0gPC9tZC1idXR0b24+XFxuICAgICAgICA8bWQtYnV0dG9uIG5nLWlmPVxcXCJsb2dnZWRJblxcXCIgbmctY2xpY2s9XFxcImxvZ291dCgpXFxcIiBjbGFzcz1cXFwibWQtcmFpc2VkXFxcIj5Mb2cgT3V0PC9tZC1idXR0b24+XFxuICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG48IS0tIGhlYWRlciAtLT5cXG5cIik7XG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJ2aWV3cy9kZXRhaWwvcmVjaXBlLWRldGFpbC5odG1sXCIsXCI8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtcGFkZGluZz5cXG4gICAgPGRpdiBjbGFzcz1cXFwiYmFubmVyXFxcIj5cXG4gICAgICAgIDxpbWcgY2xhc3M9XFxcIm12LWRpc3BsYXktcGljXFxcIiBuZy1zcmM9XFxcInt7cmVjaXBlLm1haW5JbWFnZUlkfX1cXFwiPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxoMT57e3JlY2lwZS50aXRsZX19PC9oMT5cXG4gICAgICAgIDxoMj5QcmVwIFRpbWU6IHt7cmVjaXBlLnByZXBUaW1lfX08L2gyPlxcbiAgICAgICAgPGgyPkRpZmZpY3VsdHk6IHt7cmVjaXBlLmRpZmZpY3VsdHl9fTwvaDI+XFxuICAgICAgICA8aDI+UmF0aW5nOiB7e3JlY2lwZS5yYXRpbmd9fTwvaDI+XFxuICAgICAgICA8aDM+Qnk6IHt7cmVjaXBlLnVzZXIudXNlcm5hbWV9fTwvaDM+XFxuICAgICAgICA8aDM+Q3JlYXRlZDoge3tyZWNpcGUuY3JlYXRlZE9uIHwgZGF0ZX19PC9oMz5cXG4gICAgICAgIDxoND57e3JlY2lwZS5kZXNjcmlwdGlvbn19PC9oND5cXG5cXG4gICAgICAgIDx1bD5cXG4gICAgICAgICAgICA8bGkgbmctcmVwZWF0PVxcXCJpbmdyZWRpZW50IGluIHJlY2lwZS5pbmdyZWRpZW50c1xcXCI+e3tpbmdyZWRpZW50Lm5hbWV9fTwvbGk+XFxuXFxuICAgICAgICAgICAgPGxpIG5nLXJlcGVhdD1cXFwic3RlcCBpbiByZWNpcGUuc3RlcHNcXFwiPnt7c3RlcH19PC9saT5cXG4gICAgICAgIDwvdWw+XFxuXFxuICAgICAgICA8Zm9ybSBuYW1lPVxcXCJDb21tZW50Rm9ybVxcXCIgbmctc3VibWl0PVxcXCJhZGROZXdDb21tZW50KClcXFwiIG5nLWlmPVxcXCJsb2dnZWRJblxcXCI+XFxuICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcbiAgICAgICAgICAgICAgICA8bGFiZWw+U2hhcmUgeW91ciBpbnB1dHMhPC9sYWJlbD5cXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5hbWU9XFxcIkNvbW1lbnRcXFwiIG5nLW1vZGVsPVxcXCJjb21tZW50VGV4dFxcXCI+XFxuICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxuICAgICAgICAgICAgPG1kLWJ1dHRvbiB0eXBlPVxcXCJzdWJtaXRcXFwiPkNvbW1lbnQ8L21kLWJ1dHRvbj5cXG4gICAgICAgIDwvZm9ybT5cXG5cXG4gICAgICAgIDxwIG5nLWlmPVxcXCIhbG9nZ2VkSW5cXFwiPlBsZWFzZSBsb2cgaW4gdG8gYWRkIGNvbW1lbnRzPC9wPlxcblxcbiAgICAgICAgPHVsIG12LWNvbW1lbnQtYm94IGNsYXNzPVxcXCJjb21tZW50LWJveFxcXCIgY29tbWVudD1cXFwiY29tbWVudFxcXCIgbmctcmVwZWF0PVxcXCJjb21tZW50IGluIGNvbW1lbnRzXFxcIj57e2NvbW1lbnQudGV4dH19PC91bD5cXG4gICAgPC9kaXY+XFxuXFxuXFxuPC9kaXY+XFxuXFxuXFxuXCIpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KFwidmlld3MvaG9tZS9ob21lLmh0bWxcIixcIjwhLS1cXG4gYmFubmVyIC0tPlxcbjxkaXYgY2xhc3M9XFxcImJhbm5lclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJiYW5uZXItaW5mb1xcXCI+XFxuICAgICAgICAgICAgPGgxIGNsYXNzPVxcXCJhbmltYXRlZCBmb250LWN1cnNpdmUgZmFkZUluTGVmdEJpZ1xcXCIgZGF0YS13b3ctZHVyYXRpb249XFxcIjEwMDBtc1xcXCIgZGF0YS13b3ctZGVsYXk9XFxcIjMwMG1zXFxcIj5XZWxjb21lIHRvIEZvb2QgTW9ua2V5LjxzcGFuPk9ubGluZSBjb29raW5nIGVudGh1c2lhc3RzIGNvbW11bml0eTwvc3Bhbj48L2gxPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJhbm5lci1pbmZvMSBhbmltYXRlZCB3b3cgZmFkZUluRG93blxcXCIgZGF0YS13b3ctZHVyYXRpb249XFxcIjEwMDBtc1xcXCIgZGF0YS13b3ctZGVsYXk9XFxcIjMwMG1zXFxcIj5cXG4gICAgICAgICAgICAgICAgPHVsIGlkPVxcXCJmbGV4aXNlbERlbW8xXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJiYW5uZXItaW5mbzEtZ3JpZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJpbWFnZXMvMS5wbmdcXFwiIGFsdD1cXFwiIFxcXCIgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcImZvbnQtY3Vyc2l2ZVxcXCI+Q3JlYXRlIFJlY2lwZXM8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4gWW91IGNhbiBjcmVhdGUgYW5kIHVwbG9hZCB5b3VyIG93biByZWNpcGUuPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJiYW5uZXItaW5mbzEtZ3JpZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJpbWFnZXMvMi5wbmdcXFwiIGFsdD1cXFwiIFxcXCIgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcImZvbnQtY3Vyc2l2ZVxcXCI+QnJvd3NlIHJlY2lwZXM8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4gWW91IGNhbiBzZWUgcmVjaXBlcyB1cGxvYWRlZCBieSBvdGhlciB1c2Vycy4gPC9wPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJiYW5uZXItaW5mbzEtZ3JpZFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJpbWFnZXMvMy5wbmdcXFwiIGFsdD1cXFwiIFxcXCIgY2xhc3M9XFxcImltZy1yZXNwb25zaXZlXFxcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcImZvbnQtY3Vyc2l2ZVxcXCI+T3JkZXIgaW5ncmVkaWVudHM8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Gb3VuZCBhIHJlY2lwZSB5b3Ugd2FudCB0byB0cnksIHdlIHdpbGwgZGVsaXZlciBpdCB0byB5b3VyIGRvb3JzdGVwLjwvcD5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICAgICAgICAgIDxzY3JpcHQgdHlwZT1cXFwidGV4dC9qYXZhc2NyaXB0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXFxcIiNmbGV4aXNlbERlbW8xXFxcIikuZmxleGlzZWwoe1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlSXRlbXM6IDMsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblNwZWVkOiAxMDAwLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvUGxheTogdHJ1ZSxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1BsYXlTcGVlZDogMzAwMCxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVSZXNwb25zaXZlQnJlYWtwb2ludHM6IHRydWUsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNpdmVCcmVha3BvaW50czoge1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQ6IHtcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VQb2ludDo0ODAsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUl0ZW1zOiAxXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZHNjYXBlOiB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9pbnQ6NjQwLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVJdGVtczoyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGV0OiB7XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlUG9pbnQ6NzY4LFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVJdGVtczogMlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XFxuXFxuICAgICAgICAgICAgICAgICAgICB9KTtcXG4gICAgICAgICAgICAgICAgPC9zY3JpcHQ+XFxuICAgICAgICAgICAgICAgIDxzY3JpcHQgdHlwZT1cXFwidGV4dC9qYXZhc2NyaXB0XFxcIiBzcmM9XFxcInRlbXBsYXRlLWpzL2pxdWVyeS5mbGV4aXNlbC5qc1xcXCI+PC9zY3JpcHQ+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1vcmUgd293IGZhZGVJblVwXFxcIiBkYXRhLXdvdy1kdXJhdGlvbj1cXFwiMTAwMG1zXFxcIiBkYXRhLXdvdy1kZWxheT1cXFwiMzAwbXNcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwic2luZ2xlLmh0bWxcXFwiIGNsYXNzPVxcXCJodnItY3VybC1ib3R0b20tcmlnaHRcXFwiPlJlYWQgTW9yZTwvYT5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuPCEtLSAvL2Jhbm5lciAtLT5cXG48ZGl2IGNsYXNzPVxcXCJmb290ZXItYm90dG9tIHdvdyBmYWRlSW5VcFxcXCIgZGF0YS13b3ctZHVyYXRpb249XFxcIjEwMDBtc1xcXCIgZGF0YS13b3ctZGVsYXk9XFxcIjMwMG1zXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj5cXG4gICAgICAgIDxwPiZjb3B5IDIwMTYgRm9vZCBNb25rZXkuIEFsbCByaWdodHMgcmVzZXJ2ZWQgfCBEZXNpZ24gYnkgPGEgaHJlZj1cXFwiaHR0cDovL3czbGF5b3V0cy5jb20vXFxcIj4gVzNsYXlvdXRzLjwvYT48L3A+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dChcInZpZXdzL2xpc3QvcmVjaXBlLWxpc3QuaHRtbFwiLFwiPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LXdyYXA+XFxuICAgIDxtZC1jYXJkIG12LXJlY2lwZS1jYXJkIGNsYXNzPVxcXCJyZWNpcGUtY2FyZFxcXCIgcmVjaXBlPVxcXCJyZWNpcGVcXFwiIG5nLXJlcGVhdD1cXFwicmVjaXBlIGluIHJlY2lwZXNcXFwiPjwvbWQtY2FyZD5cXG48L2Rpdj5cXG5cXG5cIik7XG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJ2aWV3cy9yb290L3Jvb3QuaHRtbFwiLFwiXFxuPCEtLVtpZiBsdCBJRSA3XT5cXG48cCBjbGFzcz1cXFwiYnJvd3NlaGFwcHlcXFwiPllvdSBhcmUgdXNpbmcgYW4gPHN0cm9uZz5vdXRkYXRlZDwvc3Ryb25nPiBicm93c2VyLiBQbGVhc2UgPGEgaHJlZj1cXFwiaHR0cDovL2Jyb3dzZWhhcHB5LmNvbS9cXFwiPnVwZ3JhZGUgeW91ciBicm93c2VyPC9hPiB0byBpbXByb3ZlIHlvdXIgZXhwZXJpZW5jZS48L3A+XFxuPCFbZW5kaWZdLS0+XFxuXFxuXFxuPG1kLXRvb2xiYXIgY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG12LXRvb2xiYXI+XFxuXFxuXFxuPC9tZC10b29sYmFyPlxcbjxtZC1jb250ZW50IHJvbGU9XFxcIm1haW5cXFwiIGNsYXNzPVxcXCJtdi1jb250ZW50XFxcIiBsYXlvdXQtcGFkZGluZyB1aS12aWV3PVxcXCJjb250ZW50XFxcIj48L21kLWNvbnRlbnQ+XFxuXFxuPCEtLXN0dWZmIHRoYXQgYmVsb25ncyBvdXRzaWRlIG9mIHRoZSBtZC1jb250ZW50IGNvbnRhaW5lciBsaWtlIGZhYiBidXR0b25zLS0+XFxuPGRpdiB1aS12aWV3PVxcXCJvdXRzaWRlXFxcIj48L2Rpdj5cXG5cXG5cXG5cXG5cXG5cIik7fV0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
