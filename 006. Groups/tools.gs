/*
 * return: Devuelve los emails de todos los integrantes de un grupo.
 */

function listGroupMembers() {
   var group = GroupsApp.getGroupByEmail("example@googlegroups.com");
   var s = group.getEmail() + ': ';
   var users = group.getUsers();
  
   for (var i = 0; i < users.length; i++) {
     var user = users[i];
     s = s + user.getEmail() + ", ";
   } //for
  
   Logger.log(s);
 } //listGroupMembers
