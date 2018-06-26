// var path = require("path");
// var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

}

//   // Using the passport.authenticate middleware with our local strategy.
//   // If the user has valid login credentials, send them to the members page.
//   // Otherwise the user will be sent an error
//   app.post("/api/login", passport.authenticate("local"), function(req, res,) {
//       console.log("res", res);
//     db.User.findOne({//FINDING USER
//         where: {
//             email: req.body.email
//         }
//     }).then(function(result) {
//         if (result) {//user found
//             var userInfo = result.dataValues;
//             db.Family.findOne({//FINDING FAMILY
//                 where: {
//                     id: result.FamilyId
//                 }            
//             }).then(function(data) {
//                 // console.log("userInfo", userInfo)
//             //   console.log('family found!')
//               var nickname = data.dataValues.nick_name;
//               userInfo.familyNickName = data.dataValues.nick_name;
//             //   console.log("userInfo with family nick name", userInfo)
//               res.json(userInfo);
//             })
//         } 
//         else {
//             console.log("in else not found user block");
//             res.json({
//                 status: "User not found"
//             })
//         }
//     });
// });

//   app.post("/api/signup", function(req, res) {
//     db.User.create({//CREATING ROW IN USERS TABLE
//       email: req.body.email,
//       password: req.body.password,
//       age: req.body.age,
//       zipcode: req.body.zipcode,
//       primary_user: req.body.primary_user,
//       name: req.body.name,
//       FamilyId: req.body.familyId
//     }).then(function(results) {//REDIRECT USER TO LOGIN PAGE
//         res.json('/api/login');
//     }).catch(function(err) {
//       console.log(err);
//       res.json(err);
//     });
//   });

//   app.get("/logout", function(req, res) {//UNUSED AS OF 6/13 AM
//     req.logout();
//     res.redirect("/");
//   });

//   app.get("/api/user_data", function(req, res) {//WORKS AS OF 6/13 AM
//     var familyNickName;
//     if (!req.user) {
//       res.json({});
//     }
//     else {
//         db.Family.findOne({
//             where: {
//                 id: req.user.FamilyId
//             }               
//         }).then(function(data){
//             // console.log("in /api/user_data return family nickname", data.dataValues.nick_name);
//             // familyNickName = data.dataValues.nick_name;
//             res.json({
//                 email: req.user.email,
//                 id: req.user.id,
//                 FamilyId: req.user.FamilyId,
//                 name: req.user.name,
//                 familyNickName: data.dataValues.nick_name
//               });
//         })
//     //   res.json({
//     //     email: req.user.email,
//     //     id: req.user.id,
//     //     FamilyId: req.user.FamilyId,
//     //     name: req.user.name,
//         // familyNickName: familyNickName
//     //   });
//     }
//   });    

//   app.post(`/api/user/:username`, function(req,res) {
//       db.User.findOne({//FINDING USER
//           where: {
//               user_name: req.params.username,
//           }
//       }).then(function(result) {
//           if (res) {//user found
//               db.Family.findOne({//FINDING FAMILY
//                   where: {
//                       id: result.FamilyId
//                   }            
//               }).then(function(data) {
//                   var nickname = data.dataValues.nick_name;
//                   console.log(nickname);
//                   res.redirect("/family/" + nickname);
//               })
//           } else {
//             res.redirect('/')
//           }
//       })
//     });

//   app.post("/api/newFamily", function(req, res){
//     db.Family.create({
//         nick_name: req.body.nick_name
//     }).then(function(result){
//         console.log("result from database", result);
//         res.json(result);
//     })
//   })

//     app.get("/api/events", function(req, res) {//WORKS AS OF 6/13 AM
//         db.Occasion.findAll({
//         }).then(function(data) {
//             res.json(data)
//         })
//     });

//     app.get('/api/events/:userFamId', function(req,res) {
//         db.Occasion.findAll({
//             where: {
//                 FamilyId: req.params.userFamId
//             }
//         }).then(function(data) {
//             res.json(data)
//         })
//     });

//     app.get("/api/events/proposed", function(req, res) {//WORKS AS OF 6/13 AM
//         db.Occasion.findAll({
//             where: {
//                 proposed: true
//             }
//         }).then(function(data) {
//             res.json(data)
//         });
//     });

//     app.get("/api/tally/:userFamId", function(req, res) {
//         db.Occasion.findAll({//FINDS ALL PROPOSED EVENTS AND SORTS BY VOTES
//             where: {
//                 proposed: true,
//                 FamilyId: req.params.userFamId
//             },
//             order: [
//                 ['vote', 'DESC']
//             ]
//         }).then(function(data) {
//             var winningId = data[0].dataValues.id; //STORES WINNER ID
//             db.Occasion.update({
//                 proposed: false
//             }, {
//                 where: {
//                     id: winningId,
//                     FamilyId: req.params.userFamId
//                 },
//             }).then(function() {
//                 db.Occasion.destroy({
//                     where: {
//                         FamilyId: req.params.userFamId,
//                         proposed: true
//                     }
//                 }).then(function() {
//                     res.end();
//                 })
//             })
//         });
//     });

//     app.get('/api/bookmark/:id',function(req,res) {
//         db.Occasion.update({
//             proposed: true,
//             vote: 0
//         },{
//             where: {
//                 id: req.params.id
//             }
//         }).then(function() {
//             res.end();
//         })
//     });

//     app.get("/api/events/proposed/:userFamId", function(req, res) {//WORKS AS OF 6/13 AM
//         db.Occasion.findAll({
//             where: {
//                 proposed: true,
//                 FamilyId: req.params.userFamId
//             },
//             order: [
//                 [`id`, 'desc']
//             ]
//         }).then(function(data) {
//             res.json(data)
//         });
//     });

//     app.get("/api/publicDash/events", function(req, res) {
//         db.Occasion.findAll({
//             where: {
//                 proposed: false,
//             },
//             order: [
//                 [`id`, 'desc']
//             ]
//         }).then(function(data) {
//             res.json(data)
//         });
//     });

//     app.post('/api/events/voteup', function(req,res) {
//         db.Occasion.increment('vote', {//INCREMENTING VOTE
//             where: {
//                 id: req.body.id
//             }
//         }).then(function(data){
//             db.Occasion.findOne({//FINDING ROW WHERE IT JUST INCREMENTED
//                 where: {
//                     id: req.body.id
//                 }
//             }).then(function(data2) {
//                 res.json(data2.dataValues)
//             })
//         });
//     });

//     app.post('/api/events/votedown', function(req,res) {
//         db.Occasion.decrement('vote', {//DECREMENTING VOTE
//             where: {
//                 id: req.body.id
//             }
//         }).then(function(data){
//             db.Occasion.findOne({//FINDING ROW WHERE IT JUST INCREMENTED
//                 where: {
//                     id: req.body.id
//                 }
//             }).then(function(data2) {
//                 res.json(data2.dataValues)
//             })
//         });
//     });

//     var photoArr = [
//         '/assets/images/action-activity-balls-296302-01.png',
//         '/assets/images/action-adult-adventure-701016-01.png',
//         '/assets/images/action-boys-dawn-620530-01.png',
//         '/assets/images/activity-art-art-class-730807-01.png',
//         '/assets/images/activity-beauty-blue-61129-01.png',
//         '/assets/images/adult-adventure-casual-669007-01.png',        
//         '/assets/images/adult-boy-child-325521-01.png',        
//         '/assets/images/adventure-backlit-community-207896-01.png',        
//         '/assets/images/adventure-camp-camping-699558-01.png',        
//         '/assets/images/adventure-clouds-daylight-130111-01.png',        
//         '/assets/images/affection-beach-care-433502-01.png',        
//         '/assets/images/backpack-clouds-cloudy-sky-771079-01.png',        
//         '/assets/images/buenavista-surf-camp-enjoyment-friendship-690746-01.png',        
//     ]

//     app.post('/api/newEvent', function(req,res) {
//         console.log('creating event with this:', req.body)
//         db.Occasion.create({
//             title: req.body.title,
//             date: req.body.date,
//             start_time: req.body.start_time,
//             end_time: req.body.end_time,
//             category: req.body.category,
//             description: req.body.description,
//             FamilyId: req.body.FamilyId,
//             location: req.body.location,
//             photo: photoArr[Math.floor(Math.random()*photoArr.length)] //HARDCODING
//         }).then(function(result) {
//             res.json(result);
//         })
//     })

//     // app.get("/partial/name/:userName", function(req, res){
//     //     console.log("in api-routes userName" + req.params.userName);
//     //     res.render("/partials/header-navbar", {
//     //         userName: req.params.userName
//     //     }).then(function(data){
//     //         console.log(data);
//     //         res.json(data);
//     //     })
//     // });

// };
  
//     // app.get(`/api/user/:id`, function(req, res) {
//     //     db.User.findOne({
//     //         where: {
//     //             user_name: req.params.id
//     //         }
//     //     }).then(function(result) {
//             // db.Family.findOne({
//             //     where: {
//             //         id: result.FamilyId
//             //     }
//     //         }).then(function(result) {
//     //             console.log('SENDING TO LANDING WITH', result.dataValues.nick_name)
//     //             res.render('pages/landing')
//     //         })
//     //     })
//     // });
