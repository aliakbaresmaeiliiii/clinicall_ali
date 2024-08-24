import fs from "fs";

/**
 *
 * @param path - path file template html
 * @param callback
 */
function readHTMLFile(path: any, callback: any) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
}
function deleteUserPic(userId: string) {
  const path = `public/products/${userId}.jpg`;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}
export { readHTMLFile, deleteUserPic };
