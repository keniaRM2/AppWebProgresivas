export interface UseCase<Input, Output> {
  execute(payload?: Input): Promise<Output>;
}
