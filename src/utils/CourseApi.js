
const courseApi =
  "https://script.google.com/macros/s/AKfycbx8dxizPR2dMf6LkjinaFMbnietj4QAe3kbG5UIZFT740nww-B0fTelQaiVvnIGBHyD/exec";

async function getCourse() {
  try {
    const response = await fetch(courseApi+"?action=read");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

getCourse()  

export default getCourse;