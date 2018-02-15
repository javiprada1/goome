/*
Create new Form with name 

  Parameter name: The name of form. Type String: 'Prueba2'
   
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
                    
*/
  function checboxQuestion(form,question,answers){
    var item = form.addCheckboxItem();
    item.setTitle(question);
    item.setChoiceValues(answers);
    
    return item;
    }


/*
Create a new text question

  Parameter form: The form where we are going to insert the question
  Example --> var existingForm = FormApp.openById('1234567890abcdefghijklmnopqrstuvwxyz');

  Parameter question: The question we want to add
  Example question --> var question= "What is your favorite fruit?";
  
*/
function textQuestion(form,question){
   var textItem=form.addTextItem().setTitle(question);
  return textItem;
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




