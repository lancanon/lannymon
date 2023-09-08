(()=>{
  "use strict";
  function e(e, t) {
      let n;
      return function() {
          clearTimeout(n),
          n = setTimeout(e, t)
      }
  }
  const t = e((function() {
      window.upperBound = window.innerWidth - 100
  }
  ), 100);
  let n, i, s;
  window.upperBound = window.innerWidth - 100;
  const o = {
      query: "lan",
      config: {
          usePetLinks: !0
      },
      player: {
          ign: "lan",
          level: 24,
          job: "software engineer",
          fame: "-",
          guild: "-",
          alliance: "-",
          married: !0
      },
      buttons: {
          wishlist: "",
          party: "mailto:veeaudy1201@gmail.com"
      },
      pet: {
          "pet-ign": "Baws",
          type: "Tubby Tiger",
          "pet-level": 25,
          closeness: 1201,
          fullness: 100
      },
      links: [{
          url: "https://twitter.com/lannymon_",
          title: "Twitter",
          image: "./public/images/ui/icons/links/twitter.png",
          requiredLevel: 0
      }, {
          url: "https://instagram.com/lannymon_",
          title: "Instagram",
          image: "./public/images/ui/icons/links/instagram.png",
          requiredLevel: 0
      }, {
          url: "https://www.youtube.com/channel/UCsEzDbi0RHzdQgAfbNyxhLA",
          title: "Youtube",
          image: "./public/images/ui/icons/links/youtube.png",
          requiredLevel: 0,
          custom: "29px"
      }, {
          url: "https://www.tiktok.com/@lannymon",
          title: "Tiktok",
          image: "./public/images/ui/icons/links/tiktok.png",
          requiredLevel: 0
      }, {
          url: "https://github.com/lancanon/",
          title: "Github",
          image: "./public/images/ui/icons/links/github.png",
          requiredLevel: 0
      }, {
          url: "https://www.linkedin.com/in/audy-veeradeth-384479217/",
          title: "LinkedIn",
          image: "./public/images/ui/icons/links/linkedin.png",
          requiredLevel: 0
      }]
  }
    , a = new class {
      constructor() {
          this.status = "idle",
          this.direction = "right",
          this.coordinate = 0,
          this.previousCoordinate = 0
      }
      changeAnimation(e) {
          n.style.backgroundImage = `url('./public/images/animations/${e}.gif')`
      }
      turn(e) {
          this.direction = e,
          "left" === this.direction ? (n.style.transform = "none",
          i.style.transform = "none") : "right" === this.direction && (n.style.transform = "scaleX(-1)",
          i.style.transform = "scaleX(-1)")
      }
      setStatus(e) {
          "idle" !== e && "walking" !== e || (this.status = e,
          this.turn(this.direction),
          this.changeAnimation(e))
      }
      reset() {
          n.style.transition = "none",
          this.setStatus("idle"),
          clearTimeout(s)
      }
      move(e) {
          this.previousCoordinate = this.coordinate,
          this.coordinate = e,
          this.setStatus("walking"),
          this.coordinate > this.previousCoordinate ? this.turn("right") : this.turn("left");
          const t = 10 * Math.abs(e - this.previousCoordinate);
          return n.style.transition = `left ${t}ms linear`,
          n.style.left = `${e}px`,
          s = setTimeout((()=>{
              n.style.transition = "none",
              this.setStatus("idle")
          }
          ), t),
          t
      }
      moveRandomly() {
          const e = Math.floor(Math.random() * window.upperBound)
            , t = Math.floor(3e3 * Math.random()) + 1e3;
          let n = this.move(e);
          setTimeout(this.moveRandomly.bind(this), n + t)
      }
      init() {
          n = document.getElementById("character"),
          i = document.getElementById("character-ign-container"),
          this.setStatus("idle"),
          this.turn("right")
      }
  }
    , l = document.getElementById("character-info")
    , c = document.getElementById("character-title-bar")
    , r = document.getElementById("character-help-button")
    , u = document.getElementById("keyboard")
    , m = document.getElementById("keyboard-title-bar")
    , d = document.getElementById("keyboard-close-button")
    , g = document.getElementById("character-preview")
    , p = document.getElementById("pet-links")
    , b = document.getElementById("item-links-container")
    , h = document.getElementById("item-button")
    , f = document.getElementById("item-links")
    , y = document.getElementById("up-button")
    , v = document.getElementById("down-button")
    , k = document.getElementById("fame")
    , w = document.getElementById("ios-scrollbar-track")
    , E = window.matchMedia("(max-width: 520px)");
  let x, L, I = !1, B = {
      trackMouse: !1,
      initial: {
          x: 0,
          y: 0
      },
      coord: {
          x: 0,
          y: 0
      },
      moveAmount: {
          x: 0,
          y: 0
      },
      lastTarget: null
  };
  function $() {
      const e = document.querySelector("#character-info .click-here");
      e.classList.remove("hidden"),
      clearTimeout(x),
      x = setTimeout((()=>{
          e.classList.add("hidden")
      }
      ), 5e3)
  }
  function T(e) {
      g.style.backgroundImage = `url("./public/images/animations/emote/${e}.gif")`,
      clearTimeout(L),
      L = setTimeout((()=>{
          g.style.backgroundImage = 'url("./public/images/animations/idle.gif")'
      }
      ), 5e3)
  }
  function F() {
      E.matches ? (h.disabled = !0,
      q()) : (h.disabled = !1,
      A())
  }
  function C() {
      const e = p.scrollHeight
        , t = p.clientHeight
        , n = p.scrollTop / (e - t) * 100 / 100 * (t - w.clientHeight - 26);
      w.style.transform = `translateY(${n}px)`
  }
  async function M() {
      const e = document.getElementById("up-button")
        , t = document.getElementById("down-button")
        , n = document.getElementById("fame")
        , i = await async function() {
          return (await fetch(`https://api.risorins.com/${o.query}/fame`, {
              method: "PATCH"
          })).ok
      }();
      return i ? n.textContent = Number(n.textContent) + 1 : (e.disabled = !0,
      t.disabled = !0),
      i
  }
  function q() {
      I = !1,
      f.classList.add("closed"),
      f.classList.remove("open"),
      p.innerHTML = "",
      o.links.forEach((e=>{
          const t = `<a href="${e.url}" target="_blank">\n      <div class="link-image">\n      <div class="link-image-inner" style="background-image: url('${e.image}'); width: ${e.custom || "35px"}; height: ${e.custom || "35px"}; background-size: contain;"></div>\n      </div>\n      <div class="link-text">${e.title}</div>\n      <div class="link-subtext">\n        <img src="./public/images/ui/ReqLv.png" />\n        <span>${e.requiredLevel}</span>\n      </div>\n    </a>`;
          p.innerHTML += t
      }
      ))
  }
  function A() {
      I = !0,
      f.classList.remove("closed"),
      f.classList.add("open"),
      p.innerHTML = "",
      o.config.usePetLinks && o.links.forEach(((e,t)=>{
          if (t > o.links.length - 4) {
              const t = `<a href="${e.url}" target="_blank">\n          <div class="link-image">\n          <div class="link-image-inner" style="background-image: url('${e.image}'); width: ${e.custom || "35px"}; height: ${e.custom || "35px"}; background-size: contain;"></div>\n          </div>\n        <div class="link-text">${e.title}</div>\n        <div class="link-subtext">\n          <img src="./public/images/ui/ReqLv.png" />\n          <span>${e.requiredLevel}</span>\n        </div>\n      </a>`;
              p.innerHTML += t
          }
      }
      ))
  }
  !function(e) {
      let t = []
        , n = document.getElementById("fade")
        , i = 0;
      for (let s = 0; s < e.length; s++)
          t[s] = new Image,
          t[s].onload = function() {
              i++,
              i === e.length && (n.style.opacity = 0,
              setTimeout((()=>{
                  n.style.visibility = "hidden"
              }
              ), 750))
          }
          ,
          t[s].src = e[s]
  }(["./public/images/animations/idle.gif", "./public/images/animations/walking.gif", "./public/images/setting/0.png", "./public/images/setting/1.png", "./public/images/setting/2.png"]),
  function(e) {
      const t = document.createElement("div");
      t.style.display = "none",
      document.body.appendChild(t);
      for (let n = 0; n < e.length; n++) {
          const i = new Image;
          i.src = e[n],
          t.appendChild(i)
      }
  }(["./public/images/ui/cursor/click.png", "./public/images/ui/cursor/cursor.png", "./public/images/ui/cursor/link.png", "./public/images/ui/button/fame/down-disabled.png", "./public/images/ui/button/fame/up-disabled.png", "./public/images/ui/button/party/mouseover.png", "./public/images/ui/button/party/pressed.png", "./public/images/ui/button/wishlist/mouseover.png", "./public/images/ui/button/wishlist/pressed.png", "./public/images/ui/button/help/mouseover.png", "./public/images/ui/button/help/pressed.png", "./public/images/ui/button/close/mouseover.png", "./public/images/ui/button/close/pressed.png", "./public/images/ui/button/item/mouseover.png", "./public/images/ui/button/item/pressed.png", "./public/images/animations/emote/F1.gif", "./public/images/animations/emote/F2.gif", "./public/images/animations/emote/F3.gif", "./public/images/animations/emote/F4.gif", "./public/images/animations/emote/F5.gif", "./public/images/animations/emote/F6.gif", "./public/images/animations/emote/F7.gif"]),
  b.innerHTML = "",
  o.links.forEach(((e,t)=>{
      if (o.config.usePetLinks) {
          if (t > o.links.length - 4)
              return
      } else
          p.style.backgroundImage = "none";
      const n = `\n          <a class="item-link" href="${e.url}" target="_blank">\n          <div class="link-image">\n          <div class="link-image-inner" style="background-image: url('${e.image}'); width: ${e.custom || "35px"}; height: ${e.custom || "35px"}; background-size: contain;"></div>\n          </div>\n          <div class="link-text">${e.title}</div>\n          <div class="link-subtext">\n            <img src="./public/images/ui/ReqLv.png" />\n            <span>${e.requiredLevel}</span>\n          </div>\n        </a>\n      `;
      b.innerHTML += n
  }
  )),
  $(),
  function() {
      for (const e in o.buttons) {
          const t = document.getElementById(`${e}-button`);
          if (o.buttons[e])
              t.href = o.buttons[e];
          else {
              const n = document.createElement("button");
              n.setAttribute("id", `${e}-button`),
              n.setAttribute("disabled", ""),
              t.parentNode.replaceChild(n, t)
          }
      }
  }(),
  function() {
      const e = document.getElementById("marriage");
      null !== o.player.married && (o.player.married ? e.style.backgroundImage = 'url("./public/images/ui/icons/married.png")' : e.style.backgroundImage = 'url("./public/images/ui/icons/unmarried.png")')
  }(),
  l.classList.toggle("hidden");
  for (const e in o.player) {
      const t = document.getElementById(e);
      t && (t.textContent = o.player[e])
  }
  for (const e in o.buttons) {
      const t = document.getElementById(`${e}-button`);
      t && (t.href = o.buttons[e])
  }
  for (const e in o.pet) {
      const t = document.getElementById(e);
      t && (t.textContent = o.pet[e])
  }
  document.getElementById("character-ign").textContent = o.player.ign,
  k.textContent = o.player.fame,
  h.addEventListener("click", (function() {
      I ? q() : A()
  }
  )),
  d.addEventListener("click", (function() {
      u.classList.toggle("hidden")
  }
  )),
  r.addEventListener("click", (function() {
      u.classList.remove("hidden"),
      $()
  }
  )),
  a.init(),
  setTimeout((()=>{
      a.moveRandomly()
  }
  ), 1e3),
  C(),
  async function() {
      document.getElementById("fame").textContent = await async function() {
          const e = await fetch(`https://api.risorins.com/${o.query}/fame`);
          return (await e.json()).fame
      }()
  }(),
  M(),
  addEventListener("resize", (function() {
      t(),
      e((function() {
          const e = document.getElementById("character-info");
          e.style.left = window.innerWidth / 2 - (I ? 255 : 137.5) + "px",
          e.style.top = window.innerHeight / 2 - 200 - 70 + "px"
      }
      ), 100)()
  }
  )),
  y.addEventListener("click", M),
  v.addEventListener("click", (function() {
      T("F4")
  }
  )),
  p.addEventListener("scroll", C),
  E.addEventListener("change", F),
  F(),
  document.addEventListener("mousedown", (function(e) {
      if (0 === e.button && document.body.classList.add("left-click"),
      e.target === c || e.target === m) {
          let t;
          e.preventDefault(),
          e.target === c && (t = l.getBoundingClientRect(),
          B.lastTarget = l),
          e.target === m && (t = u.getBoundingClientRect(),
          B.lastTarget = u),
          B.coord.x = t.left,
          B.coord.y = t.top,
          B.trackMouse = !0,
          B.initial.x = e.clientX,
          B.initial.y = e.clientY
      }
  }
  )),
  document.addEventListener("mouseup", (function(e) {
      0 === e.button && document.body.classList.remove("left-click"),
      B.trackMouse && (B.lastTarget.style.left = `${B.coord.x + B.moveAmount.x}px`,
      B.lastTarget.style.top = `${B.coord.y + B.moveAmount.y}px`,
      B.lastTarget.style.transform = "none",
      B.moveAmount.x = 0,
      B.moveAmount.y = 0,
      B.trackMouse = !1)
  }
  )),
  document.addEventListener("mousemove", (function(e) {
      B.trackMouse && (B.moveAmount.x = e.clientX - B.initial.x,
      B.moveAmount.y = e.clientY - B.initial.y,
      B.lastTarget.style.transform = `translate(${B.moveAmount.x}px, ${B.moveAmount.y}px)`)
  }
  )),
  document.addEventListener("keydown", (function(e) {
      const t = e.key
        , n = ["F1", "F2", "F3", "F4", "F5", "F6", "F7"].includes(t)
        , i = ["1", "2", "3", "4", "5", "6", "7"].includes(t);
      (n || i) && (e.preventDefault(),
      T(n ? t : `F ${t}`))
  }
  )),
  document.addEventListener("visibilitychange", (function() {
      document.hidden || a.reset()
  }
  )),
  console.log("%ctwitter @nb_div", "font: 26px sans-serif; font-weight:bold; color: #77DD77; -webkit-text-stroke:0.01px black;")
}
)();
