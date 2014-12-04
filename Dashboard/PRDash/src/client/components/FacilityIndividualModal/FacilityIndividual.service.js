angular.module('perceptiveReachApp').service('FacilityIndividualService', function ($scope, $http) {
    
    this.getVeteranByVAMC = function (id){
        $http.get('http://localhost:3000/veteransByVAMC?id=1').success(function(veteransByVAMC) {
            //console.log(veteransByVAMC);
            var output = [];
            for (var veteran in veteransByVAMC) {
                //console.log("branchName: " + veteransByBranch[branchCount].key + " count: " + veteransByBranch[branchCount].y);
                //output[veteransByBranch[branchCount].key.replace(/\s/g,'')]=veteransByBranch[branchCount].y;
                var record = [];
                var fullName = veteransByVAMC[veteran].LastName + ", " +veteransByVAMC[veteran].FirstName + " " + veteransByVAMC[veteran].MiddleName; 
                /*record.push(String(fullName));
                record.push(String(veteransByVAMC[veteran].SSN));
                record.push(String(veteransByVAMC[veteran].Phone));
                record.push(String(veteransByVAMC[veteran].DateIdentifiedRisk));
                record.push(String(veteransByVAMC[veteran].ReachID));*/
                record.push('Andal');
                record.push('1229999');
                record.push('918-2992');
                record.push('10-20-2009');
                record.push('153');
                output.push(record);
            }
            //dataSetSample = output;
            //console.log(dataSetSample);
            //console.log(JSON.stringify(output));
            //masterBranchValues = output;
            //$scope.dataSet = output;
            //console.log($scope.dataSet);
            return output;
        });    
    }
    
     
});