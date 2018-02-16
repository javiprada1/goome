/*
  It changes the name of the contact
  name1<--It introduces the hanging name that you want to change
  name2<--It introduces the hanging name that you want that it has now
*/
function crearContacto(name1,name2) { 
  var contacts = ContactsApp.getContactsByName(name1);
  for (var i in contacts) {
   contacts[i].setFullName(name2);
 }
}



/*
   It eliminates the contact of your list 
   name1<--It introduces the hanging name that you want to eliminate
*/
function eliminarContacto (name1){
   var contacts = ContactsApp.getContactsByName(name1);
   for (var i in contacts) {
   contacts[i].deleteContact();
   }
}
  
  
/*
  It establishes a company to the Contact
  name1<--It introduces the hanging name that you want to add an e-mail
  corp1<--The hanging introduces company that you want that it has the contact
*/
function añadirEmpresa(name1,corp1){
  var contacts = ContactsApp.getContactsByName(name1);
  var url = contacts[0].addCompany(corp1);
}
  


/*
  It assigns an e-mail to the contact
  name1<--It adds the hanging name that you want that it has an e-mail
  correo1<--The hanging adds e-mail that you want that it has the contact
*/
function añadirCorreo(name1,correo1){
   var contacts = ContactsApp.getContactsByName(name1);
   var emailField = contacts[0].addEmail(ContactsApp.Field.HOME_EMAIL, correo1);
 
}
  
  
  


