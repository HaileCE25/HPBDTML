// document.addEventListener("DOMContentLoaded", function () {
//   // const countdownMusic = document.getElementById("countdownMusic");
//   const bookMusic = document.getElementById("bookMusic");

//   function countdown() {
//       const birthday = new Date("2025-03-19T16:46:10").getTime();
//       const interval = setInterval(() => {
//           const now = new Date().getTime();
//           const diff = birthday - now;

//           const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//           const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//           document.getElementById("days").innerText = days;
//           document.getElementById("hours").innerText = hours;
//           document.getElementById("minutes").innerText = minutes;
//           document.getElementById("seconds").innerText = seconds;

//           if (diff <= 1000) {
//               clearInterval(interval);
//               document.querySelector(".countdown-container").style.opacity = "0";
//               document.querySelector(".countdown-container").style.display = "none"; 
//               document.querySelector(".book").style.display = "flex"; 
//               document.body.style.background = "#ffffff";
//               document.getElementById("checkbox-cover").checked = false; 

//               bookMusic.play().catch(error => console.log("Phát nhạc bị chặn:", error));
//           }    
//       }, 1000);
//   }

//   countdown();
// });

document.addEventListener("DOMContentLoaded", function () {
  const bookMusic = document.getElementById("bookMusic");

  function countdown() {
      let diff = 10 * 1000; // Đếm ngược 10 giây
      const interval = setInterval(() => {
          diff -= 1000; // Giảm 1 giây mỗi lần cập nhật
          const seconds = Math.floor(diff / 1000);

          document.getElementById("seconds").innerText = seconds;

          if (diff < 1000) {
              clearInterval(interval);
              document.querySelector(".countdown-container").style.opacity = "0";
              document.querySelector(".countdown-container").style.display = "none"; 
              document.querySelector(".book").style.display = "flex"; 
              document.body.style.background = "#ffe5ec";
              document.body.classList.add("book-mode");
              document.getElementById("checkbox-cover").checked = false; 

              // Phát nhạc book
              bookMusic.play().catch(error => console.log("Phát nhạc bị chặn:", error));
              startBubbles();
          }    
      }, 1000);
  }

  countdown();
});

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❄";
  document.querySelector(".snowfall").appendChild(snowflake);
  
  snowflake.style.left = Math.random() * 100 + "vw";
  snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
  
  setTimeout(() => {
      snowflake.remove();
  }, 5000);
}

setInterval(createSnowflake, 200);

document.addEventListener("contextmenu", function (e) {
  e.preventDefault(); // Chặn menu chuột phải
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault(); // Chặn chọn văn bản
});

document.addEventListener("copy", function (e) {
  e.preventDefault(); // Chặn sao chép
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "x")) {
      e.preventDefault(); // Chặn Ctrl + C, Ctrl + U (xem source), Ctrl + X
  }
});

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Đặt vị trí trái tim ngẫu nhiên theo chiều ngang
  heart.style.left = Math.random() * 100 + "vw";  
  document.body.appendChild(heart);

  // Xóa trái tim sau khi bay lên
  setTimeout(() => {
      heart.remove();
  }, 4000);
}

// Tạo trái tim liên tục
setInterval(createHeart, 500);  // 500ms tạo 1 trái tim

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Đặt vị trí và kích thước ngẫu nhiên
  bubble.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 20 + 20;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  document.body.appendChild(bubble);

  // Animate bằng requestAnimationFrame
  let start = performance.now();
  function animateBubble(timestamp) {
      let progress = (timestamp - start) / 5000; // Bóng bay trong 5 giây
      if (progress < 1) {
          bubble.style.transform = `translate3d(0, ${-progress * 100}vh, 0)`;
          bubble.style.opacity = 1 - progress;
          requestAnimationFrame(animateBubble);
      } else {
          bubble.remove();
      }
  }

  requestAnimationFrame(animateBubble);
}

// Giới hạn số bóng tối đa trên màn hình
let maxBubbles = 20;
function startBubbles() {
  setInterval(() => {
      if (document.querySelectorAll(".bubble").length < maxBubbles) {
          createBubble();
      }
  }, 600);
}

// Chỉ chạy khi nhảy đến sự kiện book
document.addEventListener("DOMContentLoaded", function () {
  let countdownTime = 10 * 1000; // 10 giây đếm ngược
  let interval = setInterval(() => {
      countdownTime -= 1000;
      document.getElementById("seconds").innerText = Math.floor(countdownTime / 1000);

      if (countdownTime <= 0) {
          clearInterval(interval);
          document.querySelector(".countdown-container").style.display = "none";
          document.querySelector(".book").style.display = "flex";
          document.body.style.background = "#ffffff";

          document.getElementById("bookMusic").play().catch(error => console.log("Phát nhạc bị chặn:", error));

          // Bắt đầu hiệu ứng bóng bay
          startBubbles();
      }
  }, 1000);
});


