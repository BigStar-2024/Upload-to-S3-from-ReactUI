import React , {useState} from 'react';
import S3 from 'react-aws-s3';
import { TextField, Box } from "@material-ui/core";
import './App.css'

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [bucket, setBucket] = useState(null);
    const [region, setRegion] = useState(null);
    const [keyId, setKeyId] = useState(null);
    const [secret, setSecret] = useState(null);

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: bucket,
        region: region,
        accessKeyId: keyId,
        secretAccessKey: secret,
      };

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err))
    }
    return (
    <div>
        <div>
            <Box
            marginLeft={"auto"}
            marginRight="auto"
            sx={{
                width: 300,
                maxWidth: "100%",
            }}
            >
            <TextField
                label="bucketName"
                onChange={(e) => {
                setBucket(e.target.value);
                }}
                variant="filled"
                fullWidth
                margin="dense"
                value={bucket}
            />
            <TextField
                label="Region"
                onChange={(e) => {
                setRegion(e.target.value);
                }}
                variant="filled"
                fullWidth
                margin="dense"
                value={region}
            />
            <TextField
                label="AccessKeyId"
                onChange={(e) => {
                setKeyId(e.target.value);
                }}
                fullWidth
                variant="filled"
                margin="dense"
                value={keyId}
            />
            <TextField
                label="SecretAccessKey"
                onChange={(e) => {
                setSecret(e.target.value);
                }}
                fullWidth
                variant="filled"
                margin="dense"
                value={secret}
            />
            </Box>
      </div>
        <input type="file" onChange={handleFileInput}/>
        <br></br>
        <button onClick={() => uploadFile(selectedFile)} className='upload-button'> Upload</button>
        <p id="p1">This is the best File Uploader!</p>
        <p>Thank you!</p>
    </div>
    )
}

export default Upload;