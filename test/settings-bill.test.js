let assert = require("assert");
let settingsBill = require("../settings-bill");

discribe('The settingsBill function', function(){
    it("should be able to set the call cost by what is entered in the input box")

    var settingsBill = FactorySettingsBill();
  
    settingsBill.recordAction(2.00);
    assert.equal(2.00, settingsBill.actions());
    
})