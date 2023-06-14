const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
  eleventyConfig.amendLibrary("md", mdLib => mdLib.use(markdownItFootnote));
};
