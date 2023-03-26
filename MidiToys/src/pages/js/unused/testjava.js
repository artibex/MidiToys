//a variable can be defined in a javascript file and exported into other files
export const pageTitle = "testJava.js variable";

//note: the word "export" is important to import it into other files
export function getCurrentDate() {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  }

// module.exports = {
//     pageTitle,
// }