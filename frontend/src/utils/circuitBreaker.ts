type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

const CircuitStateValues = {
  CLOSED: 'CLOSED' as const,
  OPEN: 'OPEN' as const,
  HALF_OPEN: 'HALF_OPEN' as const,
};

export interface CircuitBreakerOptions {
  failureThreshold?: number;
  resetTimeout?: number;
  monitoringPeriod?: number;
}

const defaultOptions: Required<CircuitBreakerOptions> = {
  failureThreshold: 5,
  resetTimeout: 30000,
  monitoringPeriod: 60000,
};

export class CircuitBreaker {
  private state: CircuitState = CircuitStateValues.CLOSED;
  private failureCount: number = 0;
  private nextAttemptTime: number = 0;
  private options: Required<CircuitBreakerOptions>;

  constructor(options: CircuitBreakerOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitStateValues.OPEN) {
      if (Date.now() < this.nextAttemptTime) {
        throw new Error(
          `Circuit breaker is OPEN. Service unavailable. Try again in ${
            Math.ceil((this.nextAttemptTime - Date.now()) / 1000)
          } seconds.`
        );
      }
      this.state = CircuitStateValues.HALF_OPEN;
      console.log('Circuit breaker entering HALF_OPEN state');
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === CircuitStateValues.HALF_OPEN) {
      console.log('Circuit breaker recovered - changing to CLOSED state');
    }
    this.failureCount = 0;
    this.state = CircuitStateValues.CLOSED;
  }

  private onFailure(): void {
    this.failureCount++;

    if (this.failureCount >= this.options.failureThreshold) {
      this.state = CircuitStateValues.OPEN;
      this.nextAttemptTime = Date.now() + this.options.resetTimeout;
      console.error(
        `Circuit breaker OPENED after ${this.failureCount} failures. ` +
        `Will attempt recovery in ${this.options.resetTimeout / 1000} seconds.`
      );
    }
  }

  getState(): string {
    return this.state;
  }

  getFailureCount(): number {
    return this.failureCount;
  }

  reset(): void {
    this.state = CircuitStateValues.CLOSED;
    this.failureCount = 0;
    this.nextAttemptTime = 0;
    console.log('Circuit breaker manually reset to CLOSED state');
  }
}

export const googleBooksCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30000,
});
