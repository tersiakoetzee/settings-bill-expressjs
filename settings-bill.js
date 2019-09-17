module.exports = function SettingsBill() {

    let smsCost = 0;
    let callCost = 0;
    let warningLevel = 0;
    let criticalLevel = 0;


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

        let cost = 0;
        if (action === 'sms') {
            cost = smsCost;
        }
        else if (action === 'call') {
            cost = callCost;
        }
       

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
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
        return getTotal('sms') + getTotal('call');
    }


    function totals() {


        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')
        let grandTotal = smsTotal + callTotal;


        return {
            smsTotal,
            callTotal,
            grandTotal: getGrandTotal()
        }

    }


    function colorLevel() {
       
        if ((getGrandTotal >= warningLevel) && (totals < criticalLevel)) {
            console.log(getGrandTotal);
            
            return "warning"
        }

        if (getGrandTotal >= criticalLevel) {
            return "danger"
        }

       
        else{
            return ""
        }
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        colorLevel,
        getGrandTotal
    }
}