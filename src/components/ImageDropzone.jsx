/* eslint-disable multiline-ternary */
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropzone = () => {
  const [files, setFiles] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 5
  })

  return (
    <div className='flex flex-col gap-3'>
      <div
        className={`w-full border-4 border-dashed ${
          isDragActive && 'border-cyan-500'
        } rounded-lg cursor-pointer flex justify-center items-center p-10`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='text-center text-gray-600'>Drop the files here ...</p>
        ) : (
          <p className='text-center text-gray-600'>
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>
      <div className='w-full flex gap-3 p-3 bg-gray-300 rounded-lg overflow-hidden overflow-x-auto'>
        {files.map(file => (
          <div key={file.name} className='rounded-lg overflow-hidden'>
            <img
              className='w-full h-32 object-cover'
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageDropzone
