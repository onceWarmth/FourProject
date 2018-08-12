//
//  Imports.
//
var LibsEncryption = require("./libs/encryption");
var LibsModels = require("./libs/models");

var username = "user";
var password = "user123";

//  Get encrypted password.
var encrypt = LibsEncryption.HashPassword(password);
var salt = encrypt["salt"];
var hash = encrypt["hash"];

LibsModels.Users.findOrCreate({
    where:{
        id: username
    },
    defaults: {
        id: username,
        passwordHash: hash,
        passwordSalt: salt
    }
}).spread(function(user, created) {
    if (created) {
        console.log("Item insert success.");
    } else {
        console.log("Item has alread existed.");
    }

    process.exit(0);
});