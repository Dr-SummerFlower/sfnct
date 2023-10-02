#!/usr/bin/env node

/**
 * @文件名: index.js
 * @创建者: 夏花
 * @创建时间: 2023-09-27
 */

import { program } from 'commander';
import path from 'path';
import os from 'os';
import { createTemplate, createFile } from './utils/create/template.js';
import listTemplates from './utils/list.js';
import { execSync } from 'child_process';
import { createRequire } from 'module'
const requireUtil = createRequire(import.meta.url)

const packageJson = requireUtil('./package.json')

/**
 * 显示系统信息，包括平台、主机名、系统版本、当前用户、用户主目录、字节顺序。
 */
const systemInformation = () => {
    const system = {
        平台: os.platform(),
        主机名: os.hostname(),
        系统版本: os.release(),
        当前用户: os.userInfo().username,
        用户主目录: os.homedir(),
        字节顺序: os.endianness(),
    };
    console.info(system);
};

program
    .version(packageJson.version, '-v, --version', '查看版本号')
    .helpOption('-h, --help', '查看帮助信息')
    .option('-c, --create', '创建一个新的模版，需要配合其他参数执行')
    .option('-t, --template <name>', '创建一个新模板,需要配合 -c 命令使用')
    .option('-f, --file <name>', '创建一个新文件,需要配合 -c 命令使用')
    .option('-l, --list', '列出所有可用模版')
    .option('-o, --OS', '查看系统信息')
    .parse(process.argv);

const env = program.opts();

// 根据不同操作系统设置全局包路径
const globalPath = execSync('npm root -g').toString().trim();
let globalPackagePath;
const osType = os.type();
if (osType === 'Windows_NT') {
    // 设置 Windows 下的路径
    globalPackagePath = path.join(globalPath, 'sfnct');
} else if (osType === 'Darwin') {
    // 设置 macOS 下的路径
    globalPackagePath = path.join(globalPath, 'sfnct');
} else if (osType === 'Linux') {
    // 设置 Linux 下的路径
    globalPackagePath = path.join(globalPath, 'sfnct');
} else {
    console.warn(`当前系统为${osType},该系统并不是常见系统，未经测试，如果出现错误请反馈到 github:https://github.com/Dr-SummerFlower/sfnct`)
}

const templateDir = path.join(globalPackagePath, 'template');
const customPath = process.cwd();

if (env.create) {
    if (env.template) {
        const name = env.template;
        createTemplate(name, templateDir, customPath);
    } else if (env.file) {
        const name = env.file;
        createFile(name, templateDir, customPath);
    }
} else if (env.OS) {
    systemInformation();
} else if (env.list) {
    listTemplates(templateDir);
} else {
    console.warn('请输入正确的命令');
    program.help();
}