import axios from "axios";
export async function searchGeneCallbackAxiosFn(searchedValue) {
  const response = await axios(
    `${API_URL}/api/v1/genomic/coordinates/${searchedValue}`
  );

  return response.data.data[0];
}
