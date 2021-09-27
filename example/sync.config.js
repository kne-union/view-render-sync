module.exports = {
    basDir: 'src/',
    targetDir: '/talent-view',
    saveFile: async ({path, content}) => {
        console.log(path, content);
        return {};
    }
};