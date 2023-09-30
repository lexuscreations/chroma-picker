const $ = (...selectors) =>
  selectors.reduce(
    (obj, selector) => ({
      ...obj,
      [selector.slice(1)]: document.querySelector(selector),
    }),
    {}
  );
4;

const genTransBgEffect = () => {
  const resultColorPrev = document.querySelector(
    "main .resultCon .resultColorPrev"
  );
  let layout = ``;
  for (let i = 0; i < 892; i++)
    layout += `<div class="${i % 2 === 0 ? "box" : ""}"></div>`;
  resultColorPrev.insertAdjacentHTML("beforeend", layout);
};

const pickColor = async () => {
  const { resultColorPrev, resultColorValue } = $(
    ".resultColorPrev",
    ".resultColorValue"
  );

  try {
    if (!window.EyeDropper) throw new Error("Browser not supported!");
    const { sRGBHex } = await new EyeDropper().open({
      signal: new AbortController().signal,
    });
    resultColorValue.textContent = sRGBHex;
    resultColorPrev.style.backgroundColor = sRGBHex;
    const elementS_Arr = document.querySelectorAll(
      "main .resultCon .resultColorPrev > *"
    );
    elementS_Arr.forEach((el) => (el.style.display = "none"));
  } catch (err) {
    window.alert("Some error occurred!");
  }
};

const onLoad = () => {
  genTransBgEffect();

  const { colorPickerBtn } = $(".colorPickerBtn");
  colorPickerBtn.addEventListener("click", pickColor);
};

document.addEventListener("DOMContentLoaded", onLoad);
