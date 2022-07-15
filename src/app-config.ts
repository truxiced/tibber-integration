import "dotenv/config";
import { HiveVariableConfiguration } from "./hive-os";

const getVariable = (variableName: string) => {
  const variable = process.env[variableName];
  if (variable === undefined) {
    throw new Error(`Variable ${variableName} missing`);
  }
  return variable;
};

const getHiveConfig = (variableName: string): HiveVariableConfiguration => {
  const deserializedJsonString = getVariable(variableName)
    .replace(/(\\n)/g, "")
    .replace(/(\\r)/g, "")
    .replace(/(\\t)/g, "")
    .replace(/(\\f)/g, "")
    .replace(/(\\b)/g, "")
    .replace(/(\")/g, '"')
    .replace(/("{)/g, "{")
    .replace(/(}")/g, "}")
    .replace(/(\\)/g, "")
    .replace(/(\/)/g, "/");
  return JSON.parse(deserializedJsonString);
};
export interface AppConfig {
  tibberToken: string;
  maxHourlyCost: number;
  hiveToken: string;
  hiveConfig: HiveVariableConfiguration;
}
export const variables = [
  "SVC_TIBBER_TOKEN",
  "SVC_MAX_HOURLY_COST",
  "SVC_HIVE_TOKEN",
  "SVC_HIVE_CONFIG",
];

export const appConfig: AppConfig = {
  tibberToken: getVariable("SVC_TIBBER_TOKEN"),
  maxHourlyCost: Number(getVariable("SVC_MAX_HOURLY_COST")),
  hiveToken: getVariable("SVC_HIVE_TOKEN"),
  hiveConfig: getHiveConfig("SVC_HIVE_CONFIG"),
};
