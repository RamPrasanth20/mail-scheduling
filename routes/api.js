const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const uniqid = require('uniqid')
const schedule = require("node-schedule");
const mailer = require("nodemailer");
var ObjectId = require('mongodb').ObjectId;


MongoClient.connect('mongodb+srv://user_1:aakash@cluster0.fjw1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(client => {
        const db = client.db('mail')
        const user = db.collection('users')
        let job_obj = {}

        router.post('/create/:id', function (req, res) {

            let id = req.params.id
            ma_id = uniqid()
            mail_id = id + "-" + ma_id
            const user_future = db.collection(id + "-f")
            req.body["mail_id"] = mail_id
            user_future.insertOne(req.body)
            console.log(mail_id)


            let str = '';
            let transporter = mailer.createTransport({
                service: "gmail",
                auth: {
                    user: "works.suryav@gmail.com",
                    pass: "SURYA12345"
                }
            });

            let rule = new schedule.RecurrenceRule();
            if ("recurring" in req.body) {
                let time = req.body.schedule
                rule = `*/${time} * * * * *`;
                console.log(rule)
            }
            else {


                if ("week" in req.body) {
                    let time = req.body.time.split(":")
                    let day = req.body.schedule
                    time = time.map(x => (parseInt(x)))
                    day = parseInt(day)
                    rule.tz = 'Asia/Kolkata'
                    rule.dayOfWeek = [day - 1];
                    rule.minute = time[1];
                    rule.hour = time[0];
                    //console.log(rule)
                }
                else if ("month" in req.body) {
                    let time = req.body["time"].split(":")
                    let date = req.body["schedule"].split("-")
                    date = date.map(x => (parseInt(x)))
                    rule.tz = 'Asia/Kolkata'
                    rule.minute = time[1];
                    rule.hour = time[0];
                    rule.date = date[2];
                }
                else if ("year" in req.body) {
                    let time = req.body["time"].split(":")
                    let date = req.body["schedule"].split("-")
                    time = time.map(x => (parseInt(x)))
                    date = date.map(x => (parseInt(x)))
                    rule.tz = 'Asia/Kolkata'

                    rule.minute = time[1];
                    rule.hour = time[0];
                    rule.date = date[2];
                    rule.month =date[1] - 1;
                }
                else if ("fixed" in req.body) {
                    let time = req.body["time"].split(":")
                    let date = req.body["schedule"].split("-")
                    //console.log("time",time)
                    //console.log("date",date)
                    time = time.map(x => (parseInt(x)))
                    date = date.map(x => (parseInt(x)))
                    rule.tz = 'Asia/Kolkata'

                    rule.minute = time[1];
                    rule.hour = time[0];
                    rule.date = date[2];
                    rule.month = date[1] - 1;
                    //console.log(rule)
                    //str=time[4]+" "+time[3]+" "+time[2]+" "+time[1]+" "+time[0]+" *"
                }
                //console.log(rule)
                //console.dir(rule)
            }
            let mail = []
            for (let i of req.body.cc) {
                mail.push(i["mail form-control"])
            }
            let mailoption = {
                to: req.body.To,
                subject: req.body.subject,
                html: req.body.html+"<p>This is system generated mail.Don't respond it</p>"
                
            };

            if (mail) {
                mailoption["cc"] = mail
            }
            if ("immediate" in req.body) {
                transporter.sendMail(mailoption, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(info.response)
                    }
                    let lk = req.body["mail_id"].split('-')
                    const his = db.collection(`${lk[0]}-h`)
                    const fi = db.collection(`${lk[0]}-f`)
                    fi.deleteOne({ "mail_id":mail_id })        
                    delete req.body["_id"]
                    his.insertOne(req.body)
                })
            }
            else {



                const startTime = new Date(Date.now());
                ///const endTime = new Date(startTime.getTime() + 5000);
                //console.log(startTime)
                let job = schedule.scheduleJob(rule, () => {
                    //console.log(job)

                    let mid = req.body["mail_id"].split('-')
                    let col = db.collection(mid[0] + '-g')
                    let fu = db.collection(mid[0] + '-f')
                    //console.log("f",fu)
                    col.findOne({ "mail_id": req.body["mail_id"] }).then(doc => {
                        if (doc) {
                            job_obj[req.body["mail_id"]].cancel()
                        }
                        else {
                            fu.findOne({ "mail_id": req.body["mail_id"] }).then(j => {
                                if ("edit" in j) {
                                    let mail = []
                                    //console.log("entered", j)
                                    for (let i of j["cc"]) {
                                        mail.push(i["mail form-control"])
                                    }
                                    let mailop = {
                                        to: j["To"],
                                        subject: j["subject"],
                                        html: j["html"]+"<p>This is system generated mail.Don't respond it</p>"
                                        
                                    };

                                    if (mail) {
                                        mailop["cc"] = mail
                                    }
                                    console.log(mailop)
                                    
                                    transporter.sendMail(mailop, (error, info) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log(info.response)
                                        }

                                        let lk = req.body["mail_id"].split('-')
                                        //const fi = db.collection(`${lk[0]}-f`)
                                        const his = db.collection(`${lk[0]}-h`)
                                        delete j["_id"]
                                        his.insertOne(j)
                                        //console.log(req.body)
                                        if ("fixed" in req.body) {
                                            job_obj[req.body["mail_id"]].cancel()
                                            const fi = db.collection(`${lk[0]}-f`)
                                            fi.deleteOne({ "mail_id": lk[0] + "-" + lk[1] })
                                                
                                        }


                                        //let f=db.collection(req.body.id+'f')
                                    });

                                    

                                }
                                else {
                                    transporter.sendMail(mailoption, (error, info) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log(info.response)
                                        }
                                        console.log(req.body)
                                        let lk = req.body["mail_id"].split('-')
                                        //const fi = db.collection(`${lk[0]}-f`)
                                        const his = db.collection(`${lk[0]}-h`)
                                        delete req.body["_id"]
                                        his.insertOne(req.body)
                                        //console.log(req.body)
                                        if ("fixed" in req.body) {
                                            job_obj[req.body["mail_id"]].cancel()
                                            const fi = db.collection(`${lk[0]}-f`)
                                            fi.deleteOne({ "mail_id": lk[0] + "-" + lk[1] })
                                                
                                        }
                
                
                                        //let f=db.collection(req.body.id+'f')
                                    });
                
                                    job_obj[mail_id] = job;
                                }
                


                            })
                            
            }





        })

        //let bc = db.collection('jobs')
        //bc.insertOne({"mail_id":mail_id,'job':job})
    });
            }

res.send({ type: "post" });
        });
router.post('/html', function (req, res) {
    console.log(req.body)
    let mailoption = {
        to: "ranjithvel2001@gmail.com",
        subject: "html",
        html: `${req.body.html}`
    };
    let transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "works.suryav@gmail.com",
            pass: "SURYA12345"
        }
    });

    transporter.sendMail(mailoption, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info.response)
        }
    })
    res.send({ sent: "success" })


})
router.post('/signup', function (req, res) {

    //console.log(req.body)

    user.findOne({
        username: req.body.username,
        email: req.body.email
    })
        .then(us => {
            if (!us) {
                user.insertOne(req.body)
                    .then(in_res => {
                        res.send({ id: in_res });
                    })
            }
            //console.log(us)
        })


});
router.get('/stop/:id', function (req, res) {

    //console.log(req.params.id)

    var id = req.params.id;
    var sid = id.split('-')
    let cid = db.collection(sid[0] + '-g')
    let fid = db.collection(sid[0] + '-f')
    fid.findOne({ "mail_id": id }).then(result => {
        //console.log('result',result)
        cid.insertOne(result)
    })
    fid.deleteOne({ "mail_id": id })
    fid.find({}).toArray(function (err, response) {
        //console.log('response',response)
        if (!err) {
            res.send({ data: response })
        }
    })


});
router.get("/edit/:id", (req, res) => {
    let edit_id = req.params.id
    let lk = edit_id.split('-')
    let fi = db.collection(lk[0] + '-f')
    fi.findOne({ "mail_id": edit_id })
        .then(fi => {
            res.send({ data: fi })
        })
})
router.post("/edit2/:id", (req, res) => {
    let edit_id = req.params.id
    let lk = edit_id.split('-')
    let fi = db.collection(lk[0] + '-f')
    req.body['mail_id'] = edit_id
    //console.log(req.body)
    fi.deleteOne({ "mail_id": edit_id })

    fi.insertOne(req.body)
        .then(d => {
            res.send({ data: "hello" })
        })
})

router.get('/future/:id', function (req, res) {


    let userid = req.params.id;
    console.log(userid + '-f')
    user.findOne({ _id: new ObjectId(userid) })
        .then(us => {
            if (us) {
                db.collection(userid + '-f').find({}).toArray(function (err, result) {
                    if (err) throw err;
                    //console.log(result)
                    res.send({ data: result, name: us.username })

                })
            }
            //(us)
        })


    //console.log(dbf)


});
router.get('/history/:id', function (req, res) {


    let userid = req.params.id;
    //console.log(userid + '-h')

    db.collection(userid + '-h').find({}).toArray(function (err, result) {
        if (err) throw err;
        //console.log(result)
        res.send({ data: result })

    })
});





router.post('/login', function (req, res) {

    user.findOne({ username: req.body.username, password: req.body.password })
        .then(us => {
            //console.log("inside",us)
            if (us) {
                //console.log(us["_id"])
                res.send({ id: us["_id"] });
            }

            else {
                res.send({ id: null });
            }
        })


});



    })






module.exports = router;