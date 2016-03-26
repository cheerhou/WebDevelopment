(function () {
    angular
        .module("ResManageApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;
        $scope.error = null;

        function register(user) {
            $scope.error = null;
            if (user == null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.error = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.error = "Passwords must match";
                return;
            }
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.error = "User already exists";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(function(respond) {
                    if(respond.data) {
                        $scope.error = "User already exists!";
                        return;
                    } else {

                        UserService
                            .createUser(user)
                            .then(function(respond) {
                                if(respond.data) {
                                    $scope.message = "You have Registered successfully.";
                                    //the last user in the respond is the new created user
                                    UserService.setCurrentUser(respond.data.pop());
                                    var currentUser = UserService.getCurrentUser();
                                    //console.log("current user : " + currentUser._id + " " + currentUser.username);

                                    $location.url("/profile?id=" + currentUser._id);
                                } else{
                                    $scope.error = "Register failed!";
                                }
                            })
                    }

                });

        }
    }

})();