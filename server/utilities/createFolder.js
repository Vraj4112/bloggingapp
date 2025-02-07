const fs = require("fs");

function createFolderForBlogImages(folderName) {
  try {
    const d = new Date();
    let year = d.getUTCFullYear();
    let month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + d.getUTCDate()).slice(-2);

    let dateFolderName = `${year}-${month}-${day}`;

    const folder = `${folderName}/${dateFolderName}`;

    if (!fs.existsSync(folder)) {
      fs.mkdir(folder, () => {});
    }
    let FolderDetails = {
      folder,
      dateFolderName,
    };

    return FolderDetails;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createFolderForBlogImages,
};
