public with sharing class ServiceCalloutDadosCovid19 {
    public static HttpResponse calloutCovid(String hora){                  
            
        Http h = new Http();
    	HttpRequest request = new HttpRequest();        
        request.setEndpoint('https://covid19-brazil-api.vercel.app/api/report/v1/brazil/'+hora);
    	request.setMethod('GET');
    	request.setHeader('Content-Type', 'application/json;charset=UTF-8');
        request.setTimeout(4500);
        HttpResponse response = h.send(request);
        	
        return response;
    }
}