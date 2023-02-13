import{r as H,A as S,j as r,a as e,e as C,F as D,B as b}from"./index-997a8fd5.js";import{H as I}from"./Helmet-da56a803.js";import{a as L,b as _,C as m,I as x,r as z,c as j}from"./inputPhone-b710783f.js";import{u as w}from"./index-73f7ebdc.js";import{H as A,M as E}from"./index-d051275e.js";import{B as o}from"./transition-a2397cb8.js";import{L as M}from"./index-60c06311.js";import{P}from"./index-72a5d989.js";import{a as F,b as O}from"./Help-4e5a46cb.js";const U=()=>{var u,p,h;const[B,t]=H.useState(!1),{id:i}=S(),{control:n,formState:{errors:l},handleSubmit:N,reset:k}=L({mode:"onChange"}),d=_(a=>F(i,a),{onError:a=>{var g,f,y;b.error(`(${(g=a.response)==null?void 0:g.status}) ${(y=(f=a.response)==null?void 0:f.data)==null?void 0:y.message}`)},onSuccess:a=>{t(!1),a&&a.success&&b.success(a.message),k()}}),{data:s,isLoading:c}=w(["helpById",i],O),v=()=>{t(!0)},Y=a=>{d.mutate(a)};return r(M,{children:[r(I,{children:[e("meta",{name:"twitter:card",content:"summary_large_image"}),e("meta",{name:"twitter:creator",content:"@yardimyericom"}),e("meta",{name:"twitter:title",content:"Yardımyeri.com"}),e("meta",{name:"twitter:description",content:"Yardımyeri.com - Deprem yardım."}),e("meta",{name:"twitter:image",content:`https://api_test.yardimyeri.com/images/${i}.png`})]}),(d.isLoading||c)&&e(C,{}),e(P,{title:"Yardım Talebi Detayı"}),!c&&r(D,{children:[e(A,{data:s}),(s==null?void 0:s.status)==="Yardım Bekliyor"&&e("div",{className:"flex justify-center mt-6",children:e(o,{label:"Yardım Et",onClick:v})})]}),e(E,{title:"Yardım Başlatılacak!",isOpen:B,setIsOpen:t,children:r("div",{children:[e("p",{children:"Aşağıda bulunan bilgileri doldurduktan sonra yardımı başlatabilirsiniz."}),e("p",{className:"text-red-500",children:"Yardımı başlattığınız takdirde yardım talep edenin iletişim bilgilerine ulaşabilirsiniz."}),r("form",{className:"mt-5",onSubmit:N(Y),children:[r("div",{className:"flex flex-col gap-6",children:[r("div",{children:[e(m,{name:"name",control:n,rules:{required:"Bu alan zorunludur."},render:({field:a})=>e(x,{...a,placeholder:"Adınız"})}),e("span",{className:"text-red-600 text-sm",children:(u=l.name)==null?void 0:u.message})]}),r("div",{children:[e(m,{name:"email",control:n,rules:{pattern:{value:z.email,message:"Doğru formatta bir mail giriniz."}},render:({field:a})=>e(x,{...a,placeholder:"E-Posta Adresiniz"})}),e("span",{className:"text-red-600 text-sm",children:(p=l.email)==null?void 0:p.message}),e("p",{className:"text-gray-500 text-sm",children:"Bu alan zorunlu değildir. Ancak e-posta adresinizi girdiğiniz takdirde yeni oluşan talepleri mail olarak sizlere bildiriyoruz."})]}),r("div",{children:[e(m,{name:"phone_number",control:n,rules:{required:"Bu alan zorunludur.",pattern:{value:z.phoneNumber,message:"Doğru formatta bir telefon numarası giriniz."}},render:({field:a})=>e(j,{...a})}),e("span",{className:"text-red-600 text-sm",children:(h=l.phone_number)==null?void 0:h.message}),e("p",{className:"text-gray-500 text-sm",children:"Lütfen numaranızı başında sıfır olmadan girin."})]})]}),r("div",{className:"mt-4 flex justify-end gap-3",children:[e(o,{label:"Vazgeç",type:"error",size:"small",onClick:()=>{t(!1)}}),e(o,{htmlType:"submit",label:"Yardımı Başlat",type:"success",size:"small"})]})]})]})})]})};export{U as default};
