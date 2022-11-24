var mFH = require("./utils/mFileHandler");
exports.createCache = (key_id, ttl = 0, data = () => {}, tags = ["data"]) => {
  var cacheDirectoryWithFileName = mFH.verifyCreateCacheDirectoryExists(
    key_id,
    tags
  );
  if (cacheDirectoryWithFileName) {
    return mFH.readCache(cacheDirectoryWithFileName, data, ttl);
  }
  return data();
};

exports.remove = (key_id = null, tags = []) => {
  if (tags.length < 1) {
    var getKeyFile = mFH.getCacheParticular(key_id, ["data"]);
    return mFH.removeKeyCache(getKeyFile);
  } else {
    if (key_id === null) {
      var getFolder = mFH.getCacheParticular(key_id, tags, true);
      return mFH.removeTagCache(getFolder);
    } else {
      var getFile = mFH.getCacheParticular(key_id, tags);
      return mFH.removeKeyCache(getFile);
    }
  }
};
