({
    getTheOptions : function(component) {
        var objectAPIName = component.get("v.objectAPIName");
        var fieldAPIName = component.get("v.fieldAPIName");
        var action = component.get("c.getOptions");

        action.setParams({
            "objectAPIName": objectAPIName,
            "fieldAPIName": fieldAPIName
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var options = response.getReturnValue();
                var actualOptions = [];
                for(var i = 0; i < options.length; i++){
                    var anOption = {};
                    anOption.label = options[i];
                    anOption.value = options[i];
                    actualOptions.push(anOption);
                }
                component.set("v.options", actualOptions);
                var fieldAPIName = component.get("v.fieldAPIName");
                var fieldAPINameList = [];
                fieldAPINameList.push(fieldAPIName);
                component.set("v.fieldAPINameList", fieldAPINameList);
                component.set("v.showPicklist", true);
            }
        });
        $A.enqueueAction(action);
    },
})