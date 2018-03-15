# Autocrat Simple

## Introduction

Tired of AutoCrat Google Add-on crashes?

This simple and small utility lacks many of its advanced features, but lets you do the simple tasks you need to be done: merging documents tags with data in a spreadsheet and sending those document by e-mail.

## Installation

You have to use this utility inside a Google spreadsheet. You can copy all the files of the project inside the Script Editor of a Google spreadsheet, as a new project.
The five first columns in the spreadsheet must be these (by order): 'email', 'message', 'subject', 'file name', 'created' (creation data and time of merged file), and 'file sent'.
The tags in the template document must be inside double greater-than and lesser-than symbols '<<' '>>'. The tags in the sheet must not have theese symbols.
Be careful! Tags have to be identical.

This is the workflow:
1. Before you start to use the script, you need to fill your spreadsheet with data and tags.
2. After that, you have to provide the template and folder URLs.
3. Then you can press 'Check' button. With this function the system verifies the URL and confirms that all the template tags are present in the spreadsheet. The 'Execute' button only enables when all is correct. If you change any URL after that, the button gets disabled again.
4. You must choose between the different options: creating editable documents, creating pdf documents, creating multiple files or merging all of them in a single file, and sending documents by email. This last option is only enabled if previously you have selected multiple files checkbox.
5. Sit and wait. The spreadsheet updates with the date and hour when every file have been created and sent. The system will inform you when the script ends through toasts.
