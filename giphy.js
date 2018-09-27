$(document).ready(function() {

    var ramsay = [
      "Gordon Ramsay", "Ramsay", "Hell's Kitchen", "Hotel Hell", "Kitchen Nightmares", "Master Chef",
      "Master Chef Junior", "Idiot Sandwich"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".ramsay-button", function() {
      $("#ramsay").empty();
      $(".ramsay-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var ramsayDiv = $("<div class=\"ramsay-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var ramsayImage = $("<img>");
            ramsayImage.attr("src", still);
            ramsayImage.attr("data-still", still);
            ramsayImage.attr("data-animate", animated);
            ramsayImage.attr("data-state", "still");
            ramsayImage.addClass("ramsay-image");
  
            ramsayDiv.append(p);
            ramsayDiv.append(ramsayImage);
  
            $("#ramsay").append(ramsayDiv);
          }
        });
    });
  
    $(document).on("click", ".ramsay-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-ramsay").on("click", function(event) {
      event.preventDefault();
      var newramsay = $("input").eq(0).val();
  
      if (newramsay.length > 2) {
        ramsay.push(newramsay);
      }
  
      populateButtons(ramsay, "ramsay-button", "#ramsay-buttons");
  
    });
  
    populateButtons(ramsay, "ramsay-button", "#ramsay-buttons");
  });
  