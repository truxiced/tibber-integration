import { appConfig } from "../app-config";
import { HiveFarm } from "./hive-variable-config.interface";
import {
  getWorkers,
  patchWorkerOCConfig,
  workerCommands,
  WorkerCommands,
} from "./http-request-service";

export const startMiners = async () => {
  const commands = appConfig.hiveConfig.farms.map(
    async (farm: HiveFarm): Promise<WorkerCommands> => {
      const hiveWorkers = await getWorkers(farm.id);

      /* Check if pill is active and turns it off */
      farm.workers.map(async (worker) => {
        if (worker.pill) {
          const hiveWorker = hiveWorkers.find((hiveWorker) => {
            if (hiveWorker.id === worker.id) {
              return hiveWorker;
            }
          });
          if (hiveWorker !== undefined) {
            /**
             * Turn on pill.
             */
            const newConfig = hiveWorker.overclock.nvidia;
            newConfig.ohgodapill = true;
            await patchWorkerOCConfig(farm.id, worker.id, newConfig);
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
