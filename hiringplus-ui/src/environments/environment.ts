// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

//const urlPrefix = 'https://api.hiringplus.co/';
const urlPrefix = 'http://localhost:8080/';

export const environment = {
  production: false,
  userUrl: urlPrefix + 'user/',
  candidateUrl: urlPrefix + 'candidate/',
  loginUrl: urlPrefix + 'login',
  dashboardUrl: urlPrefix + 'dashboard',
  accountUrl: urlPrefix + 'account',
  uploadUrl: urlPrefix + 'sign-s3',
  jobUrl: urlPrefix
};
