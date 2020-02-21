var x = undefined;
$(document).ready (function () {
    $.get('./api/john', function(data, status){
	alert("Data: " + data + "\nStatus: " + status);
    });
});
