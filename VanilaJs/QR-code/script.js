const form = document.getElementById("form");
const qr = document.querySelector("#qrcode");

const generateQrCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const btn = document.getElementById("save-link");
  if (btn) {
    btn.remove();
  }
};

const createSaveBtn = (savedUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.className = "link-class";
  link.href = savedUrl;
  link.download = "qrcode";
  link.innerHTML = "Save document";
  document.getElementById("qr_code").appendChild(link);
};

form.addEventListener("submit", onGenerateQRCode);

function onGenerateQRCode(e) {
  e.preventDefault();
  clearUI();
  const url = document.getElementById("url_text").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQrCode(url, size);

      setTimeout(() => {
        const savedUrl = qr.querySelector("img").src;
        createSaveBtn(savedUrl);
      }, 50);
    }, 1000);
  }

  console.log("Values", url, size);
}
