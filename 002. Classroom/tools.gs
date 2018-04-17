// Open course list on your logged Google account
// Return array of string course names

function  listcourses() {
  var arrayCursos = Classroom.Courses.list.courses();  // Take a list of courses
  var sincurso='NotFound';
  var salidaArray=[];   //Return array string of name courses
  var curso;
  if (arrayCursos.length > 0) {
    for (i = 0; i < arrayCursos.length; i++) {
      curso = arrayCursos[i];
      salidaArray[i] = curso.name;  // Add to array course names
    }
    return salidaArray;
  } else {
    return sincurso;  // List of course is empty
  }
}

// Void method
// Accept all invitation on your logged google account

function AcceptAllInvitation() {
  inviCourse=Classroom.Invitations.list() // Take a array of id invitation

    if (inviCourse.length > 0) {
    for (i = 0; i < inviCourse; i++) {
      Classroom.Invitations.accept(inviCourse[i]) //Accept invitations of course ID
    }
    }else {
      return 'No Invitations'; // No invitation detected
    }

}



//Take a array of id course
//Accept invitation ID on your logged google account
function AcceptSpecificInvitation(idcourse) { // ID course array
    if (idcourse.length > 0) {
      for (i = 0; i < idcourse; i++) {
      Classroom.Invitations.accept(idcourse[i]) //Accept invitations of course ID
    }
    } else {
      return 'No Invitations';
    }

}




/*
Create a new Announcement with an URL in Google Classroom
  Parameter: The course ID and URL you want notificate

  Example --> var idCourse = "11887915983"; url = "http://goome.es"

  Publish the announcement in Google Classroom course especified

  Imporant!! To make this code works sucessfully, firstly you have to activate the Classroom Api in
  Resource > Cloud Platform > API & Service > Enable API. Finally you have to agree permissions.
*/

function addAnnouncement(idCourse,url) {
  var course = Classroom.Courses.get(idCourse);
  var title = 'Announcement text to '+course.name+'('+course.section+')';
  var formData = {
   'url': url,
   'title': title
 }

  var material = {
  "link":formData
      };

  var ad = Classroom.newAnnouncement();
  ad.text = title;
  ad.alternateLink = url;
  ad.materials = material;
  ad.state = "PUBLISHED";

  Classroom.Courses.Announcements.create(ad, idCourse);
}
