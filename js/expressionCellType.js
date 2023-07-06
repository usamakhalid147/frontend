// import dom element
import { expression_cell_type } from "./htmlDomElement";
// expressionCellType function
export async function expressionCellType(lncRNA_transcript, searchedValue) {
  let expressionCellTypeData = await fetch(
    `${API_URL}/api/v1/expression/cell/type`
  );
  let response = await expressionCellTypeData.json();

  const arr = response.data.filter(function (item, index) {
    return item.lncRNA_transcript === lncRNA_transcript;
  });

  expression_cell_type.innerHTML = `<h3>Expression Levels in Cell Types</h3>`;
  if (arr.length === 0) {
    expression_cell_type.insertAdjacentHTML(
      "beforeend",
      `<p><span class="previous_annotaion-red-color">${searchedValue
        .split("_")
        .join("-")} </span> was not found.</p>`
    );
  } else if (arr.length > 0) {
    if (arr.length === 3) {
      expression_cell_type.insertAdjacentHTML(
        "beforeend",
        `<p><span class="previous_annotaion-red-color">${searchedValue
          .split("_")
          .join(
            "-"
          )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal mature, luminal progenitor and basal</span>
                types. <br></br>
                 </p>`
      );
    } else if (arr.length === 2) {
      if (
        (arr[0].ConsistentlyExpressedIn === "C1" &&
          arr[1].ConsistentlyExpressedIn === "C2") ||
        (arr[1].ConsistentlyExpressedIn === "C1" &&
          arr[0].ConsistentlyExpressedIn === "C2")
      ) {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal mature, and luminal progenitor</span>
                  types. <br></br>
                  </p>`
        );
      } else if (
        (arr[0].ConsistentlyExpressedIn === "C1" &&
          arr[1].ConsistentlyExpressedIn === "C4") ||
        (arr[1].ConsistentlyExpressedIn === "C1" &&
          arr[0].ConsistentlyExpressedIn === "C4")
      ) {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal mature, and basal</span>
                  types. <br></br>
                  </p>`
        );
      } else if (
        (arr[0].ConsistentlyExpressedIn === "C2" &&
          arr[1].ConsistentlyExpressedIn === "C4") ||
        (arr[1].ConsistentlyExpressedIn === "C2" &&
          arr[0].ConsistentlyExpressedIn === "C4")
      ) {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal progenitor, and basal</span>
                  types. <br></br>
                 </p>`
        );
      }
    } else if (arr.length === 1) {
      if (arr[0].ConsistentlyExpressedIn === "C1") {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal mature</span>
                      type. <br></br>
                     </p>`
        );
      } else if (arr[0].ConsistentlyExpressedIn === "C2") {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">luminal progenitor</span>
                      type. <br></br>
                      </p>`
        );
      } else if (arr[0].ConsistentlyExpressedIn === "C4") {
        expression_cell_type.insertAdjacentHTML(
          "beforeend",
          `<p><span class="previous_annotaion-red-color">${searchedValue
            .split("_")
            .join(
              "-"
            )} </span>  is consistently <a  style="color: red;font-weight:700; text-decoration:underline;" href="/expressionlevel.html">expressed</a> in cells of the <span class="previous_annotaion-red-color">basal</span>
                      type. <br></br>
                     </p>`
        );
      }
    }
  }
}
