"use strict";module.exports = validate20;module.exports.default = validate20;const schema22 = {"$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{"ColorSetting":{"additionalProperties":false,"properties":{"background":{"type":"string"},"card":{"type":"string"},"card_hover":{"type":"string"},"drawer":{"type":"string"},"high_emphasize_text":{"type":"string"},"main":{"type":"string"},"main_light":{"type":"string"},"medium_emphasize_text":{"type":"string"},"top_app_bar":{"type":"string"}},"required":["background","card","card_hover","drawer","high_emphasize_text","main","main_light","medium_emphasize_text","top_app_bar"],"type":"object"}},"properties":{"advanced_filter":{"items":{"type":"string"},"type":"array"},"allow_list":{"items":{"type":"string"},"type":"array"},"color":{"$ref":"#/definitions/ColorSetting"},"decompress_on_hover":{"type":"boolean"},"exclude_url":{"items":{"type":"string"},"type":"array"},"hide_completely":{"type":"boolean"},"include_user_name":{"type":"boolean"},"include_verified_account":{"type":"boolean"},"ng_word":{"items":{"type":"string"},"type":"array"},"show_reason":{"type":"boolean"}},"required":["advanced_filter","allow_list","color","decompress_on_hover","exclude_url","hide_completely","include_user_name","include_verified_account","ng_word","show_reason"],"type":"object"};const schema23 = {"additionalProperties":false,"properties":{"background":{"type":"string"},"card":{"type":"string"},"card_hover":{"type":"string"},"drawer":{"type":"string"},"high_emphasize_text":{"type":"string"},"main":{"type":"string"},"main_light":{"type":"string"},"medium_emphasize_text":{"type":"string"},"top_app_bar":{"type":"string"}},"required":["background","card","card_hover","drawer","high_emphasize_text","main","main_light","medium_emphasize_text","top_app_bar"],"type":"object"};const func8 = Object.prototype.hasOwnProperty;function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){let vErrors = null;let errors = 0;if(errors === 0){if(data && typeof data == "object" && !Array.isArray(data)){let missing0;if(((((((((((data.advanced_filter === undefined) && (missing0 = "advanced_filter")) || ((data.allow_list === undefined) && (missing0 = "allow_list"))) || ((data.color === undefined) && (missing0 = "color"))) || ((data.decompress_on_hover === undefined) && (missing0 = "decompress_on_hover"))) || ((data.exclude_url === undefined) && (missing0 = "exclude_url"))) || ((data.hide_completely === undefined) && (missing0 = "hide_completely"))) || ((data.include_user_name === undefined) && (missing0 = "include_user_name"))) || ((data.include_verified_account === undefined) && (missing0 = "include_verified_account"))) || ((data.ng_word === undefined) && (missing0 = "ng_word"))) || ((data.show_reason === undefined) && (missing0 = "show_reason"))){validate20.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];return false;}else {const _errs1 = errors;for(const key0 in data){if(!(func8.call(schema22.properties, key0))){validate20.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];return false;break;}}if(_errs1 === errors){if(data.advanced_filter !== undefined){let data0 = data.advanced_filter;const _errs2 = errors;if(errors === _errs2){if(Array.isArray(data0)){var valid1 = true;const len0 = data0.length;for(let i0=0; i0<len0; i0++){const _errs4 = errors;if(typeof data0[i0] !== "string"){validate20.errors = [{instancePath:instancePath+"/advanced_filter/" + i0,schemaPath:"#/properties/advanced_filter/items/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid1 = _errs4 === errors;if(!valid1){break;}}}else {validate20.errors = [{instancePath:instancePath+"/advanced_filter",schemaPath:"#/properties/advanced_filter/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs2 === errors;}else {var valid0 = true;}if(valid0){if(data.allow_list !== undefined){let data2 = data.allow_list;const _errs6 = errors;if(errors === _errs6){if(Array.isArray(data2)){var valid2 = true;const len1 = data2.length;for(let i1=0; i1<len1; i1++){const _errs8 = errors;if(typeof data2[i1] !== "string"){validate20.errors = [{instancePath:instancePath+"/allow_list/" + i1,schemaPath:"#/properties/allow_list/items/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid2 = _errs8 === errors;if(!valid2){break;}}}else {validate20.errors = [{instancePath:instancePath+"/allow_list",schemaPath:"#/properties/allow_list/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs6 === errors;}else {var valid0 = true;}if(valid0){if(data.color !== undefined){let data4 = data.color;const _errs10 = errors;const _errs11 = errors;if(errors === _errs11){if(data4 && typeof data4 == "object" && !Array.isArray(data4)){let missing1;if((((((((((data4.background === undefined) && (missing1 = "background")) || ((data4.card === undefined) && (missing1 = "card"))) || ((data4.card_hover === undefined) && (missing1 = "card_hover"))) || ((data4.drawer === undefined) && (missing1 = "drawer"))) || ((data4.high_emphasize_text === undefined) && (missing1 = "high_emphasize_text"))) || ((data4.main === undefined) && (missing1 = "main"))) || ((data4.main_light === undefined) && (missing1 = "main_light"))) || ((data4.medium_emphasize_text === undefined) && (missing1 = "medium_emphasize_text"))) || ((data4.top_app_bar === undefined) && (missing1 = "top_app_bar"))){validate20.errors = [{instancePath:instancePath+"/color",schemaPath:"#/definitions/ColorSetting/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];return false;}else {const _errs13 = errors;for(const key1 in data4){if(!(func8.call(schema23.properties, key1))){validate20.errors = [{instancePath:instancePath+"/color",schemaPath:"#/definitions/ColorSetting/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];return false;break;}}if(_errs13 === errors){if(data4.background !== undefined){const _errs14 = errors;if(typeof data4.background !== "string"){validate20.errors = [{instancePath:instancePath+"/color/background",schemaPath:"#/definitions/ColorSetting/properties/background/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs14 === errors;}else {var valid4 = true;}if(valid4){if(data4.card !== undefined){const _errs16 = errors;if(typeof data4.card !== "string"){validate20.errors = [{instancePath:instancePath+"/color/card",schemaPath:"#/definitions/ColorSetting/properties/card/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs16 === errors;}else {var valid4 = true;}if(valid4){if(data4.card_hover !== undefined){const _errs18 = errors;if(typeof data4.card_hover !== "string"){validate20.errors = [{instancePath:instancePath+"/color/card_hover",schemaPath:"#/definitions/ColorSetting/properties/card_hover/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs18 === errors;}else {var valid4 = true;}if(valid4){if(data4.drawer !== undefined){const _errs20 = errors;if(typeof data4.drawer !== "string"){validate20.errors = [{instancePath:instancePath+"/color/drawer",schemaPath:"#/definitions/ColorSetting/properties/drawer/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs20 === errors;}else {var valid4 = true;}if(valid4){if(data4.high_emphasize_text !== undefined){const _errs22 = errors;if(typeof data4.high_emphasize_text !== "string"){validate20.errors = [{instancePath:instancePath+"/color/high_emphasize_text",schemaPath:"#/definitions/ColorSetting/properties/high_emphasize_text/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs22 === errors;}else {var valid4 = true;}if(valid4){if(data4.main !== undefined){const _errs24 = errors;if(typeof data4.main !== "string"){validate20.errors = [{instancePath:instancePath+"/color/main",schemaPath:"#/definitions/ColorSetting/properties/main/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs24 === errors;}else {var valid4 = true;}if(valid4){if(data4.main_light !== undefined){const _errs26 = errors;if(typeof data4.main_light !== "string"){validate20.errors = [{instancePath:instancePath+"/color/main_light",schemaPath:"#/definitions/ColorSetting/properties/main_light/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs26 === errors;}else {var valid4 = true;}if(valid4){if(data4.medium_emphasize_text !== undefined){const _errs28 = errors;if(typeof data4.medium_emphasize_text !== "string"){validate20.errors = [{instancePath:instancePath+"/color/medium_emphasize_text",schemaPath:"#/definitions/ColorSetting/properties/medium_emphasize_text/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs28 === errors;}else {var valid4 = true;}if(valid4){if(data4.top_app_bar !== undefined){const _errs30 = errors;if(typeof data4.top_app_bar !== "string"){validate20.errors = [{instancePath:instancePath+"/color/top_app_bar",schemaPath:"#/definitions/ColorSetting/properties/top_app_bar/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid4 = _errs30 === errors;}else {var valid4 = true;}}}}}}}}}}}}else {validate20.errors = [{instancePath:instancePath+"/color",schemaPath:"#/definitions/ColorSetting/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}var valid0 = _errs10 === errors;}else {var valid0 = true;}if(valid0){if(data.decompress_on_hover !== undefined){const _errs32 = errors;if(typeof data.decompress_on_hover !== "boolean"){validate20.errors = [{instancePath:instancePath+"/decompress_on_hover",schemaPath:"#/properties/decompress_on_hover/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];return false;}var valid0 = _errs32 === errors;}else {var valid0 = true;}if(valid0){if(data.exclude_url !== undefined){let data15 = data.exclude_url;const _errs34 = errors;if(errors === _errs34){if(Array.isArray(data15)){var valid5 = true;const len2 = data15.length;for(let i2=0; i2<len2; i2++){const _errs36 = errors;if(typeof data15[i2] !== "string"){validate20.errors = [{instancePath:instancePath+"/exclude_url/" + i2,schemaPath:"#/properties/exclude_url/items/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid5 = _errs36 === errors;if(!valid5){break;}}}else {validate20.errors = [{instancePath:instancePath+"/exclude_url",schemaPath:"#/properties/exclude_url/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs34 === errors;}else {var valid0 = true;}if(valid0){if(data.hide_completely !== undefined){const _errs38 = errors;if(typeof data.hide_completely !== "boolean"){validate20.errors = [{instancePath:instancePath+"/hide_completely",schemaPath:"#/properties/hide_completely/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];return false;}var valid0 = _errs38 === errors;}else {var valid0 = true;}if(valid0){if(data.include_user_name !== undefined){const _errs40 = errors;if(typeof data.include_user_name !== "boolean"){validate20.errors = [{instancePath:instancePath+"/include_user_name",schemaPath:"#/properties/include_user_name/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];return false;}var valid0 = _errs40 === errors;}else {var valid0 = true;}if(valid0){if(data.include_verified_account !== undefined){const _errs42 = errors;if(typeof data.include_verified_account !== "boolean"){validate20.errors = [{instancePath:instancePath+"/include_verified_account",schemaPath:"#/properties/include_verified_account/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];return false;}var valid0 = _errs42 === errors;}else {var valid0 = true;}if(valid0){if(data.ng_word !== undefined){let data20 = data.ng_word;const _errs44 = errors;if(errors === _errs44){if(Array.isArray(data20)){var valid6 = true;const len3 = data20.length;for(let i3=0; i3<len3; i3++){const _errs46 = errors;if(typeof data20[i3] !== "string"){validate20.errors = [{instancePath:instancePath+"/ng_word/" + i3,schemaPath:"#/properties/ng_word/items/type",keyword:"type",params:{type: "string"},message:"must be string"}];return false;}var valid6 = _errs46 === errors;if(!valid6){break;}}}else {validate20.errors = [{instancePath:instancePath+"/ng_word",schemaPath:"#/properties/ng_word/type",keyword:"type",params:{type: "array"},message:"must be array"}];return false;}}var valid0 = _errs44 === errors;}else {var valid0 = true;}if(valid0){if(data.show_reason !== undefined){const _errs48 = errors;if(typeof data.show_reason !== "boolean"){validate20.errors = [{instancePath:instancePath+"/show_reason",schemaPath:"#/properties/show_reason/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];return false;}var valid0 = _errs48 === errors;}else {var valid0 = true;}}}}}}}}}}}}}else {validate20.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];return false;}}validate20.errors = vErrors;return errors === 0;}