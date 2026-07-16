const openModalBtns = document.querySelectorAll(".open-modal");
const closeModalBtn = document.getElementById("close-delete-modal");
const deleteModal = document.getElementById("delete-confirmation-modal");
const deleteMessageBtn = document.getElementById("delete-message-btn");
const hiddenMessageId = document.getElementById("message-id");

if (openModalBtns) {
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      hiddenMessageId.value = btn.dataset.messageId;
      deleteModal.showModal();
    });
  });

  closeModalBtn.addEventListener("click", () => {
    deleteModal.close();
  });
}
