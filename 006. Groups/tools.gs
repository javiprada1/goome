/*
 * Returns an array with the email of the groups you belong to
 */

function showMyGroups() {
   return GroupsApp.getGroups();
} //showMyGroups


/*
 * Returns an array with the emails of all the group members
 */

function listGroupMembers(email) {
   var group = GroupsApp.getGroupByEmail(email);
   var users = group.getUsers();
  
   return users;
 } //listGroupMembers


/*
 * Returns an array with the email of the owners of the given group email.
 */

function getOwnersEmail(email) {
 var group = GroupsApp.getGroupByEmail(email);
 var users = group.getUsers();
 var owners = [];

 for (var i = 0; i < users.length; i++) {
   var user = users[i];
   if (group.getRole(user.getEmail()) == GroupsApp.Role.OWNER) {
     owners[i] = user.getEmail();
   } //if
 } //for
  
  return owners;
} //getOwnersEmail

/*
 * Returns TRUE if you are a member of the group with the given email, otherwise FALSE
 */

function inGroup(email) {
  var group = GroupsApp.getGroupByEmail(email);
  var currentUser = Session.getActiveUser();
  var isMember = true;
  
  if (group.hasUser(currentUser)) {
    isMember = false;
  } //if
  
  return isMember;
} //inGroup
