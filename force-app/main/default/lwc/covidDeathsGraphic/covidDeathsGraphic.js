import { LightningElement, wire } from 'lwc';
import getValoresCovid from '@salesforce/apex/ControllerCalloutCovid19.getValoresCovid'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CovidDeathsGraphic extends LightningElement {
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
            let chartDeaths = [];            
            let chartUF = [];
            
            data.forEach(covid => {
                chartDeaths.push(covid.deaths);                
                chartUF.push(covid.uf);                
            });

            data.forEach(v=>{
                console.log('valor de data: ', v.datasets)
            });

            this.chartConfiguration = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'Mortes confirmadas de Covid-19',
                        backgroundColor: "orange",
                        data: chartDeaths,
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