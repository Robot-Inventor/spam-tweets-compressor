const fs = require("fs");

const package_json_path = "package.json";
const manifest_json_path = "manifest.json";

const package_json = fs.readFileSync(package_json_path, "utf8");
const [major, minor, patch] = JSON.parse(package_json).version.split(".");

const manifest = fs.readFileSync(manifest_json_path, "utf8");
const build_number = JSON.parse(manifest).version.split(".")[2];
const new_manifest = manifest.replace(
    /"version": "\d+\.\d+\.\d+\.\d+",/,
    `"version": "${major}.${minor}.${parseInt(build_number) + 1}.${patch}",`
);

fs.writeFileSync(manifest_json_path, new_manifest, "utf8");
