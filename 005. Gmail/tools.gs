/*
Send an email To a user with an attachment (google Drive)

  Parameter file: The name of the file/s attached(for +1 files just write a ',' and another name)
  Example file --> var file = DriveApp.getFilesByName("Mock-Ups");
  
*/


function sendEmailWithAttachment(file){
  MailApp.sendEmail("adrianurbano.16@campuscamara.es", //Receptor of the email
                     "Ejemplo de adjuntar un archivo", //Subject
                     "escribo algo por poner, la chicha de esto está en el adjunto", // body
     {attachments: file.next().getBlob()} 
 );//End Method
}//Fin funcion

/*
Send an email To a group of user

  Parameter contactList: The list of users whe´re going to send the email
  Example contactList --> var contactList = 'pepitogrillo.curcovein@gmail.com, sharounamamar@gmail.com';
  
*/

function sendEmailToGroup(contactList){
  MailApp.sendEmail({
     to: contactList, // Set the recipient 
     subject: "Email to list with Code", // Subject of the mail
     body: "Here is where you set the content of the email"
   }); //End Method
}//End Function

/*
Send an email with HTML format

  Parameter html: Set the html displayed on the email body
  Example -->  var html = 
    '<body>' + 
      '<h2> Test </h2><br />' +
        '<p> Hello moto </p>' +
    '</body>'; 

  Parameter user: The user whe´re going to send the email
  Example user --> var user = 'adrianurbano.16@campuscamara.es';
  
  Parameter subject: The subject of the email
  Example subject --> var subject = 'test';
  
  Parameter body: The body of the email
  Example body --> var body = 'test';
  
*/
function SendEmailHTML(html,user,subject,body) {  
  GmailApp.sendEmail(
     user,                   // recipient
     subject,                // subject 
     body, {                 // body
      htmlBody: html         // advanced options
    }//End body setting (html display)
  ); // End EmailSend 
}//End Function