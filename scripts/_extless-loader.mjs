// Node ESM resolve hook: allow extensionless relative imports (e.g. "./images")
// the way bundlers do, so plain `node` can run the export scripts against the
// app's source files. Used only by scripts/export-catalog.mjs.
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context);
  } catch (err) {
    if (specifier.startsWith(".") && !/\.[mc]?js$/.test(specifier)) {
      return next(specifier + ".js", context);
    }
    throw err;
  }
}
