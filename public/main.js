"use strict";
(function(){
  const fileTypes=[
    'image/jpg',
    'image/png',
    'image/jpeg'
    ];
  const file=document.getElementById('file');
  const content=document.getElementById('content');
  const submit=document.getElementById('submit');
  file.addEventListener('change',updateFileList,false);
while(content.firstChild){
  content.remove(content.firstChild);
}
function updateFileList(event){
  let length=file.files;
  if(length==(0||null)){
    console.log('no files are selected');
  }
  for(const Cfile of file.files){
    const p=document.createElement('p');
    if ((Cfile)=>{return fileTypes.includes(Cfile.type)}){
      p.textContent=`file size:${Cfile.size},file type:${Cfile.type},file name:${Cfile.name}`;
      content.appendChild(p);
      let reader = new FileReader();
      reader.readAsDataURL(Cfile);
      reader.onloadend=function(){
      const img=document.createElement('img');
      img.src=this.result.toString();
      img.crossOrigin='anonymous';
      img.width='100';
      img.height='100';
      content.appendChild(img);
      }
    }
    else{
      p.textContent='not a valid type';
    }
  }
}
async function sendFiles(){
   console.log('called');
  const formdata=function(){
    let data=new FormData();
    for(const i of file.files){
      data.append('avatar',i);
    }
    console.log('done part1');
    return data;
  };
  const result=function(formdata){
    let xhr=new XMLHttpRequest();
    xhr.open('POST','/data',true);
    /*xhr.setRequestHeader('Content-Type','multipart/form-data');*/
    xhr.send(formdata);
    xhr.onload=()=>{return 'done';};
    xhr.onerror=()=>{console.log('an error has occured in xhr');};
  };
   let res= await formdata();
  let response=await result(res);
  if(response=='done'){return;}
  else {console.log('an error has occured');}
}
submit.addEventListener('click',sendFiles,false);

})(); 
