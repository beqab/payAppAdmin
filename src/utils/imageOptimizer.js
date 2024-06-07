import Resizer from 'react-image-file-resizer';

const resizeFile = (file, width, height, minWidth, qty) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      'WEBP',
      qty,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
      minWidth,
    );
  });

const getOptimizedImgs = async (
  images,
  fileFlag = 'previewImg',
  width = 300,
  height = 20,
  minWidth = 300,
  qty,
) => {
  console.log('images', images);
  const imgs = [];
  if (images.length) {
    try {
      await Promise.all(
        images.map(async (item, index) => {
          if (typeof item !== 'string') {
            const { file } = item;

            const newFileName = `${index}_${fileFlag}_${file.name}`; // New file name
            const modifiedFile = new File([file], newFileName, { type: file.type }); // Create a new File object with the modified name

            const previewImg = await resizeFile(modifiedFile, width, height, minWidth, qty);

            imgs.push(previewImg);
          } else {
            imgs.push(item);
          }
        }),
      );
    } catch (er) {
      console.log(er, 'errrrr');
    }
  }

  return imgs;
};

export default getOptimizedImgs;
