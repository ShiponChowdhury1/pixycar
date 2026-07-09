const url = "https://particularistically-transelementary-owen.ngrok-free.dev/api/v1/accounts/login/";
const payload = {
  email: "nxshipon@gmail.com",
  password: "WrongPassword123!"
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
  body: JSON.stringify(payload)
})
.then(async res => {
  console.log("Status:", res.status);
  console.log("Headers:", Object.fromEntries(res.headers.entries()));
  const text = await res.text();
  console.log("Body:", text);
})
.catch(err => {
  console.error("Error:", err);
});
