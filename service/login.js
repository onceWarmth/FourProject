//
//  Copyright (C) 2015 - 2018 The Varme Project. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without modification, 
//  are permitted provided that the following conditions are met:
//
//    1. Redistributions of source code must retain the above copyright notice, this 
//       list of conditions and the following disclaimer.
//    2. Redistributions in binary form must reproduce the above copyright notice, 
//       this list of conditions and the following disclaimer in the documentation 
//       and/or other materials provided with the distribution.
//    3. Neither the name of the copyright holder nor the names of its contributors 
//       may be used to endorse or promote products derived from this software without 
//       specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
//  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
//  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
//  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT 
//  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
//  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
//  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
//  POSSIBILITY OF SUCH DAMAGE.
//

//
//  Imports.
//
var LibsModels = require("../libs/models");
var LibsEncryption = require("../libs/encryption");
var Util = require("util");

//
//  Public functions.
//
function login(request, response) {
    
    //  Get username and password data.
    var username = request.body["username"];
    var password = request.body["password"];

    //  Parameter check.
    if (username === null || password === null) {

        //  REPLY: Invalid parameter.
        response.json({
            "isSuccess": false,
            "message": "Invalid request."
        });
        return;
    }

    //  Query the user object from mysql and check password.
    LibsModels.Users.findById(username).then(function(user) {
        
        if (user === null) {

            //  User is not existed.
            response.json({
                "isSuccess": false,
                "message": "The username or password is wrong, please check your input."
            });
            return;
        }

        //  Check password.
        if (LibsEncryption.CheckPassword(password, user.passwordHash, user.passwordSalt)) {

            //  REPLY: Login success.
            response.json({
                "isSuccess": true,
                "message": "Login success."
            });
            return;
        } else {

            //  REPLY: The password is wrong.
            response.json({
                "isSuccess": false,
                "message": "The username or password is wrong, please check your input."
            });
            return;
        }
    }).catch(function(error) {
        console.log(Util.format(
            "Login module login function: Module findById error. (error = \"%s\")",
            error.message
        ));

        //  REPLY: Unknown error.
        resposne.json({
            "isSuccess": false,
            "message": "We have unexpected error. Please contact the system administrator."
        });
        return;
    })
}


//  Exports public APIs.
module.exports = {
    login: login
};
