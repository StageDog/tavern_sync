import _ from 'lodash';

function map_keys_deep_impl(
  data: Record<string, any>,
  fn: (value: any, key: string) => string,
  is_recursive: boolean,
): Record<string, any> {
  if (!data && !is_recursive) {
    return {};
  }

  if (!is_recursive) {
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return {};
    }
  }

  if (Array.isArray(data)) {
    return data.map(item => map_keys_deep_impl(item, fn, true));
  }

  if (!_.isPlainObject(data)) {
    return data;
  }

  const result = _.mapKeys(data, fn);

  return _.mapValues(result, value => map_keys_deep_impl(value, fn, true));
}

export function map_keys_deep(data: Record<string, any>, fn: (value: any, key: string) => string): Record<string, any> {
  return map_keys_deep_impl(data, fn, false);
}

export function map_values_deep(data: Record<string, any>, fn: (value: any) => any): Record<string, any> {
  if (Array.isArray(data)) {
    return data.map(item => map_values_deep(item, fn));
  }
  if (!_.isPlainObject(data)) {
    return fn(data);
  }
  return _.mapValues(data, value => map_values_deep(value, fn));
}
