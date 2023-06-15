const markdownItFootnote = require("markdown-it-footnote");
const markdownItContainer = require("markdown-it-container");
const markdownItPrism = require("markdown-it-prism");

const registerBox = (mdLib, color) => {
    mdLib.use(markdownItContainer, color, {
        validate: function (params) {
            return params.trim().match(`${color}\s?(.*)$`);
        },

        render: function (tokens, idx) {
            if (!tokens[idx]) {
                return;
            }
            const m = tokens[idx].info.trim().match(`${color}\s?(.*)$`);
            if (tokens[idx].nesting === 1) {
                if (m[1] !== undefined) {
                    return (
                        `<div class="box ${color}"><strong class="block titlebar">` +
                        mdLib.utils.escapeHtml(m[1]) +
                        "</strong>"
                    );
                } else {
                    return `<div class="box ${color}">`;
                }
            } else {
                return "</div>\n";
            }
        },
    });
};
module.exports = function (eleventyConfig) {
    eleventyConfig.amendLibrary("md", (mdLib) => {
        mdLib.use(markdownItFootnote);

        registerBox(mdLib, "warn");
        registerBox(mdLib, "info");
        registerBox(mdLib, "plain");
        registerBox(mdLib, "ok");
        registerBox(mdLib, "bad");

        mdLib.use(markdownItPrism);
    });

    eleventyConfig.addNunjucksFilter("formatdate", function (value) {
        return value.toDateString();
    });

};
