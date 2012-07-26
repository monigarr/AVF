/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var myFS = 0;
var myFileEntry = 0;
var failFS = function(evt) {
    console.log("File System Error: " + evt.target.error.code);
    document.getElementById('file-system-text').innerHTML = 
	"<strong>File System Error: " + evt.target.error.code + "</strong>";  
}
var writeFail = function(error) {
    console.log("Create/Write Error: " + error.code);
    document.getElementById('file-status').innerHTML = 
	"Create/Write <strong>Error: " + error.code + "</strong>";   
}

// api-file  Create
var createGotNewFile = function(file){
    document.getElementById('file-status').innerHTML = 
	"Created: <strong>" + file.fullPath + "</strong>";
    document.getElementById('file-read-text').innerHTML = '';  
    document.getElementById('file-read-dataurl').innerHTML = '';
}
var createGotFileEntry = function(fileEntry) {
    myFileEntry = fileEntry;
    fileEntry.file(createGotNewFile, writeFail);
}

var gotFS = function(fileSystem) {
    myFS = fileSystem;
    console.log(fileSystem.name);
    console.log(fileSystem.root.name);
    document.getElementById('file-system-text').innerHTML =
	"File System: <strong>" + fileSystem.name + "</strong> " +
	"Root: <strong>" + fileSystem.root.name + "</strong>";
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, createGotFileEntry, writeFail);
}
var createFile = function() { // button onclick function
    if (myFS) {
        gotFS(myFS);
    } else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
    }
}

//api-file  FileWriter
var gotFileWriter = function(writer) {
    writer.onwriteend = function(evt) {
        console.log("contents of file now 'some sample text'");
        document.getElementById('file-contents').innerHTML =
		"<br/>Contents: <strong>some sample text</strong>";
        writer.truncate(11);  
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample'");
            document.getElementById('file-contents').innerHTML =
			"<br/>Contents: <strong>some sample</strong>";
            writer.seek(4);
            writer.write(" different text");
            writer.onwriteend = function(evt){
                console.log("contents of file now 'some different text'");
                document.getElementById('file-contents').innerHTML =
				"<br/>Contents: <strong>some different text</strong>";
            };
        };
    };
    writer.write("some sample text");
}
var gotFileEntry = function(fileEntry) {
    fileEntry.createWriter(gotFileWriter, writeFail);
}
var writeFile = function() { // button onclick function
    if (myFileEntry) {
        gotFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML ="Status: <strong>Error: File Not Created!</strong>";
    }
}

// api-file  FileReader
var readFail = function(error) {
    console.log("Read Error: " + error.code);
    document.getElementById('file-read-text').innerHTML ="<strong>Read Error: " + error.code + "</strong>";
    document.getElementById('file-read-dataurl').innerHTML = '';
}

var readerreadDataUrl = function(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as data URL");
        console.log(evt.target.result);
        document.getElementById('file-read-dataurl').innerHTML =
		"<strong>" + evt.target.result.slice(0, 38) + "...</strong>";
    };
    reader.readAsDataURL(file);
}

var readerreadAsText = function(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as text");
        console.log(evt.target.result);
        document.getElementById('file-read-text').innerHTML = "<strong>" + evt.target.result + "</strong>";
    };
    reader.readAsText(file);
}

var readerGotFile = function(file){
    readerreadDataUrl(file);
    readerreadAsText(file);
}

var readerGotFileEntry = function(fileEntry) {
    fileEntry.file(readerGotFile, readFail);
}

var readFile = function() { // button onclick function
    if (myFileEntry) {
        readerGotFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML = "Status: <strong>Error: File Not Created!</strong>";
        return false;
    }    
}

// api-file  Remove File
var removeSuccess = function(entry) {
    document.getElementById('file-status').innerHTML = "Removed: <strong>readme.txt</strong>"; 
    document.getElementById('file-contents').innerHTML = "<br/>Contents:";
    document.getElementById('file-read-dataurl').innerHTML = '';  
    document.getElementById('file-read-text').innerHTML = '';
}

var removeFail = function(error) {
    console.log("Remove File Error: " + error.code);
    document.getElementById('file-status').innerHTML = "Status: <strong>Remove Error: " + error.code + "</strong>";       
}

var removeFileEntry = function(fileEntry) {
    fileEntry.remove(removeSuccess, removeFail);
}

var removeFile = function() { // button onclick function
    if (myFileEntry) {
        removeFileEntry(myFileEntry);        
    } else {
        document.getElementById('file-status').innerHTML = "Status: <strong>Error: File Not Created!</strong>";
    }    
}
