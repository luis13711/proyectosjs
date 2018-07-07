<!DOCTYPE>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Ejemplo AJAX</title>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
</head>
<body>
	<form class="form-hotel form-inline wrapper" action="index.php?c=c_frontpage&m=addHotel">
    	<input type="hidden" name="id" value="1">
        <input type="hidden" name="in" value="20-07-2017">
        <input type="hidden" name="out" value="28-07-2017">
        <input type="hidden" name="adt" value="2">
        <input type="hidden" name="chd" value="0">
        <input type="hidden" name="hab" value="1">
        <input type="hidden" name="rooms" value="Varadero">
        <input type="hidden" name="paxes" value="1">
        <input type="hidden" name="age" value="2">
        

        <div class="clearfix visible-sm-block"></div>
        <div class="col-md-2 rating-price-box text-center clear-padding">
                    <div class="rating-box">
                        <div class="row text-center">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon"><i class="fa fa-cutlery"></i></div>
                                    <select class="form-control input-sm select-plan" name="plan">
                                        <option value='1'>CP</option>
                                        <option value='2'>AP</option>
                                        <option value='3'>CMP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
         </div>
         <a  class="btn_add_hotel btn btn-primary btn-block " role="button">
             <div class="tag-price">
             <?php echo $resultado["total"] ?>
             </div>
          </a>
     </form>
  	<script>
  	$(document).ready(function () {
	  	$(".select-plan").change(function (event) {
	        event.stopImmediatePropagation();
			var form = $(this).closest('form')
	        var value = $(this).prop('value')
	        $.ajax({
	            url: 'ejemplo.php' + form.serialize(),
	            type: 'GET',
	            dataType: 'json',
	            beforeSend: function () {
	                form.find(".tag-price").html('<i class="fa fa-spinner fa-pulse fa-fw" aria-hidden="true"></i>')
	            }
	        })
	                .done(function (response) {
	                    form.find(".tag-price").html(response)
	                })
	                .fail(function (response) {
	                    alert('Error', 'Revisa tu Conexion de Internet', 'error');
	                })
	                .always(function (response) {
	                    console.log(response)
	                });
	    });
    });
  	</script>          
  </body>
  </html>