const form = document.querySelector("form");

const shorten_url = (url, slug) => {
  // prepare a request
  const req = new XMLHttpRequest();
  req.open("GET", `/shorten?url=${url}&slug=${slug}`);

  // handle the response
  req.onload = (e) => {
    // handle the success
    if (req.status === 200) {
      const slug = JSON.parse(req.response).slug;

      // set the link location and title
      const link = document.querySelector(".short-url");
      link.href = `/resolve.html#${slug}`;
      link.style.backgroundColor = "#333";
      link.innerHTML = slug;
      link.title = `Your generated short url is: ${slug}`;

      // make the result container visible
      document.querySelector(".hidden").classList.toggle("hidden");

      return false;
    } else {
      //get the error message
      const errorMessage = JSON.parse(req.response).message;

      // set the link location and title
      const link = document.querySelector(".short-url");
      link.href = `javascript:void(0)`;
      link.style.backgroundColor = "red";
      link.innerHTML = errorMessage;
      link.title = errorMessage;

      // make the result container visible
      document.querySelector(".hidden").classList.toggle("hidden");

      return false;
    }
  };

  // make a request
  req.send();
};

const handleSuccess = () => {};

form.onsubmit = (e) => {
  e.preventDefault();

  // get the url and slug
  const url = document.querySelector("#url").value;
  const slug = document.querySelector("#slug").value;

  // shorten the url
  shorten_url(url, slug);

  return false;
};
