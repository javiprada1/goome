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