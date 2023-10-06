/**
 * @File: list.js
 * @Author: 夏花
 * @Date: 2023-09-27
 */

import fs from 'fs/promises';
import Logger from './logRecord.js';

/**
 * 列出给定目录中的模板列表
 * @param {string} templateDir - 模板目录的路径
 * @returns {Promise<void>} - Promise，当列出模板完成时解析
 */
export default async (templateDir) => {
    try {
        const templates = await fs.readdir(templateDir);
        Logger.info('可用模板:');
        templates.forEach((template) => {
            Logger.info(`- ${template}`);
        });
    } catch (err) {
        Logger.error('获取模版列表出错:', err);
    }
};
