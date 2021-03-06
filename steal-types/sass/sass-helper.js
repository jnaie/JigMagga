!function () {
    /**
     * sass import fn
     * transform object sass variables from a conf file to a sass syntax
     * @param sassSteal
     * @returns {string}
     */
    function sassImportFn(sassSteal) {
        var sassText = "";

        if (sassSteal) {
            for (var key in sassSteal) {
                sassText += "$" + key + ": " + sassSteal[key] + ";\n";
            }
            if (sassSteal['yd-satellites-template']) {
                for (var i = 1; i <= 5; i++) {
                    if (sassSteal['yd-satellites-color' + i] === "default") {
                        sassText += "$yd-satellites-color" + i + ": " + sassSteal['yd-satellites-color' + i + '-' + sassSteal['yd-satellites-template']] + ";\n";
                    }
                }
            }
        }
        return sassText;
    }

    function getCachedSassPath(scssPath, page, domain, locale) {
        return scssPath.replace(".scss", "-" +  page.replace(/\/|\./g, "_") + "-" + domain.replace(/\./g, "_") + "-" + locale + "-cached.css" );
    }

//steal export
    if (typeof steal !== 'undefined') {
        steal(function () {
            return {
                sassImportFn : sassImportFn,
                getCachedSassPath : getCachedSassPath
            };
        });
    }

//node export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            sassImportFn : sassImportFn,
            getCachedSassPath : getCachedSassPath
        };
    }

}();