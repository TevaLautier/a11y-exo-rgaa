import { FieldTree } from '@angular/forms/signals';

export function markAllAsDirty(field: FieldTree<unknown>): void {
  field().markAsDirty();

  const iterator = (field as unknown as { [Symbol.iterator]?: () => Iterator<[string, FieldTree<unknown>]> })[
    Symbol.iterator
  ];
  if (typeof iterator === 'function') {
    const it = iterator.call(field);
    let entry = it.next();
    while (!entry.done) {
      const child = entry.value[1];
      if (child) {
        markAllAsDirty(child);
      }
      entry = it.next();
    }
  }
}
