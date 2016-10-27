/**
 * Created by sheershoff on 10/23/16.
 */

/**
 * Given keymetrics post data field returns object formatted for maniphest.createtask canduit.exec
 * @param data {object} keymetrics post data field
 * @returns {object} object to post to maniphest.createtask
 */
const formatter = function(data){
    var result = {};

    // set project
    result.projectPHIDs = process.env.KPG_PROJECT.split(',');

    result.title = "[KMXC] " + data.data.message + " in " + data.process.name + " (" + data.process.pm_id + ") at " + data.process.server;

    result.description = "Keymetrics exception id = " + data.identifier + "\n" +
        "Infected commit: " + data.commits[0] + "\n" +
        "Keymetrics link: " + data.bucket_url + "\n" +
        "\nStacktrace:\n```\n" + data.data.stack + "\n```";

    return result;
};

module.exports = formatter;