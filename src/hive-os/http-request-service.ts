import fetch from "node-fetch";
import { appConfig } from "../app-config";
import { NvidiaDto, WorkerDto } from "./dtos/worker.dto";
import { WorkersDto } from "./dtos/workers.dto";

export interface WorkerCommands {
  worker_ids: string[];
  data: {
    command: "miner";
    data: {
      action: "stop" | "restart";
    };
  };
}

export const getWorkers = async (farmId: number): Promise<WorkerDto[]> => {
  return await fetch(
    `https://api2.hiveos.farm/api/v2/farms/${farmId}/workers`,
    {
      method: "GET",
      headers: {
        Authorization: appConfig.hiveToken,
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (response) => {
      if (!response.ok) {
      }
      return await response.json();
    })
    .then((workers: WorkersDto) => {
      return workers.data;
    });
};

export const workerCommands = (commands: WorkerCommands) => {
  console.log(JSON.stringify(commands));
  fetch("https://api2.hiveos.farm/api/v2/farms/1748262/workers/command", {
    method: "POST",
    headers: {
      Authorization: appConfig.hiveToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response;
    })
    .then((response) => {
      console.log(response);
    });
};

export const patchWorkerOCConfig = async (
  farmId: number,
  workerId: number,
  config: NvidiaDto
): Promise<void> => {
  await fetch(
    `https://api2.hiveos.farm/api/v2/farms/${farmId}/workers/${workerId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: appConfig.hiveToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oc_config: {
          default: {
            nvidia: config,
          },
        },
      }),
    }
  ).then(async (response) => {
    if (!response.ok) {
    }
    console.log(await response.json());
  });
};
