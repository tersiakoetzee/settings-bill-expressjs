let assert = require("assert");
let SettingsBill = require("../settings-bill");

describe('The settingsBill function', function () {

    it(' should be able to set the item type and cost ', function () {
        var settingsBill = SettingsBill();
        let settings = {
            smsCos: 2,
            callCost: 4,
            warningLevel: 8,
            criticalLevel: 10
        }
        settingsBill.setSettings(settings)

        settingsBill.recordAction(['time,cost'])

        assert.equal(settingsBill.recordAction(['call,R2,']));
    });

    it(' should be able to set the selected items cost and time ', function () {
        var settingsBill = SettingsBill();

        settingsBill.recordAction(['type,cost,timestamp'])

        assert.equal(settingsBill.recordAction(['sms,R0.65, one min ago']));
    });

    it(' should be able to add the total of sms and calls', function () {
        var settingsBill = SettingsBill();
        let settings = {
            smsCos: 2,
            callCost: 4,
            warningLevel: 8,
            criticalLevel: 10
        }
        settingsBill.setSettings(settings)
        settingsBill.recordAction('call')
        settingsBill.recordAction('sms')
        console.log(settingsBill.actions())
        console.log(settingsBill.actionsFor('sms'))
        assert.deepEqual(settingsBill.actionsFor('sms').length, 1);
    });

    it('should be returning warn as the critical amount is R10', function(){
        var settingsBill = SettingsBill();
        let settings = {
            smsCos: 2,
            callCost: 4,
            warningLevel: 8,
            criticalLevel: 10
        }
        settingsBill.setSettings(settings)
        settingsBill.recordAction('call')
        settingsBill.recordAction('call')
        settingsBill.recordAction('sms')
        settingsBill.recordAction('sms')
        assert.deepEqual(settingsBill.colorLevel(10.00), 'warn')

    });
    it('should be returning warn as the warning amount is R8', function(){
        var settingsBill = SettingsBill();
        let settings = {
            smsCos: 2,
            callCost: 4,
            warningLevel: 8,
            criticalLevel: 10
        }
        settingsBill.setSettings(settings)
        settingsBill.recordAction('call')
        settingsBill.recordAction('call')
        
        assert.deepEqual(settingsBill.colorLevel(8.00), 'warn')

    });



})