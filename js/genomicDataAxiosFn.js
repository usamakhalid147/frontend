import axios from 'axios'
export async function genomicDataFn(){
    let genomicData= await axios(`${API_URL}/api/v1/context/genomic/context`)
    
    return genomicData.data.data;
  
  }