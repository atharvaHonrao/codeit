// import { getDoc, doc } from "firebase/firestore";
// import { useAuthValue } from "./AuthContext";
// import { db } from "./firebase";



// export const checkGroupAuth = async (groupId, user) => {
//   console.log(user)
//   if(currentUser === null) return("Please sign in")
//   debugger
//   const groupRef = await getDoc(doc(db, "groups", `${groupId}`));
//   if(groupRef.adminId === currentUser.uid) {
//     return "Admin";
//   }
//   else if(currentUser.uid in groupRef.participantsUid) {
//     return "Member";
//   }
//   else{
//     return "Not a member"
//   }
// }