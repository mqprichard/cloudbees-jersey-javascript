function getCountriesJSON(response)
{
  var countriesJSON = eval('(' + response + ')');
  var countries = countriesJSON.countries;

  var countriesPage = "";
  countriesPage += "<table id=\"stats\">";
  countriesPage += "<th>Id</th><th>Country</th><th>Capital</th>";

  for (var j=0; j < countries.length; j++) {
    if (j%2 == 0) countriesPage += "<tr>";
    else countriesPage += "<tr class=\"alt\">";
    countriesPage += "<td>" + countries[j].id + "</td>"
                  + "<td>" + countries[j].country + "</td>"
                  + "<td>" + countries[j].capital + "</td>"
                  + "</tr>";
  }
  countriesPage += "</table>";
  return countriesPage;
}

function getCountries() 
{
  var url = "/mark/countries";

  // AJAX code for Mozilla, Safari, Opera etc.
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var countriesDoc = getCountriesJSON(xmlhttp.responseText);
        var elt = document.getElementById("stats");
        elt.innerHTML = countriesDoc;
      }
    };
    xmlhttp.send(null);
  }
  // AJAX code for IE
  else if (window.ActiveXObject)  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    if (xmlhttp) {
      xmlhttp.open("GET", url);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var countriesDoc = getCountriesJSON(xmlhttp.responseText);
          var elt = document.getElementById("stats");
          elt.innerHTML = countriesDoc;
        } 
      };
      xmlhttp.send(null);
    }
  }
}

