export interface HiveVariableConfiguration {
  farms: HiveFarm[];
}

export interface HiveFarm {
  id: number;
  workers: HiveWorker[];
}

interface HiveWorker {
  id: number;
  pill: boolean;
}
