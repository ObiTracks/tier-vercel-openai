declare module 'confetti-js' {
    export default class ConfettiGenerator {
      constructor(config: ConfettiConfig);
      render(): void;
      clear(): void;
    }
  
    export interface ConfettiConfig {
        [key: string]: any;
      }
  }