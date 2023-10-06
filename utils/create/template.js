/**
 * @file template.js
 * @author 夏花
 * @date 2023-09-27
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

/**
 * 复制文件
 * @param {string} sourcePath - 源文件路径
 * @param {string} targetPath - 目标文件路径
 * @returns {Promise<void>} - 成功时解析，失败时拒绝带有错误信息的 Promise
 */
const copyFile = async (sourcePath, targetPath) => {
    try {
        const content = await fs.readFile(sourcePath, 'utf-8');
        await fs.writeFile(targetPath, content);
    } catch (err) {
        throw err;
    }
};

/**
 * 检查文件是否存在
 * @param {string} filePath - 文件路径
 * @returns {Promise<boolean>} - 成功时解析为 true，文件不存在时解析为 false，失败时拒绝带有错误信息的 Promise
 */
const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

/**
 * 递归复制目录
 * @param {string} source - 源目录路径
 * @param {string} target - 目标目录路径
 * @returns {Promise<void>} - 成功时解析，失败时拒绝带有错误信息的 Promise
 */
const copyDirectory = async (source, target) => {
    try {
        const files = await fs.readdir(source);

        for (const file of files) {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(target, file);

            const stats = await fs.lstat(sourcePath);
            if (stats.isDirectory()) {
                await fs.mkdir(targetPath, { recursive: true });
                await copyDirectory(sourcePath, targetPath);
            } else {
                await copyFile(sourcePath, targetPath);
            }
        }
    } catch (err) {
        throw err;
    }
};

/**
 * 创建应用模板或文件
 * @param {string} name - 模板或文件名
 * @param {string} templateDir - 模板目录路径
 * @param {string} customPath - 目标路径
 * @returns {Promise<void>} - 成功时解析，失败时拒绝带有错误信息的 Promise
 */
const createTemplateOrFile = async (name, templateDir, customPath) => {
    const templatePath = path.join(templateDir, name);

    if (!(await fileExists(templatePath))) {
        throw new Error(`模板或文件不存在: ${name}`);
    }

    const stats = await fs.lstat(templatePath);

    if (stats.isDirectory()) {
        await copyDirectory(templatePath, customPath);
    } else {
        await copyFile(templatePath, path.join(customPath, name));
    }
};

/**
 * 安装依赖
 * @param {string} customPath - 目标路径
 * @returns {void}
 */
const installDependencies = (customPath) => {
    execSync('npm install', { cwd: customPath });
};

/**
 * 模板操作函数集合
 * @type {Object}
 */
const template = { createTemplateOrFile, installDependencies };

export default template;
