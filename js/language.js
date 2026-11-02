// Shared copy lets controls and merge feedback switch without resetting the game.
var MeadowLanguage = (function () {
  var locale = "en";
  var storageKey = "meadowLanguage";
  var copy = {
    en: {
      title: "2048 · Little Meadow",
      newGame: "New game", score: "SCORE", best: "BEST",
      scoreLabel: "Score", bestLabel: "Best score",
      game: "2048 game", board: "2048 tile board. Use arrow keys or swipe to play.",
      keepPlaying: "Keep growing", retry: "Begin again",
      won: "You win!", over: "Game over!",
      artwork: "Totoro, little blue and white forest spirits, and soot sprites keeping a sleepy cat and bunny company in a watercolor meadow.",
      responses: ["yay!", "so sweet!", "lovely!", "tiny magic!", "nice match!"]
    },
    zh: {
      title: "2048 · 森林小憩",
      newGame: "新游戏", score: "得分", best: "最高分",
      scoreLabel: "得分", bestLabel: "最高分",
      game: "2048 游戏", board: "2048 棋盘。使用方向键或滑动屏幕来移动方块。",
      keepPlaying: "继续玩", retry: "再来一次",
      won: "你赢啦！", over: "游戏结束啦！",
      artwork: "水彩花园里，龙猫、蓝白小龙猫和煤球精灵陪伴着熟睡的小猫与兔子。",
      responses: ["耶！", "甜甜的！", "好棒呀！", "小小魔法！", "配对成功！"]
    }
  };

  function apply() {
    var text = copy[locale];
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
    document.title = text.title;
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      element.textContent = text[element.getAttribute("data-i18n")];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (element) {
      element.setAttribute("aria-label", text[element.getAttribute("data-i18n-aria")]);
    });
    document.querySelector(".score-container").setAttribute("data-label", text.score);
    document.querySelector(".best-container").setAttribute("data-label", text.best);
    document.querySelector(".meadow-art").alt = text.artwork;
    document.querySelectorAll("[data-feedback-index]").forEach(function (chip) {
      chip.textContent = "♡ " + text.responses[Number(chip.getAttribute("data-feedback-index"))];
    });
    document.querySelector(".merge-announcement").textContent = "";
    var button = document.querySelector(".language-button");
    button.textContent = locale === "en" ? "中文" : "English";
    button.lang = locale === "en" ? "zh-Hans" : "en";
    button.setAttribute("aria-label", locale === "en" ? "Switch to Simplified Chinese" : "切换到英语");
  }

  return {
    init: function () {
      try {
        locale = window.localStorage.getItem(storageKey) === "zh" ? "zh" : "en";
      } catch (error) { /* Language switching also works without storage. */ }
      apply();
      document.querySelector(".language-button").addEventListener("click", function () {
        locale = locale === "en" ? "zh" : "en";
        try { window.localStorage.setItem(storageKey, locale); } catch (error) {}
        apply();
      });
    },
    text: function (key) { return copy[locale][key]; },
    announcement: function (matches) {
      return locale === "zh" ? "好棒呀！成功配对 " + matches + " 次。" :
        "Lovely! " + matches + (matches === 1 ? " match." : " matches.");
    }
  };
}());
