 var app=angular.module('GobazaarApp', [
  'GobazaarApp.services',
  'GobazaarApp.controllers',
  'GobazaarApp.filters',
  'Components',
  'ngStorage',
  'ui-rangeSlider',
  'ngRoute',
  //'fbauth'
]).
config(['$routeProvider','$cryptoProvider','$locationProvider','$httpProvider','GooglePlusProvider','ngx$httpTimeoutProvider', function($routeProvider,$cryptoProvider,$locationProvider,$httpProvider,GooglePlusProvider,ngx$httpTimeoutProvider) {
    
  //  game.setType('Jhalak');
      
    $cryptoProvider.setCryptographyKey('ABCD123');

    GooglePlusProvider.init({
      clientId: '779754691602-tclqml1u08u9u73jnqei4j6m848q4se9.apps.googleusercontent.com', /*'87576823748-rb0bacc8n7g7h3qtrtnjf91cgl23b62g.apps.googleusercontent.com'*/
      apiKey: 'paoSSx9ozcY2fusQ4qQFd-pO'
    });
        

  GooglePlusProvider.setScopes("https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read email");
  
  $httpProvider.interceptors.push("CORSInterceptor");   
 
  $locationProvider.html5Mode({
    enabled: true
   });

  ngx$httpTimeoutProvider.config.timeout = 30000;
 
  $routeProvider.
    when("/", 
      {
        templateUrl: "templates/gobazaar/partials/index.html?v="+new Date().getTime(), 
        /*controller: "homeController",*/
        resolve:
        {
            "check":function($location,loginService,$cookies,$localStorage,$window,API,userAPIservice){ 
                
               $("#imgLoader1").fadeOut();
               $("#myContent1").fadeOut("slow");
               $localStorage.searchCriteria=0
               //staticAPIServiceFunc(API,userAPIservice);
             
              if($cookies.get('customerId'))
                {
                    $location.path('/');
                    
                }
                else
                {
                   $('#imgLoader').hide();
                      if(window.localStorage )
                      {
                      if( !localStorage.getItem( 'firstLoad' ) )
                      {
                      localStorage[ 'firstLoad' ] = true;
                      window.location.reload();
                      }  
                      else
                      localStorage.remarksoveItem( 'firstLoad' );
                      }
                }
                
            }
         }
      }
    )