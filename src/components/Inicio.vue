<template>
    <div id="Inicio">

        <v-layout :wrap="true">

            <v-flex xs12 sm12 md12 lg1>

                <v-card id="calendario">

                    <v-date-picker v-model="fecha" full-width locale="es-cl" :min="minimo" :max="maximo" @change="getDolar(fecha)">

                    </v-date-picker>

                </v-card>

                <v-card id="carta">

                    <v-car-text>

                         {{ valor }} Pesos Chilenos

                    </v-car-text>

                </v-card>
                <v-card id="carta">

                    <v-car-text>

                        {{ valorBitcoin }} Bitcoins

                    </v-car-text>

                </v-card>

            </v-flex>

        </v-layout>

        <v-dialog v-model="loading.estado" hide-overlay persistent width="300">

            <v-card color="succes" dark>

                <v-card-text>

                    {{ loading.titulo }}

                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>

                </v-card-text>

            </v-card>
            
        </v-dialog>
    </div>
</template>


<script>
import axios from "axios";
import { mapState } from "vuex";
import { mapMutations } from "vuex"

export default {
	name: 'Inicio',

	data: () => ({
		fecha: new Date().toISOString().substr(0, 10),
		minimo: '1984',
		maximo: new Date().toISOString().substr(0, 10),
		valor: null,
		valorBitcoin: null
	}),
	methods:{

		...mapMutations(['mostrarLoading', 'ocultarLoading']),

		async getDolar(dia){
			
			let ddmmyy = dia.split(['-']).reverse().join(['-'])
			
			
			try {

				this.mostrarLoading({titulo:'respuestas...'})

				let datos = await axios.get(`https://mindicador.cl/api/dolar/${ddmmyy}`);
				let dataBitcoin = await axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${dia}&end=${dia}`);

				console.log(dataBitcoin)
				if(datos.data.serie.length > 0){
					this.valor = await datos.data.serie[0].valor;
					this.valorBitcoin = await dataBitcoin.data.bpi[`${dia}`];
					
					console.log(this.valorBitcoin)

					
				
				}else{
					this.valor = 'sin resultados'
				}
				

			} catch(error) {
				console.log(error);
			} 
			finally{
				this.ocultarLoading()
			}

		}
	},
	computed:{
		...mapState(['loading'])
	},

	created(){
		this.getDolar(this.fecha)

	}
};
</script>

<style scope>
	
#carta{
	background-color: #018ABE;
	margin-right: 2.5%;
	margin-top:2.5%;
	padding-top: 1%;
	padding-bottom:1%;
	margin-left: 2.5%;
	color:#D6E8EE;
	text-align: center;
}

#calendario{
	margin-right: 2.5%;margin-left: 2.5%;
}

</style>


