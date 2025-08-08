import { map_keys_deep, map_values_deep } from '@server/util/map_deep';

export function translate(data: Record<string, any>, map: Record<string, string>) {
  const try_map = (string: string) => {
    if (typeof string !== 'string') {
      return string;
    }

    if (map[string]) {
      return map[string];
    }
    return string;
  };
  data = map_keys_deep(data, (_value, key) => {
    return try_map(key);
  });
  data = map_values_deep(data, try_map);
  return data;
}
