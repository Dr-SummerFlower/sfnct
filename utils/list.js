/**
 * @文件名: list
 * @创建者: 夏花
 * @创建时间: 2023-09-27
*/

import fs from 'fs/promises';

export default async (templateDir) => {
    try {
        const templates = await fs.readdir(templateDir);
        console.log('Available templates:');
        templates.forEach((template) => {
            console.log(`- ${template}`);
        });
    } catch (err) {
        console.error('Error listing templates:', err);
    }
};