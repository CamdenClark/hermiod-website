const markdownItFootnote = require("markdown-it-footnote");
const markdownItContainer = require("markdown-it-container");

module.exports = function(eleventyConfig) {
  eleventyConfig.amendLibrary("md", mdLib => {
      mdLib.use(markdownItFootnote)

      mdLib.use(markdownItContainer, 'warning', {

      validate: function(params) {
          return true;
        // return params.trim().match(/^warning\s+(.*)$/);
      },

      render: function (tokens, idx) {
        const m = tokens[idx].info.trim().match(/^warning\s+(.*)$/);
          console.log(m)
        if (tokens[idx].nesting === 1) {
          return '<div class="box warn">' + mdLib.utils.escapeHtml(m[1]);
        } else {
            return '</div>\n';
        }
 }});
})};
