#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const isPlainObject = require('lodash/isPlainObject');

const baseDir = process.cwd();
const config = require(path.resolve(baseDir, 'sync.config'));
const files = process.argv.slice(2);

const replenishComponentPath = (data) => {
    if (isPlainObject(data) && data.hasOwnProperty('components') && isPlainObject(data['components'])) {
        const output = {};
        Object.keys(data['components']).forEach((key) => {
            if (typeof data['components'][key] === 'string') {
                output[key] = path.join(config.targetDir, data['components'][key]);
            } else {
                output[key] = replenishComponentPath(data['components'][key]);
            }
        });
        return Object.assign({}, data, {components: output});
    }
    return data;
};

const run = async () => {
    const task = await Promise.all(files.map((dir) => {
        return fs.readFile(dir, {encoding: 'utf8'}).then((content) => {
            const targetDir = path.join(config.targetDir, path.relative(path.resolve(baseDir, config.basDir), dir));
            const parseContent = replenishComponentPath(JSON.parse(content));
            return config.saveFile({
                path: targetDir, content: parseContent
            })
        });
    }));
    console.log(task);
};

run().catch((e) => {
    throw e;
});



