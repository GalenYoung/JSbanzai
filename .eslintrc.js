module.exports = {
    "globals": {
        "$": true
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        /**
         * 代码格式
         */

        // "indent": ["error", "tab"],             //缩进  可能值2，4
        "linebreak-style": ["error", "unix"],   // "windows"
        "quotes": ["warn", "single"],           //引号
        "semi": ["error", "always"],            // "never"
        //"no-extra-semi": 2,                     //禁止多余的冒号

        /**
         * 逻辑功能
         */
        "strict": 2,            //使用严格模式
        "no-alert": 0,          //禁止使用alert confirm prompt
        "no-console": 2,        //禁止使用console
        "vars-on-top": 2,       //var必须放在作用域顶部
        "no-var": 0,            //禁用var，用let和const代替
        "no-empty": 2,          //块语句中的内容不能为空
        "no-extra-parens": 2,   //禁止非必要的括号
        "no-func-assign": 2,    //禁止重复的函数声明
        "no-implicit-coercion": 1, //禁止隐式转换
        "no-with": 2,           //禁用with
        "camelcase": 2,         //强制驼峰法命名
        "eqeqeq": 2,            //必须使用全等
        "max-params": [0, 5],   //函数最多只能有5个参数
        "no-extend-native": 2,  //禁止扩展原生对象
    }
};

/*
    "off"或者0    //关闭规则关闭
    "warn"或者1    //在打开的规则作为警告（不影响退出代码）
    "error"或者2    //把规则作为一个错误（退出代码触发时为1）
 */