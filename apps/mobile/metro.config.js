const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const packagesRoot = path.resolve(workspaceRoot, "packages");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch monorepo packages so @neuropi/shared and @neuropi/ui hot-reload.
config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Keep hierarchical lookup so asset fonts inside hoisted packages resolve.
config.resolver.disableHierarchicalLookup = false;

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@expo/vector-icons": path.resolve(
    workspaceRoot,
    "node_modules/@expo/vector-icons",
  ),
};

module.exports = config;
