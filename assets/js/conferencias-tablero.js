(function () {
  var dialog = document.querySelector(".charlas-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector("img");
  var caption = dialog.querySelector("p");
  var closeBtn = dialog.querySelector(".charlas-dialog-close");

  document.querySelectorAll(".charlas-gallery a").forEach(function (link) {
    link.addEventListener("click", function (event) {
      var source = link.querySelector("img");
      img.src = link.href;
      img.alt = source ? source.alt : "";
      caption.textContent = link.getAttribute("data-caption") || "";
      if (!dialog.open) dialog.showModal();
      event.preventDefault();
    });
  });

  closeBtn.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    img.removeAttribute("src");
    img.alt = "";
  });
})();
