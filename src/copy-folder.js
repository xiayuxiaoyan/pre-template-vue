const Fs = require('fs')
const Path = require('path');

let copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    Fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }

        paths.forEach(function( path ){
            let _src = Path.join(src, path),
                _dst = Path.join(dst, path),
                readable, writable;
            Fs.stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = Fs.createReadStream( _src );
                    // 创建写入流
                    writable = Fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
let exists = function( src, dst, callback ){
    Fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }

        // 不存在
        else{
            Fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

let copyForder = function(src, des){
    /*
     * 复制目录中的所有文件包括子目录
     * @param{ String } 需要复制的目录
     * @param{ String } 复制到指定的目录
     */


    // 复制目录
    exists(src, des, copy);
}

exports.copyForder = copyForder