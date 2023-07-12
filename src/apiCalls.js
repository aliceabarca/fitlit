export function getApiData(url, dataKey) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data[dataKey]);
}
