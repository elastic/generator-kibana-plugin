# Kibana Plugin Yeoman Generator

This project is a Yeoman generator for bootstrapping a Kibana Plugin. It creates a basic hello world Kibana plugin with all the elements in place so you can easily get started with creating your first Kibana plugin.

## Getting Started

First you need to install Yeoman

```
npm install -g yo
```

Then you need to install the Kibana Plugin generator

```
npm install -g generator-kibana-plugin
```

Then generate your new plugin

```
mkdir my-new-plugin
cd my-new-plugin
yo kibana-plugin
```

Download the latest version of Kibana and install it at the same level as your plugin directory. Then run the following command inside your plugin directory.

```
gulp dev
```

With Elasticsearch already running you should now start Kibana in dev mode.

```
cd ../kibana
bin/kibana --dev
```

Visit [http://localhost:5601](http://localhost:5601)
