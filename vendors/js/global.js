
function startDataTable(id){
   $(id).DataTable();
   var idt = id+'_wrapper'
   $(idt).addClass("table-location");
}

function menuToggel(){
  if ($("#shadow").hasClass("shadowToggle")) {
  $('#shadow').removeClass("shadowToggle");
} else {
  $('#shadow').addClass("shadowToggle");
}

 if ($("#navTopbar").hasClass("topbarToggle")) {
  $('#navTopbar').removeClass("topbarToggle");
} else {
  $('#navTopbar').addClass("topbarToggle");
}
  
  if($("#content-wrapper").hasClass("toggleWrapper")) {
    $("#content-wrapper").removeClass("toggleWrapper")
  } else {
    $("#content-wrapper").addClass("toggleWrapper")
  }

}

function sectionDisplay(id){
  if($(id).hasClass("d-none")){
    $(id).removeClass("d-none");
  }
}

$(function() {
  
  // elementos de la lista
  var menues = $(".navbar-nav li"); 

  // manejador de click sobre todos los elementos
  menues.click(function() {
     // eliminamos active de todos los elementos
     menues.removeClass("active");
     // activamos el elemento clicado.
     $(this).addClass("active");
  });

});

$(document).ready(function() {

  $(function() {
  
  // elementos de la lista
  var menues = $(".navbar-nav li"); 

  // manejador de click sobre todos los elementos
  menues.click(function() {
     // eliminamos active de todos los elementos
     menues.removeClass("active");
     // activamos el elemento clicado.
     $(this).addClass("active");
  });

});
  
    $('#item-locations0').DataTable();
    var idt = '#item-locations0_wrapper'
    $(idt).addClass("table-location");


/*    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        widgetPositioning: {
            vertical: "bottom", horizontal: "left"
        }
    });*/
} );

$(document).ready(function() {
    $('#sales_order').DataTable();

    $('#datepickerInit').datepicker({
        uiLibrary: 'bootstrap4'
    });

    $('#datepickerEnd').datepicker({
        uiLibrary: 'bootstrap4'
      });

     $('#fvenc').datepicker({
         format: 'mm/dd/yyyy',
         autoclose: true,
         widgetPositioning: {
            vertical: "bottom", horizontal: "left"
         }
     });

    $(function () {

      var getDate = function (input) {
         return new Date(input.date.valueOf());
      }

      $('#entrada').datepicker({
         format: "dd/mm/yyyy",
         language: 'es',
         
         autoclose: true,
      });
      var a = $('#entrada').datepicker("getDate");
      $('#salida').datepicker({
         startDate: a,
         format: "dd/mm/yyyy",
         language: "es",
         autoclose: true
      });

      $('#entrada').datepicker().on('changeDate', function (ev) {
       //Obtenemos la fecha de entrada
       var date2 = $('#entrada').datepicker('getDate');
       console.log(date2);
       //Sumamos un día a la fecha de entrada
       date2.setDate(date2.getDate()+1);
        //Asignamos la nueva fecha de comienzo al datepicker de salida
       $('#salida').datepicker('startDate', date2);
      });

    });
} );


