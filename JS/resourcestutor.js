// Inline JSON data
const data = [
  {
    title: "WAEC Mathematics Past Questions",
    description: "Comprehensive collection of past questions from 2010-2023",
    subject: "Mathematics",
    downloads: 1250,
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    title: "WAEC English Past Questions",
    description: "Complete past questions from 2010-2023",
    subject: "English",
    downloads: 980,
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    title: "WAEC Biology Past Questions",
    description: "Biology past questions from 2012-2023",
    subject: "Biology",
    downloads: 750,
    fileType: "DOCX",
    fileUrl: "#",
  },
  {
    title: "WAEC Biology Past Questions",
    description: "Biology past questions from 2012-2023",
    subject: "Biology",
    downloads: 750,
    fileType: "DOCX",
    fileUrl: "#",
  },
  {
    title: "WAEC Biology Past Questions",
    description: "Biology past questions from 2012-2023",
    subject: "Biology",
    downloads: 750,
    fileType: "DOCX",
    fileUrl: "#",
  },
  {
    title: "WAEC Biology Past Questions",
    description: "Biology past questions from 2012-2023",
    subject: "Biology",
    downloads: 750,
    fileType: "DOCX",
    fileUrl: "#",
  },
];

const container = document.querySelector(".featured-resources");


data.forEach((item) => {
  const card = document.createElement("div");
  card.className = "featuredResourcesCard";

  card.innerHTML = `
  <div class="table-cell">
    <div class="table-cell-content">
        <img class="badge" src="/images/badge.png" alt="" />
    <div class="table-cell-text">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
    </div>
    </div>
    <p class="file-type">${item.fileType}</p>
    </div>
    <div class="download-content">
    <p>📕 ${item.subject}</p>
    <p>⬇️ ${item.downloads} downloads</p>
    <button class="download-button"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path fill="currentColor" d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z" />
        </svg></span> Download </button>
    </div>
  `;

  container.appendChild(card);
});


