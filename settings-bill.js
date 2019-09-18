module.exports = function SettingsBill() {

    let smsCost = 0;
    let callCost = 0;
    let warningLevel = 0;
    let criticalLevel = 0;
    let grandTotal = 0;

    let actionList = [];

    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings() {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        if (!fullStop()){ }
        var moment = require('moment');
        let cost = 0;
        
            if (action === 'sms') {
                cost = smsCost;
            }
            else if (action === 'call') {
                cost = callCost;
            }
       
            if(action !== undefined){

        actionList.push({
            type: action,
            cost,
            timestamp:   moment(new Date()).format("HH:mm:ss"),
          
        });
    }
    }

    function actions() {
        return actionList;
    }


    function actionsFor(type) {
        const filteredActions = [];

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                filteredActions.push(action);
            }
        }

        return filteredActions;

    }

    function getTotal(type) {
        let total = 0;
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === type) {
                total += action.cost;
            }
        }


        return total;
    }
    
    function getGrandTotal(){
        return grandTotal
    }


    function totals() {

        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
         grandTotal = smsTotal + callTotal;


        return {
            smsTotal,
            callTotal,
            grandTotal
        }

    }


    function colorLevel() {
     
        if(criticalLevel !== 0){
        if (getGrandTotal() >= warningLevel && getGrandTotal() < criticalLevel) {
           
            
            return "warning"
        }

        if (getGrandTotal() >= criticalLevel) {
            return "danger"
        }

       
        else{
            return "warn";
        }
    }
    }

    function fullStop(){
      return  getGrandTotal() >= criticalLevel

    }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        colorLevel,
        getGrandTotal,
        fullStop,
        

    }
}