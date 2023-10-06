#!/usr/bin/env node

/**
 * @File: index.js
 * @Author: 夏花
 * @Date: 2023-09-27
 */

// 核心模块
import path from 'path';
import fs from 'fs/promises';
// 第三方模块
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
// 自定义模块
import template from './utils/create/template.js';
import listTemplate from './utils/list.js';
import system from './utils/system.js';
import Logger from './utils/logRecord.js';

/**
 * 获取当前文件的路径和目录名
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

/**
 * 主函数，处理用户输入和操作
 */
const main = async () => {
    // 根据不同操作系统设置全局包路径
    const globalPath = execSync('npm root -g').toString().trim();
    let globalPackagePath;
    const osType = system.osType();
    switch (osType) {
        case 'Windows_NT':
        case 'Darwin':
        case 'Linux':
            globalPackagePath = path.join(globalPath, 'sfnct');
            break;
        default:
            const msg = `当前系统为${osType}, 该系统并不是常见系统，未经测试，如果出现错误请反馈到 github:https://github.com/Dr-SummerFlower/sfnct`;
            Logger.warn(msg);
            globalPackagePath = path.join(globalPath, 'sfnct');
            break;
    }

    const templateDir = path.join(globalPackagePath, 'template');
    const customPath = process.cwd();

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '请选择一个操作:',
            choices: [
                '列出可用模板',
                '创建模板',
                '安装依赖',
                '查看版本号',
                '查看系统信息',
                '退出',
            ],
        },
    ]);
    if (answers.action === '列出可用模板') {
        listTemplate(templateDir);
    } else if (answers.action === '创建模板') {
        const templates = await fs.readdir(templateDir);
        if (templates.length === 0) {
            Logger.warn('模板目录为空，请添加模板后再试。');
            return;
        }
        const templateAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'templateName',
                message: '请选择要创建的模板:',
                choices: templates,
                default: 'express-app',
            },
        ]);
        try {
            await template.createTemplateOrFile(
                templateAnswer.templateName,
                templateDir,
                customPath
            );
            Logger.info('模板创建成功！');
            const answerInstall = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'installDependencies',
                    message: '是否安装依赖？',
                },
            ]);

            if (answerInstall.installDependencies) {
                try {
                    template.installDependencies(customPath);
                    Logger.info('依赖安装成功！');
                } catch (err) {
                    Logger.error('安装依赖时出错:', err);
                }
            } else {
                Logger.info('跳过依赖安装。');
            }
        } catch (err) {
            Logger.error('创建模板时出错:', err);
        }
    } else if (answers.action === '安装依赖') {
        try {
            template.installDependencies(customPath);
            Logger.info('依赖安装成功！');
        } catch (err) {
            Logger.error('安装依赖时出错:', err);
        }
    } else if (answers.action === '查看版本号') {
        Logger.info(packageJson.version);
    } else if (answers.action === '查看系统信息') {
        const systemInfo = system.systemInformation();
        Logger.info(systemInfo);
    } else if (answers.action === '退出') {
        Logger.info('退出应用。');
    } else {
        Logger.warn('未知操作，请重试！');
    }
};

main().catch((err) => Logger.error(err));
