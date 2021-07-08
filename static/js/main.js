// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

//add notes here
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// show meta data
d3.json("/showData", function (data) {
    console.log(data);
      // reference the tbody section where the table data will go 
    var tbody = d3.select("tbody");

    data.forEach(crimeRow => {
        // add a new roaw for each entry
        var newRow = tbody.append("tr");

        Object.entries(crimeRow).forEach(function([key, value]){
            console.log(key,value);

            // add these to the table
            var newCell = newRow.append("td");
            newCell.text(value);
                  
        })
  })

});

