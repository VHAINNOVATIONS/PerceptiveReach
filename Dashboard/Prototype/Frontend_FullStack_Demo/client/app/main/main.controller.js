'use strict';

angular.module('perceptiveReachApp')
  .controller('MainCtrl', function ($scope, $http, modalService) {
    $scope.awesomeThings = [];
    //Modal.open();
    //$('#veteranTable').DataTable();
    //console.log(JSON.stringify(Modal));
    //console.log(Modal);
    //loadVeteranTable();

    function deleteCustomer () {

        var custName = 'Andal'//$scope.customer.firstName + ' ' + $scope.customer.lastName;

        var optionsChoice = {};
        var modalOptions = {
            closeButtonText: 'Cancel',
            actionButtonText: 'Delete Customer',
            headerText: 'Delete ' + custName + '?',
            bodyText: 'Are you sure you want to delete this customer?'
        };
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            controller: 'FacilityIndividualModalCtrl',
            resolve:{
                data: function () {
                    return {options: optionsChoice};
                }
            },
            windowClass: 'app-modal-window',
            templateUrl: 'components/FacilityIndividualModal/FacilityIndividualModal.html'
        };
        modalService.showModal(modalDefaults, {}).then(function (result) {
           
        });
    }
    deleteCustomer();
    
    function loadVeteranTable(){
        $scope.dataSet = [
    ['Trident','Internet Explorer 4.0','Win 95+','4','X','10-20-2009'],
    ['Trident','Internet Explorer 5.0','Win 95+','5','C','10-20-2009'],
    ['Trident','Internet Explorer 5.5','Win 95+','5.5','A','10-20-2009'],
    ['Trident','Internet Explorer 6','Win 98+','6','A','10-20-2009'],
    ['Trident','Internet Explorer 7','Win XP SP2+','7','A','10-20-2009'],
    ['Trident','AOL browser (AOL desktop)','Win XP','6','A','10-20-2009'],
    ['Gecko','Firefox 1.0','Win 98+ / OSX.2+','1.7','A','10-20-2009'],
    ['Gecko','Firefox 1.5','Win 98+ / OSX.2+','1.8','A','10-20-2009'],
    ['Gecko','Firefox 2.0','Win 98+ / OSX.2+','1.8','A','10-20-2009'],
    ['Gecko','Firefox 3.0','Win 2k+ / OSX.3+','1.9','A','10-20-2009'],
    ['Gecko','Camino 1.0','OSX.2+','1.8','A','10-20-2009'],
    ['Gecko','Camino 1.5','OSX.3+','1.8','A','10-20-2009'],
    ['Gecko','Netscape 7.2','Win 95+ / Mac OS 8.6-9.2','1.7','A','10-20-2009'],
    ['Gecko','Netscape Browser 8','Win 98SE+','1.7','A','10-20-2009'],
    ['Gecko','Netscape Navigator 9','Win 98+ / OSX.2+','1.8','A','10-20-2009'],
    ['Gecko','Mozilla 1.0','Win 95+ / OSX.1+',1,'A','10-20-2009'],
    ['Gecko','Mozilla 1.1','Win 95+ / OSX.1+',1.1,'A','10-20-2009'],
    ['Gecko','Mozilla 1.2','Win 95+ / OSX.1+',1.2,'A','10-20-2009'],
    ['Gecko','Mozilla 1.3','Win 95+ / OSX.1+',1.3,'A'],
    ['Gecko','Mozilla 1.4','Win 95+ / OSX.1+',1.4,'A'],
    ['Gecko','Mozilla 1.5','Win 95+ / OSX.1+',1.5,'A'],
    ['Gecko','Mozilla 1.6','Win 95+ / OSX.1+',1.6,'A'],
    ['Gecko','Mozilla 1.7','Win 98+ / OSX.1+',1.7,'A'],
    ['Gecko','Mozilla 1.8','Win 98+ / OSX.1+',1.8,'A'],
    ['Gecko','Seamonkey 1.1','Win 98+ / OSX.2+','1.8','A'],
    ['Gecko','Epiphany 2.20','Gnome','1.8','A'],
    ['Webkit','Safari 1.2','OSX.3','125.5','A'],
    ['Webkit','Safari 1.3','OSX.3','312.8','A'],
    ['Webkit','Safari 2.0','OSX.4+','419.3','A'],
    ['Webkit','Safari 3.0','OSX.4+','522.1','A'],
    ['Webkit','OmniWeb 5.5','OSX.4+','420','A'],
    ['Webkit','iPod Touch / iPhone','iPod','420.1','A'],
    ['Webkit','S60','S60','413','A'],
    ['Presto','Opera 7.0','Win 95+ / OSX.1+','-','A'],
    ['Presto','Opera 7.5','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 8.0','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 8.5','Win 95+ / OSX.2+','-','A'],
    ['Presto','Opera 9.0','Win 95+ / OSX.3+','-','A'],
    ['Presto','Opera 9.2','Win 88+ / OSX.3+','-','A'],
    ['Presto','Opera 9.5','Win 88+ / OSX.3+','-','A'],
    ['Presto','Opera for Wii','Wii','-','A'],
    ['Presto','Nokia N800','N800','-','A'],
    ['Presto','Nintendo DS browser','Nintendo DS','8.5','C/A<sup>1</sup>'],
    ['KHTML','Konqureror 3.1','KDE 3.1','3.1','C'],
    ['KHTML','Konqureror 3.3','KDE 3.3','3.3','A'],
    ['KHTML','Konqureror 3.5','KDE 3.5','3.5','A'],
    ['Tasman','Internet Explorer 4.5','Mac OS 8-9','-','X'],
    ['Tasman','Internet Explorer 5.1','Mac OS 7.6-9','1','C'],
    ['Tasman','Internet Explorer 5.2','Mac OS 8-X','1','C'],
    ['Misc','NetFront 3.1','Embedded devices','-','C'],
    ['Misc','NetFront 3.4','Embedded devices','-','A'],
    ['Misc','Dillo 0.8','Embedded devices','-','X'],
    ['Misc','Links','Text only','-','X'],
    ['Misc','Lynx','Text only','-','X'],
    ['Misc','IE Mobile','Windows Mobile 6','-','C'],
    ['Misc','PSP browser','PSP','-','C'],
    ['Other browsers','All others','-','-','U']
];
 
    $('#veteranTable').html( '<table cellpadding="0" cellspacing="0" border="0" class="" id="example" width="100%"></table>' );
 
    $('#example').dataTable( {
        "data": dataSet,
        "scrollY":        "200px",
        "scrollCollapse": true,
        "paging":         false,
        "columns": [
            { "title": "Veteran Name" },
            { "title": "Veteran SSN" },
            { "title": "Veteran Phone" },
            { "title": "Date First identified as High Risk", "class": "center" },
            { "title": "Date Record Last Updated", "class": "center" },
            { "title": "Last VA Clinician Visit", "class": "center" }
        ]
    } );
    
    //$('#veteranView').hide();
    //$('#facilityInfo').show();
    $('#facilityInfo').hide();
    $('#veteranView').hide(); 
    console.log('Loaded everything...');    
    }
    
    //$scope.openModal();
    //Modal.openModal();
    //$('head').append('<link rel="stylesheet" href="assets/css/AdminLTE.css" type="text/css" />');
    //$('body').append('<script src="assets/js/AdminLTE/app.js" type="text/javascript"></script>');    
    //$('body').append('<script src="assets/js/AdminLTE/demo.js" type="text/javascript"></script>');
    //$('body').append('<script src="assets/js/AdminLTE/dashboard.js" type="text/javascript"></script>');
    
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  })
  /*.directive('dataTables', function(){
    var linker = function(scope,element, attr){
        console.log(scope.dataSet);
        element.dataTable( {
            "data": scope.dataSet,
            "scrollY":        "200px",
            "scrollCollapse": true,
            "paging":         false,
            "columns": [
                { "title": "Veteran Name" },
                { "title": "Veteran SSN" },
                { "title": "Veteran Phone" },
                { "title": "Date First identified as High Risk", "class": "center" },
                { "title": "Date Record Last Updated", "class": "center" },
                { "title": "Last VA Clinician Visit", "class": "center" }
            ]
        });    
    };
    return {
        restrict:'EAC',
        link: linker
    }
  });*/
