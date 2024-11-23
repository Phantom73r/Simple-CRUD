var siteNameInput=document.getElementById('siteName')
var siteLinkInput=document.getElementById('siteLink')
var tableContent=document.getElementById('tableContent')
var links;
var addBtn=document.getElementById('addBtn')
var updateBtn=document.getElementById('updateBtn')
var nameAlert=document.getElementById('nameAlert')
var formAlert=document.getElementById('formAlert')
var currentIndex;


if(sessionStorage.length){
  links= JSON.parse(sessionStorage.getItem('links'))


}else{
    links=[]
}
showLinks()
// sessionStorage.clear()
function addLinks(){
 if(siteNameInput.classList.contains('is-valid') && siteLinkInput.classList.contains('is-valid'))
    {
        var linkData={
            name:siteNameInput.value,
            link:siteLinkInput.value
        }
    
        links.push(linkData)
        sessionStorage.setItem('links', JSON.stringify(links))
            clearInputs()
            showLinks()
            formAlert.classList.add('d-none')

    }

    

 
 else{
    formAlert.classList.remove('d-none')
 }
}


function clearInputs(){
    siteNameInput.value=''
    siteLinkInput.value=''
}


function showLinks(){
var linksBox=``
for(var i=0;i<links.length;i++){
    linksBox+=`    <tr>
        <th>${i+1}</th>
        <th>${links[i].name}</th>
        <th><button class="btn btn-success" onclick="visitSite(${i})"><i class="fa-solid fa-eye text-white pe-2 "></i>Visit</button></th>
        <th><button class="btn text-capitalize btn-danger" onclick="deleteLink(${i})"><i class="fa-solid fa-trash text-white pe-2"></i>delete</button></th>
        <th><button class="btn text-capitalize btn-outline-secondary" onclick="updateLink(${i})">Edit</button></th>
    </tr>`
}
tableContent.innerHTML=linksBox
// console.log(links);

}

function deleteLink(deleteIndex){
links.splice(deleteIndex,1)
sessionStorage.setItem('links',JSON.stringify(links))
showLinks()
}

function visitSite(target){
 window.open(`https://${links[target].link}`, '_blank')


}
function updateLink(updateIndex){
   siteNameInput.value=links[updateIndex].name;
   siteLinkInput.value=links[updateIndex].link;
   currentIndex=updateIndex;
   addBtn.classList.add('d-none')
   updateBtn.classList.remove('d-none')
}

function setNewData(){
if(currentIndex!=null){
    links[currentIndex].name=siteNameInput.value
    links[currentIndex].link=siteLinkInput.value
 
    sessionStorage.setItem('links', JSON.stringify(links))
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
    showLinks()
    clearInputs()

}
    
}


function validateForm(element){
    var regex={
        siteName:/^[a-z]\w{2,14}\s?\w{0,10}?$/,
        siteLink:/^[A-Za-z]{3,30}(.com)$/i,
    }

    console.log(regex[element.id]);
    

if(regex[element.id].test(element.value)){
   element.classList.add('is-valid') 
   element.classList.remove('is-invalid')  
   element.nextElementSibling.classList.add('d-none')
}
else{
  element.classList.add('is-invalid')
  element.classList.remove('is-valid')
  element.nextElementSibling.classList.remove('d-none')
}


}




