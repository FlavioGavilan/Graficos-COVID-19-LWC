import { LightningElement, wire } from 'lwc';
import getValoresCovid from '@salesforce/apex/ControllerCalloutCovid19.getValoresCovid'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CovidSuspectsGraphic extends LightningElement {
    chartConfiguration;
    @wire(getValoresCovid)    
    getValoresCovid({ error, data }) {
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Chart',
                    message: error.message,
                    variant: 'error',
                })
            );
        } else if (data) {            
            let chartSuspects = [];            
            let chartUF = [];
            
            data.forEach(covid => {                
                chartSuspects.push(covid.suspects);                
                chartUF.push(covid.uf);                

            });

            data.forEach(v=>{
                console.log('valor de data: ', v.datasets)
            });

            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Suspeitas de Covid-19',
                        backgroundColor: "blue",
                        data: chartSuspects,
                    }                    
                ],
                    labels: chartUF,
                },
                options: {},
            };
            console.log('data => ', data);
            this.error = undefined;
        }
    }
}