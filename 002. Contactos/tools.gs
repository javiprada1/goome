/*
  It changes the name of the contact
  name1<--
*/
function crearContacto(name1,name2) { 
  var contacts = ContactsApp.getContactsByName(name1);
  for (var i in contacts) {
   contacts[i].setFullName(name2);
 }
}



//It eliminates the contact of your list 
function eliminarContacto (name1){
   var contacts = ContactsApp.getContactsByName(name1);
   for (var i in contacts) {
   contacts[i].deleteContact();
   }
}
  
  
//It establishes a company to the Contact
function añadirEmpresa(name1,corp1){
  var contacts = ContactsApp.getContactsByName(name1);
  var url = contacts[0].addCompany(corp1);
}
  


//It assigns an e-mail to the contact
function añadirCorreo(name1,correo1){
   var contacts = ContactsApp.getContactsByName(name1);
   var emailField = contacts[0].addEmail(ContactsApp.Field.HOME_EMAIL, correo1);
 
}
  
  
  


