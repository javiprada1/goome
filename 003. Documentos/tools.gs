function onOpen() {
  DocumentApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Acciones Extra')
      .addItem('Traducir texto', 'translateSelection')
  
      .addToUi();
}


function translateSelection() {
  
  var selection = DocumentApp.getActiveDocument().getSelection();
  
  if (!selection) {
    DocumentApp.getUi().alert("Please select text for translation.");
    return;
  }
  
  var elements = selection.getSelectedElements();
  
  /* Append the translated text with the original */
  for (var i = 0; i < elements.length; i++) {
    
    if (elements[i].isPartial()) { /* Is partial text selected */
      
      var element = elements[i].getElement().asText();
      var startIndex = elements[i].getStartOffset();
      var endIndex = elements[i].getEndOffsetInclusive();
      
      var text = element.getText().substring(startIndex, endIndex + 1);
      var translatedText = LanguageApp.translate(text, 'es', 'en'); 
      element.insertText(endIndex + 1, "\n[" + translatedText + "] ");
      
    } else {
      
      var element = elements[i].getElement();
      
      if (element.editAsText) { /* Is the selection contains text */
        var text = element.asText().getText();
        var translatedText = LanguageApp.translate(text, 'es', 'en'); 
        element.asText().setText("\n"+translatedText);
      }
      
    }
  }
}

