// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);

// for (let i = 0; i < profileDataArr.length; i += 1) {
//   console.log(profileDataArr[i]);
// }
// };

// const printProfileData = profileDataArr => {

// profileDataArr.forEach((profileItem) => {
//   console.log(profileItem)
// });

// printProfileData(profileDataArgs);

const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//   profileDataArr.forEach((profileItem) => {
//     console.log(profileItem)
//   });
// };

const printProfileData = profileDataArr => {
  profileDataArr.forEach(profileItem => console.log(profileItem));
}