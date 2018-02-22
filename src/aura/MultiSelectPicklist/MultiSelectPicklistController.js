({
    doInit : function(component, event, helper){
        helper.getTheOptions(component);
    },

    recordHasUpdated : function(component, event, helper){
        var changeType = event.getParams().changeType;
        if(changeType === "LOADED") {
            var theRecord = component.get("v.theRecord");
            if (theRecord && theRecord["fields"]) {
                var fieldAPIName = component.get("v.fieldAPIName");
                if(theRecord["fields"][fieldAPIName]["value"]){
                    var optionsArray = theRecord["fields"][fieldAPIName]["value"].split(';');
                    component.set("v.selectedOptions", optionsArray);
                }
            }
        }
    },

    updateRecord : function(component, event, helper){
        var selectedOptions = component.get("v.selectedOptions");
        var fieldAPIName = component.get("v.fieldAPIName");
        var optionsList = '';
        if(selectedOptions){
            optionsList = selectedOptions.join(';');
        }
        var theRecord = component.get("v.simpleRecord");
        theRecord[fieldAPIName] = optionsList;
        component.set("v.simpleRecord", theRecord);
        component.find("theRecordData").saveRecord(function (saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                console.log('saved successfully');
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving Record, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },
})