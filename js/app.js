$(function() {

  	$("#dateiss").daterangepicker({
    	singleDatePicker: true,
    	showDropdowns: true,
    	minYear: 1901,
    	maxYear: parseInt(moment().format('YYYY'),10),
    	locale: {
         format: 'DD-MM-YYYY'
      },
      autoUpdateInput: false
  	});


  	$("#dateiss").on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('DD-MM-YYYY'));
  	});


  	$("#form").submit(function(e){
  		e.preventDefault();
		  var dateiss = $("#date").val();

  		alert(dateiss);	
	
const currentDate = new Date(dateiss);
const timestamp = (currentDate.getTime()/1000);
alert("Timestamp" +timestamp);	

		  $.ajax({
			type: "GET",
			url: 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps='+timestamp+'&units=miles',
			dataType: "json",
			success: function (data) {

				var profileTemplate = Handlebars.templates['profile'](data);
				$("#loginC").hide();
				$("#homeC").hide();
				$("#pic").hide();
				$("#profileC").empty();
				$("#bookingC").hide();
				$("#profileC").html(profileTemplate).hide().fadeIn(1000);

			},
			error: function (xhr, statusText, err) {

				if (xhr.status == 401) {
					//response text from the server if there is any
					var responseText = JSON.parse(xhr.responseText);
					bootbox.alert("Error 401 - Unauthorized: " + responseText.message);
				}

				if (xhr.status == 404) {
					bootbox.alert("Error 404 - API resource not found at the server");
				}

			}
		});
   
  	});
});