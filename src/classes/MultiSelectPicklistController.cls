public with sharing class MultiSelectPicklistController {

    @AuraEnabled
    public static List<String> getOptions(String objectAPIName, String fieldAPIName) {
        List<String> options = new List<String>();

        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objectAPIName).getDescribe().fields.getMap();

        List<Schema.PicklistEntry> ple = fieldMap.get(fieldAPIName).getDescribe().getPickListValues();

        for( Schema.PicklistEntry f : ple)
        {
            options.add(f.getLabel());
        }
        return options;
    }
}