# 用前必读

**感谢王红元老师的开源精神**

这是我在学习ts+react的练手项目

许多功能没有完善，以后有时间会慢慢完善这个项目的



## 目前实现

- 首页数据的展示
- 音乐的点击播放
- 音乐的拖动播放与歌词的匹配



### 运行

- 安装依赖：`npm install`
- 运行：`npm run start`



# 项目目录结构划分

```
├── assets							# 静态资源文件
│   └── css
│   └── img
│   └── data
├── base-ui                         # 多项目复用组件
├── components                      # 当前项目用到的组件
├── hooks 							# 自定义hook
├── router 							# 路由
├── store 							# 仓库
├── service 						# 网络请求
├── utils 							# 工具
├── views 							# 页面视图
```



# 其他纪录

## 在ts+react项目中配置路径

- 安装依赖：`npm install @craco/craco `

- 根路径下创建 craco.config.js

  - ```js
    const path = require("path")
    module.exports = {
      webpack:{
        alias:{
          "@":path.resolve(__dirname,"src")
        }
      }
    }
    ```

- 修改package.json文件的script字段

  - ```js
        "scripts": {
            "start": "  start",
            "build": "craco build",
            "test": "craco test",
            "eject": "react-scripts eject"
         },
    ```

- tsconfig.json中配置

  - ```json
    // 在"jsx": "react-jsx",后添加
    "baseUrl": ".",
    "paths": {
        "@/*":[
            "src/*"
        ]
    }
    ```

- 重启




## CSS样式的重置

- 使用安装并导入`npm install normalize.css`
- 配置自己的css重置
  - `/assets/css/reset.less`



## 路由配置



## 设置.editorconfig

**统一代码风格**

```
# http://editorconfig.org

root = true

[*] # 表示所有文件使用
charset = utf-8
indent_style = space    #缩进风格
indent_size = 2 #缩进大小
end_of_libe = lf # 控制换行类型
trim_trailing_whitespace = true # 去除行尾空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行


[*.md] # 表示仅对md文件应用以下规则
max_line_length = off
trim_trailing_whitespace = false
```





## 配置prettier工具

格式化工具

安装：`npm install prettier -D`

配置`.prettierrc`

- useTabs：使用tab缩进还是空格缩进，选false为空格
- tabWidth：tab是空格的情况下，是几个空格，选2个
- printWidth：当前字符的长度，推荐80
- singleQuote：使用单引号还是双引号。true为单引号
- trailingComma：在多行输入的为逗号添加，设置为none，如对象最后一个属性是否添加
- semi：语句末尾是否要加分好，默认为true，false为不加

```
{
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComa": "none",
    "semi": false
}
```



## 使用ESLint检测

安装：`npm install eslint -D`

































