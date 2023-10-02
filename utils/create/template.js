import fs from "fs/promises";
import path from "path";

const copy = async (source, target) => {
    try {
        const content = await fs.readFile(source, "utf-8");
        await fs.writeFile(target, content);
    } catch (err) {
        console.error(`复制 ${source} 到 ${target} 时出错:`, err);
    }
};

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
                await copy(sourcePath, targetPath);
            }
        }
    } catch (err) {
        console.error(`复制目录 ${source} 到 ${target} 时出错:`, err);
    }
};

const createTemplate = async (name, templateDir, customPath) => {
    try {
        const templatePath = path.join(templateDir, name);
        const stats = await fs.lstat(templatePath);

        if (stats.isDirectory()) {
            await copyDirectory(templatePath, customPath);
            console.info(`创建应用模板: ${name}`);
        } else {
            console.warn(`应用模板不存在: ${name}`);
        }
    } catch (err) {
        console.error(`创建应用模板 ${name} 时出错:`, err);
    }
};

const createFile = async (name, templateDir, customPath) => {
    try {
        const templatePath = path.join(templateDir, name);
        const customFilePath = path.join(customPath, name);

        if (await fileExists(templatePath)) {
            await copy(templatePath, customFilePath);
            console.info(`创建文件模板: ${name}`);
        } else {
            await fs.writeFile(customFilePath, '');
            console.info(`创建空文件: ${name}`);
        }
    } catch (err) {
        console.error(`创建文件 ${name} 时出错:`, err);
    }
};

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