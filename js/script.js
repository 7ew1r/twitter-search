const isDate = (str) => {
  return !(str === undefined || str === null || str === "");
};

const filteredQuery = (value, item) => {
  if (value === "") {
    return ""
  } else if (value === "include") {
    return `filter:${item}`;
  } else if (value === "exclude") {
    return `-filter:${item}`;
  } else {
    return "";
  }
}

function app() {
  return {
    keyword: "",
    since: "",
    until: "",
    minFaves: "",
    minRetweets: "",
    lang: "",
    imagesFilter: "",
    videosFilter: "",
    linksFilter: "",
    verifiedFilter: "",
    isUntilBeforeSince() {
      if (!isDate(this.until) || !isDate(this.since)) {
        return false;
      }
      const since = new Date(this.since);
      const until = new Date(this.until);
      return until < since;
    },
    isValidUrl() {
      return this.keyword !== "" && !this.isUntilBeforeSince();
    },
    sinceQuery() {
      if (!isDate(this.since)) {
        return ""
      }
      const since = new Date(this.since);
      return `since:${since.getFullYear()}-${since.getMonth() + 1}-${since.getDate()}`;
    },
    untilQuery() {
      if (!isDate(this.until)) {
        return ""
      }
      const until = new Date(this.until);
      return `until:${until.getFullYear()}-${until.getMonth() + 1}-${until.getDate()}`;
    },
    minFavesQuery() {
      if (this.minFaves === "") {
        return "";
      }
      return `min_faves:${this.minFaves}`;
    },
    minRetweetsQuery() {
      if (this.minRetweets === "") {
        return "";
      }
      return `min_retweets:${this.minRetweets}`;
    },
    languageQuery() {
      if (this.lang === "") {
        return ""
      }
      return `lang:${this.lang}`;
    },
    imageFilterQuery() {
      return filteredQuery(this.imagesFilter, "images");
    },
    videoFilterQuery() {
      return filteredQuery(this.videosFilter, "videos");
    },
    linkFilterQuery() {
      return filteredQuery(this.linksFilter, "links");
    },
    verifiedFilterQuery() {
      return filteredQuery(this.verifiedFilter, "verified");
    },
    createQuery() {
      return [this.sinceQuery(), this.untilQuery(), this.minFavesQuery(), this.minRetweetsQuery(), this.keyword, this.languageQuery(), this.imageFilterQuery(), this.videoFilterQuery(), this.linkFilterQuery(), this.verifiedFilterQuery()].filter(v => v).join(" ");
      //return [this.since(), this.until(), keyword(), imageFilter(), videoFilter(), language(), minFaves(), minRetweets()].filter(v => v).join(" ");
    },
    createUrl() {
      const baseUrl = "https://twitter.com/search";
      const query = this.createQuery();
      return encodeURI(baseUrl + "?q=" + query);
    },
    openUrl() {
      window.open(this.createUrl());
    }
  };
}