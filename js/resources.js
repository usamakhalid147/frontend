// import dom element
import {dataset_download_btn_sheets,dataset_download_btn_fasta} from './htmlDomElement'
// import js-file-download package
import FileDownload from 'js-file-download';
// import axios package 
import axios from 'axios'
export async function resources(){
   

    dataset_download_btn_sheets.addEventListener('click', function(event){
        axios({
            url:`${API_URL}/api/v1/resources/csv`,
            method:'GET',
            responseType:"blob"
        }).then(function(response){
         
            FileDownload(response.data, 'dataset.zip')
         
        })
       
    })
    dataset_download_btn_fasta.addEventListener('click', function(event){
        axios({
            url:`${API_URL}/api/v1/resources/fasta`,
            method:'GET',
            responseType:"blob"
        }).then(function(response){
         
            FileDownload(response.data, 'Trinity_C_NormalCells.zip')
         
        })
      
    })

}