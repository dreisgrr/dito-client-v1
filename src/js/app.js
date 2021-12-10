import $ from "jquery";
$(document).ready(function () {
  setInterval(function () {
    var currentDate = new Date();
    var today = currentDate.getTime();
    var tomorrow = currentDate.setDate(currentDate.getDate() + 1);
    var diffMs = new Date(tomorrow).setHours(11, 0, 0) - today; // milliseconds
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var diffSeconds = Math.floor(
      (((diffMs % 86400000) % 3600000) % 60000) / 1000
    ); // seconds
    $("#hours").html(diffHrs);
    $("#minutes").html(diffMins);
    $("#seconds").html(diffSeconds);
  }, 1000);
  $("#region").on("click", function () {
    var region_code = $(this).val();
    $("#province").empty();
    $("#city").empty();
    $("#barangay").empty();
    $("#province").ph_locations("fetch_list", [{ region_code: region_code }]);
  });

  $("#region").on("change", function () {
    var region_code = $(this).val();
    $("#province").empty();
    $("#city").empty();
    $("#barangay").empty();
    $("#province").ph_locations("fetch_list", [{ region_code: region_code }]);
  });
  $("#province").on("change", function () {
    var province_code = $(this).val();
    $("#city").empty();
    $("#barangay").empty();
    $("#city").ph_locations("fetch_list", [{ province_code: province_code }]);
  });
  $("#city").on("change", function () {
    var city_code = $(this).val();
    $("#barangay").empty();
    $("#barangay").ph_locations("fetch_list", [{ city_code: city_code }]);
  });

  $("#region").ph_locations({ location_type: "regions" });
  $("#province").ph_locations({ location_type: "provinces" });
  $("#city").ph_locations({ location_type: "cities" });
  $("#barangay").ph_locations({ location_type: "barangays" });
  $("#region").ph_locations("fetch_list");
});
