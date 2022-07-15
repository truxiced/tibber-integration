import { schedule } from "node-cron";
import { appConfig } from "./app-config";
import { startMiners, stopMiners } from "./hive-os";
import { hourlyCost } from "./tibber/hourly-cost";

schedule("5 * * * *", async () => {
  const tibberData = await hourlyCost();
  const currentCost =
    tibberData.data.viewer.homes[0].currentSubscription.priceInfo.current;
  console.log(currentCost.total);
  if (currentCost.total > appConfig.maxHourlyCost) {
    console.log("STOP");
    stopMiners();
  } else {
    console.log("START");
    startMiners();
  }
});
