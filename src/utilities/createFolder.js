const fs = require("fs").promises;
const path = require("path");

async function createFolderForBlogImages(folderName) {
  try {
    const d = new Date();
    let year = d.getUTCFullYear();
    let month = ("0" + (d.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + d.getUTCDate()).slice(-2);

    let dateFolderName = `${year}-${month}-${day}`;
    const folder = path.join(folderName, dateFolderName);

    // Create the base directory if it doesn't exist
    await fs.mkdir(folderName, { recursive: true });

    // Create the date-based subdirectory
    try {
      await fs.access(folder);
      console.log("Folder already exists");
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.mkdir(folder, { recursive: true });
        console.log("Folder created");
      } else {
        throw error;
      }
    }

    let FolderDetails = {
      folder,
      dateFolderName,
    };

    return FolderDetails;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error; // Re-throw the error to ensure it's handled by the caller
  }
}

module.exports = {
  createFolderForBlogImages,
};
