let express=require('express');
let Busboy=require('busboy');
let fs=require('fs');
let path=require('path');
let app=express();
let logger=require('morgan');
fs.mkdir(path.join(__dirname,'/uploads'),(err)=>{
if(err){console.log('an error has occured while creating upload directory')}
	else{
	console.log('directory successfully created')}
	});
app.use('/',express.static(path.join(__dirname,'/public')));
app.use(logger(':method :url'));
app.post('/data',function(req,res,next){
  let busboy=new Busboy({headers:req.headers});
  busboy.on('file',function(fieldname,file,filename,encoding,mimeType){
    console.log(`fieldname: ${fieldname},
    filename:${filename},encoding:${encoding},mimetype:${mimeType}`);
    file.on('data',function(data){
      console.log(`file[${filename}] got:${data.length}bytes`);
 });
	  file.on('end',()=>{
	 console.log('Done parsing');
	  });
      let saveto=path.join(__dirname,'/uploads/',path.basename(filename));
      file.pipe(fs.createWriteStream(saveto));

  });
  busboy.on('finish',function(){
    console.log('finished');
    res.end();
  });
  req.pipe(busboy);
});
app.listen(3000,()=>{
  console.log('app is listening at port 3000');
});
