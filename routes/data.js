const express = require("express");
const { clean } = require("nopt");
const router = express.Router();
const fs=require('fs');
const generatePDF=require('../pdfCreater/pdfCreate')
var PdfTable = require("voilab-pdf-table"),
  PdfDocument = require("pdfkit");


const finalArr = [];

router.get("/", (req, res) => { 
  res.send("Hello");
});

router.post("/data", async  (req , res) => {
 const user = req.body;
  let list = [];
  for (let j = 0; j < user.length; j++) {
    for (key in user[j]) { 
      if (key === "inspection_form") {
        list.push(user[j][key]);
      }
    }
  }

  for (let i = 0; i < user.length; i++) {
    const jsonData = {
      Description:"",
      Gas: "NA",
      Clean: "NA",
      Phone: "NA",
      Rescue: "NA",
    };
    jsonData.Description=i+1;

    if (Object.hasOwn(list[i], "gas")) {
      if(list[i].gas==100)
      {
        jsonData.Gas = "Full"; 
      }
      else if(list[i].gas==50)
      {
        jsonData.Gas = "1/2"; 
      }
      else if(list[i].gas==25)
      {
        jsonData.Gas = "1/4"; 
      }
      else if(list[i].gas==75)
      {
        jsonData.Gas = "3/4"; 
      }
    }
    if (Object.hasOwn(list[i], "clean")) {
      if (list[i].clean.answer == true) {
        jsonData.Clean = "Yes";
      } else {
        jsonData.Clean = "No";
      }
    }

    if (Object.hasOwn(list[i], "phone")) {
      if (list[i].phone.answer == true) {
        jsonData.Phone = "Yes";
      } else {
        jsonData.Phone = "No";
      }
    }

    if (Object.hasOwn(list[i], "rescue")) {
      if (list[i].rescue.answer == true) {
        jsonData.Rescue = "Yes";
      } else {
        jsonData.Rescue = "No";
      }
    }
    finalArr.push(jsonData);
  }
  
const callme1=(argu)=>{
  // console.log(argu)

  let style1='';
  if(argu=="1/2"||argu=="1/4")
 { // { console.log("i am deeep");
   return style1=`style="padding:0 3rem 15px; background-color:#ff6666;"`
  }
  else if(argu=="3/4"||argu=="Full"){
    return style1=`style="padding:0 3rem 15px; background-color:#66ff99;"`
  }
  else if(argu=="NA")
{
  return style1=`style="padding:0 3rem 15px; background-color:#e6e6ff;"`
}

}

const callme2=(argu1)=>{

let style2='';
if(argu1=="Yes")
{
  return style2=`style="padding:0 3rem 15px; background-color:#66ff99;"`
}
else if(argu1=="No")
{
  return style2=`style="padding:0 3rem 15px; background-color:#ff6666;"`
}
else if(argu1=="NA")
{
  return style2=`style="padding:0 3rem 15px; background-color:#e6e6ff;"`
}
}



const Callme=()=>{
let html1='';
 for(let i=0;i<finalArr.length;i++)
 {
   let p=`
      <tr style='border:1px solid #aaa'>
        <td  style="padding:0 3rem 15px;">${finalArr[i].Description}</td>
        <td   ${callme1(finalArr[i].Gas)}  >${finalArr[i].Gas}</td>
        <td   ${callme2(finalArr[i].Clean)}>${finalArr[i].Clean}</td>
        <td   ${callme2(finalArr[i].Clean)}>${finalArr[i].Phone}</td>
        <td   ${callme2(finalArr[i].Clean)}>${finalArr[i].Rescue}</td>
      </tr>
   `
   console.log(p);
   html1+=p;

 }
 return html1;
}
const html =`
  <table>

      <tr>
        <th  style="padding:0 3rem 15px;">Description</th>
        <th  style="padding:0 3rem 15px;">Gas</th>
        <th  style="padding:0 3rem 15px;">Clean</th>
        <th  style="padding:0 3rem 15px;">Phone</th>
        <th  style="padding:0 3rem 15px;">Rescue</th>
      </tr>
      ${Callme()}
    <thead>
  </table>

`

const pdf = await generatePDF(html);


res.set("Content-Type", "application/pdf");
fs.writeFile('output1.pdf',pdf,function(err){
  if(err)console.log('err')
  else console.log("DOne");
})

 res.download("./output1.pdf");



});

module.exports = router;
