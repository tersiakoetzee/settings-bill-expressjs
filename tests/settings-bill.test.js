discribe('The Settings bill function', function(){
    it("should be able to set the call cost by what is entered in the input box")

    var settingsItems = FactorySettingsBill();
  
    settingsItems.setCall(2.00);
    assert.equal(2.00, settingsItems.getCallTotal());
    
})