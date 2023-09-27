/**
 * @文件名: template.js
 * @创建者: 夏花
 * @创建时间: 2023-09-27
 */

import fs from 'fs/promises';
import path from 'path';

/**
 * 创建一个应用模板或文件。
 *
 * @param {string} name - 模板或文件的名称。
 * @param {string} templateDir - 存储模板的目录路径。
 * @param {string} customPath - 创建的模板或文件的目标路径。
 */
const createTemplate = async (name, templateDir, customPath) => {
    try {
        const templatePath = path.join(templateDir, name);
        const templateStats = await fs.lstat(templatePath);

        if (templateStats.isDirectory()) {
            await copyDirectory(templatePath, customPath);
            console.info(`创建应用模板: ${name}`);
        } else {
            console.warn(`应用模板不存在: ${name}`);
        }
    } catch (err) {
        console.error('创建应用模板时出错:', err);
    }
};

/**
 * 复制目录及其内容。
 *
 * @param {string} sourceDir - 源目录的路径。
 * @param {string} targetParentDir - 目标父目录的路径。
 */
const copyDirectory = async (sourceDir, targetParentDir) => {
    try {
        const files = await fs.readdir(sourceDir);

        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(targetParentDir, file);
            const fileStats = await fs.lstat(sourceFile);

            if (fileStats.isDirectory()) {
                await fs.mkdir(targetFile, { recursive: true });
                await copyDirectory(sourceFile, targetFile);
            } else {
                await copyFile(sourceFile, targetFile);
            }
        }
    } catch (err) {
        console.error('复制目录时出错:', err);
    }
};

/**
 * 创建文件或复制现有文件。
 *
 * @param {string} name - 文件的名称。
 * @param {string} templateDir - 存储文件模板的目录路径。
 * @param {string} customPath - 创建的文件的目标路径。
 */
const createFile = async (name, templateDir, customPath) => {
    try {
        const templatePath = path.join(templateDir, name);
        const customFilePath = path.join(customPath, name);
        const templateExists = await fileExists(templatePath);

        if (templateExists) {
            await copyFile(templatePath, customFilePath);
            console.info(`创建文件模板: ${name}`);
        } else {
            await fs.writeFile(customFilePath, '');
            console.info(`创建空文件: ${name}`);
        }
    } catch (err) {
        console.error('创建文件时出错:', err);
    }
};

/**
 * 复制文件。
 *
 * @param {string} sourceFile - 源文件的路径。
 * @param {string} targetFile - 目标文件的路径。
 */
const copyFile = async (sourceFile, targetFile) => {
    try {
        const fileContent = await fs.readFile(sourceFile, 'utf-8');
        await fs.writeFile(targetFile, fileContent);
    } catch (err) {
        console.error('复制文件时出错:', err);
    }
};

/**
 * 检查文件是否存在。
 *
 * @param {string} filePath - 要检查的文件路径。
 * @returns {boolean} - 如果文件存在则返回true，否则返回false。
 */
const fileExists = async (filePath) => {
    try {
        await fs.lstat(filePath);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
};

export { createTemplate, createFile };