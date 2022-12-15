var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

exports.getCacheRootPath = () => {
  if (process.env.M_TAG_CACHE_PATH) {
    return process.env.M_TAG_CACHE_PATH;
  }
  var fullPath = path.join(process.cwd(), "mTagCache");
  return fullPath;
};

exports.encodeKey = (key_id) => {
  return crypto.createHash("md5").update(key_id).digest("hex");
};

exports.verifyCreateCacheDirectoryExists = (key_id, tags) => {
  var key = this.encodeKey(key_id);
  var fullDirPath = this.getCacheRootPath() + "/" + tags.join("/");
  var fullFilePath = fullDirPath + "/" + key + "-MM";

  if (!fs.existsSync(fullDirPath)) {
    fs.mkdirSync(fullDirPath, { recursive: true });
  }
  return fullFilePath;
};

exports.getCacheParticular = (key_id, tags, folder = false) => {
  var key = key_id === null ? "" : this.encodeKey(key_id);
  var fullDirPath = this.getCacheRootPath() + "/" + tags.join("/");
  var fullFilePath = fullDirPath + "/" + key + "-MM";
  if (folder) {
    return fullDirPath;
  }
  return fullFilePath;
};

exports.readCache = (path, data, ttl) => {
  if (fs.existsSync(path)) {
    var read = fs.readFileSync(path, "utf8");
    try {
      var condition = /([\d]+):mseprm:(.+)/g;
      var organizedData = [...read.toString().matchAll(condition)];
      var currentTime = this.currentTimeSC();
      var content = organizedData[0][2];
      var expiry = organizedData[0][1];
      if (currentTime < expiry) {
        var decodedContent = JSON.parse(content);
        return decodedContent;
      }
      return this.writeContent(data, path, ttl);
    } catch (e) {
      return data();
    }
  } else {
    return this.writeContent(data, path, ttl);
  }
};

exports.writeContent = (data, path, ttl) => {
  if(typeof data().then === 'function') {
    data().then(async (r) => {
      var encodedContent = this.addSpecialTimer(ttl) + "" + JSON.stringify(r);
      fs.writeFileSync(path, encodedContent);
      // return data();
    });
  }else{
    var encodedContent = this.addSpecialTimer(ttl) + "" + JSON.stringify(data());
    fs.writeFileSync(path, encodedContent);
    // return data();

  }
  return data();

};
exports.currentTimeSC = () => {
  var date = new Date();
  var timer = Math.ceil(date.getTime() / 1000);
  return timer;
};
exports.addSpecialTimer = (ttl) => {
  var timer = this.currentTimeSC() + parseInt(ttl + "") + ":mseprm:";
  return timer;
};

exports.removeKeyCache = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath);
  }
  return true;
};

exports.removeTagCache = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true });
  }
  return true;
};
