module.exports = {
    "root": true,
    "parser": "babel-eslint", 
    "parserOptions": {
        "sourceType": "module" 
    },
    "env": {
        "browser": true, 
        "commonjs": true,
        "node": true,
        "es6": true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    // extends: "standard",
    // required to lint *.vue files
    "plugins": [
        "html" 
    ],
    // check if imports actually resolve
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "build/webpack.base.conf.js"
            }
        }
    },
    // add your custom rules here
    "rules": {
        //这里写自定义规则
        "no-empty": "warn",
        "no-eval": "warn",
        "no-implied-eval": "warn",
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "no-use-before-define": "error",
        "constructor-super": "warn",
        "valid-typeof": "warn"
    }
}