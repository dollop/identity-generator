var fs = require('fs');

var isInt = require('./src/isInt');
var sex = require('./src/sex');
var firstName = require('./src/firstName.js');
var lastName = require('./src/lastName.js');
var emailAddress = require('./src/emailAddress');
var phoneNumber = require('./src/phoneNumber');
var street = require('./src/street');
var city = require('./src/city');
var state = require('./src/state');
var zipCode = require('./src/zipCode');
var dateOfBirth = require('./src/dateOfBirth');
var company = require('./src/company');
var department = require('./src/department');

var identity = (function() {
  'use strict';

  var Identity = function(id) {
    var identity = {};

    identity.id = id;
    identity.sex = sex();
    identity.firstName = firstName(identity.sex);
    identity.lastName = lastName();
    identity.emailAddress = emailAddress(identity.firstName, identity.lastName);
    identity.phoneNumber = phoneNumber();
    identity.street = street();
    identity.city = city();
    identity.state = state();
    identity.zipCode = zipCode(identity.state);
    identity.dateOfBirth = dateOfBirth();
    //identity.company = company();
    //identity.department = department();

    return identity;
  };

  function generate(num) {
    if ((num && (!isInt(num) || num < 1)) || num === 0) {
      throw new Error(num + ' is not a positive integer.');
    }

    if (!num || num === 1) {
      return new Identity(1);
    } else {
      var identities = [];
      var i;

      for (i = 0; i < num; i += 1) {
        identities.push(new Identity(i+1));
      }

      return identities;
    }
  }

  return {
    generate: generate
  };
}());

var result;

// check for command-line parameter 1 for amount of identities
if(process.argv[2] && parseInt(process.argv[2]) > 0) {
	console.log('Generating ' + process.argv[2] + ' identities...');
	result = identity.generate(parseInt(process.argv[2]));
} else {
	result = identity.generate();
}

// check for command-line parameter 2 for target file
if(process.argv[3]) {
	var start = new Date().getTime();
	fs.writeFile('./data/' + process.argv[3], JSON.stringify(result), function(err) {
	    if(err) {
	    	console.log('Could not write target file ' + process.argv[3]);
	        console.log(err);
	    } else {
	        console.log('All ' + process.argv[2] + ' generated identities saved in data/' + process.argv[3]);
	        console.log('Process took ' + (new Date().getTime() - start) + 'ms');
	    }
	}); 
} else {
	console.log(result);
}


