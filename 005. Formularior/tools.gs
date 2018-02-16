/*
Create new Form with name 

  Parameter name: The name of form. Type String: 'Prueba2'
  Return the form as an object so that it can be used in other functions 
   
*/
function newForm(name){
   var form = FormApp.create(name);
  return form;
}


/*
Create a multiple choice question in form  

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your favorite fruit?";

  Parameter answers: The answers to our question
  Example answers -->
                    var answers=[];
                    answers[0]="pera";
                    answers[1]="fresa";
  Return the question as an object so that it can be used in other functions 
                    
*/
function newMultipleChoice(form,question,answers){
  var quest=form.addMultipleChoiceItem()
    .setTitle(question)
  .setChoiceValues(answers)
  .setRequired(true);
  return quest;
  
}


/*
Create a date question in form 

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your birthdate?";

  Return the question as an object so that it can be used in other functions 
*/
function newDateQuestion(form,question){
 var item = form.addDateItem();
 item.setTitle(question);
  return item;
 
}


/*
Create a page break in form

  Parameter form: The form where we want to create a page break
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

*/
function pageBreak(form){
  form.addPageBreakItem();
}

  
/*
Create a checkbox question in form 

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your favorite fruit?";

  Parameter answers: The answers to our question
  Example answers -->
                    var answers=[];
                    answers[0]="pera";
                    answers[1]="fresa";
                    
  Return the question as an object so that it can be used in other functions 
*/
  function checboxQuestion(form,question,answers){
    var item = form.addCheckboxItem();
    item.setTitle(question);
    item.setChoiceValues(answers);
    
    return item;
    }


/*
Create a new short answer question

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your favorite fruit?";
  
 Return the question as an object so that it can be used in other functions 
  
*/
function shortTextQuestion(form,question){
   var textItem=form.addTextItem().setTitle(question);
  return textItem;
}


/*
Create a new long answer question

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your favorite fruit?";
  
  Return the question as an object so that it can be used in other functions 
  
*/
function longTextQuestion(form,question){
 var item = form.addParagraphTextItem();
 item.setTitle(question);
  return item;
}



/*
Create textEmailValidation

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter textItem: The text question that we want to be validated
  Example question --> var textquestion= textQuestion();

*/
function emailValidationText(form,textItem){
  var textValidation = FormApp.createTextValidation()
  .requireTextIsEmail()
  .build();
  textItem.setValidation(textValidation);
}



/*
Required question

  Parameter textItem: The text question that we want to be required
  Example question --> var textquestion= textQuestion();
  
*/

function required(question){
  question.setRequired(true);
}




