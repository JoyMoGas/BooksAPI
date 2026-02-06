export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 500,
  maxDelay: 2000,
  backoffMultiplier: 2,
};

const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === opts.maxAttempts) {
        throw new Error(
          `Failed after ${opts.maxAttempts} attempts: ${lastError.message}`
        );
      }

      const delayTime = Math.min(
        opts.initialDelay * Math.pow(opts.backoffMultiplier, attempt - 1),
        opts.maxDelay
      );

      console.warn(
        `Attempt ${attempt}/${opts.maxAttempts} failed. Retrying in ${delayTime}ms...`,
        error
      );

      await delay(delayTime);
    }
  }

  throw lastError!;
}
