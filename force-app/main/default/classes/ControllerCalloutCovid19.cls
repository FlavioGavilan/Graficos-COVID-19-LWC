public with sharing class ControllerCalloutCovid19 {
    @AuraEnabled(cacheable=true)      
    public static List<CovidWrapper> getValoresCovid(){
        List<String> lListDate = new List<String>{
            '20220130', '20220227', '20220329', '20220429',  
            '20220529','20220610'
        };                
        List<CovidWrapper> lListCovidWrapper = new List<CovidWrapper>();

        for(String iData : lListDate){
            HttpResponse response = ServiceCalloutDadosCovid19.calloutCovid(iData);
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> lListObject = (List<Object>) results.get('data');
            lListCovidWrapper = returnListCovidValues(lListObject);
        }
        return lListCovidWrapper;
    }
    
    public static List<CovidWrapper> returnListCovidValues(List<Object> lListObject){
        Map<String, Object> lMap = new Map<String, Object>();
        List<CovidWrapper> lList = new List<CovidWrapper>();

        for(Object o : lListObject){
            CovidWrapper lCovid = new CovidWrapper();
            lMap = (Map<String, Object>) o;
            lCovid.uid 				    = (Integer) lMap.get('uid');
            lCovid.uf 			        = (String) lMap.get('uf');
            lCovid.state 			    = (String) lMap.get('state');
            lCovid.cases 			    = (Integer) lMap.get('cases');
            lCovid.deaths 			    = (Integer) lMap.get('deaths');
            lCovid.suspects 		    = (Integer) lMap.get('suspects');
            lCovid.refuses 			    = (Integer) lMap.get('refuses');
            lCovid.broadcast 		    = (Boolean) lMap.get('broadcast');            
            lCovid.comments 		    = (String) lMap.get('comments');
            lCovid.datetimeReturn 	    = (String) lMap.get('datetime');
            lList.add(lCovid);
        }                
        return lList;
    }
}