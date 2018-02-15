
/*
* Create a presentation and return the id of this.
* 
* Parameter name: The name of the new presentacion.
*
* Uses: openById(createSlidesByName(name))
*/
function createSlidesByName(name){
  var pres = SlidesApp.create(name);
  return pres.getId();
}
 

/*
* Open a presentation an adds number Slides.
* 
* Parameter name: The name of the new presentacion.
* Parameter number: The number of pages.
*
* Uses: openById(createSlidesByName(name))
*/

function createSlides(slideId,number){
  var pres = SlidesApp.openById(slideId);
  for(var i = 1;i<number;i++){
    pres.appendSlide();
  }
}
 