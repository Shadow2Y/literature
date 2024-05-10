const express = require('express');
const randomstring = require('randomstring');
const NodeCache = require( "node-cache" );
const svgCaptcha = require('svg-captcha');
const bodyParser = require('body-parser');
const cors = require('cors');

const captchaData = new NodeCache( { stdTTL: 60, checkperiod: 60 } );
const roomData = new NodeCache( { stdTTL: 6000, checkperiod: 100 } );
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3001;

app.get('/captchaid',(req,res) => {
    const captcha = svgCaptcha.create();
    const captchaId = randomstring.generate(6);
    const captchaImg = captcha.data;
    captchaData.set(captchaId,captcha.text);
    console.log("/captchaid")
    res.send({captchaId,captchaImg});
})

app.post('/joinroom',(req,res) => {
    const body = req.body;
    const captchaId = body.captchaId;
    const captchaText = body.captchaText;
    let roomCode = body.roomCode;
    if(captchaData.get(captchaId)!=captchaText || body.userName=='') {
        res.send("ERROR");
        return;
    }
    else{
    if(roomCode=='')
        roomCode = randomstring.generate(8);
        let data = roomData.get(roomCode);
        if(!data)
            data = {'userNames':[]}
        let newUserData = data.userNames;
        newUserData.push(body.userName)
        data = {userNames: newUserData};
        roomData.set(roomCode,data);
    
    res.send({status:"JOINED",roomCode})
    console.log(roomData.data);
}})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });