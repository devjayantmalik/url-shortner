// get the hash of the url : slug
const hash = window.location.hash;
if (hash) {
  const slug = hash.replace("#", "");
  document.querySelector("#slug").value = slug;
}

document.querySelector("form").onsubmit = () => false;

// add onclick listner to button
document.querySelector("#submit-button").onclick = () => {
  // get the current slug
  const slug = document.querySelector("#slug").value;

  // prepare a request
  const req = new XMLHttpRequest();
  req.open("GET", `/resolve/${slug}`);

  req.onload = () => {
    if (req.status === 200) {
      // get the full url
      const base_url = JSON.parse(req.response).base_url;

      // update the result with result
      // set the link location and title
      const link = document.querySelector(".full-url");
      link.href = base_url;
      link.style.backgroundColor = "#333";
      link.innerHTML = base_url;
      link.title = `Your full url is: ${base_url}`;

      // make the result container visible
      document.querySelector(".hidden").classList.toggle("hidden");
    } else {
      //get the error message
      const errorMessage = JSON.parse(req.response).message;

      // set the link location and title
      const link = document.querySelector(".full-url");
      link.href = `javascript:void(0)`;
      link.style.backgroundColor = "red";
      link.innerHTML = errorMessage;
      link.title = errorMessage;

      // make the result container visible
      document.querySelector(".hidden").classList.toggle("hidden");
    }
  };

  // make a request
  req.send();
};
