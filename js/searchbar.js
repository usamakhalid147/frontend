// import dom element
import {
  searchInput,
  detail_search_form,
  homepage_search_form,
} from "./htmlDomElement";
import { searchGeneCallbackAxiosFn } from "./searchGeneCallbackAxiosFn";

import { detail } from "./detail";

export function searchedValueFn(value) {
  if (value) {
    value = value.split("-").join("_").trim();
  } else if (!value) {
    value = "";
  }
  return value;
}
// searchGene callback function code start
export async function searchGeneCallback() {
  let response;
  let searchedValue;

  searchedValue = searchedValueFn(searchInput.value);

  if (searchedValue) {
    searchedValue = searchedValue;
    response = await searchGeneCallbackAxiosFn(searchedValue);
  } else if (sessionStorage.getItem("searchGene")) {
    searchedValue = sessionStorage.getItem("searchGene");
    response = await searchGeneCallbackAxiosFn(searchedValue);
  } else if (!searchedValue) {
    return -1;
  }

  if (response) {
    sessionStorage.setItem("searchGene", searchedValue);
    // home page code
    if (homepage_search_form && searchInput.value) {
      location.assign(`/detail.html`);
    }

    //  visualize(found,searchedValue)
    if (detail_search_form) {
      detail(response, searchedValue);
    }
  } else {
    alert("not found in database");
  }
}
// searchGene callback function code end
