import {ImisSearchFormData} from "../models/ImisSearchFormData";

export const ImisSearchFormDataProvider = {
    getDataAsync
};

const $ = jQuery;

/**
 * Returns promise which resolves with iMIS search form data object.
 * @returns {Promise<ImisSearchFormData>}
 */
function getDataAsync() {
    return Promise
        .all([
            getSearchPhraseAsync(),
            getEntriesCountAsync()
        ])
        .then(
            results => new ImisSearchFormData(results[0], results[1]),
            reason => Promise.reject(`Unable to get search form data: ${reason}`)
        )
}

/**
 * Returns promise which resolves with search phrase.
 * @returns {Promise.<string>}
 */
function getSearchPhraseAsync() {
    return new Promise(
        function(resolve, reject) {
            const searchBox = $("[id$='ST_Text']:first");
            if (searchBox.length)
                resolve(searchBox.val());
            else
                reject("Unable to find search text box and get search phrase from it.");
        }
    );
}

/**
 * Returns promise which resolves with entries count.
 * @returns {Promise.<number>}
 */
function getEntriesCountAsync() {
    return new Promise(
        function(resolve, reject) {

            // Try to get "Show all N" link, if it exists, then we try to parse it's value.
            const showAllLink = $(".rgPager:first > td:first > a:first");
            if (showAllLink.length) {
                const count = parseInt(showAllLink.text().match(/\d+/)[0]);
                if (!isNaN(count))
                    resolve(count);
                else
                    reject("Show all anchor is found, but it's value is invalid.");
                return;
            }

            // Try to get items table, if table is exists, then we return count of rows it contains.
            const itemsTable = $(".rgMasterTable:first");
            if (itemsTable.length) {
                resolve(itemsTable.find("> tbody > tr:not(.rgNoRecords)").length);
                return;
            }

            // Something goes wrong, we were unable to identify amount of entries.
            reject("Unable to determine items count.");
        }
    );
}

