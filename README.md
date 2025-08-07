# Tavern Sync

酒馆同步器, 受不了在酒馆里写世界书和预设了? 这也许是你需要的东西

⚠️目前为超级简略版, 发出来说明我在做:

- 是对酒馆助手所整理的世界书、预设类型的直接提取和上传, 没有翻译和调整结构来让它更易用
- 尚不支持旧版世界书同步脚本的拆分文件、合集文件、原始文本等高级功能

## 安装和运行

- 在酒馆助手脚本库中创建脚本, 内容填写为 `import 'https://fastly.jsdelivr.net/gh/StageDog/tavern_sync/dist/script.js'`, 不用时记得关
- 下载 dist 文件夹中的 `tavern_sync.js` 文件, 用 `node tavern_sync.js` 运行, 你可以用 `node tavern_sync.js -h` 查看帮助
- VSCode 安装 yaml 扩展来对提取出的文件启用 schema 格式检查
- 如果你需要, 可以将下载 dist/type 里的文件定义, 将它和破限 (可能有版权问题?) 喂给 Cursor、Augment、RooCode 等 ai 工具, 让它帮你写世界书和预设

## 更新

- 脚本库中的脚本会在 12h 内自动更新, 但可能会被你的浏览器缓存而一段时间内没有更新; 如果急于更新, 请清理浏览器缓存.
- 下载下来的脚本文件可通过 `node tavern_sync.js update` 来更新.

## 参与贡献提示

### 项目结构

为了自动更新和打包一些东西, 本项目直接打包源代码在 `dist/` 文件夹中并随仓库上传, 而这会让开发时经常出现分支冲突.

为了解决这一点, 仓库在 `.gitattribute` 中设置了对于 `dist/` 文件夹中的冲突总是使用当前版本. 这不会有什么问题: 在上传后, ci 会将 `dist/` 文件夹重新打包成最新版本, 因而你上传的 `dist/` 文件夹内容如何无关紧要.

为了启用这个功能, 请执行一次以下命令:

```bash
git config --global merge.ours.driver true
```

### 手动编译

你可以参考 [参与前端插件开发的 VSCode 环境配置](https://sillytavern-stage-girls-dog.readthedocs.io/tool_and_experience/js_slash_runner/index.html) 来得到 VSCode 上更详细的配置和使用教程.

你需要先安装有 node 22+ 和 pnpm. 如果已经安装有 node 22+, 则 pnpm 可以按以下步骤安装:

```bash
npm install -g pnpm
```

然后, 用 pnpm 安装本项目的所有依赖:

```bash
pnpm install
```

之后你就可以对本项目进行编译:

```bash
pnpm build
```

或者, 你可以用 `pnpm watch` 来持续监听代码变动. 这样只需刷新酒馆网页, 酒馆就会使用最新的插件代码.

## 许可证

- [Aladdin](LICENSE)
