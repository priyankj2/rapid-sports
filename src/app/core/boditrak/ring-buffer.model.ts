export class RingBuffer<T> {
  private head = 0;
  private buffer: T[] = [];
  private readonly size: number;

  constructor(size: number) {
    this.size = size;
  }

  snapshot(): T[] {
    return [...this.buffer];
  }

  get(index: number): T {
    return this.buffer[(this.size + this.head + index - 1) % this.size];
  }

  push(item: T): void {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.size;
  }

  getLength(): number {
    return this.buffer.length;
  }

  clear(): void {
    this.buffer = [];
    this.head = 0;
  }
}
