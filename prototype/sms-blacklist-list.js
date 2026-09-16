const mask = document.getElementById("mask");
const rows = [...document.querySelectorAll("#rows tr")];

document.getElementById("import").addEventListener("click", () => {
  window.location.href = "./sms-blacklist-import.html";
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("on"));
    tab.classList.add("on");

    const type = tab.dataset.type;
    rows.forEach((row) => {
      const rowType = row.children[2]?.textContent.trim();
      row.hidden = type !== "全部" && rowType !== type;
    });
  });
});

document.querySelectorAll(".remove").forEach((button) => {
  button.addEventListener("click", () => {
    if (!window.confirm("确认移除该黑名单？移除后对应类型短信将恢复发送。")) return;
    const row = button.closest("tr");
    row.children[8].textContent = "已移除";
    row.children[8].className = "expired";
    button.textContent = "已移除";
    button.className = "expired";
  });
});

document.querySelectorAll(".detail").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    document.getElementById("d-name").textContent = row.children[0].textContent;
    document.getElementById("d-phone").textContent = row.children[1].textContent;
    document.getElementById("d-source").textContent = row.children[3].textContent;
    document.getElementById("d-tag").textContent = row.children[4].textContent;
    mask.style.display = "flex";
  });
});

function closeDetails() {
  mask.style.display = "none";
}

document.getElementById("close").addEventListener("click", closeDetails);
document.getElementById("cancel").addEventListener("click", closeDetails);
mask.addEventListener("click", (event) => {
  if (event.target === mask) closeDetails();
});
