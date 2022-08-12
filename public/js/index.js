function deleteItem() {
  const checkboxContainer = document.querySelector("#checkboxContainer");
  const checkboxes = checkboxContainer.querySelectorAll("input[type=checkbox]");
  let toDelete = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {
      toDelete.push(+checkbox.value);
    }
  });

  const data = { items: toDelete };

  fetch("/deleteItems", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "Success") {
        console.log("Success:", data);
        location.reload();
      }
      if (data.status === "Error") {
        console.log(data);
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
