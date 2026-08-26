export class UIDGenerator {
  private static counter = 0;

  static nextId(prefix = 'uid'): string {
    UIDGenerator.counter += 1;
    return `${prefix}-${UIDGenerator.counter}`;
  }
}
