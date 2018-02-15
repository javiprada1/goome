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

