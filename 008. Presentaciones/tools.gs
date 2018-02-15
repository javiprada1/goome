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
* Parameter slideId: The Id of the presentacion.
* Parameter number: The number of pages.
*
*/

function createSlides(slideId,number){
  var pres = SlidesApp.openById(slideId);
  for(var i = 1;i<number;i++){
    pres.appendSlide();
  }
}


/*
* Add Slide to a presentation.
*
* Parameter slideId: The Id of the presentacion.
* Parameter index: The position of the new Slide in the presentation
*
*/

function addSlide(slideId, index) {
  var press = SlidesApp.openById(slideId)
  
  press.insertSlide(index, TITLE_ONLY)
}
 