import { appConfig } from "../app-config";
import { HiveFarm } from "./hive-variable-config.interface";
import {
  patchWorkerOCConfig,
  getWorkers,
  workerCommands,
  WorkerCommands,
} from "./http-request-service";

export const stopMiners = async () => {
  const commands = await appConfig.hiveConfig.farms.map(
    async (farm: HiveFarm): Promise<WorkerCommands> => {
      const hiveWorkers = await getWorkers(farm.id);

      /* Check if pill is active and turns it off */
      farm.workers.map(async (worker) => {
        const hiveWorker = hiveWorkers.find((hiveWorker) => {
          if (hiveWorker.id === worker.id) {
            return hiveWorker;
          }
        });
        if (hiveWorker !== undefined) {
          if (hiveWorker.overclock && hiveWorker.overclock.nvidia.ohgodapill) {
            /**
             * Turn off pill.
             */
            const newConfig = hiveWorker.overclock.nvidia;
            newConfig.ohgodapill = false;
            await patchWorkerOCConfig(farm.id, hiveWorker.id, newConfig);
          }
        }
      });

      /* Continues to stop miners */
      return {
        worker_ids: farm.workers.map((worker) => {
          return worker.id.toString();
        }),
        data: {
          command: "miner",
          data: {
            action: "stop",
          },
        },
      };
    }
  );

  const awaitedCommands = await Promise.all(commands);
  awaitedCommands.map((command) => {
    workerCommands(command);
  });
};
