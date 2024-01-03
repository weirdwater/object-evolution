import { Compiler } from "webpack"
import path from "path"

const pluginName: string = "BrowserExtensionManifestPlugin"

interface BrowserExtensionManifestPluginOptions {
    template: string
}

const defaultOptions: BrowserExtensionManifestPluginOptions = {
    template: "manifest.json"
}

class BrowserExtensionManifestPlugin {
    options: BrowserExtensionManifestPluginOptions

    constructor(options?: Partial<BrowserExtensionManifestPluginOptions>) {
        this.options = { ...defaultOptions, ...(options ?? {}) }
    }

    apply(compiler: Compiler) {
        const logger = compiler.getInfrastructureLogger(pluginName)

        compiler.hooks.initialize.tap(pluginName, () => {
            logger.info("Template", path.resolve(compiler.context, this.options.template))
        })

        // Based on html plugin: https://github.com/jantimon/html-webpack-plugin/blob/ebfa1cecdace8a75a6a167e70aac4f0e0ad90121/index.js#L153
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap({ name: pluginName, stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE }, () => {
                logger.info("emitted assets:", compilation.emittedAssets.size)
                
                compilation.entrypoints.forEach(e => logger.info(e.options.name, e.getEntrypointChunk().files))
    
                const manifest = {
                    "manifest_version": 3,
                    background: {
                        "service_worker": compilation.entrypoints.get("worker")?.getEntrypointChunk().files.values().next().value,
                        type: "module"
                    },
                    "content_scripts": {
                        js: Array.from(compilation.entrypoints.get("content")?.getEntrypointChunk().files ?? [])
                    }
                }
    
                const manifestJson = JSON.stringify(manifest, null, 2)
                const manifestSource = new compiler.webpack.sources.RawSource(manifestJson, false);
                compilation.emitAsset("manifest.json", manifestSource)
    
                logger.info(manifestJson)
            })

            
        })

    }
}

export default BrowserExtensionManifestPlugin
