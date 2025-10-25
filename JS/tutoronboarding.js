const govInput = document.getElementById("govInput");
const eduInput = document.getElementById("eduInput");
const profInput = document.getElementById("profInput");

const govName = document.getElementById("govName");
const eduName = document.getElementById("eduName");
const profName = document.getElementById("profName");

const govPreview = document.getElementById("govPreview");
const eduPreview = document.getElementById("eduPreview");
const profPreview = document.getElementById("profPreview");

const nextBtn = document.getElementById("nextBtn");
const form = document.getElementById("uploadForm");
const prevBtn = document.getElementById("prevBtn");

function handleFileInput(input, nameEl, previewEl) {
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) {
      nameEl.textContent = "No file selected";
      previewEl.style.display = "none";
      previewEl.innerHTML = '<div class="file-thumb">—</div>';
    } else {
      nameEl.textContent = file.name;
      previewEl.style.display = "flex";
      const thumb = previewEl.querySelector(".file-thumb");

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          thumb.style.backgroundImage = `url(${reader.result})`;
          thumb.style.backgroundSize = "cover";
          thumb.textContent = "";
        };
        reader.readAsDataURL(file);
      } else {
        thumb.style.backgroundImage = "none";
        thumb.textContent = file.name.split(".").pop().toUpperCase();
      }
    }
    validateForm();
  });
}

handleFileInput(govInput, govName, govPreview);
handleFileInput(eduInput, eduName, eduPreview);
handleFileInput(profInput, profName, profPreview);

document.querySelectorAll("label[for]").forEach((lbl) => {
  lbl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const id = lbl.getAttribute("for");
      document.getElementById(id).click();
    }
  });
});

function validateForm() {
  const ok = govInput.files.length > 0 && eduInput.files.length > 0;
  nextBtn.disabled = !ok;
}

prevBtn.addEventListener("click", () => {
  alert("Go to previous step (implement routing as needed).");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const files = {};
  if (govInput.files[0]) files.gov = govInput.files[0].name;
  if (eduInput.files[0]) files.edu = eduInput.files[0].name;
  if (profInput.files[0]) files.prof = profInput.files[0].name;

  nextBtn.textContent = "Uploading...";
  nextBtn.disabled = true;
  setTimeout(() => {
    nextBtn.textContent = "Next →";
    alert("Files ready for upload:\\n" + JSON.stringify(files, null, 2));
  }, 900);
});

validateForm();
