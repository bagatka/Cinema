export const environment = {
  production: false,
  baseUrl: 'https://localhost:5001/api'
};

export enum ApiPaths {
  films = '/films',
  cinemas = '/cinemas',
  shows = '/shows',
  halls = '/halls',
  services = '/services',
  account = '/account',
  orders = '/orders'
}

export enum Constants {
  FIRST_FILM_YEAR = 1878
}
