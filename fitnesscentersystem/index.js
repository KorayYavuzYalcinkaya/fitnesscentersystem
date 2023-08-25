const express = require('express')
const fs = require('fs')
const url = require('url')
const app = express()
const port = 3000
var X, tarih = new Date()

app.get("/liste", function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre && X[req.query.hesap]["yetki"] != 0) {

                if (req.query.liste == undefined) {

                    res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "" + req.url + "&liste=" + JSON.stringify(X) + "';</script>")

                }

                res.sendFile(__dirname + "/liste.htm")

            } else {

                res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

    }

})

app.get('/sil', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                if ((X[req.query.hesap]["yetki"] == 2 && X[req.query.sil]["yetki"] != 2) || (X[req.query.hesap]["yetki"] == 1 && X[req.query.sil]["yetki"] == 0)) {

                    if (req.query.sil != undefined) {

                        if (X[req.query.sil]["yetki"] == 0) {

                            console.log("The records of "+req.query.sil+" person, whose membership expiration date is "+X[req.query.sil]["bitis"]+", were deleted by "+req.query.hesap+" person.")

                        } else if (X[req.query.sil]["yetki"] == 1) {

                            console.log("The records of "+req.query.sil+" person, who is a moderator, were deleted by "+req.query.hesap+" person.")

                        }

                        delete X[req.query.sil]

                        for (G1 = 0, G2 = []; G1 != X["array"].length; G1++) {

                            if (X["array"][G1] != req.query.sil) {
                                G2[G2.length] = X["array"][G1]
                            }

                        }

                        X["array"] = [...G2]

                        fs.writeFile(__dirname + "/hesap.json", JSON.stringify(X), function (err) {

                            if (err) {
                                console.log("The operation was a success.")
                            } else {
                                console.log("The operation was unsuccessful.")
                            }

                        });

                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/liste?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + "&yetki=" + X[req.query.hesap]["yetki"] + "';</script>")
                    }

                } else {

                    res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/liste?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + "&yetki=" + X[req.query.hesap]["yetki"] + "';</script>")

                }

            } else {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

    }

})

app.get('/ekle', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "admin": {
                        "şifre": "selonungötdeliği",
                        "yetki": 2
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                //Date processing
                D1 = X[req.query.ehesap]["bitis"]
                D2 = []

                if (D1[3] == 0) {
                    D2[0] = parseInt((D1[4]), 10)
                } else {
                    D2[0] = parseInt((D1[3] + D1[4]), 10)
                }

                D2[1] = parseInt((D1[6] + D1[7] + D1[8] + D1[9]), 10)

                D2[0] += parseInt(req.query.ay, 10)

                if (D2[0] >= 12) {
                    D2[1] += Math.floor(D2[0] / 12)
                    D2[0] = D2[0] % 12
                }

                X[req.query.ehesap]["bitis"] = D1[0] + D1[1] + "/" + D2[0] + "/" + D2[1]

                console.log(req.query.hesap + " tarafindan , " + req.query.ehesap + " adli kisinin hesabına " + req.query.ay + " ay eklendi")

                fs.writeFile(__dirname + "/hesap.json", JSON.stringify(X), function (err) {

                    if (err) {
                        console.log("The operation was a success.")
                    } else {
                        console.log("The operation was unsuccessful.")
                    }


                });

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/liste?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + "&yetki=" + X[req.query.hesap]["yetki"] + "';</script>")
            } else {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

    }

})

app.get('/uy', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                if (X[req.query.hesap]["yetki"] == 2) {

                    res.sendFile(__dirname + "/2.htm")

                } else {

                    res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

                }

            } else {

                res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = http://127.0.0.1:" + port + ";</script>")

    }

})

app.get('/y', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                if (X[req.query.hesap]["yetki"] == 1) {

                    res.sendFile(__dirname + "/1.htm")

                } else {

                    res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

                }

            } else {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

    }

})

app.get('/hekle', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre && X[req.query.hesap]["yetki"] != 0) {

                if (req.query.ehesap == undefined) {

                    res.sendFile(__dirname + "/add.htm")

                } else {

                    if (!(X["array"].includes(req.query.ehesap))) {

                        if (X[req.query.hesap]["yetki"] == 1 && req.query.yetki == 1) {

                            res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/hekle?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + ";</script>")

                        } else {

                            X["array"][X["array"].length] = req.query.ehesap

                            if (req.query.yetki == 1) {

                                X[req.query.ehesap] = {
                                    "yetki": 1,
                                    "sifre": req.query.esifre
                                }

                            } else {

                                X[req.query.ehesap] = {
                                    "yetki": 0,
                                    "sifre": req.query.esifre,
                                    "bitis": ""
                                }

                                if (tarih.getDay() < 10) {
                                    X[req.query.ehesap]["bitis"] += "0" + tarih.getDay() + "/"
                                } else {
                                    X[req.query.ehesap]["bitis"] += tarih.getDay() + "/"
                                }

                                console.log(tarih.getMonth()+parseInt(req.query.ay, 10))
                                if (tarih.getMonth()+parseInt(req.query.ay, 10) < 10) {

                                    X[req.query.ehesap]["bitis"] += "0" + (tarih.getMonth()+parseInt(req.query.ay, 10)) + "/"

                                    X[req.query.ehesap]["bitis"] += tarih.getFullYear()

                                } else {

                                    if(tarih.getMonth()+parseInt(req.query.ay, 10) >= 12){

                                        D1 = tarih.getMonth()+parseInt(req.query.ay, 10)

                                        if(D1 % 12 > 9){

                                            X[req.query.ehesap]["bitis"] += D1 % 12 + "/"
                                            X[req.query.ehesap]["bitis"] += tarih.getFullYear() + Math.floor(D1/12)

                                        }else {

                                            X[req.query.ehesap]["bitis"] += "0" + D1 % 12 + "/"
                                            X[req.query.ehesap]["bitis"] += tarih.getFullYear() + Math.floor(D1/12)

                                        }
                                        

                                    }else {

                                        X[req.query.ehesap]["bitis"] += (tarih.getMonth()+parseInt(req.query.ay, 10)) + "/"
                                        X[req.query.ehesap]["bitis"] += tarih.getFullYear()

                                    }

                                }
                            }

                            console.log("An account named "+req.query.ehesap+" was created by "+req.query.hesap+" person.")

                            fs.writeFile(__dirname + "/hesap.json", JSON.stringify(X), function (err) {

                                if (err) {
                                    console.log("The operation was a success.")
                                } else {
                                    console.log("The operation was unsuccessful.")
                                }    

                            });

                            res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + "';</script>")

                        }

                    } else {

                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/?hesap=" + req.query.hesap + "&sifre=" + req.query.sifre + "';</script>")

                    }

                }

            } else {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

    }

})

app.get('/yo', function (req, res) {

    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                if (X[req.query.hesap]["yetki"] == 0) {

                    if (req.query.bitis == undefined) {

                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "" + req.url + "&bitis=" + X[req.query.hesap]["bitis"] + "';</script>")

                    }

                    res.sendFile(__dirname + "/0.htm")

                } else {

                    res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

                }

            } else {

                res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "';</script>")

    }

})

app.get('/', function (req, res) {
    
    if (req.query.hesap != undefined) {

        fs.readFile(__dirname + "/hesap.json", 'utf8', (err, veri) => {

            if (veri == "") {
                X = {
                    "array":["admin","moderator","customer"],
                    "admin":{
                        "sifre":"password3",
                        "yetki":2
                    },
                    "moderator":{
                        "sifre":"password2",
                        "yetki":0,
                        "bitis":"10/11/2024"
                    },
                    "customer":{
                        "sifre":"password1",
                        "yetki":1
                    }
                }
            } else {
                X = JSON.parse(veri)
            }

            if (X[req.query.hesap] == undefined) {

                res.send("<h1>That account does not exist.</h1><script>setTimeout(function(){ window.location.href = 'http://127.0.0.1:" + port + "' }, 2000);</script>")

            } else if (X[req.query.hesap]["sifre"] == req.query.sifre) {

                switch (X[req.query.hesap]["yetki"]) {
                    case 2:
                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/uy" + req.url + "';</script>")
                        break;
                    case 1:
                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/y" + req.url + "';</script>")
                        break;
                    case 0:
                        res.send("<script>window.location.href = 'http://127.0.0.1:" + port + "/yo" + req.url + "';</script>")
                        break;
                }

            } else {

                res.send("<script>alert('Wrong Password');window.location.href = 'http://127.0.0.1:" + port + "';</script>")

            }

        });

    } else {

        res.sendFile(__dirname + "/index.htm")

    }
})

app.get('/g1.png', function (req, res) {

    res.sendFile(__dirname + "/g1.png")

})

app.listen(port, () => {

    console.log(`Server running at http://127.0.0.1:${port}/`);

})