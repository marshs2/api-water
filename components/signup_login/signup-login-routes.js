import { Module } from "module";

/* This Module accepts middle ware and other configuation object from root index.js script
   Any Api specific Dependencies can be injected here which is available in libs and services.
   Only web layer logic presents here and context object preparation based on requested resource goes here
   Because passing express to Bussiness Logic breaks the testing of bussiness logic code.
*/

Class Routes{
    constructor(config)
    {
        this.config=options;
        
    }
    registerRoute(routeConfig){
        this.config.server.route(routeConfig);
    }
}

Module.e



// checkExistingUser({
//     userId,
//     token,
//     otherStuff
// })
// import signup model
// //DI
// //util
// app.route("/checkExistingUserRelatedRoute", function (req, res) {
//     contextObject = {
//         something: req.something,
//         uuid: util.random()
//     }
//     prepareContextObject();
//     checkExistingUser(contextObject).then(data => {
//         res.send(data.status,data);
//     }).fail(data => {

//     });
//     //return error or S
// });
