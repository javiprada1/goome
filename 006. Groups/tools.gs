/*
 * Returns the emails of all the group members
 */

function listGroupMembers() {
   var group = GroupsApp.getGroupByEmail("example@googlegroups.com");
   var users = group.getUsers();
  
   return users;
 } //listGroupMembers
