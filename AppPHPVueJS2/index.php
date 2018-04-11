<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://unpkg.com/vue"></script>
    </head>
    <body>
        <div class="container-fluid" id="app">
            <select
                v-model="selectedDestino"
                class="selectDestino require-error borde-select texto-blanco"
                data-live-search="true"
                title="Destino, Cuidad, Localidad..."
                v-on:change="destino()"
                v-on:click="destinoSeleccionado"
                required="required">
                <optgroup label="Destino">
                    <option 
                        value="todos" 
                        selected>
                      Seleccione un destino
                    </option>
                    <option 
                        v-for="destino in destinos" 
                        v-bind:value="destino.idDestino+'-destino'">
                        {{ destino.ciudad }}
                    </option>
                </optgroup>
            </select>
            <select
                v-model="selectedHotel"
                class="selectHotel require-error borde-select"
                data-live-search="true"
                title="Nombre del Hotel"
                v-on:change="hotel()"
                v-on:click="hotelSeleccionado"
                required="required">
                <optgroup label="Hotel">
                    <option selected>
                      Seleccione un Hotel
                    </option>
                    <option
                        v-for="hotel in hoteles"
                        v-bind:value="hotel.idHotel+'-hotel'">
                        {{ hotel.nombre }}
                    </option>
                </optgroup>
                <optgroup label="Hoteles">
                    <option
                      value="todos">
                      Mostrar Todos los Hoteles
                    </option>
                </optgroup>
            </select>
            <span> Selected: {{selectedDestino}}</span>
            <span> Selected: {{selectedHotel}}</span>
        </div>
<?php 
$arr_destinos[0] = ['idDestino' => 1, 'ciudad' => "Varadero"];
$arr_destinos[1] = ['idDestino' => 2, 'ciudad' => "Habana"];
 
$arr_hoteles[0] = [
    "idHotel" => 1, 
    "idDestino" => 1, 
    "nombre" => 'Hotel Varadero 1',
    "categoria"=>'hotel'
    ];
$arr_hoteles[1] = [
    "idHotel" => 2, 
    "idDestino" => 1, 
    "nombre" => 'Hotel Varadero 2',
    "categoria"=>'hotel'
    ];
$arr_hoteles[2] = [
    "idHotel" => 3, 
    "idDestino" => 1, 
    "nombre" => 'Hotel Varadero 3',
    "categoria"=>'hotel'
    ];
$arr_hoteles[3] = [
    "idHotel" => 4, 
    "idDestino" => 2, 
    "nombre" => 'Hotel Habata 1',
    "categoria"=>'hotel'
    ];
$arr_hoteles[4] = [
    "idHotel" => 5, 
    "idDestino" => 2, 
    "nombre" => 'Hotel Habana 2',
    "categoria"=>'hotel'
    ];
$arr_hoteles[5] = [
    "idHotel" => 6, 
    "idDestino" => 2, 
    "nombre" => 'Hotel Habana 3',
    "categoria"=>'hotel'
    ];
//foreach ($arr_destinos as $destino)
//    echo "<option value='".$destino['idDestino']."-destino'>".$destino['ciudad']."</option>"; 
?>
        <span>Selected: {{ selectedDestino | json }}</span>
        <!--<script src="js/jquery-2.2.3.min.js"></script>-->
        <!--<script src="js/vue.js"></script>-->
<!--        <script
        src="https://cdn.jsdelivr.net/vue.resource/2.1.10/vue-resource.min.js">
        </script>
        <script src="https://unpkg.com/vue@2.1.10/dist/vue.js"></script>-->
        <script type="text/javascript">
            var destinosjs = <?php echo json_encode($arr_destinos);?>;
            var hotelesjs = <?php echo json_encode($arr_hoteles);?>;
            var hotelesViejojs = <?php echo json_encode($arr_hoteles);?>;

var example1 = new Vue({
el: '#app',
data:{
    selectedDestino:"",
    selectedHotel:"",
    seleccionado:0,
    destinos: destinosjs,
    hoteles: hotelesjs,
    hotelesViejo: hotelesViejojs,
},
methods: {
    destino: function () {
        var idDestino;
        var arr = this.selectedDestino.split("-");
        var idDestino = arr[0];
        var nuevos_hoteles = [];
        for (i = 0; i < this.hotelesViejo.length; i++) {
          if(idDestino == this.hotelesViejo[i].idDestino){
              nuevos_hoteles.push(this.hotelesViejo[i]);
          }
        }
        this.hoteles = nuevos_hoteles;
        
    },
    hotelSeleccionado: function(){
      //seleccion de hotel
      this.seleccionado = 2;
    },
    destinoSeleccionado: function(){
      //seleccion de destino
      this.seleccionado = 1;
    },
    evento_boton: function () {
    },
    hotel: function () {
        if(this.selectedHotel === 'todos'){
            console.log('detecto selección de todos los hoteles');
            this.hoteles = this.hotelesViejo;
        }
    }
}
});
        </script>
        <!--<script src="js/footer.js"></script>-->
    </body>
</html>

