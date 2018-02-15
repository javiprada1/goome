//Create new Form with name   
function newForm(name){
   var form = FormApp.create(name);
  return form;
}


// Create a multiple choice question in form  
function newMultipleChoice(form,question,answers){
  var quest=form.addMultipleChoiceItem()
    .setTitle(question)
  .setChoiceValues(answers)
  .setRequired(true);
  return quest;
}

//Create a date question in form 
function newDateQuestion(form,question){
 var item = form.addDateItem();
 item.setTitle(question);
  return item;
 
}

//Create a page break in form 
function pageBreak(form){
  form.addPageBreakItem();
  
}

  
  //Create a checkbox question in form  
  function checboxQuestion(form,question,answers){
    var item = form.addCheckboxItem();
    item.setTitle(question);
    item.setChoiceValues(answers);
    
    return item;
    }


//Create a new text question
function textQuestion(form,question){
   var textItem=form.addTextItem().setTitle(question);
  return textItem;
}


//Create textEmailValidation
function emailValidationText(form,textItem){
  var textValidation = FormApp.createTextValidation()
  .requireTextIsEmail()
  .build();
  textItem.setValidation(textValidation);
}



//Required question

function required(question){
  question.setRequired(true);
}

