window.addEventListener("load", function onLoad() {
  var urlParams = new URLSearchParams(window.location.search);
  var myParam = urlParams.get("largeText");
  var el = document.querySelector(".large-text");
  el.textContent = myParam;
});

window.addEventListener("keydown", function onKeyDown(event) {
  var escKey = 27;
  if (event.which === escKey) {
    window.close();
  }
});
