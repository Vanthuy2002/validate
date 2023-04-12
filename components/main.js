let notify = document.querySelector(".notyfi");
function renderToast(title) {
  let template = `<p class="toast-mess">${title}</p>`;
  let toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = template;
  notify.appendChild(toast);

  setTimeout(() => {
    notify.removeChild(toast);
  }, 5000);
}

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = document.querySelector("[name=username]").value.trim();
  let pass = document.querySelector("[name=password]").value.trim();
  let mails = document.querySelector("[name=email]").value.trim();
  let passConfirm = document.querySelector("[name=pass-confirm]").value.trim();
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (username == "" || mails == "" || pass == "" || passConfirm == "") {
    ifBlank(
      document.querySelectorAll(".form-status"),
      "This field can't not be blank"
    );
    return false;
  } else {
    changMess();
    localStorage.setItem(
      "user",
      JSON.stringify({ username, pass, mails, passConfirm })
    );
    this.reset();
  }

  if (!mailFormat.test(mails)) {
    handleSingleErr(
      document.querySelector("[name=email] + .form-status"),
      "This field must be email"
    );
  }

  if (pass !== passConfirm) {
    handleSingleErr(
      document.querySelector("[name=pass-confirm] + .form-status"),
      "Password musc be matched"
    );
    return false;
  }
});

function handleSingleErr(selector, value) {
  selector.textContent = value;
}

function ifBlank(selector, value) {
  selector.forEach((element) => {
    element.textContent = value;
  });
}

function changMess() {
  let message = document.querySelectorAll(".form-status");
  message.forEach((mess) => {
    mess.textContent = "";
  });
}
