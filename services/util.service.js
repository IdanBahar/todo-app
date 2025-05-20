export const utilService = {
  makeId,
  showLoader,
  hideLoader,
};

function makeId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
function showLoader() {
  const elLoader = document.querySelector(".loader");
  elLoader.classList.remove("hidden");
}
function hideLoader() {
  const elLoader = document.querySelector(".loader");
  elLoader.classList.add("hidden");
}
