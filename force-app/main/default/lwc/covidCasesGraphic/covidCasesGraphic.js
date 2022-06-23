import { LightningElement, wire } from 'lwc';
import getValoresCovid from '@salesforce/apex/ControllerCalloutCovid19.getValoresCovid'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CovidCasesGraphic extends LightningElement {
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
            let chartCases = [];            
            let chartUF = [];
            
            data.forEach(covid => {
                chartCases.push(covid.cases);                
                chartUF.push(covid.uf);                

            });

            data.forEach(v=>{
                console.log('valor de data: ', v.datasets)
            });

            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Casos de Covid-19',
                        backgroundColor: "green",
                        data: chartCases,
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