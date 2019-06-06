const cpjax = require("cpjax");

module.exports = function getRightGIF(search, callback) {
  cpjax(
    {
      url: `https://rightgif.com/search/web`,
      method: "POST",
      contentType: "text/plain",
      data: `text=${search}`
    },
    function(err, data) {
      if (err) return callback(err);
      var parsed = JSON.parse(data);
      var result = parsed.url;
      return callback(null, result);
    }
  );
};
