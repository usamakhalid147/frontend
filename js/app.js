if (!global || !global._babelPolyfill) {
  require("babel-polyfill");
}

//import all css file

import "./../css/contact.css";
import "./../css/detail.css";
import "./../css/gencode.css";
import "./../css/style.css";
import "./../css/vis.css";
import "./../css/resources.css";
import "./../css/expressionlevel.css";
// import pdf
import excel from "./../pdfs/DESCRIPTION-OF-TABLES-S1-S18.pdf";
//import all images
import IMG_logo from "./../images/IMG_logo.png";

import IMG_0286 from "./../images/IMG_0286.jpg";
import home_1 from "./../images/home_1.png";
import home_2 from "./../images/home_2.png";
import home_3 from "./../images/home_3.png";
import home_4 from "./../images/home_4.png";
import home_5 from "./../images/home_5.png";
import home_6 from "./../images/home_6.png";
import labLogo from "./../images/labLogo.png";
import image from "./../images/image.png";

//import dom element
import {
  btnSearch,
  gencode_data_table,
  visualize_id,
  dataset_download_btn_sheets,
  dataset_download_btn_fasta,
  expressionlevel_data_table,
} from "./htmlDomElement";

// import  gencode_table_function function
import { gencode_table_function } from "./gencodeTable";
//  import visualise function
import { visualise } from "./visualise";
// import resources function
import { resources } from "./resources";
// import  expressionLevel_table_function function
import { expressionLevel_table_function } from "./expressionLevel";

// hamburger code start
import { hamburgerBtn, closeIconBtn } from "./hamburgerMenu";
// hamburger code end
// searchbar code start
import { searchGeneCallback } from "./searchbar";
if (btnSearch && sessionStorage.getItem("searchGene")) {
  searchGeneCallback();
}
if (btnSearch) {
  btnSearch.addEventListener("click", searchGeneCallback);
}
// searchbar code end

// gencode_data_table code start

if (gencode_data_table) {
  gencode_table_function();
}
// gencode_data_table code end
// visualize_id code start

if (visualize_id) {
  visualise();
}
// visualize_id code end

// resources function code start
if (dataset_download_btn_sheets || dataset_download_btn_fasta) {
  resources();
}
// resources function code end

// expressionLevel_table_function code start
if (expressionlevel_data_table) {
  expressionLevel_table_function();
}
// expressionLevel_table_function code start
