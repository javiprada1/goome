# GPS Cofrade

## Closed project

This project has been closed because Google Maps, through My Maps' utility, already imports a list of places/positions in a spreadsheet. Here are some tips to a correct geocoding of the addresses in the spreadsheet:
<ul>
<li> Google Maps usually recognizes addresses even without street type (av, st, sq, ...).</li>
<li> To find the intersection between two roads, insert an ampersand ("&") between the two street names. In Spanish you can get the same result inserting "cruce" between road names.</li>
<li> If the two previous roads does not intersect, we will get an error.</li>
<li> Obviously you must avoid unclear references or those ones that are not geographical locations.</li>
<li> It is not needed to add town, country, zip, ... if you make zoom in the map or limit geocoder object, although it depends on the app you use (Google Maps, My Maps, Fusion Tables, ..).</li>
</ul>

