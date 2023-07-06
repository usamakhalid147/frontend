jest.mock("./../js/searchGeneCallbackAxiosFn.js");
import puppeteer from "puppeteer";
import { searchGeneCallbackAxiosFn } from "./../js/searchGeneCallbackAxiosFn";

import { searchedValueFn } from "./../js/searchbar";

test("search bar functionality", async () => {
  const response = await searchGeneCallbackAxiosFn("DN733_c1_g1_i1");
  expect(response);
});

test("search value functionality", () => {
  expect(searchedValueFn("DN733_c1_g1_i1")).toBe("DN733_c1_g1_i1");
});
test("search value functionality", () => {
  expect(searchedValueFn("DN733-c1-g1-i1")).toBe("DN733_c1_g1_i1");
});
test("search value functionality", () => {
  expect(searchedValueFn("")).toBe("");
});

// end 2 end test
// puppeteer browser code start
test("puppeteer browser", async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto("http://localhost:8080/detail.html");

  await page.click(".input-field");
  await page.type(".input-field", "DN733-c1-g1-i1");
  await page.click(".btn-search");
  // input-field-home-page
  await browser.close();
  //done()
}, 20000);
//puppeteer browser code end
