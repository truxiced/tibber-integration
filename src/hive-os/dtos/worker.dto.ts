export interface WorkerDto {
  id: number;
  farm_id: number;
  name: string;
  active: boolean;
  overclock: {
    nvidia: NvidiaDto;
  };
}

export interface NvidiaDto {
  fan_speed: string;
  mem_clock: string;
  core_clock: string;
  ohgodapill: boolean;
  power_limit: string;
  running_delay: string;
  ohgodapill_args: string;
  ohgodapill_start_timeout: string;
}
