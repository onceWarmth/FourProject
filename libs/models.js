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

(function() {

    //
    //  Imports.
    //
    var Sequelize = require("sequelize");

    //
    //  Global variable.
    //

    //  Create sequelize.
    var sequelize = new Sequelize(
        "FourProjectDb",  //  Database name.
        "root",  //  Mysql username.
        "root",  //  Mysql password.
        {
            host: "localhost",
            dialect: "mysql",
            logging: true,
            define: {
                charset: "utf8"
            }
        }
    );

    //  Users table.
    var Users = sequelize.define("users", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        passwordHash: {
            type: Sequelize.STRING,
            allowNull: false
        },
        passwordSalt: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    //  DB sync.
    sequelize.sync();
    
    //  Export public APIs.
    module.exports = {
        Users: Users,
        Op: Sequelize.Op,
        Sequelize: sequelize
    };
})();
