const fetchImage = async (imageUrl) => {
  const response = await fetch(imageUrl, { mode: 'cors' });
  const blob = await response.blob();
  console.log(blob, 'rrrrrrrrrrrrrrrrrr');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const blobToImageFile = (blob, fileName, fileType) => {
  return new File([blob], fileName, { type: fileType });
};

function dataURLtoFile(dataUrl, filename) {
  // Split the data URL to get the MIME type and data content
  const arr = dataUrl.split(',');

  // Get the MIME type from the data URL
  const mime = arr[0].match(/:(.*?);/)[1];

  // Convert the base64 data to binary string
  const bstr = atob(arr[1]);

  // Get the length of the binary string
  let n = bstr.length;

  // Create a Uint8Array to hold the binary data
  const u8arr = new Uint8Array(n);

  // Convert each character of the binary string to its Unicode code point and store in Uint8Array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Create and return a new File object with the binary data, filename, and MIME type
  return new File([u8arr], filename, { type: 'image/jpeg' });
}

const convertUrlsToFiles = async (imageUrls) => {
  const filePromises = imageUrls.map(async (url, index) => {
    try {
      const dataUrl = await fetchImage(url);
      console.log(dataUrl, 'dddurll');
      const fileData = dataURLtoFile(dataUrl, `${index}_imageName.jpg`);

      return fileData;
    } catch (error) {
      console.error(`Error converting image at index ${index}:`, error);
      return null;
    }
  });

  const files = await Promise.all(filePromises);
  return files
    .filter((file) => file !== null)
    .sort((a, b) => {
      console.log(a, 'aaaaaaaaaaaaaaaaaa');
      // debugger
      return Number(a.name.split('_')[0]) - Number(b.name.split('_')[0]);
    })
    .map((el) => ({ file: el, data_url: URL.createObjectURL(el) }));
};

export default convertUrlsToFiles;

//   // Example usage
//   const imageUrls = [
//     "https://storage.googleapis.com/tablebookbucket/16933389256341_previewImg_Bugs-Bunny-lays-on-his-back-with-carrot-in-hand-Cartoon-character-730x493.WEBP",
//     "https://storage.googleapis.com/tablebookbucket/16933389255600_previewImg_1693333354950352232224_664382432397979_7310682136056467351_n.WEBP",
//     // ... other URLs
//   ];

//   convertUrlsToFiles(imageUrls)
//     .then((files) => {
//       console.log("Converted Files:", files);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
