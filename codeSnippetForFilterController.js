controller('filterController', ["$scope","$route","$sessionStorage","$routeParams","$rootScope","$localStorage","$cookies","API","$location","sessionService","catelougeService","homeService","$http","$log",function($scope,$route,$sessionStorage,$routeParams,$rootScope,$localStorage,$cookies,API, $location,sessionService,catelougeService,homeService,$http,$log) {


/*$scope.calculateDiscount=function(priceperunit,salePricePerUnit){
//alert('sxzdzfdfdfgfgh')
var discountListing=((priceperunit-salePricePerUnit)/priceperunit)*100
 discountListing= Math.ceil(discountListing * 100)/100; 

 return discountListing;

}*/


function predicatBy(prop){


  console.log('sadsadsfsdfggfghgh')
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}


//
$scope.checkCount=function(attrName){
  var flagCountSort=false;
  for (var i = 0; i < $rootScope.cmsSortOptions.length; i++) {
    if(attrName==$rootScope.cmsSortOptions[i]){
      flagCountSort=true;
    }
  };
  return flagCountSort;
}

//
$scope.checkIfEnterKeyWasPressed = function($event){
    var keyCode = $event.which || $event.keyCode;
    if (keyCode === 13) {
        // Do that thing you finally wanted to do

       if(parseInt($scope.miniPrice)<=parseInt($scope.maxiPrice))
        $('#priceButton').trigger('click');
        angular.element('#priceButton').triggerHandler('click');
        
    }

  };

  $scope.checkIfEnterKeyWasPressedMin = function($event){
    var keyCode = $event.which || $event.keyCode;
    if (keyCode === 13) {
        // Do that thing you finally wanted to do
        
        $('#maximumVal').focus();
        
    }

  };


$scope.intOrNot=function(size){
  var conInt=parseInt(size);
  
  return isNaN(conInt);
}



/*$scope.sortRev=function(colorArr){
  
 // console.log(colorArr);
  
  $rootScope.sizeCol={};
  var arrSize=['XS','S','M','L','XL','XXL'];
  var arrayHere={};
  for (property in colorArr ) {

  var obj={};
  for (var i = 0; i < arrSize.length; i++) {
    var keepGoing = true;
  angular.forEach(colorArr[property], function(value, key) {
     
    if(value.sizes==arrSize[i] && keepGoing==true){
      obj[key]={
              sizes : arrSize[i],
              instock : value.instock,
              color : value.color
            }
            keepGoing=false;
            arrayHere[property]=obj;
        }
    

    });

  }

  }
 $rootScope.sizeCol=arrayHere;
 //console.log(arrayHere);
 
}
*/

$scope.colorFlag=false
$scope.hoverMouse=function(color,flagLeave,colorArr,instock,gbu,sizes,dispPrior){

  if($scope.colorFlag==false && flagLeave==false){
  $scope.colorDepend=color;
  $scope.colorFlag=true;
  }
  else if(flagLeave==true){
    $scope.colorFlag=false;
    $rootScope.sizeCol={};
  }
 $rootScope.calcVariantsAtList(colorArr,color,instock,gbu,sizes,dispPrior);
}

$scope.hoverMouse2=function(color,flagg){
  if(flagg==true){
  $scope.colorDepend=color;
  }
  else{
    $scope.colorFlag=false;
    $scope.colorDepend=color;
  }
}

$scope.scrollJs=function(index1){

  setTimeout(function(){


    if($('#'+index1).next().css("display")=="none")
    {

    $('#'+index1).removeClass("plusCat");
    $('#'+index1).addClass("minusCat");
    $('#'+index1).next().slideDown("slow");

    }
   

 $(".content").mCustomScrollbar();
            
  },500);
}

$scope.StartFilterSlider=function(){


$(".tab-services h2").click(function() {

   $(".tab-services h2").removeClass("minusCat");
  $(".tab-services h2").addClass("plusCat");
  $(".tab-services h2").next().slideUp("slow");
     
    if($(this).next().css("display")=="none")
    {
    $(this).removeClass("plusCat");
  $(this).addClass("minusCat");
  $(this).next().slideDown("slow");

    }else
    {  
  $(this).removeClass("minusCat");
  $(this).addClass("plusCat");
  $(this).next().slideUp("slow");
}
  });

 $(".content").mCustomScrollbar();
            
       
   
}





$scope.replaceSpecialChar=function(mystring,toBeReplaced,withReplaced)
{
   
   var temp1 = new String(mystring);
   return temp1.replace(toBeReplaced,withReplaced);
}

$scope.checkImage=function(imageName) {
var imagePath=imageName.split('_')

var finalImage=$scope.replaceSpecialChar(imageName,imagePath[4],'Listing.jpg')
return finalImage;

}

$scope.changeFormat=function(data) {
  var modifiedData= new Array()
  angular.forEach(data, function(value, key) {
     modifiedData.push(key + ';;' + value);
  });


   return modifiedData;

}

$scope.dataInspect=function(data){
  var arr=data.split(';;');
  return parseInt(arr[1]);
}

$scope.keyfeature=function(mystring){
//console.log(mystring) 
  if(typeof(mystring)!='undefined')
  { 
  return mystring.split('||');
  }

}


$scope.parseInt=parseInt;
var rangeArray=new Array()

$scope.parseInt12=function(range){
  var flagRangeHere=false;


  if(flagRangeHere==false){
   for (var i = 0; i < $scope.rangeSlider1.length; i++) {
    //console.log($scope.rangeSlider1[i].attributeValueWithCount)
    if($routeParams.filterUrl!=undefined){
     if($scope.rangeSlider1[i].attributeName==range && $routeParams.filterUrl.indexOf('slider'+range)==-1){
      
      var keyRange=Object.keys($scope.rangeSlider1[i].attributeValueWithCount);
      var keyVals=keyRange[0].split(' - ')
      var filterRange={}
      filterRange[range]={
            max: keyVals[1],
            min: keyVals[0]
          }
      rangeArray.push(filterRange)

          
     }
     else if($routeParams.filterUrl.indexOf('slider'+range)>-1){
     // alert(range+'    '+$routeParams.filterUrl.indexOf('slider'+range))
      var filterRange={}
      
      var minMax=[];
        var arr=$routeParams.filterUrl.split('--');
        for (var i = 0; i < arr.length; i++) {
          var names=arr[i].split('=');
              if(names[0].substring(names[0].lastIndexOf('slider')+6)==range){
                minMax=names[1].split('-');
                  };
      
        }
        if(range=="salepriceperunit"){
          $scope.maxiPrice=Number(minMax[1]);
          $scope.miniPrice=Number(minMax[0]);
        }
       
        filterRange[range] = {
          max: Number(minMax[1]),
          min: Number(minMax[0])
        };

      rangeArray.push(filterRange)
      

     }
   }
   else{

    if($scope.rangeSlider1[i].attributeName==range){
      var keyRange=Object.keys($scope.rangeSlider1[i].attributeValueWithCount);
      var keyVals=keyRange[0].split(' - ')
      var filterRange={}
      filterRange[range]={
            max: keyVals[1],
            min: keyVals[0]
          }
      rangeArray.push(filterRange)

          
     }


   }
   };
   
   $scope.rangeArray1=rangeArray;
    
  }

}


$scope.chunk=function(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}


        $('#imgLoader').fadeOut('slow');
        $('#prodDivLoader2').fadeOut('slow');
        $('#prodDivLoader').fadeOut('slow');
        $('#prodDivLoader1').fadeOut('slow');
        $('#showData').show();

////////////////var cName=new Array();
      var cName1='';
      var results1=JSON.parse(window.categoryStates);
        

      if(results1.responseCode=="SUCCESS" && results1.entitiesResponse != null) 
      {
        //$log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results1.responseCode,catUrl,results1,""));
        var cName=new Array();
        var cName1='';
        var dataCategory=results1.entitiesResponse['0']['baseDTO']['categoryHierarchyWrapperDTOObj']
        for (var i = 0; i < dataCategory.length; i++) {
              cName[i]=dataCategory[i].categoryName+':'+dataCategory[i].categoryId;
              cName1=cName1+dataCategory[i].categoryName+',';
        };
        $rootScope.categoryIdList=JSON.stringify(cName);
        $rootScope.categoryIdListName=cName1;      
              


        $scope.categoryNameReplace=$routeParams.categoryName.split('-').join('_');
        $cookies.put('catId',getCategoryId($scope.categoryNameReplace,$rootScope.categoryIdList))
        $scope.categoryNameArr=$routeParams.categoryName.split('-');
        var m=$scope.categoryNameArr.length;
        if(m>2){
        $scope.parentCategory=$scope.categoryNameArr[0];
        $scope.categoryName=$scope.categoryNameArr[m-2]+': '+$scope.categoryNameArr[m-1];
        }
        else if(m==2){
          $scope.parentCategory=$scope.categoryNameArr[0];
          $scope.categoryName=$scope.categoryNameArr[1];
        }
        else{
          $scope.categoryName=$routeParams.categoryName;
        }


        if($routeParams.filterUrl==undefined || $routeParams.filterUrl==''){
              $localStorage.activeStateCount='';
              $localStorage.breadCrumbArrChange='';
              $localStorage.countFlag=false;
          if($routeParams.eventName==undefined || $routeParams.eventName==''){
            var eventName='null';
            }
            else{
            var eventName=$routeParams.eventName
            }
        //Calling the service for counts on the left side on Filters and Filter Data regarding the category   
        var filterUrlWithCount=API.BusinessUrl+API.getFilterWithCountsUrl+eventName;
        var formData={
                        "categoryId":$cookies.get('catId')
                     }
        catelougeService.getFilterWithCounts(filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {
        //Starting Loader till the data arrives
        $('#prodDivLoader2').css('display','block');    
         if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
         {
             $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),results,formData));
             $rootScope.filterArrayData=results.entitiesResponse['0']['baseDTO']['initialProductFilter']
             //StartFilterSlider() : Starts the animation of slider.
             setTimeout(function(){
               $scope.StartFilterSlider();
                },1500);
              //Creating the array for range values for the sliders.
              $scope.rangeSlider1=new Array();
              for (var i = 0; i < $rootScope.filterArrayData.length; i++) {
                if($rootScope.filterArrayData[i].attributeType=='range-slider'){
                  $scope.rangeSlider1.push($rootScope.filterArrayData[i].filterDetails[0]);
                  $scope.parseInt12($rootScope.filterArrayData[i].filterDetails[0].attributeName)
                }
              };
              $('#prodDivLoader2').fadeOut('slow');
              $scope.flagCheckBox=true;
              $('#myContent').show()
              $('#loader').hide()
              $('#catLinkCon').show()
              $('.loading').fadeOut('slow')
              $('#imgLoader').fadeOut('slow');
              $('#imgLoaderFilter').fadeOut('slow');
              
            }
            else if(results.entitiesResponse==null){
              $('#catLinkCon').show();
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),results,formData));
            }
                    
            }).
            error(function (data,status,header,config)
            {
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),data,formData));
            });

      //////FOR PRODUCTS:
      $('#imgLoader').css('display','block');
      $('#showData').hide();
        var formData={
          "categoryId":$cookies.get('catId')
        }
        

         var apiUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+eventName+'&pageNo='+0+'&noOfProductPerPage=18&sortType=price';

         $rootScope.sortType='price';
         $rootScope.pageNo=0;

         $scope.noResulFlag = false;
        $scope.getFilterAppliedConstr=function(counter){
          catelougeService.getProductByFilterApplied(apiUrl+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {

         if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
         {
            $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
            $scope.productOnTheBasisOfCategory1=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
           
            $scope.varWhichSize=$scope.intOrNot($scope.productOnTheBasisOfCategory1[0].productDetails.sizes);
            
            $scope.productOnTheBasisOfCategory = $scope.chunk($scope.productOnTheBasisOfCategory1, 3);
            $scope.productOnTheBasisOfStar=results.entitiesResponse['0']['baseDTO']['productWrapperObj'].productDetails;
            $rootScope.numberOfProducts=results.entitiesResponse['0']['baseDTO'].totalNoOfProduct;
            $('#imgLoader').fadeOut('slow');

            $('#prodDivLoader2').fadeOut('slow');
            $('#prodDivLoader').fadeOut('slow');
            $('#prodDivLoader1').fadeOut('slow');

            $scope.noResulFlag = false;
            $('#noResult').hide();

            $('#showData').show();
            setTimeout(function(){
                      window.scrollTo(100,0);
                    },1500);
            var ProductsImpArry=[];
                          for(var i=0;i<$scope.productOnTheBasisOfCategory1.length;i++){
                          var productObj={
                            'name': $scope.productOnTheBasisOfCategory1[i].productDetails.title.toString()+" "+$scope.productOnTheBasisOfCategory1[i].productDetails.subtitle.toString(),
                            'id': $scope.productOnTheBasisOfCategory1[i].gbucode.toString(),
                            'price': $scope.productOnTheBasisOfCategory1[i].salepriceperunit.toString(),
                            'brand': $scope.productOnTheBasisOfCategory1[i].productDetails.title.split(' ')[0].toString(),
                            'category': $scope.productOnTheBasisOfCategory1[i].productDetails.categoryname.toString(),
                            'variant': '',
                            'list': $routeParams.categoryName,
                            'position': i+1
                          };
                          ProductsImpArry.push(productObj);
                          } 

                          dataLayer.push({
                            'event': 'addImpression',
                              'ecommerce': {
                              'currencyCode': 'INR',
                              'impressions': ProductsImpArry
                             }
                          });
                          
         }else if(results.responseCode=='FAILURE'){
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
                $scope.noResulFlag = true;
                $('#noResult').show();
                $('#showData').show();
                $('#iffilterChecked').css("display", "block");
                     $('#unsorted').css("display", "none");
                     $('#imgLoader').fadeOut('slow');
               }
            else if(results.entitiesResponse==null){
              $scope.noResulFlag = true;
              $('#noResult').show();
              $('#showData').show();
              $('#iffilterChecked').css("display", "block");
                     $('#unsorted').css("display", "none");
            }
         $("#imgLoader5").fadeOut();
         $("#myContent5").fadeOut("slow");

    }).
     error(function (data,status,header,config)
     {
      //filterAppliedService();
      
      if(counter<2){
                    $scope.getFilterAppliedConstr(++counter);
                    }
      $("#imgLoader5").fadeOut();
         $("#myContent5").fadeOut("slow");
      $('#showData').show();
      $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,apiUrl+contentSearchGenericUrl.replace('?','&'),data,formData));
    });
     }
     $scope.getFilterAppliedConstr($scope.counterRetry);
  
}
   
      
      //This is called when any filter is applied.
      if(typeof($routeParams.filterUrl)!='undefined' && $routeParams.filterUrl!='' && $rootScope.counterFilter==1)
      { 
        $('#unsorted').css('display','none');
        $('#prodDivLoader1').show();
        $("#imgLoader5").show();
        $("#myContent5").show();
        var finalserachCriteriaObj={}
        var finalserachCriteria=new Array()
        $scope.directUrlBreadCrumbForm=new Array();
        //BREADCRUMBS and filter Service calling..
        var forBreadCrumbArray=new Array();
        var forAttributeName=new Array();
        //FOR BREADCRUMBS..
        $rootScope.counterFilter=2;
        var arr=$routeParams.filterUrl.split('--');

        for (var i = 0; i < arr.length; i++) {
          if(arr[i]!=''){
          if(arr[i].indexOf('=')> -1){
          var filterNames=arr[i].split('=');
          //joined: variable for joining filters that are from same FILTER by ';;'
          if(filterNames[0].indexOf('slider')>-1){
            var joined=filterNames[1];
          }
          else{
            if(filterNames[1].charAt(filterNames[1].length-1)=='^'){
              var joined=filterNames[1].split('^+').join(';;');
              
            }
            else{
              var joined=filterNames[1].split('-').join(';;');
            }
          }
            
           forBreadCrumbArray.push(joined);
           //MAKE an array for attr name: $rootScope.multipleProductArray
           forAttributeName.push(filterNames[0]);
           
           if(filterNames[0].indexOf('slider')>-1){
           $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0].substring(filterNames[0].indexOf('slider')+6),
                                "filterValue":joined,
                                "filterType":"range-slider",
                                "filterDataType":"float"
                                });

                var removesemicolon=joined.substring(0,joined.length-1)
                var searchCriteria22=removesemicolon.replace(';;',',')
  
                var temp11= String(filterNames[0].substring(filterNames[0].indexOf('slider')+6));
                var temp22= String(searchCriteria22);

                finalserachCriteriaObj[temp11]=temp22

                finalserachCriteria.push(finalserachCriteriaObj)

              }
              else{
                if(joined.lastIndexOf('^')>-1){
                  if(joined.indexOf('& Above')){
                    joined=joined.replace(' & Above','');
                  }
                  $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0],
                                "filterValue":joined.substring(0,joined.length-1),
                                "filterType":'range',
                                "filterDataType":'float'
                                });

                    var removesemicolon=joined.substring(0,joined.length-1)
                     var searchCriteria22=removesemicolon.replace(';;',',')
  
                     var temp11= String(filterNames[0]);
                     var temp22= String(searchCriteria22);

                     finalserachCriteriaObj[temp11]=temp22

                      finalserachCriteria.push(finalserachCriteriaObj)



                }
                else{
                $rootScope.multipleProductArray.push({
                                "filterName":filterNames[0],
                                "filterValue":joined,
                                "filterType":'discrete',
                                "filterDataType":'string'
                                });
                    

                     
                     searchCriteria2=String(joined).split(';;').join(',')
                     var temp1= String(filterNames[0]);
                     var temp2= String(searchCriteria2);
                     finalserachCriteriaObj[temp1]=temp2
                      finalserachCriteria.push(finalserachCriteriaObj)
                    }



              }

            }
            var timesSameFilter=joined.split(';;')
            for (var p = 0; p < timesSameFilter.length; p++) {
              if(timesSameFilter[p]==''){

              }
              else
              $scope.directUrlBreadCrumbForm.push(filterNames[0]);
            };
          }
        };
      
        if($localStorage.activeStateCount==undefined || $localStorage.activeStateCount=='' || $localStorage.activeStateCount=='[undefined]'){
          var arrFilterDetails=[];
        }
        else{
        var arrFilterDetails=JSON.parse($localStorage.activeStateCount);
        }
      
        var flagDeselectCount=$localStorage.countFlag
        var lastSelectedProductFilter;
        if(flagDeselectCount==true || flagDeselectCount=='true'){
          var filterSeq=JSON.parse($localStorage.breadCrumbArrChange);
        
          var lastFilterAttr=filterSeq[filterSeq.length-1];
        
        }



     
        if($localStorage.breadCrumbArrChange!=undefined){
        if($localStorage.breadCrumbArrChange.length>0){
        

        var formData={
                          "categoryId":$cookies.get('catId'),
                          "productFilters":$rootScope.multipleProductArray
                     }
        }else{
          
          $localStorage.breadCrumbArrChange=JSON.stringify($scope.directUrlBreadCrumbForm);
          var formData={
                          "categoryId":$cookies.get('catId'),
                          "productFilters":$rootScope.multipleProductArray
                        }
        }
      }
      else{
          $localStorage.breadCrumbArrChange=JSON.stringify($scope.directUrlBreadCrumbForm);
          var formData={
                          "categoryId":$cookies.get('catId'),
                          "productFilters":$rootScope.multipleProductArray
                       }
        }
       
          if($routeParams.eventName.indexOf('~') == -1){
            var filterEventname='null'
          }
            else{
              var eventnames=$routeParams.eventName.split('~');
              var filterEventname=eventnames[0];
            }
            $('#showData').hide();

            $('#prodDivLoader').fadeOut('slow');
       


            
          var filterUrlWithCount=API.BusinessUrl+API.getFilterWithCountsUrl+filterEventname;
          catelougeService.getFilterWithCounts(filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {
       if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
       {
        $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),results,formData));
            $rootScope.filterArrayData=results.entitiesResponse['0']['baseDTO']['initialProductFilter']
            
            setTimeout(function(){
             $scope.StartFilterSlider();
              },1500);
            $scope.rangeSlider1=new Array();

            for (var i = 0; i < $rootScope.filterArrayData.length; i++) {
              if($rootScope.filterArrayData[i].attributeType=='range-slider'){
                $scope.rangeSlider1.push($rootScope.filterArrayData[i].filterDetails[0]); 
                $scope.parseInt12($rootScope.filterArrayData[i].filterDetails[0].attributeName)
              }
            };
            $('#prodDivLoader2').fadeOut('slow');
            $scope.flagCheckBox=true;
            
          }
          else if(results.entitiesResponse==null){
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),results,formData));
            
          }
                  
          }).
          error(function (data,status,header,config)
          {
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,filterUrlWithCount+contentSearchGenericUrl.replace('?','&'),data,formData));
          });


          $rootScope.pageNo=0;
          $scope.noResulFilterFlag = false;
          var filterUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+filterEventname+'&pageNo='+0+'&noOfProductPerPage=18&sortType=price'/*API.URL1+API.getProductByFilterCriteria*/
          $scope.getFilterProdAppliedConstr=function(counter){
            catelougeService.getProductByFilterApplied(filterUrl+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {
             if(results.responseCode=="SUCCESS" && results.entitiesResponse!=null) 
            { 
              $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
              $rootScope.filteredProductAtFilter1=results.entitiesResponse['0']['baseDTO'].productWrapperObj
              $scope.noResulFilterFlag = false; 
              $('#noResultFilter').hide();
             // console.log($rootScope.filteredProductAtFilter);
             $scope.varWhichSize=$scope.intOrNot($scope.filteredProductAtFilter1[0].productDetails.sizes);
              $rootScope.filteredProductAtFilter=$scope.chunk($rootScope.filteredProductAtFilter1, 3);
              
/*
              $('html, body').animate({
                        scrollTop: 0
                    }, 800);*/
              
              if(results.entitiesResponse['0']['baseDTO'].totalNoOfProduct!=0){
              $rootScope.numberOfProducts=results.entitiesResponse['0']['baseDTO'].totalNoOfProduct;
             // $rootScope.filterArrayData=results.entitiesResponse['0']['baseDTO'].productFilterDisabilityCounter;
             $('#prodDivLoader2').fadeOut('slow');
             $('#prodDivLoader1').fadeOut('slow');

            $scope.rangeSlider1=new Array();
            /*for (var i = 0; i < $rootScope.filterArrayData.length; i++) {
              if($rootScope.filterArrayData[i].attributeType=='range-slider'){
                $scope.rangeSlider1.push($rootScope.filterArrayData[i].filterDetails[0]); 
                $scope.parseInt12($rootScope.filterArrayData[i].filterDetails[0].attributeName)
              }
            };*/
//////////////////////
              if($rootScope.filterArrayData!=undefined && $rootScope.filterArrayData.length>0){
              $('#catLinkCon').show();
              }
              if($rootScope.numberOfProducts<=($rootScope.filteredProductAtFilter.length*3)){
                $rootScope.stopScrollService=true;
                $('#imgLoader5').fadeOut('slow');
              }
              ///////////////////////
             
               
               $('#unsorted').css("display", "none");
               $('#unsortedFilterProSort').css("display", "block");
               $('#unsortedFilter').css("display", "block");
               $(".loading").fadeOut("slow");
               $('#imgLoader').fadeOut('slow');
               }
               else{
                  $('#prodDivLoader2').fadeOut('slow');
                  $('#prodDivLoader1').fadeOut('slow');
                 $('#unsorted').css("display", "none");
               $('#unsortedFilter').css("display", "block");

                 $('#iffilterCheckedFilter').css("display", "block");
                 //$('#unsorted').css("display", "none");
                // $('#imgLoader').fadeOut('slow');
               }
                setTimeout(function(){
                  window.scrollTo(100,0);
                },1500);
           }
           else if(results.responseCode=='FAILURE'){
            $scope.noResulFilterFlag = true;
            $('#noResultFilter').show();
            $('#prodDivLoader1').css("display", "none");
            $('#showData').show();
            $('#catLinkCon').show();
            
            //$('#iffilterCheckedFilter').css("display", "block");
                
                if(counter<2){
                    $scope.getFilterProdAppliedConstr(++counter);
                    }
                 $('#unsorted').css("display", "none");
                 $('#imgLoader').fadeOut('slow');
            $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));  
           }
           else if($routeParams.filterUrl!='' && results.entitiesResponse==null)
           {  
                 $scope.noResulFilterFlag = true;
                 $('#noResultFilter').show();
                 $('#showData').show();
                 //$('#iffilterChecked').css("display", "block");
                 $('#unsorted').css("display", "none");
                 $('#imgLoader').fadeOut('slow');
                 $('#prodDivLoader1').css("display", "none");
                 

                 $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
                
           }

          $("#imgLoader5").fadeOut();
          $("#myContent5").fadeOut("slow");
  
         }).
     error(function (data,status,header,config)
     {
      //filterAppliedService();
      
      if(counter<2){
                    $scope.getFilterProdAppliedConstr(++counter);
                    }
      $("#imgLoader5").fadeOut();
         $("#myContent5").fadeOut("slow");
      $('#showData').show();
      $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,filterUrl+contentSearchGenericUrl.replace('?','&'),data,formData));
    });
   }
   $scope.getFilterProdAppliedConstr($rootScope.counterRetry);
        
          //FOR BREADCRUMBS

      for (var i = 0; i < forBreadCrumbArray.length; i++) {
   
        if(forBreadCrumbArray[i].indexOf(';;') > -1)
        {
          var arr1=forBreadCrumbArray[i].split(';;');
          
          for (var j = 0; j < arr1.length; j++) {
           
            if(arr1[j]!=''){
              if(arr1[j].charAt(arr1[j].length-1)=='^'){
                $rootScope.breadCrumbAtFilter.push(arr1[j].substring(0,arr1[j].length-1));
              }else{
                $rootScope.breadCrumbAtFilter.push(arr1[j]);
              } 
              $rootScope.forAttributeName1.push(forAttributeName[i]);
            }
          };
          
        }
        else{
            if(forBreadCrumbArray[i].charAt(forBreadCrumbArray[i].length-1)=='^'){
                $rootScope.breadCrumbAtFilter.push(forBreadCrumbArray[i].substring(0,forBreadCrumbArray[i].length-1));
              }
              else{
                  $rootScope.breadCrumbAtFilter.push(forBreadCrumbArray[i]);
                  }
            $rootScope.forAttributeName1.push(forAttributeName[i]);
          }

      };



      }

      if(finalserachCriteria!=undefined) {
           //console.log('------------------'+finalserachCriteria)
            for(var u=0;u<finalserachCriteria.length;u++) {
              $localStorage.searchCriteria=finalserachCriteria[u]
              break;
           }
      }
      



    }
    
      
      /////doing sorting
      $scope.sorting=function(pageNo,sortType){
        //console.log(sortType+'    '+$rootScope.sortType+'  '+$rootScope.scrollService);
        if($rootScope.scrollService==true){
         // $('#imgLoader7').show();
          
        var flagSort=false;
        if($rootScope.sortType!=sortType){
          $rootScope.sortType=sortType;
          $rootScope.pageNo=pageNo;
          flagSort=true;
          $rootScope.stopScrollService=false;
          $('#imgLoaderSort').show();
        }
        else{
          $rootScope.pageNo=pageNo+1;
          
        }
        if($rootScope.stopScrollService==false){
          $rootScope.scrollService=false;
          if(flagSort==false){
            $('#moreProdDivLoader1').css("display", "block");
          }
            
          if($localStorage.breadCrumbArrChange!=undefined && $localStorage.breadCrumbArrChange!='' && $localStorage.countFlag!=undefined && $localStorage.countFlag!=''){
        
          var formData={
                          "categoryId":$cookies.get('catId'),
                          "productFilters":$rootScope.multipleProductArray/*,
                          "filterDetails":arrFilterDetails,
                          "lastSelectedProductFilter":lastSelectedProductFilter,
                          "filterSequence":JSON.parse($localStorage.breadCrumbArrChange),
                          "deselectFlag":$localStorage.countFlag*/
                        }
        }
        else{
          $localStorage.breadCrumbArrChange=JSON.stringify($scope.directUrlBreadCrumbForm);
          var formData={
                          "categoryId":$cookies.get('catId'),
                          "productFilters":$rootScope.multipleProductArray/*,
                          "filterDetails":arrFilterDetails,
                          "lastSelectedProductFilter":lastSelectedProductFilter,
                          "filterSequence":$scope.directUrlBreadCrumbForm,
                          "deselectFlag":false*/
                        }
        }

         if($routeParams.eventName==undefined || $routeParams.eventName=='' || $routeParams.eventName.indexOf('~') == -1){
       //  var filterUrl=API.URL1+API.getProductByFilterCriteria+$rootScope.pageNo+'/'+$rootScope.sortType+'/18'/*API.URL1+API.getProductByFilterCriteria*/
          var filterUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+'null&pageNo='+$rootScope.pageNo+'&noOfProductPerPage=18&sortType='+$rootScope.sortType;
          catelougeService.getProductListOnTheBasisOfFilter(filterUrl+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {
            //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+filterUrl+" ---- response ---- "+JSON.stringify(results,"");
           //$log.info("SUCCESS ---- "+filterUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
           if(results.responseCode=="SUCCESS" && results.entitiesResponse != null) 
           { 
              //console.log('SUCCESS FILTER');
              $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
              $scope.resultFilter=results.entitiesResponse['0']['baseDTO']['productWrapperObj'];
              console.log($scope.resultFilter.length);
              if($scope.resultFilter.length!=0){
              if(flagSort==true){
                $rootScope.filteredProductAtFilter1=$scope.resultFilter
              }
              else{
              for (var i = 0; i < $scope.resultFilter.length; i++) {
                $rootScope.filteredProductAtFilter1.push($scope.resultFilter[i]);
              };
            }
            $rootScope.filteredProductAtFilter=$scope.chunk($rootScope.filteredProductAtFilter1,3)
              if($rootScope.numberOfProducts<=($rootScope.filteredProductAtFilter.length*3)){
                $rootScope.stopScrollService=true;
              }

              }
              $rootScope.scrollService=true;
               $(".loading").fadeOut("slow");
               $('#moreProdDivLoader1').css("display", "none");
               $('#imgLoader').fadeOut('slow');
               $('#imgLoaderSort').fadeOut('slow');
                
           }
           else if(results.responseCode=='FAILURE'){
              $('#imgLoaderSort').fadeOut('slow');
              $('#moreProdDivLoader1').css("display", "none");
              $('#iffilterChecked').css("display", "block");
              $('#unsorted').css("display", "none");
              $('#imgLoader').fadeOut('slow');
              $('#imgLoaderSort').fadeOut('slow');
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
           }
           else if($routeParams.filterUrl!='' && results.responseCode==null)
           {
                $('#imgLoaderSort').fadeOut('slow');
                 $('#iffilterChecked').css("display", "block");
                 $('#unsorted').css("display", "none");
                 $('#imgLoader').fadeOut('slow');
                 $('#moreProdDivLoader1').css("display", "none");
                 $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
           }
           
         });
      }
      else{
        var eventNames=$routeParams.eventName.split('~');
          var filterUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+eventNames[0]+'&pageNo='+$rootScope.pageNo+'&noOfProductPerPage=18&sortType='+$rootScope.sortType;
          catelougeService.getProductListOnTheBasisOfFilter(filterUrl+contentSearchGenericUrl.replace('?','&'),formData).success(function (results) {
           //$log.info("SUCCESS ---- "+filterUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
           if(results.responseCode=="SUCCESS") 
           { 
            $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
              $scope.resultFilterAtExposure=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
              if(flagSort==false){
                for (var i = 0; i < $scope.resultFilterAtExposure.length; i++) {
                $rootScope.filteredProductAtFilter1.push($scope.resultFilterAtExposure[i]);
                };
              }
              else
              {
                /*for (var i = 0; i < $scope.resultFilterAtExposure.length; i++) {
                $rootScope.filteredProductAtFilter1=$scope.resultFilterAtExposure;
                };*/
                $rootScope.filteredProductAtFilter1=$scope.resultFilterAtExposure
              } 
              $rootScope.filteredProductAtFilter=$scope.chunk($rootScope.filteredProductAtFilter1,3);
               $('#product').show();
               $('#myproduct').hide();
               $('#mycategory').hide();
               $('#dataNotAvailable').css("display", "none");
               $('#unsorted').css("display", "none");
               $('#unsortedFilter').css("display", "block");
               $('#outStock').css("display","none");
               $('#inStock').css("display","none");
               $(".loading").fadeOut("slow");
               $('#imgLoader5').fadeOut('slow');
               $('#imgLoader').fadeOut('slow');
               $('#imgLoaderSort').fadeOut('slow');
               $('#moreProdDivLoader1').css("display", "none");
                $rootScope.scrollService=true;
           }
           else if(results.responseCode=='FAILURE'){
            $('#moreProdDivLoader1').css("display", "none");
            $('#imgLoaderSort').fadeOut('slow');
            $('#iffilterChecked').css("display", "block");
                 $('#unsorted').css("display", "none");
                 $(".loading").fadeOut("slow");
               $('#imgLoader5').fadeOut('slow');
               $('#imgLoader').fadeOut('slow');
               $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
           }
           else if($routeParams.filterUrl!='' && results.entitiesResponse==null)
           {
                  $('#moreProdDivLoader1').css("display", "none");
                 $('#imgLoaderSort').fadeOut('slow');
                 $('#iffilterChecked').css("display", "block");
                 $('#unsorted').css("display", "none");
                 $(".loading").fadeOut("slow");
               $('#imgLoader5').fadeOut('slow');
               $('#imgLoader').fadeOut('slow');
               $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,filterUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
           }
           
           $(".loading").fadeOut("slow");
               $('#imgLoader').fadeOut('slow');
               $('#imgLoaderSort').fadeOut('slow');
          });
      }
     }
    }  
      
    }

      /////


       $scope.withoutFilterScroll=function(pageNo,sortType){
        //console.log(pageNo+'    '+$rootScope.scrollService);
        if($rootScope.scrollService==true){
          
        $('#imgLoader2').show();
        var flagSort=false;
        if($rootScope.sortType!=sortType){

          $('#prodDivLoader1').css('display','block');
          $rootScope.sortType=sortType;
          $rootScope.pageNo=0;
          flagSort=true;
          $rootScope.stopScrollService=false;
          $('#imgLoaderSort').show();
        }
        else{
          $rootScope.pageNo=pageNo+1;
          // alert('hey')
          
        }
        if(flagSort==false){
            $('#moreProdDivLoader').css("display", "block");
          }
          $rootScope.scrollService=false;
        if($routeParams.eventName==undefined || $routeParams.eventName==''/* || $routeParams.eventName.indexOf('~') == -1*/){
          var formData={
            "categoryId":$cookies.get('catId')
          }
       
          var apiUrl=API.BusinessUrl+API.getProductByFilterAppliedUrl+'null&pageNo='+$rootScope.pageNo+'&noOfProductPerPage=18&sortType='+$rootScope.sortType;
          catelougeService.getProductByFilterApplied(apiUrl+contentSearchGenericUrl.replace('?','&'), formData).success(function (results) {
            //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+apiUrl+" ---- response ---- "+JSON.stringify(results,"");
            // $log.info("SUCCESS ---- "+apiUrl+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
             if(results.responseCode=="SUCCESS") 
             {
                $scope.productOnTheBasisOfCategory2=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
                $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
                if(flagSort==false){
                for (var i = 0; i < $scope.productOnTheBasisOfCategory2.length; i++) {
                $scope.productOnTheBasisOfCategory1.push($scope.productOnTheBasisOfCategory2[i]);
                };
                }
                else if(flagSort==true){
                  $scope.productOnTheBasisOfCategory1=$scope.productOnTheBasisOfCategory2;
                }
                $scope.productOnTheBasisOfCategory = $scope.chunk($scope.productOnTheBasisOfCategory1, 3);
                $('#prodDivLoader1').fadeOut('slow');
                $('#imgLoaderSort').fadeOut('slow');
                $('#imgLoader2').fadeOut('slow');
                  $('#moreProdDivLoader').fadeOut('slow');
                
             }
             else if(results.responseCode=="FAILURE"){
              $('#imgLoaderSort').fadeOut('slow');
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,apiUrl+contentSearchGenericUrl.replace('?','&'),results,formData));
             }
             $rootScope.scrollService=true;
        }).
         error(function (data,status,header,config)
         {
          $('#imgLoaderSort').fadeOut('slow');
          $('#imgLoader2').fadeOut('slow');
          $rootScope.scrollService=true;
          //$log.error(" status "+status+" header "+header+" config "+JSON.stringify(config));
          $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,apiUrl+contentSearchGenericUrl.replace('?','&'),data,formData));
        });
       }
       else{
        var formData={
        "categoryId":$cookies.get('catId')
        }
        var allBestDeal=API.BusinessUrl+API.getProductByFilterAppliedUrl+$routeParams.eventName+'&pageNo='+$rootScope.pageNo+'&noOfProductPerPage=18&sortType='+$rootScope.sortType;
        catelougeService.getProductByFilterApplied(allBestDeal+contentSearchGenericUrl.replace('?','&'), formData).success(function (results) {
             //$log.info("SUCCESS ---- "+allBestDeal+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
             if(results.responseCode=="SUCCESS") 
             {
                $scope.productOnTheBasisOfCategory2=results.entitiesResponse['0']['baseDTO']['productWrapperObj']
                $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,allBestDeal+contentSearchGenericUrl.replace('?','&'),results,""));  
                if(flagSort==false){
                for (var i = 0; i < $scope.productOnTheBasisOfCategory2.length; i++) {
                $scope.productOnTheBasisOfCategory1.push($scope.productOnTheBasisOfCategory2[i]);
                };
                }
                else if(flagSort==true){
                  $scope.productOnTheBasisOfCategory1=$scope.productOnTheBasisOfCategory2;
                }
                $scope.productOnTheBasisOfCategory = $scope.chunk($scope.productOnTheBasisOfCategory1, 3);
                $('#prodDivLoader1').fadeOut('slow');
                $('#imgLoaderSort').fadeOut('slow');
                $('#imgLoader2').fadeOut('slow');
                  $('#moreProdDivLoader').fadeOut('slow');
                
             }
             else if(results.responseCode=="FAILURE"){
              $('#imgLoaderSort').fadeOut('slow');
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,allBestDeal+contentSearchGenericUrl.replace('?','&'),results,""));
             }
             $rootScope.scrollService=true;
        }).
         error(function (data,status,header,config)
         {
          $('#imgLoaderSort').fadeOut('slow');
          $('#imgLoader2').fadeOut('slow');
          $('#moreProdDivLoader').css("display", "none");
          $rootScope.scrollService=true;
          $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,allBestDeal+contentSearchGenericUrl.replace('?','&'),data,""));
        });

       }
      }
    }


//////

$scope.$watch(function() {
  if($scope.flagCheckBox==true){
    $('.loadingggg').fadeOut('slow');
  }
  var flaggy = false;
//  console.log($rootScope.flaggy+' Here');
  if($rootScope.flaggy==false && typeof($routeParams.filterUrl)!='undefined'){
   
  var arrFilters=$routeParams.filterUrl.split('--')
  var alreadyOpenBox='';
 // console.log(arrFilters+' LENGTH: '+arrFilters.length);

  //////////
                 if($routeParams.filterUrl!=undefined){
                 var idFilterFull=$routeParams.filterUrl.split('--');
                  
                  for (var i = 0; i < idFilterFull.length; i++){ 
                  
                  
                  var idFilterSplit=idFilterFull[i].split('=');
                  // console.log(idFilterSplit);
                  if(idFilterSplit[0].indexOf('slider')>-1){
                  idFilterSplit[0]=idFilterSplit[0].substring(idFilterSplit[0].indexOf('slider')+6);
                  
                  }
                 if(document.getElementById(idFilterSplit[0])){
                  var idSlide=$('#'+idFilterSplit[0]).next().attr('class');
//                  console.log(idSlide);
                  //$('.myOrderSubNav').addClass('active');
                  $('.'+idSlide).toggle('fast');
               //  $scope.StartFilterSlider();
                  
                  $scope.scrollJs(idFilterSplit[0]);
//                 console.log(idFilterSplit[0]+' jcdhgchdcnd');
               //   $('#'+idFilterSplit[0]).addClass('active');



                 if(idFilterSplit!=""){
                 if(idFilterSplit[1].charAt(idFilterSplit[1].length-1)!='^'){
                 var idFilterNameReplace=idFilterSplit[1].replace(/\^--|--/g,'');
                 var idFilterNameArr=idFilterNameReplace.split('-');
               
                 }
                 else{
                  var idFilterNameReplace=idFilterSplit[1].replace(/\^--|--|\^/g,'');
                 var idFilterNameArr=idFilterNameReplace.split('+');
                
                 }

                 $('input[name='+idFilterSplit[0]+']').each(function(){

                  if($routeParams.filterUrl!=undefined){
                  
                  var idFilter=$(this).attr('id');
                  //console.log(idFilter+' '+idFilterNameArr[0]+'-'+idFilterSplit[0]+' '+idFilterNameArr[1]);
                  //console.log(idFilterNameArr)
                  //console.log(idFilterNameArr.length);
                  for (var j = 0; j < idFilterNameArr.length; j++) {
                      //console.log('Heyaaaaaaa1111111 '+idFilter);
                    if((idFilterNameArr[j]+'-'+idFilterSplit[0])==idFilter){
                      //console.log('Heyaaaaaaa');
                      document.getElementById(idFilter).checked=true;
                      // $("#"+idFilter).prop('checked',true);
                      break;
                    }
                  };
                }
                  
                  
                  
                   });

                  //   $(".demo").customScrollbar();
                  // $("#fixed-thumb-size-demo").customScrollbar({fixedThumbHeight: 50, fixedThumbWidth: 60});

                   }
                   flaggy=true;
                  
                   $scope.countCheck=$scope.countCheck+1;
                  }
                 }
                 

                 
                 //console.log(k)
              if(flaggy==true && $scope.countCheck==2){
                $rootScope.flaggy=true;
               }
 }
 }

});

//////

      $scope.filterSlideAtCategory=function(id1, attrName){
                if ($('#'+attrName).next().next().css('display') == 'block') 
                {
                  $('#slide'+id1).toggle('fast');
                  $('#'+attrName).removeClass('active');
                 // $('.myOrderSubNav').removeClass('active');

                 $('#'+attrName).next().css('display','none');
                 if($routeParams.filterUrl!=undefined){
                 var idFilterFull=$routeParams.filterUrl.split('--');
               
                  for (var i = 0; i < idFilterFull.length; i++){ 
                   
                 
                  var idFilterSplit=idFilterFull[i].split('=');
                 
                 if(idFilterSplit!=""){
                 if(idFilterSplit[1].charAt(idFilterSplit[1].length-1)!='^'){
                 var idFilterNameReplace=idFilterSplit[1].replace(/\^--|--/g,'');
                 var idFilterNameArr=idFilterNameReplace.split('-');
               
                 }
                 else{
                  var idFilterNameReplace=idFilterSplit[1].replace(/\^--|--|\^/g,'');
                 var idFilterNameArr=idFilterNameReplace.split('+');
                
                 }

                 $('input[name='+attrName+']').each(function(){

                  if($routeParams.filterUrl!=undefined){
                  
                  var idFilter=$(this).attr('id');
                  //console.log(idFilter+' '+idFilterNameArr[0]+'-'+idFilterSplit[0]+' '+idFilterNameArr[1]);

                  for (var i = 0; i < idFilterNameArr.length; i++) {
                    if((idFilterNameArr[i]+'-'+idFilterSplit[0])==idFilter){
                    
                      $("[id='"+idFilter+"']").prop('checked',true);
                    }
                  };
                }
                  
                  
                  
                   });


                 
                 
                   }
                  }
                 }

                } 
                else 
                {
                  $('.future-clm').find('slide'+id1).hide('fast');
                  /*$('#clearEach'+id1).css('display','block');
                  $('#clearEach'+id1).addClass('clrFltIcon');*/

                 //   $('.future-clm .ft-list').hide('fast');
                 $('#slide'+id1).toggle('fast');
                 //  console.log('clear'+id1);
                 
                 if($('#'+attrName).hasClass("active")){
                  $('#'+attrName).removeClass('active');
                 }
                 else{
                  $('#'+attrName).addClass('active');
                 }
                
                $('#'+attrName).next().css('display','block');

                }
                  
                  $(".demo").customScrollbar();
                  $("#fixed-thumb-size-demo").customScrollbar({fixedThumbHeight: 50, fixedThumbWidth: 60});
                  $('.myOrderSubNav').click(function() {
                      
                      $('div').find(".ngrs-value-min").removeClass('ng-hide').addClass('ng-show');
                      $('div').find(".ngrs-value-max").removeClass('ng-hide').addClass('ng-show');
                     $(".demo").customScrollbar();
                     $("#fixed-thumb-size-demo").customScrollbar({fixedThumbHeight: 50, fixedThumbWidth: 60});
                  });




        };

////

$scope.clearFilter=function(attributeNameForClear){
  if($routeParams.filterUrl!=undefined){

  var arr=$routeParams.filterUrl.split('--');
          console.log(arr.length+' array Length');
          
          for (var i = 0; i < arr.length; i++) {
            
     
          if(arr[i]!=''){
            
            var moreValue=true;
          }
          
          if(arr[i].split('=')[0]==attributeNameForClear || arr[i].split('=')[0].substring(arr[i].split('=')[0].indexOf('slider')+6)==attributeNameForClear){
            arr.splice(i,1)
          }
         
      }
      var breadCrumbArrChange=new Array();
          if($localStorage.breadCrumbArrChange!=undefined && $localStorage.breadCrumbArrChange!=''){
            breadCrumbArrChange=JSON.parse($localStorage.breadCrumbArrChange)
          }
      for (var i = breadCrumbArrChange.length-1; i >= 0; i--) {
              //console.log('I');
              if(breadCrumbArrChange[i]==attributeNameForClear){
                breadCrumbArrChange.splice(i,1);
              }
              
            };

            $localStorage.breadCrumbArrChange=JSON.stringify(breadCrumbArrChange);
      var abcd=arr.join('--')
      console.log(arr);
      console.log(abcd);
      var changeUrl='/'+abcd;

      var myFilterUrl='';
      if($routeParams.eventName==undefined){
              myFilterUrl=$routeParams.categoryName+'-listing/filter'+changeUrl;
            }else if($routeParams.eventName.indexOf('~filter')==-1 && $routeParams.eventName!='filter'){
              myFilterUrl=$routeParams.categoryName+'-listing/'+$routeParams.eventName+'~filter'+changeUrl;
            }
            else{
              myFilterUrl=$routeParams.categoryName+'-listing/'+$routeParams.eventName+changeUrl;
            }

      if(abcd==''){
        //console.log('Yaay')
        myFilterUrl=$routeParams.categoryName+'-listing';
      }
    
      window.location.href=myFilterUrl+'/lst'
    }
}

/////////

var tickBoxArray=new Array();

//var  finalCookie=$cookies.put('tickBoxArr',tickBoxArray)
$scope.filterAtCategory=function(clearType,dataType,filterCriteria,type,attributeName,activeStateCount,min,max,handel)
{ /*var currentdate=new Date();
 alert(currentdate.getSeconds()+" : "+currentdate.getMilliseconds());*/
  if(min>max) {
    min=max;
  };
// console.log(clearType+' fCriteria: '+filterCriteria+' type: '+type+'attrName '+attributeName+' activeStateCount: '+activeStateCount)
 //console.log(activeStateCount);

    var countFlag=false;
 $("#imgLoader1").show();
 $("#myContent1").show();

  if($rootScope.counterCheckBox==false){
  //  console.log('8072')
  $rootScope.counterCheckBox=true;
 // alert(clearType+'fCriteria '+filterCriteria+' '+type+'attrName: '+attributeName+' '+min+max+handel);
  // var arrayForTick=new Array();
  
          var arrFilter=new Array();
         /* if(window.location.href.indexOf(attributeName) > -1){
            arrFilter=window.location.href.split('=');
            console.log(arrFilter);

            }*/

          var myFilterUrlFirst=window.location.href;

          //console.log(myFilterUrlFirst)
       
          var lasturl=myFilterUrlFirst.substring(0,window.location.href.lastIndexOf('/'));
          var myFilterUrl=lasturl.substring(lasturl.lastIndexOf('/'));
          var flagUrl=true;
          var changeUrl='';
          if($routeParams.filterUrl!=undefined)
          {
          var arr=$routeParams.filterUrl.split('--');
          //console.log(arr.length+' array Length');
          
          for (var i = 0; i < arr.length; i++) {
            
     
          if(arr[i]!=''){
            //console.log("8099");
            var moreValue=true;

          if(myFilterUrl.indexOf('=')> -1){
          var filterNames=arr[i].split('=');
          //console.log('8104'+filterNames[0]+' attributeName '+attributeName)
          if(filterNames[0]==attributeName || filterNames[0]=='slider'+attributeName){
            //console.log('8106')
            moreValue=false;
            var newAddFilter='';
            //console.log(filterNames[1]+'     '+filterCriteria);
            
            var flagFilterDash=false;
            var filtersDash=filterNames[1].split('-');
           
            if(filterNames[0].indexOf('slider')){
            
              for (var m = 0; m < filtersDash.length; m++) {
                if(filtersDash[m]==filterCriteria){
                  flagFilterDash=true;
                }
                else{
                 // console.log(filtersDash[m]);
                  newAddFilter=newAddFilter+filtersDash[m]+'-';
                }

              };
            }
              newAddFilter.trim();
              /*alert(newAddFilter.charAt(newAddFilter.lastIndexOf('-')));
              newAddFilter.replace(newAddFilter.charAt(newAddFilter.lastIndexOf('-')),'');*/
              
              var a=newAddFilter.lastIndexOf('-');
              
              newAddFilter=newAddFilter.substring(0,a);
             
              if(filterNames[1].indexOf('+')>-1 || filterNames[1].indexOf('^')>-1 || filterNames[0].indexOf('slider')>-1){
                flagFilterDash=true;
              }
            if(filterNames[1].indexOf(filterCriteria)>-1 && flagFilterDash==true){
              //console.log('8110');

              if(filterNames[1].indexOf(filterCriteria)==0){
              //  alert(filterNames[0]+'='+filterCriteria+'--7678');
              
                if(filterNames[1].indexOf('+')>-1)
                {
                newAddFilter=filterNames[1].replace(filterCriteria+'^+','');
                //console.log('HEY');
                }
                else if(filterNames[1].indexOf('^')>-1){
                 //console.log('HEY');
                  newAddFilter=filterNames[1].replace(filterCriteria+'^','');
                  countFlag=true;
                 // alert('going1');
                }
                else{
                  countFlag=true;
                }

               
              }
              else{
                if(dataType=='range-slider'){
                newAddFilter=filterNames[1].replace(filterNames[1],min+'-'+max);
                }
                else{
                 // alert(filterNames[1]);
                 ////console.log('8137')
                if(filterNames[1].indexOf('+')>-1)
                {
                newAddFilter=filterNames[1].replace(filterCriteria+'^+','');
                if(newAddFilter==filterNames[1]){
                  newAddFilter=filterNames[1].replace('+'+filterCriteria+'^','');
                }
                //alert('HELLO 2 '+newAddFilter);
                countFlag=true;
                //console.log('HEY');
                }
                else if(filterNames[1].indexOf('^')>-1){
                 //alert('HEY 2');
                 //console.log('8149')
                  newAddFilter=filterNames[1].replace(filterCriteria+'^','');
                  countFlag=true;
                }
                else
                newAddFilter=filterNames[1].replace('-'+filterCriteria,'');
                countFlag=true;
                //console.log('HEY 8349');
              //  alert(newAddFilter+' NEW ADD FILTER')
                }
             // alert('HEYA')
              }
             // newAddFilter=names[1].substring(names[1].indexOf(filterCriteria),filterCriteria.length);
             
            }
            else{
              ////console.log('8164 '+filterNames[1]+'-'+filterCriteria);
              if(type=='range' && dataType!='range-slider'){
                newAddFilter=filterNames[1]+'+'+filterCriteria
              }
              else
               newAddFilter=filterNames[1]+'-'+filterCriteria
            }
            if(newAddFilter!=''){
              if(dataType=='range-slider'){
             
                var joined=filterNames[1].replace(filterNames[1],min+'-'+max);
                
                }
                else{
                  
                var joined=filterNames[1].replace(filterNames[1],newAddFilter);
                }
            if(type=='range'  && dataType!='range-slider'){    
              if(joined.indexOf('^')>-1 && joined.indexOf('+')== -1)
              changeUrl='/'+changeUrl+filterNames[0]+'='+joined+'--';
              else
                changeUrl='/'+changeUrl+filterNames[0]+'='+joined+'^--';
            //  alert('HEya '+ changeUrl);
            }
            else{
              changeUrl='/'+changeUrl+filterNames[0]+'='+joined+'--';
              }
            }
            else{
              
              
                 var joined=filterNames[1].replace(filterNames[1],newAddFilter);
                
              changeUrl='/'+changeUrl;

            }
           
            flagUrl=false;
            // changeUrl='/'+changeUrl+names[0]+'='+joined+'--';

          }
          else if(flagUrl==true){
            // flagUrl=false;
            if($routeParams.filterUrl.indexOf(attributeName) > -1){
              
            }
            else{
              moreValue=false;
              if(dataType=='range-slider'){
           
                joined='slider'+attributeName+'='+min+'-'+max+'--';
              }
              else{
                if(type=='range' && dataType!='range-slider'){
                joined=attributeName+'='+filterCriteria+'^--';
                }
                else
                {
                  joined=attributeName+'='+filterCriteria+'--';
                }
              }
            changeUrl=myFilterUrl+joined;
            }
          }
          if(moreValue==true){
            // if(attributeName==salepriceperunit){
            //  // changeUrl=changeUrl+
            // }

             changeUrl=changeUrl+filterNames[0]+'='+filterNames[1]+'--';
              
            
           
           
          }
          
          //changeUrl=names[0]+'='+joined+'--';
          
            }
          }

        };
        
      }
      else{
        if(dataType=='range-slider'){
      // alert("FIRST TIME 7802");
       changeUrl='/slider'+attributeName+'='+min+'-'+max+'--';
      
      }else{
           // alert("FIRST TIME");
            if(type=='range'){
              changeUrl='/'+attributeName+'='+filterCriteria+'^--';
            }else
            changeUrl='/'+attributeName+'='+filterCriteria+'--';
        }
        

      }
          

          /*if(changeUrl.indexOf('--') > -1 && type=='range'){
            changeUrl=changeUrl.replace('--','^--')
          }*/
        //  alert('myFilterUrl '+myFilterUrl+' changeUrl '+changeUrl);

          if(changeUrl=='/'){
            myFilterUrl=$routeParams.categoryName+'-listing/';
            
            $cookies.remove('tickBoxArr');
          }
          else{
            if(changeUrl.charAt(0)!='/'){
              changeUrl='/'+changeUrl;
            }

            console.log($routeParams.categoryName+' CATEGORY NAME');
            if($routeParams.eventName==undefined){
              myFilterUrl=$routeParams.categoryName+'-listing/filter'+changeUrl;
            }else if($routeParams.eventName.indexOf('~filter')==-1 && $routeParams.eventName!='filter'){
              myFilterUrl=$routeParams.categoryName+'-listing/'+$routeParams.eventName+'~filter'+changeUrl;
            }
            else{
              myFilterUrl=$routeParams.categoryName+'-listing/'+$routeParams.eventName+changeUrl;
            }
          
          }

          //should I send count or not
          /*alert(countFlag)*/
          ////console.log($localStorage.breadCrumbArrChange);
          var breadCrumbArrChange=new Array();
          if($localStorage.breadCrumbArrChange!=undefined && $localStorage.breadCrumbArrChange!=''){
            breadCrumbArrChange=JSON.parse($localStorage.breadCrumbArrChange)
          }


         /* alert(countFlag);*/
     
          if(countFlag==true){
            //console.log('8220')
            $localStorage.activeStateCount=[];
          //  alert(countFlag);
            //console.log('8222')
            var flagOneBreadCrumb=false;
            for (var i = breadCrumbArrChange.length-1; i >= 0; i--) {
             // console.log('I');
              if(breadCrumbArrChange[i]==attributeName && dataType!='range-slider'){
                breadCrumbArrChange.splice(i,1);
                break;
              }
              else if((dataType=='range-slider') && breadCrumbArrChange[i]==attributeName){
                breadCrumbArrChange.splice(i,1);
              }
             /* alert('ufgvfhfbvhfhvfbhvbfhvbhbvhf');*/
            };
            //console.log('8228')
            
          }
          else if(countFlag==false && activeStateCount!='breadCrumb'){
           // console.log(activeStateCount);
             $localStorage.activeStateCount='['+JSON.stringify(activeStateCount)+']';
             //console.log($localStorage.activeStateCount);
             breadCrumbArrChange.push(attributeName);
             
             /*alert('I am here');*/
          }else if(activeStateCount=='breadCrumb'){
            // console.log('8220')
            $localStorage.activeStateCount=[];
            // console.log('8222')
            for (var i = breadCrumbArrChange.length-1; i >= 0; i--) {
              //console.log('I');
              if(breadCrumbArrChange[i]==attributeName){
                breadCrumbArrChange.splice(i,1);
                break;
              }
              /*alert('Hey I amzzzzzz')*/
            };
            //console.log('8228')
            

          }
         // alert('countFLAG '+countFlag);
          $localStorage.breadCrumbArrChange=JSON.stringify(breadCrumbArrChange);
          $localStorage.countFlag=countFlag;
            if(myFilterUrl.lastIndexOf('/')==myFilterUrl.length-1){
            window.location.replace('/'+myFilterUrl+'lst');
             //window.location.href=myFilterUrl+'lst'
            }
            else{
              window.location.replace('/'+myFilterUrl+'/lst');
              // window.location.replace('/'+myFilterUrl+'lst');
            }
            $rootScope.counterCheckBox=false;

      }
  }

/////

$scope.stockFn=function(stockFilter)
{
  if(stockFilter=='out'){
    $('#product').show();
               $('#myproduct').hide();
               $('#mycategory').hide();
               $('#dataNotAvailable').css("display", "none");
               $('#unsorted').css("display", "none");
               $('#outStock').css("display","block");
               $('#inStock').css("display","none");
               $('#unsortedFilter').css("display", "none");
               $('#popularFilter').css("display", "none");
               $('#newDateFilter').css("display", "none");
               $('#discountFilter').css("display", "none");
               $('#priceLowFilter').css("display", "none");
               $('#priceHighFilter').css("display", "none");
               $(".loading").fadeOut("slow");
               $('#imgLoader').fadeOut('slow');

  }
  else if(stockFilter=='in'){
               $('#product').show();
               $('#myproduct').hide();
               $('#mycategory').hide();
               $('#dataNotAvailable').css("display", "none");
               $('#unsorted').css("display", "none");
               $('#outStock').css("display","none");
               $('#inStock').css("display","block");
               $('#unsortedFilter').css("display", "none");
               $('#popularFilter').css("display", "none");
               $('#newDateFilter').css("display", "none");
               $('#discountFilter').css("display", "none");
               $('#priceLowFilter').css("display", "none");
               $('#priceHighFilter').css("display", "none");
               $(".loading").fadeOut("slow");
               $('#imgLoader').fadeOut('slow');

  }
}

/////

////

 $scope.zoom=function(){
    if($scope.notZoom==true){
    $scope.notZoom=false;
    //console.log('heyyyyy');
   
      setTimeout(function(){
       
            var last_slide_pos="";    
           
            //var $ =jQuery.noConflict();
            //$(document).ready(function(){

            /**************Reload inner zoom**************/
            $(window).resize(function () {
            $('.im-zoom').removeData('elevateZoom');//remove zoom instance from image
            $('.zoomWrapper img.zoomed').unwrap();
            $('.zoomContainer').remove();
            //last_slide_pos.find("img").elevateZoom({ zoomType : "inner", cursor: "crosshair" });
            });
            /************End Reload inner zoom****************/


            //$('.image1').elevateZoom({ zoomType : "inner", cursor: "crosshair" });

            var slides =  $('.slider4').bxSlider({
            slideWidth: 490,
            maxSlides: 3,
            minSlides: 2,
            moveSlides: 1,
            slideMargin: 0,
            onSliderLoad: function(current_index){
            $('.slider4').find(".slide:not(.bx-clone)").eq(0).addClass('active');



            },
            onSlideAfter: function(current_element,old_element,current_element_index) {

            $('.im-zoom').removeData('elevateZoom');//remove zoom instance from image
            $('.zoomWrapper img.zoomed').unwrap();
            $('.zoomContainer').remove();
            //current_element.find("img").elevateZoom({ zoomType : "inner", cursor: "crosshair" });
            last_slide_pos=current_element;
            $(".slide").removeClass("active");
            current_element.addClass("active");
            },
            onSlideBefore: function(current_element,old_element,current_element_index) {

            $('.im-zoom').removeData('elevateZoom');//remove zoom instance from image
            $('.zoomWrapper img.zoomed').unwrap();
            $('.zoomContainer').remove();


            //current_element.find("img").elevateZoom({ zoomType : "inner", cursor: "crosshair" });

            last_slide_pos=current_element;

            $(".slide").removeClass("active");
            current_element.addClass("active");

            }

            });
            $(".img-thumb").click(function(){
            var pagerVal = parseInt($(this).attr('data-imgCount'));
            slides.goToSlide(pagerVal, 'next');
            });

            $(".imgmain").click(function(){
            var pagerVal = parseInt($(this).attr('data-imgCount'));
            //alert(pagerVal);
            //slidesNew.goToSlide(pagerVal, 'next');
            });

             $('.image1').elevateZoom({ zoomType : "inner", cursor: "crosshair" });

             },1500)
            //});
      }
    }



$scope.notZoom=true
$scope.storingScopeAtFilter=function(gCode,pName){
    $rootScope.onlyOnce=true;
    $rootScope.sizeAttr=[];
    $scope.dataDisplayAtPop=false;
    $rootScope.vendorSalePricePerUnit="";
    $rootScope.availVariants="";
    $rootScope.proDes="";
    $rootScope.proDesAttr="";
    $('#shopPopPrd1').hide();
    $('#popUpCartLoader').show();
    $('.outOfStock').hide();
    $('#notverifyspan').css("display","none");
    $('#verifyspan').css("display","none");
    
    
    var GbuCode=gCode;
      var productName=pName;
      var formData={
              "productname": productName,
              "gbucode":GbuCode
          };
    $scope.downVendor=[];
    $scope.bigImage=[];
    $rootScope.seletedGbu=gCode  
    var postProductDescription=API.BusinessUrl+API.postProductByProductNameUrl

    catelougeService.postProductByProductName(postProductDescription+contentSearchGenericUrl,formData).success(function (results) {
      //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+postProductDescription+" ---- response ---- "+JSON.stringify(results,"");
      //$log.info("SUCCESS ---- "+postProductDescription+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
      if(results.responseCode=="SUCCESS") 
      {
          $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,postProductDescription+contentSearchGenericUrl,results,formData));
            $('#shopPopPrd1').show();
            //console.log(results.entitiesResponse['0']['baseDTO']['attributes']['miscellaneous'])
            $rootScope.proDesAttr=results.entitiesResponse['0']['baseDTO']['attributes']
            $rootScope.inStock=results.entitiesResponse['0']['baseDTO']['attributes']['InStock']
            $rootScope.proDes=results.entitiesResponse['0']['baseDTO']['attributes']['miscellaneous']
            $rootScope.productDesGenFeature=results.entitiesResponse['0']['baseDTO']['attributes']['General Features']
            $rootScope.origColorImg=$rootScope.proDes.Colorimage;
            $rootScope.origSize=$rootScope.proDes.Size;
            $rootScope.origInstock=$rootScope.proDes.instock;
            $rootScope.origGbuCode=$rootScope.proDes.gbucode;
            $rootScope.origProductName=$rootScope.proDes.productname;

            $rootScope.productDescriptionCartImage=$rootScope.proDes.displayimage
            $rootScope.subTitle=$rootScope.proDes.brandname+'_'+$rootScope.proDes.productname+'_'+$rootScope.proDes.modelname
           if(results.entitiesResponse['0']['baseDTO']['availableVarientsDTO']!=undefined) {
              $rootScope.availVariants=results.entitiesResponse['0']['baseDTO']['availableVarientsDTO'].gbuCodeVarientMapping;
              $rootScope.sizeAttr=results.entitiesResponse['0']['baseDTO']['availableVarientsDTO'].colorImageVarientMapping;
              $rootScope.staticColorsImg=[];
              $rootScope.staticSizes=$rootScope.sizeAttr;
        
              $rootScope.staticColorsImg.push($rootScope.proDes.Colorimage+'||'+$rootScope.origGbuCode);
              for(prop in $rootScope.availVariants){
                $rootScope.staticColorsImg.push($rootScope.availVariants[prop].colorimage+'||'+prop);

              }

                  
            }
            
            if($rootScope.origSize==undefined){
            $rootScope.availVariants[$rootScope.origGbuCode]={
                "color":"black",
                "colorimage":$rootScope.origColorImg
              }

            }
            $rootScope.disableAddToCartButton=false
            for(var r=0; r<$rootScope.cartItemSummary.length;r++){
                  //console.log($rootScope.cartItemSummary[r].gbuCode)
                  if(GbuCode==$rootScope.cartItemSummary[r].gbuCode) {
                   //alert('Product already exists in your car, you can change quantity from cart-page.')
                   $rootScope.disableAddToCartButton=true;
                   break;

                  }

            }  
            
            //console.log($rootScope.proDes.productname);

            $rootScope.proImagesThumbnail=$rootScope.proDes.largeimage.split(',');
            $rootScope.proImagesDisplay=$rootScope.proDes.displayimage.split(',');
            //$rootScope.proFeatures=$rootScope.proDes.keyfeatures.split(',');
            $scope.bigImage=$rootScope.proDes.largeimage.split(',')
            $scope.thumbImage=$rootScope.proDes.thumbnailurl.split(',')
            //console.log($rootScope.noImageProductDescriptionZoom)
            //console.log($rootScope.imageZoomUrl)

             

			setTimeout(function(){
				$('.clearfix.quickviewlist li a ').on('click',function(){	
					$(this).parent().parent().parent().parent().find('.quickviewdeatil').attr('src',$(this).find('img').attr('data-detailimg'))
				});
			},500);		
            



            //if($scope.notZoom){
            
              $scope.zoom()
            //}
            $rootScope.proFeatures=$rootScope.proDes.keyfeatures.split('||');
            //$scope.proFeatures=$rootScope.proDes.keyfeatures.split('||');

            $('#imgLoader').fadeOut('slow');
             var vendorByCode=API.BusinessUrl+API.getVendorByGbuCodeUrl+GbuCode+contentSearchGenericUrl.replace('?','&');
              catelougeService.getVendorByGbuCode(vendorByCode).success(function (results) {
              //$log.info("SUCCESS_"+$cookies.get('sessionID')+'_'+$location.path()+'_'+vendorByCode+" ---- response ---- "+JSON.stringify(results,"");
              //$log.info("SUCCESS ---- "+vendorByCode+" ---- response ---- "+JSON.stringify(results)+'---- PageName ----'+'{'+$location.path()+'}'+'---- SessionID ----'+$cookies.get('sessionID'));
              if(results.responseCode=="SUCCESS" &&  results.entitiesResponse!=null) 
              {   
                $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,vendorByCode,results,""));
                  $rootScope.proVendorCodeData=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper']
                  $rootScope.vendorId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][0].vendorId
                  $rootScope.vendorSkuId=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'][0].vendorSku
                  

                  //$rootScope.proVendorCount=results.entitiesResponse['0']['baseDTO']['vendorProductWrapper'].length;
                  //console.log()
                  $('#popUpCartLoader').hide();
                  for (var i = 0; i < $rootScope.proVendorCodeData.length; i++) 
                  {
                      $scope.upVendor=$rootScope.proVendorCodeData[i].vendorName;
                      //console.log('Here');
                      $rootScope.vendorPricePerUnit=$rootScope.proVendorCodeData[i].pricePerUnit
                      $rootScope.vendorSalePricePerUnit=$rootScope.proVendorCodeData[i].salePricePerUnit

                      //var discount=(($rootScope.vendorPricePerUnit-$rootScope.vendorSalePricePerUnit)/$rootScope.vendorPricePerUnit)*100
                      //$rootScope.discount= Math.ceil(discount * 100)/100; 

                      break;

                  };

                    $scope.discount=$rootScope.calculateDiscount($scope.vendorPricePerUnit,$scope.vendorSalePricePerUnit);
                    

                     $scope.dataDisplayAtPop=true;
                     var discount=(($rootScope.vendorPricePerUnit-$rootScope.vendorSalePricePerUnit)/$rootScope.vendorPricePerUnit)*100
                      $rootScope.discount= Math.floor(discount * 100)/100; 
                  for (var j = 0; j < $rootScope.proVendorCodeData.length; j++) 
                  {
                     
                      if(j!=0)
                      {
                        $scope.downVendor.push($rootScope.proVendorCodeData[j]);
                      }
                  };
				  
				  
                
              $(".loading").fadeOut("slow");

              	


            }else {
              $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),results.responseCode,vendorByCode,results,""));
                 $scope.dataDisplayAtPop=true;
                $rootScope.vendorPricePerUnit=0
                $rootScope.vendorSalePricePerUnit=0 
                $('#popUpCartLoader').hide();
            }

            }).
              error(function (data,status,header,config)
                {
                  $log.info(makeUiLog($cookies.get('sessionID'),$location.path(),status,vendorByCode,data,""));
                });


              $scope.origSizeAttr=$rootScope.calcVariantsAtList($rootScope.sizeAttr,$rootScope.proDes.Colorimage,$rootScope.proDes.instock,$rootScope.proDes.gbucode,$rootScope.proDes.Size,$rootScope.proDes.displaypriority)
        }

    }).
    error(function (data,status,header,config) 
          {   
           $log.error(makeUiLog($cookies.get('sessionID'),$location.path(),status,postProductDescription+contentSearchGenericUrl,data,formData));
              $scope.dataDisplayAtPop=true;
              $('#imgLoader').fadeOut('slow');    //console.log("data "+data+" status "+status+" header "+header+" config "+JSON.stringify(config));
          });  




  }
////


  
  $scope.clearAllAtFilter=function(){
    if($routeParams.filterUrl!=undefined){
    $cookies.remove('tickBoxArr');
    /*$localStorage.activeStateCount='';
    $localStorage.breadCrumbArrChange='';
    $localStorage.countFlag='';*/
    
    if($routeParams.eventName!=undefined && $routeParams.eventName!=''){
    if($routeParams.eventName.indexOf('~filter')>-1){
      window.location.href='/'+$routeParams.categoryName+'-listing/'+$routeParams.eventName+'/lst';
    }
    else{
        window.location.href='/'+$routeParams.categoryName+'-listing/lst';
      }
    }
    else{
      window.location.href='/'+$routeParams.categoryName+'-listing/lst';
    }
    }
  }


}])