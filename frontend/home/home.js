const menuIcon = document.getElementById('menuIcon')
const segundaUl = document.querySelector('.segundaUl')
const primeiraUl = document.querySelector('.primeiraUl')

menuIcon.onclick = () => {
    segundaUl.classList.toggle('open')
    primeiraUl.classList.toggle('open')
    menuIcon.classList.toggle('bx-x')

}

const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;

function hideSlider() {
  slider.forEach(item => item.classList.remove('on'))
}

function showSlider() {
  slider[currentSlide].classList.add('on')
}

function nextSlider() {
  hideSlider()
  if(currentSlide === slider.length -1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  showSlider()
}

function prevSlider() {
  hideSlider()
  if(currentSlide === 0) {
    currentSlide = slider.length -1
  } else {
    currentSlide--
  }
  showSlider()
}

btnNext.addEventListener('click', nextSlider)
btnPrev.addEventListener('click', prevSlider)

// function responseGoogle(response) {
//   // Decodificar o token JWT para obter informações do perfil do usuário
//   const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
  
//   // Pega as informações do usuário
//   const name = responsePayload.name;
//   const email = responsePayload.email;
//   const profilePic = responsePayload.picture;
//   const token = response.credential

//   console.log(token)

//   // Exibe as informações do usuário
//   document.getElementById("user-info").style.display = "block";
//   document.getElementById("user-name").textContent = "Nome: " + name;
//   document.getElementById("user-email").textContent = "Email: " + email;
//   document.getElementById("profile-pic").src = profilePic;
// }