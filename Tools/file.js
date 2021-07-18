// Convert Blob/File to Base64 Data URI
// Example Use case: Generated URI can be used to preview images without uploading them to server
// IMPORTANT: Preferred Method
// Format of a base64-encoded URL:
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAEOCAIAAAAPH1dAAAAK
const blobToBase64 = (blob) => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
    });
    reader.readAsDataURL(blob);
    return promise;
};

// Get Blob/File from a Data URI (Base64 Encoded or not)
// Example Use case: Convert Base64 Data URI generated from <canvas /> element to file to upload to server
const dataURItoBlob = (dataURI) => {
    // Split Data URI
    const splitDataURI = dataURI.split(",");

    // convert base64 to raw binary data held in a string
    // WARN: Check if you want `decodeURI` or `decodeURIComponent` based on how URI was generated from either `encodeURI` or `encodeURIComponent` in case it is not Base64 Encoded
    const byteString =
        splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);

    // separate out the mime component
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; ++i) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], { type: mimeString });
};

// Converts a data URI string into a File object
const dataURItoFile = (dataURI) => {
    const BASE64_MARKER = ";base64,";

    // Does the given URL (string) look like a base64-encoded URL?
    const isDataURI = (url) => {
        return url.split(BASE64_MARKER).length === 2;
    };

    if (!isDataURI(dataURI)) {
        return false;
    }

    const splitDataURI = dataURI.split(BASE64_MARKER);
    const mime = splitDataURI[0].split(":")[1];
    const filename = new Date().getTime() + "." + mime.split("/")[1];
    const bytes = atob(splitDataURI[1]);
    const writer = new Uint8Array(new ArrayBuffer(bytes.length));

    for (let i = 0; i < bytes.length; i++) {
        writer[i] = bytes.charCodeAt(i);
    }

    return new File([writer.buffer], filename, { type: mime });
};

// Converts a Blob/File to object url
// Example Use case: Generated URL can be used to preview images without uploading them to server
// IMPORTANT: Preferred Method when we only need to preview the images so no need to read the whole image
const blobToObjectURL = (blob) => {
    // Object URL is just a reference to local file created in browser
    return URL.createObjectURL(blob);
};

// Revoke an object url earlier created using URL.createObjectURL()
const revokeObjectUrl = (blobURL) => {
    // Tell browser not to keep the reference to the local fine anymore
    URL.revokeObjectURL(blobURL);
};

// Get Blob/File back from a blobURL created using URL.createObjectURL()
const getBlobObject = async (blobURL) => {
    try {
        const response = await fetch(blobURL); // Fetch Blob/File
        return await response.blob();
    } catch (error) {
        console.log("Error", error);
    }
};

export {
    blobToBase64,
    dataURItoBlob,
    dataURItoFile,
    blobToObjectURL,
    revokeObjectUrl,
    getBlobObject,
};
