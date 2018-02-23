/*
* Create a presentation and return the id of this.
* 
* Parameter name: The name of the new presentation.
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
* Parameter slideId: The Id of the presentation.
* Parameter number: The number of slides.
*
*/

function addSlide(slideId,number){
  var pres = SlidesApp.openById(slideId);
  for(var i = 1;i<number;i++){
    pres.appendSlide();
  }
}


/*
* Open and add Slide to a presentation.
*
* Parameter slideId: The Id of the presentation.
* Parameter index: The position of the new Slide in the presentation
*
*/

function addSlide(slideId, index) {
  var press = SlidesApp.openById(slideId);
  
  press.insertSlide(index, TITLE_ONLY);
}


/*
* Open and add a text box in the center of the selected slide
* 
* Parameter slideId: The Id of the presentation.
* Parameter index: The position of the Slide in the presentation
*
*/

function addTextBoxCentered(index){
  var press = SlidesApp.getActivePresentation();
  
  var textBox = SlidesApp.ShapeType.TEXT_BOX; 
  press.getSlides()[index].insertShape(textBox, 75, 100, 600, 300);
}
 

/*
* Add a new image in the presentation with the given url
*
* Parameter index: The position of the Slide in the presentation.
* Parameter url: The url of the image.
*
*/

function addImage(index, url){
  var press = SlidesApp.getActivePresentation();
  press.getSlides()[index].insertImage(url);
}


/*
* Add a video in the presentation with the given url
*
* Parameter index: The position of the Slide in the presentation.
* Parameter url: The url of the video.
*/

function addVideo(index, url){
  var press = SlidesApp.getActivePresentation();
  press.getSlides()[index].insertVideo(url);
}


/*
* Add an image to the layout of the active presentation
*
* Parameter index: The position of the Slide in the presentation.
* Parameter url: The url of the image.
*/

function editLayout(index, url){
  var press = SlidesApp.getActivePresentation();
  
  press.getLayouts()[index].insertImage(url);
}