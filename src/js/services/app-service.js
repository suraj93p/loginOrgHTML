define(['app'], function (app) {
    /**
     * Angular Service
     */
    app.service('appService', [function () {
        this.storeUser = function (userObj) {
            key = userObj.ID;
            localStorage.setItem(key, JSON.stringify(userObj));
        };
        this.authenticateUser = function (userName, password) {
            if ((typeof userName === 'undefined' || typeof userName === '') && (typeof password === 'undefined' || typeof password === '')) {
                return false;
            } else {
                var storedUsers = Object.keys(localStorage).map(function (key) {
                    return localStorage.getItem(key)
                });
                var isUserFound = false;
                storedUsers.forEach(function (user) {
                    var userInMem = JSON.parse(user);
                    if ((userName === userInMem.name || userName === userInMem.contactNo) && password === userInMem.password) {
                        isUserFound = true;
                        return;
                    }
                });
                return isUserFound;
            }
        };
        this.resetForm = function ($scope) {
            $scope.input = {};
        };
        this.getEmployeeList = function () {
            var employees = {};
            for (var i = 0; i < localStorage.length; i++) {
                var value = localStorage.getItem(localStorage.key(i));
                if ((constants.regex.validJson.test(value.replace(constants.regex.json1, '@').
                    replace(constants.regex.json2, ']').
                    replace(constants.regex.json3, '')))) {
                    var obj = JSON.parse(value);
                    employees[localStorage.key(i)] = obj;
                }
            }
            return employees;
        };
        this.setPredefinedData = function () {
            var user1 = {
                "ID": 001,
                'name': 'aaa',
                'fatherName': 'Vikas Agrawal',
                'DOB': '01/01/1994',
                'email': 'aayushma@gmail.com',
                'contactNo': '998877665544',
                'loanAmount': 50000,
                'loanTenure': 3,
                'password': '111',
                'isFromScript': true
            };
            var user2 = {
                "ID": 002,
                'name': 'Suraj Pasayat',
                'fatherName': 'Gajapati Pasayat',
                'DOB': '01/01/1993',
                'email': 'suraj@gmail.com',
                'contactNo': '887799665544',
                'loanAmount': 100000,
                'loanTenure': 6,
                'password': '222',
                'isFromScript': true
            };
            var user3 = {
                "ID": 003,
                'name': 'Anil Kumar',
                'fatherName': 'Abodh Kumar',
                'DOB': '01/01/1992',
                'email': 'anil@gmail.com',
                'contactNo': '778899665544',
                'loanAmount': 150000,
                'loanTenure': 9,
                'password': '333',
                'isFromScript': true
            };
            this.storeUser(user1);
            this.storeUser(user2);
            this.storeUser(user3);
        };
        this.setLabels = function ($scope) {
            $scope.labels = messages.labels;
            $scope.loginSuccess = false;
            $scope.input = {};
        };
    }]);
});