/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var example1 = new Vue({
el: 'body',
data:{
    selectedDestino:"",
    selectedHotel:"",
    seleccionado:0,
    destinos: destinosjs,
    hoteles: hotelesjs,
    hotelesViejo: hotelesViejojs,
},
computed: {
    destino: function () {
        console.log($('.selectDestino').val());
        if($('.selectDestino').val() === 'todos'){
            console.log('detecto selección de todos los hoteles');
            this.hoteles = this.hotelesViejo;
        }else{
            var idDestino;
            var arr = this.selectedDestino.split("-");
            var idDestino = arr[0];
            var nuevos_hoteles = [];
            for (i = 0; i < this.hotelesViejo.length; i++) {
              if(idDestino == this.hotelesViejo[i].idDestino){
                  nuevos_hoteles.push(this.hotelesViejo[i]);
              }
            }
            this.hoteles = nuevos_hoteles
        }
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
        var condicion1 = !($('.selectHotel').val().trim() === '');
        var condicion2 = this.seleccionado == 2;
        if(condicion1 && condicion2){
            if ($('#check_in').val()=== '' && $('#check_out').val()=== '' ){
              swal('No puede dejar campos vacios', '', 'warning');
            }
            else if ($('.selectHotel').val().trim() === '')
               swal('Debe agregar un hotel o destino', '', 'warning');
            else if ($('#check_in').val()=== '')
              swal("Debe seleccionar una fecha in");
            else if($('#check_out').val()=== '' )
              swal("Debe seleccionar una fecha out");
            else {
              //elimina las vistas innecesarias
              $(".agregar-imagenes").toggleClass("quitar-imagenes");


              $("body.load-full-screen").LoadingOverlay("show");
              var hotelby = $('.selectHotel').val().split('-');
              var hotel = hotelby[0];
              var by = hotelby[1];
              var check_in = $('#alt-date-check_in').val();
              var check_out = $('#alt-date-check_out').val();
              if($('#alt-date-check_in').val()>=$('#alt-date-check_out').val())
                  swal("La fecha in debe ser menor a la fecha out");
                  var hab = $('#hotel_hab_count').val();
                  //var adt = $('#hotel_adult_count').val();
                  //var chd = $('#hotel_child_count').val();
                  var adt = Array();
                  var chd = Array();
                  var age = Array();
                  $(".hotel_adult_count").each(function() {
                      adt.push($(this).val()) ;
                  });
                  $(".hotel_child_count").each(function() {
                      chd.push($(this).val()) ;
                  });
                  $(".hotel_age_count").each(function() {
                      age.push($(this).val()) ;
                  });

              $.ajax({
                  url: 'index.php?c=c_frontpage&m=reservahotel',
                  type: 'GET',
                  dataType: 'html',
                  data: '&by='+by+'&id='+hotel+'&in='+check_in+'&out='+check_out+'&hab='+hab+'&adt='+adt.join("-")+'&chd='+chd.join("-")+'&age='+age.join("-")+'&user='
              }).done(function (response) {
                  $("#resultados-aloj").html(response);
                  $('button[type="buttom"]').removeAttr("disabled", "disabled");
                              $("body.load-full-screen").LoadingOverlay("hide", true);
              })
              .fail(function (response) {
                  console.log(response);
              })
              .always(function () {
                  //$("#resultados-aloj").unblock();
              });
          }
          return;
        }
        //selectDestino
        else if(!($('.selectDestino').val().trim() === '')){
            if ($('#check_in').val()=== '' && $('#check_out').val()=== '' ){
                swal('No puede dejar campos vac&iacute;os', '', 'warning');
            }
            else if ($('.selectDestino').val().trim() === '')
                 swal('Debe agregar un hotel o destino', '', 'warning');
            else if ($('#check_in').val()=== '')
                swal("Debe seleccionar una fecha in");
            else if($('#check_out').val()=== '' )
                swal("Debe seleccionar una fecha out");
            else {
                //elimina las vistas innecesarias
                $(".agregar-imagenes").toggleClass("quitar-imagenes");

                $("body.load-full-screen").LoadingOverlay("show");
                var hotelby = $('.selectDestino').val().split('-');
                var hotel = hotelby[0];
                var by = hotelby[1];
                var check_in = $('#alt-date-check_in').val();
                var check_out = $('#alt-date-check_out').val();
                if($('#alt-date-check_in').val()>=$('#alt-date-check_out').val())
                    swal("La fecha in debe ser menor a la fecha out");
                    var hab = $('#hotel_hab_count').val();
                    //var adt = $('#hotel_adult_count').val();
                    //var chd = $('#hotel_child_count').val();
                    var adt = Array();
                    var chd = Array();
                    var age = Array();
                    $(".hotel_adult_count").each(function() {
                        adt.push($(this).val()) ;
                    });
                    $(".hotel_child_count").each(function() {
                        chd.push($(this).val()) ;
                    });
                    $(".hotel_age_count").each(function() {
                        age.push($(this).val()) ;
                    });

                $.ajax({
                    url: 'index.php?c=c_frontpage&m=reservahotel',
                    type: 'GET',
                    dataType: 'html',
                    data: '&by='+by+'&id='+hotel+'&in='+check_in+'&out='+check_out+'&hab='+hab+'&adt='+adt.join("-")+'&chd='+chd.join("-")+'&age='+age.join("-")+'&user='
                }).done(function (response) {
                    $("#resultados-aloj").html(response);
                    $('button[type="buttom"]').removeAttr("disabled", "disabled");
                                $("body.load-full-screen").LoadingOverlay("hide", true);
                })
                .fail(function (response) {
                    console.log(response);
                })
                .always(function () {
                    //$("#resultados-aloj").unblock();
                });
            }
        }
    },
    hotel: function () {
        if($('.selectHotel').val() === 'todos'){
            console.log('detecto selección de todos los hoteles');
            this.hoteles = this.hotelesViejo;
        }
    }
}
});

//var example1 = new Vue({
//el: 'body',
//data:{
//    selectedDestino:"",
//    selectedHotel:"",
//    seleccionado:0,
//    destinos: destinosjs,
//    hoteles: hotelesjs,
//    hotelesViejo: hotelesViejojs,
//},
//methods: {
//    destino: function () {
//        console.log($('.selectDestino').val());
//        if($('.selectDestino').val() === 'todos'){
//            console.log('detecto selección de todos los hoteles');
//            this.hoteles = this.hotelesViejo;
//        }else{
//            var idDestino;
//            var arr = this.selectedDestino.split("-");
//            var idDestino = arr[0];
//            var nuevos_hoteles = [];
//            for (i = 0; i < this.hotelesViejo.length; i++) {
//              if(idDestino == this.hotelesViejo[i].idDestino){
//                  nuevos_hoteles.push(this.hotelesViejo[i]);
//              }
//            }
//            this.hoteles = nuevos_hoteles
//        }
//    },
//    hotelSeleccionado: function(){
//      //seleccion de hotel
//      this.seleccionado = 2;
//    },
//    destinoSeleccionado: function(){
//      //seleccion de destino
//      this.seleccionado = 1;
//    },
//    evento_boton: function () {
//        var condicion1 = !($('.selectHotel').val().trim() === '');
//        var condicion2 = this.seleccionado == 2;
//        if(condicion1 && condicion2){
//            if ($('#check_in').val()=== '' && $('#check_out').val()=== '' ){
//              swal('No puede dejar campos vacios', '', 'warning');
//            }
//            else if ($('.selectHotel').val().trim() === '')
//               swal('Debe agregar un hotel o destino', '', 'warning');
//            else if ($('#check_in').val()=== '')
//              swal("Debe seleccionar una fecha in");
//            else if($('#check_out').val()=== '' )
//              swal("Debe seleccionar una fecha out");
//            else {
//              //elimina las vistas innecesarias
//              $(".agregar-imagenes").toggleClass("quitar-imagenes");
//
//
//              $("body.load-full-screen").LoadingOverlay("show");
//              var hotelby = $('.selectHotel').val().split('-');
//              var hotel = hotelby[0];
//              var by = hotelby[1];
//              var check_in = $('#alt-date-check_in').val();
//              var check_out = $('#alt-date-check_out').val();
//              if($('#alt-date-check_in').val()>=$('#alt-date-check_out').val())
//                  swal("La fecha in debe ser menor a la fecha out");
//                  var hab = $('#hotel_hab_count').val();
//                  //var adt = $('#hotel_adult_count').val();
//                  //var chd = $('#hotel_child_count').val();
//                  var adt = Array();
//                  var chd = Array();
//                  var age = Array();
//                  $(".hotel_adult_count").each(function() {
//                      adt.push($(this).val()) ;
//                  });
//                  $(".hotel_child_count").each(function() {
//                      chd.push($(this).val()) ;
//                  });
//                  $(".hotel_age_count").each(function() {
//                      age.push($(this).val()) ;
//                  });
//
//              $.ajax({
//                  url: 'index.php?c=c_frontpage&m=reservahotel',
//                  type: 'GET',
//                  dataType: 'html',
//                  data: '&by='+by+'&id='+hotel+'&in='+check_in+'&out='+check_out+'&hab='+hab+'&adt='+adt.join("-")+'&chd='+chd.join("-")+'&age='+age.join("-")+'&user='
//              }).done(function (response) {
//                  $("#resultados-aloj").html(response);
//                  $('button[type="buttom"]').removeAttr("disabled", "disabled");
//                              $("body.load-full-screen").LoadingOverlay("hide", true);
//              })
//              .fail(function (response) {
//                  console.log(response);
//              })
//              .always(function () {
//                  //$("#resultados-aloj").unblock();
//              });
//          }
//          return;
//        }
//        //selectDestino
//        else if(!($('.selectDestino').val().trim() === '')){
//            if ($('#check_in').val()=== '' && $('#check_out').val()=== '' ){
//                swal('No puede dejar campos vac&iacute;os', '', 'warning');
//            }
//            else if ($('.selectDestino').val().trim() === '')
//                 swal('Debe agregar un hotel o destino', '', 'warning');
//            else if ($('#check_in').val()=== '')
//                swal("Debe seleccionar una fecha in");
//            else if($('#check_out').val()=== '' )
//                swal("Debe seleccionar una fecha out");
//            else {
//                //elimina las vistas innecesarias
//                $(".agregar-imagenes").toggleClass("quitar-imagenes");
//
//                $("body.load-full-screen").LoadingOverlay("show");
//                var hotelby = $('.selectDestino').val().split('-');
//                var hotel = hotelby[0];
//                var by = hotelby[1];
//                var check_in = $('#alt-date-check_in').val();
//                var check_out = $('#alt-date-check_out').val();
//                if($('#alt-date-check_in').val()>=$('#alt-date-check_out').val())
//                    swal("La fecha in debe ser menor a la fecha out");
//                    var hab = $('#hotel_hab_count').val();
//                    //var adt = $('#hotel_adult_count').val();
//                    //var chd = $('#hotel_child_count').val();
//                    var adt = Array();
//                    var chd = Array();
//                    var age = Array();
//                    $(".hotel_adult_count").each(function() {
//                        adt.push($(this).val()) ;
//                    });
//                    $(".hotel_child_count").each(function() {
//                        chd.push($(this).val()) ;
//                    });
//                    $(".hotel_age_count").each(function() {
//                        age.push($(this).val()) ;
//                    });
//
//                $.ajax({
//                    url: 'index.php?c=c_frontpage&m=reservahotel',
//                    type: 'GET',
//                    dataType: 'html',
//                    data: '&by='+by+'&id='+hotel+'&in='+check_in+'&out='+check_out+'&hab='+hab+'&adt='+adt.join("-")+'&chd='+chd.join("-")+'&age='+age.join("-")+'&user='
//                }).done(function (response) {
//                    $("#resultados-aloj").html(response);
//                    $('button[type="buttom"]').removeAttr("disabled", "disabled");
//                                $("body.load-full-screen").LoadingOverlay("hide", true);
//                })
//                .fail(function (response) {
//                    console.log(response);
//                })
//                .always(function () {
//                    //$("#resultados-aloj").unblock();
//                });
//            }
//        }
//    },
//    hotel: function () {
//        if($('.selectHotel').val() === 'todos'){
//            console.log('detecto selección de todos los hoteles');
//            this.hoteles = this.hotelesViejo;
//        }
//    }
//}
//});


