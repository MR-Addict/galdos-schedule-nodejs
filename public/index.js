function toggle(currentTab) {
  if (document.querySelector(`button.active[tab-name="${currentTab}"]`)) return;
  Array.from(document.querySelectorAll("button")).forEach((item) => {
    const tabName = item.querySelector("span:first-of-type").innerHTML;
    const tabButton = document.querySelector(`button[tab-name="${tabName}"]`);
    const tabSection = document.querySelector(`ul[tab-name="${tabName}"]`);
    tabButton.classList.toggle("active");
    tabSection.classList.toggle("active");
  });
}
