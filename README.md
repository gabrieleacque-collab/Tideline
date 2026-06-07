# 潮汐线 TIDELINE

这个压缩包包含一个纯静态的多页测试产品：

- `index.html`：首页开场
- `test.html`：日常参数输入与四元坐标
- `result.html`：潮汐卡与目标路径分析
- `routes.html`：名人路径卡
- `model.html`：四元结构说明

## 本机运行

在解压后的文件夹中运行：

```powershell
node serve-test-site.js 5201
```

然后打开：

```text
http://127.0.0.1:5201/
```

## 给同一局域网其他设备访问

在解压后的文件夹中运行：

```powershell
node serve-test-site.js 5201 0.0.0.0
```

然后在本机查看局域网 IP，例如 Windows 可运行：

```powershell
ipconfig
```

其他设备访问：

```text
http://你的局域网IP:5201/
```

如果访问不到，通常是防火墙或设备不在同一网络。
