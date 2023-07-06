const dataFile = "./testData/gencodeAnnotate-test.json";

const myList = document.querySelector("ul");

fetch(dataFile)
  .then((response) => {
    console.log(response);
    return response.json();
  })

  .then((data) => {
    console.log(typeof data);

    let placeholder = document.querySelector("#data-output");
    let out = "";
    data.forEach((element) => {
      console.log(element);
      out += `
             <tr>
                <td>${element.AssembledTranscriptID}</td>
                <td>${element.AnnotatedGeneID}</td>
                <td>${element.AnnotatedTranscriptID}</td>
                <td>${element.GeneType}</td>
                <td>${element.TranscriptType}</td>
             </tr>
            `;
    });
    placeholder.innerHTML = out;
  });
