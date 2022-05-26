flatpickr("#since", {});
flatpickr("#until", {});

const formNodes = {
  "keyword": document.getElementById("keyword"),
  "since": document.getElementById("since"),
  "until": document.getElementById("until"),
  "min-faves": document.getElementById("min-faves"),
  "min-retweets": document.getElementById("min-retweets"),
};

const imageFilterNode = document.getElementById("image-filter");
const videoFilterNode = document.getElementById("video-filter");
const langNode = document.getElementById("lang");


const keyword = () => {
  return formNodes["keyword"].value
}

const since = () => {
  if (!formNodes["since"].value) {
    return "";
  }
  const since = new Date(formNodes["since"].value);
  formNodes["since"]
  return `since:${since.getFullYear()}-${since.getMonth() + 1}-${since.getDate()}`;
};

const until = () => {
  if (!formNodes["until"].value) {
    return "";
  }
  const until = new Date(formNodes["until"].value);
  return `until:${until.getFullYear()}-${until.getMonth() + 1}-${until.getDate()}`;
};

const minFaves = () => {
  if (!formNodes["min-faves"].value) {
    return "";
  }
  return `min_faves:${formNodes["min-faves"].value}`;
}

const minRetweets = () => {
  if (!formNodes["min-retweets"].value) {
    return "";
  }
  return `min_retweets:${formNodes["min-retweets"].value}`;
}

const language = () => {
  return langNode.value === "" ? "": `lang:${langNode.value}`;
}

const imageFilter = () => {
  if (imageFilterNode.checked) {
    return "filter:images";
  }
  return "";
}

const videoFilter = () => {
  if (videoFilterNode.checked) {
    return "filter:videos";
  }
  return "";
}


const createQuery = () => {
  return [since(), until(), keyword(), imageFilter(), videoFilter(), language(), minFaves(), minRetweets()].filter(v => v).join(" ");
}

const createUrl = () => {
  const baseUrl = "https://twitter.com/search";
  const query = createQuery();
  return encodeURI(baseUrl + "?q=" + query);
};

const updateUrl = (e) => {
  const newUrl = createUrl();
  const url = document.getElementById("url");
  url.value = newUrl;
  const searchButton = document.getElementById("search_button");
  searchButton.href = newUrl;
}

Object.keys(formNodes).forEach((node) => {
  formNodes[node].addEventListener("input", updateUrl);
});

imageFilterNode.addEventListener("change", updateUrl);
videoFilterNode.addEventListener("change", updateUrl);
langNode.addEventListener("change", updateUrl);

