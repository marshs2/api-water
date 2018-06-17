/* This index.js module takes up middle ware object and other configuartion object and passes it to component api.
 */
/* This Module accepts middle ware and other configuation object from root index.js script
   Any Api specific Dependencies can be injected here which is available in libs and services.
   Only web layer logic presents here and context object preparation based on requested resource goes here
   Because passing express to Bussiness Logic breaks the testing of bussiness logic code.
*/

// var signupLogin=require('./signup-login');
// class TestClass{
//     constructor()
//     {
//         console.log("test class");
//     }
// }

// module.exports=TestClass;
// const fetchNotifications = require('./fetch-notifications');
// const updateNotification = require('./update-notification');
// const removeNotification = require('./remove-notification');
// /**
// * Provide Api for Investors (user with articles)
// **/

// module.exports = ({ config, db }) => {
//  api.get('/', authenticate, fetchNotifications({ config, db }));
//  api.put('/:notificationId',authenticate, updateNotification({ config, db
//     }));
//  api.delete('/:notificationId', authenticate, removeNotification({ config,
//     db }));
//     return api;
const path = require('path')
let SignUpLoginModel = require(path.join(__dirname, 'signup-login-model.js'))
let signupLogin
function init (options) {
  signupLogin = new SignUpLoginModel(options)
  options.app.get('/', signupLogin.handler)
}

module.exports = init
