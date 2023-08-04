
const apiUri = 'backend/';

export const environment = {
  production: false,

  backendBasePath: apiUri,
  auth: {
    domain: "dev-opas-webapp.eu.auth0.com",
    clientId: "UJuUtkVyLKpIjz2A0zJtaqiAh6O5U56v",
    audience: "https://opas-webapp-api.com",
    redirectUri: window.location.origin,
    errorPath: "/error",
  },
  httpInterceptor: {
    allowedList: [`${apiUri}*`],
  },
};