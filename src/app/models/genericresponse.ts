export class GenericResponse<T> {
  response: T;
  errors: Record<string, string>;
}
