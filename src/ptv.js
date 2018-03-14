#!/usr/bin/env node
"use strict";
const fs = require('fs')
const path = require('path');
const childProcess = require('child_process');
const util = require('./util.js');
const copyForder = require('./copy-folder.js').copyForder

const filterSrc = '../tmpl/filter-file'
const simpleSrc = '../tmpl/simple-standar-file'
const tmplSrc = '../tmpl'

//import {copy} from './copy-folder.js'

// 设置文件执行时的使用文档
var argv = require('yargs')
	//.alias('f', 'fileEmpty') // 生成空文件
	.alias({
		'e': 'fileEmpty',
		's': 'simpleStandar',
		'f': 'fileFilter',
		'o': 'openTemp',
		'h': 'help',
	}) // 生成空文件
	.array('fileEmpty') // 支持生成多个空文件
	.array('fileFilter') // 支持生成多个空文件
	.array('simpleStandar') // 支持生成多个空文件
	.usage('Usage:$0 vw [options]') // 命令错误提示文案
	.example('options:', '-e  -f -o -h') // 例子
	.example('ptv -e', '创建新目录') // 例子
	.example('ptv -s', '创建简单标准文件夹') // 例子
	.example('ptv -f', '创建搜索目录') // 例子
	.example('ptv -o', '打开模板目录') // 例子
	.example('ptv -h', '帮助') // 例子
	.help('h')
	.epilog('copyright 2016') // 日志 版本信息
	.argv;
// console.log(__dirname)

let mkdir = (dir) => {
	if ( !fs.existsSync(dir) ) {
		fs.mkdirSync(dir);
	}else{
		console.log( dir , 'is exist.');
		return true; // 终止
	}
}

// https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback
let createTemp = ( folder ) => {
	let exts = [ 'html', 'es', 'less'];
	exts.forEach((ext)=>{
		fs.writeFile( folder + '/index.' + ext , '');
	});
}

let createFolder = (folder, folderSrc) => {
	let src = path.resolve(__filename, folderSrc)
	copyForder(src, folder)
}

// 生成空文件
if(argv.fileEmpty && argv.fileEmpty.length > 0){
	argv.fileEmpty.forEach( (folder) => {
		if( !mkdir( folder ) ) {
			createTemp( folder );
		}
	});

}
// 生成简单三个文件标准
if(argv.simpleStandar && argv.simpleStandar.length > 0){
	argv.simpleStandar.forEach( (folder) => {
		if( !mkdir( folder ) ) {
			createFolder(folder, simpleSrc);
		}
	});

}

// 生成filter文件夹
if(argv.fileFilter && argv.fileFilter.length > 0){
	argv.fileFilter.forEach( (folder) => {

		if( !mkdir( folder ) ) {
			createFilter( folder );
			createFolder(folder, filterSrc)
		}
	});
}

// 打开模板文件夹
if(argv.openTemp) {
	let src = path.resolve(__filename, tmplSrc)
	if(src) {
		let cmd =util.transformCmd(src)
 		childProcess.exec(cmd);
	}
}