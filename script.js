loading()
$(document).ready(() => {
  clock()
  opt()
  run(search.value,jam())
  maniik()
  hitungMundur(caption.value,thn.value,tgl.value,blnn.value,jamm.value)
})
//untuk tombol cari
$("#btnC").on("click", () => {
  $("#cari").toggle()
})
$("#cari").hide();
function loading() {
  let progres =0
  let str = setInterval(() => {
    progres +=5
    pro.style.width = progres+"%"
    if (progres == 100) {
      clearInterval(str)
      setTimeout(function() {
        
       $("#load").hide();
        body.style.overflow = "auto";
      }, 1000);
    }
  },80)
}
//fungsi menjalankan filter dan pertama kali di panggil
function run(value,tgll) {
  filter(search.value,tgll)
}
let mulai = null
//filter kota
function filter(idkot,tgll) {
  let tgl = tgll[3].split("-")
  let th = tgl[0]
  let bl = tgl[1] < 10 ? "0"+tgl[1]: tgl[1]
  let tg = tgl[2] < 10 ? "0"+tgl[2]: tgl[2]
  tgl = [th, bl, tg]
  console.log(tgl)
  kota.textContent = idkot.split("-")[1]
  $("#cari").hide()
  let a = $.ajax({
    url: "https://api.banghasan.com/sholat/format/json/jadwal/kota/"+ idkot.split("-")[0] +"/tanggal/"+tgl.join("-"),
    success: function(res) {
      
      let obj = res.jadwal.data
      
      //implementasi hasil ke jadwal
      imsak.textContent = obj.imsak
      duha.textContent = obj.dhuha
      terbit.textContent = obj.terbit
      subuh.textContent = obj.subuh
      duhur.textContent = obj.dzuhur
      ashar.textContent = obj.ashar
      magrib.textContent = obj.maghrib
      isya.textContent = obj.isya
      tanggal.textContent = obj.tanggal
      
      //end
      if (mulai != null) {
        clearInterval(mulai)
      }
      //mengambil keputusan hitung mundur
      after(obj,tgll)
      randomTxt(jam(),obj)
    }
  })
}
//after , menetukan mana yanga akan dihitung mundur
function after(obj,waktu) {
  let imsak = obj.imsak,
      subuh = obj.subuh,
      duhur = obj.dzuhur,
      ashar = obj.ashar,
      magrib = obj.maghrib,
      isya = obj.isya,
      jam = waktu[0],
      min = waktu[1],
      data = null
      
  if (jam <= imsak.split(":")[0] && min <= imsak.split(":")[1] || jam < imsak.split(":")[0] && min >= imsak.split(":")[1] ) {
    
    data = ["Imsak",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+imsak+":00").getTime()]
    alarm.textContent = imsak
  }else if (jam >= imsak.split(":")[0] && jam <= subuh.split(":")[0] && min <= subuh.split(":")[1] || jam < subuh.split(":")[0] && min >= subuh.split(":")[1] ) {
    
    data = ["Shubuh",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+subuh+":00").getTime()]
    alarm.textContent = subuh
    
  }else if (jam <= duhur.split(":")[0] && min <= duhur.split(":")[1] || jam < duhur.split(":")[0] && min >= duhur.split(":")[1] ) {
    
    data = ["Dzuhur",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+duhur+":00").getTime()]
    alarm.textContent = duhur
    console.log(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+isya+":00")
  }else if (jam <= ashar.split(":")[0] && min <= ashar.split(":")[1] || jam < ashar.split(":")[0] && min >= ashar.split(":")[1] ) {
    
    data = ["Ashar",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+ashar+":00").getTime()]
    alarm.textContent = ashar
    
  }else if (jam <= magrib.split(":")[0] && min <= magrib.split(":")[1] || jam < magrib.split(":")[0] && min >= magrib.split(":")[1] ) {
    
    data = ["Maghrib",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+magrib+":00").getTime()]
    alarm.textContent = magrib
    
  }else if (jam <= isya.split(":")[0] && min <= isya.split(":")[1] || jam < isya.split(":")[0] && min >= isya.split(":")[1] ) {
    
    alarm.textContent = isya
    data = ["Isya",new Date(obj.tanggal.split(" ")[2]+" "+obj.tanggal.split(" ")[1]+", "+obj.tanggal.split(" ")[3]+" "+isya+":00").getTime()]
    
  }else{
    alarm.textContent = imsak
    let tagg = obj.tanggal.split(" ")[1]++
    tagg +=1
    data = ["Imsak",new Date(obj.tanggal.split(" ")[2]+" "+tagg+", "+obj.tanggal.split(" ")[3]+" "+imsak+":00").getTime()]
    console.log("masuk")
  }
  
  hitung(data)
}
//fungsi hitung mundur
function hitung(data) {
  
  let stts = data[0],
      time = data[1];
  
  //mulai menghitung
  wait.textContent = stts
   mulai = setInterval(function() {
  // Untuk mendapatkan tanggal dan waktu hari ini
  let now = new Date().getTime();
  // Temukan jarak antara sekarang dan tanggal hitung mundur
  let distance = time - now;
  
  // Perhitungan waktu untuk hari, jam, menit dan detik
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  //menambahkan angka 0 jika angka < 10 supaya dua angka semua
  hours = hours < 10 ? "0"+hours: hours;
  minutes = minutes < 10 ? "0"+minutes: minutes;
  seconds = seconds < 10 ? "0"+seconds: seconds;
  countdown.textContent = [hours, minutes, seconds].join(" : ")

  // Jika hitungan mundur selesai, tulis beberapa teks
   if (distance <= 0) {
    clearInterval(mulai)
    //seteleh hitung mundur selesai jalankan kembali fungsi run 
    countdown.textContent = "waktu "+stts
    setTimeout(() => {
      filter(search.value,jam());
    }, 100000);
   }
  }, 1000);
}
//fungsi jam / data jam dan tanggal
function jam() {
  let w = new Date();
  let jam = w.getHours();
  let min = w.getMinutes();
  let sec = w.getSeconds();
  let tgl = `${w.getFullYear()}-${w.getMonth()+1}-${w.getDate()}`
  if (jam >= 4 && jam <= 9) {

    //say.innerHTML = 'GoodMorning<i id="logo" class="fa fa-sun">'
  } else if (jam > 9 && jam <= 18) {
    //say.innerHTML = 'GoodAfternoon<i id="logo" class="fa fa-sun">'
  } else if (jam < 23 && jam >= 19) {
    //say.innerHTML = 'GoodNight<i id="logo" class="fa fa-moon">'
  }
  return [jam,min,sec,tgl];
}
//fungsi waktu realtime
function clock() {
  setInterval(() => {
    let waktu = jam();
    let jm = waktu[0] < 10 ? "0" + waktu[0]: waktu[0];
    let mn = waktu[1] < 10 ? "0" + waktu[1]: waktu[1];
    let dt = waktu[2] < 10 ? "0" + waktu[2]: waktu[2];
    let transform = "rotate("+ waktu[2]/60*360 +"deg)";
    let jamm = "rotate("+ ((waktu[0]/60)*60)+60 +"deg)";
    let mnt = "rotate("+ waktu[1]/60*360 +"deg)";
  
    //cvr.style.webkitTransform = transform;
    //jarumJam.style.webkitTransform = jamm;
    //menit.style.webkitTransform = mnt;
  
    // $("#menit").style.webkitTransform = mnt;
    now.textContent = jam()[0]+":"+jam()[1];
    $("#jm").text(jm);
    $("#mn").text(mn);
    $("#dt").text(dt);
  }, 1000);
}
//fungsi get Daftar kota untuk option
function opt() {
  $.ajax({
    url: "https://api.banghasan.com/sholat/format/json/kota",
    success: function(rsl) {
      for (let i = 0; i < rsl.kota.length; i++) {
        let opt = document.createElement("option");
        let txt = document.createTextNode(rsl.kota[i].nama)
        opt.appendChild(txt)
        opt.setAttribute("name", txt)
        opt.value = rsl.kota[i].id +"-"+rsl.kota[i].nama
        search.appendChild(opt)
      }
    }
  })
}
//fungsi tambahan / untuk tampilan
function maniik() {
  let warna = ["#0092ffb1",
    "#ff0070b3",
    "#15c700b2",
    "#ffc500b2"]
  setInterval(() => {
    let dv = document.createElement("div")
    let bg = Math.floor(Math.random()*warna.length)
    let sz = Math.floor(Math.random()*20)
    let u = Math.floor(Math.random()*100)
    sz = sz < 5 ? 5: sz;
    dv.style.width = sz+"px"
    dv.style.height = sz+"px"
    dv.style.position = "absolute"
    dv.style.bottom = -4+"px"
    dv.style.left = u+"%"
    dv.style.transition = "1s"
    dv.style.animation = "up 3s linear infinite"
    dv.style.background = warna[bg];
    dv.style.webkitFilter = "blur(1.5px)"
    manik.appendChild(dv)
    setTimeout(function() {
      dv.remove()
    }, 2900);
  }, 200)
}
//random text ucapan
function randomTxt(jam, obj) {
  let h = jam[0]
  let m = jam[1]
  let rdm = [
    'Mohon Maaf Masih Banyak Bug <i class="fa fa-bug"></i>,'+
    'Karena Pembuatannya tidak direncanakan dan diperhitungkan',
    "Semoga Jadwal Shalat Ini Bisa Bermanfaat",
    'untuk referensi scrip bisa minta langsung ke <br> <a href="https://t.me/robbett"><i class="fab fa-telegram"></i> @robbett</a>'+
    ' atau kunjungi <a href="https:/github.com/robbet88/"><i class="fab fa-github"></i> robbet88 </a>',
    "Created By Saripdn",
    'Untuk Info API yang digunakan bisa klik <a href="https://fathimah.docs.apiary.io/#introduction/dokumentasi"> <i class="fa fa-info-circle"></i>Fathimah Bot</a>',
    "mohon maaf jika ada kesalahan <br>---Halaman Ini Masih Dalam Pengembangan---<br>:D",
    "Selamat Menunaikan Ibadah Puasa",
    "Terima Kasih Telah Mengunjungi Halaman Saya :)",
    "Jangan Lupa Shalat 5 Waktu:)",
    'Jika Ingin Mengubah Kota Klik icon <i class="fa fa-filter"></i>'
  ]
  if (h >= obj.maghrib.split(":")[0] && h >= obj.maghrib.split(":")[1]) {
    txt.textContent = "Selamat Berbuka Puasa"
  } else {
    setInterval(() => {
      let pilih = Math.floor(Math.random()*rdm.length)
      txt.innerHTML = rdm[pilih]
    }, 5000)
  }
}

//function option bulan pada hitung mdr
optBln()
function optBln() {
  let bulan =
  [
    {
      i : "Januari",
      e : "january"
    },
    {
      i : "Februari",
      e : "february"
    },
    {
      i : "Maret",
      e : "march"
    },
    {
      i : "April",
      e : "april"
    },
    {
      i : "Mei",
      e : "may"
    },
    {
      i : "Juni",
      e : "june"
    },
    {
      i : "Juli",
      e : "july"
    },
    {
      i : "Agustus",
      e : "august"
    },
    {
      i : "September",
      e : "september"
    },
    {
      i : "Oktober",
      e : "october"
    },
    {
      i : "November",
      e : "november"
    },
    {
      i : "Desember",
      e : "december"
    }
  ]
  
  for (var i = 0; i < bulan.length; i++) {
    let opt = document.createElement("option")
    let txt = document.createTextNode(bulan[i].i)
    opt.setAttribute("value",bulan[i].e)
    opt.appendChild(txt)
    blnn.appendChild(opt)
  }
}
//hitung mundur tanggal tertentu defaultnya lebaran
let mli = null
function hitungMundur(capt,tahun,tanggal,bulan,jam){
  cpt.textContent = capt
  clearInterval(mli)

  $("#Fhtngmdr").toggle()
  let time = new Date(bulan+" "+tanggal+", "+tahun+" "+jam+":00").getTime()
   mli = setInterval(function() {
  // Untuk mendapatkan tanggal dan waktu hari ini
  let now = new Date().getTime();
  // Temukan jarak antara sekarang dan tanggal hitung mundur
  let distance = time - now;
  
  // Perhitungan waktu untuk hari, jam, menit dan detik
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  //menambahkan angka 0 jika angka < 10 supaya dua angka semua
  days = days < 10 ? "0"+days: days;
  hours = hours < 10 ? "0"+hours: hours;
  minutes = minutes < 10 ? "0"+minutes: minutes;
  seconds = seconds < 10 ? "0"+seconds: seconds;
 // countdown.textContent = [hours, minutes, seconds].join(" : ")
  day.textContent = days
  hour.textContent = hours
  minute.textContent = minutes
  second.textContent = seconds
  // Jika hitungan mundur selesai, tulis beberapa teks
   if (distance <= 0) {
    clearInterval(mli)
    //seteleh hitung mundur selesai jalankan kembali fungsi run 
    day.textContent = "00"
    hour.textContent = "00"
    minute.textContent = "00"
    second.textContent = "00"
    
    alert("Hitung mundur selesai, Selamat "+capt)
   }
  }, 1000);
}
