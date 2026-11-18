const $ = (id) => document.getElementById(id);
const demoBeneficiaries = [
  {id:1,name:"Carlos Mendoza",birth:"1995-05-15",nationality:"Venezuelana",document:"DOC-123456",phone:"(92) 99999-0000",email:"carlos.exemplo@email.com",city:"Manaus",education:"Ensino Médio Completo",profession:"Auxiliar de Logística",skills:"Organização, estoque e atendimento"},
  {id:2,name:"Maria Torres",birth:"1992-08-08",nationality:"Colombiana",document:"DOC-234567",phone:"(92) 98888-0000",email:"maria.exemplo@email.com",city:"Manaus",education:"Ensino Superior",profession:"Atendente",skills:"Comunicação e atendimento"},
  {id:3,name:"Juan Pérez",birth:"1988-02-10",nationality:"Venezuelana",document:"DOC-345678",phone:"(92) 97777-0000",email:"juan.exemplo@email.com",city:"Manaus",education:"Ensino Fundamental",profession:"Ajudante Geral",skills:"Organização e trabalho em equipe"}
];
let beneficiaries = JSON.parse(localStorage.getItem("hermanitos_beneficiaries") || "null") || demoBeneficiaries;
let attendances = JSON.parse(localStorage.getItem("hermanitos_attendances") || "null") || [
  {date:"10/11/2026",name:"Carlos Mendoza",type:"Orientação profissional",notes:"Atendimento demonstrativo"},
  {date:"08/11/2026",name:"Maria Torres",type:"Atualização cadastral",notes:"Dados revisados"}
];
let referrals = JSON.parse(localStorage.getItem("hermanitos_referrals") || "null") || [
  {id:1,name:"Carlos Mendoza",job:"Auxiliar de Estoque — Empresa Exemplo",status:"Em andamento"},
  {id:2,name:"Maria Torres",job:"Atendente — Mercado Exemplo",status:"Concluído"}
];
const save = () => {
  localStorage.setItem("hermanitos_beneficiaries",JSON.stringify(beneficiaries));
  localStorage.setItem("hermanitos_attendances",JSON.stringify(attendances));
  localStorage.setItem("hermanitos_referrals",JSON.stringify(referrals));
};
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function showView(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
  $(name+"View").classList.remove("hidden");
  document.querySelectorAll(".nav-link[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
  if(name==="beneficiaries") renderBeneficiaries();
  if(name==="attendances") renderAttendances();
  if(name==="employment") renderReferrals();
  if(name==="reports") renderReports();
}
function updateMetrics(){
  $("metricBeneficiaries").textContent=beneficiaries.length;
  $("metricAttendances").textContent=attendances.length;
  $("metricReferrals").textContent=referrals.length;
  $("reportBeneficiaries").textContent=beneficiaries.length;
  $("reportAttendances").textContent=attendances.length;
  $("reportReferrals").textContent=referrals.length;
}
$("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  if($("email").value.trim() && $("password").value.trim()){
    $("loginView").classList.add("hidden");$("appView").classList.remove("hidden");showView("dashboard");
  }else{$("loginError").textContent="Informe e-mail e senha para continuar."}
});
$("logoutBtn").addEventListener("click",()=>{$("appView").classList.add("hidden");$("loginView").classList.remove("hidden")});
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
function renderBeneficiaries(){
  const query=($("beneficiarySearch").value||"").toLowerCase();
  $("beneficiaryRows").innerHTML=beneficiaries.filter(b=>b.name.toLowerCase().includes(query)).map(b=>`<tr><td>${escapeHtml(b.name)}</td><td>${escapeHtml(b.nationality)}</td><td>${escapeHtml(b.profession||"Não informado")}</td><td><button class="table-action" data-edit="${b.id}" aria-label="Editar ${escapeHtml(b.name)}">Editar</button><button class="table-action" data-delete="${b.id}" aria-label="Excluir ${escapeHtml(b.name)}">Excluir</button></td></tr>`).join("")||'<tr><td colspan="4">Nenhum beneficiário encontrado.</td></tr>';
  $("beneficiaryRows").querySelectorAll("[data-edit]").forEach(btn=>btn.addEventListener("click",()=>editBeneficiary(Number(btn.dataset.edit))));
  $("beneficiaryRows").querySelectorAll("[data-delete]").forEach(btn=>btn.addEventListener("click",()=>deleteBeneficiary(Number(btn.dataset.delete))));
  updateBeneficiaryOptions();updateMetrics();
}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
$("beneficiarySearch").addEventListener("input",renderBeneficiaries);
$("beneficiaryForm").addEventListener("submit",e=>{
  e.preventDefault();const id=$("beneficiaryId").value;
  const b={id:id?Number(id):Date.now(),name:$("name").value.trim(),birth:$("birth").value,nationality:$("nationality").value.trim(),document:$("document").value.trim(),phone:$("phone").value.trim(),email:$("emailBeneficiary").value.trim(),city:$("city").value.trim(),education:$("education").value,profession:$("profession").value.trim(),skills:$("skills").value.trim()};
  if(id){beneficiaries=beneficiaries.map(x=>x.id===Number(id)?b:x);toast("Cadastro atualizado com sucesso.");}
  else{beneficiaries.push(b);toast("Beneficiário cadastrado com sucesso.");}
  save();$("beneficiaryForm").reset();$("beneficiaryId").value="";$("formTitle").textContent="Cadastro de beneficiário";renderBeneficiaries();
});
function editBeneficiary(id){const b=beneficiaries.find(x=>x.id===id);if(!b)return;Object.entries({beneficiaryId:"id",name:"name",birth:"birth",nationality:"nationality",document:"document",phone:"phone",emailBeneficiary:"email",city:"city",education:"education",profession:"profession",skills:"skills"}).forEach(([field,key])=>$(field).value=b[key]||"");$("formTitle").textContent="Editar beneficiário";window.scrollTo({top:0,behavior:"smooth"})}
function deleteBeneficiary(id){if(!confirm("Deseja excluir este registro fictício?"))return;beneficiaries=beneficiaries.filter(b=>b.id!==id);save();renderBeneficiaries();toast("Registro excluído.");}
$("clearForm").addEventListener("click",()=>{$("beneficiaryForm").reset();$("beneficiaryId").value="";$("formTitle").textContent="Cadastro de beneficiário"});
function updateBeneficiaryOptions(){["attendanceBeneficiary","referralBeneficiary"].forEach(id=>{$(id).innerHTML='<option value="">Selecione</option>'+beneficiaries.map(b=>`<option>${escapeHtml(b.name)}</option>`).join("")})}
$("attendanceForm").addEventListener("submit",e=>{e.preventDefault();attendances.unshift({date:new Date().toLocaleDateString("pt-BR"),name:$("attendanceBeneficiary").value,type:$("attendanceType").value,notes:$("attendanceNotes").value||"Sem observações"});save();$("attendanceForm").reset();renderAttendances();updateMetrics();toast("Atendimento registrado.")});
function renderAttendances(){$("attendanceRows").innerHTML=attendances.map(a=>`<tr><td>${escapeHtml(a.date)}</td><td>${escapeHtml(a.name)}</td><td>${escapeHtml(a.type)}</td><td>${escapeHtml(a.notes)}</td></tr>`).join("");updateBeneficiaryOptions();updateMetrics()}
$("referralForm").addEventListener("submit",e=>{e.preventDefault();referrals.unshift({id:Date.now(),name:$("referralBeneficiary").value,job:$("job").value,status:$("referralStatus").value});save();$("referralForm").reset();renderReferrals();updateMetrics();toast("Encaminhamento registrado.")});
function renderReferrals(){$("referralRows").innerHTML=referrals.map(r=>`<tr><td>${escapeHtml(r.name)}</td><td>${escapeHtml(r.job)}</td><td><span class="status ${r.status.replace(" ","-")}">${escapeHtml(r.status)}</span></td><td><select data-status="${r.id}" aria-label="Alterar situação de ${escapeHtml(r.name)}"><option ${r.status==="Pendente"?"selected":""}>Pendente</option><option ${r.status==="Em andamento"?"selected":""}>Em andamento</option><option ${r.status==="Concluído"?"selected":""}>Concluído</option></select></td></tr>`).join("");$("referralRows").querySelectorAll("[data-status]").forEach(s=>s.addEventListener("change",()=>{referrals=referrals.map(r=>r.id===Number(s.dataset.status)?{...r,status:s.value}:r);save();renderReferrals();toast("Situação atualizada.")}));updateBeneficiaryOptions();updateMetrics()}
function renderReports(){const counts={"Pendente":0,"Em andamento":0,"Concluído":0};referrals.forEach(r=>counts[r.status]++);$("statusSummary").innerHTML=Object.entries(counts).map(([k,v])=>`<div><span class="status ${k.replace(" ","-")}">${k}</span><strong>${v}</strong></div>`).join("");updateMetrics()}
updateMetrics();save();
