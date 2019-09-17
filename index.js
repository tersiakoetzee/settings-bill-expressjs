const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const SettingsBill = require('./settings-bill')

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


app.get('/actions', function (req, res) {
    res.render("actions", { actions: settingsBill.actions() })
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render("actions", { actions: settingsBill.actionsFor(actionType) })
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
console.log(':)');
})