const fs = require('fs')

const musicDir = "C:/Users/lkjui/Music"

let hierarchy = []

function scanDir(dirName,parent){
    files = fs.readdirSync(dirName,{withFileTypes:true})
    for(const f of files){
        if(f.isDirectory()){//dir
                parent[f.name] = []
                scanDir(dirName.concat('/',f.name),parent[f.name])
        }else{//file
            parent.push(f.name)
        }
    }
}
allFiles = []
function fileList(dir,dirName){
    list = Object.keys(dir)
    for(const l of list){
        if(Array.isArray(dir[l])){
            fileList(dir[l],dirName.concat('/',l))
        }else{//file
            if(dir[l].indexOf('.flac') != -1){
                allFiles.push({
                        name:dir[l],
                        path:dirName.concat('/',dir[l])
                    })
            }
        }
    }
}
scanDir(musicDir,hierarchy)


fileList(hierarchy,musicDir)

module.exports = allFiles