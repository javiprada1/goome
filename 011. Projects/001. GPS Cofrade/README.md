# GPS Cofrade

## Closed project

This project has been closed because Google Maps, through My Maps' utility, already imports a list of places/positions in a spreadsheet. We can give a few advices to a correct geocoding of the addresses in the spreadsheet (INCOMPLETED TRANSLATION):
<ul>
<li> Google en general reconoce las calles aunque no se ponga el tipo de calle (calle, avenida, plaza, etc.)
<li> Google reconoce la sintasix Calle cruce Calle. Aunque la muestra como Calle & Calle, sitúa correctamente el punto en la intersección de las calles.
<li> Obviamente, hay que intentar evitar las referencias que no son localizaciones geográficas, como por ejemplo 'Salida parroquia', 'Saliendo de la Encarnación cruce Laraña', 'Inicio Campana tras vuelta', 'Palquillo', etc.
<li> También da error si se da un cruce de calles que en realidad no se cruzan (según Google Maps). Hay algunos entronques/derivaciones extraños donde Google no tiene claro el nombre de la calle (o al menos no coincide con los nombres indicados en la hoja de cálculo).
<li> Situando el mapa en el contexto adecuado (Sevilla), o limitando el objeto Geocoder, no parece que haya que añadir ', Sevilla' a las direcciones, aunque esto puede variar según la aplicación que estemos utilizando (Google Maps, My Maps, Fusion Tables, etc.).
</ul>

## Installation

> To install and use GPS Cofrade...
