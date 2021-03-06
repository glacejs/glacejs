"use strict";

var Steps = require("../../lib").Steps;
var Page = require("../../lib").Page;

var indexPage = new Page(
    "index", "/",
    { searchField: "input#text",
        searchButton: "button.button_theme_websearch[type='submit']"});

Steps.register({
    /**
     * Step to search via Glace POM.
     *
     * @method
     * @instance
     * @arg {string} text - Searching text.
     */
    searchPom: async function (text) {
        await this.openPage(indexPage.name);
        await indexPage.searchField.setText(text);
        await indexPage.searchButton.click();
        await this.pause(3, "wait for result");
    },
    /**
     * Step to search via WebdriverIO.
     *
     * @method
     * @instance
     * @arg {string} text - Searching text.
     */
    searchWdio: async function (text) {
        await this.openPage(indexPage.name);
        await indexPage.searchField.getElement().setValue(text);
        await indexPage.searchButton.getElement().click();
        await this.pause(3, "wait for result");
    },
});

test("Page Object", () => {

    before(() => {
        $.registerPages(indexPage);
    });

    beforeChunk(async () => {
        await $.restartBrowser();
    });

    chunk("It should manage UI elements via Glace POM", async () => {
        await $.searchPom("nodejs");
    });

    chunk("It should manage UI elements via WebdriverIO", async () => {
        await $.searchWdio("nodejs");
    });
});
