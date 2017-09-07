require('colors');

let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

module.exports = {
    run(name) {

        if (typeof name === 'undefined') {
            console.error(`No test name was given`.bgRed);

            process.exit();
        }

        let filename = `${name}Test`;
        let filepath = `${name}Test.js`;

        if (fs.existsSync(filepath)) {
            console.error(`File [${filepath}] already exists`.bgRed);

            process.exit();
        }

        if (filename.includes('/')) {

            filename = filename.substr(filename.lastIndexOf("/") + 1);

            let testfile = filepath.substr(filepath.lastIndexOf("/") + 1);
            let directories = filepath.replace(testfile, '');

            mkdirp.sync(directories);
        }

        let content = fs.readFileSync(path.resolve(__dirname, '../stubs/vue.stub'));
        content = content.toString().replace('{{ name }}', filename);

        fs.writeFileSync(filepath, content);

        console.log(`${filepath} vue test created`.green);
    }
}