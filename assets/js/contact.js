const form=document.querySelector(".php-email-form");
function sendMessage(e){
e.preventDefault();



const name=document.querySelector(".name"),
email=document.querySelector(".email"),
subject=document.querySelector(".subject"),
message=document.querySelector(".message");

Email.send({
  SecureToken : " a8b5652f-45c2-4cde-979c-8832cf706870",
  To : 'egamberdiyevtolibjon0601@gmail.com',

  From : name.value + email.value ,
  Subject : subject.value,
  Body : message.value
}).then(
message => alert(message)
);

}
form.addEventListener("submit",sendMessage);