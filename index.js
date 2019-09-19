const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const SettingsBill = require('./settings-bill')
const moment = require('moment');
moment().format()

const app = express();
const settingsBill = SettingsBill();

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())



app.get('/', function (req, res) {
    res.render('index', {
        total: settingsBill.totals(),
        color: settingsBill.colorLevel(),
        settings:  settingsBill.getSettings()
        // criticalLevel: settingsBill.colorLevel()

    });
})


app.post('/settings', function (req, res) {
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    })
    res.redirect('/');
});


app.post('/action', function (req, res) {

    settingsBill.recordAction(req.body.actionType)
    res.redirect('/');
});

//get route for actions.
app.get('/actions', function (req, res) {
    var stamp = settingsBill.actions()
    for (let i = 0; i < stamp.length; i++) {
     const time = stamp[i];
      time.tait = moment(time.timestamp).fromNow()  
    }
    res.render("actions", { actions: stamp })
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    var stamp = settingsBill.actionsFor(actionType)
    for (let i = 0; i < stamp.length; i++) {
     const time = stamp[i];
      time.tait = moment(time.timestamp).fromNow()  
    }
    res.render("actions", { actions: stamp })
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
console.log(':)');
})