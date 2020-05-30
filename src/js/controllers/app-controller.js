define(['app', 'appService'], function (app) {
    /**
     * Angular application controller
     */
    app.controller('appController', ['$scope', 'appService', function ($scope, appService) {
        $scope.login = function () {
            var userName = this.input.userName;
            var password = this.input.password;;
            var trueUser = appService.authenticateUser(userName, password);
            if (trueUser) {
                this.loginSuccess = true;
            }
        };
        $scope.addUser = function () {
            var userObj = {
                'ID': this.input.ID,
                'name': this.input.name,
                'fatherName': this.input.fatherName,
                'DOB': this.input.DOB,
                'email': this.input.email,
                'contactNo': this.input.contactNo,
                'loanAmount': this.input.loanAmount,
                'loanTenure': this.input.loanTenure,
            };
            appService.storeUser(userObj);
            $("#employeeForm").modal("hide");
            appService.resetForm($scope);
        };
        $scope.showModalEmployeeList = function () {
            $scope.employees = appService.getEmployeeList();
            $('#searchTerm').focus();
            $("#employeeList").modal("show");
        };
        $scope.clearStorage = function () {
            localStorage.clear();
            $("#employeeList").modal("hide");
            appService.resetForm($scope);
        };
        $scope.showOrganisationTree = function () {
            $("#organisationTree").modal("show");
        };
        $scope.showDetails = function () {
            var checkIndex = 0, editIndex = this.$index, employees = this.employees, employeeDetail;
            $('#employeeListTable').find('tbody').find('tr').each(function () {
                if (checkIndex === editIndex) {
                    var colIndex = 0;
                    employeeDetail = employees[editIndex + 1];
                }
                checkIndex++;
            });
            var data = "<p>" + JSON.stringify(employeeDetail) + "</p>";
            var myWindow = window.open("");
            myWindow.document.write(data);
        }
        appService.setLabels($scope);
        appService.setPredefinedData();
    }]);
});