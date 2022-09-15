import { Selector } from "../types/main/selector";
import selector_json_local from "./selector.json";

let selector_json = selector_json_local as Selector;

/**
 * Verify that two objects have exactly the same properties.
 * @param object1
 * @param object2
 * @returns result
 */
const verify_property = (object1: object, object2: object) => {
    const keys1 = Object.keys(object1).sort();
    const keys2 = Object.keys(object2).sort();

    return keys1.toString() === keys2.toString();
};

/**
 * Get selector data from server, and if succeeded, overwrite local data.
 */
const get_selector = async (): Promise<void> => {
    const remote_json = await fetch(
        "https://cdn.statically.io/gh/Robot-Inventor/spam-tweets-compressor/main/src/ts/main/selector.json?dev=1",
        { cache: "no-cache" }
    );

    if (!remote_json.ok) {
        const selector_json_remote = (await remote_json.json()) as Selector;
        // Do not overwrite local data if selector data structure has changed.
        if (!verify_property(selector_json_local, selector_json_remote)) return;

        selector_json = selector_json_remote;
    }
};
void get_selector();

// Use a proxy to prevent redefinition of "selector" and to overwrite it if selectors can be retrieved from the server.
const selector = new Proxy(selector_json, {
    get: (target, key) => selector_json[key as keyof typeof target]
});
export { selector };
