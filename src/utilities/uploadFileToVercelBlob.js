const { put } = require("@vercel/blob");

async function uploadFileToVercelBlob(file, key) {
  try {
    const result = await put(key, file.buffer, {
      access: "public", // or 'private'
      contentType: file.mimetype,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // The result contains the URL of the uploaded file
    return result.url;
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error);
    throw error;
  }
}

module.exports = { uploadFileToVercelBlob };
