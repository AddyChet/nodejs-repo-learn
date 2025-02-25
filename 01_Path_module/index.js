const path = require("path")

//this __filename comes from module wrapper function

// you can get the directory name with this command 
// eg --> path.dirname('/foo/bar/baz/asdf/hji') Returns: '/foo/bar/baz/asdf' --> ignores the last path
console.log("Directory Name" , path.dirname(__filename))

// you can get the file name with this command
//it returns a string and has a optional suffix 
console.log(path.basename(__filename))

    //suffix
    console.log(path.basename('/foo/bar/baz/asdf/quux.html', '.html')) // Returns: 'quux' 

// you can get the file extention with this command
console.log(path.extname(__filename))

//imp things to note about extname
    path.extname('index.coffee.md');
    // Returns: '.md'

    path.extname('index.');
    // Returns: '.'

    path.extname('index');
    // Returns: ''

    path.extname('.index');
    // Returns: ''


//this will join the following path --> node\js\project\index --> in this order
const joinPath = path.join('node', 'js', 'project', 'index')
console.log(joinPath)
    // some more eg of join path
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
    // Returns: '/foo/bar/baz/asdf'

    // path.join('foo', {}, 'bar');
    // Throws 'TypeError: Path must be a string. Received {}'

    path.join(".", ".")
    //Zero-length path segments are ignored. If the joined path string is a zero-length string then '.' will be returned

const resolvePath = path.resolve('node', 'js', 'project', 'index')
console.log(resolvePath)

//Path.format --> dir found = root ignored , base found = name,ext ignored
//it is a obj which takes --> dir,root,name,ext,base as keys and values should be always in string
const formattedPath = path.format({
    root: '/',// root ignored when dir is there
    dir: 'C:\\path\\dir',
    name:"file", // ignored as base is there
    ext:"txt", // ignored as base is there
    base: 'file.txt',
  });
console.log(formattedPath)
  // Returns: 'C:\\path\\dir\\file.txt'

//normalize path
const normalisePath = path.normalize("c://../node/../.documents/node/index")
console.log(normalisePath)

//why was it ignored?
/* 
The path starts as: c: ../node/../.documents/node/index
The .. after c: moves the path up one level, resulting in: c:/node/../.documents/node/index
The .. after node moves the path up one more level, resulting in: c:/.documents/node/index 
*/

//path.parse

const parsedPath = path.parse('C:\\path\\dir\\file.txt');
console.log(parsedPath)
/* 
Returns:
 { root: 'C:\\',
   dir: 'C:\\path\\dir',
   base: 'file.txt',
   ext: '.txt',
   name: 'file' }
*/


//path.relative(from,to)

const relativePath1 = path.relative('/Users/JohnDoe/Documents', '/Users/JohnDoe/Music');
console.log(relativePath1);  //outputs "../Music"

const relativePath2 = path.relative('/Users/JohnDoe/Documents/Projects', '/Users/JohnDoe/Documents/Archives/2025');
console.log(relativePath2);  //outputs "../Archives/2025"

//same path
const relativePath3 = path.relative('/Users/JohnDoe/Documents', '/Users/JohnDoe/Documents');
console.log(relativePath3);  //outputs ""

//no relative path
const relativePath4 = path.relative('C:/Users/JohnDoe/Documents', 'D:/Music');
console.log(relativePath4);  //outputs "D:/Music"

//zero-length string --> to

const relativePath5 = path.relative(path.resolve('/Users/JohnDoe/Projects/Archives'),'');

/* empty "" revolves to c:\Users\adars\Startup\Node Js\Sangam Mukherjee--> CWD
  path.resolve('/Users/JohnDoe/Projects/Archives')  --> windows treats unix file path as c:\users\johndoe\projects\archives
*/

console.log(relativePath5);  //outputs ..\..\..\adars\Startup\Node Js\Sangam Mukherjee

/* path.relative('c:\\Users\\JohnDoe\\Projects\\Archives', 
    'c:\\Users\\adars\\Startup\\Node Js\\Sangam Mukherjee');

    what it does is --> from archives go 3 level up and then navigate to adars\Startup\Node Js\Sangam Mukherjee 
    this is what the output means
*/


//zero-length string --> from
const relativePath6 = path.relative('', path.resolve('/Users/JohnDoe/Projects/Archives'));

/* path.resolve('/Users/JohnDoe/Projects/Archives')  --> windows treats unix file path as 
                                                        c:\users\johndoe\projects\archives
 empty "" revolves to c:\Users\adars\Startup\Node Js\Sangam Mukherjee--> CWD
*/

console.log(relativePath6);  //outputs "..\..\..\..\JohnDoe\Projects\Archives"

/* path.relative('c:\\Users\\adars\\Startup\\Node Js\\Sangam Mukherjee'
                ,'c:\\Users\\JohnDoe\\Projects\\Archives' );

    what it does is --> Sangam Mukherjee go 4 level up and then navigate to JohnDoe\\Projects\\Archives
    this is what the output means
*/


//path.sep

const pathSep = 'c:\\Users\\adars\\Startup\\Node Js\\Sangam Mukherjee'.split(path.sep)
/* what it does is that, it splits the string with the method split by specifying the seperator inside
  'c:\\Users\\adars\\Startup\\Node Js\\Sangam Mukherjee'.split(\\)
  this is what happens after the path.sep is called and then the array is created.
*/

console.log(pathSep) //[ 'c:', 'Users', 'adars', 'Startup', 'Node Js', 'Sangam Mukherjee' ]

console.log(path.sep); 
/* Outputs '\' on Windows, '/' on Linux/macOS  '\' is the standard directory separator 
used in file paths (e.g., C:\Users\adars).*/

console.log(path.join(...pathSep))  // flatten the array to make it a string and then join to make the original path