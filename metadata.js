const extractor = require('metadata-extract')

console.log(extractor('Music/米津玄師/1_M87_Kenshi Yonezu_M87.flac').then((value)=>{
    console.log(value['music-metadata'].title)
}))