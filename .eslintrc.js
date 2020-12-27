/*
 * @Description: 
 * @Date: 2020-12-26 16:10:50
 * @Author: mason
 */
// module.exports = {
//     extends: [
//         'taro/react',
//         "eslint:recommended", //所有在规则页面被标记为“✔️”的规则将会默认开启
//         "plugin:react/recommended"
//     ]
// }
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            // 允许在全局作用域下使用 return 语句
            "globalReturn": true,
            // impliedStric
            // "impliedStrict": true,
            // 启用 JSX
            "jsx": true,
            "modules": true
        }
    },
    plugins: ["react"],
    extends: [
        // 'taro/react',
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    settings: {
        "react": {
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
    // extends: 'google',
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        // "quotes": ["error", "double"],
        // "semi": ["error", "always"],
        "linebreak-style": 'off',
        // "no-console": "error",
        "arrow-parens": 0,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": [0, {
            "vars": "all",
            "args": "none"
        }],
        "no-redeclare": 0,
        "no-extra-semi": 0,
        "no-unreachable": 0,
        "no-console": 0,
        "no-useless-escape": 0,
        "no-dupe-keys": 0,
        "no-constant-condition": 0,
        "no-empty": 0,
        "no-self-assign": 0,
        "no-irregular-whitespace": 0,
        "no-sparse-arrays": 0,
        "no-case-declarations": 0,
        "no-extra-boolean-cast": 0,
        "no-cond-assign": 0,
        "react/prop-types": 0,
        "react/display-name": 0
    }
}