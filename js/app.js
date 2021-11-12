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
			const currentDate = new Date(dateiss);
			const timestamp = (currentDate.getTime()/1000);

			var durationInMinutes = 10;

			currentDate.setMinutes(currentDate.getMinutes() - durationInMinutes);
			const timesbefore = (currentDate.getTime()/1000);
			
			currentDate.setMinutes(currentDate.getMinutes() + (durationInMinutes+10));
			const timesafter=(currentDate.getTime()/1000);
		
			
		  $.ajax({
			type: "GET",
			url: 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps='+timesbefore+','+timestamp+','+timesafter+'&units=miles',
			dataType: "json",
			success: function (data) {
				for(var i=0;i<data.length;i++)
				{
					var longitude = data[i].longitude;
					var latitude = data[i].latitude;
					var utc = tzlookup(latitude,longitude);
					var date = new Date(data[i].timestamp * 1000);
			
					
					var timeTi="<h4>"+date+"</h4>";
					var locationUTC="<p>"+utc+"</p>";
					var visi="<p>"+data[i].visibility+"</p><br>";

				 	$("#output").append(timeTi+ locationUTC+ visi); 
			
				}   
				
			},
			error: function() {
				console.log("error");
			 }
			
		});

  	});
});