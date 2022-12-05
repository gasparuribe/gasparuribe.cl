/** *************Angular controller JS*********************/
"use strict";
app.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform, e) {
		e.preventDefault();
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
          $scope.resultMessage = "cargando";
          $scope.result='bg-yellow';
            $http({
                method  : 'POST',
                url     : 'https://3fipumcqua3kbo3iu56xue7diu0inbpn.lambda-url.us-east-2.on.aws?action=contacto',
                data    : JSON.stringify($scope.formData),
                headers : { 'Content-Type': 'application/json' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = false;
                      $scope.formData = null;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-green';
                } else {
                    $scope.submitButtonDisabled = false;
                      $scope.resultMessage = data.message;
                    $scope.result='bg-red';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = "No enviado "+String.fromCodePoint(0x1F623)+" Falta Mensaje?";
            $scope.result='bg-red';
        }
    }
});
