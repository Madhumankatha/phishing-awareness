// Sheet columns: ID | Participant | Status | Clicked At
const SHARED_SECRET = '05f92aaace42e35c8b4bea27064cf805e423e35c75614e50a0477a966ad076c4';
function doPost(e){
 const data=JSON.parse(e.postData.contents||'{}');
 if(data.secret!==SHARED_SECRET) return ContentService.createTextOutput('Unauthorized');
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
 const values=sheet.getDataRange().getValues();
 for(let i=1;i<values.length;i++) if(String(values[i][0])===String(data.id)){
  sheet.getRange(i+1,3).setValue('Clicked');sheet.getRange(i+1,4).setValue(new Date());break;
 }
 return ContentService.createTextOutput('OK');
}
function doGet(e){
 if(e.parameter.secret!==SHARED_SECRET||e.parameter.action!=='dashboard') return ContentService.createTextOutput('Unauthorized');
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
 const values=sheet.getDataRange().getValues();
 const rows=values.slice(1).map(r=>({id:String(r[0]),participant:String(r[1]),status:String(r[2]||'Not Opened'),clickedAt:r[3]?new Date(r[3]).toISOString():''}));
 return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}
