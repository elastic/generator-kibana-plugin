# Kibana Plugin Yeoman Generator

[![Apache License](https://img.shields.io/badge/license-apache_2.0-a9215a.svg)](https://raw.githubusercontent.com/elastic/template-kibana-plugin/master/LICENSE)
[![Package Deprecated](https://img.shields.io/badge/status-deprecated-red.svg)](https://github.com/elastic/template-kibana-plugin/)

**DEPRECATION NOTICE**: This package is being deprecated in favor of [template-kibana-plugin](https://github.com/elastic/template-kibana-plugin/)

---

This project is a Yeoman generator for bootstrapping a Kibana Plugin. It creates a basic hello world Kibana plugin with all the elements in place so you can easily get started with creating your first Kibana plugin.

## Compatibility

Generator Version | Min Kibana Version | Max Kibana Version
----------------- | ------------------ | ------------------
^7.0.0 | 5.5.0 | master
^6.2.0 | 5.0.0 | 5.4.x

## Getting Started

1. Setup your [Kibana development enviroment](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#development-environment-setup)

1. Create a directory for your plugin that is right next to your Kibana directory.

  - The Kibana directory must be named `kibana`
  - `kibana` and your plugin directory must be siblings

    ```sh
    ls ~/wherever/you/store/your/code
      kibana # <- where you store the Kibana development environment
      my-new-plugin # <- your plugin directory
    ```

1. Double check that your Node.js version matches Kibana's [.node-version](https://github.com/elastic/kibana/blob/master/.node-version) file

  ```sh
  node --version
  ```
  
  **HINT:** If you install [`nvm`](https://github.com/creationix/nvm#install-script) and [`avn`](https://github.com/wbyoung/avn) then you can create your own `.node-version` file and `avn` will switch to it _automatically_!

1. Install Yeoman and the Kibana plugin generator

  ```sh
  npm install -g yo generator-kibana-plugin
  ```

1. Run the generator inside your plugin directory

  ```sh
  cd my-new-plugin
  yo kibana-plugin
  ```

1. Get the URL for your Elasticsearch installation (most commonly `http://localhost:9200`)

1. Start Kibana in development mode with your new plugin included

  ```sh
  npm start -- --elasticsearch.url 'http://localhost:9200'

  # passing the elasticsearch.url here is to demonstrate how arguments can
  # be passed to kibana with `npm start` but is not actually necessary if
  # you are running elasticsearch locally
  ```

1. Visit [http://localhost:5601](http://localhost:5601)

## Options

Run the generator with the `--help` flag for up-to-date option docs.

```sh
yo kibana-plugin --help
```

## Development Tasks

  - `npm start`

    Start kibana and have it include this plugin

  - `npm start -- --config kibana.yml`

    You can pass any argument that you would normally send to `bin/kibana` by putting them after `--` when running `npm start`

  - `npm run build`

    Build a distributable archive

  - `npm run test:browser`

    Run the browser tests in a real web browser

  - `npm run test:server`

    Run the server tests using mocha

For more information about any of these commands run `npm run ${task} -- --help`.
