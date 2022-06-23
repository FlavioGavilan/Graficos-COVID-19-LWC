public with sharing class CovidWrapper {
    @auraEnabled
    public Integer suspects, refuses, cases, deaths;
    @auraEnabled
    public String uf, state, comments, datetimeReturn;
    @auraEnabled
    public Integer uid;
    @auraEnabled
    public boolean broadcast;

    public CovidWrapper(String uf, Integer cases, Integer deaths, Integer suspects, Integer refuses){
        this.uf         = uf;
        this.cases      = cases;
        this.deaths     = deaths;
        this.suspects   = suspects;
        this.refuses    = refuses;
    }

    public CovidWrapper(){
        
    }
}