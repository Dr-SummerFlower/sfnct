/**
 * @文件名: list
 * @创建者: 夏花
 * @创建时间: 2023-09-27
*/

import fs from 'fs/promises';

export default async (templateDir) => {
    try {
        const templates = await fs.readdir(templateDir);
        console.info('可用模板:');
        templates.forEach((template) => {
            console.info(`- ${template}`);
        });
    } catch (err) {
        console.error('获取模版列表出错:', err);
    }
};