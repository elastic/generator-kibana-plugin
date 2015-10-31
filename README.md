# Kibana Plugin Yeoman Generator

A Yeoman generator for Kibana plugins

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

Run Kibana in dev mode

```
cd ../kibana
bin/kibana --dev
```

Visit http://localhost:5601
