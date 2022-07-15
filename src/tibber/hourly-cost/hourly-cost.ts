import fetch from "node-fetch";
import { appConfig } from "../../app-config";
import { HourlyCostDto } from "./hourly-cost.dto";

export const hourlyCost = async () => {
  const url = `https://api.tibber.com/v1-beta/gql`;
  const query = JSON.stringify({
    query: `{
    viewer {
      homes {
        currentSubscription{
          priceInfo{
            current{
              total
              energy
              tax
              startsAt
            }
           
          }
        }
      }
    }
  }
  `,
  });

  return await fetch(url, {
    method: "POST",
    headers: {
      Authorization: appConfig.tibberToken,
      "Content-Type": "application/json",
    },
    body: query,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as unknown as HourlyCostDto;
  });
};
