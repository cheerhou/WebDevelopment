var mockDishes = require("./dish.mock.json");
var uuid = require("node-uuid");


module.exports = function(app) {

    var api = {
        createDish: createDish,
        deleteDish: deleteDish,
        upDateDish: upDateDish,
        findDishByName: findDishByName,
        findAllDishes: findAllDishes
    };
    return api;

    function createDish(dish) {
        var newDish = {
            _id: uuid.v4(),
            name: dish.name,
            price: dish.price
        };

        mockDishes.push(newDish);
        return mockDishes
    }

    function deleteDish(dishId) {
        for (var i in mockDishes) {
            if (mockDishes[i]._id === dishId) {
                mockDishes.splice(i, 1);
            }
        }
        return mockDishes;
    }

    function upDateDish(dishId, newDish) {
        for (var i in mockDishes) {
            if (mockDishes[i]._id === dishId) {
                mockDishes[i].name = newDish.name;
                mockDishes[i].price = newDish.price;
            }
        }
        return mockDishes;
    }

    function findDishByName(name) {
        for (var i in mockDishes) {
            if (mockDishes[i].name === name) {
                return mockDishes[i];
            }
        }
        return null;
    }

    function findAllDishes() {
        return mockDishes;
    }


}