import {ImisRestClient} from "./imisRestClient";
import {ImisUser, ImisContext} from "../models";

export const ImisContextProvider = {
    getContextAsync
};

let contextPromise = null;

function getContextAsync() {
    return contextPromise || (contextPromise = getContextPromise());
}

function getContextPromise() {
    return Promise
        .all([getUserAsync()])
        .then(
            results => new ImisContext(results[0]),
            reason => {
                contextPromise = null;
                return Promise.reject(`Unable to get iMIS context: ${reason}`);
            }
        );
}

function getUserAsync() {
    return ImisRestClient
        .getAsync("/IQA?QueryName=$/_AD/GetLoggedInUser")
        .then(
            items => {
                console.log(items);

                const record = items[0]["Properties"]["$values"]
                    .reduce((a, v) => ({...a, ...{[v["Name"]]: v["Value"]}}), {});

                console.log(record);
                console.log(record["MemberType"]);

                return new ImisUser(
                    record["ID"],
                    record["FirstName"],
                    record["LastName"],
                    record["MemberType"]
                )
            },
            reason => Promise.reject(`Unable to get iMIS user: ${reason}`)
        )
}

