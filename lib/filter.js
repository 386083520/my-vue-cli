const evaluate = require('./eval')
const match = require('minimatch')
module.exports = (files, filters, data, done) => {
    if (!filters) {
        return done()
    }
    const fileNames = Object.keys(files)
    Object.keys(filters).forEach(glob => {
        fileNames.forEach(file => {
            if (match(file, glob, { dot: true })) {
                const condition = filters[glob]
                if (!evaluate(condition, data)) {
                    delete files[file]
                }
            }
        })
    })
    done()
}
