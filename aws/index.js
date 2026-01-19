const form = document.getElementById("form");

const uploadBtn = document.getElementById("upload");
const doc = document.getElementById("doc");
let URL = ""

form.addEventListener("submit", (e) => {
     e.preventDefault()

    console.log("Handle form", form.elements["fname"].value);
    const [fname, email, lname] = form.elements
    console.log(form.elements.gender.value)

    submitForm({firstName: fname.value, lastName: lname.value, email: email.value, age: form.elements["age"].value, gender: form.elements["gender"].value })
})


const submitForm = ({ firstName, lastName, email, age, gender }) => {
console.log({ firstName, lastName, email, age, gender })
fetch("https://e5b2cc0wu7.execute-api.eu-north-1.amazonaws.com/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName, lastName, email, age, gender, userId: Date.now(), createdAt: new Date()
  })
}).then(e => {
  console.log(e)
  e.json().then(d => console.log("DATA = ", d))
  }).catch(e => console.log("Error: = ", e))
}

doc.addEventListener("change", async (e) => {
  console.log(doc.files[0])
  const fileName = doc.files[0].name;
  const fileType = doc.files[0].type;
  const data = await fetch("https://e5b2cc0wu7.execute-api.eu-north-1.amazonaws.com/generate-upload-url", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      fileName, fileType
    })
  });
  const res = await data.json();
  console.log("RES === ", JSON.parse(res.uploadUrl.body).uploadUrl)
  URL = JSON.parse(res.uploadUrl.body).uploadUrl
})

uploadBtn.addEventListener("click", async (e) => {
  console.log(doc.value);
  const res = await fetch(URL, {
    method:"PUT",
    body:doc.files[0]
  });
  const result = await res.json();
  console.log("REULt", result)

})