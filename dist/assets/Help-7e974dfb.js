import{a as p}from"./index-fd49427c.js";import{i as a}from"./index-d8562b19.js";const i=({name:s,placeholder:t,type:o="text",onChange:n,...e})=>p("input",{...e,name:s,type:o,placeholder:t,className:"border-black border rounded-md p-4 w-full",onChange:n}),l=async({queryKey:s})=>(await a.get(`/help?page=${s[1]}&ihtiyac_turu=${s[2]?s[2]:""}&sehir=${s[3]?s[3]:""}&help_status=${s[4]?s[4]:""}&kac_kisilik=${s[5]?s[5]:""}&order_direction=${s[6]?s[6]:"desc"}`)).data.result,d=async({queryKey:s})=>(await a.get(`/help/${s[1]}`)).data.result,m=async(s,t)=>(await a.post(`/send-helper-form/${s}`,t)).data,$=async s=>(await a.post("/send-help-form",s)).data;export{i as I,d as a,m as b,l as g,$ as p};
