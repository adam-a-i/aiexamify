import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadIcon from '../../assets/UploadIcon.jsx'
import Modal from './Modal.jsx'
const Dropzone = ({setQuiz}) => {
    const [fileInfo, setFileInfo] = useState(null);
    const [FileAccept, setFileAccept] = useState(false);
    const onDrop = useCallback(
      (acceptedFiles) => { // files uploaded found here
        setFileInfo(acceptedFiles);
        console.log(acceptedFiles);
         setFileAccept(!FileAccept);
        console.log(FileAccept);},
      [],
    )
    
    const {getRootProps, getInputProps, isDragAccept, isDragReject} = useDropzone({onDrop,
        multiple: false, //so user cannot upload multiple files, takes latest
        accept: {
            'audio/mpeg': ['.mp3'],   
            'application/pdf': ['.pdf'], 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'], 
          }
    })

  return (
    <div>
        
        <div>
        <p className='help'>Try it out by uploading a screenshot, photo, or entering your text content below. It even works with handwritten content.</p>
            <div className='upload'  {...getRootProps()}>    
                <input {...getInputProps()}/>
                {
                    //interactivity for dragging file into box
                    isDragAccept ? <p className='upload-text'>😊 Drop it here</p>:
                    <div className='upload-wrapper'>
                    <UploadIcon />
                    <p className='upload-text'> Drag a document here or click to browse</p></div>
                }
            
            </div>
        </div>
        {
          //modal insertion
          FileAccept && <Modal setQuiz={setQuiz} fileInfo={fileInfo} closeModal={ () => setFileAccept(false)} />
        }   
    </div>
  )
}

export default Dropzone